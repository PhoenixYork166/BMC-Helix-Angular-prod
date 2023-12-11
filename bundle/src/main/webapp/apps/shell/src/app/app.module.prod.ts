import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AdaptFocusTrackerModule, AdaptIconModule, AdaptRxUploaderModule } from '@bmc-ux/adapt-angular';
import {
  RX_APPLICATION,
  RX_DEFAULT_STRINGS,
  RX_BUILD_ENVIRONMENT,
  RxApplicationRegistryService,
  RxAuthModule,
  RxCachingModule,
  RxErrorHandlingModule,
  RxHttpModule,
  RxLocalizationModule,
  RxLoggingModule,
  RxNotificationModule,
  RxOverlayModule,
  RxSessionExpirationModule
} from '@helix/platform/shared/api';

import {
  RxErrorPageModule,
  RxIssueReporterModule,
  RxSearchModule,
  RxShellModule,
  RxUserPreferencesModule
} from '@helix/platform/shared/components';

import { RxModalModule } from '@helix/platform/ui-kit';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import * as defaultStringsJson from '../i18n/localized-strings.json';
import { AppRoutingModule } from './app-routing.module';

import { AppComponentProd } from './app.component.prod';
import { InnovationStudioInitializerService } from './innovation-studio-initializer.service';
// TODO-RSSO-DEBUG: Uncomment the code below when debugging in a RSSO environment.
// import { RxRssoDebugLoginPageComponent } from './rsso-debug-login-page/rsso-debug-login-page.component';

@NgModule({
  declarations: [
    AppComponentProd
    // TODO-RSSO-DEBUG: Uncomment the code below when debugging in a RSSO environment.
    //, RxRssoDebugLoginPageComponent
  ],
  providers: [
    {
      provide: RX_DEFAULT_STRINGS,
      useValue: defaultStringsJson['default']
    },
    {
      provide: RX_BUILD_ENVIRONMENT,
      useValue: environment
    },
    InnovationStudioInitializerService
  ],
  imports: [
    BrowserModule,
    HammerModule,
    HttpClientModule,
    RxErrorPageModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    RxModalModule,
    RxAuthModule.forRoot(),
    RxSessionExpirationModule.forRoot(),
    RxCachingModule.forRoot(),
    RxLocalizationModule,
    RxErrorHandlingModule.forRoot(),
    RxLoggingModule.forRoot(),
    RxHttpModule.forRoot(),
    RxNotificationModule,
    RxSearchModule,
    RxShellModule,
    RxIssueReporterModule,
    RxOverlayModule.forRoot(),
    RxUserPreferencesModule,
    AdaptFocusTrackerModule,
    AdaptIconModule,
    AdaptRxUploaderModule.forRoot(),
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictActionWithinNgZone: true,
          strictActionTypeUniqueness: true
        }
      }
    ),

    EffectsModule.forRoot([]),

    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  bootstrap: [AppComponentProd]
})
export class AppModule {
  constructor(
    rxApplicationRegistryService: RxApplicationRegistryService,
    innovationStudioInitializerService: InnovationStudioInitializerService
  ) {
    rxApplicationRegistryService.register(RX_APPLICATION.innovationStudioBundleId, innovationStudioInitializerService);
  }
}
