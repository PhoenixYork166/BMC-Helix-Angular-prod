import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { DigitalSignatureEffectsComponent, DigitalSignatureEffectsModule } from './runtime';
import { DigitalSignatureEffectsDesignComponent, DigitalSignatureEffectsDesignModel, DigitalSignatureEffectsDesignModule } from './design';

@NgModule({
  imports: [DigitalSignatureEffectsDesignModule, DigitalSignatureEffectsModule]
})
export class DigitalSignatureEffectsRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'com-example-test210500-digital-signature-effects',
      name: 'Digital Signature Effects',
      icon: 'left-note_pencil',
      group: 'Test21.05.00',
      options: {
        canBeEmbeddedInRecordEditor: true
      },
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(DigitalSignatureEffectsComponent),
      properties: [
        // {
        //   name: 'styles',
        //   type: ViewComponentPropertyType.String
        // },
        // {
        //   name: 'hidden',
        //   enableExpressionEvaluation: true
        // },
        // {
        //   name: 'message',
        //   localizable: true,
        //   enableExpressionEvaluation: true
        // }
      ],
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(DigitalSignatureEffectsDesignComponent),
      designComponentModel: DigitalSignatureEffectsDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
