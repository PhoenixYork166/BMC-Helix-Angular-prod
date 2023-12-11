import { Component, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { RxProcessDefinitionCacheService } from '@helix/platform/process/api';
import { RX_DESIGNER, RxApplicationLoaderService, RxBundleCacheService } from '@helix/platform/shared/api';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import { RxJsonParserService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@helix/platform/process/api";
import * as i4 from "@angular/platform-browser";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@helix/platform/ui-kit";
import * as i7 from "@angular/common";
export class ProcessDesignerFrameComponent {
    constructor(rxApplicationLoaderService, rxBundleCacheService, rxJsonParserService, rxProcessDefinitionCacheService, domSanitizer, activeModalRef, rxUtilityModalsService) {
        this.rxApplicationLoaderService = rxApplicationLoaderService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxProcessDefinitionCacheService = rxProcessDefinitionCacheService;
        this.domSanitizer = domSanitizer;
        this.activeModalRef = activeModalRef;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.isProcessDesignerLoadingInProgress = true;
        this.isDefinitionDirty = false;
        this.context = activeModalRef;
        const data = this.context.getData();
        localStorage.setItem('ProcessDesignerPaletteElements', data.paletteElements);
        this.iframeSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(`/com.bmc.arsys.rx.innovationstudio/index.html#/app/bundle/${this.rxBundleCacheService.bundleId}/iprocess/${data.processDefinitionName ? data.processDefinitionName : ''}`);
    }
    onMessage(event) {
        if (event.data) {
            const message = this.rxJsonParserService.tryParseJson(event.data);
            if (message) {
                switch (message.messageType) {
                    case RX_DESIGNER.messageTypes.designerLoaded: {
                        this.isProcessDesignerLoadingInProgress = false;
                        break;
                    }
                    case RX_DESIGNER.messageTypes.afterSave: {
                        this.isDefinitionDirty = false;
                        break;
                    }
                    case RX_DESIGNER.messageTypes.definitionStatusChanged: {
                        this.isDefinitionDirty = message.payload.isDirty;
                        break;
                    }
                    case RX_DESIGNER.messageTypes.closeDesigner: {
                        if (message.payload.processDefinitionName) {
                            if (this.isDefinitionDirty) {
                                this.rxUtilityModalsService.confirmUnsavedChanges().then((isConfirmed) => {
                                    if (isConfirmed) {
                                        this.closeProcessDesigner(message.payload.processDefinitionName);
                                    }
                                });
                            }
                            else {
                                this.closeProcessDesigner(message.payload.processDefinitionName);
                            }
                        }
                        else {
                            if (this.isDefinitionDirty) {
                                this.rxUtilityModalsService.confirmUnsavedChanges().then((isConfirmed) => {
                                    if (isConfirmed) {
                                        this.context.dismiss(DismissReasons.CLOSE_BTN);
                                    }
                                });
                            }
                            else {
                                this.context.dismiss(DismissReasons.CLOSE_BTN);
                            }
                        }
                        break;
                    }
                }
            }
        }
    }
    closeProcessDesigner(processDefinitionName) {
        this.rxProcessDefinitionCacheService.clearCache([processDefinitionName]);
        this.context.close({ processDefinitionName });
    }
}
ProcessDesignerFrameComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDesignerFrameComponent, deps: [{ token: i1.RxApplicationLoaderService }, { token: i1.RxBundleCacheService }, { token: i2.RxJsonParserService }, { token: i3.RxProcessDefinitionCacheService }, { token: i4.DomSanitizer }, { token: i5.ActiveModalRef }, { token: i6.RxUtilityModalsService }], target: i0.ɵɵFactoryTarget.Component });
ProcessDesignerFrameComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ProcessDesignerFrameComponent, selector: "rx-process-designer-frame", host: { listeners: { "window:message": "onMessage($event)" } }, ngImport: i0, template: "<div id=\"rx-application-loader-container\" class=\"position-absolute w-100\" *ngIf=\"isProcessDesignerLoadingInProgress\">\n  <div class=\"rx-application-loader\"></div>\n</div>\n\n<iframe [src]=\"iframeSrc\" class=\"h-100\"></iframe>\n", styles: [":host{height:100vh}\n"], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDesignerFrameComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-process-designer-frame',
                    templateUrl: './process-designer-frame.component.html',
                    styleUrls: ['./process-designer-frame.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxApplicationLoaderService }, { type: i1.RxBundleCacheService }, { type: i2.RxJsonParserService }, { type: i3.RxProcessDefinitionCacheService }, { type: i4.DomSanitizer }, { type: i5.ActiveModalRef }, { type: i6.RxUtilityModalsService }]; }, propDecorators: { onMessage: [{
                type: HostListener,
                args: ['window:message', ['$event']]
            }] } });
//# sourceMappingURL=process-designer-frame.component.js.map