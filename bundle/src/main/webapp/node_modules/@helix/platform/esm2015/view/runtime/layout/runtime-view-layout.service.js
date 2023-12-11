import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { RxOldViewLayoutAdapterService, RxViewComponentRegistryService, RxViewComponentType, RxViewDefinitionParserService } from '@helix/platform/view/api';
import { RxTreeService, RxJsonParserService } from '@helix/platform/utils';
import { RuntimeViewRootComponent } from '../components/runtime-component/runtime-view-root.component';
import { RuntimeLayoutItem } from './runtime-layout-item.class';
import { RxLogService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@helix/platform/shared/api";
/**
 * @desc Represents runtime component tree
 */
export class RuntimeViewLayoutService {
    constructor(rxViewComponentRegistryService, viewDefinitionParserService, factoryResolver, tree, rxJsonParserService, rxLogService, rxOldViewLayoutAdapterService) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.viewDefinitionParserService = viewDefinitionParserService;
        this.factoryResolver = factoryResolver;
        this.tree = tree;
        this.rxJsonParserService = rxJsonParserService;
        this.rxLogService = rxLogService;
        this.rxOldViewLayoutAdapterService = rxOldViewLayoutAdapterService;
    }
    clear() {
        this.layout = null;
    }
    init(runtimeViewModel, runtimeViewModelApi) {
        this.runtimeViewModel = runtimeViewModel;
        this.runtimeViewModelApi = runtimeViewModelApi;
        this.viewDefinitionParserService
            .getComponents(runtimeViewModel.viewDefinition)
            .forEach(this.processDefinition.bind(this));
    }
    processDefinition(componentDefinitionItem) {
        this.rxOldViewLayoutAdapterService.convertLayout(componentDefinitionItem);
        if (!componentDefinitionItem.parentComponentDefinition) {
            this.initializeView(componentDefinitionItem.componentDefinition);
        }
        else {
            const componentDescriptor = this.rxViewComponentRegistryService.get(componentDefinitionItem.componentDefinition.type);
            if (componentDefinitionItem.componentDefinition.type !== RxViewComponentType.Action &&
                componentDescriptor &&
                !this.runtimeViewModel.isDataViewComponentDefinition(componentDescriptor)) {
                // todo move this logic to separate method
                const parentComponentDefinitionLayout = JSON.parse(componentDefinitionItem.parentComponentDefinition.layout);
                let columnIndex = 0;
                const parentOutlet = parentComponentDefinitionLayout.outlets.find((outlet) => {
                    return outlet.columns.find((col, colIndex) => {
                        const includes = col.children.includes(componentDefinitionItem.componentDefinition.guid);
                        if (includes) {
                            columnIndex = colIndex;
                        }
                        return includes;
                    });
                });
                if (parentOutlet) {
                    const viewComponentConfig = this.runtimeViewModel.viewComponentStates
                        .get(componentDefinitionItem.componentDefinition.guid)
                        .config$.asObservable();
                    const parentLayoutItem = this.getLayoutItem(componentDefinitionItem.parentComponentDefinition.guid);
                    parentLayoutItem.addLayoutItem(new RuntimeLayoutItem({
                        guid: componentDefinitionItem.componentDefinition.guid,
                        config: viewComponentConfig,
                        parent: parentLayoutItem,
                        runtimeViewModelApi: this.runtimeViewModelApi,
                        outlets: componentDescriptor.outlets,
                        factory: componentDescriptor.componentFactory
                    }), {
                        parentOutlet,
                        columnIndex
                    });
                }
                else {
                    const component = componentDefinitionItem.componentDefinition;
                    this.rxLogService.warning(`Cannot render view component. ${component.type} (${component.guid}) is not used in layout.`);
                }
            }
        }
    }
    initializeView(viewDefinition) {
        const layout = this.rxJsonParserService.tryParseJson(viewDefinition.layout);
        this.layout = new RuntimeLayoutItem({
            guid: viewDefinition.guid,
            parent: null,
            runtimeViewModelApi: this.runtimeViewModelApi,
            outlets: layout.outlets,
            factory: this.factoryResolver.resolveComponentFactory(RuntimeViewRootComponent)
        });
    }
    getLayoutItem(guid) {
        const flattenedLayoutItems = this.tree.flattenBy(this.layout, (currentLayout) => {
            return currentLayout.outlets.reduce((result, outlet) => {
                outlet.columns.forEach((column) => {
                    column.children.forEach((canvasLayout) => {
                        result.push(canvasLayout);
                    });
                });
                return result;
            }, []);
        });
        return flattenedLayoutItems.find((flattenedLayoutItem) => flattenedLayoutItem.guid === guid);
    }
}
RuntimeViewLayoutService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewLayoutService, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i1.RxViewDefinitionParserService }, { token: i0.ComponentFactoryResolver }, { token: i2.RxTreeService }, { token: i2.RxJsonParserService }, { token: i3.RxLogService }, { token: i1.RxOldViewLayoutAdapterService }], target: i0.ɵɵFactoryTarget.Injectable });
RuntimeViewLayoutService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewLayoutService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewLayoutService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i1.RxViewDefinitionParserService }, { type: i0.ComponentFactoryResolver }, { type: i2.RxTreeService }, { type: i2.RxJsonParserService }, { type: i3.RxLogService }, { type: i1.RxOldViewLayoutAdapterService }]; } });
//# sourceMappingURL=runtime-view-layout.service.js.map