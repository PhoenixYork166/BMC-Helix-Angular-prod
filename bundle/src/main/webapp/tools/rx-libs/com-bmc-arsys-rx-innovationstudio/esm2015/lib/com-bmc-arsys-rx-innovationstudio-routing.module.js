import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RxAssociationDesignerPageComponent } from '@helix/platform/association/designer';
import { ConfigDesignerPageComponent } from '@helix/platform/config/designer';
import { DocumentDesignerPageComponent } from '@helix/platform/document/designer';
import { RxEventDesignerPageComponent } from '@helix/platform/event/designer';
import { RxNamedListDesignerPageComponent } from '@helix/platform/named-list/designer';
import { ProcessDesignerPageComponent } from '@helix/platform/process/designer';
import { RecordDesignerPageComponent } from '@helix/platform/record/designer';
import { RX_APPLICATION, RxComponentCanDeactivateGuard, RxFeatureGuard, RxKeepSessionAliveResolver } from '@helix/platform/shared/api';
import { RxViewComponentResolver } from '@helix/platform/view/api';
import { ViewDesignerPageComponent } from '@helix/platform/view/designer-page';
import { RxShellDesignerPageComponent } from '@helix/platform/view/shell-designer-page';
import { RxWebApiDesignerPageComponent } from '@helix/platform/web-api/designer';
import { BundleDefinitionsComponent } from './components/bundle-definitions/bundle-definitions.component';
import { BundleDetailsComponent } from './components/bundle-details/bundle-details.component';
import { RecordDataEditorComponent } from './components/data-editor/record-data-editor.component';
import { DesignerFrameComponent } from './components/designer-frame/designer-frame.component';
import { AX_DESIGNER_FRAME } from './components/designer-frame/designer-frame.const';
import { ProcessManagementComponent } from './components/process-management/process-management.component';
import { RxValidViewDefinitionGuard } from './components/view-definition-tab/valid-view-definition.guard';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { AxBundleResolver } from './services/bundle-resolver/bundle.resolver';
import { AxLegacyShellGuard } from './services/legacy-shell-guard/legacy-shell.guard';
import { AxLegacyViewGuard } from './services/legacy-view-guard/legacy-view.guard';
import { AxValidBundleGuard } from './services/valid-bundle-guard/valid-bundle.guard';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [
    {
        path: '',
        redirectTo: 'workspace',
        pathMatch: 'full'
    },
    {
        path: 'workspace',
        component: WorkspaceComponent,
        pathMatch: 'full'
    },
    {
        path: 'record',
        canDeactivate: [RxComponentCanDeactivateGuard],
        resolve: { RxKeepSessionAliveResolver },
        runGuardsAndResolvers: 'always',
        data: {
            definitionType: 'record',
            routerGroup: 'legacy-designer'
        },
        children: [
            {
                path: 'new2/:bundleId',
                component: RecordDesignerPageComponent,
                canActivate: [AxValidBundleGuard, RxFeatureGuard],
                data: { featureId: 'DRD21-15263' }
            },
            {
                path: 'edit2/:definitionName',
                component: RecordDesignerPageComponent,
                canActivate: [RxFeatureGuard],
                data: { featureId: 'DRD21-15263' }
            },
            {
                path: 'new/:bundleId',
                component: DesignerFrameComponent,
                canActivate: [AxValidBundleGuard],
                data: {
                    routerGroup: 'legacy-designer',
                    designerMode: AX_DESIGNER_FRAME.designerModes.new
                }
            },
            {
                path: 'edit/:definitionName',
                component: DesignerFrameComponent,
                data: {
                    routerGroup: 'legacy-designer',
                    designerMode: AX_DESIGNER_FRAME.designerModes.edit
                }
            },
            {
                path: 'edit-data-new/:definitionName',
                component: RecordDataEditorComponent,
                data: { featureId: 'DRD21-10996' },
                canActivate: [RxFeatureGuard]
            },
            {
                path: 'edit-data/:definitionName',
                component: DesignerFrameComponent,
                data: {
                    routerGroup: 'legacy-designer',
                    legacyDesignerName: AX_DESIGNER_FRAME.legacyDesignerNames.recordDataEditor
                }
            }
        ]
    },
    {
        path: 'view',
        data: {
            definitionType: 'view',
            routerGroup: 'legacy-designer'
        },
        canDeactivate: [RxComponentCanDeactivateGuard],
        resolve: { AxBundleResolver, RxKeepSessionAliveResolver },
        runGuardsAndResolvers: 'always',
        children: [
            {
                path: 'new/:bundleId',
                component: ViewDesignerPageComponent,
                canActivate: [AxValidBundleGuard, AxLegacyViewGuard]
            },
            {
                path: 'edit/:definitionName',
                component: ViewDesignerPageComponent,
                canActivate: [RxValidViewDefinitionGuard, AxLegacyViewGuard]
            },
            {
                path: 'new-legacy/:bundleId',
                component: DesignerFrameComponent,
                canActivate: [AxValidBundleGuard, AxLegacyViewGuard],
                data: {
                    routerGroup: 'legacy-designer'
                }
            },
            {
                path: 'edit-legacy/:definitionName',
                component: DesignerFrameComponent,
                canActivate: [RxValidViewDefinitionGuard, AxLegacyViewGuard],
                data: {
                    routerGroup: 'legacy-designer'
                }
            }
        ]
    },
    {
        path: 'process',
        data: {
            definitionType: 'process',
            routerGroup: 'legacy-designer'
        },
        canDeactivate: [RxComponentCanDeactivateGuard],
        runGuardsAndResolvers: 'always',
        children: [
            {
                path: 'new2/:bundleId',
                component: ProcessDesignerPageComponent,
                canActivate: [AxValidBundleGuard, RxFeatureGuard],
                resolve: { RxKeepSessionAliveResolver },
                data: { featureId: 'DRD21-11025' }
            },
            {
                path: 'edit2/:definitionName',
                component: ProcessDesignerPageComponent,
                canActivate: [RxFeatureGuard],
                resolve: { RxKeepSessionAliveResolver },
                data: { featureId: 'DRD21-11025' }
            },
            {
                path: 'new/:bundleId',
                component: DesignerFrameComponent,
                canActivate: [AxValidBundleGuard],
                data: {
                    routerGroup: 'legacy-designer',
                    designerMode: AX_DESIGNER_FRAME.designerModes.new
                }
            },
            {
                path: 'edit/:definitionName',
                component: DesignerFrameComponent,
                data: {
                    routerGroup: 'legacy-designer',
                    designerMode: AX_DESIGNER_FRAME.designerModes.edit
                }
            },
            {
                path: 'manage/:bundleId',
                component: ProcessManagementComponent,
                canActivate: [AxValidBundleGuard]
            },
            {
                path: 'instance/:definitionName/:instanceId',
                component: DesignerFrameComponent,
                data: {
                    routerGroup: 'legacy-designer',
                    legacyDesignerName: AX_DESIGNER_FRAME.legacyDesignerNames.processPreview
                }
            }
        ]
    },
    {
        path: 'rule',
        data: {
            definitionType: 'rule',
            routerGroup: 'legacy-designer'
        },
        canDeactivate: [RxComponentCanDeactivateGuard],
        runGuardsAndResolvers: 'always',
        children: [
            {
                path: 'new/:bundleId',
                component: DesignerFrameComponent,
                canActivate: [AxValidBundleGuard],
                data: {
                    routerGroup: 'legacy-designer',
                    designerMode: AX_DESIGNER_FRAME.designerModes.new
                }
            },
            {
                path: 'edit/:definitionName',
                component: DesignerFrameComponent,
                data: {
                    routerGroup: 'legacy-designer',
                    designerMode: AX_DESIGNER_FRAME.designerModes.edit
                }
            }
        ]
    },
    {
        path: 'association',
        data: {
            definitionType: 'association',
            routerGroup: 'legacy-designer'
        },
        canDeactivate: [RxComponentCanDeactivateGuard],
        resolve: { RxKeepSessionAliveResolver },
        runGuardsAndResolvers: 'always',
        children: [
            {
                path: 'new/:bundleId',
                component: DesignerFrameComponent,
                canActivate: [AxValidBundleGuard],
                data: {
                    routerGroup: 'legacy-designer',
                    designerMode: AX_DESIGNER_FRAME.designerModes.new
                }
            },
            {
                path: 'edit/:definitionName',
                component: DesignerFrameComponent,
                data: {
                    routerGroup: 'legacy-designer',
                    designerMode: AX_DESIGNER_FRAME.designerModes.edit
                }
            },
            {
                path: 'new2/:bundleId',
                component: RxAssociationDesignerPageComponent,
                canActivate: [AxValidBundleGuard, RxFeatureGuard],
                data: { featureId: 'DRD21-14986' }
            },
            {
                path: 'edit2/:definitionName',
                component: RxAssociationDesignerPageComponent,
                canActivate: [RxFeatureGuard],
                data: { featureId: 'DRD21-14986' }
            }
        ]
    },
    {
        path: 'named-list',
        data: {
            definitionType: 'named-list'
        },
        canDeactivate: [RxComponentCanDeactivateGuard],
        resolve: { RxKeepSessionAliveResolver },
        runGuardsAndResolvers: 'always',
        children: [
            {
                path: 'new/:bundleId',
                component: RxNamedListDesignerPageComponent,
                canActivate: [AxValidBundleGuard]
            },
            {
                path: 'edit/:definitionName',
                component: RxNamedListDesignerPageComponent
            }
        ]
    },
    {
        path: 'web-api',
        data: {
            definitionType: 'web-api',
            routerGroup: 'legacy-designer'
        },
        canDeactivate: [RxComponentCanDeactivateGuard],
        resolve: { RxKeepSessionAliveResolver },
        runGuardsAndResolvers: 'always',
        children: [
            {
                path: 'new/:bundleId',
                component: DesignerFrameComponent,
                canActivate: [AxValidBundleGuard],
                data: {
                    routerGroup: 'legacy-designer',
                    designerMode: AX_DESIGNER_FRAME.designerModes.new
                }
            },
            {
                path: 'edit/:definitionName',
                component: DesignerFrameComponent,
                data: {
                    routerGroup: 'legacy-designer',
                    designerMode: AX_DESIGNER_FRAME.designerModes.edit
                }
            },
            {
                path: 'new2/:bundleId',
                component: RxWebApiDesignerPageComponent,
                canActivate: [AxValidBundleGuard, RxFeatureGuard],
                data: { featureId: 'DRD21-17752' }
            },
            {
                path: 'edit2/:definitionName',
                component: RxWebApiDesignerPageComponent,
                canActivate: [RxFeatureGuard],
                data: { featureId: 'DRD21-17752' }
            }
        ]
    },
    {
        path: 'document',
        data: {
            definitionType: 'document',
            routerGroup: 'legacy-designer'
        },
        canDeactivate: [RxComponentCanDeactivateGuard],
        resolve: { RxKeepSessionAliveResolver },
        runGuardsAndResolvers: 'always',
        children: [
            {
                path: 'new2/:bundleId',
                component: DocumentDesignerPageComponent,
                canActivate: [AxValidBundleGuard, RxFeatureGuard],
                data: { featureId: 'DRD21-14961' }
            },
            {
                path: 'edit2/:definitionName',
                component: DocumentDesignerPageComponent,
                canActivate: [RxFeatureGuard],
                data: { featureId: 'DRD21-14961' }
            },
            {
                path: 'new/:bundleId',
                component: DesignerFrameComponent,
                canActivate: [AxValidBundleGuard],
                data: {
                    routerGroup: 'legacy-designer',
                    designerMode: AX_DESIGNER_FRAME.designerModes.new
                }
            },
            {
                path: 'edit/:definitionName',
                component: DesignerFrameComponent,
                data: {
                    routerGroup: 'legacy-designer',
                    designerMode: AX_DESIGNER_FRAME.designerModes.edit
                }
            }
        ]
    },
    {
        path: 'event',
        data: {
            definitionType: 'event',
            routerGroup: 'legacy-designer'
        },
        canDeactivate: [RxComponentCanDeactivateGuard],
        resolve: { RxKeepSessionAliveResolver },
        runGuardsAndResolvers: 'always',
        children: [
            {
                path: 'new/:bundleId',
                component: DesignerFrameComponent,
                canActivate: [AxValidBundleGuard],
                data: {
                    routerGroup: 'legacy-designer',
                    designerMode: AX_DESIGNER_FRAME.designerModes.new
                }
            },
            {
                path: 'edit/:definitionName',
                component: DesignerFrameComponent,
                data: {
                    routerGroup: 'legacy-designer',
                    designerMode: AX_DESIGNER_FRAME.designerModes.edit
                }
            },
            {
                path: 'new2/:bundleId',
                component: RxEventDesignerPageComponent,
                canActivate: [AxValidBundleGuard, RxFeatureGuard],
                data: { featureId: 'DRD21-17753' }
            },
            {
                path: 'edit2/:definitionName',
                component: RxEventDesignerPageComponent,
                canActivate: [RxFeatureGuard],
                data: { featureId: 'DRD21-17753' }
            }
        ]
    },
    {
        path: 'event-statistics',
        data: {
            definitionType: 'event-statistics',
            routerGroup: 'legacy-designer'
        },
        canDeactivate: [RxComponentCanDeactivateGuard],
        runGuardsAndResolvers: 'always',
        children: [
            {
                path: 'new/:bundleId',
                component: DesignerFrameComponent,
                canActivate: [AxValidBundleGuard],
                data: {
                    routerGroup: 'legacy-designer',
                    designerMode: AX_DESIGNER_FRAME.designerModes.new
                }
            },
            {
                path: 'edit/:definitionName',
                component: DesignerFrameComponent,
                data: {
                    routerGroup: 'legacy-designer',
                    designerMode: AX_DESIGNER_FRAME.designerModes.edit
                }
            }
        ]
    },
    {
        path: 'chatbot',
        data: {
            definitionType: 'chatbot',
            defaultBundleId: RX_APPLICATION.chatbotBundleId,
            routerGroup: 'legacy-designer'
        },
        canDeactivate: [RxComponentCanDeactivateGuard],
        runGuardsAndResolvers: 'always',
        children: [
            {
                path: 'edit/:definitionName',
                component: DesignerFrameComponent,
                data: {
                    routerGroup: 'legacy-designer',
                    designerMode: AX_DESIGNER_FRAME.designerModes.edit
                }
            },
            {
                path: ':bundleId/publish-chat-enabled-service',
                component: DesignerFrameComponent,
                data: {
                    routerGroup: 'legacy-designer',
                    legacyDesignerName: AX_DESIGNER_FRAME.legacyDesignerNames.chatWizard
                }
            }
        ]
    },
    {
        path: 'shell',
        data: {
            definitionType: 'shell'
        },
        canDeactivate: [RxComponentCanDeactivateGuard],
        resolve: { RxViewComponentResolver, RxKeepSessionAliveResolver },
        runGuardsAndResolvers: 'always',
        children: [
            {
                path: ':bundleId',
                component: RxShellDesignerPageComponent,
                canActivate: [AxValidBundleGuard, AxLegacyShellGuard]
            }
        ]
    },
    {
        path: 'shell-legacy',
        data: {
            definitionType: 'shell',
            routerGroup: 'legacy-designer'
        },
        canDeactivate: [RxComponentCanDeactivateGuard],
        resolve: { RxKeepSessionAliveResolver },
        runGuardsAndResolvers: 'always',
        children: [
            {
                path: ':bundleId',
                component: DesignerFrameComponent,
                canActivate: [AxValidBundleGuard, AxLegacyShellGuard],
                data: {
                    routerGroup: 'legacy-designer'
                }
            }
        ]
    },
    {
        path: ':bundleId',
        component: BundleDetailsComponent,
        canActivate: [AxValidBundleGuard],
        children: [
            {
                path: '',
                redirectTo: 'record-definitions'
            },
            {
                canDeactivate: [RxComponentCanDeactivateGuard],
                path: ':tab',
                data: {
                    routeReuseStrategy: RX_APPLICATION.routeReuseStrategies.checkParentParams
                },
                component: BundleDefinitionsComponent
            }
        ]
    },
    {
        path: 'config',
        data: {
            definitionType: 'config',
            routerGroup: 'legacy-designer'
        },
        canDeactivate: [RxComponentCanDeactivateGuard],
        runGuardsAndResolvers: 'always',
        children: [
            {
                path: 'new2/:bundleId',
                component: ConfigDesignerPageComponent,
                canActivate: [AxValidBundleGuard, RxFeatureGuard],
                data: { featureId: 'DRD21-14987' }
            },
            {
                path: 'edit2/:definitionName',
                component: ConfigDesignerPageComponent,
                canActivate: [RxFeatureGuard],
                data: { featureId: 'DRD21-14987' }
            },
            {
                path: 'new/:bundleId',
                component: DesignerFrameComponent,
                canActivate: [AxValidBundleGuard],
                data: {
                    routerGroup: 'legacy-designer',
                    designerMode: AX_DESIGNER_FRAME.designerModes.new
                }
            },
            {
                path: 'edit/:definitionName',
                component: DesignerFrameComponent,
                data: {
                    routerGroup: 'legacy-designer',
                    designerMode: AX_DESIGNER_FRAME.designerModes.edit
                }
            }
        ]
    }
];
export class ComBmcArsysRxInnovationstudioRoutingModule {
}
/** @nocollapse */ ComBmcArsysRxInnovationstudioRoutingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ComBmcArsysRxInnovationstudioRoutingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ ComBmcArsysRxInnovationstudioRoutingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ComBmcArsysRxInnovationstudioRoutingModule, imports: [i1.RouterModule], exports: [RouterModule] });
/** @nocollapse */ ComBmcArsysRxInnovationstudioRoutingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ComBmcArsysRxInnovationstudioRoutingModule, imports: [[RouterModule.forChild(routes)], RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ComBmcArsysRxInnovationstudioRoutingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RouterModule.forChild(routes)],
                    exports: [RouterModule]
                }]
        }] });
//# sourceMappingURL=com-bmc-arsys-rx-innovationstudio-routing.module.js.map