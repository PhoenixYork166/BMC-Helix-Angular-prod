import { Component, ComponentFactoryResolver, ElementRef, Injector, NgZone, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdaptModalService } from '@bmc-ux/adapt-angular';
import { RX_APPLICATION, RX_BUNDLE, RxAngularApplicationService, RxBundleCacheService, RxBundleService, RxGlobalCacheService, RxLocalizedStringsLoaderService, RxNotificationService, RxOverlayService, RxSessionExpirationService } from '@helix/platform/shared/api';
import { RxWizardService } from '@helix/platform/shared/components';
import { ProgressIndicatorModalComponent, ProgressIndicatorStatus, RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RxFileService } from '@helix/platform/utils';
import { RowSelectionMode } from '@helix/platform/view/components';
import { TranslateService } from '@ngx-translate/core';
import { saveAs } from 'file-saver';
import { assign, attempt, chain, find, forEach, isObject, last, noop, pick, toArray } from 'lodash';
import { BehaviorSubject, combineLatest, forkJoin, of, throwError } from 'rxjs';
import { catchError, map, pluck, shareReplay, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { AxBundleDeploymentService } from '../../services/bundle-deployment/bundle-deployment.service';
import { RxCreatePackageStatusDataPageService } from '../../services/bundle-deployment/create-package-status-data-page.service';
import { AxLocalizedStringsDataPageQuery } from '../../services/localization/localized-strings-data-page.service';
import { AddBundleContentDataWizardStepComponent } from '../bundle-action-wizard/add-bundle-content-data-wizard-step/add-bundle-content-data-wizard-step.component';
import { AddDataWizardStepComponent } from '../bundle-action-wizard/add-data-wizard-step/add-data-wizard-step.component';
import { DownloadWizardStepComponent } from '../bundle-action-wizard/download-wizard-step/download-wizard-step.component';
import { OptionsWizardStepComponent } from '../bundle-action-wizard/options-wizard-step/options-wizard-step.component';
import { OrderDataWizardStepComponent } from '../bundle-action-wizard/order-data-wizard-step/order-data-wizard-step.component';
import { PackageWizardStepComponent } from '../bundle-action-wizard/package-wizard-step/package-wizard-step.component';
import { SelectApprovalConfigurationsWizardStepComponent } from '../bundle-action-wizard/select-approval-configurations-wizard-step/select-approval-configurations-wizard-step.component';
import { SelectBundleContentDefinitionsWizardStepComponent } from '../bundle-action-wizard/select-bundle-content-definitions-wizard-step/select-bundle-content-definitions-wizard-step.component';
import { SelectDefinitionsToDeleteWizardStepComponent } from '../bundle-action-wizard/select-definitions-to-delete-wizard-step/select-definitions-to-delete-wizard-step.component';
import { SelectDefinitionsWizardStepComponent } from '../bundle-action-wizard/select-definitions-wizard-step/select-definitions-wizard-step.component';
import { ContentPackageImportLogsComponent } from '../content-package-import-logs/content-package-import-logs.component';
import { ManageContentPackagesComponent } from '../manage-content-packages/manage-content-packages.component';
import { BundleDetails } from './bundle-details.class';
import { AX_BUNDLE_DETAILS } from './bundle-details.constant';
import { PackageTypes } from './bundle-details.types';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "../../services/bundle-deployment/bundle-deployment.service";
import * as i5 from "@helix/platform/ui-kit";
import * as i6 from "@ngx-translate/core";
import * as i7 from "@bmc-ux/adapt-angular";
import * as i8 from "../../services/localization/localized-strings-data-page.service";
import * as i9 from "../../services/bundle-deployment/create-package-status-data-page.service";
import * as i10 from "@angular/common";
export class BundleDetailsComponent {
    constructor(activatedRoute, componentFactoryResolver, rxAngularApplicationService, rxBundleCacheService, rxBundleService, rxWizardService, injector, axBundleDeploymentService, rxModalService, translateService, adaptModalService, router, axLocalizedStringsDataPageQuery, ngZone, rxLocalizedStringsLoaderService, rxNotificationService, rxGlobalCacheService, rxCreatePackageStatusDataPageService, rxOverlayService, renderer, rxSessionExpirationService) {
        this.activatedRoute = activatedRoute;
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxAngularApplicationService = rxAngularApplicationService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxBundleService = rxBundleService;
        this.rxWizardService = rxWizardService;
        this.injector = injector;
        this.axBundleDeploymentService = axBundleDeploymentService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.adaptModalService = adaptModalService;
        this.router = router;
        this.axLocalizedStringsDataPageQuery = axLocalizedStringsDataPageQuery;
        this.ngZone = ngZone;
        this.rxLocalizedStringsLoaderService = rxLocalizedStringsLoaderService;
        this.rxNotificationService = rxNotificationService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxCreatePackageStatusDataPageService = rxCreatePackageStatusDataPageService;
        this.rxOverlayService = rxOverlayService;
        this.renderer = renderer;
        this.rxSessionExpirationService = rxSessionExpirationService;
        this.loadData$ = new BehaviorSubject(true);
        this.bundleTypes = RX_BUNDLE.bundleTypes;
        this.bundleDescriptor$ = combineLatest([this.activatedRoute.params.pipe(pluck('bundleId')), this.loadData$]).pipe(tap(([bundleId]) => {
            this.rxBundleCacheService.bundleId = bundleId;
        }), switchMap(([bundleId]) => this.rxGlobalCacheService.getBundleDescriptor(bundleId)), shareReplay(1));
        this.bundleDetails$ = this.bundleDescriptor$.pipe(map((bundleDescriptor) => new BundleDetails(bundleDescriptor, this.injector)), shareReplay(1));
        this.applicationLink$ = this.bundleDetails$.pipe(switchMap((bundleDetails) => this.rxAngularApplicationService.isAngularJsApplication(bundleDetails.id)), withLatestFrom(this.bundleDetails$), map(([isAngularJsApplication, bundleDetails]) => {
            if (bundleDetails.hasCustomEntryPoint) {
                return `/${bundleDetails.id}/index.html`;
            }
            else if (isAngularJsApplication) {
                return `/innovationsuite/index.html#/${bundleDetails.id}`;
            }
            else {
                return `/helix/index.html#/${bundleDetails.id}`;
            }
        }), shareReplay(1));
        this.shellDesignerLink$ = this.bundleDetails$.pipe(map((bundleDetails) => `/${RX_APPLICATION.innovationStudioBundleId}/shell/${bundleDetails.id}`));
    }
    ngOnInit() {
        this.bundleDescriptor$.pipe(take(1)).subscribe((bundleDescriptor) => {
            if (!this.rxOverlayService.areNewDefinitionsAllowedSync(bundleDescriptor)) {
                this.rxNotificationService.addWarningMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-details.read-only-definitions.warning'));
            }
        });
    }
    createContentPackage() {
        combineLatest([
            this.rxBundleService.get(this.rxBundleCacheService.bundleId),
            this.rxGlobalCacheService.getBundleDescriptors()
        ]).subscribe(([bundleDescriptor, bundleDescriptors]) => {
            const options = {
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.create-content-package.label'),
                allowFinish: true,
                finishButtonLabel: this.translateService.instant('com.bmc.arsys.rx.client.common.close.label'),
                notificationMessage: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.create-content-package.notification'),
                steps: [
                    {
                        id: 'selectDefinitions',
                        name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions.label'),
                        componentFactory: this.componentFactoryResolver.resolveComponentFactory(SelectBundleContentDefinitionsWizardStepComponent),
                        options: {
                            displayName: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.content-package.label'),
                            gridConfig: {
                                defaultDuplicateDataActionType: 'THROW_ERROR',
                                enableRowSelection: RowSelectionMode.Multiple
                            }
                        }
                    },
                    {
                        id: 'addData',
                        name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.label'),
                        componentFactory: this.componentFactoryResolver.resolveComponentFactory(AddBundleContentDataWizardStepComponent),
                        options: {
                            countTitle: 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.create-content.count',
                            descriptionTitle: 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.create-content.description',
                            showGlobalFilterExpressionEditor: true,
                            gridConfig: {
                                defaultDuplicateDataActionType: AX_BUNDLE_DETAILS.duplicateDataActions.ignore.value,
                                columns: [
                                    'dataSource',
                                    'name',
                                    'aliasName',
                                    'dataFilter',
                                    'dataFilterExpression',
                                    'ignoreRuleExecution',
                                    'duplicateDataActionType'
                                ]
                            }
                        }
                    },
                    {
                        id: 'orderData',
                        name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.order-data.label'),
                        componentFactory: this.componentFactoryResolver.resolveComponentFactory(OrderDataWizardStepComponent)
                    },
                    {
                        id: 'selectApprovalConfigurations',
                        name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-approval-configurations.label'),
                        componentFactory: this.componentFactoryResolver.resolveComponentFactory(SelectApprovalConfigurationsWizardStepComponent),
                        options: {
                            gridConfig: {
                                enableRowSelection: RowSelectionMode.Multiple
                            }
                        }
                    },
                    {
                        id: 'selectDefinitionsToDelete',
                        name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions-to-delete.label'),
                        componentFactory: this.componentFactoryResolver.resolveComponentFactory(SelectDefinitionsToDeleteWizardStepComponent),
                        options: {
                            gridConfig: {
                                enableRowSelection: RowSelectionMode.Multiple
                            },
                            isInstallOperation: false,
                            isContentPackageOperation: true
                        }
                    },
                    {
                        id: 'options',
                        name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.options.label'),
                        componentFactory: this.componentFactoryResolver.resolveComponentFactory(OptionsWizardStepComponent),
                        options: {
                            fields: {
                                customPackageName: {},
                                friendlyName: {
                                    disabled: true
                                },
                                version: {
                                    disabled: true,
                                    hideTooltip: true
                                },
                                description: {
                                    disabled: true
                                },
                                dependentBundlesList: {
                                    hidden: true
                                }
                            }
                        }
                    },
                    {
                        id: 'package',
                        name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.label'),
                        componentFactory: this.componentFactoryResolver.resolveComponentFactory(PackageWizardStepComponent),
                        options: {
                            isInstallOperation: false,
                            isContentPackageOperation: true
                        }
                    },
                    {
                        id: 'download',
                        name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.download.label'),
                        componentFactory: this.componentFactoryResolver.resolveComponentFactory(DownloadWizardStepComponent)
                    }
                ]
            };
            const bundleDetails = assign(pick(bundleDescriptor, [
                'id',
                'name',
                'isApplication',
                'friendlyName',
                'version',
                'groupId',
                'description',
                'dependentBundles'
            ]), {
                type: bundleDescriptor.isApplication ? RX_BUNDLE.bundleTypes.application : RX_BUNDLE.bundleTypes.library
            });
            const bundleFriendlyNamesById = bundleDescriptors.reduce((result, bundleDescriptor) => {
                result[bundleDescriptor.id] = bundleDescriptor.friendlyName;
                return result;
            }, {});
            const dependentBundlesList = chain(bundleDescriptors)
                .reject({ id: RX_APPLICATION.standardlib })
                .reject({ id: bundleDescriptor.id })
                .reject({ id: RX_APPLICATION.innovationStudioBundleId })
                .value();
            forEach(dependentBundlesList, (bundle) => {
                bundle.isDependedOn = Boolean(find(bundleDetails.dependentBundles, { id: bundle.id }));
            });
            const context = {
                bundleDescriptors,
                bundleDetails,
                bundleFriendlyNamesById,
                dependentBundlesList,
                deploymentPackageDescriptor: {
                    customPackageName: bundleDescriptor.id,
                    packageType: PackageTypes.Content,
                    id: bundleDescriptor.id,
                    name: bundleDescriptor.name,
                    friendlyName: bundleDescriptor.friendlyName,
                    version: bundleDescriptor.version,
                    description: bundleDescriptor.description,
                    groupId: bundleDescriptor.groupId,
                    developerName: bundleDescriptor.developerName,
                    isApplication: bundleDescriptor.isApplication,
                    containsJavaScript: bundleDescriptor.containsJavaScript,
                    overlayGroupId: '',
                    hasCustomEntryPoint: true,
                    userRequestedDependentBundles: null,
                    isConfigurationDataIncluded: false,
                    duplicateDataActionTypeForConfigurationData: AX_BUNDLE_DETAILS.duplicateDataActions.ignore.value,
                    definitionsToDeployByType: {},
                    definitionsToDeleteByType: {},
                    dataImportOptionsByRecordDefinitionName: {},
                    approvalConfigurationQueryOptions: []
                }
            };
            this.rxWizardService
                .open({
                context,
                options
            })
                .then(noop);
        });
    }
    openContentPackageImportLogsModal() {
        this.rxModalService
            .openModal({
            content: ContentPackageImportLogsComponent,
            size: 'rx-lg'
        })
            .catch(noop);
    }
    createInstallPackage() {
        combineLatest([
            this.rxBundleService.get(this.rxBundleCacheService.bundleId),
            this.rxGlobalCacheService.getBundleDescriptors()
        ]).subscribe(([bundleDetails, bundleDescriptors]) => {
            const wizardOptions = {
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.create-install-package.label'),
                allowFinish: true,
                finishButtonLabel: this.translateService.instant('com.bmc.arsys.rx.client.common.close.label'),
                notificationMessage: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.install-package.notification'),
                steps: [
                    {
                        id: 'selectDefinitions',
                        name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions.label'),
                        componentFactory: this.componentFactoryResolver.resolveComponentFactory(SelectDefinitionsWizardStepComponent),
                        options: {
                            displayName: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.install-package.label')
                        }
                    },
                    {
                        id: 'orderData',
                        name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.order-data.label'),
                        componentFactory: this.componentFactoryResolver.resolveComponentFactory(OrderDataWizardStepComponent),
                        options: {
                            importRecordDefinitionFromCache: true
                        }
                    },
                    {
                        id: 'options',
                        name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.options.label'),
                        componentFactory: this.componentFactoryResolver.resolveComponentFactory(OptionsWizardStepComponent)
                    },
                    {
                        id: 'package',
                        name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.label'),
                        componentFactory: this.componentFactoryResolver.resolveComponentFactory(PackageWizardStepComponent),
                        options: {
                            isInstallOperation: true,
                            isContentPackageOperation: false
                        }
                    },
                    {
                        id: 'download',
                        name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.download.label'),
                        componentFactory: this.componentFactoryResolver.resolveComponentFactory(DownloadWizardStepComponent)
                    }
                ]
            };
            const createInstallPackageContext = {
                bundleDetails: bundleDetails,
                bundleDescriptors: bundleDescriptors,
                deploymentPackageDescriptor: {
                    packageType: PackageTypes.Install,
                    id: bundleDetails.id,
                    name: bundleDetails.friendlyName,
                    friendlyName: bundleDetails.friendlyName,
                    version: bundleDetails.version,
                    description: bundleDetails.description,
                    developerName: bundleDetails.developerName,
                    isApplication: bundleDetails.isApplication,
                    containsJavaScript: bundleDetails.containsJavaScript,
                    overlayGroupId: '',
                    hasCustomEntryPoint: true,
                    userRequestedDependentBundles: null,
                    isConfigurationDataIncluded: false,
                    duplicateDataActionTypeForConfigurationData: AX_BUNDLE_DETAILS.duplicateDataActions.ignore.value,
                    definitionsToDeployByType: {},
                    definitionsToDeleteByType: {},
                    dataImportOptionsByRecordDefinitionName: {}
                }
            };
            this.rxWizardService
                .open({
                context: createInstallPackageContext,
                options: wizardOptions
            })
                .then(noop);
        });
    }
    createUpdatePackage() {
        combineLatest([
            this.rxBundleService.get(this.rxBundleCacheService.bundleId),
            this.rxGlobalCacheService.getBundleDescriptors()
        ]).subscribe(([bundleDetails, bundleDescriptors]) => {
            const wizardOptions = {
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.create-update-package.label'),
                allowFinish: true,
                finishButtonLabel: this.translateService.instant('com.bmc.arsys.rx.client.common.close.label'),
                notificationMessage: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.create-update-package.notification'),
                steps: [
                    {
                        id: 'selectDefinitions',
                        name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions.label'),
                        componentFactory: this.componentFactoryResolver.resolveComponentFactory(SelectDefinitionsWizardStepComponent),
                        options: {
                            displayName: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.update-package.label'),
                            subtitleMessage: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions.message'),
                            gridConfig: {
                                enableRowSelection: RowSelectionMode.Multiple
                            }
                        }
                    },
                    {
                        id: 'addData',
                        name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.label'),
                        componentFactory: this.componentFactoryResolver.resolveComponentFactory(AddDataWizardStepComponent),
                        options: {
                            countTitle: 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.update-package.count',
                            descriptionTitle: 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.update-package.description',
                            showGlobalFilterExpressionEditor: false,
                            gridConfig: {
                                columns: ['dataSource', 'name'],
                                defaultDuplicateDataActionType: AX_BUNDLE_DETAILS.duplicateDataActions.ignore.value
                            }
                        }
                    },
                    {
                        id: 'orderData',
                        name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.order-data.label'),
                        componentFactory: this.componentFactoryResolver.resolveComponentFactory(OrderDataWizardStepComponent)
                    },
                    {
                        id: 'selectDefinitionsToDelete',
                        name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions-to-delete.label'),
                        componentFactory: this.componentFactoryResolver.resolveComponentFactory(SelectDefinitionsToDeleteWizardStepComponent),
                        options: {
                            gridConfig: {
                                enableRowSelection: RowSelectionMode.Multiple
                            }
                        }
                    },
                    {
                        id: 'options',
                        name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.options.label'),
                        componentFactory: this.componentFactoryResolver.resolveComponentFactory(OptionsWizardStepComponent),
                        options: {
                            fields: {
                                bundleUpdateFromVersion: {},
                                version: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.options.update-to-version.label'),
                                    tooltip: 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.options.update-to-version.tooltip'
                                }
                            }
                        }
                    },
                    {
                        id: 'package',
                        name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.label'),
                        componentFactory: this.componentFactoryResolver.resolveComponentFactory(PackageWizardStepComponent),
                        options: {
                            isInstallOperation: false,
                            isContentPackageOperation: false
                        }
                    },
                    {
                        id: 'download',
                        name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.download.label'),
                        componentFactory: this.componentFactoryResolver.resolveComponentFactory(DownloadWizardStepComponent)
                    }
                ]
            };
            const createUpdatePackageContext = {
                bundleDetails: bundleDetails,
                bundleDescriptors: bundleDescriptors,
                deploymentPackageDescriptor: {
                    bundleUpdateFromVersion: bundleDetails.version,
                    containsJavaScript: bundleDetails.containsJavaScript,
                    dataImportOptionsByRecordDefinitionName: {},
                    definitionsToDeleteByType: {},
                    definitionsToDeployByType: {},
                    description: bundleDetails.description,
                    developerName: bundleDetails.developerName,
                    duplicateDataActionTypeForConfigurationData: AX_BUNDLE_DETAILS.duplicateDataActions.ignore.value,
                    friendlyName: bundleDetails.friendlyName,
                    hasCustomEntryPoint: true,
                    id: bundleDetails.id,
                    isApplication: bundleDetails.isApplication,
                    isConfigurationDataIncluded: false,
                    name: bundleDetails.friendlyName,
                    overlayGroupId: '',
                    packageType: PackageTypes.Update,
                    version: bundleDetails.version,
                    userRequestedDependentBundles: null
                }
            };
            this.rxWizardService
                .open({
                context: createUpdatePackageContext,
                options: wizardOptions
            })
                .then(noop);
        });
    }
    downloadTranslations(bundleId) {
        this.rxSessionExpirationService
            .keepSessionAlive()
            .pipe(switchMap(() => this.axLocalizedStringsDataPageQuery.get({
            params: {
                startIndex: 0,
                pageSize: 0,
                includeStringsFromUserOverlayOnly: false,
                locale: 'default',
                bundleId: bundleId
            }
        })))
            .subscribe((response) => {
            const file = new Blob([JSON.stringify(response.data[0], null, '\t')], { type: 'application/json' });
            this.ngZone.runOutsideAngular(() => {
                saveAs(file, 'localizable-strings.json');
            });
        });
    }
    manageContentPackages() {
        this.rxModalService
            .openModal({
            content: ManageContentPackagesComponent,
            size: 'rx-lg'
        })
            .catch(noop);
    }
    openConfirmationModal(confirmationMessage) {
        return this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: confirmationMessage
        });
    }
    onClickFileInput(event) {
        const element = event.target;
        element.value = '';
    }
    reinstallBundle(bundle) {
        const confirmationMessage = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.reinstall-bundle.confirmation.message', {
            bundleName: bundle.friendlyName
        });
        this.openConfirmationModal(confirmationMessage).then((result) => {
            if (result) {
                this.renderer.setAttribute(this.fileInput.nativeElement, 'accept', '.zip');
                const unlisten = this.renderer.listen(this.fileInput.nativeElement, 'change', (event) => {
                    const element = event.target;
                    const file = toArray(element.files)[0];
                    if (file) {
                        const bundleDeploymentProgressConfig = {
                            title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.reinstall-bundle.label'),
                            status: ProgressIndicatorStatus.InProgress,
                            header: bundle.friendlyName,
                            subHeader: file === null || file === void 0 ? void 0 : file.name.replace(/\.zip$/i, ''),
                            inProgressMessage: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.reinstall-bundle.in-progress.label'),
                            finishedMessage: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.reinstall-bundle.success.message', { bundleType: bundle.type }),
                            operationStatusMessage: '',
                            failedMessage: ''
                        };
                        this.openModal(ProgressIndicatorModalComponent, bundleDeploymentProgressConfig)
                            .then(() => {
                            if (bundleDeploymentProgressConfig.status === ProgressIndicatorStatus.Finished) {
                                window.location.reload();
                            }
                            else {
                                this.loadData$.next(true);
                            }
                        })
                            .catch(noop);
                        this.axBundleDeploymentService
                            .reinstall(bundle.id, file)
                            .pipe(catchError((error) => {
                            bundleDeploymentProgressConfig.status = ProgressIndicatorStatus.Failed;
                            bundleDeploymentProgressConfig.failedMessage = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.reinstall-bundle.failure.message', { bundleType: bundle.type });
                            return throwError(error);
                        }))
                            .subscribe((response) => {
                            this.axBundleDeploymentService
                                .pollDeploymentStatus(last(response.headers.get('location').split('/')))
                                .subscribe((deploymentStatus) => {
                                if (deploymentStatus.isFinished) {
                                    bundleDeploymentProgressConfig.status = ProgressIndicatorStatus.Finished;
                                    bundleDeploymentProgressConfig.operationStatusMessage =
                                        this.axBundleDeploymentService.buildStatusMessage(deploymentStatus.deploymentParsedStatus);
                                }
                                else if (deploymentStatus.errorMessage) {
                                    bundleDeploymentProgressConfig.failedMessage = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.reinstall-bundle.failure.message', { bundleType: bundle.type });
                                    bundleDeploymentProgressConfig.status = ProgressIndicatorStatus.Failed;
                                    bundleDeploymentProgressConfig.operationStatusMessage = deploymentStatus.errorMessage;
                                }
                            });
                        });
                        element.value = '';
                    }
                    unlisten();
                });
                this.renderer.selectRootElement(this.fileInput.nativeElement, true).click();
            }
        });
    }
    uninstallBundle(bundle) {
        const confirmationMessage = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.uninstall-bundle.confirmation.message', {
            bundleName: bundle.friendlyName
        });
        this.openConfirmationModal(confirmationMessage).then((result) => {
            if (result) {
                const bundleDeploymentProgressConfig = {
                    title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.uninstall-bundle.label'),
                    status: ProgressIndicatorStatus.InProgress,
                    header: bundle.friendlyName,
                    subHeader: `${bundle.type} (${bundle.id}, ${bundle.developerId})`,
                    inProgressMessage: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.uninstall-bundle.uninstalling.label'),
                    finishedMessage: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.uninstall-bundle.success.message', { bundleType: bundle.type }),
                    operationStatusMessage: '',
                    failedMessage: ''
                };
                this.openModal(ProgressIndicatorModalComponent, bundleDeploymentProgressConfig)
                    .then(() => this.router
                    .navigate([RX_APPLICATION.innovationStudioBundleId, 'workspace'])
                    .then(() => window.location.reload()))
                    .catch(noop);
                this.axBundleDeploymentService
                    .uninstall(bundle.id)
                    .pipe(catchError((error) => {
                    bundleDeploymentProgressConfig.status = ProgressIndicatorStatus.Failed;
                    bundleDeploymentProgressConfig.failedMessage = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.uninstall-bundle.failure.message');
                    return throwError(error);
                }))
                    .subscribe((response) => {
                    this.axBundleDeploymentService
                        .pollDeploymentStatus(last(response.headers.get('location').split('/').slice(0, -1)))
                        .subscribe((deploymentStatus) => {
                        if (deploymentStatus.isFinished) {
                            bundleDeploymentProgressConfig.status = ProgressIndicatorStatus.Finished;
                        }
                        else if (deploymentStatus.errorMessage) {
                            bundleDeploymentProgressConfig.failedMessage = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.uninstall-bundle.failure.message');
                            bundleDeploymentProgressConfig.status = ProgressIndicatorStatus.Failed;
                            bundleDeploymentProgressConfig.operationStatusMessage = deploymentStatus.errorMessage;
                        }
                    });
                });
            }
        });
    }
    updateBundle(bundle) {
        const confirmationMessage = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.update-bundle.confirmation.message', {
            bundleName: bundle.friendlyName
        });
        this.openConfirmationModal(confirmationMessage).then((result) => {
            if (result) {
                this.renderer.setAttribute(this.fileInput.nativeElement, 'accept', '.zip');
                const unlisten = this.renderer.listen(this.fileInput.nativeElement, 'change', (event) => {
                    const element = event.target;
                    const file = toArray(element.files)[0];
                    if (file) {
                        const bundleDeploymentProgressConfig = {
                            title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.update-bundle.label'),
                            status: ProgressIndicatorStatus.InProgress,
                            header: bundle.friendlyName,
                            subHeader: file === null || file === void 0 ? void 0 : file.name.replace(/\.zip$/i, ''),
                            inProgressMessage: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.update-bundle.in-progress.label'),
                            finishedMessage: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.update-bundle.success.message', { bundleType: bundle.type }),
                            operationStatusMessage: '',
                            failedMessage: ''
                        };
                        this.openModal(ProgressIndicatorModalComponent, bundleDeploymentProgressConfig)
                            .then(() => {
                            if (bundleDeploymentProgressConfig.status === ProgressIndicatorStatus.Finished) {
                                window.location.reload();
                            }
                            else {
                                this.loadData$.next(true);
                            }
                        })
                            .catch(noop);
                        this.axBundleDeploymentService
                            .update(file)
                            .pipe(catchError((error) => {
                            bundleDeploymentProgressConfig.status = ProgressIndicatorStatus.Failed;
                            bundleDeploymentProgressConfig.failedMessage = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.update-bundle.failure.message', { bundleType: bundle.type });
                            return throwError(error);
                        }))
                            .subscribe((response) => {
                            this.axBundleDeploymentService
                                .pollDeploymentStatus(last(response.headers.get('location').split('/')))
                                .subscribe((deploymentStatus) => {
                                if (deploymentStatus.isFinished) {
                                    bundleDeploymentProgressConfig.status = ProgressIndicatorStatus.Finished;
                                }
                                else if (deploymentStatus.errorMessage) {
                                    bundleDeploymentProgressConfig.failedMessage = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.update-bundle.failure.message', { bundleType: bundle.type });
                                    bundleDeploymentProgressConfig.status = ProgressIndicatorStatus.Failed;
                                    bundleDeploymentProgressConfig.operationStatusMessage = deploymentStatus.errorMessage;
                                }
                            });
                        });
                        element.value = '';
                    }
                    unlisten();
                });
                this.renderer.selectRootElement(this.fileInput.nativeElement, true).click();
            }
        });
    }
    uploadTranslations(bundle) {
        const unlisten = this.renderer.listen(this.fileInput.nativeElement, 'change', (event) => {
            const element = event.target;
            const file = toArray(element.files)[0];
            const fileReader = new FileReader();
            const translationsToUpload$ = [];
            const successfulLocales = [];
            const failedLocales = [];
            if (file) {
                fileReader.onloadend = () => {
                    const content = attempt(JSON.parse.bind(null, fileReader.result));
                    Object.keys(content).map((locale) => {
                        const translations = content[locale];
                        if (!isObject(translations)) {
                            this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.upload-translations.locale-error.message'));
                        }
                        translationsToUpload$.push(this.rxLocalizedStringsLoaderService.uploadTranslation(bundle.id, locale, translations).pipe(tap(() => {
                            successfulLocales.push(locale);
                        }), catchError(() => {
                            failedLocales.push(locale);
                            return of({});
                        })));
                    });
                    forkJoin(translationsToUpload$).subscribe(() => {
                        if (failedLocales.length > 0) {
                            this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.upload-translations.partial-failure.message', {
                                locales: failedLocales.join(' ')
                            }));
                        }
                        if (successfulLocales.length === 0) {
                            this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.upload-translations.failure.message'));
                        }
                        if (failedLocales.length === 0) {
                            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.upload-translations.success.message'));
                        }
                    });
                };
                fileReader.onerror = () => {
                    this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.upload-translations.file-load-failure.message'));
                };
                fileReader.readAsText(file);
                element.value = '';
            }
            unlisten();
        });
        this.renderer.setAttribute(this.fileInput.nativeElement, 'accept', '.json');
        this.renderer.selectRootElement(this.fileInput.nativeElement, true).click();
    }
    importDefinitionsAndData(bundle) {
        const confirmationMessage = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.import-definition-and-data.confirmation.message');
        this.openConfirmationModal(confirmationMessage).then((result) => {
            if (result) {
                this.renderer.setAttribute(this.fileInput.nativeElement, 'accept', '.zip');
                const unlisten = this.renderer.listen(this.fileInput.nativeElement, 'change', (event) => {
                    const element = event.target;
                    const file = toArray(element.files)[0];
                    if (file) {
                        const bundleDeploymentProgressConfig = {
                            title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.import-definition-and-data.label'),
                            status: ProgressIndicatorStatus.InProgress,
                            header: bundle.friendlyName,
                            subHeader: file.name.replace(/\.zip$/i, ''),
                            inProgressMessage: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.import-definition-and-data.in-progress.label'),
                            finishedMessage: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.import-definition-and-data.success.message'),
                            operationStatusMessage: '',
                            failedMessage: ''
                        };
                        this.openModal(ProgressIndicatorModalComponent, bundleDeploymentProgressConfig)
                            .then(() => {
                            if (bundleDeploymentProgressConfig.status === ProgressIndicatorStatus.Finished) {
                                window.location.reload();
                            }
                            else {
                                this.loadData$.next(true);
                            }
                        })
                            .catch(noop);
                        this.axBundleDeploymentService
                            .import(bundle.id, file)
                            .pipe(catchError((error) => {
                            bundleDeploymentProgressConfig.status = ProgressIndicatorStatus.Failed;
                            bundleDeploymentProgressConfig.failedMessage = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.import-definition-and-data.failure.message');
                            return throwError(error);
                        }))
                            .subscribe((response) => {
                            this.axBundleDeploymentService
                                .pollDeploymentStatus(last(response.headers.get('location').split('/')))
                                .subscribe((deploymentStatus) => {
                                if (deploymentStatus.isFinished) {
                                    bundleDeploymentProgressConfig.status = ProgressIndicatorStatus.Finished;
                                }
                                else if (deploymentStatus.errorMessage) {
                                    bundleDeploymentProgressConfig.failedMessage = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.import-definition-and-data.failure.message');
                                    bundleDeploymentProgressConfig.status = ProgressIndicatorStatus.Failed;
                                    bundleDeploymentProgressConfig.operationStatusMessage = deploymentStatus.errorMessage;
                                }
                            });
                        });
                        element.value = '';
                    }
                    unlisten();
                });
                this.renderer.selectRootElement(this.fileInput.nativeElement, true).click();
            }
        });
    }
    openModal(content, data) {
        return this.adaptModalService.open({
            content: content,
            data: data,
            size: 'sm',
            isDialog: true,
            hideBackdrop: false
        });
    }
    downloadContentPackage(bundleDetails) {
        this.rxCreatePackageStatusDataPageService
            .get({
            params: {
                startIndex: 0,
                pageSize: -1,
                bundleId: bundleDetails.id
            }
        })
            .subscribe((response) => {
            const contentPackage = find(response === null || response === void 0 ? void 0 : response.data, { packageType: 'CONTENT' });
            if ((contentPackage === null || contentPackage === void 0 ? void 0 : contentPackage.packageExportStatus) === AX_BUNDLE_DETAILS.packageExportStatuses.packageCreated) {
                this.axBundleDeploymentService.download(bundleDetails.id, contentPackage.packageId).subscribe((data) => {
                    RxFileService.saveFile(data);
                });
            }
            else if ((contentPackage === null || contentPackage === void 0 ? void 0 : contentPackage.packageExportStatus) === AX_BUNDLE_DETAILS.packageExportStatuses.pendingPackageCreate) {
                this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.download-content-package.package-creation-in-progress.error.message'));
            }
            else if ((contentPackage === null || contentPackage === void 0 ? void 0 : contentPackage.packageExportStatus) === AX_BUNDLE_DETAILS.packageExportStatuses.error) {
                const contentPackageConfig = {
                    title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.download-content-package.label'),
                    status: ProgressIndicatorStatus.Failed,
                    finishedMessage: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.download-content-package.package-creation-failed.error.message'),
                    operationStatusMessage: this.axBundleDeploymentService.buildStatusMessage(contentPackage.deploymentParsedStatus)
                };
                this.openModal(ProgressIndicatorModalComponent, contentPackageConfig);
            }
            else {
                this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.download-content-package.package-not-available.error.message'));
            }
        });
    }
    publishChatEnabledService(bundleId) {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            'chatbot',
            bundleId,
            'publish-chat-enabled-service'
        ]);
    }
}
/** @nocollapse */ BundleDetailsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BundleDetailsComponent, deps: [{ token: i1.ActivatedRoute }, { token: i0.ComponentFactoryResolver }, { token: i2.RxAngularApplicationService }, { token: i2.RxBundleCacheService }, { token: i2.RxBundleService }, { token: i3.RxWizardService }, { token: i0.Injector }, { token: i4.AxBundleDeploymentService }, { token: i5.RxModalService }, { token: i6.TranslateService }, { token: i7.AdaptModalService }, { token: i1.Router }, { token: i8.AxLocalizedStringsDataPageQuery }, { token: i0.NgZone }, { token: i2.RxLocalizedStringsLoaderService }, { token: i2.RxNotificationService }, { token: i2.RxGlobalCacheService }, { token: i9.RxCreatePackageStatusDataPageService }, { token: i2.RxOverlayService }, { token: i0.Renderer2 }, { token: i2.RxSessionExpirationService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ BundleDetailsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: BundleDetailsComponent, selector: "ax-bundle-details", viewQueries: [{ propertyName: "fileInput", first: true, predicate: ["fileInput"], descendants: true }], ngImport: i0, template: "<div class=\"d-flex flex-column py-3\" *ngIf=\"bundleDetails$ | async as bundleDetails\">\n  <div class=\"d-flex flex-row-reverse align-items-center justify-content-between flex-fill pl-4\">\n    <div class=\"d-flex flex-row\">\n      <a\n        adapt-button\n        *ngIf=\"bundleDetails.isApplication\"\n        btn-type=\"tertiary\"\n        size=\"large\"\n        rx-id=\"navigation-button\"\n        class=\"d-icon-left-app_eye\"\n        [routerLink]=\"shellDesignerLink$ | async\"\n      >\n        {{ 'com.bmc.arsys.rx.innovation-studio.bundle-details.navigation.label' | translate }}\n      </a>\n\n      <div class=\"dropdown\" *ngIf=\"bundleDetails.isActionMenuVisible\" adaptDropdown placement=\"bottom-right\">\n        <button\n          adapt-button\n          adaptDropdownToggle\n          btn-type=\"tertiary\"\n          size=\"large\"\n          rx-id=\"actions-buttons\"\n          class=\"d-icon-left-action_button_cursor\"\n        >\n          {{ 'com.bmc.arsys.rx.innovation-studio.actions.label' | translate }}\n        </button>\n\n        <div class=\"dropdown-menu\" adaptDropdownMenu *ngIf=\"!bundleDetails.isBusinessAnalyst\">\n          <div class=\"dropdown-header\">\n            {{ 'com.bmc.arsys.rx.innovation-studio.packaging.label' | translate }}\n          </div>\n\n          <ng-container *ngIf=\"bundleDetails.isBundleFromCurrentOverlayGroup\">\n            <button rx-id=\"create-install-package-menu-item\" class=\"dropdown-item\" (click)=\"createInstallPackage()\">\n              {{ 'com.bmc.arsys.rx.innovation-studio.create-install-package.label' | translate }}\n            </button>\n            <button rx-id=\"create-update-package-menu-item\" class=\"dropdown-item\" (click)=\"createUpdatePackage()\">\n              {{ 'com.bmc.arsys.rx.innovation-studio.create-update-package.label' | translate }}\n            </button>\n          </ng-container>\n\n          <ng-container *ngIf=\"!bundleDetails.isBundleFromCurrentOverlayGroup\">\n            <button rx-id=\"create-content-package-menu-item\" class=\"dropdown-item\" (click)=\"createContentPackage()\">\n              {{ 'com.bmc.arsys.rx.innovation-studio.create-content-package.label' | translate }}\n            </button>\n            <button\n              rx-id=\"download-content-package-menu-item\"\n              class=\"dropdown-item\"\n              (click)=\"downloadContentPackage(bundleDetails)\"\n            >\n              {{ 'com.bmc.arsys.rx.innovation-studio.download-content-package.label' | translate }}\n            </button>\n            <button rx-id=\"manage-content-packages-menu-item\" class=\"dropdown-item\" (click)=\"manageContentPackages()\">\n              {{ 'com.bmc.arsys.rx.innovation-studio.manage-content-packages.label' | translate }}\n            </button>\n            <button\n              rx-id=\"content-package-import-logs-menu-item\"\n              class=\"dropdown-item\"\n              (click)=\"openContentPackageImportLogsModal()\"\n            >\n              {{ 'com.bmc.arsys.rx.innovation-studio.content-package-import-logs.label' | translate }}\n            </button>\n          </ng-container>\n\n          <div class=\"dropdown-header\">\n            {{ 'com.bmc.arsys.rx.innovation-studio.deployment.label' | translate }}\n          </div>\n\n          <button\n            rx-id=\"import-definitions-and-data-menu-item\"\n            class=\"dropdown-item\"\n            *ngIf=\"!bundleDetails.isBundleFromCurrentOverlayGroup\"\n            (click)=\"importDefinitionsAndData(bundleDetails)\"\n          >\n            {{ 'com.bmc.arsys.rx.innovation-studio.import-definition-and-data.label' | translate }}\n          </button>\n\n          <ng-container *ngIf=\"bundleDetails.isBundleFromCurrentOverlayGroup\">\n            <button rx-id=\"update-menu-item\" class=\"dropdown-item\" (click)=\"updateBundle(bundleDetails)\">\n              {{\n                'com.bmc.arsys.rx.innovation-studio.update-bundle.menu.label'\n                  | translate: { bundleType: bundleDetails.type.toLowerCase() }\n              }}\n            </button>\n            <button rx-id=\"reinstall-menu-item\" class=\"dropdown-item\" (click)=\"reinstallBundle(bundleDetails)\">\n              {{\n                'com.bmc.arsys.rx.innovation-studio.reinstall-bundle.menu.label'\n                  | translate: { bundleType: bundleDetails.type.toLowerCase() }\n              }}\n            </button>\n            <button rx-id=\"uninstall-menu-item\" class=\"dropdown-item\" (click)=\"uninstallBundle(bundleDetails)\">\n              {{\n                'com.bmc.arsys.rx.innovation-studio.uninstall-bundle.menu.label'\n                  | translate: { bundleType: bundleDetails.type.toLowerCase() }\n              }}\n            </button>\n          </ng-container>\n\n          <ng-container *ngIf=\"!bundleDetails.isFoundationBundle\">\n            <div class=\"dropdown-header\">\n              {{ 'com.bmc.arsys.rx.innovation-studio.translations.menu.label' | translate }}\n            </div>\n            <button\n              rx-id=\"download-translations-menu-item\"\n              class=\"dropdown-item\"\n              (click)=\"downloadTranslations(bundleDetails.id)\"\n            >\n              {{ 'com.bmc.arsys.rx.innovation-studio.download-translations.menu.label' | translate }}\n            </button>\n            <button\n              rx-id=\"upload-translations-menu-item\"\n              class=\"dropdown-item\"\n              (click)=\"uploadTranslations(bundleDetails)\"\n            >\n              {{ 'com.bmc.arsys.rx.innovation-studio.upload-translations.menu.label' | translate }}\n            </button>\n\n            <div class=\"dropdown-header\">{{ 'com.bmc.arsys.rx.innovation-studio.chat.label' | translate }}</div>\n            <button\n              rx-id=\"enable-chat-for-service\"\n              class=\"dropdown-item\"\n              (click)=\"publishChatEnabledService(bundleDetails.id)\"\n            >\n              {{ 'com.bmc.arsys.rx.innovation-studio.publish-chat-enabled-service.label' | translate }}\n            </button>\n          </ng-container>\n        </div>\n\n        <div class=\"dropdown-menu\" adaptDropdownMenu *ngIf=\"bundleDetails.isBusinessAnalyst\">\n          <div class=\"dropdown-header\">{{ 'com.bmc.arsys.rx.innovation-studio.chat.label' | translate }}</div>\n          <button\n            rx-id=\"enable-chat-for-service\"\n            class=\"dropdown-item\"\n            (click)=\"publishChatEnabledService(bundleDetails.id)\"\n          >\n            {{ 'com.bmc.arsys.rx.innovation-studio.publish-chat-enabled-service.label' | translate }}\n          </button>\n        </div>\n      </div>\n\n      <a\n        adapt-button\n        btn-type=\"tertiary\"\n        size=\"large\"\n        class=\"d-icon-left-pop_up\"\n        rx-id=\"visit-deployed-application-button\"\n        *ngIf=\"bundleDetails.isApplication\"\n        target=\"_blank\"\n        href=\"{{ applicationLink$ | async }}\"\n      >\n        {{ 'com.bmc.arsys.rx.innovation-studio.visit-deployed-application.label' | translate }}\n      </a>\n    </div>\n    <div class=\"d-flex flex-row align-items-center rx-ellipsis\">\n      <adapt-icon name=\"app\" class=\"mr-3 app-icon\"></adapt-icon>\n\n      <h1 class=\"m-0 py-2 rx-ellipsis\" title=\"{{ bundleDetails.friendlyName }}\">{{ bundleDetails.friendlyName }}</h1>\n\n      <adapt-icon\n        name=\"info_circle_o_adapt\"\n        class=\"ml-2 mt-1\"\n        placement=\"bottom\"\n        [autoClose]=\"'outside'\"\n        [adaptPopover]=\"popover\"\n      >\n      </adapt-icon>\n    </div>\n  </div>\n\n  <span class=\"text-tertiary ml-6 pl-3 rx-ellipsis\">{{ bundleDetails.description }}</span>\n\n  <input\n    #fileInput\n    type=\"file\"\n    accept=\".zip\"\n    hidden\n    [multiple]=\"false\"\n    (click)=\"onClickFileInput($event)\"\n    rx-id=\"package-file-input\"\n  />\n\n  <ng-template #popover>\n    <div class=\"bundle-info-popover\">\n      <strong>{{\n        (bundleDetails.type === bundleTypes.application\n          ? 'com.bmc.arsys.rx.client.common.application-id.label'\n          : 'com.bmc.arsys.rx.client.common.library-id.label'\n        ) | translate\n      }}</strong>\n      <div class=\"mb-2\">{{ bundleDetails.id }}</div>\n\n      <strong>{{ 'com.bmc.arsys.rx.innovation-studio.bundle-details.version.label' | translate }}</strong>\n      <div class=\"mb-2\">{{ bundleDetails.version }}</div>\n\n      <strong>{{ 'com.bmc.arsys.rx.innovation-studio.bundle-details.developer.label' | translate }}</strong>\n      <div>{{ bundleDetails.developerName }}</div>\n    </div>\n  </ng-template>\n</div>\n\n<router-outlet></router-outlet>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%}.app-icon{font-size:2rem}.bundle-info-popover{font-size:.75rem}\n"], components: [{ type: i7.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i7.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i7.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i10.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }, { type: i7.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i7.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i7.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }, { type: i1.RouterOutlet, selector: "router-outlet", outputs: ["activate", "deactivate"], exportAs: ["outlet"] }], pipes: { "async": i10.AsyncPipe, "translate": i6.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BundleDetailsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-bundle-details',
                    templateUrl: './bundle-details.component.html',
                    styleUrls: ['./bundle-details.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActivatedRoute }, { type: i0.ComponentFactoryResolver }, { type: i2.RxAngularApplicationService }, { type: i2.RxBundleCacheService }, { type: i2.RxBundleService }, { type: i3.RxWizardService }, { type: i0.Injector }, { type: i4.AxBundleDeploymentService }, { type: i5.RxModalService }, { type: i6.TranslateService }, { type: i7.AdaptModalService }, { type: i1.Router }, { type: i8.AxLocalizedStringsDataPageQuery }, { type: i0.NgZone }, { type: i2.RxLocalizedStringsLoaderService }, { type: i2.RxNotificationService }, { type: i2.RxGlobalCacheService }, { type: i9.RxCreatePackageStatusDataPageService }, { type: i2.RxOverlayService }, { type: i0.Renderer2 }, { type: i2.RxSessionExpirationService }]; }, propDecorators: { fileInput: [{
                type: ViewChild,
                args: ['fileInput', { static: false }]
            }] } });
//# sourceMappingURL=bundle-details.component.js.map