import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RX_STANDARD_PROPS_DESC, RxViewComponentRegistryService, RxViewComponentType } from '@helix/platform/view/api';
import { RX_VIEW_DESIGNER } from '@helix/platform/view/designer';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RichTextModule } from './runtime/rich-text.module';
import { RichTextComponent } from './runtime/rich-text.component';
import { RxRichTextExpressionEvaluatorService } from './runtime/rich-text-expression-evaluator.service';
import { RichTextDesignModule } from './design/rich-text-design.module';
import { RichTextDesignComponent } from './design/rich-text-design.component';
import { RichTextDesignModel } from './design/rich-text-design.model';
import { RichTextDefinitionAdapterService } from './rich-text-definition-adapter.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "./runtime/rich-text-expression-evaluator.service";
export class RichTextRegistrationModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver, rxRichTextExpressionEvaluatorService) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxRichTextExpressionEvaluatorService = rxRichTextExpressionEvaluatorService;
        rxViewComponentRegistryService.register({
            type: RxViewComponentType.RichText,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(RichTextComponent),
            properties: [
                {
                    name: 'html',
                    enableExpressionEvaluation: true,
                    evaluatorService: this.rxRichTextExpressionEvaluatorService,
                    localizable: true
                },
                ...RX_STANDARD_PROPS_DESC
            ],
            name: 'Rich text',
            isContainerComponent: true,
            options: {
                canBeEmbeddedInRecordEditor: true
            },
            group: RX_VIEW_DESIGNER.stencilGroups.basicComponents.label,
            icon: 'text',
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(RichTextDesignComponent),
            designComponentModel: RichTextDesignModel,
            bundleId: RX_APPLICATION.platformBundleId
        });
    }
}
RichTextRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextRegistrationModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }, { token: i2.RxRichTextExpressionEvaluatorService }], target: i0.ɵɵFactoryTarget.NgModule });
RichTextRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextRegistrationModule, imports: [RichTextModule, RichTextDesignModule] });
RichTextRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextRegistrationModule, providers: [RichTextDefinitionAdapterService], imports: [[RichTextModule, RichTextDesignModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RichTextModule, RichTextDesignModule],
                    providers: [RichTextDefinitionAdapterService]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }, { type: i2.RxRichTextExpressionEvaluatorService }]; } });
//# sourceMappingURL=rich-text-registration.module.js.map