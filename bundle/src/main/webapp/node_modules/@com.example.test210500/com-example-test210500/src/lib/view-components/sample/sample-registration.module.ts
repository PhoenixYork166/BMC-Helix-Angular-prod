import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { SampleComponent, SampleModule } from './runtime';
import { SampleDesignComponent, SampleDesignModel, SampleDesignModule } from './design';

@NgModule({
  imports: [SampleDesignModule, SampleModule]
})
export class SampleRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'com-example-test210500-sample',
      name: 'Sample',
      group: 'Test21.05.00',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(SampleComponent),
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(SampleDesignComponent),
      designComponentModel: SampleDesignModel,
      bundleId: 'com.example.test210500',
      properties: [
        {
          name: 'styles',
          type: ViewComponentPropertyType.String
        },
        {
          name: 'hidden',
          enableExpressionEvaluation: true
        },
        {
          name: 'message',
          localizable: true,
          enableExpressionEvaluation: true
        }
      ]
    });
  }
}
