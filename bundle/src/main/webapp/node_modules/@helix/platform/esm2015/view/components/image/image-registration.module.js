import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RX_STANDARD_PROPS_DESC, RxViewComponentRegistryService, RxViewComponentType } from '@helix/platform/view/api';
import { RX_VIEW_DESIGNER } from '@helix/platform/view/designer';
import { ImageDesignComponent } from './design/image-design.component';
import { ImageDesignModule } from './design/image-design.module';
import { ImageDesignModel } from './design/image-design.model';
import { ImageComponent } from './runtime/image.component';
import { ImageModule } from './runtime/image.module';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class ImageRegistrationModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService.register({
            type: RxViewComponentType.Image,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(ImageComponent),
            name: 'Image',
            group: RX_VIEW_DESIGNER.stencilGroups.basicComponents.label,
            options: {
                canBeEmbeddedInRecordEditor: true
            },
            properties: [
                {
                    name: 'recordInstanceId',
                    enableExpressionEvaluation: true
                },
                ...RX_STANDARD_PROPS_DESC
            ],
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(ImageDesignComponent),
            designComponentModel: ImageDesignModel,
            icon: 'attachment_image_adapt',
            bundleId: RX_APPLICATION.platformBundleId
        });
    }
}
ImageRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ImageRegistrationModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
ImageRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ImageRegistrationModule, imports: [ImageModule, ImageDesignModule] });
ImageRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ImageRegistrationModule, imports: [[ImageModule, ImageDesignModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ImageRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ImageModule, ImageDesignModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=image-registration.module.js.map