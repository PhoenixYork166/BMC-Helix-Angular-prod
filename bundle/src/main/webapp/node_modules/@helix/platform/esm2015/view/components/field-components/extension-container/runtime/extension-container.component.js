import { Component } from '@angular/core';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { RxRecordDefinitionCacheService, RxRecordDefinitionService } from '@helix/platform/record/api';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/record/api";
import * as i2 from "@helix/platform/view/runtime";
export class RxExtensionContainerComponent extends BaseViewComponent {
    constructor(rxRecordDefinitionCacheService, rxRecordDefinitionService) {
        super();
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.recordDefinitions = {};
    }
    ngOnInit() {
        super.ngOnInit();
        this.config.pipe(takeUntil(this.destroyed$)).subscribe((config) => {
            this.state = config;
        });
    }
    loadRecordDefinition(name) {
        this.rxRecordDefinitionCacheService.getRecordDefinition(name).subscribe((recordDefinition) => {
            recordDefinition.fieldDefinitionsById =
                this.rxRecordDefinitionService.buildFieldDefinitionsByIdMap(recordDefinition);
            this.recordDefinitions[name] = recordDefinition;
            this.notifyPropertyChanged('recordDefinitions', this.recordDefinitions);
        });
    }
}
RxExtensionContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExtensionContainerComponent, deps: [{ token: i1.RxRecordDefinitionCacheService }, { token: i1.RxRecordDefinitionService }], target: i0.ɵɵFactoryTarget.Component });
RxExtensionContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxExtensionContainerComponent, selector: "rx-extension-container", usesInheritance: true, ngImport: i0, template: "<rx-runtime-view-canvas-outlet [hidden]=\"state.hidden\"></rx-runtime-view-canvas-outlet>\n", components: [{ type: i2.RuntimeViewCanvasOutletComponent, selector: "rx-runtime-view-canvas-outlet", inputs: ["name"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExtensionContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-extension-container',
                    templateUrl: './extension-container.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxRecordDefinitionCacheService }, { type: i1.RxRecordDefinitionService }]; } });
//# sourceMappingURL=extension-container.component.js.map