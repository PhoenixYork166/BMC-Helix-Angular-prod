import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, RxViewComponentType } from '@helix/platform/view/api';
import { RX_BASE_FIELD_PROPERTIES } from '../base-record-editor-field/runtime';
import { LocalizedCharacterFieldComponent } from './runtime/localized-character-field.component';
import { RxLocalizedCharacterFieldModule } from './runtime/localized-character-field.module';
import { RxLocalizedCharacterFieldDesignModule } from './design/localized-character-field-design.module';
import { RX_FIELD_COMPONENTS } from '../field-components.constant';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { LocalizedCharacterFieldDesignComponent } from './design/localized-character-field-design.component';
import { LocalizedCharacterFieldDesignModel } from './design/localized-character-field-design.model';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class LocalizedCharacterFieldRegistrationModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        rxViewComponentRegistryService.register({
            type: RxViewComponentType.LocalizedCharacter,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(LocalizedCharacterFieldComponent),
            properties: RX_BASE_FIELD_PROPERTIES,
            name: 'Localized text',
            icon: 'field_text_mapmarker',
            group: RX_FIELD_COMPONENTS.stencilGroupName,
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(LocalizedCharacterFieldDesignComponent),
            designComponentModel: LocalizedCharacterFieldDesignModel,
            options: {
                canBeEmbeddedInRecordEditor: true
            },
            canBeInsertedInto(componentTypes) {
                return componentTypes.includes(RxViewComponentType.RecordEditor);
            },
            bundleId: RX_APPLICATION.platformBundleId
        });
    }
}
LocalizedCharacterFieldRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LocalizedCharacterFieldRegistrationModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
LocalizedCharacterFieldRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LocalizedCharacterFieldRegistrationModule, imports: [RxLocalizedCharacterFieldModule, RxLocalizedCharacterFieldDesignModule] });
LocalizedCharacterFieldRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LocalizedCharacterFieldRegistrationModule, imports: [[RxLocalizedCharacterFieldModule, RxLocalizedCharacterFieldDesignModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LocalizedCharacterFieldRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RxLocalizedCharacterFieldModule, RxLocalizedCharacterFieldDesignModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=localized-character-field-registration.module.js.map