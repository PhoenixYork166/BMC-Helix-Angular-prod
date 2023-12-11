import { Component } from '@angular/core';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { RX_ASSOCIATION_DEFINITION } from '@helix/platform/association/api';
import { RxRecordInstanceService } from '@helix/platform/record/api';
import { RxExtensionContainerComponent } from '../extension-container.component';
import { map, shareReplay, startWith, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { RecordEditorMode } from '../../../../record-editor';
import { RecordEditorComponent } from '../../../../record-editor/runtime/record-editor.component';
import { RxRecordEditorUtilsService } from '../../../../record-editor/common/record-editor-utils.service';
import { get, isEmpty, isEqual } from 'lodash';
import { combineLatest, forkJoin, of } from 'rxjs';
import { RxExtensionContainerHelperService } from '../extension-container-helper.service';
import * as i0 from "@angular/core";
import * as i1 from "../extension-container.component";
import * as i2 from "@helix/platform/record/api";
import * as i3 from "../../../../record-editor/common/record-editor-utils.service";
import * as i4 from "../extension-container-helper.service";
import * as i5 from "../../../../record-editor/runtime/record-editor.component";
import * as i6 from "@helix/platform/view/runtime";
import * as i7 from "@angular/common";
export class ExtensionContainerSectionComponent extends BaseViewComponent {
    constructor(rxExtensionContainerComponent, rxRecordInstanceService, rxRecordEditorUtilsService, rxExtensionContainerHelperService, recordEditorComponent) {
        super();
        this.rxExtensionContainerComponent = rxExtensionContainerComponent;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxRecordEditorUtilsService = rxRecordEditorUtilsService;
        this.rxExtensionContainerHelperService = rxExtensionContainerHelperService;
        this.recordEditorComponent = recordEditorComponent;
        this.isInitialized = false;
        this.selectionFieldOptionNamesById = null;
    }
    ngOnInit() {
        super.ngOnInit();
        // will close once officially fixed : https://github.com/ReactiveX/rxjs/issues/4772
        combineLatest([this.config, this.recordEditorComponent.recordInstanceChanged$.pipe(startWith(null))])
            .pipe(takeUntil(this.destroyed$))
            .subscribe(([config, recordInstanceUpdated]) => {
            if (config.recordDefinitionName) {
                this.rxExtensionContainerComponent.loadRecordDefinition(config.recordDefinitionName);
            }
            if (!config.associationDefinitionName) {
                return (this.isInitialized = true);
            }
            if (config.api) {
                let associatedRecordInstanceId = null;
                if (this.recordEditorComponent.state.mode === RecordEditorMode.Edit) {
                    associatedRecordInstanceId = this.recordEditorComponent.state.recordInstance.id;
                }
                const associationManager = config.api.getAssociationManager({
                    associationDefinitionName: config.associationDefinitionName,
                    associatedRecordNodeSide: RX_ASSOCIATION_DEFINITION.roles.second.value,
                    associatedRecordInstanceId: associatedRecordInstanceId,
                    recordDefinitionName: config.recordDefinitionName,
                    allFieldIds: true,
                    associatedRecordPath: config.associatedRecordPath
                });
                let initialize$;
                if (this.recordEditorComponent.state.mode === RecordEditorMode.Edit) {
                    initialize$ = associationManager.loadExtensions().pipe(switchMap((recordInstance) => {
                        if (isEmpty(associationManager.extensions)) {
                            return this.addNewRecordInstanceToExtension(associationManager);
                        }
                        else {
                            return of(recordInstance);
                        }
                    }));
                }
                else if (this.recordEditorComponent.state.mode === RecordEditorMode.Create ||
                    this.recordEditorComponent.state.mode === RecordEditorMode.Temporary) {
                    initialize$ = forkJoin([
                        associationManager.initialize(),
                        this.addNewRecordInstanceToExtension(associationManager)
                    ]);
                }
                initialize$
                    .pipe(tap(() => {
                    this.isInitialized = true;
                }), switchMap(() => {
                    const recordInstance$ = associationManager.extensions$.pipe(map((arr) => arr[0]), tap((recordInstance) => this.updateSelectionFieldOptionNames(recordInstance)), shareReplay(1));
                    return recordInstance$.pipe(switchMap((inst) => inst.fieldValueChanged$), withLatestFrom(recordInstance$));
                }), takeUntil(this.destroyed$))
                    .subscribe(([change, recordInstance]) => {
                    this.updateSelectionFieldOptionNames(recordInstance);
                });
            }
        });
    }
    addNewRecordInstanceToExtension(associationManager) {
        return this.rxRecordInstanceService.getNew(associationManager.options.recordDefinitionName).pipe(tap((recordInstance) => {
            recordInstance.isNewInstance = true;
            associationManager.addExtension(recordInstance);
        }));
    }
    updateSelectionFieldOptionNames(recordInstance) {
        if (get(recordInstance, 'recordDefinition.fieldDefinitions')) {
            const newSelectionFieldOptionNames = this.rxRecordEditorUtilsService.getSelectionFieldOptionNames(recordInstance.recordDefinition, recordInstance);
            if (!isEqual(this.selectionFieldOptionNamesById, newSelectionFieldOptionNames)) {
                const propName = this.rxExtensionContainerHelperService.getSelectionFieldOptionNamesByIdExpression(this.guid);
                this.rxExtensionContainerComponent.notifyPropertyChanged(propName, newSelectionFieldOptionNames);
            }
        }
    }
}
ExtensionContainerSectionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExtensionContainerSectionComponent, deps: [{ token: i1.RxExtensionContainerComponent }, { token: i2.RxRecordInstanceService }, { token: i3.RxRecordEditorUtilsService }, { token: i4.RxExtensionContainerHelperService }, { token: i5.RecordEditorComponent }], target: i0.ɵɵFactoryTarget.Component });
ExtensionContainerSectionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ExtensionContainerSectionComponent, selector: "rx-extension-container-section", usesInheritance: true, ngImport: i0, template: "<h5>{{ (config | async)?.label }}</h5>\n<rx-runtime-view-canvas-outlet *ngIf=\"isInitialized\"></rx-runtime-view-canvas-outlet>\n", components: [{ type: i6.RuntimeViewCanvasOutletComponent, selector: "rx-runtime-view-canvas-outlet", inputs: ["name"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i7.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExtensionContainerSectionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-extension-container-section',
                    templateUrl: './extension-container-section.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxExtensionContainerComponent }, { type: i2.RxRecordInstanceService }, { type: i3.RxRecordEditorUtilsService }, { type: i4.RxExtensionContainerHelperService }, { type: i5.RecordEditorComponent }]; } });
//# sourceMappingURL=extension-container-section.component.js.map