import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { concatMap, filter, first, map, switchMap, switchMapTo, take, tap, withLatestFrom } from 'rxjs/operators';
import { flow, isEmpty, mergeWith, reduce } from 'lodash';
import { ViewDesignerFacade } from '../+state/view-designer.facade';
import { findAllParentComponentGuids } from '../core/layout-helpers';
import { RxViewComponentRegistryService, RxViewComponentType, ViewDefinitionType, RxViewLayout, BwfViewComponentType } from '@helix/platform/view/api';
import { RxViewDesignerModels } from '../core/view-designer-models.service';
import { DesignerComponent } from '../components/designer-component/designer.component';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "../+state/view-designer.facade";
import * as i2 from "@helix/platform/view/api";
import * as i3 from "../core/view-designer-models.service";
export class RxViewDesignerHelperService {
    constructor(viewDesignerFacade, rxViewComponentRegistryService, componentFactoryResolver, viewDesignerModels) {
        this.viewDesignerFacade = viewDesignerFacade;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.viewDesignerModels = viewDesignerModels;
        this.designerComponentFactory = this.componentFactoryResolver.resolveComponentFactory(DesignerComponent);
        this.canvasDndListIds = [];
        this.extensionViewAllowedComponentTypes = new Set([
            RxViewComponentType.Container,
            RxViewComponentType.RichText,
            RxViewComponentType.RecordEditor,
            RxViewComponentType.Character,
            RxViewComponentType.Textarea,
            RxViewComponentType.Boolean,
            RxViewComponentType.Date,
            RxViewComponentType.DateTime,
            RxViewComponentType.Time,
            RxViewComponentType.Decimal,
            RxViewComponentType.Floating,
            RxViewComponentType.Integer,
            RxViewComponentType.LocalizedCharacter,
            RxViewComponentType.Selection,
            RxViewComponentType.SelectGroup,
            RxViewComponentType.RichTextarea,
            BwfViewComponentType.DynamicNamedList
        ]);
        this.canvasLayout$ = this.getRecursiveViewLayoutGuids().pipe(switchMap((guids) => guids.length
            ? this.viewDesignerFacade.areViewModelsReady$.pipe(
            // Wait until component models will be instantiated after save view definition.
            filter(Boolean), switchMapTo(this.viewDesignerFacade.viewDesignerModelState$.pipe(take(1))))
            : this.viewDesignerFacade.viewDesignerModelState$.pipe(take(1))), map((designModelState) => {
            const viewModel = designModelState.viewDesignModel;
            const componentModels = designModelState.viewComponentDesignModels;
            this.canvasDndListIds.length = 0;
            return {
                guid: viewModel.guid,
                factory: this.designerComponentFactory,
                outlets: viewModel.layout.outlets.map((outlet) => ({
                    name: outlet.name,
                    columns: outlet.columns.map((column, i) => {
                        const listId = String(`${viewModel.guid}-${outlet.name}-${i}`);
                        // do not allow components to be dropped in the root of a SHELL view
                        if (viewModel.type !== ViewDefinitionType.Shell) {
                            this.canvasDndListIds.push(listId);
                        }
                        return Object.assign(Object.assign({}, column), { children: column.children.map((childGuid) => this.initializeCanvasItem(childGuid, componentModels, this.canvasDndListIds)), listId, dndListIds: this.canvasDndListIds });
                    })
                })),
                model: null,
                descriptor: null,
                isSelected$: of(false)
            };
        }), tap(() => {
            // required for DND
            // https://github.com/angular/components/issues/16671
            this.canvasDndListIds.reverse();
        }));
        this.viewBreadcrumbItem$ = this.viewDesignerFacade.getViewPropertyValue('displayName').pipe(concatMap((displayName) => of(displayName
            ? displayName === RX_APPLICATION.shellDefinitionName
                ? 'Application shell'
                : displayName
            : '<New view>')), withLatestFrom(this.viewDesignerFacade.viewModelGuid$), map(([viewBreadcrumbLabel, guid]) => ({
            label: viewBreadcrumbLabel,
            data: { guid }
        })));
        this.selectedComponentBreadcrumbItems$ = this.viewDesignerFacade.selectedComponentGuid$.pipe(switchMap((componentGuid) => componentGuid
            ? combineLatest([
                this.viewDesignerFacade.breadcrumbs$,
                this.viewDesignerFacade.getParentComponentGuid(componentGuid)
            ]).pipe(withLatestFrom(this.viewDesignerFacade.viewComponentModels$), map(([[breadcrumbs], viewComponentModels]) => 
            // Handle empty viewComponentModels state during view definition save.
            isEmpty(viewComponentModels)
                ? []
                : findAllParentComponentGuids(componentGuid, viewComponentModels).map((parentGuid) => {
                    let label = breadcrumbs[parentGuid];
                    if (!label) {
                        const component = viewComponentModels[parentGuid];
                        const descriptor = this.rxViewComponentRegistryService.get(component.type);
                        label = descriptor.name;
                    }
                    return { label, data: { guid: parentGuid } };
                })))
            : of([])));
        this.breadcrumbItems$ = combineLatest([this.viewBreadcrumbItem$, this.selectedComponentBreadcrumbItems$]).pipe(map(([viewItem, componentItems]) => [viewItem, ...componentItems]));
        this.validationIssues$ = this.viewDesignerFacade.validationIssues$.pipe(withLatestFrom(this.viewDesignerFacade.viewDesignerModelState$), map(([validationIssuesState, modelState]) => flow((state) => mergeWith(Object.assign({}, state.issues), state.expressionIssues, (issues = [], expressionIssues = []) => issues.concat(expressionIssues)), (issuesByComponentGuid) => reduce(issuesByComponentGuid, (result, issues, guid) => {
            var _a;
            let name;
            if (((_a = modelState.viewDesignModel) === null || _a === void 0 ? void 0 : _a.guid) === guid) {
                name = modelState.viewDesignModel.displayName || 'View designer';
            }
            else if (modelState.viewComponentDesignModels[guid]) {
                const type = modelState.viewComponentDesignModels[guid].type;
                const descriptor = this.rxViewComponentRegistryService.get(type);
                name = descriptor && descriptor.name;
            }
            if (name) {
                result.push({
                    title: name,
                    issues: issues.map((issue) => ({
                        type: issue.type,
                        description: issue.description,
                        disableCorrection: issue.disableCorrection,
                        data: {
                            guid,
                            propertyName: issue.propertyName,
                            data: issue.data
                        }
                    }))
                });
            }
            return result;
        }, []))(validationIssuesState)));
    }
    getLicensedComponents() {
        return this.rxViewComponentRegistryService.getLicensedComponents().pipe(first(), map((components) => components.filter((component) => !this.rxViewComponentRegistryService.isDataComponentDescriptor(component) &&
            !component.hidden &&
            !component.isPageComponent)));
    }
    getRecursiveViewLayoutGuids() {
        return this.viewDesignerFacade
            .getViewPropertyValue('layout')
            .pipe(switchMap((layout) => this.getRecursiveComponentLayoutGuids(layout)));
    }
    getRecursiveComponentLayoutGuids(layout) {
        const guids = RxViewLayout.getViewLayoutChildGuids(layout);
        return guids.length
            ? combineLatest(guids.map((guid) => this.viewDesignerFacade
                .getComponentLayout(guid)
                .pipe(switchMap((childLayout) => childLayout
                ? this.getRecursiveComponentLayoutGuids(childLayout).pipe(map((childGuids) => [...childGuids, ...guids]))
                : of(guids)))))
            : of([]);
    }
    initializeCanvasItem(componentGuid, componentModels, dndListIds) {
        const componentModel = componentModels[componentGuid];
        const descriptor = this.rxViewComponentRegistryService.get(componentModel.type);
        const canvasLayout = {
            guid: componentModel.guid,
            descriptor,
            factory: descriptor.designComponentFactory,
            model: this.viewDesignerModels.get(componentModel.guid),
            outlets: [],
            isSelected$: this.viewDesignerFacade.selectedComponentGuid$.pipe(map((guid) => guid === componentModel.guid)),
            label: descriptor.name
        };
        if (componentModel.layout) {
            canvasLayout.viewComponentWithParents = findAllParentComponentGuids(componentModel.guid, componentModels).map((guid) => ({ guid, type: componentModels[guid].type }));
            componentModel.layout.outlets.forEach((outlet) => {
                const canvasOutlet = {
                    name: outlet.name,
                    columns: outlet.columns.map((column, i) => {
                        const listId = `${componentModel.guid}-${outlet.name}-${i}`;
                        dndListIds.push(listId);
                        return {
                            children: column.children.map((childGuid) => this.initializeCanvasItem(childGuid, componentModels, dndListIds)),
                            span: column.span,
                            listId,
                            dndListIds
                        };
                    })
                };
                canvasLayout.outlets.push(canvasOutlet);
            });
        }
        return canvasLayout;
    }
}
RxViewDesignerHelperService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerHelperService, deps: [{ token: i1.ViewDesignerFacade }, { token: i2.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }, { token: i3.RxViewDesignerModels }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDesignerHelperService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerHelperService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerHelperService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.ViewDesignerFacade }, { type: i2.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }, { type: i3.RxViewDesignerModels }]; } });
//# sourceMappingURL=view-designer-helper.service.js.map