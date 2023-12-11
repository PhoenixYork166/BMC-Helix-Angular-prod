import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import {
  RX_APPLICATION,
  RxApplicationLoaderResolver,
  RxApplicationResolver,
  RxAuthGuard,
  RxComponentCanDeactivateGuard,
  RxLoginPageGuard,
  RxThemeResolver,
  RxValidApplicationGuard,
  ShellRouteReuseStrategy
} from '@helix/platform/shared/api';
import {
  RxErrorPageComponent,
  RxInnovationStudioShellComponent,
  RxSearchComponent,
  RxShellComponent,
  RxUnknownApplicationComponent
} from '@helix/platform/shared/components';
import { RxHomepageResolver } from '@helix/platform/view/api';
import { RX_ERROR_PAGES } from './error-pages.constant';
// TODO-RSSO-DEBUG: Uncomment the code below when debugging in a RSSO environment.
// import { RxRssoDebugLoginPageComponent } from './rsso-debug-login-page/rsso-debug-login-page.component';

// WARNING! Do not extract the routes into a separate variable as it will break
// the custom applications created from an archetype.

const loginPageModule = () => import('@helix/platform/security/login').then((m) => m.LoginPageModule);
const viewRuntimePageModule = () => import('@helix/platform/view/runtime-page').then((m) => m.ViewRuntimePageModule);
const adminComponentsModule = () => import('@helix/platform/admin/components').then((m) => m.AdminComponentsModule);

const comBmcArsysRxInnovationstudioModule = () =>
  import('@helix/com-bmc-arsys-rx-innovationstudio').then((m) => m.ComBmcArsysRxInnovationstudioModule);

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        // TODO-RSSO-DEBUG: Uncomment the code below when debugging in a RSSO environment.
        // {
        //   path: 'rsso-debug/login',
        //   component: RxRssoDebugLoginPageComponent
        // },
        {
          path: 'innovationstudio',
          redirectTo: RX_APPLICATION.innovationStudioBundleId
        },
        {
          path: ':bundleId/login',
          loadChildren: loginPageModule,
          canActivate: [RxLoginPageGuard]
        },
        {
          path: 'unknown-application',
          canActivate: [RxAuthGuard, RxThemeResolver],
          component: RxUnknownApplicationComponent,
          resolve: { RxApplicationLoaderResolver }
        },
        {
          path: RX_ERROR_PAGES.unexpectedError.path,
          component: RxErrorPageComponent,
          data: RX_ERROR_PAGES.unexpectedError.data,
          resolve: { RxApplicationLoaderResolver }
        },
        {
          path: RX_ERROR_PAGES.accessDenied.path,
          canActivate: [RxThemeResolver],
          component: RxErrorPageComponent,
          data: RX_ERROR_PAGES.accessDenied.data,
          resolve: { RxApplicationLoaderResolver }
        },
        {
          path: `${RX_APPLICATION.innovationStudioBundleId}/settings`,
          canActivate: [RxAuthGuard, RxThemeResolver],
          resolve: { RxApplicationResolver },
          component: RxInnovationStudioShellComponent,
          data: {
            routerGroup: 'is-shell'
          },
          loadChildren: adminComponentsModule
        },
        {
          path: `${RX_APPLICATION.innovationStudioBundleId}/i`,
          canActivate: [RxAuthGuard, RxThemeResolver],
          resolve: { RxApplicationResolver },
          loadChildren: comBmcArsysRxInnovationstudioModule
        },
        {
          path: RX_APPLICATION.innovationStudioBundleId,
          canActivate: [RxAuthGuard, RxThemeResolver],
          resolve: { RxApplicationResolver },
          component: RxInnovationStudioShellComponent,
          data: {
            routerGroup: 'is-shell'
          },
          loadChildren: comBmcArsysRxInnovationstudioModule
        },
        {
          path: ':bundleId/preview/:viewDefinitionName',
          canActivate: [RxAuthGuard, RxThemeResolver],
          canDeactivate: [RxComponentCanDeactivateGuard],
          loadChildren: viewRuntimePageModule,
          resolve: { RxApplicationResolver }
        },
        {
          path: ':bundleId/search',
          pathMatch: 'full',
          canActivate: [RxAuthGuard, RxThemeResolver],
          component: RxShellComponent,
          data: {
            routerGroup: 'shell'
          },
          resolve: {
            RxApplicationResolver
          },
          children: [
            {
              path: '',
              component: RxSearchComponent
            }
          ]
        },
        {
          path: ':bundleId/view/:viewDefinitionName',
          pathMatch: 'full',
          canActivate: [RxAuthGuard, RxValidApplicationGuard, RxThemeResolver],
          canDeactivate: [RxComponentCanDeactivateGuard],
          component: RxShellComponent,
          data: {
            routerGroup: 'shell'
          },
          resolve: { RxApplicationResolver },
          loadChildren: viewRuntimePageModule
        },
        {
          path: ':bundleId/iview/:viewDefinitionName',
          canActivate: [RxAuthGuard, RxValidApplicationGuard, RxThemeResolver],
          canDeactivate: [RxComponentCanDeactivateGuard],
          resolve: { RxApplicationResolver },
          loadChildren: viewRuntimePageModule
        },
        {
          path: ':bundleId/settings',
          canActivate: [RxAuthGuard, RxValidApplicationGuard, RxThemeResolver],
          resolve: { RxApplicationResolver },
          component: RxShellComponent,
          data: {
            routerGroup: 'shell'
          },
          loadChildren: adminComponentsModule
        },
        {
          path: ':bundleId/isettings',
          canActivate: [RxAuthGuard, RxValidApplicationGuard, RxThemeResolver],
          resolve: { RxApplicationResolver },
          loadChildren: adminComponentsModule
        },
        {
          path: ':bundleId',
          canActivate: [RxAuthGuard, RxValidApplicationGuard, RxHomepageResolver],
          // This component will never be called but is necessary for Angular.
          component: RxShellComponent,
          pathMatch: 'full'
        },
        {
          path: '**',
          redirectTo: '/unknown-application',
          pathMatch: 'full'
        },
        {
          path: 'com-example-test210500',
          loadChildren: () =>
            import('@com.example.test210500/com-example-test210500').then((module) => module.ComExampleTest210500Module)
        }
      ],
      {
        useHash: true,
        onSameUrlNavigation: 'reload',
        relativeLinkResolution: 'legacy'
      }
    )
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: ShellRouteReuseStrategy
    }
  ]
})
export class AppRoutingModule {}
