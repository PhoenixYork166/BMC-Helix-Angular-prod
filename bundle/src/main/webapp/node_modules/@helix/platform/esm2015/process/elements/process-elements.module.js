import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxOverlayModule } from '@helix/platform/shared/api';
import { RxExpressionInputMapInspectorWidgetModule } from './shared/components/expression-input-map-inspector-widget/expression-input-map-inspector-widget.module';
import { RxProcessActionRegistrationModule } from './process-action/process-action-registration.module';
import { RxEndEventRegistrationModule } from './end-event/end-event-registration.module';
import { RxStartEventRegistrationModule } from './start-event/start-event-registration.module';
import * as i0 from "@angular/core";
export class RxProcessElementsModule {
}
RxProcessElementsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxProcessElementsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementsModule, imports: [CommonModule,
        RxEndEventRegistrationModule,
        RxExpressionInputMapInspectorWidgetModule,
        RxOverlayModule,
        RxProcessActionRegistrationModule,
        RxStartEventRegistrationModule] });
RxProcessElementsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementsModule, imports: [[
            CommonModule,
            RxEndEventRegistrationModule,
            RxExpressionInputMapInspectorWidgetModule,
            RxOverlayModule,
            RxProcessActionRegistrationModule,
            RxStartEventRegistrationModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RxEndEventRegistrationModule,
                        RxExpressionInputMapInspectorWidgetModule,
                        RxOverlayModule,
                        RxProcessActionRegistrationModule,
                        RxStartEventRegistrationModule
                    ]
                }]
        }] });
//# sourceMappingURL=process-elements.module.js.map