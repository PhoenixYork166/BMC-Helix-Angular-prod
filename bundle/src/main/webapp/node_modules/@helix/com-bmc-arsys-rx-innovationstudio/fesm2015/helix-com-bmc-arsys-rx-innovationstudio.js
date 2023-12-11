import * as i8 from '@angular/common';
import { CommonModule, DatePipe } from '@angular/common';
import * as i0 from '@angular/core';
import { Component, ViewChild, Injectable, EventEmitter, Input, Output, ChangeDetectionStrategy, Pipe, HostListener, ViewChildren, NgModule } from '@angular/core';
import { DocumentDesignerPageComponent, DocumentDesignerPageModule } from '@helix/platform/document/designer';
import { RxAssociationDesignerPageComponent, RxAssociationDesignerPageModule } from '@helix/platform/association/designer';
import { ConfigDesignerPageComponent, ConfigDesignerPageModule } from '@helix/platform/config/designer';
import { ViewDesignerPageComponent, RxViewDesignerPageModule } from '@helix/platform/view/designer-page';
import { ProcessDesignerPageComponent, ProcessDesignerPageModule } from '@helix/platform/process/designer';
import { RxShellDesignerPageComponent, RxShellDesignerPageModule } from '@helix/platform/view/shell-designer-page';
import * as i1$1 from '@angular/router';
import { NavigationEnd, RouterModule } from '@angular/router';
import { RxEventDesignerPageComponent, RxEventDesignerPageModule } from '@helix/platform/event/designer';
import { RxNamedListDesignerPageComponent, RxNamedListDesignerPageModule } from '@helix/platform/named-list/designer';
import * as i2$2 from '@helix/platform/record/designer';
import { RecordDesignerPageComponent, RecordDesignerModule, RecordDesignerPageModule } from '@helix/platform/record/designer';
import * as i2 from '@helix/platform/shared/api';
import { RX_APPLICATION, RX_RESOURCE_URLS, DataPage, RxExpressionConfigurator, RxDefinitionNameService, ExpressionOperatorRowsByGroup, ExpressionOperatorGroup, RX_OVERLAY, RX_BUNDLE, RX_PERMISSION, RX_ADMINISTRATION, RxOverlayService, RxCurrentUserService, RxBundleService, RX_DESIGNER, Tooltip, RxComponentCanDeactivateGuard, RxKeepSessionAliveResolver, RxFeatureGuard, RxDefinitionModule, RxOverlayModule } from '@helix/platform/shared/api';
import * as i2$3 from '@helix/platform/view/api';
import { RowDataItemIdFieldName, RX_VIEW_LAYOUTS, LayoutTypes, RX_VIEW_DEFINITION, OpenViewActionModalSize, RxViewComponentType, RxViewComponentResolver } from '@helix/platform/view/api';
import { RxWebApiDesignerPageComponent, RxWebApiDesignerPageModule } from '@helix/platform/web-api/designer';
import { castArray, cloneDeep, map as map$1, intersectionBy, remove, head, isEqual, defaults, reject, get, some, chain, includes, sortBy, reduce, isEmpty, forEach, find, isArray, isObject, intersection, concat, noop, filter as filter$1, assign, lowerFirst, pick, findIndex, keys, differenceBy, compact, last, initial, transform, isUndefined, startsWith, values, first, toArray, attempt, capitalize, isNull, has, mapValues, omit, pickBy, forOwn } from 'lodash';
import { startWith, map, tap, finalize, switchMapTo, takeUntil, switchMap, skip, shareReplay, distinctUntilChanged, filter, skipWhile, withLatestFrom, pluck, take, pairwise, catchError } from 'rxjs/operators';
import * as i3 from '@ngx-translate/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import * as i1 from '@bmc-ux/adapt-angular';
import { DismissReasons, TreeWrap, LoaderType, AdaptButtonModule, AdaptIconModule, AdaptDropdownModule, AdaptRxTextfieldModule, AdaptRxSelectModule, AdaptBusyModule, AdaptRxFormControlModule, AdaptRxRadiobuttonModule, AdaptTooltipModule, AdaptTreeModule, AdaptPopoverModule, AdaptAlertModule, AdaptEmptyStateModule, AdaptDockedPanelModule, AdaptTabsModule, AdaptSidebarModule, AdaptModalModule, AdaptRxLabelModule, AdaptRxCheckboxModule, AdaptRxSwitchModule, AdaptRxTextareaModule, AdaptButtonGroupModule } from '@bmc-ux/adapt-angular';
import * as i1$5 from '@helix/platform/record/api';
import { RX_RECORD_DEFINITION, RecordFieldOption, RxRecordDefinitionResourceTypePipeModule } from '@helix/platform/record/api';
import * as i2$1 from '@helix/platform/shared/components';
import { RxDefinitionPickerType, RxDefinitionPickerScope, RenameDefinitionModalComponent, RxPermissionEditorComponent, TextFormControlComponent, AttachmentFormControlComponent, InputListFormControlComponent, TimeFormControlComponent, DateTimeFormControlComponent, DateFormControlComponent, CounterFormControlComponent, BooleanFormControlComponent, RecordInstanceFormControlComponent, SelectFormControlComponent, ExpressionFormControlModule, RxDefinitionPickerModule, RxWizardModule, RenameDefinitionModalModule, RxFormBuilderModule, RxPermissionEditorModule, RxIframeModule } from '@helix/platform/shared/components';
import * as i3$1 from '@helix/platform/ui-kit';
import { RxModalClass, RX_MODAL, ProgressIndicatorStatus, ProgressIndicatorModalComponent, RxBusyIndicatorModule, RxModalModule, RxBreadcrumbBarModule, ReadOnlyFieldModule } from '@helix/platform/ui-kit';
import { ReplaySubject, of, NEVER, combineLatest, BehaviorSubject, from, forkJoin, Subject, timer, EMPTY, throwError, noop as noop$1 } from 'rxjs';
import * as i1$2 from '@angular/common/http';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as i4 from '@angular/forms';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import * as i5 from '@helix/platform/view/components';
import { ColumnSortDirection, RowSelectionMode, RecordGridComponent, RecordEditorMode, ContainerRowWrap, RecordGridModule, ActionButtonModule } from '@helix/platform/view/components';
import * as i5$1 from '@helix/platform/utils';
import { RxFileService } from '@helix/platform/utils';
import * as i1$3 from '@helix/platform/document/api';
import * as i1$4 from '@helix/platform/web-api/api';
import * as i6 from '@helix/platform/process/api';
import { RX_PROCESS_DEFINITION } from '@helix/platform/process/api';
import * as i2$4 from '@helix/platform/rule/api';
import { RxRuleTriggerEventPipe, RxRulePipesModule } from '@helix/platform/rule/api';
import * as i1$6 from '@helix/platform/association/api';
import { RX_ASSOCIATION_DEFINITION, RxAssociationCardinalityPipe, RxAssociationConstraintsPipe, RxAssociationPipesModule } from '@helix/platform/association/api';
import * as i1$7 from '@helix/platform/named-list/api';
import * as i1$8 from '@helix/platform/event/api';
import * as i1$9 from '@helix/platform/event-statistics/api';
import * as i5$2 from '@helix/platform/chatbot/api';
import { RX_CHATBOTS } from '@helix/platform/chatbot/api';
import { saveAs } from 'file-saver';
import * as i9 from '@bmc-ux/adapt-table';
import { AdaptTableModule } from '@bmc-ux/adapt-table';
import * as i6$1 from '@helix/platform/view/runtime';
import * as i7 from '@helix/platform/view/actions';
import { RX_OPEN_VIEW } from '@helix/platform/view/actions';
import moment from 'moment-es6';
import * as i2$5 from '@helix/platform/process/components';
import { RxProcessPreviewModule } from '@helix/platform/process/components';

var BundleDefinitionTab;
(function (BundleDefinitionTab) {
    BundleDefinitionTab["Records"] = "record-definitions";
    BundleDefinitionTab["Views"] = "view-definitions";
    BundleDefinitionTab["Processes"] = "process-definitions";
    BundleDefinitionTab["Rules"] = "rule-definitions";
    BundleDefinitionTab["Associations"] = "association-definitions";
    BundleDefinitionTab["NamedLists"] = "named-list-definitions";
    BundleDefinitionTab["Documents"] = "document-definitions";
    BundleDefinitionTab["WebAPIs"] = "web-api-definitions";
    BundleDefinitionTab["Events"] = "event-definitions";
    BundleDefinitionTab["EventStatistics"] = "event-statistics-definitions";
    BundleDefinitionTab["Chatbots"] = "chatbot-definitions";
    BundleDefinitionTab["Configurations"] = "config-definitions";
})(BundleDefinitionTab || (BundleDefinitionTab = {}));
var PackageTypes;
(function (PackageTypes) {
    PackageTypes["Content"] = "CONTENT";
    PackageTypes["Install"] = "INSTALL";
    PackageTypes["Update"] = "UPDATE";
})(PackageTypes || (PackageTypes = {}));

const standardDefinitionActionNames = {
    new: 'new',
    copy: 'copy',
    delete: 'delete',
    rename: 'rename',
    revertCustomization: 'revert-customization'
};
const AX_BUNDLE_DETAILS = {
    standardDefinitionActionNames,
    standardDefinitionActions: {
        [standardDefinitionActionNames.copy]: {
            labelKey: 'com.bmc.arsys.rx.client.common.copy.label',
            id: standardDefinitionActionNames.copy,
            disabled: true,
            rxId: 'copy-button',
            icon: 'files_copy_o'
        },
        [standardDefinitionActionNames.new]: {
            labelKey: 'com.bmc.arsys.rx.client.common.new.label',
            id: standardDefinitionActionNames.new,
            disabled: true,
            rxId: 'new-button',
            icon: 'plus_circle'
        },
        [standardDefinitionActionNames.delete]: {
            labelKey: 'com.bmc.arsys.rx.client.common.delete.label',
            id: standardDefinitionActionNames.delete,
            disabled: true,
            rxId: 'delete-button',
            icon: 'trash'
        },
        [standardDefinitionActionNames.rename]: {
            labelKey: 'com.bmc.arsys.rx.client.common.rename.label',
            id: standardDefinitionActionNames.rename,
            disabled: true,
            rxId: 'rename-button',
            icon: 'field_text'
        },
        [standardDefinitionActionNames.revertCustomization]: {
            labelKey: 'com.bmc.arsys.rx.innovation-studio.definition-actions.revert-customization.label',
            id: standardDefinitionActionNames.revertCustomization,
            disabled: true,
            rxId: 'revert-button',
            icon: 'undo'
        }
    },
    definitionGridColumns: {
        name: {
            title: 'com.bmc.arsys.rx.client.common.name.label',
            fieldId: 'name'
        },
        scope: {
            title: 'com.bmc.arsys.rx.client.admin.web-api-connections.scope.label',
            fieldId: 'scope',
            visible: false
        },
        customizationPerspective: {
            title: 'com.bmc.arsys.rx.client.admin.cognitive-search.status.label',
            fieldId: 'customizationPerspective',
            visible: false
        },
        lastUpdateTime: {
            title: 'com.bmc.arsys.rx.client.admin.cognitive-training.modified-date.label',
            fieldId: 'lastUpdateTime'
        },
        lastChangedBy: {
            title: 'com.bmc.arsys.rx.client.common.modified-by.label',
            fieldId: 'lastChangedBy'
        },
        isEnabled: {
            title: 'com.bmc.arsys.rx.client.approval.notification-configuration.enabled-field.label',
            fieldId: 'isEnabled'
        }
    },
    configurationGridColumns: {
        component: {
            title: 'com.bmc.arsys.rx.client.common.name.label',
            fieldId: 'component'
        },
        componentType: {
            title: 'com.bmc.arsys.rx.client.common.item-type.label',
            fieldId: 'componentType'
        },
        status: {
            title: 'com.bmc.arsys.rx.client.common.status.label',
            fieldId: 'status'
        }
    },
    tabs: [
        {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.records.label',
            id: BundleDefinitionTab.Records
        },
        {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.views.label',
            id: BundleDefinitionTab.Views
        },
        {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.processes.label',
            id: BundleDefinitionTab.Processes
        },
        {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.rules.label',
            id: BundleDefinitionTab.Rules
        },
        {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.associations.label',
            id: BundleDefinitionTab.Associations
        },
        {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.named-lists.label',
            id: BundleDefinitionTab.NamedLists
        },
        {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.documents.label',
            id: BundleDefinitionTab.Documents
        },
        {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.web-apis.label',
            id: BundleDefinitionTab.WebAPIs
        },
        {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.events.label',
            id: BundleDefinitionTab.Events
        },
        {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.event-statistics.label',
            id: BundleDefinitionTab.EventStatistics
        },
        {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.chatbots.label',
            id: BundleDefinitionTab.Chatbots
        },
        {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.configurations.label',
            id: BundleDefinitionTab.Configurations
        }
    ],
    errorCodes: {
        packageCreationAlreadyInProgress: 6117
    },
    packageExportStatuses: {
        packageCreated: 'PackageCreated',
        pendingPackageCreate: 'PendingPackageCreate',
        error: 'Error'
    },
    packageDeployStatuses: {
        error: 'Error',
        deployed: 'Deployed'
    },
    duplicateDataActions: {
        create: {
            value: 'CREATE_NEW_RECORD',
            displayName: 'Create New'
        },
        ignore: {
            value: 'THROW_ERROR',
            displayName: 'Ignore'
        },
        merge: {
            value: 'MERGE',
            displayName: 'Merge'
        },
        overwrite: {
            value: 'REPLACE',
            displayName: 'Overwrite'
        }
    },
    definitionTypes: {
        association: 'ASSOCIATION',
        document: 'DOCUMENT',
        event: 'EVENT',
        eventStatistics: 'EVENT_STATISTICS',
        namedList: 'NAMED_LIST',
        process: 'PROCESS',
        record: 'RECORD',
        rule: 'RULE',
        view: 'VIEW',
        webApi: 'WEBAPI'
    }
};

const RX_COPY_DEFINITION = {
    resourceType: 'com.bmc.arsys.rx.application.common.CopyDefinitionCommand'
};
var CopyDefinitionType;
(function (CopyDefinitionType) {
    CopyDefinitionType["Document"] = "document";
    CopyDefinitionType["Event"] = "event";
    CopyDefinitionType["EventStatistics"] = "event-statistics";
    CopyDefinitionType["NamedList"] = "named-list";
    CopyDefinitionType["Process"] = "process";
    CopyDefinitionType["Record"] = "record";
    CopyDefinitionType["Rule"] = "rule";
    CopyDefinitionType["View"] = "view";
    CopyDefinitionType["WebApi"] = "web-api";
})(CopyDefinitionType || (CopyDefinitionType = {}));
const copyDefinitionTypeMap = {
    [CopyDefinitionType.Document]: 'DOCUMENT_DEFINITION',
    [CopyDefinitionType.Event]: 'EVENT_DEFINITION',
    [CopyDefinitionType.EventStatistics]: 'EVENT_STATISTICS_DEFINITION',
    [CopyDefinitionType.NamedList]: 'NAMED_LIST',
    [CopyDefinitionType.Process]: 'PROCESS_DEFINITION',
    [CopyDefinitionType.Record]: 'RECORD_DEFINITION',
    [CopyDefinitionType.Rule]: 'RULE_DEFINITION',
    [CopyDefinitionType.View]: 'VIEW_DEFINITION',
    [CopyDefinitionType.WebApi]: 'WEBAPI_DEFINITION'
};

class CopyDefinitionComponent extends RxModalClass {
    constructor(activeModalRef, rxOverlayService, rxGlobalCacheService, rxNotificationService, router, translateService, rxDefinitionNameService, httpClient, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.rxOverlayService = rxOverlayService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxNotificationService = rxNotificationService;
        this.router = router;
        this.translateService = translateService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.httpClient = httpClient;
        this.injector = injector;
        this.targetBundle = [];
        this.autoFocusTargetBundleField = true;
        this.config = this.activeModalRef.getData();
        this.definitionDisplayName = this.rxDefinitionNameService.getDisplayName(this.config.definitionName);
        this.bundles$ = this.rxGlobalCacheService.getBundleDescriptors().pipe(startWith([]), map((bundleDescriptors) => bundleDescriptors
            .filter((bundleDescriptor) => ![
            RX_APPLICATION.settingsBundleId,
            RX_APPLICATION.standardlib,
            RX_APPLICATION.innovationStudioBundleId,
            RX_APPLICATION.platformBundleId
        ].includes(bundleDescriptor.id) && this.rxOverlayService.areNewDefinitionsAllowedSync(bundleDescriptor))
            .sort((bundle, bundleToCompare) => bundle.friendlyName.localeCompare(bundleToCompare.friendlyName))), tap((bundleDescriptors) => {
            const sourceBundleDescriptor = bundleDescriptors.find((bundle) => bundle.id === this.rxDefinitionNameService.getBundleId(this.config.definitionName));
            if (sourceBundleDescriptor) {
                this.targetBundle = castArray(sourceBundleDescriptor);
                this.autoFocusTargetBundleField = false;
            }
        }));
    }
    isDirty() {
        return this.selectBundleForm.dirty;
    }
    optionFormatter(bundleDescriptor) {
        return bundleDescriptor.friendlyName;
    }
    copyDefinition() {
        const targetDefinitionName = this.rxDefinitionNameService.getDefinitionName(this.targetBundle[0].id, this.definitionDisplayName);
        this.allowDismiss = false;
        this.httpClient
            .post(RX_RESOURCE_URLS.command, {
            resourceType: RX_COPY_DEFINITION.resourceType,
            type: copyDefinitionTypeMap[this.config.definitionType],
            srcName: this.config.definitionName,
            destName: targetDefinitionName
        })
            .pipe(finalize(() => {
            this.allowDismiss = true;
        }))
            .subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.definition-copied.message'));
            this.activeModalRef.close();
            this.router.navigate([
                RX_APPLICATION.innovationStudioBundleId,
                this.config.definitionType,
                this.config.editFragment || 'edit',
                targetDefinitionName
            ]);
        });
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
}
/** @nocollapse */ CopyDefinitionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CopyDefinitionComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.RxOverlayService }, { token: i2.RxGlobalCacheService }, { token: i2.RxNotificationService }, { token: i1$1.Router }, { token: i3.TranslateService }, { token: i2.RxDefinitionNameService }, { token: i1$2.HttpClient }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ CopyDefinitionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CopyDefinitionComponent, selector: "ax-copy-definition", viewQueries: [{ propertyName: "selectBundleForm", first: true, predicate: ["selectBundleForm"], descendants: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ 'com.bmc.arsys.rx.innovation-studio.copy-definition.label' | translate }}\n  </h5>\n  <button\n    class=\"close dp-close\"\n    data-dismiss=\"modal\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <form #selectBundleForm=\"ngForm\">\n    <adapt-rx-select\n      [autofocus]=\"autoFocusTargetBundleField\"\n      rx-id=\"application-name\"\n      required\n      name=\"targetBundle\"\n      [(ngModel)]=\"targetBundle\"\n      [options]=\"bundles$ | async\"\n      [optionFormatter]=\"optionFormatter\"\n      [disabled]=\"!allowDismiss\"\n      label=\"{{ 'com.bmc.arsys.rx.innovation-studio.copy-definition.target-application.label' | translate }}\"\n      class=\"mb-3\"\n    >\n    </adapt-rx-select>\n    <adapt-rx-textfield\n      [autofocus]=\"!autoFocusTargetBundleField\"\n      rx-id=\"definition-name\"\n      class=\"mb-6\"\n      label=\"{{ 'com.bmc.arsys.rx.innovation-studio.definition-name.label' | translate }}\"\n      name=\"definition\"\n      required\n      [(ngModel)]=\"definitionDisplayName\"\n      [disabled]=\"!allowDismiss\"\n    >\n    </adapt-rx-textfield>\n  </form>\n</div>\n\n<div class=\"modal-footer d-flex w-100\">\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    [adaptInlineLoader]=\"!allowDismiss\"\n    (click)=\"copyDefinition()\"\n    [disabled]=\"selectBundleForm.pristine || selectBundleForm.invalid || !allowDismiss\"\n    rx-id=\"ok-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.copy.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n    rx-id=\"cancel-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i4.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i4.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i4.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i1.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i3.TranslatePipe, "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CopyDefinitionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-copy-definition',
                    templateUrl: './copy-definition.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.RxOverlayService }, { type: i2.RxGlobalCacheService }, { type: i2.RxNotificationService }, { type: i1$1.Router }, { type: i3.TranslateService }, { type: i2.RxDefinitionNameService }, { type: i1$2.HttpClient }, { type: i0.Injector }]; }, propDecorators: { selectBundleForm: [{
                type: ViewChild,
                args: ['selectBundleForm']
            }] } });

class RxCopyDefinitionService {
    constructor(rxModalService) {
        this.rxModalService = rxModalService;
    }
    openCopyDefinitionComponentModal(row, definitionType, editFragment) {
        return this.rxModalService.openModal({
            content: CopyDefinitionComponent,
            data: {
                definitionName: row.name,
                definitionType,
                editFragment
            },
            size: 'sm'
        });
    }
}
/** @nocollapse */ RxCopyDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCopyDefinitionService, deps: [{ token: i3$1.RxModalService }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ RxCopyDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCopyDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCopyDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i3$1.RxModalService }]; } });

class DefinitionTabComponent {
    constructor(translateService, rxBundleCacheService, rxSessionExpirationService, rxGainsightConfiguratorService) {
        this.translateService = translateService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxSessionExpirationService = rxSessionExpirationService;
        this.rxGainsightConfiguratorService = rxGainsightConfiguratorService;
        this.customAction = new EventEmitter();
        this.deleteDefinition = new EventEmitter();
        this.renameDefinition = new EventEmitter();
        this.revertCustomization = new EventEmitter();
        this.copyDefinition = new EventEmitter();
        this.addDefinition = new EventEmitter();
        this.rowSelectionChanged = new EventEmitter();
        this.destroyed$ = new ReplaySubject(1);
    }
    set definitionActions(definitionActions) {
        this._definitionActions = (definitionActions || []).map((definitionAction) => (Object.assign(Object.assign({}, (AX_BUNDLE_DETAILS.standardDefinitionActions[definitionAction.id] || {})), definitionAction)));
    }
    get definitionActions() {
        return this._definitionActions;
    }
    set gridColumns(columns) {
        this._gridColumns = columns.map((column) => {
            const columnConfig = Object.assign(Object.assign({}, column), { title: this.translateService.instant(column.title) });
            if (column.fieldId === AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective.fieldId) {
                columnConfig.cellTemplate = this.customizationStatusCellTemplate;
            }
            else if (column.fieldId === AX_BUNDLE_DETAILS.definitionGridColumns.isEnabled.fieldId) {
                columnConfig.cellTemplate = this.isEnabledCellTemplate;
            }
            else if (column.fieldId === AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId && !column.cellTemplate) {
                columnConfig.cellTemplate = this.nameCellTemplate;
            }
            else if (column.fieldId === AX_BUNDLE_DETAILS.definitionGridColumns.scope.fieldId && !column.cellTemplate) {
                columnConfig.cellTemplate = this.scopeCellTemplate;
            }
            if (column.fieldId === AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime.fieldId) {
                columnConfig.sortable = { direction: ColumnSortDirection.Desc, priority: 0 };
            }
            return columnConfig;
        });
    }
    get gridColumns() {
        return this._gridColumns;
    }
    ngOnInit() {
        var _a;
        (_a = this.editRouterLink) !== null && _a !== void 0 ? _a : (this.editRouterLink = `/${RX_APPLICATION.innovationStudioBundleId}/${this.definitionType}/edit/`);
        this.recordGridConfig$ = of({
            guid: `ax-${this.definitionType}-definitions-grid`,
            enableRowSelection: RowSelectionMode.Multiple,
            getRecordDefinition: () => of(this.recordDefinition),
            columns: this.gridColumns,
            enableFiltering: false,
            useExternalFiltering: false,
            recordIdField: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
            styles: 'flex-fill',
            getData: () => this.rxSessionExpirationService.keepSessionAlive().pipe(switchMapTo(this.definitions$)),
            emptyStateLabelText: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.definition-tab.no-definition.label')
        });
        this.recordGrid.rowSelectionChanged.pipe(takeUntil(this.destroyed$)).subscribe((selectedRows) => {
            this.rowSelectionChanged.emit(cloneDeep(selectedRows));
        });
        this.rxBundleCacheService
            .getCurrentBundleDescriptor()
            .subscribe((bundleDescriptor) => (this.bundleDescriptor = bundleDescriptor));
        this.rxGainsightConfiguratorService.updateGlobalContext({
            subProductLevel1: {
                name: 'Design'
            },
            subProductLevel2: {
                name: 'Bundle workspace'
            }
        });
    }
    onClick(actionId) {
        switch (actionId) {
            case AX_BUNDLE_DETAILS.standardDefinitionActionNames.copy:
                this.copyDefinition.emit(this.recordGrid.api.getFirstSelectedRow());
                break;
            case AX_BUNDLE_DETAILS.standardDefinitionActionNames.delete:
                this.deleteDefinition.emit(this.recordGrid.api.getSelectedRows());
                break;
            case AX_BUNDLE_DETAILS.standardDefinitionActionNames.revertCustomization:
                this.revertCustomization.emit(this.recordGrid.api.getSelectedRows());
                break;
            case AX_BUNDLE_DETAILS.standardDefinitionActionNames.rename:
                this.renameDefinition.emit({
                    selectedRow: this.recordGrid.api.getFirstSelectedRow(),
                    definitionNames: map$1(this.recordGrid.adaptTableConfig.data, AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId)
                });
                break;
            case AX_BUNDLE_DETAILS.standardDefinitionActionNames.new:
                this.addDefinition.emit();
                break;
            default:
                this.customAction.emit({ actionId, selectedRows: this.recordGrid.api.getSelectedRows() });
                break;
        }
    }
    ngOnChanges(changes) {
        var _a, _b;
        if (((_a = changes.isActionInProgress) === null || _a === void 0 ? void 0 : _a.currentValue) === true) {
            this.busySubscription = NEVER.subscribe();
        }
        else {
            (_b = this.busySubscription) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        }
    }
    trackByFn(definitionAction) {
        return definitionAction.id;
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
        this.rxGainsightConfiguratorService.removeGlobalContext(['subProductLevel2']);
    }
    getDeleteSelectedDefinitionMessage() {
        const selectedRows = this.recordGrid.api.getSelectedRows();
        const visibleRows = this.recordGrid.api.getVisibleRows();
        const areAllSelectedRowsVisible = intersectionBy(selectedRows, visibleRows, (row) => row.name).length === selectedRows.length;
        let message;
        if (selectedRows.length > 1) {
            if (areAllSelectedRowsVisible) {
                message = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.delete-definitions-confirmation.message');
            }
            else {
                message = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.delete-hidden-definitions-confirmation.message', {
                    count: selectedRows.length
                });
            }
        }
        else {
            if (areAllSelectedRowsVisible) {
                message = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.delete-definition-confirmation.message');
            }
            else {
                message = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.delete-hidden-definition-confirmation.message');
            }
        }
        return message;
    }
}
/** @nocollapse */ DefinitionTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionTabComponent, deps: [{ token: i3.TranslateService }, { token: i2.RxBundleCacheService }, { token: i2.RxSessionExpirationService }, { token: i2$1.RxGainsightConfiguratorService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ DefinitionTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DefinitionTabComponent, selector: "ax-definition-tab", inputs: { isActionInProgress: "isActionInProgress", definitionType: "definitionType", definitionActions: "definitionActions", gridColumns: "gridColumns", definitions$: "definitions$", recordDefinition: "recordDefinition", editRouterLink: "editRouterLink" }, outputs: { customAction: "customAction", deleteDefinition: "deleteDefinition", renameDefinition: "renameDefinition", revertCustomization: "revertCustomization", copyDefinition: "copyDefinition", addDefinition: "addDefinition", rowSelectionChanged: "rowSelectionChanged" }, viewQueries: [{ propertyName: "customizationStatusCellTemplate", first: true, predicate: ["customizationStatusCellTemplate"], descendants: true, static: true }, { propertyName: "isEnabledCellTemplate", first: true, predicate: ["isEnabledCellTemplate"], descendants: true, static: true }, { propertyName: "nameCellTemplate", first: true, predicate: ["nameCellTemplate"], descendants: true, static: true }, { propertyName: "scopeCellTemplate", first: true, predicate: ["scopeCellTemplate"], descendants: true, static: true }, { propertyName: "recordGrid", first: true, predicate: RecordGridComponent, descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div class=\"d-flex flex-row ml-1\">\n  <ng-container *ngFor=\"let toolbarItem of definitionActions; trackBy: trackByFn\">\n    <ng-container *ngIf=\"toolbarItem.subActions?.length\">\n      <div class=\"dropdown\" adaptDropdown placement=\"bottom-left\">\n        <button\n          adapt-button\n          btn-type=\"tertiary\"\n          [disabled]=\"toolbarItem.isDisabled\"\n          adaptDropdownToggle\n          [attr.rx-id]=\"toolbarItem.rxId\"\n          class=\"pl-0 ml-4\"\n        >\n          <adapt-icon [name]=\"toolbarItem.icon\"></adapt-icon>\n\n          {{ toolbarItem.labelKey | translate }}\n        </button>\n\n        <div class=\"dropdown-menu\" adaptDropdownMenu>\n          <ng-container *ngFor=\"let dropdownItem of toolbarItem.subActions\">\n            <div *ngIf=\"dropdownItem.groupTitle\" class=\"dropdown-header\">{{ dropdownItem.groupTitle }}</div>\n            <button\n              *ngIf=\"!dropdownItem.groupTitle\"\n              class=\"dropdown-item\"\n              (click)=\"onClick(dropdownItem.id)\"\n              [attr.rx-id]=\"dropdownItem.rxId\"\n            >\n              {{ dropdownItem.labelKey | translate }}\n            </button>\n          </ng-container>\n        </div>\n      </div>\n    </ng-container>\n\n    <ng-container *ngIf=\"!toolbarItem.subActions?.length\">\n      <button\n        adapt-button\n        btn-type=\"tertiary\"\n        [disabled]=\"toolbarItem.isDisabled\"\n        (click)=\"onClick(toolbarItem.id)\"\n        [attr.rx-id]=\"toolbarItem.rxId\"\n        class=\"px-3\"\n      >\n        <adapt-icon *ngIf=\"toolbarItem.icon\" [name]=\"toolbarItem.icon\"></adapt-icon>\n\n        {{ toolbarItem.labelKey | translate }}\n      </button>\n    </ng-container>\n  </ng-container>\n</div>\n\n<ng-template #nameCellTemplate let-dataItem=\"dataItem\">\n  <a [routerLink]=\"editRouterLink + dataItem.$ID$\">\n    {{ dataItem.name | rxDefinitionNamePipe }}\n  </a>\n</ng-template>\n\n<ng-template #customizationStatusCellTemplate let-dataItem=\"dataItem\">\n  {{ dataItem.customizationPerspective | rxCustomizationStatus }}\n</ng-template>\n\n<ng-template #isEnabledCellTemplate let-dataItem=\"dataItem\">\n  {{\n    (dataItem.isEnabled ? 'com.bmc.arsys.rx.client.common.yes.label' : 'com.bmc.arsys.rx.client.common.no.label')\n      | translate\n  }}\n</ng-template>\n\n<ng-template #scopeCellTemplate let-dataItem=\"dataItem\">\n  {{ dataItem.scope | rxDefinitionScopePipe: bundleDescriptor }}\n</ng-template>\n\n<rx-record-grid [config]=\"recordGridConfig$\"></rx-record-grid>\n\n<rx-busy-indicator [options]=\"{ busy: busySubscription }\"></rx-busy-indicator>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{position:relative;display:flex;flex-direction:column;height:100%;width:100%;overflow:hidden}\n"], components: [{ type: i1.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }, { type: i5.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i3$1.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }], directives: [{ type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i1.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i1$1.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }], pipes: { "translate": i3.TranslatePipe, "rxDefinitionNamePipe": i2.RxDefinitionNamePipe, "rxCustomizationStatus": i2.RxCustomizationStatusPipe, "rxDefinitionScopePipe": i2.RxDefinitionScopePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-definition-tab',
                    templateUrl: './definition-tab.component.html',
                    styleUrls: ['./definition-tab.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i3.TranslateService }, { type: i2.RxBundleCacheService }, { type: i2.RxSessionExpirationService }, { type: i2$1.RxGainsightConfiguratorService }]; }, propDecorators: { customizationStatusCellTemplate: [{
                type: ViewChild,
                args: ['customizationStatusCellTemplate', { static: true }]
            }], isEnabledCellTemplate: [{
                type: ViewChild,
                args: ['isEnabledCellTemplate', { static: true }]
            }], nameCellTemplate: [{
                type: ViewChild,
                args: ['nameCellTemplate', { static: true }]
            }], scopeCellTemplate: [{
                type: ViewChild,
                args: ['scopeCellTemplate', { static: true }]
            }], recordGrid: [{
                type: ViewChild,
                args: [RecordGridComponent, { static: true }]
            }], isActionInProgress: [{
                type: Input
            }], definitionType: [{
                type: Input
            }], definitionActions: [{
                type: Input
            }], gridColumns: [{
                type: Input
            }], definitions$: [{
                type: Input
            }], recordDefinition: [{
                type: Input
            }], editRouterLink: [{
                type: Input
            }], customAction: [{
                type: Output
            }], deleteDefinition: [{
                type: Output
            }], renameDefinition: [{
                type: Output
            }], revertCustomization: [{
                type: Output
            }], copyDefinition: [{
                type: Output
            }], addDefinition: [{
                type: Output
            }], rowSelectionChanged: [{
                type: Output
            }] } });

const dataSourceDataPageQuery = 'com.bmc.arsys.rx.application.datasource.datapage.DataSourceDataPageQuery';
class RxDataSourceDataPageService extends DataPage {
    constructor(injector) {
        super(injector, dataSourceDataPageQuery);
        this.injector = injector;
    }
}
/** @nocollapse */ RxDataSourceDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataSourceDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ RxDataSourceDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataSourceDataPageService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataSourceDataPageService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxExternalDataService {
    constructor(httpClient, rxDataSourceDataPageService, rxDocumentDefinitionDataPageService, rxSessionExpirationService, rxWebApiDefinitionDataPageService) {
        this.httpClient = httpClient;
        this.rxDataSourceDataPageService = rxDataSourceDataPageService;
        this.rxDocumentDefinitionDataPageService = rxDocumentDefinitionDataPageService;
        this.rxSessionExpirationService = rxSessionExpirationService;
        this.rxWebApiDefinitionDataPageService = rxWebApiDefinitionDataPageService;
    }
    getArsTables(pageSize, startIndex, dataSourceName, tableName, sortBy = []) {
        const queryParams = {
            pageSize,
            startIndex,
            dataSourceName
        };
        if (tableName.length) {
            Object.assign(queryParams, { tableName });
        }
        if (sortBy.length) {
            Object.assign(queryParams, { sortBy });
        }
        return this.rxDataSourceDataPageService.get({
            params: queryParams
        });
    }
    getArsTableDefinition(dataSourceName, tableName) {
        return this.httpClient.get(`/api/rx/application/datasource/table/${dataSourceName}/${tableName}`);
    }
    getDataSourceNames(dataSourceType) {
        return this.httpClient.get(`/api/rx/application/datasource/type/${dataSourceType}`);
    }
    getDataSourceTypes() {
        return this.httpClient.get('/api/rx/application/datasource/type');
    }
    getWebApiDefinitions() {
        return this.rxSessionExpirationService
            .keepSessionAlive()
            .pipe(switchMap(() => this.rxWebApiDefinitionDataPageService.get()));
    }
    getWebApiDocuments(webApiRequestDefinitions) {
        return this.rxDocumentDefinitionDataPageService.get().pipe(map((documentDefinitions) => {
            remove(documentDefinitions.data, (document) => !webApiRequestDefinitions[document.name]);
            documentDefinitions.totalSize = documentDefinitions.data.length;
            return documentDefinitions;
        }));
    }
}
/** @nocollapse */ RxExternalDataService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExternalDataService, deps: [{ token: i1$2.HttpClient }, { token: RxDataSourceDataPageService }, { token: i1$3.RxDocumentDefinitionDataPageService }, { token: i2.RxSessionExpirationService }, { token: i1$4.RxWebApiDefinitionDataPageService }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ RxExternalDataService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExternalDataService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExternalDataService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$2.HttpClient }, { type: RxDataSourceDataPageService }, { type: i1$3.RxDocumentDefinitionDataPageService }, { type: i2.RxSessionExpirationService }, { type: i1$4.RxWebApiDefinitionDataPageService }]; } });

class DocumentSelectionStepComponent {
    constructor(rxExternalDataService, rxWizardModalComponent, translateService) {
        this.rxExternalDataService = rxExternalDataService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.sectionLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.document-selection.label');
        const gridColumns = [
            {
                fieldId: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                cellTemplate: this.documentNameCellTemplate
            }
        ];
        const gridRecordDefinition = {
            fieldDefinitions: [
                {
                    id: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
        this.recordGridConfig$ = of({
            columns: gridColumns,
            emptyStateLabelText: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.document-selection.grid.empty-state.label'),
            enableRowSelection: RowSelectionMode.Single,
            enableFiltering: false,
            recordIdField: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
            styles: 'flex-fill',
            useExternalFiltering: false,
            getRecordDefinition: () => of(gridRecordDefinition),
            getData: () => this.context.webApi
                ? this.rxExternalDataService.getWebApiDocuments(this.getWebApiRequests())
                : of({
                    totalSize: 0,
                    data: []
                })
        });
        this.recordGrid.rowSelectionChanged
            .pipe(skip(2), takeUntil(this.destroyed$))
            .subscribe((selectedRows) => {
            this.rxWizardModalComponent.api.updateContext({
                document: head(selectedRows) || null
            });
        });
        const documentSelectionStepContext$ = this.rxWizardModalComponent.context$.pipe(shareReplay(1), takeUntil(this.destroyed$));
        documentSelectionStepContext$
            .pipe(map((stepContext) => stepContext.webApi), distinctUntilChanged(isEqual), skip(1))
            .subscribe(() => {
            this.rxWizardModalComponent.api.updateContext({ document: null });
            this.recordGrid.api.refresh().subscribe();
        });
        const isCurrentStep$ = combineLatest([
            this.rxWizardModalComponent.steps$,
            this.rxWizardModalComponent.tabIndex$
        ]).pipe(map(([steps, tabIndex]) => steps[tabIndex].id === 'document-selection'), takeUntil(this.destroyed$));
        const changedDocument$ = documentSelectionStepContext$.pipe(map((stepContext) => stepContext.document), distinctUntilChanged(isEqual));
        combineLatest([isCurrentStep$, changedDocument$])
            .pipe(filter(([isCurrentStep, changedDocument]) => isCurrentStep), distinctUntilChanged(isEqual))
            .subscribe(([isCurrentStep, changedDocument]) => {
            if (changedDocument) {
                this.rxWizardModalComponent.api.enableNextButton();
            }
            else {
                this.rxWizardModalComponent.api.disableNextButton();
            }
        });
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    getWebApiRequests() {
        return this.context.webApi.requestDefinitions.reduce((result, requestDefinition) => {
            if (requestDefinition.body && !result[requestDefinition.body]) {
                result[requestDefinition.body] = requestDefinition.body;
            }
            if (requestDefinition.output && !result[requestDefinition.output]) {
                result[requestDefinition.output] = requestDefinition.output;
            }
            return result;
        }, {});
    }
}
/** @nocollapse */ DocumentSelectionStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentSelectionStepComponent, deps: [{ token: RxExternalDataService }, { token: i2$1.RxWizardModalComponent }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ DocumentSelectionStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DocumentSelectionStepComponent, selector: "ax-document-selection-wizard-step", inputs: { context: "context" }, viewQueries: [{ propertyName: "recordGrid", first: true, predicate: RecordGridComponent, descendants: true, static: true }, { propertyName: "documentNameCellTemplate", first: true, predicate: ["documentNameCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<adapt-rx-control-label [label]=\"sectionLabel\" [showRequiredLabel]=\"true\"></adapt-rx-control-label>\n\n<rx-record-grid [config]=\"recordGridConfig$\"></rx-record-grid>\n\n<ng-template #documentNameCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  {{ dataItem[column.field] | rxDefinitionNamePipe }}\n</ng-template>\n", styles: [":host{display:flex;flex-direction:column;height:100%}rx-record-grid{height:100%}\n"], components: [{ type: i1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i5.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "rxDefinitionNamePipe": i2.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentSelectionStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-document-selection-wizard-step',
                    templateUrl: 'document-selection-step.component.html',
                    styleUrls: ['./document-selection-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: RxExternalDataService }, { type: i2$1.RxWizardModalComponent }, { type: i3.TranslateService }]; }, propDecorators: { context: [{
                type: Input
            }], recordGrid: [{
                type: ViewChild,
                args: [RecordGridComponent, { static: true }]
            }], documentNameCellTemplate: [{
                type: ViewChild,
                args: ['documentNameCellTemplate', { static: true }]
            }] } });

class FieldSelectionStepComponent$1 {
    constructor(rxWizardModalComponent, translateService) {
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.externalFieldIdPath = 'fieldMapping.externalFieldId';
        this.availableExternalColumns = [];
        this.selectedExternalColumns = [];
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.availableFieldsSectionLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.field-selection.available-fields.section.label');
        this.selectedFieldsSectionLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.field-selection.selected-fields.section.label');
        this.rxWizardModalComponent.api.enableFinishButton();
        const fieldSelectionStepContext$ = this.rxWizardModalComponent.context$.pipe(shareReplay(1), takeUntil(this.destroyed$));
        fieldSelectionStepContext$
            .pipe(map((stepContext) => stepContext.mappedInternalFields), distinctUntilChanged(isEqual))
            .subscribe(() => this.updateGridsData());
        const gridColumns = [
            {
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                fieldId: 'name'
            },
            {
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.field-selection.field-id.label'),
                fieldId: 'id',
                sortable: {
                    direction: ColumnSortDirection.Asc,
                    priority: 1
                }
            },
            {
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.item-type.label'),
                fieldId: 'resourceType',
                cellTemplate: this.resourceTypeCellTemplate
            }
        ];
        const selectColumnGridConfig = {
            columns: gridColumns,
            enableColumnSelection: false,
            enableFiltering: false,
            enableRowSelection: RowSelectionMode.Multiple,
            recordIdField: 'id',
            styles: 'flex-fill',
            useExternalFiltering: false,
            getRecordDefinition: () => of({
                fieldDefinitions: [
                    {
                        id: 'name',
                        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: 'id',
                        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: 'resourceType',
                        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                    }
                ]
            })
        };
        this.availableFieldsGridConfig$ = of(defaults({
            emptyStateLabelText: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.field-selection.available-fields.grid.empty-state.label'),
            getData: () => of({
                totalSize: this.availableExternalColumns.length,
                data: this.availableExternalColumns
            })
        }, selectColumnGridConfig));
        this.selectedFieldsGridConfig$ = of(defaults({
            emptyStateLabelText: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.field-selection.selected-fields.grid.empty-state.label'),
            getData: () => of({
                totalSize: this.selectedExternalColumns.length,
                data: this.selectedExternalColumns
            })
        }, selectColumnGridConfig));
    }
    deselectColumns() {
        const sourceColumnIds = map$1(this.selectedFieldsGrid.api.getSelectedRows(), 'id');
        this.moveColumns(sourceColumnIds, this.selectedExternalColumns, this.availableExternalColumns);
    }
    selectColumns() {
        const sourceColumnIds = map$1(this.availableFieldsGrid.api.getSelectedRows(), 'id');
        this.moveColumns(sourceColumnIds, this.availableExternalColumns, this.selectedExternalColumns);
    }
    getAvailableColumns() {
        return reject(this.context.externalTableDefinition.fieldDefinitions, (column) => this.isAssociatedColumn(column) || this.isSelectedColumn(column));
    }
    getExternalFieldId(column) {
        return get(column, this.externalFieldIdPath);
    }
    isAssociatedColumn(column) {
        return some(this.context.mappedInternalFields, [this.externalFieldIdPath, this.getExternalFieldId(column)]);
    }
    isSelectedColumn(column) {
        return some(this.selectedExternalColumns, [this.externalFieldIdPath, this.getExternalFieldId(column)]);
    }
    moveColumns(columnIds, source, target) {
        chain(source)
            .remove((column) => includes(columnIds, column.id))
            .forEach((column) => target.push(column))
            .value();
        this.refreshElements();
        this.rxWizardModalComponent.api.updateContext({ selectedExternalFields: this.selectedExternalColumns });
    }
    refreshElements() {
        var _a, _b;
        (_a = this.availableFieldsGrid) === null || _a === void 0 ? void 0 : _a.api.refresh().subscribe();
        (_b = this.selectedFieldsGrid) === null || _b === void 0 ? void 0 : _b.api.refresh().subscribe();
    }
    updateGridsData() {
        this.selectedExternalColumns = [];
        this.availableExternalColumns = this.getAvailableColumns();
        this.refreshElements();
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
/** @nocollapse */ FieldSelectionStepComponent$1.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldSelectionStepComponent$1, deps: [{ token: i2$1.RxWizardModalComponent }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ FieldSelectionStepComponent$1.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FieldSelectionStepComponent$1, selector: "ax-field-selection-step", inputs: { context: "context" }, viewQueries: [{ propertyName: "resourceTypeCellTemplate", first: true, predicate: ["resourceTypeCellTemplate"], descendants: true, static: true }, { propertyName: "availableFieldsGrid", first: true, predicate: ["availableFieldsGrid"], descendants: true }, { propertyName: "selectedFieldsGrid", first: true, predicate: ["selectedFieldsGrid"], descendants: true }], ngImport: i0, template: "<div class=\"rx-external-record-wizard__content\">\n  <div class=\"rx-external-record-wizard__content--left\">\n    <adapt-rx-control-label [label]=\"availableFieldsSectionLabel\"></adapt-rx-control-label>\n    <rx-record-grid #availableFieldsGrid [config]=\"availableFieldsGridConfig$\"></rx-record-grid>\n  </div>\n  <div class=\"rx-external-record-wizard__content--middle\">\n    <button\n      type=\"button\"\n      adapt-button\n      btn-type=\"secondary\"\n      class=\"d-icon-angle_right\"\n      rx-id=\"select-button\"\n      [disabled]=\"!availableFieldsGrid?.api.getSelectedRowCount()\"\n      (click)=\"selectColumns()\"\n    ></button>\n    <button\n      type=\"button\"\n      adapt-button\n      btn-type=\"secondary\"\n      class=\"d-icon-angle_left\"\n      rx-id=\"deselect-button\"\n      [disabled]=\"!selectedFieldsGrid?.api.getSelectedRowCount()\"\n      (click)=\"deselectColumns()\"\n    ></button>\n  </div>\n  <div class=\"rx-external-record-wizard__content--right\">\n    <adapt-rx-control-label [label]=\"selectedFieldsSectionLabel\"></adapt-rx-control-label>\n    <rx-record-grid #selectedFieldsGrid [config]=\"selectedFieldsGridConfig$\"></rx-record-grid>\n  </div>\n</div>\n\n<ng-template #resourceTypeCellTemplate let-dataItem=\"dataItem\">\n  {{ dataItem.resourceType | rxRecordDefinitionResourceType }}\n</ng-template>\n", styles: [":host{display:flex;height:100%}:host .rx-external-record-wizard__content{display:flex}:host .rx-external-record-wizard__content--left,:host .rx-external-record-wizard__content--right{flex:0 0 45%;max-width:45%}:host .rx-external-record-wizard__content--middle{flex:0 0 10%;display:flex;flex-direction:column;justify-content:center;align-items:center}:host .rx-external-record-wizard__content--middle>*:not(:first-child){margin-top:5px}:host rx-record-grid{height:calc(100% - 1.5rem)}\n"], components: [{ type: i1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i5.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], pipes: { "rxRecordDefinitionResourceType": i1$5.RxRecordDefinitionResourceTypePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldSelectionStepComponent$1, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-field-selection-step',
                    templateUrl: 'field-selection-step.component.html',
                    styleUrls: ['./field-selection-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i2$1.RxWizardModalComponent }, { type: i3.TranslateService }]; }, propDecorators: { context: [{
                type: Input
            }], resourceTypeCellTemplate: [{
                type: ViewChild,
                args: ['resourceTypeCellTemplate', { static: true }]
            }], availableFieldsGrid: [{
                type: ViewChild,
                args: ['availableFieldsGrid']
            }], selectedFieldsGrid: [{
                type: ViewChild,
                args: ['selectedFieldsGrid']
            }] } });

class FieldTreeSelectionStepComponent {
    constructor(rxDefinitionNameService, rxDocumentDefinitionService, rxJsonParserService, rxWizardModalComponent, translateService) {
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxDocumentDefinitionService = rxDocumentDefinitionService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.selectedDocumentTreeNodes = [];
        this.treeWrap = TreeWrap.WrapAll;
        this.selectedDocumentSchemaFields = [];
        this.selectedFieldsGroup = new FormGroup({});
        this.mappingGroup = new FormGroup({
            displayId: new FormControl([]),
            id: new FormControl([])
        });
        this.supportedFieldTypes = ['boolean', 'character', 'dateOnly', 'dateTime', 'decimal', 'integer', 'real', 'timeOnly'];
        this.fieldTypes = sortBy(reduce(RX_RECORD_DEFINITION.dataTypes, (result, type, key) => {
            if (includes(this.supportedFieldTypes, key)) {
                result.push(type);
            }
            return result;
        }, []), 'displayName');
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.availableFieldsSectionLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.field-tree-selection.available-fields.section.label');
        this.mapToDisplayIdLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.field-tree-selection.map-to-display-id.label');
        this.mapToIdLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.field-tree-selection.map-to-id.label');
        this.selectedFieldsSectionLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.field-tree-selection.selected-fields.section.label');
        const gridColumns = [
            {
                fieldId: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                title: this.translateService.instant(AX_BUNDLE_DETAILS.definitionGridColumns.name.title)
            },
            {
                fieldId: 'type',
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.item-type.label'),
                sortable: false,
                cellTemplate: this.typeCellTemplate
            },
            {
                fieldId: 'delete',
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.delete.label'),
                sortable: false,
                cellTemplate: this.deleteCellTemplate
            }
        ];
        const gridRecordDefinition = {
            fieldDefinitions: [
                {
                    id: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'type',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'delete',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
        this.recordGridConfig$ = of({
            columns: gridColumns,
            emptyStateLabelText: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.field-tree-selection.grid.empty-state.label'),
            enableFiltering: false,
            enableRowSelection: null,
            recordIdField: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
            styles: 'flex-fill',
            toolbarConfig: {
                filter: false,
                visibleColumnsMenu: false
            },
            useExternalFiltering: false,
            getRecordDefinition: () => of(gridRecordDefinition),
            getData: () => of({
                data: this.selectedDocumentSchemaFields,
                totalSize: this.selectedDocumentSchemaFields.length
            })
        });
        const fieldTreeSelectionStepContext$ = this.rxWizardModalComponent.context$.pipe(shareReplay(1), takeUntil(this.destroyed$));
        fieldTreeSelectionStepContext$
            .pipe(map((stepContext) => { var _a; return (_a = stepContext.document) === null || _a === void 0 ? void 0 : _a.name; }), distinctUntilChanged(isEqual), switchMap((documentName) => {
            this.selectedDocumentTreeNodes = [];
            this.selectedDocumentSchemaFields = [];
            this.rxWizardModalComponent.api.updateContext({
                documentSchemaFields: [],
                nonDocumentSchemaFields: []
            });
            if (documentName) {
                return this.rxDocumentDefinitionService.get(documentName);
            }
            else {
                return of();
            }
        }), skipWhile(isEmpty))
            .subscribe((documentDefinition) => {
            this.documentTree = [
                {
                    data: documentDefinition.guid,
                    label: this.rxDefinitionNameService.getDisplayName(documentDefinition.name),
                    children: this.prepareTreeForAdapt(documentDefinition.documentSchema, []),
                    expanded: true,
                    disallowMultipleNodeSelection: true
                }
            ];
            this.recordGrid.api.refresh().subscribe();
        });
        const isCurrentStep$ = combineLatest([
            this.rxWizardModalComponent.steps$,
            this.rxWizardModalComponent.tabIndex$
        ]).pipe(map(([steps, tabIndex]) => steps[tabIndex].id === 'field-tree-selection'), takeUntil(this.destroyed$));
        const documentSchemaFields$ = fieldTreeSelectionStepContext$.pipe(map((stepContext) => stepContext.documentSchemaFields), distinctUntilChanged(isEqual));
        combineLatest([isCurrentStep$, documentSchemaFields$])
            .pipe(filter(([isCurrentStep, documentSchemaFields]) => isCurrentStep), distinctUntilChanged(isEqual))
            .subscribe(([isCurrentStep, documentSchemaFields]) => {
            if (documentSchemaFields.length) {
                this.rxWizardModalComponent.api.enableNextButton();
            }
            else {
                this.rxWizardModalComponent.api.disableNextButton();
            }
            forEach(this.mappingGroup.controls, (formControl) => {
                if (formControl.value.length && !some(documentSchemaFields, ['path', formControl.value[0].path])) {
                    formControl.reset([]);
                }
            });
        });
        this.mappingGroup.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((mappedValues) => {
            var _a, _b;
            const selectedFieldMapping = {
                displayId: (mappedValues.displayId && ((_a = mappedValues.displayId[0]) === null || _a === void 0 ? void 0 : _a.path)) || '',
                id: (mappedValues.id && ((_b = mappedValues.id[0]) === null || _b === void 0 ? void 0 : _b.path)) || ''
            };
            this.rxWizardModalComponent.api.updateContext({ selectedFieldMapping });
        });
        this.selectedFieldsGroup.valueChanges
            .pipe(withLatestFrom(this.rxWizardModalComponent.context$), takeUntil(this.destroyed$))
            .subscribe(([value, context]) => {
            const documentSchemaFields = cloneDeep(context.documentSchemaFields);
            documentSchemaFields.forEach((field) => {
                field.type = value[field.path][0].resourceType;
            });
            this.rxWizardModalComponent.api.updateContext({ documentSchemaFields });
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    getCoreFieldMappingOptions() {
        return sortBy(this.selectedDocumentSchemaFields, 'name');
    }
    optionFormatter(selectOption) {
        return selectOption.displayName || selectOption.name;
    }
    selectFields() {
        this.selectedDocumentSchemaFields = this.selectedDocumentTreeNodes.reduce((result, node) => {
            if (!node.children) {
                const field = {
                    name: node.name,
                    path: node.path,
                    type: RX_RECORD_DEFINITION.dataTypes.character.resourceType
                };
                if (!node.disallowMultipleNodeSelection) {
                    node.disallowMultipleNodeSelection = true;
                    this.selectedFieldsGroup.setControl(node.path, new FormControl([RX_RECORD_DEFINITION.dataTypes.character]));
                }
                result.push(field);
            }
            return result;
        }, []);
        this.rxWizardModalComponent.api.updateContext({
            documentSchemaFields: cloneDeep(this.selectedDocumentSchemaFields)
        });
        this.recordGrid.api.refresh().subscribe();
    }
    unselectField(field) {
        find(this.selectedDocumentTreeNodes, { data: field.path }).disallowMultipleNodeSelection = false;
        this.selectedDocumentTreeNodes = this.selectedDocumentTreeNodes.filter((node) => { var _a; return node.data !== field.path && !((_a = node.children) === null || _a === void 0 ? void 0 : _a.some((element) => element.data === field.path)); });
        remove(this.selectedDocumentSchemaFields, { path: field.path });
        this.rxWizardModalComponent.api.updateContext({
            documentSchemaFields: cloneDeep(this.selectedDocumentSchemaFields)
        });
        this.recordGrid.api.refresh().subscribe();
    }
    prepareTreeForAdapt(documentSchema, selectedFields) {
        let documentSchemaJson = this.rxJsonParserService.tryParseJson(documentSchema, {});
        if (isArray(documentSchemaJson)) {
            documentSchemaJson = head(documentSchemaJson);
        }
        return this.deepProcessJson(documentSchemaJson, '', [], selectedFields);
    }
    // Due to backend limitation, arrays can be processed only once per node
    // i.e. all arrays nested in arrays should be displayed as a leaf and in the tree
    // In runtime server will store complete stringified array as a value in record definition
    deepProcessJson(json, currentPath, arraysProcessedInPath, selectedFields, parentNode) {
        return reduce(json, (tree, value, key) => {
            const path = (currentPath ? currentPath + '||' : '') + key;
            const isNodeSelected = some(selectedFields, ['path', path]);
            let childNodes = null;
            const node = {
                name: key,
                label: key,
                data: path,
                path,
                type: RX_RECORD_DEFINITION.resourceTypes.character,
                isArray: isArray(value),
                parent: parentNode,
                children: null,
                expanded: true,
                disallowMultipleNodeSelection: null
            };
            if (isArray(value)) {
                const arrayHasBeenProcessedInSamePath = arraysProcessedInPath.some((processedPath) => path.indexOf(processedPath) !== -1);
                if (!arrayHasBeenProcessedInSamePath) {
                    arraysProcessedInPath.push(path);
                    childNodes = this.flattenListStructure(value, path, arraysProcessedInPath, selectedFields, node);
                }
            }
            else if (isObject(value)) {
                childNodes = this.deepProcessJson(value, path, arraysProcessedInPath, selectedFields, node);
            }
            node.children = childNodes;
            node.disallowMultipleNodeSelection = Boolean(childNodes);
            tree.push(node);
            return tree;
        }, []);
    }
    flattenListStructure(list, currentPath, arraysProcessedInPath, selectedFields, parentNode) {
        const entry = head(list);
        return isObject(entry)
            ? this.deepProcessJson(entry, currentPath, arraysProcessedInPath, selectedFields, parentNode)
            : [];
    }
}
/** @nocollapse */ FieldTreeSelectionStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldTreeSelectionStepComponent, deps: [{ token: i2.RxDefinitionNameService }, { token: i1$3.RxDocumentDefinitionService }, { token: i5$1.RxJsonParserService }, { token: i2$1.RxWizardModalComponent }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ FieldTreeSelectionStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FieldTreeSelectionStepComponent, selector: "ax-field-tree-selection-step", viewQueries: [{ propertyName: "recordGrid", first: true, predicate: RecordGridComponent, descendants: true, static: true }, { propertyName: "typeCellTemplate", first: true, predicate: ["typeCellTemplate"], descendants: true, static: true }, { propertyName: "deleteCellTemplate", first: true, predicate: ["deleteCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"row\">\n  <div class=\"col-5 d-flex flex-column pr-0 mh-100\">\n    <adapt-rx-control-label [label]=\"availableFieldsSectionLabel\"></adapt-rx-control-label>\n    <div class=\"border h-100 p-1 field-tree-wrapper\">\n      <adapt-tree\n        [(selection)]=\"selectedDocumentTreeNodes\"\n        [value]=\"documentTree\"\n        [wrap]=\"treeWrap\"\n        selectionMode=\"checkbox\"\n      ></adapt-tree>\n    </div>\n  </div>\n\n  <div class=\"col-1 d-flex align-items-center\">\n    <button\n      type=\"button\"\n      adapt-button\n      btn-type=\"secondary\"\n      class=\"d-icon-angle_right\"\n      rx-id=\"add-button\"\n      (click)=\"selectFields()\"\n    ></button>\n  </div>\n\n  <div class=\"col-6 d-flex flex-column pl-0\">\n    <adapt-rx-control-label [label]=\"selectedFieldsSectionLabel\" [showRequiredLabel]=\"true\"></adapt-rx-control-label>\n\n    <rx-record-grid class=\"form-group\" [config]=\"recordGridConfig$\"></rx-record-grid>\n\n    <div class=\"d-flex flex-column control-width\">\n      <adapt-rx-select\n        class=\"form-group\"\n        appendToBody=\"true\"\n        [formControl]=\"mappingGroup.controls.displayId\"\n        [label]=\"mapToDisplayIdLabel\"\n        [options]=\"getCoreFieldMappingOptions()\"\n        [optionFormatter]=\"optionFormatter\"\n      >\n      </adapt-rx-select>\n      <adapt-rx-select\n        appendToBody=\"true\"\n        [formControl]=\"mappingGroup.controls.id\"\n        [label]=\"mapToIdLabel\"\n        [options]=\"getCoreFieldMappingOptions()\"\n        [optionFormatter]=\"optionFormatter\"\n      >\n      </adapt-rx-select>\n    </div>\n  </div>\n</div>\n\n<ng-template #typeCellTemplate let-dataItem=\"dataItem\">\n  <adapt-rx-select\n    class=\"type-selector\"\n    appendToBody=\"true\"\n    [formControl]=\"selectedFieldsGroup.controls[dataItem.path]\"\n    [options]=\"fieldTypes\"\n    [optionFormatter]=\"optionFormatter\"\n    [popupMaxHeight]=\"290\"\n  >\n  </adapt-rx-select>\n</ng-template>\n\n<ng-template #deleteCellTemplate let-dataItem=\"dataItem\">\n  <button\n    class=\"unselect-field-button d-icon-minus_circle text-danger\"\n    adapt-button\n    btn-type=\"tertiary\"\n    type=\"button\"\n    (click)=\"unselectField(dataItem)\"\n  ></button>\n</ng-template>\n", styles: [":host{display:flex;height:100%}:host ::ng-deep .rx-custom-cell{max-height:38px}:host ::ng-deep .type-selector,:host ::ng-deep .unselect-field-button{margin:-.5rem -13px}rx-record-grid{height:100%}.field-tree-wrapper{overflow:auto}\n"], components: [{ type: i1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1.AdaptTreeComponent, selector: "adapt-tree", inputs: ["value", "filter", "texts", "filterBtnClearText", "filterPlaceholder", "testID", "lazy", "lazyLoading", "trim", "wrap", "selectAllButton", "deselectAllButton", "treeScrollHeight", "adaptRadarDisableEventSending", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "validateDrop"], outputs: ["onNodeDrop", "lazyLoad"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i5.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldTreeSelectionStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-field-tree-selection-step',
                    templateUrl: 'field-tree-selection-step.component.html',
                    styleUrls: ['./field-tree-selection-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i2.RxDefinitionNameService }, { type: i1$3.RxDocumentDefinitionService }, { type: i5$1.RxJsonParserService }, { type: i2$1.RxWizardModalComponent }, { type: i3.TranslateService }]; }, propDecorators: { recordGrid: [{
                type: ViewChild,
                args: [RecordGridComponent, { static: true }]
            }], typeCellTemplate: [{
                type: ViewChild,
                args: ['typeCellTemplate', { static: true }]
            }], deleteCellTemplate: [{
                type: ViewChild,
                args: ['deleteCellTemplate', { static: true }]
            }] } });

class OperationSelectionStepComponent {
    constructor(rxDefinitionNameService, rxWizardModalComponent, translateService) {
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.availableOperationTypes = ['GET'];
        this.operationTypeFormControl = new FormControl('GET', null);
        this.webApiRequestNameFormControl = new FormControl([], Validators.required);
        this.destroyed$ = new ReplaySubject(1);
        this.optionFormatter = (option) => this.rxDefinitionNameService.getDisplayName(option.displayValue);
    }
    ngOnInit() {
        this.operationTypeLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.operation-selection.operation-type.section.label');
        this.webApiRequestLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.operation-selection.web-api-request.section.label');
        const operationSelectionStepContext$ = this.rxWizardModalComponent.context$.pipe(shareReplay(1), takeUntil(this.destroyed$));
        operationSelectionStepContext$
            .pipe(map((stepContext) => stepContext.document), distinctUntilChanged(isEqual))
            .subscribe((document) => {
            this.webApiRequestNameFormControl.setValue([]);
            this.availableRequests = document
                ? this.context.webApi.requestDefinitions.reduce((result, request) => {
                    if (includes(this.availableOperationTypes, request.method) && request.output === document.name) {
                        result.push({
                            webRequestGuid: request.guid,
                            displayValue: request.name,
                            method: request.method
                        });
                    }
                    return result;
                }, [])
                : [];
        });
        operationSelectionStepContext$
            .pipe(map((stepContext) => stepContext.operations), distinctUntilChanged(isEqual))
            .subscribe((operations) => {
            if (operations) {
                this.rxWizardModalComponent.api.enableFinishButton();
            }
            else {
                this.rxWizardModalComponent.api.disableFinishButton();
            }
        });
        this.webApiRequestNameFormControl.valueChanges
            .pipe(takeUntil(this.destroyed$))
            .subscribe((selectedWebApiRequest) => {
            this.rxWizardModalComponent.api.updateContext({
                operations: selectedWebApiRequest.length
                    ? selectedWebApiRequest.map((request) => ({
                        webRequestGuid: request.webRequestGuid,
                        operation: request.method
                    }))
                    : null
            });
        });
    }
}
/** @nocollapse */ OperationSelectionStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OperationSelectionStepComponent, deps: [{ token: i2.RxDefinitionNameService }, { token: i2$1.RxWizardModalComponent }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ OperationSelectionStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: OperationSelectionStepComponent, selector: "ax-operation-selection-step", inputs: { context: "context" }, ngImport: i0, template: "<div class=\"row\">\n  <div class=\"col-2\">\n    <adapt-rx-control-label [label]=\"operationTypeLabel\"></adapt-rx-control-label>\n  </div>\n  <div class=\"col-10\">\n    <adapt-rx-control-label [label]=\"webApiRequestLabel\" [showRequiredLabel]=\"true\"></adapt-rx-control-label>\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-2\">\n    <adapt-rx-radiobutton-group [formControl]=\"operationTypeFormControl\">\n      <adapt-rx-radiobutton *ngFor=\"let item of availableOperationTypes\" [value]=\"item\" [label]=\"item\">\n      </adapt-rx-radiobutton>\n    </adapt-rx-radiobutton-group>\n  </div>\n  <div class=\"col-10\">\n    <adapt-rx-select\n      [options]=\"availableRequests\"\n      [required]=\"true\"\n      [formControl]=\"webApiRequestNameFormControl\"\n      [optionFormatter]=\"optionFormatter\"\n    ></adapt-rx-select>\n  </div>\n</div>\n", components: [{ type: i1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i1.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }, { type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OperationSelectionStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-operation-selection-step',
                    templateUrl: 'operation-selection-step.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i2.RxDefinitionNameService }, { type: i2$1.RxWizardModalComponent }, { type: i3.TranslateService }]; }, propDecorators: { context: [{
                type: Input
            }] } });

class RecordIdFieldsStepComponent {
    constructor(rxExternalDataService, rxWizardModalComponent, translateService) {
        this.rxExternalDataService = rxExternalDataService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.externalColumns = [];
        this.externalColumnIds = [];
        this.internalFieldsForMapping = [];
        this.rawExternalColumns = [];
        this.gridRowsData = [];
        this.destroyed$ = new ReplaySubject(1);
        this.externalColumnOptionFormatter = (externalColumnOption) => externalColumnOption.name;
        this.externalColumnIdOptionFormatter = (externalColumnOption) => externalColumnOption.id;
    }
    ngOnInit() {
        this.sectionLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.record-id-fields.label');
        this.sectionInfoLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.record-id-fields.section-info.label');
        this.sectionInfoTooltip = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.record-id-fields.section-info.tooltip');
        this.rxWizardModalComponent.api.disableNextButton();
        const recordIdFieldsStepContext$ = this.rxWizardModalComponent.context$.pipe(shareReplay(1), takeUntil(this.destroyed$));
        recordIdFieldsStepContext$
            .pipe(map((stepContext) => stepContext.tableName), distinctUntilChanged(isEqual), switchMap((tableName) => {
            this.rawExternalColumns = [];
            this.gridRowsData = [];
            this.externalColumnIds = [];
            this.externalColumns = [];
            if (this.recordIdFieldsStepRecordGrid) {
                this.recordIdFieldsStepRecordGrid.api.refresh().subscribe();
            }
            if (tableName) {
                this.internalFieldsForMapping = chain(RX_RECORD_DEFINITION.coreFields)
                    .filter((field) => RX_RECORD_DEFINITION.externalRecordDefinitionCoreFieldIds.includes(field.id))
                    .map((coreField) => defaults(cloneDeep(coreField), { fieldMapping: { externalFieldId: String(coreField.id) } }))
                    .value();
                return this.rxExternalDataService.getArsTableDefinition(this.context.dataSourceName, tableName);
            }
            else {
                this.internalFieldsForMapping = [];
                this.rxWizardModalComponent.api.updateContext({
                    externalTableDefinition: {},
                    mappedInternalFields: []
                });
                return of();
            }
        }), skipWhile(isEmpty))
            .subscribe((externalTableDefinition) => {
            this.rawExternalColumns = externalTableDefinition.fieldDefinitions;
            this.setGridRowsData();
            this.rxWizardModalComponent.api.updateContext({
                externalTableDefinition,
                mappedInternalFields: cloneDeep(this.internalFieldsForMapping)
            });
            this.externalColumnIds = this.rawExternalColumns.map((externalColumn) => ({
                id: externalColumn.fieldMapping.externalFieldId,
                name: externalColumn.name
            }));
            this.externalColumns = sortBy(this.externalColumnIds, 'name');
            this.recordIdFieldsStepRecordGrid.api.refresh().subscribe();
        });
        const gridColumns = [
            {
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.record-id-fields.grid.record-id-field.label'),
                fieldId: 'name'
            },
            {
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.record-id-fields.grid.field-id.label'),
                fieldId: 'id'
            },
            {
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.record-id-fields.grid.external-record-id-field.label'),
                fieldId: 'externalColumnName',
                sortable: false,
                cellTemplate: this.externalColumnCellTemplate
            },
            {
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.record-id-fields.grid.external-field-id.label'),
                fieldId: 'externalColumnId',
                sortable: false,
                cellTemplate: this.externalColumnIdCellTemplate
            }
        ];
        this.recordIdFieldsRecordGridConfig$ = of({
            columns: gridColumns,
            enableColumnSelection: false,
            enableFiltering: false,
            enableRowSelection: null,
            recordIdField: 'id',
            styles: 'flex-fill',
            toolbarConfig: {
                filter: false,
                visibleColumnsMenu: false
            },
            useExternalFiltering: false,
            getRecordDefinition: () => of({
                fieldDefinitions: [
                    {
                        id: 'name',
                        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: 'id',
                        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: 'externalColumnName',
                        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: 'externalColumnId',
                        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                    }
                ]
            }),
            getData: () => of({
                totalSize: this.gridRowsData.length,
                data: this.gridRowsData
            })
        });
        this.rxWizardModalComponent.api.enableNextButton();
    }
    onExternalColumnChange(rowDataItem) {
        var _a;
        const field = this.internalFieldsForMapping.find((internalField) => internalField.id === rowDataItem.id);
        field.fieldMapping.externalFieldId = ((_a = rowDataItem.selectedExternalColumns[0]) === null || _a === void 0 ? void 0 : _a.id) || String(field.id);
        this.setGridRowsData();
        this.rxWizardModalComponent.api.updateContext({ mappedInternalFields: cloneDeep(this.internalFieldsForMapping) });
        this.recordIdFieldsStepRecordGrid.api.refresh().subscribe();
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    setGridRowsData() {
        this.internalFieldsForMapping.forEach((internalField) => {
            const externalColumn = this.rawExternalColumns.find((column) => column.fieldMapping.externalFieldId === internalField.fieldMapping.externalFieldId);
            const selectedExternalColumns = [];
            if (externalColumn) {
                selectedExternalColumns.push({
                    id: externalColumn.fieldMapping.externalFieldId,
                    name: externalColumn.name
                });
            }
            const gridRowData = this.gridRowsData.find(({ id }) => id === internalField.id);
            if (gridRowData) {
                gridRowData.selectedExternalColumns = selectedExternalColumns;
            }
            else {
                this.gridRowsData.push({
                    id: internalField.id,
                    name: internalField.name,
                    selectedExternalColumns
                });
            }
        });
    }
}
/** @nocollapse */ RecordIdFieldsStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordIdFieldsStepComponent, deps: [{ token: RxExternalDataService }, { token: i2$1.RxWizardModalComponent }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ RecordIdFieldsStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordIdFieldsStepComponent, selector: "ax-record-id-fields-step", inputs: { context: "context" }, viewQueries: [{ propertyName: "recordIdFieldsStepRecordGrid", first: true, predicate: ["recordIdFieldsStepRecordGrid"], descendants: true }, { propertyName: "externalColumnCellTemplate", first: true, predicate: ["externalColumnCellTemplate"], descendants: true, static: true }, { propertyName: "externalColumnIdCellTemplate", first: true, predicate: ["externalColumnIdCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"section-title\">\n  <adapt-rx-control-label [label]=\"sectionLabel\" class=\"section-label\"></adapt-rx-control-label>\n\n  <ng-template #tooltipContentTemplate>\n    <div class=\"text-left\" [innerHTML]=\"sectionInfoTooltip\"></div>\n  </ng-template>\n\n  <span class=\"section-info\">\n    <adapt-icon\n      name=\"info_circle_o_adapt\"\n      [adaptPopover]=\"tooltipContentTemplate\"\n      width=\"250\"\n      placement=\"bottom\"\n    ></adapt-icon>\n    {{ sectionInfoLabel }}\n  </span>\n</div>\n\n<rx-record-grid #recordIdFieldsStepRecordGrid [config]=\"recordIdFieldsRecordGridConfig$\"></rx-record-grid>\n\n<ng-template #externalColumnCellTemplate let-dataItem=\"dataItem\">\n  <adapt-rx-select\n    [options]=\"externalColumns\"\n    [optionFormatter]=\"externalColumnOptionFormatter\"\n    [emptyOption]=\"true\"\n    [(ngModel)]=\"dataItem.selectedExternalColumns\"\n    (ngModelChange)=\"onExternalColumnChange(dataItem)\"\n    [appendToBody]=\"true\"\n  >\n  </adapt-rx-select>\n</ng-template>\n\n<ng-template #externalColumnIdCellTemplate let-dataItem=\"dataItem\">\n  <adapt-rx-select\n    [options]=\"externalColumnIds\"\n    [optionFormatter]=\"externalColumnIdOptionFormatter\"\n    [emptyOption]=\"true\"\n    [(ngModel)]=\"dataItem.selectedExternalColumns\"\n    (ngModelChange)=\"onExternalColumnChange(dataItem)\"\n    [appendToBody]=\"true\"\n  >\n  </adapt-rx-select>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%}:host .section-title{display:flex}:host .section-label{flex-grow:1}:host .section-info{color:#00a79d}:host ::ng-deep .rx-custom-cell{max-height:38px}:host ::ng-deep adapt-rx-select{margin:-.5rem -13px}rx-record-grid{height:100%}\n"], components: [{ type: i1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }, { type: i5.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i1.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordIdFieldsStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-record-id-fields-step',
                    templateUrl: 'record-id-fields-step.component.html',
                    styleUrls: ['record-id-fields-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: RxExternalDataService }, { type: i2$1.RxWizardModalComponent }, { type: i3.TranslateService }]; }, propDecorators: { context: [{
                type: Input
            }], recordIdFieldsStepRecordGrid: [{
                type: ViewChild,
                args: ['recordIdFieldsStepRecordGrid']
            }], externalColumnCellTemplate: [{
                type: ViewChild,
                args: ['externalColumnCellTemplate', { static: true }]
            }], externalColumnIdCellTemplate: [{
                type: ViewChild,
                args: ['externalColumnIdCellTemplate', { static: true }]
            }] } });

class TableSelectionStepComponent {
    constructor(rxExternalDataService, rxWizardModalComponent, translateService) {
        this.rxExternalDataService = rxExternalDataService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.sectionLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.table-selection.label');
        const tableSelectionStepContext$ = this.rxWizardModalComponent.context$.pipe(shareReplay(1), takeUntil(this.destroyed$));
        tableSelectionStepContext$
            .pipe(map((stepContext) => stepContext.dataSourceName), distinctUntilChanged(isEqual), skip(1))
            .subscribe(() => {
            this.selectedRow = null;
            this.rxWizardModalComponent.api.updateContext({ tableName: '' });
            this.tableSelectionStepRecordGrid.api.refresh().subscribe();
        });
        const isCurrentStep$ = combineLatest([
            this.rxWizardModalComponent.steps$,
            this.rxWizardModalComponent.tabIndex$
        ]).pipe(map(([steps, tabIndex]) => steps[tabIndex].id === 'table-selection'), takeUntil(this.destroyed$));
        const changedTableName$ = tableSelectionStepContext$.pipe(map((stepContext) => stepContext.tableName), distinctUntilChanged(isEqual));
        combineLatest([isCurrentStep$, changedTableName$])
            .pipe(filter(([isCurrentStep, externalTableName]) => isCurrentStep), distinctUntilChanged(isEqual))
            .subscribe(([isCurrentStep, externalTableName]) => {
            if (externalTableName) {
                this.rxWizardModalComponent.api.enableNextButton();
            }
            else {
                this.rxWizardModalComponent.api.disableNextButton();
            }
        });
        const gridColumns = [
            {
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                fieldId: 'name'
            }
        ];
        this.tableSelectionRecordGridConfig$ = of({
            columns: gridColumns,
            enableColumnSelection: false,
            enableFiltering: false,
            enableRowSelection: RowSelectionMode.Single,
            recordIdField: 'name',
            styles: 'flex-fill',
            useExternalFiltering: true,
            emptyStateLabelText: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.table-selection.grid.empty-state.label'),
            getRecordDefinition: () => of({
                fieldDefinitions: [
                    {
                        id: 'name',
                        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                    }
                ]
            }),
            getData: (queryParams) => this.context.dataSourceName
                ? this.rxExternalDataService.getArsTables(queryParams.pageSize, queryParams.startIndex, this.context.dataSourceName, queryParams.searchText, queryParams.sortBy)
                : of({
                    totalSize: 0,
                    data: []
                })
        });
        this.tableSelectionStepRecordGrid.rowSelectionChanged
            .pipe(skip(2), // first time there are no columns, second time there are no rows selected
        takeUntil(this.destroyed$))
            .subscribe((selectedRows) => {
            if (selectedRows.length) {
                this.selectedRow = selectedRows[0];
                this.rxWizardModalComponent.api.updateContext({ tableName: this.selectedRow.name });
            }
            else if (this.selectedRow) {
                this.tableSelectionStepRecordGrid.api.setSelectedRows(this.selectedRow);
            }
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
/** @nocollapse */ TableSelectionStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TableSelectionStepComponent, deps: [{ token: RxExternalDataService }, { token: i2$1.RxWizardModalComponent }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ TableSelectionStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: TableSelectionStepComponent, selector: "ax-table-selection-step", inputs: { context: "context" }, viewQueries: [{ propertyName: "tableSelectionStepRecordGrid", first: true, predicate: ["tableSelectionStepRecordGrid"], descendants: true, static: true }], ngImport: i0, template: "<adapt-rx-control-label [label]=\"sectionLabel\" [showRequiredLabel]=\"true\"></adapt-rx-control-label>\n<rx-record-grid #tableSelectionStepRecordGrid [config]=\"tableSelectionRecordGridConfig$\"> </rx-record-grid>\n", styles: [":host{display:flex;flex-direction:column;height:100%}rx-record-grid{height:100%}\n"], components: [{ type: i1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i5.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TableSelectionStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-table-selection-step',
                    templateUrl: 'table-selection-step.component.html',
                    styleUrls: ['./table-selection-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: RxExternalDataService }, { type: i2$1.RxWizardModalComponent }, { type: i3.TranslateService }]; }, propDecorators: { context: [{
                type: Input
            }], tableSelectionStepRecordGrid: [{
                type: ViewChild,
                args: ['tableSelectionStepRecordGrid', { static: true }]
            }] } });

class WebApiSelectionStepComponent {
    constructor(rxExternalDataService, rxWizardModalComponent, translateService) {
        this.rxExternalDataService = rxExternalDataService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.sectionLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.web-api-selection.label');
        const webApiSelectionStepContext$ = this.rxWizardModalComponent.context$.pipe(shareReplay(1), takeUntil(this.destroyed$));
        webApiSelectionStepContext$
            .pipe(map((stepContext) => stepContext.dataSourceName), distinctUntilChanged(isEqual), skip(1))
            .subscribe(() => {
            this.rxWizardModalComponent.api.updateContext({ webApi: null });
            this.recordGrid.api.refresh().subscribe();
        });
        const isCurrentStep$ = combineLatest([
            this.rxWizardModalComponent.steps$,
            this.rxWizardModalComponent.tabIndex$
        ]).pipe(map(([steps, tabIndex]) => steps[tabIndex].id === 'web-api-selection'), takeUntil(this.destroyed$));
        const changedWebApi$ = webApiSelectionStepContext$.pipe(map((stepContext) => stepContext.webApi), distinctUntilChanged(isEqual));
        combineLatest([isCurrentStep$, changedWebApi$])
            .pipe(filter(([isCurrentStep, changedWebApi]) => isCurrentStep), distinctUntilChanged(isEqual))
            .subscribe(([isCurrentStep, changedWebApi]) => {
            if (changedWebApi) {
                this.rxWizardModalComponent.api.enableNextButton();
            }
            else {
                this.rxWizardModalComponent.api.disableNextButton();
            }
        });
        const gridColumns = [
            {
                fieldId: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                cellTemplate: this.webApiNameCellTemplate
            }
        ];
        const gridRecordDefinition = {
            fieldDefinitions: [
                {
                    id: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
        this.recordGridConfig$ = of({
            columns: gridColumns,
            emptyStateLabelText: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.web-api-selection.grid.empty-state.label'),
            enableRowSelection: RowSelectionMode.Single,
            enableFiltering: false,
            recordIdField: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
            styles: 'flex-fill',
            useExternalFiltering: false,
            getRecordDefinition: () => of(gridRecordDefinition),
            getData: () => this.context.dataSourceName
                ? this.rxExternalDataService.getWebApiDefinitions()
                : of({
                    totalSize: 0,
                    data: []
                })
        });
        this.recordGrid.rowSelectionChanged
            .pipe(skip(2), takeUntil(this.destroyed$))
            .subscribe((selectedRows) => {
            this.rxWizardModalComponent.api.updateContext({
                webApi: head(selectedRows) || null
            });
        });
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
/** @nocollapse */ WebApiSelectionStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiSelectionStepComponent, deps: [{ token: RxExternalDataService }, { token: i2$1.RxWizardModalComponent }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ WebApiSelectionStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: WebApiSelectionStepComponent, selector: "ax-web-api-selection-wizard-step", inputs: { context: "context" }, viewQueries: [{ propertyName: "recordGrid", first: true, predicate: RecordGridComponent, descendants: true, static: true }, { propertyName: "webApiNameCellTemplate", first: true, predicate: ["webApiNameCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<adapt-rx-control-label [label]=\"sectionLabel\" [showRequiredLabel]=\"true\"></adapt-rx-control-label>\n\n<rx-record-grid [config]=\"recordGridConfig$\"></rx-record-grid>\n\n<ng-template #webApiNameCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  {{ dataItem[column.field] | rxDefinitionNamePipe }}\n</ng-template>\n", styles: [":host{display:flex;flex-direction:column;height:100%}rx-record-grid{height:100%}\n"], components: [{ type: i1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i5.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "rxDefinitionNamePipe": i2.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiSelectionStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-web-api-selection-wizard-step',
                    templateUrl: 'web-api-selection-step.component.html',
                    styleUrls: ['./web-api-selection-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: RxExternalDataService }, { type: i2$1.RxWizardModalComponent }, { type: i3.TranslateService }]; }, propDecorators: { context: [{
                type: Input
            }], recordGrid: [{
                type: ViewChild,
                args: [RecordGridComponent, { static: true }]
            }], webApiNameCellTemplate: [{
                type: ViewChild,
                args: ['webApiNameCellTemplate', { static: true }]
            }] } });

class DataSourceStepComponent {
    constructor(componentFactoryResolver, rxExternalDataService, rxWizardModalComponent, translateService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxExternalDataService = rxExternalDataService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.destroyed$ = new ReplaySubject(1);
        this.dataSourceTypeFormControl = new FormControl([], Validators.required);
        this.dataSourceTypes = [];
        this.dataSourceNameFormControl = new FormControl([], Validators.required);
        this.dataSourceNames = [];
    }
    ngOnInit() {
        this.dataSourceNameLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.data-source.data-source-name.label');
        this.dataSourceTypeLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.data-source.data-source-type.label');
        this.rxWizardModalComponent.api.disableNextButton();
        this.rxExternalDataService
            .getDataSourceTypes()
            .subscribe((availableDataSourceTypes) => (this.dataSourceTypes = availableDataSourceTypes.filter((type) => type !== RX_RECORD_DEFINITION.externalRecordDefinitionTypes.custom)));
        this.dataSourceTypeFormControl.valueChanges
            .pipe(takeUntil(this.destroyed$))
            .subscribe((selectedDataSourceTypes) => {
            const dataSourceType = selectedDataSourceTypes[0];
            if (dataSourceType === RX_RECORD_DEFINITION.externalRecordDefinitionDataSourceTypes.webApi) {
                this.rxWizardModalComponent.api.removeNextSteps(1);
                this.rxWizardModalComponent.api.addStep({
                    id: 'web-api-selection',
                    name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.web-api-selection.title'),
                    componentFactory: this.componentFactoryResolver.resolveComponentFactory(WebApiSelectionStepComponent)
                });
                this.rxWizardModalComponent.api.addStep({
                    id: 'document-selection',
                    name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.document-selection.title'),
                    componentFactory: this.componentFactoryResolver.resolveComponentFactory(DocumentSelectionStepComponent)
                });
                this.rxWizardModalComponent.api.addStep({
                    id: 'field-tree-selection',
                    name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.field-tree-selection.title'),
                    componentFactory: this.componentFactoryResolver.resolveComponentFactory(FieldTreeSelectionStepComponent)
                });
                this.rxWizardModalComponent.api.addStep({
                    id: 'operation-selection',
                    name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.operation-selection.title'),
                    componentFactory: this.componentFactoryResolver.resolveComponentFactory(OperationSelectionStepComponent)
                });
            }
            else {
                this.rxWizardModalComponent.api.removeNextSteps(1);
                this.rxWizardModalComponent.api.addStep({
                    id: 'table-selection',
                    name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.table-selection.title'),
                    componentFactory: this.componentFactoryResolver.resolveComponentFactory(TableSelectionStepComponent)
                });
                this.rxWizardModalComponent.api.addStep({
                    id: 'record-id-fields',
                    name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.record-id-fields.title'),
                    componentFactory: this.componentFactoryResolver.resolveComponentFactory(RecordIdFieldsStepComponent)
                });
                this.rxWizardModalComponent.api.addStep({
                    id: 'field-selection',
                    name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.field-selection.title'),
                    componentFactory: this.componentFactoryResolver.resolveComponentFactory(FieldSelectionStepComponent$1)
                });
            }
            this.rxWizardModalComponent.api.updateContext({ dataSourceType });
            if (this.dataSourceNameFormControl.value.length) {
                this.dataSourceNames = [];
                this.dataSourceNameFormControl.setValue([]);
            }
            this.rxExternalDataService
                .getDataSourceNames(dataSourceType)
                .subscribe((availableDataSourceNames) => (this.dataSourceNames = availableDataSourceNames));
        });
        this.dataSourceNameFormControl.valueChanges
            .pipe(takeUntil(this.destroyed$))
            .subscribe((selectedDataSourceNames) => {
            this.rxWizardModalComponent.api.updateContext({
                dataSourceName: selectedDataSourceNames[0]
            });
        });
        this.rxWizardModalComponent.context$
            .pipe(takeUntil(this.destroyed$), map(({ dataSourceType, dataSourceName }) => ({ dataSourceType, dataSourceName })), distinctUntilChanged(isEqual))
            .subscribe(({ dataSourceType, dataSourceName }) => {
            if (dataSourceType && dataSourceName) {
                this.rxWizardModalComponent.api.enableNextButton();
            }
            else {
                this.rxWizardModalComponent.api.disableNextButton();
            }
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
/** @nocollapse */ DataSourceStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataSourceStepComponent, deps: [{ token: i0.ComponentFactoryResolver }, { token: RxExternalDataService }, { token: i2$1.RxWizardModalComponent }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ DataSourceStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataSourceStepComponent, selector: "ax-data-source-step", ngImport: i0, template: "<div class=\"d-flex flex-column control-width\">\n  <adapt-rx-select\n    [label]=\"dataSourceTypeLabel\"\n    [options]=\"dataSourceTypes\"\n    [required]=\"true\"\n    [formControl]=\"dataSourceTypeFormControl\"\n    class=\"form-group\"\n  ></adapt-rx-select>\n  <adapt-rx-select\n    [label]=\"dataSourceNameLabel\"\n    [options]=\"dataSourceNames\"\n    [required]=\"true\"\n    [formControl]=\"dataSourceNameFormControl\"\n    class=\"form-group\"\n  ></adapt-rx-select>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.control-width{max-width:400px}\n"], components: [{ type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i4.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataSourceStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-data-source-step',
                    templateUrl: 'data-source-step.component.html',
                    styleUrls: ['./data-source-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: RxExternalDataService }, { type: i2$1.RxWizardModalComponent }, { type: i3.TranslateService }]; } });

class ExternalRecordWizardService {
    constructor(componentFactoryResolver, rxIdService, rxFieldDefinitionManagerService, rxWizardService, translateService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxIdService = rxIdService;
        this.rxFieldDefinitionManagerService = rxFieldDefinitionManagerService;
        this.rxWizardService = rxWizardService;
        this.translateService = translateService;
        this.systemFieldsNames = {
            idFieldName: 'Record ID',
            displayIdFieldName: 'Request ID'
        };
    }
    open() {
        const wizardConfig = {
            title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.title'),
            allowFinish: true,
            finishButtonLabel: this.translateService.instant('com.bmc.arsys.rx.client.common.save.label'),
            steps: [
                {
                    id: 'data-source',
                    name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.data-source.title'),
                    componentFactory: this.componentFactoryResolver.resolveComponentFactory(DataSourceStepComponent)
                }
            ]
        };
        return this.rxWizardService
            .open({
            context: {},
            options: wizardConfig
        })
            .then((context) => {
            const webApiProperties = (context === null || context === void 0 ? void 0 : context.webApi)
                ? {
                    vendorSchemaDescriptor: {
                        dataSourceEntity: {
                            webApiDefinitionGuid: context.webApi.guid,
                            documentDefinitionGuid: context.document.guid
                        },
                        dataSourceOperations: context.operations
                    },
                    tableName: context.dataSourceName
                }
                : {};
            return context
                ? Object.assign({ dataSourceName: context.dataSourceName, fieldDefinitions: context.webApi
                        ? this.getWebApiFieldDefinitions(context)
                        : this.getArsFieldDefinitions(context), resourceType: RX_RECORD_DEFINITION.recordDefinitionTypes.external.recordDefinitionType, tableName: context.tableName }, webApiProperties) : null;
        });
    }
    getArsFieldDefinitions(context) {
        const mappedCoreFields = map$1(context.mappedInternalFields, (coreField) => {
            coreField.fieldMapping.resourceType = RX_RECORD_DEFINITION.externalFieldMapping;
            return coreField;
        });
        const selectedExternalFields = chain(context.selectedExternalFields)
            .reject(isAssociatedField)
            .map((externalField) => {
            externalField.id = this.rxIdService.generate();
            if (externalField.fieldOption === RecordFieldOption.System) {
                externalField.fieldOption = RecordFieldOption.Required;
            }
            ['lastChangedBy', 'lastUpdateTime'].forEach((columnProperty) => {
                delete externalField[columnProperty];
            });
            return externalField;
        })
            .value();
        function isAssociatedField(externalField) {
            const path = 'fieldMapping.externalFieldId';
            return some(context.mappedInternalFields, [path, get(externalField, path)]);
        }
        return mappedCoreFields.concat(selectedExternalFields);
    }
    getWebApiFieldDefinitions(context) {
        var _a, _b;
        let nonDocumentSchemaFields = [];
        if ((_a = context.selectedFieldMapping) === null || _a === void 0 ? void 0 : _a.id) {
            nonDocumentSchemaFields = reject(context.nonDocumentSchemaFields, { name: this.systemFieldsNames.idFieldName });
        }
        if ((_b = context.selectedFieldMapping) === null || _b === void 0 ? void 0 : _b.displayId) {
            nonDocumentSchemaFields = reject(nonDocumentSchemaFields, { name: this.systemFieldsNames.displayIdFieldName });
        }
        return [...context.documentSchemaFields, ...nonDocumentSchemaFields].map((field) => {
            var _a, _b;
            if (((_a = context.selectedFieldMapping) === null || _a === void 0 ? void 0 : _a.id) === field.path || field.name === this.systemFieldsNames.idFieldName) {
                return getIdFieldDefinition(RX_RECORD_DEFINITION.coreFieldIds.id, field);
            }
            else if (((_b = context.selectedFieldMapping) === null || _b === void 0 ? void 0 : _b.displayId) === field.path ||
                field.name === this.systemFieldsNames.displayIdFieldName) {
                return getIdFieldDefinition(RX_RECORD_DEFINITION.coreFieldIds.displayId, field);
            }
            function getIdFieldDefinition(coreFieldId, documentSchemaField) {
                const fieldDefinition = find(RX_RECORD_DEFINITION.coreFields, { id: coreFieldId });
                return Object.assign({ fieldMapping: {
                        resourceType: RX_RECORD_DEFINITION.externalFieldMapping,
                        externalFieldId: documentSchemaField.path
                    } }, fieldDefinition);
            }
            const newFieldDefinition = this.rxFieldDefinitionManagerService.getNewFieldDefinitionModel(field.type, {
                name: field.name
            });
            return Object.assign({ fieldMapping: {
                    resourceType: RX_RECORD_DEFINITION.externalFieldMapping,
                    externalFieldId: field.path
                } }, newFieldDefinition);
        });
    }
}
/** @nocollapse */ ExternalRecordWizardService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExternalRecordWizardService, deps: [{ token: i0.ComponentFactoryResolver }, { token: i5$1.RxIdService }, { token: i2$2.RxFieldDefinitionManagerService }, { token: i2$1.RxWizardService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ ExternalRecordWizardService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExternalRecordWizardService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExternalRecordWizardService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i5$1.RxIdService }, { type: i2$2.RxFieldDefinitionManagerService }, { type: i2$1.RxWizardService }, { type: i3.TranslateService }]; } });

class FieldSelectionStepComponent {
    constructor(rxWizardModalComponent, translateService, rxDefinitionNameService, rxFieldDefinitionService, rxGuidService, rxRecordDefinitionService) {
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.rxGuidService = rxGuidService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.notificationMessage = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.field-selection.notification.message');
        this.destroyed$ = new ReplaySubject(1);
        this.alertConfig = {
            content: this.notificationMessage,
            variant: 'info',
            type: 'inline',
            dismissible: false
        };
        this.selectTexts = {
            headerText: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.field-selection.select.header'),
            numberOptionsText: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.field-selection.select.fields.label'),
            checked: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.field-selection.select.selected.label')
        };
        this.primarySelectedFieldsFormControl = new FormControl([]);
        this.secondarySelectedFieldsFormControl = new FormControl([]);
    }
    ngOnInit() {
        this.rxWizardModalComponent.api.enableFinishButton();
        const context$ = this.rxWizardModalComponent.context$.pipe(tap((context) => {
            if (!context.selectedFields) {
                this.primarySelectedFieldsFormControl.setValue([]);
                this.secondarySelectedFieldsFormControl.setValue([]);
            }
        }), shareReplay(1), takeUntil(this.destroyed$));
        const primaryRecordDefinitionName$ = context$.pipe(pluck('primaryRecordDefinitionName'), distinctUntilChanged(), filter(Boolean), shareReplay(1));
        const secondaryRecordDefinitionName$ = context$.pipe(pluck('secondaryRecordDefinitionName'), distinctUntilChanged(), filter(Boolean), shareReplay(1));
        combineLatest([primaryRecordDefinitionName$, secondaryRecordDefinitionName$]).subscribe(([primaryRecordDefinitionName, secondaryRecordDefinitionName]) => {
            this.selectLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.field-selection.select.label', {
                primaryRecordDefinitionName: this.rxDefinitionNameService.getDisplayName(primaryRecordDefinitionName),
                secondaryRecordDefinitionName: this.rxDefinitionNameService.getDisplayName(secondaryRecordDefinitionName)
            });
        });
        this.primaryAvailableFields$ = primaryRecordDefinitionName$.pipe(switchMap((primaryRecordDefinitionName) => this.rxRecordDefinitionService.get(primaryRecordDefinitionName, {}, true)), map((recordDefinition) => this.getJoinFieldDefinitions(recordDefinition, RX_RECORD_DEFINITION.sourceRecordTypes.primary)));
        this.secondaryAvailableFields$ = secondaryRecordDefinitionName$.pipe(switchMap((secondaryRecordDefinitionName) => this.rxRecordDefinitionService.get(secondaryRecordDefinitionName, {}, true)), map((recordDefinition) => this.getJoinFieldDefinitions(recordDefinition, RX_RECORD_DEFINITION.sourceRecordTypes.secondary)));
        const primarySelectedFields$ = this.primarySelectedFieldsFormControl.valueChanges.pipe(startWith([]));
        const secondarySelectedFields$ = this.secondarySelectedFieldsFormControl.valueChanges.pipe(startWith([]));
        const duplicateNames$ = combineLatest([primarySelectedFields$, secondarySelectedFields$]).pipe(map(([primarySelectedFields, secondarySelectedFields]) => {
            const selectedPrimaryFieldNames = map$1(primarySelectedFields, 'name');
            const selectedSecondaryFieldNames = map$1(secondarySelectedFields, 'name');
            return intersection(selectedPrimaryFieldNames, selectedSecondaryFieldNames).concat(intersection(map$1(RX_RECORD_DEFINITION.joinRecordDefinitionCoreFields, 'name'), selectedPrimaryFieldNames.concat(selectedSecondaryFieldNames)));
        }), shareReplay(1));
        this.hasDuplicates$ = duplicateNames$.pipe(map((duplicateNames) => !!duplicateNames.length));
        combineLatest([primarySelectedFields$, secondarySelectedFields$])
            .pipe(withLatestFrom(duplicateNames$, primaryRecordDefinitionName$, secondaryRecordDefinitionName$), takeUntil(this.destroyed$))
            .subscribe(([[primarySelectedFields, secondarySelectedFields], duplicateNames, primaryRecordDefinitionName, secondaryRecordDefinitionName]) => {
            const nonRetainableFieldIds = chain(primarySelectedFields)
                .concat(secondarySelectedFields)
                .map('fieldMapping.sourceFieldId')
                .filter((fieldId, index, selectedFieldIds) => includes(selectedFieldIds, fieldId, index + 1))
                .union(RX_RECORD_DEFINITION.joinRecordDefinitionCoreFieldIds)
                .value();
            const primaryRecordDisplayName = this.rxDefinitionNameService.getDisplayName(primaryRecordDefinitionName);
            const secondaryRecordDisplayName = this.rxDefinitionNameService.getDisplayName(secondaryRecordDefinitionName);
            this.rxWizardModalComponent.api.updateContext({
                selectedFields: concat(primarySelectedFields, secondarySelectedFields)
                    .filter((fieldDefinition) => this.rxFieldDefinitionService.isJoinedField(fieldDefinition))
                    .map((fieldDefinition) => {
                    const field = cloneDeep(fieldDefinition);
                    if (includes(duplicateNames, field.name)) {
                        if (field.fieldMapping.source === RX_RECORD_DEFINITION.sourceRecordTypes.primary) {
                            field.name = `${field.name} - ${primaryRecordDisplayName}`;
                        }
                        else {
                            field.name = `${field.name} - ${secondaryRecordDisplayName}`;
                        }
                    }
                    if (!includes(nonRetainableFieldIds, field.fieldMapping.sourceFieldId)) {
                        field.customId = field.fieldMapping.sourceFieldId;
                    }
                    return field;
                })
                    .concat(RX_RECORD_DEFINITION.joinRecordDefinitionCoreFields)
            });
        });
    }
    optionFormatter(field) {
        return field.name;
    }
    getJoinFieldDefinitions(record, sourceType) {
        return map$1(record === null || record === void 0 ? void 0 : record.fieldDefinitions, (fieldDefinition) => {
            const joinFieldDefinition = cloneDeep(fieldDefinition);
            joinFieldDefinition.fieldMapping = {
                resourceType: RX_RECORD_DEFINITION.joinFieldMapping,
                sourceFieldId: fieldDefinition.id,
                source: sourceType
            };
            joinFieldDefinition.id = this.rxGuidService.generate('rx-');
            // Join record should not carry forward FTS properties from primary and secondary record.
            if (joinFieldDefinition.searchDefinition) {
                joinFieldDefinition.searchDefinition = null;
            }
            delete joinFieldDefinition.lastUpdateTime;
            return joinFieldDefinition;
        });
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
/** @nocollapse */ FieldSelectionStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldSelectionStepComponent, deps: [{ token: i2$1.RxWizardModalComponent }, { token: i3.TranslateService }, { token: i2.RxDefinitionNameService }, { token: i1$5.RxFieldDefinitionService }, { token: i5$1.RxGuidService }, { token: i1$5.RxRecordDefinitionService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ FieldSelectionStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FieldSelectionStepComponent, selector: "ax-field-selection-step", ngImport: i0, template: "<div class=\"d-flex flex-column mh-100\">\n  <div>\n    <adapt-alert *ngIf=\"hasDuplicates$ | async\" class=\"mb-3\" [config]=\"alertConfig\"></adapt-alert>\n  </div>\n\n  <label>{{ selectLabel }}</label>\n\n  <div class=\"d-flex flex-row select-container\">\n    <adapt-rx-select\n      class=\"d-flex flex-column h-100\"\n      *ngIf=\"primaryAvailableFields$ | async as primaryAvailableFields\"\n      [inline]=\"true\"\n      [multiple]=\"true\"\n      [options]=\"primaryAvailableFields\"\n      [optionFormatter]=\"optionFormatter\"\n      [selectAllButton]=\"true\"\n      [deselectAllButton]=\"true\"\n      [texts]=\"selectTexts\"\n      [popupMaxHeight]=\"'100%'\"\n      [formControl]=\"primarySelectedFieldsFormControl\"\n      [label]=\"'com.bmc.arsys.rx.innovation-studio.join-record-wizard.field-selection.primary-record.label' | translate\"\n    >\n    </adapt-rx-select>\n\n    <adapt-rx-select\n      class=\"ml-4 d-flex flex-column h-100\"\n      *ngIf=\"secondaryAvailableFields$ | async as secondaryAvailableFields\"\n      [inline]=\"true\"\n      [multiple]=\"true\"\n      [options]=\"secondaryAvailableFields\"\n      [optionFormatter]=\"optionFormatter\"\n      [selectAllButton]=\"true\"\n      [deselectAllButton]=\"true\"\n      [texts]=\"selectTexts\"\n      [popupMaxHeight]=\"'100%'\"\n      [formControl]=\"secondarySelectedFieldsFormControl\"\n      [label]=\"\n        'com.bmc.arsys.rx.innovation-studio.join-record-wizard.field-selection.secondary-record.label' | translate\n      \"\n    >\n    </adapt-rx-select>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;position:relative;height:100%}:host ::ng-deep adapt-rx-select{width:100%;max-width:400px}:host ::ng-deep adapt-rx-select .rx-select__options-wrapper{flex:1 1 auto;overflow:auto}.select-container{overflow:auto}\n"], components: [{ type: i1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "async": i8.AsyncPipe, "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldSelectionStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-field-selection-step',
                    templateUrl: './field-selection-step.component.html',
                    styleUrls: ['./field-selection-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i2$1.RxWizardModalComponent }, { type: i3.TranslateService }, { type: i2.RxDefinitionNameService }, { type: i1$5.RxFieldDefinitionService }, { type: i5$1.RxGuidService }, { type: i1$5.RxRecordDefinitionService }]; } });

class JoinCriteriaExpressionConfigurator$1 extends RxExpressionConfigurator {
    constructor(primaryRecordDefinition, secondaryRecordDefinition, injector) {
        super();
        this.commonDataDictionary$ = null;
        const translateService = injector.get(TranslateService);
        const rxDefinitionNameService = injector.get(RxDefinitionNameService);
        const records = [
            {
                recordDefinitionName: rxDefinitionNameService.getDisplayName(primaryRecordDefinition.name),
                label: `(${translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.primary.label')})`,
                type: RX_RECORD_DEFINITION.sourceRecordTypes.primary,
                fieldDefinitions: primaryRecordDefinition.fieldDefinitions
            },
            {
                recordDefinitionName: rxDefinitionNameService.getDisplayName(secondaryRecordDefinition.name),
                label: `(${translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.secondary.label')})`,
                type: RX_RECORD_DEFINITION.sourceRecordTypes.secondary,
                fieldDefinitions: secondaryRecordDefinition.fieldDefinitions
            }
        ];
        this.commonDataDictionary$ = of(records.map((record) => ({
            label: `${record.recordDefinitionName} ${record.label}`,
            expanded: true,
            children: chain(record.fieldDefinitions)
                .map((fieldDefinition) => {
                if (fieldDefinition.resourceType !== RX_RECORD_DEFINITION.dataTypes.attachment.resourceType) {
                    return {
                        label: `${record.recordDefinitionName}.${fieldDefinition.name}`,
                        icon: 'd-icon-field_text',
                        expression: `\${${record.recordDefinitionName}.${record.type}.${fieldDefinition.name}}`
                    };
                }
            })
                .compact()
                .sortBy((item) => item.label.toLocaleLowerCase())
                .value()
        })));
    }
}

class JoinCriteriaStepComponent {
    constructor(injector, translateService, rxExpressionEditorService, rxWizardModalComponent, rxRecordDefinitionCacheService) {
        this.injector = injector;
        this.translateService = translateService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.isExpressionFormControlVisible = false;
        this.destroyed$ = new ReplaySubject(1);
        this.expressionFormControlLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.on-statement.label');
        this.expressionFormControlTooltip = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.on-statement.tooltip');
    }
    ngOnInit() {
        const primaryRecordDefinition$ = this.rxWizardModalComponent.context$.pipe(pluck('primaryRecordDefinitionName'), distinctUntilChanged(), filter(Boolean), switchMap((primaryRecordDefinitionName) => this.rxRecordDefinitionCacheService.getRecordDefinition(primaryRecordDefinitionName)));
        const secondaryRecordDefinition$ = this.rxWizardModalComponent.context$.pipe(pluck('secondaryRecordDefinitionName'), distinctUntilChanged(), filter(Boolean), switchMap((secondaryRecordDefinitionName) => this.rxRecordDefinitionCacheService.getRecordDefinition(secondaryRecordDefinitionName)));
        this.expressionOptions$ = combineLatest([primaryRecordDefinition$, secondaryRecordDefinition$]).pipe(tap(() => {
            this.isExpressionFormControlVisible = false;
            setTimeout(() => {
                this.isExpressionFormControlVisible = true;
            });
        }), map(([primaryRecordDefinition, secondaryRecordDefinition]) => {
            this.expressionConfigurator = new JoinCriteriaExpressionConfigurator$1(primaryRecordDefinition, secondaryRecordDefinition, this.injector);
            this.expressionConfigurator.configureForProperty({
                propertyPath: 'joinCriteria',
                operators: ExpressionOperatorRowsByGroup.get(ExpressionOperatorGroup.All)
            });
            return {
                dataDictionary$: this.expressionConfigurator.getDataDictionary('joinCriteria'),
                label: this.expressionFormControlLabel,
                tooltip: {
                    iconName: 'question_circle_o',
                    content: this.expressionFormControlTooltip
                },
                operators: this.expressionConfigurator.getOperators('joinCriteria')
            };
        }));
    }
    openEditor() {
        this.rxWizardModalComponent.context$
            .pipe(pluck('joinCriteria'), take(1), switchMap((joinCriteria) => this.rxExpressionEditorService.openEditor({
            property: {
                value: joinCriteria,
                path: 'joinCriteria',
                label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.on-statement.label')
            },
            expressionConfigurator: this.expressionConfigurator,
            legend: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.field.label'),
                    icon: 'd-icon-field_text'
                }
            ]
        })))
            .subscribe((expression) => {
            this.rxWizardModalComponent.api.updateContext({ joinCriteria: expression.value });
        });
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
/** @nocollapse */ JoinCriteriaStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JoinCriteriaStepComponent, deps: [{ token: i0.Injector }, { token: i3.TranslateService }, { token: i2$1.RxExpressionEditorService }, { token: i2$1.RxWizardModalComponent }, { token: i1$5.RxRecordDefinitionCacheService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ JoinCriteriaStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: JoinCriteriaStepComponent, selector: "ax-join-criteria-step", ngImport: i0, template: "<p>\n  {{ 'com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.info' | translate }}\n</p>\n\n<div *ngIf=\"expressionOptions$ | async as expressionOptions\">\n  <ng-container *ngIf=\"isExpressionFormControlVisible\">\n    <rx-expression-form-control\n      [ngModel]=\"(rxWizardModalComponent.context$ | async).joinCriteria\"\n      (events)=\"openEditor()\"\n      [options]=\"expressionOptions\"\n    ></rx-expression-form-control>\n  </ng-container>\n</div>\n", components: [{ type: i2$1.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i3.TranslatePipe, "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JoinCriteriaStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-join-criteria-step',
                    templateUrl: 'join-criteria-step.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i3.TranslateService }, { type: i2$1.RxExpressionEditorService }, { type: i2$1.RxWizardModalComponent }, { type: i1$5.RxRecordDefinitionCacheService }]; } });

class RecordDefinitionsStepComponent {
    constructor(translateService, rxWizardModalComponent) {
        this.translateService = translateService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.destroyed$ = new ReplaySubject(1);
        this.definitionPickerConfig = {
            label: '',
            definitionType: RxDefinitionPickerType.Record,
            availableDefinitionPickerStates: {
                definitionButtonsGroups: [RxDefinitionPickerScope.Bundle, RxDefinitionPickerScope.All],
                search: RxDefinitionPickerScope.All
            },
            required: true
        };
        this.primaryDefinitionPickerConfig = Object.assign(Object.assign({}, this.definitionPickerConfig), { label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.record-definitions.primary-record.label') });
        this.secondaryDefinitionPickerConfig = Object.assign(Object.assign({}, this.definitionPickerConfig), { label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.record-definitions.secondary-record.label') });
        this.joinTypes = [RX_RECORD_DEFINITION.joinTypes.inner, RX_RECORD_DEFINITION.joinTypes.outer];
        this.primaryRecordDefinitionNameFormControl = new FormControl('', Validators.required);
        this.secondaryRecordDefinitionNameFormControl = new FormControl('', Validators.required);
        this.joinTypeFormControl = new FormControl([], Validators.required);
    }
    optionFormatter(selectOption) {
        return selectOption.displayName;
    }
    ngOnInit() {
        this.rxWizardModalComponent.api.disableFinishButton();
        this.rxWizardModalComponent.api.disableNextButton();
        this.primaryRecordDefinitionNameFormControl.valueChanges
            .pipe(withLatestFrom(this.rxWizardModalComponent.context$), takeUntil(this.destroyed$))
            .subscribe(([primaryRecordDefinitionName, context]) => {
            const newContext = { primaryRecordDefinitionName };
            if (primaryRecordDefinitionName !== context.primaryRecordDefinitionName) {
                newContext.joinCriteria = null;
                newContext.selectedFields = null;
            }
            this.rxWizardModalComponent.api.updateContext(newContext);
        });
        this.secondaryRecordDefinitionNameFormControl.valueChanges
            .pipe(withLatestFrom(this.rxWizardModalComponent.context$), takeUntil(this.destroyed$))
            .subscribe(([secondaryRecordDefinitionName, context]) => {
            const newContext = { secondaryRecordDefinitionName };
            if (secondaryRecordDefinitionName !== context.primaryRecordDefinitionName) {
                newContext.joinCriteria = null;
                newContext.selectedFields = null;
            }
            this.rxWizardModalComponent.api.updateContext(newContext);
        });
        this.joinTypeFormControl.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((joinType) => {
            this.rxWizardModalComponent.api.updateContext({
                joinType: head(joinType).value
            });
        });
        this.rxWizardModalComponent.context$
            .pipe(takeUntil(this.destroyed$))
            .subscribe((context) => {
            if (context.primaryRecordDefinitionName && context.secondaryRecordDefinitionName && context.joinType) {
                this.rxWizardModalComponent.api.enableNextButton();
            }
            else {
                this.rxWizardModalComponent.api.disableNextButton();
            }
        });
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
/** @nocollapse */ RecordDefinitionsStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDefinitionsStepComponent, deps: [{ token: i3.TranslateService }, { token: i2$1.RxWizardModalComponent }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ RecordDefinitionsStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordDefinitionsStepComponent, selector: "ax-record-definitions-step", ngImport: i0, template: "<div class=\"d-flex flex-column control-width\">\n  <rx-definition-picker\n    [options]=\"primaryDefinitionPickerConfig\"\n    [formControl]=\"primaryRecordDefinitionNameFormControl\"\n    class=\"form-group\"\n  ></rx-definition-picker>\n\n  <rx-definition-picker\n    [options]=\"secondaryDefinitionPickerConfig\"\n    [formControl]=\"secondaryRecordDefinitionNameFormControl\"\n    class=\"form-group\"\n  ></rx-definition-picker>\n\n  <adapt-rx-select\n    [required]=\"true\"\n    [label]=\"'com.bmc.arsys.rx.innovation-studio.join-record-wizard.record-definitions.type.label' | translate\"\n    [options]=\"joinTypes\"\n    [optionFormatter]=\"optionFormatter\"\n    [formControl]=\"joinTypeFormControl\"\n  ></adapt-rx-select>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.control-width{max-width:400px}\n"], components: [{ type: i2$1.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i4.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDefinitionsStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-record-definitions-step',
                    templateUrl: './record-definitions-step.component.html',
                    styleUrls: ['./record-definitions-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i3.TranslateService }, { type: i2$1.RxWizardModalComponent }]; } });

class JoinRecordWizardService {
    constructor(rxWizardService, translateService, componentFactoryResolver) {
        this.rxWizardService = rxWizardService;
        this.translateService = translateService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.title = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.title');
        this.finishButtonLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.save.label');
    }
    open() {
        const wizardConfig = {
            title: this.title,
            allowFinish: true,
            finishButtonLabel: this.finishButtonLabel,
            steps: [
                {
                    id: 'record-definitions',
                    name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.record-definitions.title'),
                    componentFactory: this.componentFactoryResolver.resolveComponentFactory(RecordDefinitionsStepComponent)
                },
                {
                    id: 'join-criteria',
                    name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.title'),
                    componentFactory: this.componentFactoryResolver.resolveComponentFactory(JoinCriteriaStepComponent)
                },
                {
                    id: 'field-selection',
                    name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.field-selection.title'),
                    componentFactory: this.componentFactoryResolver.resolveComponentFactory(FieldSelectionStepComponent)
                }
            ]
        };
        return this.rxWizardService
            .open({
            context: {},
            options: wizardConfig
        })
            .then((context) => {
            if (context) {
                return {
                    primaryRecordDefinitionName: context.primaryRecordDefinitionName,
                    secondaryRecordDefinitionName: context.secondaryRecordDefinitionName,
                    joinCriteria: context.joinCriteria,
                    joinType: context.joinType,
                    resourceType: RX_RECORD_DEFINITION.recordDefinitionTypes.join.recordDefinitionType,
                    fieldDefinitions: context.selectedFields
                };
            }
            else {
                return null;
            }
        });
    }
}
/** @nocollapse */ JoinRecordWizardService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JoinRecordWizardService, deps: [{ token: i2$1.RxWizardService }, { token: i3.TranslateService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ JoinRecordWizardService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JoinRecordWizardService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JoinRecordWizardService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i2$1.RxWizardService }, { type: i3.TranslateService }, { type: i0.ComponentFactoryResolver }]; } });

const AX_RECORD_DEFINITION_TAB = {
    archiving: {
        recordDefinitionName: 'AR System Archive Policy',
        fieldIds: {
            runNow: 357
        }
    }
};

class CreateCustomRecordComponent extends RxModalClass {
    constructor(injector, formBuilder, activeModalRef, rxExternalDataService, rxRecordDefinitionService, rxDefinitionNameService, rxBundleCache, router) {
        super(activeModalRef, injector);
        this.injector = injector;
        this.formBuilder = formBuilder;
        this.activeModalRef = activeModalRef;
        this.rxExternalDataService = rxExternalDataService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxBundleCache = rxBundleCache;
        this.router = router;
        this.initForm();
        this.customDataSourceNames$ = this.rxExternalDataService
            .getDataSourceNames(RX_RECORD_DEFINITION.externalRecordDefinitionTypes.custom)
            .pipe(startWith([]));
    }
    submit() {
        const createCustomRecordFormValue = this.createCustomRecordForm.value;
        const recordDefinitionName = this.rxDefinitionNameService.getDefinitionName(this.rxBundleCache.bundleId, createCustomRecordFormValue.name);
        const customRecordDefinition = {
            name: recordDefinitionName,
            dataSourceName: createCustomRecordFormValue.dataSourceName[0],
            resourceType: RX_RECORD_DEFINITION.recordDefinitionTypes.external.recordDefinitionType,
            fieldDefinitions: [
                {
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character,
                    name: 'Display ID',
                    id: 1,
                    fieldOption: RX_RECORD_DEFINITION.fieldOptions.system
                },
                {
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character,
                    name: 'ID',
                    id: 379,
                    fieldOption: RX_RECORD_DEFINITION.fieldOptions.system
                },
                {
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character,
                    name: 'Data Provider ID',
                    id: 380,
                    fieldOption: RX_RECORD_DEFINITION.fieldOptions.required
                }
            ]
        };
        this.allowDismiss = false;
        this.rxRecordDefinitionService
            .create(customRecordDefinition)
            .pipe(finalize(() => {
            this.allowDismiss = true;
        }))
            .subscribe(() => {
            this.router.navigate([RX_APPLICATION.innovationStudioBundleId, 'record', 'edit', recordDefinitionName]);
        });
    }
    cancel() {
        this.dismissDialog();
    }
    initForm() {
        this.createCustomRecordForm = this.formBuilder.group({
            name: this.formBuilder.control(null, [Validators.required]),
            dataSourceName: this.formBuilder.control(null, [Validators.required])
        });
    }
}
/** @nocollapse */ CreateCustomRecordComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateCustomRecordComponent, deps: [{ token: i0.Injector }, { token: i4.FormBuilder }, { token: i1.ActiveModalRef }, { token: RxExternalDataService }, { token: i1$5.RxRecordDefinitionService }, { token: i2.RxDefinitionNameService }, { token: i2.RxBundleCacheService }, { token: i1$1.Router }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ CreateCustomRecordComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CreateCustomRecordComponent, selector: "ax-create-custom-record", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ 'com.bmc.arsys.rx.innovation-studio.create-custom-record-modal.title' | translate }}\n  </h5>\n  <button\n    class=\"close close-inverse\"\n    data-dismiss=\"modal\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <form [formGroup]=\"createCustomRecordForm\">\n    <adapt-rx-textfield\n      autofocus\n      rx-id=\"name\"\n      class=\"d-block form-group\"\n      name=\"name\"\n      formControlName=\"name\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.name.label' | translate }}\"\n    ></adapt-rx-textfield>\n    <adapt-rx-select\n      rx-id=\"data-source-name\"\n      class=\"form-group\"\n      label=\"{{ 'com.bmc.arsys.rx.innovation-studio.create-custom-record-modal.data-source-name.label' | translate }}\"\n      name=\"dataSourceName\"\n      formControlName=\"dataSourceName\"\n      [disabled]=\"!allowDismiss\"\n      [options]=\"customDataSourceNames$ | async\"\n    ></adapt-rx-select>\n  </form>\n</div>\n\n<div class=\"modal-footer d-flex w-100\">\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    [adaptInlineLoader]=\"!allowDismiss\"\n    [disabled]=\"createCustomRecordForm.pristine || createCustomRecordForm.invalid || !allowDismiss\"\n    (click)=\"submit()\"\n    rx-id=\"create-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.create.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n    rx-id=\"cancel-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i4.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i4.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i1.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i3.TranslatePipe, "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateCustomRecordComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-create-custom-record',
                    templateUrl: './create-custom-record.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i4.FormBuilder }, { type: i1.ActiveModalRef }, { type: RxExternalDataService }, { type: i1$5.RxRecordDefinitionService }, { type: i2.RxDefinitionNameService }, { type: i2.RxBundleCacheService }, { type: i1$1.Router }]; } });

class JoinCriteriaExpressionConfigurator extends RxExpressionConfigurator {
    constructor(primaryRecordDefinition$, secondaryRecordDefinition$, injector) {
        super();
        this.primaryRecordDefinition$ = primaryRecordDefinition$;
        this.secondaryRecordDefinition$ = secondaryRecordDefinition$;
        this.injector = injector;
        this.translateService = this.injector.get(TranslateService);
        this.rxDefinitionNameService = this.injector.get(RxDefinitionNameService);
        this.commonDataDictionary$ = combineLatest([
            this.primaryRecordDefinition$,
            this.secondaryRecordDefinition$
        ]).pipe(map(([primaryRecordDefinition, secondaryRecordDefinition]) => {
            if (primaryRecordDefinition && secondaryRecordDefinition) {
                const records = [
                    {
                        recordDefinitionName: this.rxDefinitionNameService.getDisplayName(primaryRecordDefinition.name),
                        label: `(${this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.primary.label')})`,
                        type: RX_RECORD_DEFINITION.sourceRecordTypes.primary,
                        fieldDefinitions: primaryRecordDefinition.fieldDefinitions
                    },
                    {
                        recordDefinitionName: this.rxDefinitionNameService.getDisplayName(secondaryRecordDefinition.name),
                        label: `(${this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.secondary.label')})`,
                        type: RX_RECORD_DEFINITION.sourceRecordTypes.secondary,
                        fieldDefinitions: secondaryRecordDefinition.fieldDefinitions
                    }
                ];
                return records.map((record) => ({
                    label: `${record.recordDefinitionName} ${record.label}`,
                    expanded: true,
                    children: chain(record.fieldDefinitions)
                        .reject({ resourceType: RX_RECORD_DEFINITION.dataTypes.attachment.resourceType })
                        .map((fieldDefinition) => ({
                        label: `${record.recordDefinitionName}.${fieldDefinition.name}`,
                        icon: 'd-icon-field_text',
                        expression: `\${${record.recordDefinitionName}.${record.type}.${fieldDefinition.name}}`
                    }))
                        .sortBy((item) => item.label.toLocaleLowerCase())
                        .value()
                }));
            }
            else {
                return [];
            }
        }));
    }
    getDefaultConfig() {
        return Object.assign(Object.assign({}, super.getDefaultConfig()), { operators: ExpressionOperatorRowsByGroup.get(ExpressionOperatorGroup.AllServer) });
    }
}

class CreateJoinRecordComponent extends RxModalClass {
    constructor(injector, activeModalRef, rxRecordDefinitionService, rxDefinitionNameService, rxBundleCache, router, translateService, rxRecordDefinitionCacheService, rxExpressionEditorService, rxRecordDesignerService, changeDetector) {
        super(activeModalRef, injector);
        this.injector = injector;
        this.activeModalRef = activeModalRef;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxBundleCache = rxBundleCache;
        this.router = router;
        this.translateService = translateService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxRecordDesignerService = rxRecordDesignerService;
        this.changeDetector = changeDetector;
        this.destroyed$ = new ReplaySubject(1);
        this.expressionFormControlLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.create-join-record-modal.join-criteria.on-statement.label');
        this.expressionFormControlTooltip = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.create-join-record-modal.join-criteria.on-statement.tooltip');
        this.primaryRecordDefinitionPickerOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.create-join-record-modal.primary-record.label'),
            definitionType: RxDefinitionPickerType.Record,
            required: true
        };
        this.secondaryRecordDefinitionPickerOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.create-join-record-modal.secondary-record.label'),
            definitionType: RxDefinitionPickerType.Record,
            required: true
        };
        this.joinTypes = [RX_RECORD_DEFINITION.joinTypes.inner, RX_RECORD_DEFINITION.joinTypes.outer];
        this.primaryRecordDefinitionNameFormControl = new FormControl('', Validators.required);
        this.secondaryRecordDefinitionNameFormControl = new FormControl('', Validators.required);
        this.primaryRecordDefinition$ = this.primaryRecordDefinitionNameFormControl.valueChanges.pipe(startWith(null), switchMap((primaryRecordDefinitionName) => primaryRecordDefinitionName
            ? this.rxRecordDefinitionCacheService.getRecordDefinition(primaryRecordDefinitionName)
            : of(null)), shareReplay(1));
        this.secondaryRecordDefinition$ = this.secondaryRecordDefinitionNameFormControl.valueChanges.pipe(startWith(null), switchMap((secondaryRecordDefinitionName) => secondaryRecordDefinitionName
            ? this.rxRecordDefinitionCacheService.getRecordDefinition(secondaryRecordDefinitionName)
            : of(null)), shareReplay(1));
        this.createJoinRecordForm = new FormGroup({
            name: new FormControl('', Validators.required),
            primaryRecordDefinitionName: this.primaryRecordDefinitionNameFormControl,
            secondaryRecordDefinitionName: this.secondaryRecordDefinitionNameFormControl,
            joinType: new FormControl([], Validators.required),
            joinCriteria: new FormControl('')
        });
        this.expressionConfigurator = new JoinCriteriaExpressionConfigurator(this.primaryRecordDefinition$, this.secondaryRecordDefinition$, this.injector);
        this.expressionFormControlOptions = {
            label: this.expressionFormControlLabel,
            tooltip: {
                iconName: 'question_circle_o',
                content: this.expressionFormControlTooltip
            },
            dataDictionary$: this.expressionConfigurator.getDataDictionary(),
            operators: this.expressionConfigurator.getOperators()
        };
    }
    ngOnInit() {
        super.ngOnInit();
        combineLatest([this.primaryRecordDefinition$, this.secondaryRecordDefinition$])
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
            this.createJoinRecordForm.controls.joinCriteria.reset();
        });
    }
    optionFormatter(selectOption) {
        return selectOption.displayName;
    }
    openEditor() {
        this.rxExpressionEditorService
            .openEditor({
            property: {
                value: this.createJoinRecordForm.controls.joinCriteria.value,
                path: 'joinCriteria',
                label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.create-join-record-modal.join-criteria.on-statement.label')
            },
            expressionConfigurator: this.expressionConfigurator,
            legend: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.field.label'),
                    icon: 'd-icon-field_text'
                }
            ]
        })
            .pipe(takeUntil(this.destroyed$))
            .subscribe((expression) => {
            this.createJoinRecordForm.controls.joinCriteria.setValue(expression.value);
            this.changeDetector.markForCheck();
        });
    }
    createRecord() {
        const createJoinRecordFormValue = this.createJoinRecordForm.value;
        const recordDefinitionName = this.rxDefinitionNameService.getDefinitionName(this.rxBundleCache.bundleId, createJoinRecordFormValue.name);
        const joinRecordDefinition = {
            allowFieldsOverlay: false,
            allowIndexesOverlay: false,
            allowNonAdminToDeleteRecordInstances: false,
            allowOtherPropertiesOverlay: false,
            allowPermissionsOverlay: false,
            name: recordDefinitionName,
            primaryRecordDefinitionName: createJoinRecordFormValue.primaryRecordDefinitionName,
            secondaryRecordDefinitionName: createJoinRecordFormValue.secondaryRecordDefinitionName,
            joinType: createJoinRecordFormValue.joinType[0].value,
            joinCriteria: this.rxRecordDesignerService.getJoinCriteriaArExpression(createJoinRecordFormValue.joinCriteria, createJoinRecordFormValue.primaryRecordDefinitionName, createJoinRecordFormValue.secondaryRecordDefinitionName),
            resourceType: RX_RECORD_DEFINITION.recordDefinitionTypes.join.recordDefinitionType,
            fieldDefinitions: [
                {
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character,
                    name: 'Display ID',
                    id: 1,
                    fieldOption: RX_RECORD_DEFINITION.fieldOptions.system
                },
                {
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character,
                    name: 'ID',
                    id: 379,
                    fieldOption: RX_RECORD_DEFINITION.fieldOptions.system
                }
            ]
        };
        this.allowDismiss = false;
        this.rxRecordDefinitionService
            .create(joinRecordDefinition)
            .pipe(finalize(() => {
            this.allowDismiss = true;
            this.changeDetector.markForCheck();
        }))
            .subscribe(() => {
            this.router.navigate([RX_APPLICATION.innovationStudioBundleId, 'record', 'edit2', recordDefinitionName]);
        });
    }
    cancel() {
        this.dismissDialog();
    }
}
/** @nocollapse */ CreateJoinRecordComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateJoinRecordComponent, deps: [{ token: i0.Injector }, { token: i1.ActiveModalRef }, { token: i1$5.RxRecordDefinitionService }, { token: i2.RxDefinitionNameService }, { token: i2.RxBundleCacheService }, { token: i1$1.Router }, { token: i3.TranslateService }, { token: i1$5.RxRecordDefinitionCacheService }, { token: i2$1.RxExpressionEditorService }, { token: i2$2.RxRecordDesignerService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ CreateJoinRecordComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CreateJoinRecordComponent, selector: "rx-create-join-record", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ 'com.bmc.arsys.rx.client.record-designer.create-new-join-record-editor.title' | translate }}\n  </h5>\n  <button\n    class=\"close close-inverse\"\n    data-dismiss=\"modal\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <div class=\"d-flex flex-column control-width\">\n    <form [formGroup]=\"createJoinRecordForm\">\n      <adapt-rx-textfield\n        autofocus\n        rx-id=\"name\"\n        class=\"d-block form-group\"\n        formControlName=\"name\"\n        label=\"{{ 'com.bmc.arsys.rx.client.common.name.label' | translate }}\"\n      ></adapt-rx-textfield>\n\n      <rx-definition-picker\n        class=\"d-block form-group\"\n        rx-id=\"primary-record-definition-name\"\n        [options]=\"primaryRecordDefinitionPickerOptions\"\n        formControlName=\"primaryRecordDefinitionName\"\n      ></rx-definition-picker>\n\n      <rx-definition-picker\n        class=\"d-block form-group\"\n        rx-id=\"secondary-record-definition-name\"\n        [options]=\"secondaryRecordDefinitionPickerOptions\"\n        formControlName=\"secondaryRecordDefinitionName\"\n      ></rx-definition-picker>\n\n      <adapt-rx-select\n        class=\"d-block form-group\"\n        rx-id=\"join-type\"\n        [required]=\"true\"\n        [label]=\"'com.bmc.arsys.rx.innovation-studio.create-join-record-modal.join-type.label' | translate\"\n        [options]=\"joinTypes\"\n        [optionFormatter]=\"optionFormatter\"\n        formControlName=\"joinType\"\n      ></adapt-rx-select>\n\n      <rx-expression-form-control\n        rx-id=\"join-criteria\"\n        class=\"d-block form-group\"\n        (events)=\"openEditor()\"\n        [options]=\"expressionFormControlOptions\"\n        formControlName=\"joinCriteria\"\n      ></rx-expression-form-control>\n    </form>\n  </div>\n</div>\n\n<div class=\"modal-footer d-flex w-100\">\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    [adaptInlineLoader]=\"!allowDismiss\"\n    [disabled]=\"createJoinRecordForm.pristine || createJoinRecordForm.invalid || !allowDismiss\"\n    (click)=\"createRecord()\"\n    rx-id=\"create-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.create.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n    rx-id=\"cancel-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i2$1.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i2$1.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i4.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i4.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i4.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i1.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i3.TranslatePipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateJoinRecordComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-create-join-record',
                    templateUrl: './create-join-record.component.html',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.ActiveModalRef }, { type: i1$5.RxRecordDefinitionService }, { type: i2.RxDefinitionNameService }, { type: i2.RxBundleCacheService }, { type: i1$1.Router }, { type: i3.TranslateService }, { type: i1$5.RxRecordDefinitionCacheService }, { type: i2$1.RxExpressionEditorService }, { type: i2$2.RxRecordDesignerService }, { type: i0.ChangeDetectorRef }]; } });

class AxRecordDefinitionTypePipe {
    constructor(translateService) {
        this.translateService = translateService;
    }
    transform(recordDefinition) {
        let displayName = '';
        if (recordDefinition.recordDefinitionType === RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType) {
            displayName = this.translateService.instant('com.bmc.arsys.rx.client.record-definition.type.regular.label');
        }
        if (recordDefinition.recordDefinitionType === RX_RECORD_DEFINITION.recordDefinitionTypes.join.recordDefinitionType) {
            displayName = this.translateService.instant('com.bmc.arsys.rx.client.record-definition.type.join.label');
        }
        if (recordDefinition.recordDefinitionType === RX_RECORD_DEFINITION.recordDefinitionTypes.external.recordDefinitionType) {
            if (recordDefinition.type === RX_RECORD_DEFINITION.externalRecordDefinitionTypes.custom) {
                displayName = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.record.type.custom.label');
            }
            else {
                displayName = this.translateService.instant('com.bmc.arsys.rx.client.record-definition.type.external.label');
            }
        }
        if (recordDefinition.isAuditRecordDefinition) {
            displayName = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.record.audit.label', {
                recordType: displayName
            });
        }
        if (recordDefinition.archiveSourceRecordDefinitionName) {
            displayName = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.record.archive.label', {
                recordType: displayName
            });
        }
        return displayName;
    }
}
/** @nocollapse */ AxRecordDefinitionTypePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxRecordDefinitionTypePipe, deps: [{ token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Pipe });
/** @nocollapse */ AxRecordDefinitionTypePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxRecordDefinitionTypePipe, name: "axRecordDefinitionType" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxRecordDefinitionTypePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'axRecordDefinitionType'
                }]
        }], ctorParameters: function () { return [{ type: i3.TranslateService }]; } });

class RecordDefinitionTabComponent {
    constructor(rxRecordDefinitionDataPageService, rxBundleCache, rxOverlayService, rxModalService, translateService, rxCommandFactoryService, router, rxCopyDefinitionService, joinRecordWizardService, externalRecordWizardService, rxRecordDefinitionService, rxNotificationService, rxRecordInstanceService, rxRecordInstanceUpdateService, rxRecordInstanceDataPageService, rxFeatureService) {
        this.rxRecordDefinitionDataPageService = rxRecordDefinitionDataPageService;
        this.rxBundleCache = rxBundleCache;
        this.rxOverlayService = rxOverlayService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.router = router;
        this.rxCopyDefinitionService = rxCopyDefinitionService;
        this.joinRecordWizardService = joinRecordWizardService;
        this.externalRecordWizardService = externalRecordWizardService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.rxNotificationService = rxNotificationService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxRecordInstanceUpdateService = rxRecordInstanceUpdateService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.rxFeatureService = rxFeatureService;
        this.rowSelectionChanged$ = new BehaviorSubject([]);
        this.destroyed$ = new ReplaySubject(1);
        this.definitionActions$ = this.rowSelectionChanged$.pipe(map((selectedRows) => this.getDefinitionActions(selectedRows)), takeUntil(this.destroyed$));
        this.gridColumns = [];
        this.isActionInProgress = false;
        this.dataEditorRoute = this.rxFeatureService.isFeatureEnabled('DRD21-10996') ? 'edit-data-new' : 'edit-data';
    }
    ngOnInit() {
        if (this.rxFeatureService.isFeatureEnabled('DRD21-15263')) {
            this.editRouterLink = `/${RX_APPLICATION.innovationStudioBundleId}/record/edit2/`;
        }
        this.areNewDefinitionsAllowed = this.rxOverlayService.areNewDefinitionsAllowedSync(this.bundleDescriptor);
        this.gridColumns = [
            AX_BUNDLE_DETAILS.definitionGridColumns.name,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy,
            {
                fieldId: 'recordDefinitionType',
                title: 'com.bmc.arsys.rx.client.common.item-type.label',
                index: 3,
                cellTemplate: this.recordDefinitionTypeTemplate
            },
            AX_BUNDLE_DETAILS.definitionGridColumns.scope,
            AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective
        ];
        const fieldDefinitions = [
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: 'recordDefinitionType',
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.scope.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            }
        ];
        const fieldDefinitionsById = fieldDefinitions.reduce((result, fieldDefinition) => {
            result[fieldDefinition.id] = fieldDefinition;
            return result;
        }, {});
        this.recordDefinition = {
            fieldDefinitions,
            fieldDefinitionsById
        };
        this.definitions$ = this.rxRecordDefinitionDataPageService.get({
            params: {
                propertySelection: [
                    'name',
                    'lastUpdateTime',
                    'lastChangedBy',
                    'customizationPerspective',
                    'recordDefinitionType',
                    'overlayGroupId',
                    'overlayDescriptor',
                    'isAuditRecordDefinition',
                    'scope',
                    'externalDataSourceType',
                    'archiveSourceRecordDefinitionName',
                    'type'
                ]
            }
        });
    }
    onDeleteDefinition(selectedRows) {
        const definitionNames = selectedRows.map((definition) => definition.name);
        from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.definitionTabComponent.getDeleteSelectedDefinitionMessage()
        }))
            .pipe(tap((result) => {
            this.isActionInProgress = result;
        }), switchMap((result) => result
            ? this.rxCommandFactoryService
                .forResourceType('com.bmc.arsys.rx.application.record.command.DeleteRecordDefinitionsCommand')
                .execute({
                definitionNames
            })
                .pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of(false)), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    getDefinitionActions(selectedRows) {
        var _a, _b, _c;
        const isBundleEditable = this.rxOverlayService.isBundleEditable(this.rxBundleCache.bundleId);
        return [
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.new,
                isDisabled: !this.areNewDefinitionsAllowed,
                subActions: [
                    {
                        labelKey: 'com.bmc.arsys.rx.innovation-studio.tabs.new.regular-record.label',
                        id: RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType,
                        rxId: RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType
                    },
                    {
                        labelKey: 'com.bmc.arsys.rx.innovation-studio.tabs.new.join-record.label',
                        id: RX_RECORD_DEFINITION.recordDefinitionTypes.join.recordDefinitionType,
                        rxId: RX_RECORD_DEFINITION.recordDefinitionTypes.join.recordDefinitionType
                    },
                    {
                        labelKey: 'com.bmc.arsys.rx.innovation-studio.tabs.new.external-record.label',
                        id: RX_RECORD_DEFINITION.recordDefinitionTypes.external.recordDefinitionType,
                        rxId: RX_RECORD_DEFINITION.recordDefinitionTypes.external.recordDefinitionType
                    },
                    {
                        labelKey: 'com.bmc.arsys.rx.innovation-studio.tabs.new.custom-record.label',
                        id: RX_RECORD_DEFINITION.externalRecordDefinitionTypes.custom,
                        rxId: RX_RECORD_DEFINITION.externalRecordDefinitionTypes.custom
                    }
                ]
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.rename,
                isDisabled: !isBundleEditable ||
                    !(selectedRows.length === 1 &&
                        this.rxOverlayService.isCustomizationEnabled('allowOverlay', selectedRows[0]))
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.revertCustomization,
                isDisabled: !isBundleEditable ||
                    selectedRows.length === 0 ||
                    some(selectedRows, (selectedRow) => selectedRow.customizationPerspective !== RX_OVERLAY.customizationPerspective.customizedInThisOverlayGroup)
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.copy,
                isDisabled: selectedRows.length !== 1 || !isBundleEditable
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.delete,
                isDisabled: !isBundleEditable ||
                    selectedRows.length === 0 ||
                    some(selectedRows, (selectedRow) => selectedRow.customizationPerspective !== RX_OVERLAY.customizationPerspective.createdInThisOverlayGroup)
            },
            {
                id: 'archive',
                labelKey: 'com.bmc.arsys.rx.innovation-studio.definition-actions.archive.label',
                rxId: 'archive',
                icon: 'file_o_gear',
                isDisabled: selectedRows.length !== 1 ||
                    selectedRows[0].recordDefinitionType !==
                        RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType
            },
            {
                id: 'edit-data',
                labelKey: 'com.bmc.arsys.rx.innovation-studio.definition-actions.edit-data.label',
                rxId: 'edit-data',
                icon: 'storages',
                isDisabled: selectedRows.length !== 1 ||
                    (((_a = selectedRows[0]) === null || _a === void 0 ? void 0 : _a.recordDefinitionType) ===
                        RX_RECORD_DEFINITION.recordDefinitionTypes.external.recordDefinitionType &&
                        (!((_b = selectedRows[0]) === null || _b === void 0 ? void 0 : _b.externalDataSourceType) ||
                            ((_c = selectedRows[0]) === null || _c === void 0 ? void 0 : _c.externalDataSourceType) ===
                                RX_RECORD_DEFINITION.externalRecordDefinitionDataSourceTypes.webApi))
            }
        ];
    }
    onRowSelectionChanged(selectedRows) {
        this.rowSelectionChanged$.next(selectedRows);
    }
    onCustomAction(event) {
        switch (event.actionId) {
            case RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType: {
                this.router.navigate([
                    RX_APPLICATION.innovationStudioBundleId,
                    'record',
                    this.rxFeatureService.isFeatureEnabled('DRD21-15263') ? 'new2' : 'new',
                    this.rxBundleCache.bundleId
                ]);
                break;
            }
            case RX_RECORD_DEFINITION.recordDefinitionTypes.join.recordDefinitionType: {
                if (this.rxFeatureService.isFeatureEnabled('DRD21-15263')) {
                    this.rxModalService
                        .openModal({
                        content: CreateJoinRecordComponent,
                        size: 'sm'
                    })
                        .catch(noop);
                }
                else {
                    this.joinRecordWizardService.open().then((joinRecordDesignerOptions) => {
                        if (joinRecordDesignerOptions) {
                            this.router.navigate([RX_APPLICATION.innovationStudioBundleId, 'record', 'new', this.rxBundleCache.bundleId], { state: { designerOptions: joinRecordDesignerOptions } });
                        }
                    });
                }
                break;
            }
            case RX_RECORD_DEFINITION.recordDefinitionTypes.external.recordDefinitionType: {
                this.externalRecordWizardService
                    .open()
                    .then((externalRecordDesignerOptions) => {
                    if (externalRecordDesignerOptions) {
                        this.router.navigate([RX_APPLICATION.innovationStudioBundleId, 'record', 'new', this.rxBundleCache.bundleId], { state: { designerOptions: externalRecordDesignerOptions } });
                    }
                });
                break;
            }
            case RX_RECORD_DEFINITION.externalRecordDefinitionTypes.custom: {
                this.rxModalService
                    .openModal({
                    content: CreateCustomRecordComponent,
                    size: 'sm'
                })
                    .catch(noop);
                break;
            }
            case 'edit-data': {
                this.router.navigate([
                    RX_APPLICATION.innovationStudioBundleId,
                    'record',
                    this.dataEditorRoute,
                    event.selectedRows[0][RowDataItemIdFieldName]
                ]);
                break;
            }
            case 'archive': {
                this.rxRecordDefinitionService
                    .get(event.selectedRows[0].name)
                    .pipe(take(1), switchMap((recordDefinition) => {
                    var _a, _b, _c;
                    if (!((_a = recordDefinition.archiveDescriptor) === null || _a === void 0 ? void 0 : _a.isEnabled) ||
                        ((_b = recordDefinition.archiveDescriptor) === null || _b === void 0 ? void 0 : _b.archiveType) === 'NONE') {
                        this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.tabs.records.archiving-disabled.message'));
                        return of(null);
                    }
                    else {
                        let message = '';
                        const archiveType = (_c = recordDefinition.archiveDescriptor) === null || _c === void 0 ? void 0 : _c.archiveType;
                        if (archiveType === 'COPY_TO_ARCHIVE_AND_DELETE_FROM_SOURCE') {
                            message = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.tabs.records.archive-and-delete.confirmation.message', { recordAge: recordDefinition.archiveDescriptor.ageQualifierInDays });
                        }
                        else if (archiveType === 'DELETE_FROM_SOURCE') {
                            message = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.tabs.records.delete-without-archiving.confirmation.message', { recordAge: recordDefinition.archiveDescriptor.ageQualifierInDays });
                        }
                        return from(this.rxModalService.confirm({
                            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                            modalStyle: RX_MODAL.modalStyles.warning,
                            message
                        }));
                    }
                }), switchMap((result) => {
                    if (result) {
                        return this.rxRecordInstanceDataPageService
                            .post({
                            params: {
                                recorddefinition: AX_RECORD_DEFINITION_TAB.archiving.recordDefinitionName,
                                pageSize: 1,
                                startIndex: 0,
                                propertySelection: RX_RECORD_DEFINITION.coreFieldIds.id,
                                queryExpression: `'${RX_RECORD_DEFINITION.coreFieldIds.description}' = "${event.selectedRows[0].name}"`
                            }
                        })
                            .pipe(switchMap((dataPageResult) => this.rxRecordInstanceService.get(AX_RECORD_DEFINITION_TAB.archiving.recordDefinitionName, dataPageResult.data[0][RX_RECORD_DEFINITION.coreFieldIds.id])), switchMap((recordInstance) => {
                            recordInstance.setFieldValue(AX_RECORD_DEFINITION_TAB.archiving.fieldIds.runNow, 1);
                            return this.rxRecordInstanceUpdateService.execute(recordInstance);
                        }), tap(() => {
                            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.tabs.records.archiving-started.message'));
                        }));
                    }
                    else {
                        return of(null);
                    }
                }))
                    .subscribe();
                break;
            }
        }
    }
    onCopyDefinition(row) {
        this.rxCopyDefinitionService.openCopyDefinitionComponentModal(row, CopyDefinitionType.Record).catch(noop);
    }
    onRenameDefinition({ selectedRow, definitionNames }) {
        const definitionType = this.translateService.instant('com.bmc.arsys.rx.client.definition-type.record.label');
        from(this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.title', {
                definitionType: definitionType.toLowerCase()
            }),
            size: 'sm',
            content: RenameDefinitionModalComponent,
            data: {
                definitionName: selectedRow.name,
                infoText: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.info.message'),
                fieldLabel: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.definition-name.label', { definitionType }),
                validationErrorText: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.name-validation.message', { definitionType }),
                definitionType,
                definitionNames
            }
        })
            .catch(noop))
            .pipe(filter(Boolean), tap(() => {
            this.isActionInProgress = true;
        }), switchMap((newRecordDefinitionName) => this.rxRecordDefinitionService.rename(selectedRow.name, newRecordDefinitionName)), finalize(() => {
            this.isActionInProgress = false;
        }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            .subscribe();
    }
    onRevertCustomization(selectedRows) {
        from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.revert-customization.confirmation.message')
        }))
            .pipe(tap(() => {
            this.isActionInProgress = true;
        }), switchMap((response) => response
            ? forkJoin(selectedRows.map((definition) => this.rxRecordDefinitionService.revertCustomization(definition.name))).pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
/** @nocollapse */ RecordDefinitionTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDefinitionTabComponent, deps: [{ token: i1$5.RxRecordDefinitionDataPageService }, { token: i2.RxBundleCacheService }, { token: i2.RxOverlayService }, { token: i3$1.RxModalService }, { token: i3.TranslateService }, { token: i2.RxCommandFactoryService }, { token: i1$1.Router }, { token: RxCopyDefinitionService }, { token: JoinRecordWizardService }, { token: ExternalRecordWizardService }, { token: i1$5.RxRecordDefinitionService }, { token: i2.RxNotificationService }, { token: i1$5.RxRecordInstanceService }, { token: i1$5.RxRecordInstanceUpdateService }, { token: i1$5.RxRecordInstanceDataPageService }, { token: i2.RxFeatureService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ RecordDefinitionTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordDefinitionTabComponent, selector: "ax-record-definition-tab", inputs: { bundleDescriptor: "bundleDescriptor" }, viewQueries: [{ propertyName: "recordDefinitionTypeTemplate", first: true, predicate: ["recordDefinitionTypeTemplate"], descendants: true, static: true }, { propertyName: "definitionTabComponent", first: true, predicate: DefinitionTabComponent, descendants: true, static: true }], ngImport: i0, template: "<ax-definition-tab\n  [definitionActions]=\"definitionActions$ | async\"\n  [gridColumns]=\"gridColumns\"\n  [recordDefinition]=\"recordDefinition\"\n  [definitions$]=\"definitions$\"\n  [isActionInProgress]=\"isActionInProgress\"\n  [definitionType]=\"'record'\"\n  (copyDefinition)=\"onCopyDefinition($event)\"\n  (customAction)=\"onCustomAction($event)\"\n  (deleteDefinition)=\"onDeleteDefinition($event)\"\n  (renameDefinition)=\"onRenameDefinition($event)\"\n  (revertCustomization)=\"onRevertCustomization($event)\"\n  (rowSelectionChanged)=\"onRowSelectionChanged($event)\"\n  [editRouterLink]=\"editRouterLink\"\n></ax-definition-tab>\n\n<ng-template #recordDefinitionTypeTemplate let-dataItem=\"dataItem\">\n  <div>\n    {{ dataItem | axRecordDefinitionType }}\n  </div>\n</ng-template>\n", components: [{ type: DefinitionTabComponent, selector: "ax-definition-tab", inputs: ["isActionInProgress", "definitionType", "definitionActions", "gridColumns", "definitions$", "recordDefinition", "editRouterLink"], outputs: ["customAction", "deleteDefinition", "renameDefinition", "revertCustomization", "copyDefinition", "addDefinition", "rowSelectionChanged"] }], pipes: { "async": i8.AsyncPipe, "axRecordDefinitionType": AxRecordDefinitionTypePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDefinitionTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-record-definition-tab',
                    templateUrl: './record-definition-tab.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1$5.RxRecordDefinitionDataPageService }, { type: i2.RxBundleCacheService }, { type: i2.RxOverlayService }, { type: i3$1.RxModalService }, { type: i3.TranslateService }, { type: i2.RxCommandFactoryService }, { type: i1$1.Router }, { type: RxCopyDefinitionService }, { type: JoinRecordWizardService }, { type: ExternalRecordWizardService }, { type: i1$5.RxRecordDefinitionService }, { type: i2.RxNotificationService }, { type: i1$5.RxRecordInstanceService }, { type: i1$5.RxRecordInstanceUpdateService }, { type: i1$5.RxRecordInstanceDataPageService }, { type: i2.RxFeatureService }]; }, propDecorators: { bundleDescriptor: [{
                type: Input
            }], recordDefinitionTypeTemplate: [{
                type: ViewChild,
                args: ['recordDefinitionTypeTemplate', { static: true }]
            }], definitionTabComponent: [{
                type: ViewChild,
                args: [DefinitionTabComponent, { static: true }]
            }] } });

class ViewDefinitionTabComponent {
    constructor(rxOverlayService, rxViewDefinitionDataPageService, rxModalService, translateService, rxCommandFactoryService, router, rxBundleCacheService, rxViewDefinitionService, rxCopyDefinitionService) {
        this.rxOverlayService = rxOverlayService;
        this.rxViewDefinitionDataPageService = rxViewDefinitionDataPageService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.router = router;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxViewDefinitionService = rxViewDefinitionService;
        this.rxCopyDefinitionService = rxCopyDefinitionService;
        this.rowSelectionChanged$ = new BehaviorSubject([]);
        this.definitionActions$ = this.rowSelectionChanged$.pipe(map((selectedRows) => this.getDefinitionActions(selectedRows)));
        this.gridColumns = [];
        this.isActionInProgress = false;
    }
    getNewViewSubAction(layout) {
        return {
            id: String(layout.id),
            rxId: 'view-layout-template-' + layout.id,
            labelKey: layout.label
        };
    }
    getDefinitionActions(selectedRows) {
        const isBundleEditable = this.rxOverlayService.isBundleEditable(this.rxBundleCacheService.bundleId);
        return [
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.new,
                isDisabled: !this.areNewDefinitionsAllowed,
                subActions: concat({
                    groupTitle: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.view.layout-flexible.menu.label')
                }, filter$1(RX_VIEW_LAYOUTS, { layoutType: LayoutTypes.Flexible }).map(this.getNewViewSubAction), {
                    groupTitle: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.view.layout-fixed.menu.label')
                }, filter$1(RX_VIEW_LAYOUTS, { layoutType: LayoutTypes.Fixed }).map(this.getNewViewSubAction))
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.rename,
                isDisabled: !isBundleEditable ||
                    !(selectedRows.length === 1 &&
                        this.rxOverlayService.isCustomizationEnabled('allowOverlay', selectedRows[0]))
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.revertCustomization,
                isDisabled: !isBundleEditable ||
                    selectedRows.length === 0 ||
                    some(selectedRows, (selectedRow) => selectedRow.customizationPerspective !== RX_OVERLAY.customizationPerspective.customizedInThisOverlayGroup)
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.copy,
                isDisabled: selectedRows.length !== 1 || !isBundleEditable
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.delete,
                isDisabled: !isBundleEditable ||
                    selectedRows.length === 0 ||
                    some(selectedRows, (selectedRow) => selectedRow.customizationPerspective !== RX_OVERLAY.customizationPerspective.createdInThisOverlayGroup)
            }
        ];
    }
    ngOnInit() {
        this.areNewDefinitionsAllowed = this.rxOverlayService.areNewDefinitionsAllowedSync(this.bundleDescriptor);
        this.gridColumns = [
            AX_BUNDLE_DETAILS.definitionGridColumns.name,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy,
            AX_BUNDLE_DETAILS.definitionGridColumns.scope,
            AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective
        ];
        const fieldDefinitions = [
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.scope.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            }
        ];
        const fieldDefinitionsById = fieldDefinitions.reduce((result, fieldDefinition) => {
            result[fieldDefinition.id] = fieldDefinition;
            return result;
        }, {});
        this.recordDefinition = {
            fieldDefinitions,
            fieldDefinitionsById
        };
        this.definitions$ = this.rxViewDefinitionDataPageService.get({
            params: {
                propertySelection: [
                    'name',
                    'lastUpdateTime',
                    'lastChangedBy',
                    'scope',
                    'customizationPerspective',
                    'overlayGroupId',
                    'overlayDescriptor'
                ],
                viewType: RX_VIEW_DEFINITION.types.regular,
                excludeExtensionViews: false
            }
        });
    }
    onCustomAction(event) {
        this.router.navigate([RX_APPLICATION.innovationStudioBundleId, 'view', 'new', this.rxBundleCacheService.bundleId], {
            queryParams: { layoutTemplate: event.actionId }
        });
    }
    onCopyDefinition(row) {
        this.rxCopyDefinitionService.openCopyDefinitionComponentModal(row, CopyDefinitionType.View).catch(noop);
    }
    onDeleteDefinition(selectedRows) {
        const definitionNames = selectedRows.map((definition) => definition.name);
        from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.definitionTabComponent.getDeleteSelectedDefinitionMessage()
        }))
            .pipe(tap((result) => {
            this.isActionInProgress = result;
        }), switchMap((response) => response
            ? this.rxCommandFactoryService
                .forResourceType('com.bmc.arsys.rx.application.view.command.DeleteViewDefinitionsCommand')
                .execute({
                definitionNames
            })
                .pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    onRenameDefinition({ selectedRow, definitionNames }) {
        const definitionType = this.translateService.instant('com.bmc.arsys.rx.client.definition-type.view.label');
        from(this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.title', {
                definitionType: definitionType.toLowerCase()
            }),
            size: 'sm',
            content: RenameDefinitionModalComponent,
            data: {
                definitionName: selectedRow.name,
                infoText: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.info.message'),
                fieldLabel: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.definition-name.label', { definitionType }),
                validationErrorText: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.name-validation.message', { definitionType }),
                definitionType,
                definitionNames
            }
        })
            .catch(noop))
            .pipe(filter(Boolean), tap(() => {
            this.isActionInProgress = true;
        }), switchMap((newViewDefinitionName) => this.rxViewDefinitionService.rename(selectedRow.name, newViewDefinitionName)), finalize(() => {
            this.isActionInProgress = false;
        }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            .subscribe();
    }
    onRevertCustomization(selectedRows) {
        from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.revert-customization.confirmation.message')
        }))
            .pipe(tap(() => {
            this.isActionInProgress = true;
        }), switchMap((response) => response
            ? forkJoin(selectedRows.map((definition) => this.rxViewDefinitionService.revertCustomization(definition.name))).pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    onRowSelectionChanged(selectedRows) {
        this.rowSelectionChanged$.next(selectedRows);
    }
}
/** @nocollapse */ ViewDefinitionTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDefinitionTabComponent, deps: [{ token: i2.RxOverlayService }, { token: i2$3.RxViewDefinitionDataPageService }, { token: i3$1.RxModalService }, { token: i3.TranslateService }, { token: i2.RxCommandFactoryService }, { token: i1$1.Router }, { token: i2.RxBundleCacheService }, { token: i2$3.RxViewDefinitionService }, { token: RxCopyDefinitionService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ ViewDefinitionTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ViewDefinitionTabComponent, selector: "ax-view-definition-tab", inputs: { bundleDescriptor: "bundleDescriptor" }, viewQueries: [{ propertyName: "definitionTabComponent", first: true, predicate: DefinitionTabComponent, descendants: true, static: true }], ngImport: i0, template: "<ax-definition-tab\n  [definitionActions]=\"definitionActions$ | async\"\n  [gridColumns]=\"gridColumns\"\n  [recordDefinition]=\"recordDefinition\"\n  [definitions$]=\"definitions$\"\n  [isActionInProgress]=\"isActionInProgress\"\n  [definitionType]=\"'view'\"\n  (rowSelectionChanged)=\"onRowSelectionChanged($event)\"\n  (copyDefinition)=\"onCopyDefinition($event)\"\n  (customAction)=\"onCustomAction($event)\"\n  (deleteDefinition)=\"onDeleteDefinition($event)\"\n  (renameDefinition)=\"onRenameDefinition($event)\"\n  (revertCustomization)=\"onRevertCustomization($event)\"\n></ax-definition-tab>\n", components: [{ type: DefinitionTabComponent, selector: "ax-definition-tab", inputs: ["isActionInProgress", "definitionType", "definitionActions", "gridColumns", "definitions$", "recordDefinition", "editRouterLink"], outputs: ["customAction", "deleteDefinition", "renameDefinition", "revertCustomization", "copyDefinition", "addDefinition", "rowSelectionChanged"] }], pipes: { "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDefinitionTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-view-definition-tab',
                    templateUrl: './view-definition-tab.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i2.RxOverlayService }, { type: i2$3.RxViewDefinitionDataPageService }, { type: i3$1.RxModalService }, { type: i3.TranslateService }, { type: i2.RxCommandFactoryService }, { type: i1$1.Router }, { type: i2.RxBundleCacheService }, { type: i2$3.RxViewDefinitionService }, { type: RxCopyDefinitionService }]; }, propDecorators: { bundleDescriptor: [{
                type: Input
            }], definitionTabComponent: [{
                type: ViewChild,
                args: [DefinitionTabComponent, { static: true }]
            }] } });

const AX_PROCESS_DEFINITION_TAB = {
    copyWithinApplication: 'copyWithinApplication',
    copyToAnotherApplication: 'copyToAnotherApplication',
    manageProcesses: 'manageProcesses',
    processInstanceStatuses: {
        active: 'ACTIVE',
        suspended: 'SUSPENDED',
        errored: 'ERRORED',
        completed: 'COMPLETED'
    },
    processInstanceActions: {
        suspend: 'SUSPEND',
        resume: ' RESUME',
        cancel: 'CANCEL',
        viewLog: 'VIEW_LOG',
        downloadLog: 'DOWNLOAD_LOG'
    }
};

class ProcessDefinitionTabComponent {
    constructor(adaptModalService, router, rxOverlayService, rxBundleCacheService, rxCommandFactoryService, rxProcessDefinitionDataPageService, rxModalService, translateService, rxCopyDefinitionService, rxFeatureService) {
        this.adaptModalService = adaptModalService;
        this.router = router;
        this.rxOverlayService = rxOverlayService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxProcessDefinitionDataPageService = rxProcessDefinitionDataPageService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxCopyDefinitionService = rxCopyDefinitionService;
        this.rxFeatureService = rxFeatureService;
        this.gridColumns = [];
        this.isActionInProgress = false;
        this.definitions$ = this.rxProcessDefinitionDataPageService.get({
            params: {
                propertySelection: [
                    'name',
                    'lastUpdateTime',
                    'lastChangedBy',
                    'scope',
                    'customizationPerspective',
                    'overlayGroupId',
                    'overlayDescriptor',
                    'isEnabled'
                ],
                bundleId: this.rxBundleCacheService.bundleId
            }
        });
        this.rowSelectionChanged$ = new BehaviorSubject([]);
        this.definitionActions$ = this.rowSelectionChanged$.pipe(map((selectedRows) => this.getDefinitionActions(selectedRows)));
    }
    ngOnInit() {
        if (this.rxFeatureService.isFeatureEnabled('DRD21-11025')) {
            this.editRouterLink = `/${RX_APPLICATION.innovationStudioBundleId}/process/edit2/`;
        }
        this.areNewDefinitionsAllowed = this.rxOverlayService.areNewDefinitionsAllowedSync(this.bundleDescriptor);
        this.gridColumns = [
            AX_BUNDLE_DETAILS.definitionGridColumns.name,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy,
            AX_BUNDLE_DETAILS.definitionGridColumns.scope,
            AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective,
            AX_BUNDLE_DETAILS.definitionGridColumns.isEnabled
        ];
        const fieldDefinitions = [
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.scope.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.isEnabled.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.boolean
            }
        ];
        const fieldDefinitionsById = fieldDefinitions.reduce((result, fieldDefinition) => {
            result[fieldDefinition.id] = fieldDefinition;
            return result;
        }, {});
        this.recordDefinition = {
            fieldDefinitions,
            fieldDefinitionsById
        };
    }
    onCustomAction({ actionId, selectedRows }) {
        if (actionId === AX_PROCESS_DEFINITION_TAB.manageProcesses) {
            const route = [RX_APPLICATION.innovationStudioBundleId, 'process', 'manage', this.rxBundleCacheService.bundleId];
            if (selectedRows.length > 0) {
                this.router.navigate(route, { queryParams: { definitionName: selectedRows[0].name } });
            }
            else {
                this.router.navigate(route);
            }
        }
    }
    onCopyDefinition(row) {
        this.rxCopyDefinitionService
            .openCopyDefinitionComponentModal(row, CopyDefinitionType.Process, this.rxFeatureService.isFeatureEnabled('DRD21-11025') ? 'edit2' : 'edit')
            .catch(noop);
    }
    onDeleteDefinition(selectedRows) {
        const definitionNames = selectedRows.map((definition) => definition.name);
        from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.definitionTabComponent.getDeleteSelectedDefinitionMessage()
        }))
            .pipe(tap((result) => {
            this.isActionInProgress = result;
        }), switchMap((response) => response
            ? this.rxCommandFactoryService
                .forResourceType('com.bmc.arsys.rx.application.process.command.DeleteProcessDefinitionsCommand')
                .execute({
                definitionNames
            })
                .pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    onAddDefinition() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            'process',
            this.rxFeatureService.isFeatureEnabled('DRD21-11025') ? 'new2' : 'new',
            this.rxBundleCacheService.bundleId
        ]);
    }
    onRevertCustomization(selectedRows) {
        from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.revert-customization.confirmation.message')
        }))
            .pipe(tap(() => {
            this.isActionInProgress = true;
        }), switchMap((response) => response
            ? forkJoin(selectedRows.map((definition) => this.rxCommandFactoryService
                .forResourceType('com.bmc.arsys.rx.application.process.command.RevertProcessDefinitionCommand')
                .execute({
                processDefinitionName: definition.name
            }))).pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    onRowSelectionChanged(selectedRows) {
        this.rowSelectionChanged$.next(selectedRows);
    }
    onRenameDefinition({ selectedRow, definitionNames }) {
        const definitionType = this.translateService.instant('com.bmc.arsys.rx.client.definition-type.process.label');
        from(this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.title', {
                definitionType: definitionType.toLowerCase()
            }),
            size: 'sm',
            content: RenameDefinitionModalComponent,
            data: {
                definitionName: selectedRow.name,
                infoText: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.info.message'),
                fieldLabel: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.definition-name.label', { definitionType }),
                validationErrorText: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.name-validation.message', { definitionType }),
                definitionType,
                definitionNames
            }
        })
            .catch(noop))
            .pipe(filter(Boolean), tap(() => {
            this.isActionInProgress = true;
        }), switchMap((newViewDefinitionName) => this.rxCommandFactoryService
            .forResourceType('com.bmc.arsys.rx.application.process.command.RenameProcessDefinitionCommand')
            .execute({
            name: selectedRow.name,
            newName: newViewDefinitionName
        })), finalize(() => {
            this.isActionInProgress = false;
        }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            .subscribe();
    }
    getDefinitionActions(selectedRows) {
        const isBundleEditable = this.rxOverlayService.isBundleEditable(this.rxBundleCacheService.bundleId);
        const definitionActions = [
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.new,
                isDisabled: !this.areNewDefinitionsAllowed
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.rename,
                isDisabled: !isBundleEditable ||
                    !(selectedRows.length === 1 &&
                        this.rxOverlayService.isCustomizationEnabled('allowOverlay', selectedRows[0]))
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.revertCustomization,
                isDisabled: !isBundleEditable ||
                    selectedRows.length === 0 ||
                    some(selectedRows, (selectedRow) => selectedRow.customizationPerspective !== RX_OVERLAY.customizationPerspective.customizedInThisOverlayGroup)
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.copy,
                isDisabled: !isBundleEditable || selectedRows.length !== 1
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.delete,
                isDisabled: !isBundleEditable ||
                    selectedRows.length === 0 ||
                    some(selectedRows, (selectedRow) => selectedRow.customizationPerspective !== RX_OVERLAY.customizationPerspective.createdInThisOverlayGroup)
            },
            {
                id: AX_PROCESS_DEFINITION_TAB.manageProcesses,
                isDisabled: !isBundleEditable || selectedRows.length > 1,
                labelKey: 'com.bmc.arsys.rx.innovation-studio.manage-processes.menu.label',
                rxId: 'manage-processes-button',
                icon: 'flow'
            }
        ];
        return definitionActions;
    }
}
/** @nocollapse */ ProcessDefinitionTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDefinitionTabComponent, deps: [{ token: i1.AdaptModalService }, { token: i1$1.Router }, { token: i2.RxOverlayService }, { token: i2.RxBundleCacheService }, { token: i2.RxCommandFactoryService }, { token: i6.RxProcessDefinitionDataPageService }, { token: i3$1.RxModalService }, { token: i3.TranslateService }, { token: RxCopyDefinitionService }, { token: i2.RxFeatureService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ ProcessDefinitionTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ProcessDefinitionTabComponent, selector: "ax-process-definition-tab", inputs: { bundleDescriptor: "bundleDescriptor" }, viewQueries: [{ propertyName: "definitionTabComponent", first: true, predicate: DefinitionTabComponent, descendants: true, static: true }], ngImport: i0, template: "<ax-definition-tab\n  [definitionActions]=\"definitionActions$ | async\"\n  [gridColumns]=\"gridColumns\"\n  [recordDefinition]=\"recordDefinition\"\n  [definitions$]=\"definitions$\"\n  [isActionInProgress]=\"isActionInProgress\"\n  [definitionType]=\"'process'\"\n  (rowSelectionChanged)=\"onRowSelectionChanged($event)\"\n  (deleteDefinition)=\"onDeleteDefinition($event)\"\n  (customAction)=\"onCustomAction($event)\"\n  (copyDefinition)=\"onCopyDefinition($event)\"\n  (addDefinition)=\"onAddDefinition()\"\n  (renameDefinition)=\"onRenameDefinition($event)\"\n  (revertCustomization)=\"onRevertCustomization($event)\"\n  [editRouterLink]=\"editRouterLink\"\n></ax-definition-tab>\n", components: [{ type: DefinitionTabComponent, selector: "ax-definition-tab", inputs: ["isActionInProgress", "definitionType", "definitionActions", "gridColumns", "definitions$", "recordDefinition", "editRouterLink"], outputs: ["customAction", "deleteDefinition", "renameDefinition", "revertCustomization", "copyDefinition", "addDefinition", "rowSelectionChanged"] }], pipes: { "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDefinitionTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-process-definition-tab',
                    templateUrl: './process-definition-tab.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.AdaptModalService }, { type: i1$1.Router }, { type: i2.RxOverlayService }, { type: i2.RxBundleCacheService }, { type: i2.RxCommandFactoryService }, { type: i6.RxProcessDefinitionDataPageService }, { type: i3$1.RxModalService }, { type: i3.TranslateService }, { type: RxCopyDefinitionService }, { type: i2.RxFeatureService }]; }, propDecorators: { bundleDescriptor: [{
                type: Input
            }], definitionTabComponent: [{
                type: ViewChild,
                args: [DefinitionTabComponent, { static: true }]
            }] } });

const AX_RULE_DEFINITION_TAB = {
    definitionGridColumns: {
        primaryRecordDefinition: {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.rules.grid.primary-record-definition.label',
            fieldId: 'primaryRecordDefinition'
        },
        triggerEvent: {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.rules.grid.trigger-event.label',
            fieldId: 'triggerEvent'
        },
        executionOrder: {
            titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.rules.grid.execution-order.label',
            fieldId: 'executionOrder'
        },
        recordDefinitionNames: {
            fieldId: 'recordDefinitionNames'
        }
    },
    deleteRuleResource: 'com.bmc.arsys.rx.application.rule.command.DeleteRuleDefinitionsCommand'
};

class RuleDefinitionTabComponent {
    constructor(router, rxRuleTriggerEventPipe, rxRuleDefinitionService, rxOverlayService, rxRuleDefinitionDataPageService, rxModalService, translateService, rxCommandFactoryService, rxBundleCacheService, rxGlobalCacheService, rxCopyDefinitionService, rxDefinitionNameService) {
        this.router = router;
        this.rxRuleTriggerEventPipe = rxRuleTriggerEventPipe;
        this.rxRuleDefinitionService = rxRuleDefinitionService;
        this.rxOverlayService = rxOverlayService;
        this.rxRuleDefinitionDataPageService = rxRuleDefinitionDataPageService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxCopyDefinitionService = rxCopyDefinitionService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rowSelectionChanged$ = new BehaviorSubject([]);
        this.definitionActions$ = this.rowSelectionChanged$.pipe(map((selectedRows) => this.getDefinitionActions(selectedRows)));
        this.definitions$ = forkJoin([
            this.rxBundleCacheService.bundleId$.pipe(take(1), switchMap((bundleId) => this.rxGlobalCacheService.getBundleDescriptor(bundleId))),
            this.rxRuleDefinitionDataPageService.get({
                params: {
                    propertySelection: [
                        AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                        AX_RULE_DEFINITION_TAB.definitionGridColumns.recordDefinitionNames.fieldId,
                        AX_RULE_DEFINITION_TAB.definitionGridColumns.triggerEvent.fieldId,
                        AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime.fieldId,
                        AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy.fieldId,
                        AX_BUNDLE_DETAILS.definitionGridColumns.isEnabled.fieldId,
                        AX_BUNDLE_DETAILS.definitionGridColumns.scope.fieldId,
                        AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective.fieldId,
                        'overlayGroupId'
                    ]
                }
            })
        ]).pipe(map(([bundleDescriptor, dataPage]) => {
            dataPage.data = map$1(dataPage.data, (definition) => {
                if (definition.scope === RX_BUNDLE.definitionScopeTypes.bundle) {
                    definition.scope = bundleDescriptor.isApplication
                        ? RX_BUNDLE.definitionScopeNames.application
                        : RX_BUNDLE.definitionScopeNames.library;
                }
                else {
                    definition.scope = RX_BUNDLE.definitionScopeNames.public;
                }
                return assign(definition, {
                    primaryRecordDefinition: this.rxDefinitionNameService.getDisplayName(definition.recordDefinitionNames[0]) ||
                        this.translateService.instant('com.bmc.arsys.rx.client.common.not-applicable.label'),
                    executionOrder: definition.triggerEvent.executionOrder,
                    triggerEvent: this.rxRuleTriggerEventPipe.transform(definition.triggerEvent)
                });
            });
            return dataPage;
        }));
        this.gridColumns = [];
        this.isActionInProgress = false;
    }
    getDefinitionActions(selectedRows) {
        const isBundleEditable = this.rxOverlayService.isBundleEditable(this.rxBundleCacheService.bundleId);
        return [
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.new,
                isDisabled: !this.areNewDefinitionsAllowed
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.rename,
                isDisabled: !isBundleEditable ||
                    !(selectedRows.length === 1 &&
                        this.rxOverlayService.isCustomizationEnabled('allowOverlay', selectedRows[0]))
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.revertCustomization,
                isDisabled: !isBundleEditable ||
                    selectedRows.length === 0 ||
                    some(selectedRows, (selectedRow) => selectedRow.customizationPerspective !== RX_OVERLAY.customizationPerspective.customizedInThisOverlayGroup)
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.copy,
                isDisabled: !this.areNewDefinitionsAllowed || selectedRows.length !== 1
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.delete,
                isDisabled: !isBundleEditable ||
                    selectedRows.length === 0 ||
                    some(selectedRows, (selectedRow) => selectedRow.customizationPerspective !== RX_OVERLAY.customizationPerspective.createdInThisOverlayGroup)
            }
        ];
    }
    ngOnInit() {
        this.areNewDefinitionsAllowed = this.rxOverlayService.areNewDefinitionsAllowedSync(this.bundleDescriptor);
        this.gridColumns = [
            AX_BUNDLE_DETAILS.definitionGridColumns.name,
            {
                title: AX_RULE_DEFINITION_TAB.definitionGridColumns.primaryRecordDefinition.titleKey,
                fieldId: AX_RULE_DEFINITION_TAB.definitionGridColumns.primaryRecordDefinition.fieldId
            },
            {
                title: AX_RULE_DEFINITION_TAB.definitionGridColumns.triggerEvent.titleKey,
                fieldId: AX_RULE_DEFINITION_TAB.definitionGridColumns.triggerEvent.fieldId
            },
            {
                title: AX_RULE_DEFINITION_TAB.definitionGridColumns.executionOrder.titleKey,
                fieldId: AX_RULE_DEFINITION_TAB.definitionGridColumns.executionOrder.fieldId
            },
            AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy,
            AX_BUNDLE_DETAILS.definitionGridColumns.isEnabled,
            AX_BUNDLE_DETAILS.definitionGridColumns.scope,
            AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective
        ];
        const fieldDefinitions = [
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_RULE_DEFINITION_TAB.definitionGridColumns.primaryRecordDefinition.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_RULE_DEFINITION_TAB.definitionGridColumns.executionOrder.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_RULE_DEFINITION_TAB.definitionGridColumns.triggerEvent.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.isEnabled.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.boolean
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.scope.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            }
        ];
        const fieldDefinitionsById = fieldDefinitions.reduce((result, fieldDefinition) => {
            result[fieldDefinition.id] = fieldDefinition;
            return result;
        }, {});
        this.recordDefinition = {
            fieldDefinitions,
            fieldDefinitionsById
        };
    }
    onRenameDefinition({ selectedRow, definitionNames }) {
        const definitionType = this.translateService.instant('com.bmc.arsys.rx.client.definition-type.rule.label');
        from(this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.title', {
                definitionType: definitionType.toLowerCase()
            }),
            size: 'sm',
            content: RenameDefinitionModalComponent,
            data: {
                definitionName: selectedRow.name,
                infoText: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.info.message'),
                fieldLabel: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.definition-name.label', { definitionType }),
                validationErrorText: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.name-validation.message', { definitionType }),
                definitionType,
                definitionNames
            }
        })
            .catch(noop))
            .pipe(filter(Boolean), tap(() => {
            this.isActionInProgress = true;
        }), switchMap((newRuleDefinitionName) => this.rxRuleDefinitionService.rename(selectedRow.name, newRuleDefinitionName)), finalize(() => {
            this.isActionInProgress = false;
        }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            .subscribe();
    }
    onCopyDefinition(row) {
        this.rxCopyDefinitionService.openCopyDefinitionComponentModal(row, CopyDefinitionType.Rule).catch(noop);
    }
    onDeleteDefinition(selectedRows) {
        const definitionNames = selectedRows.map((definition) => definition.name);
        from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.definitionTabComponent.getDeleteSelectedDefinitionMessage()
        }))
            .pipe(tap((result) => {
            this.isActionInProgress = result;
        }), switchMap((response) => response
            ? this.rxCommandFactoryService
                .forResourceType(AX_RULE_DEFINITION_TAB.deleteRuleResource)
                .execute({
                definitionNames
            })
                .pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    onRevertCustomization(selectedRows) {
        from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.revert-customization.confirmation.message')
        }))
            .pipe(tap(() => {
            this.isActionInProgress = true;
        }), switchMap((response) => response
            ? forkJoin(selectedRows.map((definition) => this.rxRuleDefinitionService.revertCustomization(definition.name))).pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    onAddDefinition() {
        this.router.navigate([RX_APPLICATION.innovationStudioBundleId, 'rule', 'new', this.rxBundleCacheService.bundleId]);
    }
    onRowSelectionChanged(selectedRows) {
        this.rowSelectionChanged$.next(selectedRows);
    }
}
/** @nocollapse */ RuleDefinitionTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuleDefinitionTabComponent, deps: [{ token: i1$1.Router }, { token: i2$4.RxRuleTriggerEventPipe }, { token: i2$4.RxRuleDefinitionService }, { token: i2.RxOverlayService }, { token: i2$4.RxRuleDefinitionDataPageService }, { token: i3$1.RxModalService }, { token: i3.TranslateService }, { token: i2.RxCommandFactoryService }, { token: i2.RxBundleCacheService }, { token: i2.RxGlobalCacheService }, { token: RxCopyDefinitionService }, { token: i2.RxDefinitionNameService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ RuleDefinitionTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuleDefinitionTabComponent, selector: "ax-rule-definition-tab", inputs: { bundleDescriptor: "bundleDescriptor" }, providers: [RxRuleTriggerEventPipe], viewQueries: [{ propertyName: "definitionTabComponent", first: true, predicate: DefinitionTabComponent, descendants: true, static: true }, { propertyName: "definitionNameCellTemplate", first: true, predicate: ["definitionNameCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<ax-definition-tab\n  [definitionActions]=\"definitionActions$ | async\"\n  [gridColumns]=\"gridColumns\"\n  [recordDefinition]=\"recordDefinition\"\n  [definitions$]=\"definitions$\"\n  [isActionInProgress]=\"isActionInProgress\"\n  [definitionType]=\"'rule'\"\n  (addDefinition)=\"onAddDefinition()\"\n  (rowSelectionChanged)=\"onRowSelectionChanged($event)\"\n  (renameDefinition)=\"onRenameDefinition($event)\"\n  (copyDefinition)=\"onCopyDefinition($event)\"\n  (deleteDefinition)=\"onDeleteDefinition($event)\"\n  (revertCustomization)=\"onRevertCustomization($event)\"\n></ax-definition-tab>\n", components: [{ type: DefinitionTabComponent, selector: "ax-definition-tab", inputs: ["isActionInProgress", "definitionType", "definitionActions", "gridColumns", "definitions$", "recordDefinition", "editRouterLink"], outputs: ["customAction", "deleteDefinition", "renameDefinition", "revertCustomization", "copyDefinition", "addDefinition", "rowSelectionChanged"] }], pipes: { "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuleDefinitionTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-rule-definition-tab',
                    templateUrl: './rule-definition-tab.component.html',
                    providers: [RxRuleTriggerEventPipe]
                }]
        }], ctorParameters: function () { return [{ type: i1$1.Router }, { type: i2$4.RxRuleTriggerEventPipe }, { type: i2$4.RxRuleDefinitionService }, { type: i2.RxOverlayService }, { type: i2$4.RxRuleDefinitionDataPageService }, { type: i3$1.RxModalService }, { type: i3.TranslateService }, { type: i2.RxCommandFactoryService }, { type: i2.RxBundleCacheService }, { type: i2.RxGlobalCacheService }, { type: RxCopyDefinitionService }, { type: i2.RxDefinitionNameService }]; }, propDecorators: { bundleDescriptor: [{
                type: Input
            }], definitionTabComponent: [{
                type: ViewChild,
                args: [DefinitionTabComponent, { static: true }]
            }], definitionNameCellTemplate: [{
                type: ViewChild,
                args: ['definitionNameCellTemplate', { static: true }]
            }] } });

const AX_ASSOCIATION_DEFINITION_TAB = {
    definitionGridColumns: {
        firstRecord: {
            titleKey: 'com.bmc.arsys.rx.client.association.grid.first-record.title',
            fieldId: 'firstRecord'
        },
        cardinalityString: {
            titleKey: 'com.bmc.arsys.rx.client.association.grid.cardinality.title',
            fieldId: 'cardinalityString'
        },
        secondRecord: {
            titleKey: 'com.bmc.arsys.rx.client.association.grid.second-record.title',
            fieldId: 'secondRecord'
        },
        shouldCascadeDeleteString: {
            titleKey: 'com.bmc.arsys.rx.client.association.grid.constraints.title',
            fieldId: 'shouldCascadeDeleteString'
        }
    }
};

class AssociationDefinitionTabComponent {
    constructor(rxAssociationDefinitionDataPageService, rxAssociationDefinitionService, rxOverlayService, rxModalService, translateService, rxCommandFactoryService, rxBundleCacheService, rxFeatureService, router, rxDefinitionNameService, rxAssociationConstraintsPipe, rxAssociationCardinalityPipe) {
        this.rxAssociationDefinitionDataPageService = rxAssociationDefinitionDataPageService;
        this.rxAssociationDefinitionService = rxAssociationDefinitionService;
        this.rxOverlayService = rxOverlayService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxFeatureService = rxFeatureService;
        this.router = router;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxAssociationConstraintsPipe = rxAssociationConstraintsPipe;
        this.rxAssociationCardinalityPipe = rxAssociationCardinalityPipe;
        this.rowSelectionChanged$ = new BehaviorSubject([]);
        this.definitionActions$ = this.rowSelectionChanged$.pipe(map((selectedRows) => this.getDefinitionActions(selectedRows)));
        this.gridColumns = [];
        this.isActionInProgress = false;
    }
    ngOnInit() {
        if (this.rxFeatureService.isFeatureEnabled('DRD21-14986')) {
            this.editRouterLink = `/${RX_APPLICATION.innovationStudioBundleId}/association/edit2/`;
        }
        this.gridColumns = [
            AX_BUNDLE_DETAILS.definitionGridColumns.name,
            {
                title: AX_ASSOCIATION_DEFINITION_TAB.definitionGridColumns.firstRecord.titleKey,
                fieldId: AX_ASSOCIATION_DEFINITION_TAB.definitionGridColumns.firstRecord.fieldId
            },
            {
                title: AX_ASSOCIATION_DEFINITION_TAB.definitionGridColumns.cardinalityString.titleKey,
                fieldId: AX_ASSOCIATION_DEFINITION_TAB.definitionGridColumns.cardinalityString.fieldId
            },
            {
                title: AX_ASSOCIATION_DEFINITION_TAB.definitionGridColumns.secondRecord.titleKey,
                fieldId: AX_ASSOCIATION_DEFINITION_TAB.definitionGridColumns.secondRecord.fieldId
            },
            AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy,
            {
                title: AX_ASSOCIATION_DEFINITION_TAB.definitionGridColumns.shouldCascadeDeleteString.titleKey,
                fieldId: AX_ASSOCIATION_DEFINITION_TAB.definitionGridColumns.shouldCascadeDeleteString.fieldId
            },
            AX_BUNDLE_DETAILS.definitionGridColumns.isEnabled,
            AX_BUNDLE_DETAILS.definitionGridColumns.scope,
            AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective
        ];
        const fieldDefinitions = [
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_ASSOCIATION_DEFINITION_TAB.definitionGridColumns.firstRecord.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_ASSOCIATION_DEFINITION_TAB.definitionGridColumns.cardinalityString.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_ASSOCIATION_DEFINITION_TAB.definitionGridColumns.secondRecord.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_ASSOCIATION_DEFINITION_TAB.definitionGridColumns.shouldCascadeDeleteString.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.isEnabled.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.boolean
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.scope.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            }
        ];
        this.cardinalityStrings = {
            ONE_TO_ONE: this.rxAssociationCardinalityPipe.transform(RX_ASSOCIATION_DEFINITION.cardinality.oneToOne.value),
            ONE_TO_MANY: this.rxAssociationCardinalityPipe.transform(RX_ASSOCIATION_DEFINITION.cardinality.oneToMany.value),
            MANY_TO_MANY: this.rxAssociationCardinalityPipe.transform(RX_ASSOCIATION_DEFINITION.cardinality.manyToMany.value)
        };
        this.shouldCascadeDeleteStrings = {
            true: this.rxAssociationConstraintsPipe.transform(true),
            false: this.rxAssociationConstraintsPipe.transform(false)
        };
        const fieldDefinitionsById = fieldDefinitions.reduce((result, fieldDefinition) => {
            result[fieldDefinition.id] = fieldDefinition;
            return result;
        }, {});
        this.recordDefinition = {
            fieldDefinitions,
            fieldDefinitionsById
        };
        this.definitions$ = this.rxAssociationDefinitionDataPageService
            .get({
            params: {
                propertySelection: [
                    'name',
                    'nodeAId',
                    'cardinality',
                    'nodeBId',
                    'shouldCascadeDelete',
                    'lastUpdateTime',
                    'lastChangedBy',
                    'customizationPerspective',
                    'isEnabled',
                    'scope',
                    'overlayGroupId',
                    'overlayDescriptor'
                ]
            }
        })
            .pipe(map((dataPage) => ({
            totalSize: dataPage.totalSize,
            data: dataPage.data.map((association) => (Object.assign(Object.assign({}, association), { firstRecord: this.rxDefinitionNameService.getDisplayName(association.nodeAId), secondRecord: this.rxDefinitionNameService.getDisplayName(association.nodeBId), cardinalityString: this.cardinalityStrings[association.cardinality], shouldCascadeDeleteString: this.shouldCascadeDeleteStrings[String(association.shouldCascadeDelete)] })))
        })));
    }
    getDefinitionActions(selectedRows) {
        const isBundleEditable = this.rxOverlayService.isBundleEditable(this.rxBundleCacheService.bundleId);
        return [
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.new,
                isDisabled: !this.rxOverlayService.areNewDefinitionsAllowedSync(this.bundleDescriptor)
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.rename,
                isDisabled: !isBundleEditable ||
                    !(selectedRows.length === 1 &&
                        this.rxOverlayService.isCustomizationEnabled('allowOverlay', selectedRows[0]))
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.revertCustomization,
                isDisabled: !isBundleEditable ||
                    selectedRows.length === 0 ||
                    some(selectedRows, (selectedRow) => selectedRow.customizationPerspective !== RX_OVERLAY.customizationPerspective.customizedInThisOverlayGroup)
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.delete,
                isDisabled: !isBundleEditable ||
                    selectedRows.length === 0 ||
                    some(selectedRows, (selectedRow) => selectedRow.customizationPerspective !== RX_OVERLAY.customizationPerspective.createdInThisOverlayGroup)
            }
        ];
    }
    onAddDefinition() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            'association',
            this.rxFeatureService.isFeatureEnabled('DRD21-14986') ? 'new2' : 'new',
            this.rxBundleCacheService.bundleId
        ]);
    }
    onRenameDefinition({ selectedRow, definitionNames }) {
        const definitionType = this.translateService.instant('com.bmc.arsys.rx.client.definition-type.association.label');
        from(this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.title', {
                definitionType: definitionType.toLowerCase()
            }),
            size: 'sm',
            content: RenameDefinitionModalComponent,
            data: {
                definitionName: selectedRow.name,
                infoText: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.info.message'),
                fieldLabel: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.definition-name.label', { definitionType }),
                validationErrorText: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.name-validation.message', { definitionType }),
                definitionType,
                definitionNames
            }
        })
            .catch(noop))
            .pipe(filter(Boolean), tap(() => {
            this.isActionInProgress = true;
        }), switchMap((newViewDefinitionName) => this.rxAssociationDefinitionService.rename(selectedRow.name, newViewDefinitionName)), finalize(() => {
            this.isActionInProgress = false;
        }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            .subscribe();
    }
    onRowSelectionChanged(selectedRows) {
        this.rowSelectionChanged$.next(selectedRows);
    }
    onDeleteDefinition(selectedRows) {
        const definitionNames = selectedRows.map((definition) => definition.name);
        from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.definitionTabComponent.getDeleteSelectedDefinitionMessage()
        }))
            .pipe(tap((result) => {
            this.isActionInProgress = result;
        }), switchMap((response) => response
            ? this.rxCommandFactoryService
                .forResourceType('com.bmc.arsys.rx.application.association.command.DeleteAssociationDefinitionsCommand')
                .execute({
                definitionNames
            })
                .pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    onRevertCustomization(selectedRows) {
        from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.revert-customization.confirmation.message')
        }))
            .pipe(tap(() => {
            this.isActionInProgress = true;
        }), switchMap((response) => response
            ? forkJoin(selectedRows.map((definition) => this.rxAssociationDefinitionService.revertCustomization(definition.name))).pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
}
/** @nocollapse */ AssociationDefinitionTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDefinitionTabComponent, deps: [{ token: i1$6.RxAssociationDefinitionDataPageService }, { token: i1$6.RxAssociationDefinitionService }, { token: i2.RxOverlayService }, { token: i3$1.RxModalService }, { token: i3.TranslateService }, { token: i2.RxCommandFactoryService }, { token: i2.RxBundleCacheService }, { token: i2.RxFeatureService }, { token: i1$1.Router }, { token: i2.RxDefinitionNameService }, { token: i1$6.RxAssociationConstraintsPipe }, { token: i1$6.RxAssociationCardinalityPipe }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ AssociationDefinitionTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AssociationDefinitionTabComponent, selector: "ax-association-definition-tab", inputs: { bundleDescriptor: "bundleDescriptor" }, providers: [RxAssociationCardinalityPipe, RxAssociationConstraintsPipe], viewQueries: [{ propertyName: "definitionTabComponent", first: true, predicate: DefinitionTabComponent, descendants: true, static: true }], ngImport: i0, template: "<ax-definition-tab\n  [definitionActions]=\"definitionActions$ | async\"\n  [gridColumns]=\"gridColumns\"\n  [recordDefinition]=\"recordDefinition\"\n  [definitions$]=\"definitions$\"\n  [isActionInProgress]=\"isActionInProgress\"\n  [definitionType]=\"'association'\"\n  [editRouterLink]=\"editRouterLink\"\n  (addDefinition)=\"onAddDefinition()\"\n  (renameDefinition)=\"onRenameDefinition($event)\"\n  (deleteDefinition)=\"onDeleteDefinition($event)\"\n  (revertCustomization)=\"onRevertCustomization($event)\"\n  (rowSelectionChanged)=\"onRowSelectionChanged($event)\"\n></ax-definition-tab>\n", components: [{ type: DefinitionTabComponent, selector: "ax-definition-tab", inputs: ["isActionInProgress", "definitionType", "definitionActions", "gridColumns", "definitions$", "recordDefinition", "editRouterLink"], outputs: ["customAction", "deleteDefinition", "renameDefinition", "revertCustomization", "copyDefinition", "addDefinition", "rowSelectionChanged"] }], pipes: { "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDefinitionTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-association-definition-tab',
                    templateUrl: './association-definition-tab.component.html',
                    providers: [RxAssociationCardinalityPipe, RxAssociationConstraintsPipe]
                }]
        }], ctorParameters: function () { return [{ type: i1$6.RxAssociationDefinitionDataPageService }, { type: i1$6.RxAssociationDefinitionService }, { type: i2.RxOverlayService }, { type: i3$1.RxModalService }, { type: i3.TranslateService }, { type: i2.RxCommandFactoryService }, { type: i2.RxBundleCacheService }, { type: i2.RxFeatureService }, { type: i1$1.Router }, { type: i2.RxDefinitionNameService }, { type: i1$6.RxAssociationConstraintsPipe }, { type: i1$6.RxAssociationCardinalityPipe }]; }, propDecorators: { bundleDescriptor: [{
                type: Input
            }], definitionTabComponent: [{
                type: ViewChild,
                args: [DefinitionTabComponent, { static: true }]
            }] } });

const AX_NAMED_LIST_DEFINITION_TAB = {
    definitionGridColumns: {
        recordDefinitionName: {
            title: 'com.bmc.arsys.rx.innovation-studio.tabs.named-lists.column.record-definition-name.label',
            fieldId: 'recordDefinitionName'
        }
    }
};

class NamedListDefinitionTabComponent {
    constructor(rxNamedListDefinitionDataPageService, rxOverlayService, rxBundleCacheService, translateService, rxModalService, rxCommandFactoryService, rxNamedListDefinitionService, router, rxCopyDefinitionService, rxDefinitionNameService) {
        this.rxNamedListDefinitionDataPageService = rxNamedListDefinitionDataPageService;
        this.rxOverlayService = rxOverlayService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.translateService = translateService;
        this.rxModalService = rxModalService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxNamedListDefinitionService = rxNamedListDefinitionService;
        this.router = router;
        this.rxCopyDefinitionService = rxCopyDefinitionService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rowSelectionChanged$ = new BehaviorSubject([]);
        this.isActionInProgress = false;
        this.definitions$ = this.rxNamedListDefinitionDataPageService
            .get({
            params: {
                propertySelection: [
                    'name',
                    'recordDefinitionName',
                    'lastUpdateTime',
                    'lastChangedBy',
                    'customizationPerspective',
                    'scope',
                    'overlayGroupId',
                    'overlayDescriptor'
                ]
            }
        })
            .pipe(tap((dataPage) => {
            dataPage.data.forEach((namedList) => {
                namedList.recordDefinitionName = this.rxDefinitionNameService.getDisplayName(namedList.recordDefinitionName);
            });
        }));
        this.definitionActions$ = this.rowSelectionChanged$.pipe(map((selectedRows) => this.getDefinitionActions(selectedRows)));
    }
    ngOnInit() {
        this.gridColumns = [
            AX_BUNDLE_DETAILS.definitionGridColumns.name,
            {
                title: AX_NAMED_LIST_DEFINITION_TAB.definitionGridColumns.recordDefinitionName.title,
                fieldId: AX_NAMED_LIST_DEFINITION_TAB.definitionGridColumns.recordDefinitionName.fieldId
            },
            AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy,
            AX_BUNDLE_DETAILS.definitionGridColumns.scope,
            AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective
        ];
        const fieldDefinitions = [
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_NAMED_LIST_DEFINITION_TAB.definitionGridColumns.recordDefinitionName.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.scope.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            }
        ];
        const fieldDefinitionsById = fieldDefinitions.reduce((result, fieldDefinition) => {
            result[fieldDefinition.id] = fieldDefinition;
            return result;
        }, {});
        this.recordDefinition = {
            fieldDefinitions,
            fieldDefinitionsById
        };
    }
    onAddDefinition() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            'named-list',
            'new',
            this.rxBundleCacheService.bundleId
        ]);
    }
    onRenameDefinition({ selectedRow, definitionNames }) {
        const definitionType = this.translateService.instant('com.bmc.arsys.rx.client.definition-type.named-list.label');
        from(this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.title', {
                definitionType: definitionType.toLowerCase()
            }),
            size: 'sm',
            content: RenameDefinitionModalComponent,
            data: {
                definitionName: selectedRow.name,
                infoText: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.info.message'),
                fieldLabel: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.definition-name.label', { definitionType }),
                validationErrorText: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.name-validation.message', { definitionType }),
                definitionType,
                definitionNames
            }
        })
            .catch(noop))
            .pipe(filter(Boolean), tap(() => {
            this.isActionInProgress = true;
        }), switchMap((newViewDefinitionName) => this.rxNamedListDefinitionService.rename(selectedRow.name, newViewDefinitionName)), finalize(() => {
            this.isActionInProgress = false;
        }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            .subscribe();
    }
    onDeleteDefinition(selectedRows) {
        const definitionNames = selectedRows.map((definition) => definition.name);
        from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.definitionTabComponent.getDeleteSelectedDefinitionMessage()
        }))
            .pipe(tap((result) => {
            this.isActionInProgress = result;
        }), switchMap((response) => response
            ? this.rxNamedListDefinitionService.delete(definitionNames).pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    onRevertCustomization(selectedRows) {
        from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.revert-customization.confirmation.message')
        }))
            .pipe(tap(() => {
            this.isActionInProgress = true;
        }), switchMap((response) => response
            ? forkJoin(selectedRows.map((definition) => this.rxNamedListDefinitionService.revertCustomization(definition.name))).pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    getDefinitionActions(selectedRows) {
        const isBundleEditable = this.rxOverlayService.isBundleEditable(this.rxBundleCacheService.bundleId);
        return [
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.new,
                isDisabled: !this.rxOverlayService.areNewDefinitionsAllowedSync(this.bundleDescriptor)
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.rename,
                isDisabled: !isBundleEditable ||
                    !(selectedRows.length === 1 &&
                        this.rxOverlayService.isCustomizationEnabled('allowOverlay', selectedRows[0]))
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.revertCustomization,
                isDisabled: !isBundleEditable ||
                    selectedRows.length === 0 ||
                    some(selectedRows, (selectedRow) => selectedRow.customizationPerspective !== RX_OVERLAY.customizationPerspective.customizedInThisOverlayGroup)
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.copy,
                isDisabled: !isBundleEditable || selectedRows.length !== 1
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.delete,
                isDisabled: !isBundleEditable ||
                    selectedRows.length === 0 ||
                    some(selectedRows, (selectedRow) => selectedRow.customizationPerspective !== RX_OVERLAY.customizationPerspective.createdInThisOverlayGroup)
            }
        ];
    }
    onRowSelectionChanged(selectedRows) {
        this.rowSelectionChanged$.next(selectedRows);
    }
    onCopyDefinition(row) {
        this.rxCopyDefinitionService
            .openCopyDefinitionComponentModal(row, CopyDefinitionType.NamedList, 'edit')
            .catch(noop);
    }
}
/** @nocollapse */ NamedListDefinitionTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedListDefinitionTabComponent, deps: [{ token: i1$7.RxNamedListDefinitionDataPageService }, { token: i2.RxOverlayService }, { token: i2.RxBundleCacheService }, { token: i3.TranslateService }, { token: i3$1.RxModalService }, { token: i2.RxCommandFactoryService }, { token: i1$7.RxNamedListDefinitionService }, { token: i1$1.Router }, { token: RxCopyDefinitionService }, { token: i2.RxDefinitionNameService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ NamedListDefinitionTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: NamedListDefinitionTabComponent, selector: "ax-named-list-definition-tab", inputs: { bundleDescriptor: "bundleDescriptor" }, viewQueries: [{ propertyName: "definitionTabComponent", first: true, predicate: DefinitionTabComponent, descendants: true, static: true }], ngImport: i0, template: "<ax-definition-tab\n  [definitionActions]=\"definitionActions$ | async\"\n  [gridColumns]=\"gridColumns\"\n  [recordDefinition]=\"recordDefinition\"\n  [definitions$]=\"definitions$\"\n  [isActionInProgress]=\"isActionInProgress\"\n  [definitionType]=\"'named-list'\"\n  (addDefinition)=\"onAddDefinition()\"\n  (renameDefinition)=\"onRenameDefinition($event)\"\n  (copyDefinition)=\"onCopyDefinition($event)\"\n  (deleteDefinition)=\"onDeleteDefinition($event)\"\n  (revertCustomization)=\"onRevertCustomization($event)\"\n  (rowSelectionChanged)=\"onRowSelectionChanged($event)\"\n></ax-definition-tab>\n", components: [{ type: DefinitionTabComponent, selector: "ax-definition-tab", inputs: ["isActionInProgress", "definitionType", "definitionActions", "gridColumns", "definitions$", "recordDefinition", "editRouterLink"], outputs: ["customAction", "deleteDefinition", "renameDefinition", "revertCustomization", "copyDefinition", "addDefinition", "rowSelectionChanged"] }], pipes: { "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedListDefinitionTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-named-list-definition-tab',
                    templateUrl: './named-list-definition-tab.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1$7.RxNamedListDefinitionDataPageService }, { type: i2.RxOverlayService }, { type: i2.RxBundleCacheService }, { type: i3.TranslateService }, { type: i3$1.RxModalService }, { type: i2.RxCommandFactoryService }, { type: i1$7.RxNamedListDefinitionService }, { type: i1$1.Router }, { type: RxCopyDefinitionService }, { type: i2.RxDefinitionNameService }]; }, propDecorators: { bundleDescriptor: [{
                type: Input
            }], definitionTabComponent: [{
                type: ViewChild,
                args: [DefinitionTabComponent, { static: true }]
            }] } });

class DocumentDefinitionTabComponent {
    constructor(rxDocumentDefinitionDataPageService, rxDocumentDefinitionService, rxFeatureService, rxOverlayService, rxModalService, translateService, rxCommandFactoryService, rxBundleCacheService, router, rxCopyDefinitionService) {
        this.rxDocumentDefinitionDataPageService = rxDocumentDefinitionDataPageService;
        this.rxDocumentDefinitionService = rxDocumentDefinitionService;
        this.rxFeatureService = rxFeatureService;
        this.rxOverlayService = rxOverlayService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.router = router;
        this.rxCopyDefinitionService = rxCopyDefinitionService;
        this.rowSelectionChanged$ = new BehaviorSubject([]);
        this.definitionActions$ = this.rowSelectionChanged$.pipe(map((selectedRows) => this.getDefinitionActions(selectedRows)));
        this.gridColumns = [];
        this.isActionInProgress = false;
    }
    ngOnInit() {
        if (this.rxFeatureService.isFeatureEnabled('DRD21-14961')) {
            this.editRouterLink = `/${RX_APPLICATION.innovationStudioBundleId}/document/edit2/`;
        }
        this.gridColumns = [
            AX_BUNDLE_DETAILS.definitionGridColumns.name,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy,
            AX_BUNDLE_DETAILS.definitionGridColumns.scope,
            AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective
        ];
        const fieldDefinitions = [
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.scope.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            }
        ];
        const fieldDefinitionsById = fieldDefinitions.reduce((result, fieldDefinition) => {
            result[fieldDefinition.id] = fieldDefinition;
            return result;
        }, {});
        this.recordDefinition = {
            fieldDefinitions,
            fieldDefinitionsById
        };
        this.definitions$ = this.rxDocumentDefinitionDataPageService.get({
            params: {
                propertySelection: [
                    'name',
                    'lastUpdateTime',
                    'lastChangedBy',
                    'customizationPerspective',
                    'scope',
                    'overlayGroupId',
                    'overlayDescriptor'
                ]
            }
        });
    }
    getDefinitionActions(selectedRows) {
        const isBundleEditable = this.rxOverlayService.isBundleEditable(this.rxBundleCacheService.bundleId);
        return [
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.new,
                isDisabled: !this.rxOverlayService.areNewDefinitionsAllowedSync(this.bundleDescriptor)
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.rename,
                isDisabled: !isBundleEditable ||
                    !(selectedRows.length === 1 &&
                        this.rxOverlayService.isCustomizationEnabled('allowOverlay', selectedRows[0]))
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.revertCustomization,
                isDisabled: !isBundleEditable ||
                    selectedRows.length === 0 ||
                    some(selectedRows, (selectedRow) => selectedRow.customizationPerspective !== RX_OVERLAY.customizationPerspective.customizedInThisOverlayGroup)
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.copy,
                isDisabled: !isBundleEditable || selectedRows.length !== 1
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.delete,
                isDisabled: !isBundleEditable ||
                    selectedRows.length === 0 ||
                    some(selectedRows, (selectedRow) => selectedRow.customizationPerspective !== RX_OVERLAY.customizationPerspective.createdInThisOverlayGroup)
            }
        ];
    }
    onAddDefinition() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            'document',
            this.rxFeatureService.isFeatureEnabled('DRD21-14961') ? 'new2' : 'new',
            this.rxBundleCacheService.bundleId
        ]);
    }
    onRenameDefinition({ selectedRow, definitionNames }) {
        const definitionType = this.translateService.instant('com.bmc.arsys.rx.client.definition-type.document.label');
        from(this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.title', {
                definitionType: definitionType.toLowerCase()
            }),
            size: 'sm',
            content: RenameDefinitionModalComponent,
            data: {
                definitionName: selectedRow.name,
                infoText: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.info.message'),
                fieldLabel: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.definition-name.label', { definitionType }),
                validationErrorText: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.name-validation.message', { definitionType }),
                definitionType,
                definitionNames
            }
        })
            .catch(noop))
            .pipe(filter(Boolean), tap(() => {
            this.isActionInProgress = true;
        }), switchMap((newDocumentDefinitionName) => this.rxDocumentDefinitionService.rename(selectedRow.name, newDocumentDefinitionName)), finalize(() => {
            this.isActionInProgress = false;
        }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            .subscribe();
    }
    getEditDefinitionUrl() {
        return `${window.location.origin}/innovationstudio/index.html#/app/bundle/${this.rxBundleCacheService.bundleId}/document/`;
    }
    onRowSelectionChanged(selectedRows) {
        this.rowSelectionChanged$.next(selectedRows);
    }
    onDeleteDefinition(selectedRows) {
        const definitionNames = selectedRows.map((definition) => definition.name);
        from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.definitionTabComponent.getDeleteSelectedDefinitionMessage()
        }))
            .pipe(tap((result) => {
            this.isActionInProgress = result;
        }), switchMap((response) => response
            ? this.rxCommandFactoryService
                .forResourceType('com.bmc.arsys.rx.application.document.command.DeleteDocumentDefinitionsCommand')
                .execute({
                definitionNames
            })
                .pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    onRevertCustomization(selectedRows) {
        from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.revert-customization.confirmation.message')
        }))
            .pipe(tap(() => {
            this.isActionInProgress = true;
        }), switchMap((response) => response
            ? forkJoin(selectedRows.map((definition) => this.rxDocumentDefinitionService.revertCustomization(definition.name))).pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    onCopyDefinition(row) {
        this.rxCopyDefinitionService
            .openCopyDefinitionComponentModal(row, CopyDefinitionType.Document, this.rxFeatureService.isFeatureEnabled('DRD21-14961') ? 'edit2' : 'edit')
            .catch(noop);
    }
}
/** @nocollapse */ DocumentDefinitionTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDefinitionTabComponent, deps: [{ token: i1$3.RxDocumentDefinitionDataPageService }, { token: i1$3.RxDocumentDefinitionService }, { token: i2.RxFeatureService }, { token: i2.RxOverlayService }, { token: i3$1.RxModalService }, { token: i3.TranslateService }, { token: i2.RxCommandFactoryService }, { token: i2.RxBundleCacheService }, { token: i1$1.Router }, { token: RxCopyDefinitionService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ DocumentDefinitionTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DocumentDefinitionTabComponent, selector: "ax-document-definition-tab", inputs: { bundleDescriptor: "bundleDescriptor" }, viewQueries: [{ propertyName: "definitionTabComponent", first: true, predicate: DefinitionTabComponent, descendants: true, static: true }], ngImport: i0, template: "<ax-definition-tab\n  [definitionActions]=\"definitionActions$ | async\"\n  [gridColumns]=\"gridColumns\"\n  [recordDefinition]=\"recordDefinition\"\n  [definitions$]=\"definitions$\"\n  [isActionInProgress]=\"isActionInProgress\"\n  [definitionType]=\"'document'\"\n  [editRouterLink]=\"editRouterLink\"\n  (addDefinition)=\"onAddDefinition()\"\n  (renameDefinition)=\"onRenameDefinition($event)\"\n  (copyDefinition)=\"onCopyDefinition($event)\"\n  (deleteDefinition)=\"onDeleteDefinition($event)\"\n  (revertCustomization)=\"onRevertCustomization($event)\"\n  (rowSelectionChanged)=\"onRowSelectionChanged($event)\"\n></ax-definition-tab>\n", components: [{ type: DefinitionTabComponent, selector: "ax-definition-tab", inputs: ["isActionInProgress", "definitionType", "definitionActions", "gridColumns", "definitions$", "recordDefinition", "editRouterLink"], outputs: ["customAction", "deleteDefinition", "renameDefinition", "revertCustomization", "copyDefinition", "addDefinition", "rowSelectionChanged"] }], pipes: { "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDefinitionTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-document-definition-tab',
                    templateUrl: './document-definition-tab.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1$3.RxDocumentDefinitionDataPageService }, { type: i1$3.RxDocumentDefinitionService }, { type: i2.RxFeatureService }, { type: i2.RxOverlayService }, { type: i3$1.RxModalService }, { type: i3.TranslateService }, { type: i2.RxCommandFactoryService }, { type: i2.RxBundleCacheService }, { type: i1$1.Router }, { type: RxCopyDefinitionService }]; }, propDecorators: { bundleDescriptor: [{
                type: Input
            }], definitionTabComponent: [{
                type: ViewChild,
                args: [DefinitionTabComponent, { static: true }]
            }] } });

const AX_WEB_API_DEFINITION_TAB = {
    definitionGridColumns: {
        description: {
            title: 'com.bmc.arsys.rx.client.admin.chatbots.description.title',
            fieldId: 'description'
        }
    }
};

class WebApiDefinitionTabComponent {
    constructor(rxWebApiDefinitionDataPageService, rxWebApiDefinitionService, rxOverlayService, rxModalService, translateService, rxCommandFactoryService, rxBundleCacheService, router, rxCopyDefinitionService) {
        this.rxWebApiDefinitionDataPageService = rxWebApiDefinitionDataPageService;
        this.rxWebApiDefinitionService = rxWebApiDefinitionService;
        this.rxOverlayService = rxOverlayService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.router = router;
        this.rxCopyDefinitionService = rxCopyDefinitionService;
        this.rowSelectionChanged$ = new BehaviorSubject([]);
        this.definitionActions$ = this.rowSelectionChanged$.pipe(map((selectedRows) => this.getDefinitionActions(selectedRows)));
        this.gridColumns = [];
        this.isActionInProgress = false;
    }
    ngOnInit() {
        this.gridColumns = [
            AX_BUNDLE_DETAILS.definitionGridColumns.name,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy,
            AX_BUNDLE_DETAILS.definitionGridColumns.scope,
            AX_WEB_API_DEFINITION_TAB.definitionGridColumns.description
        ];
        const fieldDefinitions = [
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.scope.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_WEB_API_DEFINITION_TAB.definitionGridColumns.description.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            }
        ];
        const fieldDefinitionsById = fieldDefinitions.reduce((result, fieldDefinition) => {
            result[fieldDefinition.id] = fieldDefinition;
            return result;
        }, {});
        this.recordDefinition = {
            fieldDefinitions,
            fieldDefinitionsById
        };
        this.definitions$ = this.rxWebApiDefinitionDataPageService.get({
            params: {
                propertySelection: [
                    'name',
                    'lastUpdateTime',
                    'lastChangedBy',
                    'description',
                    'scope',
                    'customizationPerspective',
                    'overlayGroupId',
                    'overlayDescriptor'
                ]
            }
        });
    }
    getDefinitionActions(selectedRows) {
        const isBundleEditable = this.rxOverlayService.isBundleEditable(this.rxBundleCacheService.bundleId);
        return [
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.new,
                isDisabled: !this.rxOverlayService.areNewDefinitionsAllowedSync(this.bundleDescriptor)
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.rename,
                isDisabled: !isBundleEditable ||
                    !(selectedRows.length === 1 &&
                        this.rxOverlayService.isCustomizationEnabled('allowOverlay', selectedRows[0]))
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.copy,
                isDisabled: !isBundleEditable || selectedRows.length !== 1
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.delete,
                isDisabled: !isBundleEditable ||
                    selectedRows.length === 0 ||
                    some(selectedRows, (selectedRow) => selectedRow.customizationPerspective !== RX_OVERLAY.customizationPerspective.createdInThisOverlayGroup)
            }
        ];
    }
    onAddDefinition() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            'web-api',
            'new',
            this.rxBundleCacheService.bundleId
        ]);
    }
    onRenameDefinition({ selectedRow, definitionNames }) {
        const definitionType = this.translateService.instant('com.bmc.arsys.rx.client.definition-type.web-api.label');
        from(this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.title', {
                definitionType: lowerFirst(definitionType)
            }),
            size: 'sm',
            content: RenameDefinitionModalComponent,
            data: {
                definitionName: selectedRow.name,
                infoText: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.info.message'),
                fieldLabel: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.definition-name.label', { definitionType }),
                validationErrorText: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.name-validation.message', { definitionType }),
                definitionType,
                definitionNames
            }
        })
            .catch(noop))
            .pipe(filter(Boolean), tap(() => {
            this.isActionInProgress = true;
        }), switchMap((newWebApiDefinitionName) => this.rxWebApiDefinitionService.rename(selectedRow.name, newWebApiDefinitionName)), finalize(() => {
            this.isActionInProgress = false;
        }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            .subscribe();
    }
    onRowSelectionChanged(selectedRows) {
        this.rowSelectionChanged$.next(selectedRows);
    }
    onDeleteDefinition(selectedRows) {
        const definitionNames = selectedRows.map((definition) => definition.name);
        from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.definitionTabComponent.getDeleteSelectedDefinitionMessage()
        }))
            .pipe(tap((result) => {
            this.isActionInProgress = result;
        }), switchMap((response) => response
            ? this.rxCommandFactoryService
                .forResourceType('com.bmc.arsys.rx.application.webapi.command.DeleteWebApiDefinitionsCommand')
                .execute({
                definitionNames
            })
                .pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    onCopyDefinition(row) {
        this.rxCopyDefinitionService.openCopyDefinitionComponentModal(row, CopyDefinitionType.WebApi).catch(noop);
    }
}
/** @nocollapse */ WebApiDefinitionTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiDefinitionTabComponent, deps: [{ token: i1$4.RxWebApiDefinitionDataPageService }, { token: i1$4.RxWebApiDefinitionService }, { token: i2.RxOverlayService }, { token: i3$1.RxModalService }, { token: i3.TranslateService }, { token: i2.RxCommandFactoryService }, { token: i2.RxBundleCacheService }, { token: i1$1.Router }, { token: RxCopyDefinitionService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ WebApiDefinitionTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: WebApiDefinitionTabComponent, selector: "ax-web-api-definition-tab", inputs: { bundleDescriptor: "bundleDescriptor" }, viewQueries: [{ propertyName: "definitionTabComponent", first: true, predicate: DefinitionTabComponent, descendants: true, static: true }], ngImport: i0, template: "<ax-definition-tab\n  [definitionActions]=\"definitionActions$ | async\"\n  [gridColumns]=\"gridColumns\"\n  [recordDefinition]=\"recordDefinition\"\n  [definitions$]=\"definitions$\"\n  [isActionInProgress]=\"isActionInProgress\"\n  [definitionType]=\"'web-api'\"\n  (addDefinition)=\"onAddDefinition()\"\n  (copyDefinition)=\"onCopyDefinition($event)\"\n  (renameDefinition)=\"onRenameDefinition($event)\"\n  (deleteDefinition)=\"onDeleteDefinition($event)\"\n  (rowSelectionChanged)=\"onRowSelectionChanged($event)\"\n></ax-definition-tab>\n", components: [{ type: DefinitionTabComponent, selector: "ax-definition-tab", inputs: ["isActionInProgress", "definitionType", "definitionActions", "gridColumns", "definitions$", "recordDefinition", "editRouterLink"], outputs: ["customAction", "deleteDefinition", "renameDefinition", "revertCustomization", "copyDefinition", "addDefinition", "rowSelectionChanged"] }], pipes: { "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiDefinitionTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-web-api-definition-tab',
                    templateUrl: './web-api-definition-tab.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1$4.RxWebApiDefinitionDataPageService }, { type: i1$4.RxWebApiDefinitionService }, { type: i2.RxOverlayService }, { type: i3$1.RxModalService }, { type: i3.TranslateService }, { type: i2.RxCommandFactoryService }, { type: i2.RxBundleCacheService }, { type: i1$1.Router }, { type: RxCopyDefinitionService }]; }, propDecorators: { bundleDescriptor: [{
                type: Input
            }], definitionTabComponent: [{
                type: ViewChild,
                args: [DefinitionTabComponent, { static: true }]
            }] } });

class EventDefinitionTabComponent {
    constructor(rxEventDefinitionDataPageService, rxOverlayService, translateService, rxModalService, rxCommandFactoryService, rxBundleCacheService, rxEventDefinitionService, rxCopyDefinitionService, router) {
        this.rxEventDefinitionDataPageService = rxEventDefinitionDataPageService;
        this.rxOverlayService = rxOverlayService;
        this.translateService = translateService;
        this.rxModalService = rxModalService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxEventDefinitionService = rxEventDefinitionService;
        this.rxCopyDefinitionService = rxCopyDefinitionService;
        this.router = router;
        this.rowSelectionChanged$ = new BehaviorSubject([]);
        this.gridColumns = [];
        this.isActionInProgress = false;
        this.definitionActions$ = this.rowSelectionChanged$.pipe(map((selectedRows) => this.getDefinitionActions(selectedRows)));
    }
    ngOnInit() {
        this.gridColumns = [
            AX_BUNDLE_DETAILS.definitionGridColumns.name,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy,
            AX_BUNDLE_DETAILS.definitionGridColumns.isEnabled,
            AX_BUNDLE_DETAILS.definitionGridColumns.scope,
            AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective
        ];
        const fieldDefinitions = [
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.isEnabled.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.boolean
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.scope.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            }
        ];
        const fieldDefinitionsById = fieldDefinitions.reduce((result, fieldDefinition) => {
            result[fieldDefinition.id] = fieldDefinition;
            return result;
        }, {});
        this.recordDefinition = {
            fieldDefinitions,
            fieldDefinitionsById
        };
        this.definitions$ = this.rxEventDefinitionDataPageService.get({
            params: {
                propertySelection: ['name', 'lastUpdateTime', 'lastChangedBy', 'isEnabled', 'customizationPerspective', 'scope']
            }
        });
    }
    getDefinitionActions(selectedRows) {
        const isBundleEditable = this.rxOverlayService.isBundleEditable(this.rxBundleCacheService.bundleId);
        return [
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.new,
                isDisabled: !this.rxOverlayService.areNewDefinitionsAllowedSync(this.bundleDescriptor)
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.revertCustomization,
                isDisabled: !isBundleEditable ||
                    selectedRows.length === 0 ||
                    some(selectedRows, (selectedRow) => selectedRow.customizationPerspective !== RX_OVERLAY.customizationPerspective.customizedInThisOverlayGroup)
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.copy,
                isDisabled: !isBundleEditable || selectedRows.length !== 1
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.delete,
                isDisabled: !isBundleEditable ||
                    selectedRows.length === 0 ||
                    some(selectedRows, (selectedRow) => selectedRow.customizationPerspective !== RX_OVERLAY.customizationPerspective.createdInThisOverlayGroup)
            }
        ];
    }
    onAddDefinition() {
        this.router.navigate([RX_APPLICATION.innovationStudioBundleId, 'event', 'new', this.rxBundleCacheService.bundleId]);
    }
    onRowSelectionChanged(selectedRows) {
        this.rowSelectionChanged$.next(selectedRows);
    }
    onDeleteDefinition(selectedRows) {
        const definitionNames = selectedRows.map((definition) => definition.name);
        from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.definitionTabComponent.getDeleteSelectedDefinitionMessage()
        }))
            .pipe(tap((result) => {
            this.isActionInProgress = result;
        }), switchMap((response) => response
            ? this.rxCommandFactoryService
                .forResourceType('com.bmc.arsys.rx.application.event.command.DeleteEventDefinitionsCommand')
                .execute({
                definitionNames
            })
                .pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    onRevertCustomization(selectedRows) {
        from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.revert-customization.confirmation.message')
        }))
            .pipe(tap(() => {
            this.isActionInProgress = true;
        }), switchMap((response) => response
            ? forkJoin(selectedRows.map((definition) => this.rxEventDefinitionService.revertCustomization(definition.name))).pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    onCopyDefinition(row) {
        this.rxCopyDefinitionService.openCopyDefinitionComponentModal(row, CopyDefinitionType.Event).catch(noop);
    }
}
/** @nocollapse */ EventDefinitionTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EventDefinitionTabComponent, deps: [{ token: i1$8.RxEventDefinitionDataPageService }, { token: i2.RxOverlayService }, { token: i3.TranslateService }, { token: i3$1.RxModalService }, { token: i2.RxCommandFactoryService }, { token: i2.RxBundleCacheService }, { token: i1$8.RxEventDefinitionService }, { token: RxCopyDefinitionService }, { token: i1$1.Router }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ EventDefinitionTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: EventDefinitionTabComponent, selector: "ax-event-definition-tab", inputs: { bundleDescriptor: "bundleDescriptor" }, viewQueries: [{ propertyName: "definitionTabComponent", first: true, predicate: DefinitionTabComponent, descendants: true, static: true }], ngImport: i0, template: "<ax-definition-tab\n  [definitionActions]=\"definitionActions$ | async\"\n  [gridColumns]=\"gridColumns\"\n  [recordDefinition]=\"recordDefinition\"\n  [definitions$]=\"definitions$\"\n  [isActionInProgress]=\"isActionInProgress\"\n  [definitionType]=\"'event'\"\n  (addDefinition)=\"onAddDefinition()\"\n  (deleteDefinition)=\"onDeleteDefinition($event)\"\n  (copyDefinition)=\"onCopyDefinition($event)\"\n  (revertCustomization)=\"onRevertCustomization($event)\"\n  (rowSelectionChanged)=\"onRowSelectionChanged($event)\"\n></ax-definition-tab>\n", components: [{ type: DefinitionTabComponent, selector: "ax-definition-tab", inputs: ["isActionInProgress", "definitionType", "definitionActions", "gridColumns", "definitions$", "recordDefinition", "editRouterLink"], outputs: ["customAction", "deleteDefinition", "renameDefinition", "revertCustomization", "copyDefinition", "addDefinition", "rowSelectionChanged"] }], pipes: { "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EventDefinitionTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-event-definition-tab',
                    templateUrl: './event-definition-tab.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1$8.RxEventDefinitionDataPageService }, { type: i2.RxOverlayService }, { type: i3.TranslateService }, { type: i3$1.RxModalService }, { type: i2.RxCommandFactoryService }, { type: i2.RxBundleCacheService }, { type: i1$8.RxEventDefinitionService }, { type: RxCopyDefinitionService }, { type: i1$1.Router }]; }, propDecorators: { bundleDescriptor: [{
                type: Input
            }], definitionTabComponent: [{
                type: ViewChild,
                args: [DefinitionTabComponent, { static: true }]
            }] } });

const AX_EVENT_STATISTICS_TAB = {
    definitionGridColumns: {
        eventName: {
            title: 'com.bmc.arsys.rx.innovation-studio.tabs.event-statistics.grid.event.label',
            fieldId: 'eventName'
        }
    }
};

class EventStatisticsDefinitionTabComponent {
    constructor(rxEventStatisticsDefinitionDataPageService, rxOverlayService, translateService, rxModalService, rxCommandFactoryService, rxBundleCacheService, rxEventStatisticsDefinitionService, router, rxCopyDefinitionService) {
        this.rxEventStatisticsDefinitionDataPageService = rxEventStatisticsDefinitionDataPageService;
        this.rxOverlayService = rxOverlayService;
        this.translateService = translateService;
        this.rxModalService = rxModalService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxEventStatisticsDefinitionService = rxEventStatisticsDefinitionService;
        this.router = router;
        this.rxCopyDefinitionService = rxCopyDefinitionService;
        this.rowSelectionChanged$ = new BehaviorSubject([]);
        this.gridColumns = [];
        this.isActionInProgress = false;
        this.definitionActions$ = this.rowSelectionChanged$.pipe(map((selectedRows) => this.getDefinitionActions(selectedRows)));
    }
    ngOnInit() {
        this.gridColumns = [
            AX_BUNDLE_DETAILS.definitionGridColumns.name,
            {
                title: AX_EVENT_STATISTICS_TAB.definitionGridColumns.eventName.title,
                fieldId: AX_EVENT_STATISTICS_TAB.definitionGridColumns.eventName.fieldId,
                cellTemplate: this.eventNameCellTemplate
            },
            AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy,
            AX_BUNDLE_DETAILS.definitionGridColumns.isEnabled,
            AX_BUNDLE_DETAILS.definitionGridColumns.scope,
            AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective
        ];
        const fieldDefinitions = [
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_EVENT_STATISTICS_TAB.definitionGridColumns.eventName.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.isEnabled.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.boolean
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.scope.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            }
        ];
        const fieldDefinitionsById = fieldDefinitions.reduce((result, fieldDefinition) => {
            result[fieldDefinition.id] = fieldDefinition;
            return result;
        }, {});
        this.recordDefinition = {
            fieldDefinitions,
            fieldDefinitionsById
        };
        this.definitions$ = this.rxEventStatisticsDefinitionDataPageService.get({
            params: {
                propertySelection: [
                    'name',
                    'eventName',
                    'lastUpdateTime',
                    'lastChangedBy',
                    'isEnabled',
                    'customizationPerspective',
                    'scope'
                ]
            }
        });
    }
    getDefinitionActions(selectedRows) {
        const isBundleEditable = this.rxOverlayService.isBundleEditable(this.rxBundleCacheService.bundleId);
        return [
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.new,
                isDisabled: !this.rxOverlayService.areNewDefinitionsAllowedSync(this.bundleDescriptor)
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.revertCustomization,
                isDisabled: !isBundleEditable ||
                    selectedRows.length === 0 ||
                    some(selectedRows, (selectedRow) => selectedRow.customizationPerspective !== RX_OVERLAY.customizationPerspective.customizedInThisOverlayGroup)
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.copy,
                isDisabled: !isBundleEditable || selectedRows.length !== 1
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.delete,
                isDisabled: !isBundleEditable ||
                    selectedRows.length === 0 ||
                    some(selectedRows, (selectedRow) => selectedRow.customizationPerspective !== RX_OVERLAY.customizationPerspective.createdInThisOverlayGroup)
            }
        ];
    }
    onAddDefinition() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            'event-statistics',
            'new',
            this.rxBundleCacheService.bundleId
        ]);
    }
    onRowSelectionChanged(selectedRows) {
        this.rowSelectionChanged$.next(selectedRows);
    }
    onDeleteDefinition(selectedRows) {
        const definitionNames = selectedRows.map((definition) => definition.name);
        from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.definitionTabComponent.getDeleteSelectedDefinitionMessage()
        }))
            .pipe(tap((result) => {
            this.isActionInProgress = result;
        }), switchMap((response) => response
            ? this.rxCommandFactoryService
                .forResourceType('com.bmc.arsys.rx.application.event.command.DeleteEventStatisticsDefinitionsCommand')
                .execute({
                definitionNames
            })
                .pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    onRevertCustomization(selectedRows) {
        from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.revert-customization.confirmation.message')
        }))
            .pipe(tap(() => {
            this.isActionInProgress = true;
        }), switchMap((response) => response
            ? forkJoin(selectedRows.map((definition) => this.rxEventStatisticsDefinitionService.revertCustomization(definition.name))).pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    onCopyDefinition(row) {
        this.rxCopyDefinitionService.openCopyDefinitionComponentModal(row, CopyDefinitionType.EventStatistics).catch(noop);
    }
}
/** @nocollapse */ EventStatisticsDefinitionTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EventStatisticsDefinitionTabComponent, deps: [{ token: i1$9.RxeventStatisticsDefinitionDataPageService }, { token: i2.RxOverlayService }, { token: i3.TranslateService }, { token: i3$1.RxModalService }, { token: i2.RxCommandFactoryService }, { token: i2.RxBundleCacheService }, { token: i1$9.RxEventStatisticsDefinitionService }, { token: i1$1.Router }, { token: RxCopyDefinitionService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ EventStatisticsDefinitionTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: EventStatisticsDefinitionTabComponent, selector: "ax-event-statistics-definition-tab", inputs: { bundleDescriptor: "bundleDescriptor" }, viewQueries: [{ propertyName: "definitionTabComponent", first: true, predicate: DefinitionTabComponent, descendants: true, static: true }, { propertyName: "eventNameCellTemplate", first: true, predicate: ["eventNameCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<ax-definition-tab\n  [definitionActions]=\"definitionActions$ | async\"\n  [gridColumns]=\"gridColumns\"\n  [recordDefinition]=\"recordDefinition\"\n  [definitions$]=\"definitions$\"\n  [isActionInProgress]=\"isActionInProgress\"\n  [definitionType]=\"'event-statistics'\"\n  (addDefinition)=\"onAddDefinition()\"\n  (deleteDefinition)=\"onDeleteDefinition($event)\"\n  (copyDefinition)=\"onCopyDefinition($event)\"\n  (revertCustomization)=\"onRevertCustomization($event)\"\n  (rowSelectionChanged)=\"onRowSelectionChanged($event)\"\n></ax-definition-tab>\n\n<ng-template #eventNameCellTemplate let-dataItem=\"dataItem\">\n  {{ dataItem.eventName | rxDefinitionNamePipe }}\n</ng-template>\n", components: [{ type: DefinitionTabComponent, selector: "ax-definition-tab", inputs: ["isActionInProgress", "definitionType", "definitionActions", "gridColumns", "definitions$", "recordDefinition", "editRouterLink"], outputs: ["customAction", "deleteDefinition", "renameDefinition", "revertCustomization", "copyDefinition", "addDefinition", "rowSelectionChanged"] }], pipes: { "async": i8.AsyncPipe, "rxDefinitionNamePipe": i2.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EventStatisticsDefinitionTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-event-statistics-definition-tab',
                    templateUrl: './event-statistics-definition-tab.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1$9.RxeventStatisticsDefinitionDataPageService }, { type: i2.RxOverlayService }, { type: i3.TranslateService }, { type: i3$1.RxModalService }, { type: i2.RxCommandFactoryService }, { type: i2.RxBundleCacheService }, { type: i1$9.RxEventStatisticsDefinitionService }, { type: i1$1.Router }, { type: RxCopyDefinitionService }]; }, propDecorators: { bundleDescriptor: [{
                type: Input
            }], definitionTabComponent: [{
                type: ViewChild,
                args: [DefinitionTabComponent, { static: true }]
            }], eventNameCellTemplate: [{
                type: ViewChild,
                args: ['eventNameCellTemplate', { static: true }]
            }] } });

const AX_CHATBOT_DEFINITION_TAB = {
    definitionGridColumns: {
        description: {
            titleKey: 'com.bmc.arsys.rx.client.common.description.label',
            fieldId: 'description'
        }
    }
};

class ChatbotDefinitionTabComponent {
    constructor(router, rxChatbotDefinitionDataPageService, rxDefinitionNameService, rxOverlayService, rxBundleCacheService, rxModalService, translateService, rxChatbotDefinitionService) {
        this.router = router;
        this.rxChatbotDefinitionDataPageService = rxChatbotDefinitionDataPageService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxOverlayService = rxOverlayService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxChatbotDefinitionService = rxChatbotDefinitionService;
        this.rowSelectionChanged$ = new BehaviorSubject([]);
        this.definitionActions$ = this.rowSelectionChanged$.pipe(map((selectedRows) => this.getDefinitionActions(selectedRows)));
        this.definitions$ = this.rxChatbotDefinitionDataPageService.get();
        this.gridColumns = [];
        this.isActionInProgress = false;
        this.botNameMaxLength = this.rxBundleCacheService.bundleId === RX_APPLICATION.chatbotBundleId
            ? 254
            : 254 - (this.rxBundleCacheService.bundleId + ':').length;
    }
    getDefinitionActions(selectedRows) {
        const isBundleEditable = this.rxOverlayService.isBundleEditable(this.rxBundleCacheService.bundleId);
        return [
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.new,
                isDisabled: !this.rxOverlayService.areNewDefinitionsAllowedSync(this.bundleDescriptor)
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.rename,
                isDisabled: !isBundleEditable || selectedRows.length !== 1
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.delete,
                isDisabled: !isBundleEditable || selectedRows.length === 0
            }
        ];
    }
    ngOnInit() {
        this.gridColumns = [
            AX_BUNDLE_DETAILS.definitionGridColumns.name,
            {
                title: AX_CHATBOT_DEFINITION_TAB.definitionGridColumns.description.titleKey,
                fieldId: AX_CHATBOT_DEFINITION_TAB.definitionGridColumns.description.fieldId
            },
            AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy
        ];
        const fieldDefinitions = [
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_CHATBOT_DEFINITION_TAB.definitionGridColumns.description.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            }
        ];
        const fieldDefinitionsById = fieldDefinitions.reduce((result, fieldDefinition) => {
            result[fieldDefinition.id] = fieldDefinition;
            return result;
        }, {});
        this.recordDefinition = {
            fieldDefinitions,
            fieldDefinitionsById
        };
    }
    onAddDefinition() {
        const definitionType = this.translateService.instant('com.bmc.arsys.rx.client.definition-type.chatbot.label');
        from(this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.admin.chatbots.new-chatbot.title'),
            size: 'sm',
            content: RenameDefinitionModalComponent,
            data: {
                autoFocus: false,
                maxLength: this.botNameMaxLength,
                fieldLabel: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.definition-name.label', { definitionType }),
                validationErrorText: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.name-validation.message', { definitionType }),
                definitionType,
                definitionNames: map$1(this.definitionTabComponent.recordGrid.adaptTableConfig.data, AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId)
            }
        })
            .catch(noop))
            .pipe(filter(Boolean), tap(() => {
            this.isActionInProgress = true;
        }), withLatestFrom(this.rxBundleCacheService.getCurrentBundleDescriptor()), switchMap(([chatbotName, bundleDescriptor]) => {
            const newChatbotName = this.rxBundleCacheService.bundleId === RX_APPLICATION.chatbotBundleId
                ? chatbotName
                : this.rxDefinitionNameService.getDefinitionName(this.rxBundleCacheService.bundleId, chatbotName);
            return this.rxChatbotDefinitionService.create(newChatbotName, bundleDescriptor).pipe(tap(() => {
                this.router.navigate([RX_APPLICATION.innovationStudioBundleId, 'chatbot', 'edit', newChatbotName]);
            }));
        }), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    onRenameDefinition({ selectedRow, definitionNames }) {
        const definitionType = this.translateService.instant('com.bmc.arsys.rx.client.definition-type.chatbot.label');
        from(this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.title', {
                definitionType: definitionType.toLowerCase()
            }),
            size: 'sm',
            content: RenameDefinitionModalComponent,
            data: {
                maxLength: this.botNameMaxLength,
                definitionName: selectedRow.name,
                fieldLabel: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.definition-name.label', { definitionType }),
                validationErrorText: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.name-validation.message', { definitionType }),
                definitionType,
                definitionNames
            }
        })
            .catch(noop))
            .pipe(filter(Boolean), tap(() => {
            this.isActionInProgress = true;
        }), switchMap((newChatbotName) => this.rxChatbotDefinitionService.rename(selectedRow.id, newChatbotName)), finalize(() => {
            this.isActionInProgress = false;
        }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            .subscribe();
    }
    onDeleteDefinition(selectedRows) {
        from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.definitionTabComponent.getDeleteSelectedDefinitionMessage()
        }))
            .pipe(switchMap((response) => {
            const defaultChatbot = find(selectedRows, {
                id: RX_CHATBOTS.chatbotSettings.defaultBotId
            });
            if (defaultChatbot && response) {
                return from(this.rxModalService.confirm({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                    modalStyle: RX_MODAL.modalStyles.warning,
                    message: this.translateService.instant('com.bmc.arsys.rx.client.admin.chatbots.configurations-delete-confirmation.message', { defaultChatbotName: defaultChatbot[AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId] })
                }));
            }
            else if (response) {
                return of(true);
            }
            else {
                return of(false);
            }
        }), tap((result) => {
            this.isActionInProgress = result;
        }), switchMap((response) => response
            ? this.rxChatbotDefinitionService.delete(map$1(selectedRows, 'id')).pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    onRowSelectionChanged(selectedRows) {
        this.rowSelectionChanged$.next(selectedRows);
    }
}
/** @nocollapse */ ChatbotDefinitionTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotDefinitionTabComponent, deps: [{ token: i1$1.Router }, { token: i2.RxChatbotDefinitionDataPageService }, { token: i2.RxDefinitionNameService }, { token: i2.RxOverlayService }, { token: i2.RxBundleCacheService }, { token: i3$1.RxModalService }, { token: i3.TranslateService }, { token: i5$2.RxChatbotDefinitionService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ ChatbotDefinitionTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ChatbotDefinitionTabComponent, selector: "ax-chatbot-definition-tab", inputs: { bundleDescriptor: "bundleDescriptor" }, viewQueries: [{ propertyName: "definitionTabComponent", first: true, predicate: DefinitionTabComponent, descendants: true, static: true }], ngImport: i0, template: "<ax-definition-tab\n  [definitionActions]=\"definitionActions$ | async\"\n  [gridColumns]=\"gridColumns\"\n  [recordDefinition]=\"recordDefinition\"\n  [definitions$]=\"definitions$\"\n  [isActionInProgress]=\"isActionInProgress\"\n  [definitionType]=\"'chatbot'\"\n  (rowSelectionChanged)=\"onRowSelectionChanged($event)\"\n  (addDefinition)=\"onAddDefinition()\"\n  (renameDefinition)=\"onRenameDefinition($event)\"\n  (deleteDefinition)=\"onDeleteDefinition($event)\"\n></ax-definition-tab>\n", components: [{ type: DefinitionTabComponent, selector: "ax-definition-tab", inputs: ["isActionInProgress", "definitionType", "definitionActions", "gridColumns", "definitions$", "recordDefinition", "editRouterLink"], outputs: ["customAction", "deleteDefinition", "renameDefinition", "revertCustomization", "copyDefinition", "addDefinition", "rowSelectionChanged"] }], pipes: { "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotDefinitionTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-chatbot-definition-tab',
                    templateUrl: './chatbot-definition-tab.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.Router }, { type: i2.RxChatbotDefinitionDataPageService }, { type: i2.RxDefinitionNameService }, { type: i2.RxOverlayService }, { type: i2.RxBundleCacheService }, { type: i3$1.RxModalService }, { type: i3.TranslateService }, { type: i5$2.RxChatbotDefinitionService }]; }, propDecorators: { bundleDescriptor: [{
                type: Input
            }], definitionTabComponent: [{
                type: ViewChild,
                args: [DefinitionTabComponent, { static: true }]
            }] } });

class AdminSettingEditorComponent extends RxModalClass {
    constructor(injector, dockedPanelContext, formBuilder, translateService, rxAdminSettingsService, rxNotificationService) {
        super(dockedPanelContext, injector);
        this.injector = injector;
        this.dockedPanelContext = dockedPanelContext;
        this.formBuilder = formBuilder;
        this.translateService = translateService;
        this.rxAdminSettingsService = rxAdminSettingsService;
        this.rxNotificationService = rxNotificationService;
        this.isEditMode = this.dockedPanelContext.getData().editMode;
        this.settingForm = this.createSettingForm();
        this.adminSetting = this.dockedPanelContext.getData().selectedAdminSetting;
        this.viewDefinitionPickerOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.definition-type.view.label'),
            definitionType: RxDefinitionPickerType.View,
            required: true
        };
        this.permissionEditorOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.common.permissions.label'),
            type: 'externalconfig',
            permissionScope: RX_PERMISSION.permissionScope.all
        };
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.isEditMode) {
            this.initializeSettingForm();
        }
    }
    createSettingForm() {
        return this.formBuilder.group({
            componentName: '',
            registeredModuleName: '',
            innovationStudio: false,
            application: !this.isEditMode,
            componentLabel: '',
            firstMenu: '',
            secondMenu: '',
            externalLink: '',
            permissions: ''
        });
    }
    initializeSettingForm() {
        this.settingForm.get('componentName').setValue(this.adminSetting.componentName);
        this.settingForm.controls.componentName.disable();
        this.settingForm.get('registeredModuleName').setValue(this.adminSetting.registeredModuleName);
        this.settingForm.get('externalLink').setValue(this.adminSetting.externalLink);
        if (this.adminSetting.showInLocation === RX_ADMINISTRATION.settingAccessOptions.both.value) {
            this.settingForm.get('innovationStudio').setValue(true);
            this.settingForm.get('application').setValue(true);
        }
        else if (this.adminSetting.showInLocation === RX_ADMINISTRATION.settingAccessOptions.innovationStudio.value) {
            this.settingForm.get('innovationStudio').setValue(true);
            this.settingForm.get('application').setValue(false);
        }
        else if (this.adminSetting.showInLocation === RX_ADMINISTRATION.settingAccessOptions.application.value) {
            this.settingForm.get('application').setValue(true);
        }
        this.settingForm.get('componentLabel').setValue(this.adminSetting.localeList[0].componentLabel);
        this.settingForm.get('permissions').setValue(this.adminSetting.permissions);
        this.settingForm.get('firstMenu').setValue(this.adminSetting.localeList[0].firstMenu);
        this.settingForm.get('secondMenu').setValue(this.adminSetting.localeList[0].secondMenu);
    }
    saveAdminSetting() {
        const adminSettingRecord = this.transformFormControlData();
        this.settingForm.markAsPristine();
        if (this.isEditMode) {
            this.rxAdminSettingsService.updateAdminSetting(adminSettingRecord).subscribe(() => {
                this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.configurations.setting-saved.message'));
                this.dockedPanelContext.close(adminSettingRecord);
            });
        }
        else {
            this.rxAdminSettingsService.createAdminSetting(adminSettingRecord).subscribe(() => {
                this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.configurations.setting-saved.message'));
                this.dockedPanelContext.close(adminSettingRecord);
            });
        }
    }
    transformFormControlData() {
        const settingRecord = cloneDeep(this.settingForm.value);
        if (this.isEditMode) {
            settingRecord.componentName = this.adminSetting.componentName;
        }
        settingRecord.localeList = [];
        settingRecord.viewToOpen = 'CustomView';
        if (settingRecord.innovationStudio && settingRecord.application) {
            settingRecord.showInLocation = RX_ADMINISTRATION.settingAccessOptions.both.value;
        }
        else if (settingRecord.innovationStudio) {
            settingRecord.showInLocation = RX_ADMINISTRATION.settingAccessOptions.innovationStudio.value;
        }
        else if (settingRecord.application) {
            settingRecord.showInLocation = RX_ADMINISTRATION.settingAccessOptions.application.value;
        }
        else {
            settingRecord.showInLocation = RX_ADMINISTRATION.settingAccessOptions.none.value;
        }
        settingRecord.localeList.push(Object.assign({ locale: 'en' }, pick(settingRecord, ['componentLabel', 'firstMenu', 'secondMenu'])));
        if (this.adminSetting.linkType === RX_ADMINISTRATION.configurationSettingTypes.inbundle.value) {
            settingRecord.linkType = this.adminSetting.linkType;
            settingRecord.externalLink = null;
            settingRecord.viewComponent = true;
        }
        else {
            settingRecord.linkType = this.adminSetting.linkType;
            settingRecord.viewComponent = false;
            settingRecord.registeredModuleName = null;
        }
        if (!settingRecord.permissions) {
            settingRecord.permissions = [];
        }
        delete settingRecord.firstMenu;
        delete settingRecord.secondMenu;
        delete settingRecord.componentLabel;
        delete settingRecord.innovationStudio;
        delete settingRecord.application;
        return settingRecord;
    }
    isSettingActive() {
        return this.settingForm.get('innovationStudio').value || this.settingForm.get('application').value;
    }
    isInBundleSetting() {
        return this.adminSetting.linkType === RX_ADMINISTRATION.configurationSettingTypes.inbundle.value;
    }
    cancel() {
        this.dockedPanelContext.dismiss(DismissReasons.CLOSE_BTN);
    }
    isDirty() {
        var _a;
        return this.settingForm.dirty || ((_a = this.rxPermissionEditorComponent) === null || _a === void 0 ? void 0 : _a.isDirty());
    }
}
/** @nocollapse */ AdminSettingEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminSettingEditorComponent, deps: [{ token: i0.Injector }, { token: i1.DockedPanelContext }, { token: i4.FormBuilder }, { token: i3.TranslateService }, { token: i2.RxAdminSettingsService }, { token: i2.RxNotificationService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ AdminSettingEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AdminSettingEditorComponent, selector: "ax-admin-setting-editor", viewQueries: [{ propertyName: "rxPermissionEditorComponent", first: true, predicate: RxPermissionEditorComponent, descendants: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"modal-body\">\n  <form [formGroup]=\"settingForm\">\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <adapt-rx-textfield\n          class=\"d-block form-group\"\n          rx-id=\"component-name\"\n          label=\"{{ 'com.bmc.arsys.rx.innovation-studio.configurations.component-name.label' | translate }}\"\n          formControlName=\"componentName\"\n          required=\"true\"\n        >\n        </adapt-rx-textfield>\n      </div>\n    </div>\n    <div class=\"row\" *ngIf=\"isInBundleSetting()\">\n      <div class=\"col-12\">\n        <rx-definition-picker\n          class=\"d-block form-group\"\n          [options]=\"viewDefinitionPickerOptions\"\n          formControlName=\"registeredModuleName\"\n          rx-id=\"view\"\n          required=\"true\"\n        >\n        </rx-definition-picker>\n      </div>\n    </div>\n    <div class=\"row\" *ngIf=\"!isInBundleSetting()\">\n      <div class=\"col-12\">\n        <adapt-rx-textfield\n          class=\"d-block form-group\"\n          rx-id=\"external-link\"\n          label=\"{{ 'com.bmc.arsys.rx.innovation-studio.configurations.external-link.label' | translate }}\"\n          formControlName=\"externalLink\"\n          required=\"true\"\n        >\n        </adapt-rx-textfield>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <adapt-rx-control-label\n          label=\"{{ 'com.bmc.arsys.rx.innovation-studio.configurations.enable-access-from.label' | translate }}\"\n        ></adapt-rx-control-label>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <adapt-rx-checkbox\n          class=\"d-block form-group\"\n          formControlName=\"innovationStudio\"\n          rx-id=\"innovation-studio\"\n          label=\"Innovation Studio\"\n        ></adapt-rx-checkbox>\n        <adapt-rx-checkbox\n          class=\"d-block form-group\"\n          formControlName=\"application\"\n          rx-id=\"application\"\n          label=\"{{ 'com.bmc.arsys.rx.client.common.application.label' | translate }}\"\n        ></adapt-rx-checkbox>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <adapt-rx-textfield\n          class=\"d-block form-group\"\n          rx-id=\"component-label\"\n          label=\"{{ 'com.bmc.arsys.rx.innovation-studio.configurations.component-label.label' | translate }}\"\n          formControlName=\"componentLabel\"\n          required=\"true\"\n        >\n        </adapt-rx-textfield>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <rx-permission-editor\n          class=\"d-block form-group\"\n          [options]=\"permissionEditorOptions\"\n          rx-id=\"permissions\"\n          formControlName=\"permissions\"\n        >\n        </rx-permission-editor>\n      </div>\n    </div>\n    <div *ngIf=\"isSettingActive()\">\n      <div class=\"row\">\n        <div class=\"col-12\">\n          <adapt-rx-textfield\n            class=\"d-block form-group\"\n            rx-id=\"first-menu\"\n            label=\"{{ 'com.bmc.arsys.rx.innovation-studio.configurations.first-menu.label' | translate }}\"\n            formControlName=\"firstMenu\"\n            required=\"true\"\n          >\n          </adapt-rx-textfield>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-12\">\n          <adapt-rx-textfield\n            class=\"d-block form-group\"\n            rx-id=\"second-menu\"\n            label=\"{{ 'com.bmc.arsys.rx.innovation-studio.configurations.second-menu.label' | translate }}\"\n            formControlName=\"secondMenu\"\n          >\n          </adapt-rx-textfield>\n        </div>\n      </div>\n    </div>\n  </form>\n</div>\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    class=\"mr-2\"\n    (click)=\"saveAdminSetting()\"\n    [disabled]=\"settingForm.pristine || settingForm.invalid\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n  <button adapt-button btn-type=\"secondary\" class=\"mr-2\" type=\"button\" (click)=\"cancel()\" rx-id=\"cancel-button\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i2$1.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i2$1.RxPermissionEditorComponent, selector: "rx-permission-editor", inputs: ["options"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i4.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i4.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i4.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminSettingEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-admin-setting-editor',
                    templateUrl: './admin-setting-editor.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.DockedPanelContext }, { type: i4.FormBuilder }, { type: i3.TranslateService }, { type: i2.RxAdminSettingsService }, { type: i2.RxNotificationService }]; }, propDecorators: { rxPermissionEditorComponent: [{
                type: ViewChild,
                args: [RxPermissionEditorComponent]
            }] } });

const AX_CONFIG_DEFINITION_TAB = {
    definitionGridColumns: {
        showInLocation: {
            title: 'com.bmc.arsys.rx.innovation-studio.configurations.grid.column.access.title',
            fieldId: 'showInLocation'
        }
    }
};

const AX_CONFIGURATION_DEFINITION = {
    configurationSettingTypes: {
        shared: {
            configurationType: 'shared-settings',
            labelKey: 'com.bmc.arsys.rx.innovation-studio.tabs.configurations.setting-type.shared.label'
        },
        inbundle: {
            configurationType: 'in-bundle-settings',
            labelKey: 'com.bmc.arsys.rx.innovation-studio.tabs.configurations.setting-type.in-bundle.label'
        },
        external: {
            configurationType: 'external-settings',
            labelKey: 'com.bmc.arsys.rx.innovation-studio.tabs.configurations.setting-type.external.label'
        }
    }
};

class ConfigurationDefinitionTabComponent {
    constructor(rxAdminComponentDataPageQuery, rxModalService, translateService, rxAdminSettingsService, router, rxBundleCache, rxFeatureService) {
        this.rxAdminComponentDataPageQuery = rxAdminComponentDataPageQuery;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxAdminSettingsService = rxAdminSettingsService;
        this.router = router;
        this.rxBundleCache = rxBundleCache;
        this.rxFeatureService = rxFeatureService;
        this.definitions$ = this.rxAdminComponentDataPageQuery.get().pipe(map((dataPage) => ({
            totalSize: dataPage.totalSize,
            data: dataPage.data.map((item) => {
                if (item.showInLocation === RX_ADMINISTRATION.settingAccessOptions.application.value) {
                    item.showInLocation = this.translateService.instant('com.bmc.arsys.rx.client.common.application.label');
                }
                else if (item.showInLocation === RX_ADMINISTRATION.settingAccessOptions.innovationStudio.value) {
                    item.showInLocation = 'Innovation Studio';
                }
                else if (item.showInLocation === RX_ADMINISTRATION.settingAccessOptions.both.value) {
                    item.showInLocation = `${this.translateService.instant('com.bmc.arsys.rx.client.common.application.label')}, Innovation Studio`;
                }
                else {
                    item.showInLocation = this.translateService.instant('com.bmc.arsys.rx.client.common.none.label');
                }
                return Object.assign(Object.assign({}, item), { name: item.component, componentType: this.getComponentType(item) });
            })
        })));
        this.isActionInProgress = false;
        this.rowSelectionChanged$ = new BehaviorSubject([]);
        this.definitionType = 'config';
        this.definitionActions$ = this.rowSelectionChanged$.pipe(map((selectedRows) => this.getDefinitionActions(selectedRows)));
    }
    ngOnInit() {
        if (this.rxFeatureService.isFeatureEnabled('DRD21-14987')) {
            this.editRouterLink = `/${RX_APPLICATION.innovationStudioBundleId}/${this.definitionType}/edit2/${this.rxBundleCache.bundleId}:`;
        }
        else {
            this.editRouterLink = `/${RX_APPLICATION.innovationStudioBundleId}/${this.definitionType}/edit/${this.rxBundleCache.bundleId}:`;
        }
        this.gridColumns = [
            {
                title: AX_BUNDLE_DETAILS.configurationGridColumns.component.title,
                fieldId: AX_BUNDLE_DETAILS.configurationGridColumns.component.fieldId,
                cellTemplate: this.componentCellTemplate,
                sortable: { direction: ColumnSortDirection.Asc, priority: 0 }
            },
            AX_BUNDLE_DETAILS.configurationGridColumns.componentType,
            AX_CONFIG_DEFINITION_TAB.definitionGridColumns.showInLocation
        ];
        const fieldDefinitions = [
            {
                id: AX_BUNDLE_DETAILS.configurationGridColumns.component.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.configurationGridColumns.componentType.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_CONFIG_DEFINITION_TAB.definitionGridColumns.showInLocation.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            }
        ];
        const fieldDefinitionsById = fieldDefinitions.reduce((result, fieldDefinition) => {
            result[fieldDefinition.id] = fieldDefinition;
            return result;
        }, {});
        this.recordDefinition = {
            fieldDefinitions,
            fieldDefinitionsById
        };
        this.settingTypeLabels = {
            external: this.translateService.instant(AX_CONFIGURATION_DEFINITION.configurationSettingTypes.external.labelKey),
            inBundle: this.translateService.instant(AX_CONFIGURATION_DEFINITION.configurationSettingTypes.inbundle.labelKey),
            shared: this.translateService.instant(AX_CONFIGURATION_DEFINITION.configurationSettingTypes.shared.labelKey)
        };
    }
    getComponentType(adminComponent) {
        return adminComponent.uiLocation === 'External Location'
            ? this.settingTypeLabels.external
            : adminComponent.custom === 'CommonSettings'
                ? this.settingTypeLabels.shared
                : this.settingTypeLabels.inBundle;
    }
    getDefinitionActions(selectedRows) {
        return [
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.new,
                subActions: [
                    {
                        labelKey: 'com.bmc.arsys.rx.innovation-studio.tabs.configurations.new.shared-setting.label',
                        id: RX_ADMINISTRATION.configurationSettingTypes.shared.configurationType,
                        rxId: RX_ADMINISTRATION.configurationSettingTypes.shared.configurationType
                    },
                    {
                        labelKey: 'com.bmc.arsys.rx.innovation-studio.tabs.configurations.new.in-bundle-setting.label',
                        id: RX_ADMINISTRATION.configurationSettingTypes.inbundle.configurationType,
                        rxId: RX_ADMINISTRATION.configurationSettingTypes.inbundle.configurationType
                    },
                    {
                        labelKey: 'com.bmc.arsys.rx.innovation-studio.tabs.configurations.new.external-setting.label',
                        id: RX_ADMINISTRATION.configurationSettingTypes.external.configurationType,
                        rxId: RX_ADMINISTRATION.configurationSettingTypes.external.configurationType
                    }
                ]
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.delete,
                isDisabled: selectedRows.length === 0
            }
        ];
    }
    onCustomAction(event) {
        if (event.actionId === RX_ADMINISTRATION.configurationSettingTypes.shared.configurationType) {
            this.router.navigate([
                RX_APPLICATION.innovationStudioBundleId,
                this.definitionType,
                this.rxFeatureService.isFeatureEnabled('DRD21-14987') ? 'new2' : 'new',
                this.rxBundleCache.bundleId
            ]);
        }
        else if (event.actionId === RX_ADMINISTRATION.configurationSettingTypes.inbundle.configurationType) {
            this.openInBundleSettingsEditor({
                editMode: false,
                titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.configurations.new.in-bundle-setting.title',
                selectedAdminSetting: {
                    linkType: RX_ADMINISTRATION.configurationSettingTypes.inbundle.value
                }
            });
        }
        else if (event.actionId === RX_ADMINISTRATION.configurationSettingTypes.external.configurationType) {
            this.openInBundleSettingsEditor({
                editMode: false,
                titleKey: 'com.bmc.arsys.rx.innovation-studio.tabs.configurations.new.external-setting.title',
                selectedAdminSetting: {
                    linkType: RX_ADMINISTRATION.configurationSettingTypes.external.value
                }
            });
        }
    }
    editAdminSetting(row) {
        if (row.custom === 'CustomView') {
            this.rxAdminSettingsService.getAdminSetting(row.component).subscribe((adminSetting) => {
                this.openInBundleSettingsEditor({
                    editMode: true,
                    titleKey: this.getTitleKey(adminSetting.linkType),
                    selectedAdminSetting: adminSetting
                });
            });
        }
    }
    openInBundleSettingsEditor(data) {
        from(this.rxModalService
            .openDockedPanel({
            title: this.translateService.instant(data.titleKey),
            content: AdminSettingEditorComponent,
            size: OpenViewActionModalSize.Small,
            data: Object.assign({}, data)
        })
            .catch(noop))
            .pipe(filter(Boolean), tap(() => {
            this.isActionInProgress = true;
        }), finalize(() => {
            this.isActionInProgress = false;
        }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            .subscribe();
    }
    getTitleKey(linkType) {
        return linkType === RX_ADMINISTRATION.configurationSettingTypes.inbundle.value
            ? 'com.bmc.arsys.rx.innovation-studio.tabs.configurations.new.in-bundle-setting.label'
            : 'com.bmc.arsys.rx.innovation-studio.tabs.configurations.new.external-setting.label';
    }
    onDeleteDefinition(selectedRows) {
        const definitionNames = selectedRows.map((definition) => definition.name);
        from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.definitionTabComponent.getDeleteSelectedDefinitionMessage()
        }))
            .pipe(tap((result) => {
            this.isActionInProgress = result;
        }), switchMap((response) => response
            ? this.rxAdminSettingsService.deleteAdminSetting(definitionNames).pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    onRowSelectionChanged(selectedRows) {
        this.rowSelectionChanged$.next(selectedRows);
    }
}
/** @nocollapse */ ConfigurationDefinitionTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigurationDefinitionTabComponent, deps: [{ token: i2.RxAdminComponentDataPageService }, { token: i3$1.RxModalService }, { token: i3.TranslateService }, { token: i2.RxAdminSettingsService }, { token: i1$1.Router }, { token: i2.RxBundleCacheService }, { token: i2.RxFeatureService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ ConfigurationDefinitionTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ConfigurationDefinitionTabComponent, selector: "ax-configuration-definition-tab", viewQueries: [{ propertyName: "definitionTabComponent", first: true, predicate: DefinitionTabComponent, descendants: true, static: true }, { propertyName: "componentCellTemplate", first: true, predicate: ["componentCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<ax-definition-tab\n  [definitionActions]=\"definitionActions$ | async\"\n  [gridColumns]=\"gridColumns\"\n  [recordDefinition]=\"recordDefinition\"\n  [definitionType]=\"'config-definition'\"\n  [definitions$]=\"definitions$\"\n  [isActionInProgress]=\"isActionInProgress\"\n  (rowSelectionChanged)=\"onRowSelectionChanged($event)\"\n  (customAction)=\"onCustomAction($event)\"\n  (deleteDefinition)=\"onDeleteDefinition($event)\"\n></ax-definition-tab>\n\n<ng-template #componentCellTemplate let-dataItem=\"dataItem\">\n  <div (click)=\"editAdminSetting(dataItem)\" *ngIf=\"dataItem.custom === 'CustomView'\">\n    <a [routerLink]=\"\" (click)=\"(false)\">\n      {{ dataItem.component }}\n    </a>\n  </div>\n  <div *ngIf=\"dataItem.custom === 'CommonSettings'\">\n    <a [routerLink]=\"editRouterLink + dataItem.component\">\n      {{ dataItem.component }}\n    </a>\n  </div>\n</ng-template>\n", components: [{ type: DefinitionTabComponent, selector: "ax-definition-tab", inputs: ["isActionInProgress", "definitionType", "definitionActions", "gridColumns", "definitions$", "recordDefinition", "editRouterLink"], outputs: ["customAction", "deleteDefinition", "renameDefinition", "revertCustomization", "copyDefinition", "addDefinition", "rowSelectionChanged"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1$1.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }], pipes: { "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigurationDefinitionTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-configuration-definition-tab',
                    templateUrl: './configuration-definition-tab.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i2.RxAdminComponentDataPageService }, { type: i3$1.RxModalService }, { type: i3.TranslateService }, { type: i2.RxAdminSettingsService }, { type: i1$1.Router }, { type: i2.RxBundleCacheService }, { type: i2.RxFeatureService }]; }, propDecorators: { definitionTabComponent: [{
                type: ViewChild,
                args: [DefinitionTabComponent, { static: true }]
            }], componentCellTemplate: [{
                type: ViewChild,
                args: ['componentCellTemplate', { static: true }]
            }] } });

class BundleDefinitionsComponent {
    constructor(activatedRoute, rxBundleCacheService, rxGlobalCacheService, rxOverlayService, rxPageTitleService, translateService, router) {
        this.activatedRoute = activatedRoute;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxOverlayService = rxOverlayService;
        this.rxPageTitleService = rxPageTitleService;
        this.translateService = translateService;
        this.router = router;
        this.tabs = AX_BUNDLE_DETAILS.tabs.map((tab) => (Object.assign(Object.assign({}, tab), { isVisited: false })));
        this.bundleDescriptor$ = this.rxBundleCacheService.getCurrentBundleDescriptor();
        this.activeTabIndex$ = this.activatedRoute.params.pipe(pluck('tab'), map((tabId) => findIndex(AX_BUNDLE_DETAILS.tabs, { id: tabId })), tap((index) => {
            if (index === -1) {
                this.router.navigate([BundleDefinitionTab.Records], { relativeTo: this.activatedRoute.parent });
            }
            else {
                this.tabs[index].isVisited = true;
                this.setPageTitle(AX_BUNDLE_DETAILS.tabs[index].titleKey);
            }
        }));
    }
    onTabChanged(tabChangeEvent) {
        const nextActiveTab = AX_BUNDLE_DETAILS.tabs[tabChangeEvent.index];
        this.router.navigate([nextActiveTab.id], { relativeTo: this.activatedRoute.parent });
    }
    setPageTitle(titleKey) {
        this.rxGlobalCacheService
            .getBundleFriendlyName(this.rxBundleCacheService.bundleId)
            .pipe(take(1))
            .subscribe((bundleFriendlyName) => {
            this.rxPageTitleService.set([this.translateService.instant(titleKey), bundleFriendlyName], this.rxGlobalCacheService.applicationId);
        });
    }
}
/** @nocollapse */ BundleDefinitionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BundleDefinitionsComponent, deps: [{ token: i1$1.ActivatedRoute }, { token: i2.RxBundleCacheService }, { token: i2.RxGlobalCacheService }, { token: i2.RxOverlayService }, { token: i2.RxPageTitleService }, { token: i3.TranslateService }, { token: i1$1.Router }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ BundleDefinitionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: BundleDefinitionsComponent, selector: "ax-bundle-definitions", ngImport: i0, template: "<adapt-tabset\n  *ngIf=\"bundleDescriptor$ | async as bundleDescriptor\"\n  [tab-active]=\"activeTabIndex$ | async\"\n  [fullHeight]=\"true\"\n  (tab-active-changed)=\"onTabChanged($event)\"\n>\n  <adapt-tab-panel [adapt-tab-title]=\"tabs[0].titleKey | translate\">\n    <ax-record-definition-tab\n      *ngIf=\"tabs[0].isVisited\"\n      [bundleDescriptor]=\"bundleDescriptor\"\n    ></ax-record-definition-tab>\n  </adapt-tab-panel>\n\n  <adapt-tab-panel [adapt-tab-title]=\"tabs[1].titleKey | translate\">\n    <ax-view-definition-tab *ngIf=\"tabs[1].isVisited\" [bundleDescriptor]=\"bundleDescriptor\"></ax-view-definition-tab>\n  </adapt-tab-panel>\n\n  <adapt-tab-panel [adapt-tab-title]=\"tabs[2].titleKey | translate\">\n    <ax-process-definition-tab\n      *ngIf=\"tabs[2].isVisited\"\n      [bundleDescriptor]=\"bundleDescriptor\"\n    ></ax-process-definition-tab>\n  </adapt-tab-panel>\n\n  <adapt-tab-panel [adapt-tab-title]=\"tabs[3].titleKey | translate\">\n    <ax-rule-definition-tab *ngIf=\"tabs[3].isVisited\" [bundleDescriptor]=\"bundleDescriptor\"></ax-rule-definition-tab>\n  </adapt-tab-panel>\n\n  <adapt-tab-panel [adapt-tab-title]=\"tabs[4].titleKey | translate\">\n    <ax-association-definition-tab\n      *ngIf=\"tabs[4].isVisited\"\n      [bundleDescriptor]=\"bundleDescriptor\"\n    ></ax-association-definition-tab>\n  </adapt-tab-panel>\n\n  <adapt-tab-panel [adapt-tab-title]=\"tabs[5].titleKey | translate\">\n    <ax-named-list-definition-tab\n      *ngIf=\"tabs[5].isVisited\"\n      [bundleDescriptor]=\"bundleDescriptor\"\n    ></ax-named-list-definition-tab>\n  </adapt-tab-panel>\n\n  <adapt-tab-panel [adapt-tab-title]=\"tabs[6].titleKey | translate\">\n    <ax-document-definition-tab\n      *ngIf=\"tabs[6].isVisited\"\n      [bundleDescriptor]=\"bundleDescriptor\"\n    ></ax-document-definition-tab>\n  </adapt-tab-panel>\n\n  <adapt-tab-panel [adapt-tab-title]=\"tabs[7].titleKey | translate\">\n    <ax-web-api-definition-tab\n      *ngIf=\"tabs[7].isVisited\"\n      [bundleDescriptor]=\"bundleDescriptor\"\n    ></ax-web-api-definition-tab>\n  </adapt-tab-panel>\n\n  <adapt-tab-panel [adapt-tab-title]=\"tabs[8].titleKey | translate\">\n    <ax-event-definition-tab *ngIf=\"tabs[8].isVisited\" [bundleDescriptor]=\"bundleDescriptor\"></ax-event-definition-tab>\n  </adapt-tab-panel>\n\n  <adapt-tab-panel [adapt-tab-title]=\"tabs[9].titleKey | translate\">\n    <ax-event-statistics-definition-tab\n      *ngIf=\"tabs[9].isVisited\"\n      [bundleDescriptor]=\"bundleDescriptor\"\n    ></ax-event-statistics-definition-tab>\n  </adapt-tab-panel>\n\n  <adapt-tab-panel [adapt-tab-title]=\"tabs[10].titleKey | translate\">\n    <ax-chatbot-definition-tab\n      *ngIf=\"tabs[10].isVisited\"\n      [bundleDescriptor]=\"bundleDescriptor\"\n    ></ax-chatbot-definition-tab>\n  </adapt-tab-panel>\n\n  <adapt-tab-panel [adapt-tab-title]=\"tabs[11].titleKey | translate\">\n    <ax-configuration-definition-tab *ngIf=\"tabs[11].isVisited\"></ax-configuration-definition-tab>\n  </adapt-tab-panel>\n</adapt-tabset>\n", styles: [":host{height:100%}:host ::ng-deep adapt-tabset .tab-content{padding:0}\n"], components: [{ type: i1.AdaptTabsComponent, selector: "adapt-tabset", inputs: ["showTabToolbar", "customCssTabContent", "fullHeight", "texts", "enableDnD", "customClassTabList", "allow-tabs-adding", "id", "testID", "dropdown-title", "fadeColor", "carouselMode", "justify", "type", "tab-active"], outputs: ["tab-index-closed", "tab-active-changed", "add-tab-clicked", "tabClicked", "tabDropped"], exportAs: ["adaptTabset"] }, { type: i1.AdaptTabsPanelComponent, selector: "adapt-tab-panel, div[tab-panel]", inputs: ["isActive", "badge-type", "animateBadge", "showBadgeAlert", "badgeAlertVariant", "badgeCustomClass", "adapt-tab-title", "disabled", "isHidden", "icon", "subtext", "icon-right", "icon-close", "aria-label", "aria-labelledby", "kebabMenu", "id", "renderContentWhenInactive", "badge"] }, { type: RecordDefinitionTabComponent, selector: "ax-record-definition-tab", inputs: ["bundleDescriptor"] }, { type: ViewDefinitionTabComponent, selector: "ax-view-definition-tab", inputs: ["bundleDescriptor"] }, { type: ProcessDefinitionTabComponent, selector: "ax-process-definition-tab", inputs: ["bundleDescriptor"] }, { type: RuleDefinitionTabComponent, selector: "ax-rule-definition-tab", inputs: ["bundleDescriptor"] }, { type: AssociationDefinitionTabComponent, selector: "ax-association-definition-tab", inputs: ["bundleDescriptor"] }, { type: NamedListDefinitionTabComponent, selector: "ax-named-list-definition-tab", inputs: ["bundleDescriptor"] }, { type: DocumentDefinitionTabComponent, selector: "ax-document-definition-tab", inputs: ["bundleDescriptor"] }, { type: WebApiDefinitionTabComponent, selector: "ax-web-api-definition-tab", inputs: ["bundleDescriptor"] }, { type: EventDefinitionTabComponent, selector: "ax-event-definition-tab", inputs: ["bundleDescriptor"] }, { type: EventStatisticsDefinitionTabComponent, selector: "ax-event-statistics-definition-tab", inputs: ["bundleDescriptor"] }, { type: ChatbotDefinitionTabComponent, selector: "ax-chatbot-definition-tab", inputs: ["bundleDescriptor"] }, { type: ConfigurationDefinitionTabComponent, selector: "ax-configuration-definition-tab" }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i8.AsyncPipe, "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BundleDefinitionsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-bundle-definitions',
                    templateUrl: './bundle-definitions.component.html',
                    styleUrls: ['./bundle-definitions.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$1.ActivatedRoute }, { type: i2.RxBundleCacheService }, { type: i2.RxGlobalCacheService }, { type: i2.RxOverlayService }, { type: i2.RxPageTitleService }, { type: i3.TranslateService }, { type: i1$1.Router }]; } });

const AX_BUNDLE_DEPLOYMENT = {
    deploymentStatuses: {
        succeeded: ['Deployed', 'DeployedWithImportWarning', 'Undeployed', 'PackageCreated', 'UndeployedVersion'],
        failed: ['Error', 'DeployedWithImportError'],
        pending: [
            'PendingDeploy',
            'ReadyDeploy',
            'Deploying',
            'PendingUndeploy',
            'ReadyUndeploy',
            'Undeploying',
            'PendingPackageCreate'
        ]
    },
    deploymentStatusPollInterval: 5000
};

class AxBundleDeploymentService {
    constructor(httpClient, ngZone, translateService, rxFileService) {
        this.httpClient = httpClient;
        this.ngZone = ngZone;
        this.translateService = translateService;
        this.rxFileService = rxFileService;
        this.createBundleUrl = '/api/rx/application/bundle/bundledescriptor/';
        this.deployBundleUrl = '/api/rx/application/bundle/deploymentpackage/';
        this.deploymentStatusUrl = '/api/rx/application/bundle/deploymentstatus';
        this.cancelPolling$ = new Subject();
    }
    create(bundleDescriptor) {
        return this.httpClient.post(this.createBundleUrl, bundleDescriptor, { observe: 'response' });
    }
    downloadContentPackage(bundleId, packageId) {
        return this.httpClient
            .get(`${this.deployBundleUrl}${bundleId}/${packageId}`, { responseType: 'arraybuffer', observe: 'response' })
            .pipe(tap((fileStream) => {
            const arrayBufferView = new Uint8Array(fileStream.body);
            const file = new Blob([arrayBufferView], {
                type: fileStream.headers.get('content-type')
            });
            const fileName = this.rxFileService.extractFileName(fileStream);
            this.ngZone.runOutsideAngular(() => {
                saveAs(file, fileName);
            });
        }));
    }
    download(bundleId, packageId) {
        return this.httpClient.get(this.deployBundleUrl + `${bundleId}/${packageId}`, {
            observe: 'response',
            responseType: 'arraybuffer'
        });
    }
    install(file) {
        const formData = new FormData();
        formData.append('file', file);
        return this.httpClient.post(this.deployBundleUrl, formData, {
            headers: new HttpHeaders({ 'Expect-Package-Type': 'INSTALL' }),
            observe: 'response'
        });
    }
    reinstall(bundleId, file) {
        const formData = new FormData();
        formData.append('file', file);
        return this.httpClient.post(this.deployBundleUrl, formData, {
            headers: new HttpHeaders({ 'Expect-Package-Type': 'INSTALL', 'Reinstall-To-Bundle-Id': bundleId }),
            observe: 'response'
        });
    }
    update(file) {
        const formData = new FormData();
        formData.append('file', file);
        return this.httpClient.post(this.deployBundleUrl, formData, {
            headers: new HttpHeaders({ 'Expect-Package-Type': 'UPDATE' }),
            observe: 'response'
        });
    }
    import(bundleId, file) {
        const formData = new FormData();
        formData.append('file', file);
        return this.httpClient.post(this.deployBundleUrl, formData, {
            headers: new HttpHeaders({
                'Expect-Package-Type': 'EXPORT',
                'Reinstall-To-Bundle-Id': bundleId
            }),
            observe: 'response'
        });
    }
    uninstall(bundleId) {
        return this.httpClient.delete(this.deployBundleUrl + `${bundleId}`, {
            observe: 'response'
        });
    }
    buildStatusMessage(deploymentParsedStatus) {
        const newLine = '\n';
        const errorMessages = !isEmpty(deploymentParsedStatus.errorMessages)
            ? chain(deploymentParsedStatus.errorMessages)
                .unshift(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.errors.label'))
                .join(newLine)
                .value()
            : '';
        const definitionImportStatusMessages = !isEmpty(deploymentParsedStatus.definitionsStatusContent)
            ? chain(deploymentParsedStatus.definitionsStatusContent)
                .unshift(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.definition.status.messages.label'))
                .join(newLine)
                .value()
            : '';
        const tenantDataImportStatusMessages = !isEmpty(deploymentParsedStatus.tenantDataStatusContent)
            ? Object.keys(deploymentParsedStatus.tenantDataStatusContent).map((key) => chain(deploymentParsedStatus.tenantDataStatusContent[key])
                .unshift(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.data.status.messages.label', {
                tenant: key
            }))
                .join(newLine)
                .value())
            : [];
        return chain(tenantDataImportStatusMessages)
            .unshift(errorMessages, definitionImportStatusMessages)
            .compact()
            .join(newLine + newLine)
            .value();
    }
    pollDeploymentStatus(guid, customDeploymentStatusUrl) {
        return timer(0, AX_BUNDLE_DEPLOYMENT.deploymentStatusPollInterval)
            .pipe(takeUntil(this.cancelPolling$), switchMap(() => this.httpClient.get((customDeploymentStatusUrl || this.deploymentStatusUrl) + `/${guid}`)), tap((deploymentStatus) => {
            if (AX_BUNDLE_DEPLOYMENT.deploymentStatuses.failed.includes(deploymentStatus.packageDeployStatus) ||
                AX_BUNDLE_DEPLOYMENT.deploymentStatuses.failed.includes(deploymentStatus.packageExportStatus)) {
                this.cancelPolling$.next();
                deploymentStatus.errorMessage = this.buildStatusMessage(deploymentStatus.deploymentParsedStatus);
            }
            else if (AX_BUNDLE_DEPLOYMENT.deploymentStatuses.succeeded.includes(deploymentStatus.packageDeployStatus) ||
                AX_BUNDLE_DEPLOYMENT.deploymentStatuses.succeeded.includes(deploymentStatus.packageExportStatus)) {
                this.cancelPolling$.next();
                deploymentStatus.isFinished = true;
            }
        }));
    }
}
/** @nocollapse */ AxBundleDeploymentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxBundleDeploymentService, deps: [{ token: i1$2.HttpClient }, { token: i0.NgZone }, { token: i3.TranslateService }, { token: i5$1.RxFileService }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ AxBundleDeploymentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxBundleDeploymentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxBundleDeploymentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$2.HttpClient }, { type: i0.NgZone }, { type: i3.TranslateService }, { type: i5$1.RxFileService }]; } });

class RxCreatePackageStatusDataPageService extends DataPage {
    constructor(injector) {
        super(injector, 'com.bmc.arsys.rx.application.bundle.datapage.CreatePackageStatusDataPageQuery');
        this.injector = injector;
    }
}
/** @nocollapse */ RxCreatePackageStatusDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCreatePackageStatusDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ RxCreatePackageStatusDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCreatePackageStatusDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCreatePackageStatusDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

const localizedStringsDataPageQuery = 'com.bmc.arsys.rx.application.localization.datapage.LocalizedStringsDataPageQuery';
class AxLocalizedStringsDataPageQuery extends DataPage {
    constructor(injector) {
        super(injector, localizedStringsDataPageQuery);
        this.injector = injector;
    }
}
/** @nocollapse */ AxLocalizedStringsDataPageQuery.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxLocalizedStringsDataPageQuery, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ AxLocalizedStringsDataPageQuery.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxLocalizedStringsDataPageQuery, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxLocalizedStringsDataPageQuery, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

const AX_ADD_DATA_WIZARD_STEP$1 = {
    duplicateDataActionTypes: {
        THROW_ERROR: 'Ignore',
        CREATE_NEW_RECORD: 'Create New',
        REPLACE: 'Overwrite',
        MERGE: 'Merge'
    }
};

class DataFilterColumnExpressionConfiguratorClass$1 extends RxExpressionConfigurator {
    constructor(injector) {
        super();
        this.injector = injector;
        this.translateService = this.injector.get(TranslateService);
        this.commonDataDictionary$ = of([
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                children: [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-date.title'),
                        icon: 'd-icon-dollar',
                        expression: '$DATE$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-date-time.title'),
                        icon: 'd-icon-dollar',
                        expression: '$TIMESTAMP$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-groups.title'),
                        icon: 'd-icon-dollar',
                        expression: '$GROUPS$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-group-ids.title'),
                        icon: 'd-icon-dollar',
                        expression: '$GROUPIDS$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-roles.title'),
                        icon: 'd-icon-dollar',
                        expression: '$ROLES$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-time.title'),
                        icon: 'd-icon-dollar',
                        expression: '$TIME$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-user.title'),
                        icon: 'd-icon-dollar',
                        expression: '$USER$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-user-locale.title'),
                        icon: 'd-icon-dollar',
                        expression: '$LOCALE$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-week-day.title'),
                        icon: 'd-icon-dollar',
                        expression: '$WEEKDAY$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.null.title'),
                        icon: 'd-icon-dollar',
                        expression: '$NULL$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.server-url.title'),
                        icon: 'd-icon-dollar',
                        expression: '$SERVERURL$'
                    }
                ]
            }
        ]);
    }
}

class GlobalDataFilterExpressionConfiguratorClass$1 extends RxExpressionConfigurator {
    constructor(injector) {
        super();
        this.injector = injector;
        this.translateService = this.injector.get(TranslateService);
        this.commonDataDictionary$ = of([
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                children: [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-date.title'),
                        icon: 'd-icon-dollar',
                        expression: '$DATE$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-date-time.title'),
                        icon: 'd-icon-dollar',
                        expression: '$TIMESTAMP$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-groups.title'),
                        icon: 'd-icon-dollar',
                        expression: '$GROUPS$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-group-ids.title'),
                        icon: 'd-icon-dollar',
                        expression: '$GROUPIDS$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-roles.title'),
                        icon: 'd-icon-dollar',
                        expression: '$ROLES$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-time.title'),
                        icon: 'd-icon-dollar',
                        expression: '$TIME$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-user.title'),
                        icon: 'd-icon-dollar',
                        expression: '$USER$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-user-locale.title'),
                        icon: 'd-icon-dollar',
                        expression: '$LOCALE$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-week-day.title'),
                        icon: 'd-icon-dollar',
                        expression: '$WEEKDAY$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.null.title'),
                        icon: 'd-icon-dollar',
                        expression: '$NULL$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.server-url.title'),
                        icon: 'd-icon-dollar',
                        expression: '$SERVERURL$'
                    }
                ]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.common-core-fields.title'),
                expanded: true,
                children: RX_RECORD_DEFINITION.coreFields.map((field) => ({
                    label: field.name,
                    icon: 'd-icon-field_text',
                    expression: `'${field.id}'`
                }))
            }
        ]);
    }
}

class AddBundleContentDataWizardStepComponent {
    constructor(injector, rxDefinitionNameService, rxExpressionEditorService, rxModalService, rxRecordDefinitionCacheService, rxRecordGridUtilsService, rxWizardModalComponent, translateService) {
        this.injector = injector;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxModalService = rxModalService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxRecordGridUtilsService = rxRecordGridUtilsService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.recordDefinitionsFormControl = new FormControl();
        this.duplicateDataActionTypeOptions = keys(AX_ADD_DATA_WIZARD_STEP$1.duplicateDataActionTypes);
        this.recordDefinitions = [];
        this.selectedDataSources = {};
        this.selectedDefinitions = [];
        this.duplicateConfigurationDataActionTypeOptions = chain(AX_ADD_DATA_WIZARD_STEP$1.duplicateDataActionTypes)
            .pick(['THROW_ERROR', 'REPLACE'])
            .keys()
            .value();
        this.destroyed$ = new ReplaySubject(1);
        this.optionFormatter = this.optionFormatter.bind(this);
        this.titleFormatter = this.titleFormatter.bind(this);
    }
    ngOnInit() {
        this.dataFilterColumnExpressionConfigurator = new DataFilterColumnExpressionConfiguratorClass$1(this.injector);
        this.globalDataFilterExpressionConfigurator = new GlobalDataFilterExpressionConfiguratorClass$1(this.injector);
        this.globalDataFilterExpressionConfigurator.configureForProperty({
            propertyPath: 'globalDataFilter',
            operators: this.globalDataFilterExpressionConfigurator.getOperatorRowsByGroup(ExpressionOperatorGroup.All),
            dataDictionary$: this.globalDataFilterExpressionConfigurator.commonDataDictionary$
        });
        this.globalDataFilterExpressionFormControlOptions = {
            isLabelHidden: true,
            dataDictionary$: this.globalDataFilterExpressionConfigurator.getDataDictionary('globalDataFilter'),
            operators: this.globalDataFilterExpressionConfigurator.getOperators(),
            clickToBuildExpressionLabel: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.global-data-filter.click-to-build-expression.label')
        };
        const gridColumns = [
            {
                fieldId: 'dataSource',
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.data-source.label'),
                wrapText: true,
                cellTemplate: this.recordNameCellTemplate
            },
            {
                fieldId: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.name.label'),
                wrapText: true,
                visible: false,
                cellTemplate: this.recordNameCellTemplate
            },
            {
                fieldId: 'aliasName',
                wrapText: true,
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.alias-name.label'),
                visible: false
            },
            {
                fieldId: 'dataFilterExpression',
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.data-filter.label'),
                cellTemplate: this.dataFilterCellTemplate
            },
            {
                fieldId: 'dataFilterColumnExpressionFormControlOptions',
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.data-filter.label'),
                visible: false
            },
            {
                fieldId: 'ignoreRuleExecution',
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.ignore-rules.label'),
                cellTemplate: this.ignoreRulesCellTemplate
            },
            {
                fieldId: 'duplicateDataActionType',
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.duplicates.label'),
                cellTemplate: this.duplicateDataActionTypeCellTemplate
            }
        ].filter((column) => includes(this.options.gridConfig.columns, column.fieldId));
        const gridRecordDefinition = {
            fieldDefinitions: [
                {
                    id: 'dataSource',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'aliasName',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'dataFilterExpression',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'dataFilterColumnExpressionFormControlOptions',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.object
                },
                {
                    id: 'ignoreRuleExecution',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'duplicateDataActionType',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ].filter((definition) => includes(this.options.gridConfig.columns, definition.id))
        };
        this.rxWizardModalComponent.context$.pipe(take(1)).subscribe((context) => {
            context.cache.recordDefinitions.forEach((recordDefinition) => {
                this.dataFilterColumnExpressionConfigurator.configureForProperty({
                    propertyPath: `dataFilterExpression:${recordDefinition.name}`,
                    operators: this.dataFilterColumnExpressionConfigurator.getOperatorRowsByGroup(ExpressionOperatorGroup.All),
                    dataDictionary$: this.dataFilterColumnExpressionConfigurator.commonDataDictionary$.pipe(switchMap((commonDataDictionary) => this.rxRecordGridUtilsService.getAssociationDescriptors(recordDefinition.name).pipe(switchMap((associationDescriptors) => forkJoin([
                        this.rxRecordDefinitionCacheService.getRecordDefinition(recordDefinition.name),
                        ...associationDescriptors.map((associationDescriptor) => this.rxRecordDefinitionCacheService.getRecordDefinition(associationDescriptor.recordDefinitionName))
                    ]).pipe(map((definitions) => [
                        commonDataDictionary[0],
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.definition-fields.title', {
                                definitionName: this.rxDefinitionNameService.getDisplayName(recordDefinition.name)
                            }),
                            expanded: true,
                            children: [
                                ...chain(definitions)
                                    .find({ name: recordDefinition.name })
                                    .get('fieldDefinitions')
                                    .map((fieldDefinition) => ({
                                    label: fieldDefinition.name,
                                    icon: 'd-icon-field_text',
                                    expression: `'${fieldDefinition.id}'`
                                }))
                                    .value(),
                                isEmpty(associationDescriptors)
                                    ? []
                                    : {
                                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.expression-editor.data-dictionary.values.record-definition-associations.title'),
                                        children: associationDescriptors.map((associationDescriptor) => ({
                                            label: `${this.rxDefinitionNameService.getDisplayName(associationDescriptor.recordDefinitionName)} (${associationDescriptor.label})`,
                                            children: this.getAssociationsDataDictionary(definitions, associationDescriptor.recordDefinitionName, associationDescriptor)
                                        }))
                                    }
                            ]
                        }
                    ]))))))
                });
            });
            let recordDefinitions = [];
            let preSelectedRecordDefinitions = [];
            const recordDefinitionsByBundles = context.cache.recordDefinitions
                .filter((recordDefinition) => recordDefinition.type !== RX_RECORD_DEFINITION.externalRecordDefinitionTypes.custom)
                .reduce((result, recordDefinition) => {
                const newRecordDefinition = {
                    duplicateDataActionType: [this.options.gridConfig.defaultDuplicateDataActionType],
                    aliasName: recordDefinition.aliasName,
                    name: recordDefinition.name,
                    dataSource: recordDefinition.aliasName || this.rxDefinitionNameService.getDisplayName(recordDefinition.name),
                    shouldExportData: recordDefinition.shouldExportData,
                    ignoreRuleExecution: false,
                    disabled: recordDefinition.disabled || recordDefinition.selected,
                    selected: recordDefinition.selected,
                    dataFilter: recordDefinition.dataFilter,
                    dataFilterExpression: recordDefinition.dataFilterExpression || null,
                    defaultFilter: recordDefinition.defaultFilter || null,
                    dataFilterColumnExpressionFormControlOptions: {
                        isLabelHidden: true,
                        operators: this.dataFilterColumnExpressionConfigurator.getOperators(),
                        dataDictionary$: this.dataFilterColumnExpressionConfigurator.getDataDictionary(`dataFilterExpression:${recordDefinition.name}`)
                    }
                };
                const bundleFriendlyName = context.bundleFriendlyNamesById[this.rxDefinitionNameService.getBundleId(newRecordDefinition.name)];
                result[bundleFriendlyName] = result[bundleFriendlyName] || [];
                result[bundleFriendlyName].push(newRecordDefinition);
                return result;
            }, {});
            this.recordDefinitions = reduce(recordDefinitionsByBundles, (result, recordDefinitionList, bundleName) => {
                result.push({ name: bundleName, children: recordDefinitionList });
                preSelectedRecordDefinitions = preSelectedRecordDefinitions.concat(recordDefinitionList.filter((recordDefinition) => recordDefinition.selected));
                recordDefinitions = recordDefinitions.concat(recordDefinitionList);
                return result;
            }, []);
            this.addDataForm = new FormGroup({
                globalDataFilter: new FormControl(null),
                isConfigurationDataIncluded: new FormControl(context.deploymentPackageDescriptor.isConfigurationDataIncluded),
                duplicateConfigurationDataActionType: new FormControl([
                    context.deploymentPackageDescriptor.duplicateDataActionTypeForConfigurationData
                ])
            });
            this.recordDefinitionsFormControl.valueChanges
                .pipe(startWith(null), pairwise(), takeUntil(this.destroyed$))
                .subscribe(([prev, next]) => {
                const selectedRows = this.definitionsDataGrid.api.getSelectedRows();
                let newRows;
                if (prev && prev.length !== next.length) {
                    this.definitionsDataGrid.api.refresh().subscribe();
                }
                if (prev) {
                    newRows = differenceBy(next, prev, 'dataSource');
                }
                else {
                    newRows = next.filter((recordDefinition) => !recordDefinition.selected);
                }
                this.definitionsDataGrid.api.setSelectedRows([
                    ...newRows,
                    ...selectedRows.filter((row) => find(next, { dataSource: row.dataSource }))
                ]);
            });
            this.recordDefinitionsFormControl.patchValue(preSelectedRecordDefinitions);
            this.definitionsDataGrid.rowSelectionChanged.pipe(takeUntil(this.destroyed$)).subscribe((selectedRows) => {
                const newDeploymentPackageDescriptor = cloneDeep(context.deploymentPackageDescriptor);
                const singleSelectDataSource = find(selectedRows, 'isSingleSelect');
                this.selectedDataSources = {};
                this.selectedDefinitions = [];
                selectedRows.forEach((row) => {
                    this.selectedDataSources[row.dataSource] = true;
                    this.selectedDefinitions.push(find(recordDefinitions, { dataSource: row.dataSource }));
                });
                if (selectedRows.length > 1 && singleSelectDataSource) {
                    if (this.isSingleSelectDataSourceSelected) {
                        this.rxModalService
                            .alert({
                            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                            modalStyle: RX_MODAL.modalStyles.warning,
                            message: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.single-select-data-source-selected.message', { dataSource: singleSelectDataSource.dataSource })
                        })
                            .then(() => {
                            this.definitionsDataGrid.api.setSelectedRows([singleSelectDataSource]);
                        });
                    }
                    else {
                        this.rxModalService
                            .confirm({
                            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                            modalStyle: RX_MODAL.modalStyles.warning,
                            message: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.single-select-data-source-selection-confirmation.message', { dataSource: singleSelectDataSource.dataSource })
                        })
                            .then((response) => {
                            if (response) {
                                this.isSingleSelectDataSourceSelected = true;
                                this.definitionsDataGrid.api.setSelectedRows([singleSelectDataSource]);
                            }
                            else {
                                this.isSingleSelectDataSourceSelected = false;
                                this.definitionsDataGrid.api.setSelectedRows(reject(selectedRows, singleSelectDataSource));
                            }
                        });
                    }
                }
                else {
                    if (this.isSingleSelectDataSourceSelected && !singleSelectDataSource) {
                        this.isSingleSelectDataSourceSelected = false;
                    }
                    assign(newDeploymentPackageDescriptor, {
                        dataImportOptionsByRecordDefinitionName: this.getDataImportOptionsByRecordDefinitionName(this.selectedDefinitions)
                    });
                    this.rxWizardModalComponent.api.updateContext({
                        deploymentPackageDescriptor: newDeploymentPackageDescriptor,
                        isPackageDataModified: true
                    }, selectedRows.length > 0);
                }
            });
        });
        this.addDataForm.valueChanges
            .pipe(withLatestFrom(this.rxWizardModalComponent.context$), takeUntil(this.destroyed$))
            .subscribe(([value, context]) => {
            const newDeploymentPackageDescriptor = cloneDeep(context.deploymentPackageDescriptor);
            assign(newDeploymentPackageDescriptor, {
                isConfigurationDataIncluded: value.isConfigurationDataIncluded,
                duplicateDataActionTypeForConfigurationData: head(value.duplicateConfigurationDataActionType)
            });
            if (value.globalDataFilter) {
                assign(newDeploymentPackageDescriptor, {
                    dataImportOptionsByRecordDefinitionName: this.getDataImportOptionsByRecordDefinitionName(this.selectedDefinitions)
                });
            }
            this.rxWizardModalComponent.api.updateContext({
                deploymentPackageDescriptor: newDeploymentPackageDescriptor,
                isPackageDataModified: true
            });
        });
        this.recordGridConfig$ = of({
            columns: gridColumns,
            enableRowSelection: RowSelectionMode.Multiple,
            enableFiltering: false,
            recordIdField: 'dataSource',
            styles: 'flex-fill',
            useExternalFiltering: false,
            getRecordDefinition: () => of(gridRecordDefinition),
            getData: () => of({
                data: this.recordDefinitionsFormControl.value,
                totalSize: this.recordDefinitionsFormControl.value.length
            })
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    optionFormatter(recordDefinitionData) {
        return this.rxDefinitionNameService.getDisplayName(recordDefinitionData.dataSource);
    }
    titleFormatter(selectedOptions) {
        const title = chain(selectedOptions).map(this.optionFormatter).join(', ').truncate({ length: 200 }).value();
        return title || this.translateService.instant('com.bmc.arsys.rx.client.common.select.label');
    }
    duplicateDataActionTypesOptionFormatter(option) {
        return AX_ADD_DATA_WIZARD_STEP$1.duplicateDataActionTypes[option];
    }
    openDataFilterColumnExpressionEditor(dataItem, columnField) {
        // To simplify implementation we mark wizard as dirty as soon as we open expression builder.
        this.rxWizardModalComponent.api.markDirty();
        this.rxExpressionEditorService
            .openEditor({
            property: {
                path: `dataFilterExpression:${dataItem.name}`,
                value: dataItem[columnField],
                label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.data-filter.label')
            },
            expressionConfigurator: this.dataFilterColumnExpressionConfigurator,
            legend: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.keyword.label'),
                    icon: 'd-icon-dollar'
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.legend.activity-result.label'),
                    icon: 'd-icon-field_text'
                }
            ]
        })
            .pipe(tap((expression) => {
            dataItem[columnField] = expression.value;
            this.updateDataImportOptionsByRecordDefinitionName(expression.value, dataItem, columnField);
        }))
            .subscribe();
    }
    openGlobalDataFilterExpressionEditor() {
        // To simplify implementation we mark wizard as dirty as soon as we open expression builder.
        this.rxWizardModalComponent.api.markDirty();
        this.rxExpressionEditorService
            .openEditor({
            property: {
                path: 'globalDataFilter',
                value: this.addDataForm.controls.globalDataFilter.value,
                label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.global-data-filter-expression-editor.label')
            },
            expressionConfigurator: this.globalDataFilterExpressionConfigurator,
            legend: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.keyword.label'),
                    icon: 'd-icon-dollar'
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.field.label'),
                    icon: 'd-icon-field_text'
                }
            ]
        })
            .subscribe((expression) => {
            this.addDataForm.controls.globalDataFilter.setValue(expression.value);
        });
    }
    updateDataImportOptionsByRecordDefinitionName(cellValue, recordDefinitionData, columnField) {
        this.rxWizardModalComponent.context$.pipe(take(1)).subscribe((context) => {
            const newDeploymentPackageDescriptor = cloneDeep(context.deploymentPackageDescriptor);
            const recordDefinitions = this.recordDefinitionsFormControl.value;
            const recordDefinition = find(recordDefinitions, { dataSource: recordDefinitionData.dataSource });
            newDeploymentPackageDescriptor.dataImportOptionsByRecordDefinitionName[recordDefinition.name][columnField] =
                isArray(cellValue) ? head(cellValue) : cellValue;
            this.rxWizardModalComponent.api.updateContext({
                deploymentPackageDescriptor: newDeploymentPackageDescriptor
            });
            recordDefinition[columnField] = cellValue;
            this.recordDefinitionsFormControl.setValue(recordDefinitions);
        });
    }
    getAssociationsDataDictionary(recordDefinitions, recordDefinitionName, parentAssociation) {
        const fieldDefinitions = find(recordDefinitions, {
            name: recordDefinitionName
        }).fieldDefinitions;
        return fieldDefinitions.map((fieldDefinition) => ({
            label: fieldDefinition.name,
            icon: 'd-icon-field_text',
            expression: `'recordContext._associations.${parentAssociation.associationDefinition.guid}.${parentAssociation.nodeSide}[0].${fieldDefinition.id}'`
        }));
    }
    getDataImportOptionsByRecordDefinitionName(recordDefinitions) {
        return recordDefinitions.reduce((result, recordDefinition) => {
            var _a, _b;
            const dataImportOptionsByRecordDefinitionName = {
                duplicateDataActionType: head(recordDefinition.duplicateDataActionType),
                ignoreRuleExecution: recordDefinition.ignoreRuleExecution
            };
            dataImportOptionsByRecordDefinitionName.defaultFilter = recordDefinition.defaultFilter;
            dataImportOptionsByRecordDefinitionName.dataFilterExpression = recordDefinition.dataFilterExpression;
            dataImportOptionsByRecordDefinitionName.dataFilterColumnExpressionFormControlOptions =
                recordDefinition.dataFilterColumnExpressionFormControlOptions;
            const combinedExpression = chain([
                recordDefinition.defaultFilter,
                recordDefinition.dataFilterExpression,
                this.addDataForm.controls.globalDataFilter.value
            ])
                .compact()
                .map((expression) => `(${expression})`)
                .join(' AND ')
                .value();
            if (combinedExpression) {
                if ((_a = result[recordDefinition.name]) === null || _a === void 0 ? void 0 : _a.dataFilter) {
                    dataImportOptionsByRecordDefinitionName.dataFilter = `${(_b = result[recordDefinition.name]) === null || _b === void 0 ? void 0 : _b.dataFilter} OR (${combinedExpression})`;
                }
                else {
                    dataImportOptionsByRecordDefinitionName.dataFilter = combinedExpression;
                }
            }
            result[recordDefinition.name] = dataImportOptionsByRecordDefinitionName;
            return result;
        }, {});
    }
}
/** @nocollapse */ AddBundleContentDataWizardStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddBundleContentDataWizardStepComponent, deps: [{ token: i0.Injector }, { token: i2.RxDefinitionNameService }, { token: i2$1.RxExpressionEditorService }, { token: i3$1.RxModalService }, { token: i1$5.RxRecordDefinitionCacheService }, { token: i5.RxRecordGridUtilsService }, { token: i2$1.RxWizardModalComponent }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ AddBundleContentDataWizardStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AddBundleContentDataWizardStepComponent, selector: "ax-add-bundle-content-data-wizard-step", inputs: { options: "options" }, viewQueries: [{ propertyName: "definitionsDataGrid", first: true, predicate: ["definitionsDataGrid"], descendants: true, static: true }, { propertyName: "recordNameCellTemplate", first: true, predicate: ["recordNameCellTemplate"], descendants: true, static: true }, { propertyName: "dataFilterCellTemplate", first: true, predicate: ["dataFilterCellTemplate"], descendants: true, static: true }, { propertyName: "ignoreRulesCellTemplate", first: true, predicate: ["ignoreRulesCellTemplate"], descendants: true, static: true }, { propertyName: "duplicateDataActionTypeCellTemplate", first: true, predicate: ["duplicateDataActionTypeCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"d-flex justify-content-between\">\n  <h5 class=\"mt-0\">\n    {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.title' | translate }}\n    <span\n      class=\"d-icon-right-question_circle_o\"\n      [adaptPopover]=\"tooltipContentTemplate\"\n      placement=\"bottom\"\n      appendToBody=\"true\"\n      maxWidth=\"400\"\n    ></span>\n  </h5>\n  <div>\n    {{ options?.countTitle | translate: { count: selectedDefinitions.length } }}\n  </div>\n</div>\n\n<ng-template #tooltipContentTemplate>\n  <div\n    [innerHTML]=\"'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-bundle-content-data.tooltip' | translate\"\n  ></div>\n</ng-template>\n\n<div class=\"mb-3\">{{ options?.descriptionTitle | translate }}</div>\n\n<ng-container [formGroup]=\"addDataForm\">\n  <div class=\"d-flex mb-3 justify-content-between\">\n    <adapt-rx-select\n      [formControl]=\"recordDefinitionsFormControl\"\n      [options]=\"recordDefinitions\"\n      [optionFormatter]=\"optionFormatter\"\n      [multiple]=\"true\"\n      [selectAllButton]=\"true\"\n      [deselectAllButton]=\"true\"\n      [enableFilter]=\"true\"\n      [titleFormatter]=\"titleFormatter\"\n      class=\"add-data-record-definitions-select\"\n    >\n    </adapt-rx-select>\n\n    <rx-expression-form-control\n      class=\"d-flex ml-4\"\n      *ngIf=\"options?.showGlobalFilterExpressionEditor\"\n      [options]=\"globalDataFilterExpressionFormControlOptions\"\n      (events)=\"openGlobalDataFilterExpressionEditor()\"\n      [formControl]=\"addDataForm.controls.globalDataFilter\"\n    >\n    </rx-expression-form-control>\n  </div>\n\n  <rx-record-grid class=\"mb-3\" [config]=\"recordGridConfig$\" #definitionsDataGrid></rx-record-grid>\n\n  <div class=\"d-flex pb-3\">\n    <adapt-rx-checkbox\n      class=\"add-data-is-configuration-data-included-checkbox pr-3\"\n      [label]=\"\n        'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.include-configuration-data-in-the-package.label'\n          | translate\n      \"\n      formControlName=\"isConfigurationDataIncluded\"\n    ></adapt-rx-checkbox>\n\n    <adapt-rx-select\n      *ngIf=\"addDataForm.controls.isConfigurationDataIncluded.value\"\n      class=\"flex-grow-1\"\n      appendToBody=\"true\"\n      [options]=\"duplicateConfigurationDataActionTypeOptions\"\n      [optionFormatter]=\"duplicateDataActionTypesOptionFormatter\"\n      formControlName=\"duplicateConfigurationDataActionType\"\n    ></adapt-rx-select>\n  </div>\n</ng-container>\n\n<ng-template #recordNameCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  {{ dataItem[column.field] | rxDefinitionNamePipe }}\n</ng-template>\n\n<ng-template #dataFilterCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <div>\n    <rx-expression-form-control\n      [options]=\"dataItem.dataFilterColumnExpressionFormControlOptions\"\n      (events)=\"openDataFilterColumnExpressionEditor(dataItem, column.field)\"\n      [(ngModel)]=\"dataItem[column.field]\"\n      [disabled]=\"!selectedDataSources[dataItem.dataSource]\"\n    >\n    </rx-expression-form-control>\n  </div>\n</ng-template>\n\n<ng-template #ignoreRulesCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <div>\n    <adapt-rx-switch\n      [(ngModel)]=\"dataItem[column.field]\"\n      (ngModelChange)=\"updateDataImportOptionsByRecordDefinitionName($event, dataItem, column.field)\"\n      [disabled]=\"!selectedDataSources[dataItem.dataSource]\"\n    ></adapt-rx-switch>\n  </div>\n</ng-template>\n\n<ng-template #duplicateDataActionTypeCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <div>\n    <adapt-rx-select\n      appendToBody=\"true\"\n      [options]=\"duplicateDataActionTypeOptions\"\n      [optionFormatter]=\"duplicateDataActionTypesOptionFormatter\"\n      [(ngModel)]=\"dataItem[column.field]\"\n      (ngModelChange)=\"updateDataImportOptionsByRecordDefinitionName($event, dataItem, column.field)\"\n      [disabled]=\"!selectedDataSources[dataItem.dataSource]\"\n    >\n    </adapt-rx-select>\n  </div>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%}rx-record-grid{height:100%}.add-data-record-definitions-select,.add-data-is-configuration-data-included-checkbox{width:400px}\n"], components: [{ type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i2$1.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }, { type: i5.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i1.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i1.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }], directives: [{ type: i1.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }, { type: i4.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i4.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i3.TranslatePipe, "rxDefinitionNamePipe": i2.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddBundleContentDataWizardStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-add-bundle-content-data-wizard-step',
                    templateUrl: 'add-bundle-content-data-wizard-step.component.html',
                    styleUrls: ['./add-bundle-content-data-wizard-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i2.RxDefinitionNameService }, { type: i2$1.RxExpressionEditorService }, { type: i3$1.RxModalService }, { type: i1$5.RxRecordDefinitionCacheService }, { type: i5.RxRecordGridUtilsService }, { type: i2$1.RxWizardModalComponent }, { type: i3.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }], definitionsDataGrid: [{
                type: ViewChild,
                args: ['definitionsDataGrid', { static: true }]
            }], recordNameCellTemplate: [{
                type: ViewChild,
                args: ['recordNameCellTemplate', { static: true }]
            }], dataFilterCellTemplate: [{
                type: ViewChild,
                args: ['dataFilterCellTemplate', { static: true }]
            }], ignoreRulesCellTemplate: [{
                type: ViewChild,
                args: ['ignoreRulesCellTemplate', { static: true }]
            }], duplicateDataActionTypeCellTemplate: [{
                type: ViewChild,
                args: ['duplicateDataActionTypeCellTemplate', { static: true }]
            }] } });

const AX_ADD_DATA_WIZARD_STEP = {
    duplicateDataActionTypes: {
        THROW_ERROR: 'Ignore',
        CREATE_NEW_RECORD: 'Create New',
        REPLACE: 'Overwrite',
        MERGE: 'Merge'
    }
};

class DataFilterColumnExpressionConfiguratorClass extends RxExpressionConfigurator {
    constructor(injector) {
        super();
        this.injector = injector;
        this.translateService = this.injector.get(TranslateService);
        this.commonDataDictionary$ = of([
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                children: [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-date.title'),
                        icon: 'd-icon-dollar',
                        expression: '$DATE$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-date-time.title'),
                        icon: 'd-icon-dollar',
                        expression: '$TIMESTAMP$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-groups.title'),
                        icon: 'd-icon-dollar',
                        expression: '$GROUPS$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-group-ids.title'),
                        icon: 'd-icon-dollar',
                        expression: '$GROUPIDS$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-roles.title'),
                        icon: 'd-icon-dollar',
                        expression: '$ROLES$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-time.title'),
                        icon: 'd-icon-dollar',
                        expression: '$TIME$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-user.title'),
                        icon: 'd-icon-dollar',
                        expression: '$USER$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-user-locale.title'),
                        icon: 'd-icon-dollar',
                        expression: '$LOCALE$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-week-day.title'),
                        icon: 'd-icon-dollar',
                        expression: '$WEEKDAY$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.null.title'),
                        icon: 'd-icon-dollar',
                        expression: '$NULL$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.server-url.title'),
                        icon: 'd-icon-dollar',
                        expression: '$SERVERURL$'
                    }
                ]
            }
        ]);
    }
}

class GlobalDataFilterExpressionConfiguratorClass extends RxExpressionConfigurator {
    constructor(injector) {
        super();
        this.injector = injector;
        this.translateService = this.injector.get(TranslateService);
        this.commonDataDictionary$ = of([
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.labe'),
                children: [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-date.title'),
                        icon: 'd-icon-dollar',
                        expression: '$DATE$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-date-time.title'),
                        icon: 'd-icon-dollar',
                        expression: '$TIMESTAMP$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-groups.title'),
                        icon: 'd-icon-dollar',
                        expression: '$GROUPS$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-group-ids.title'),
                        icon: 'd-icon-dollar',
                        expression: '$GROUPIDS$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-roles.title'),
                        icon: 'd-icon-dollar',
                        expression: '$ROLES$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-time.title'),
                        icon: 'd-icon-dollar',
                        expression: '$TIME$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-user.title'),
                        icon: 'd-icon-dollar',
                        expression: '$USER$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-user-locale.title'),
                        icon: 'd-icon-dollar',
                        expression: '$LOCALE$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-week-day.title'),
                        icon: 'd-icon-dollar',
                        expression: '$WEEKDAY$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.null.title'),
                        icon: 'd-icon-dollar',
                        expression: '$NULL$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.server-url.title'),
                        icon: 'd-icon-dollar',
                        expression: '$SERVERURL$'
                    }
                ]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.common-core-fields.title'),
                expanded: true,
                children: RX_RECORD_DEFINITION.coreFields.map((field) => ({
                    label: field.name,
                    icon: 'd-icon-field_text',
                    expression: `'${field.id}'`
                }))
            }
        ]);
    }
}

class AddDataWizardStepComponent {
    constructor(injector, rxDefinitionNameService, rxExpressionEditorService, rxRecordDefinitionCacheService, rxRecordGridUtilsService, rxWizardModalComponent, translateService) {
        this.injector = injector;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxRecordGridUtilsService = rxRecordGridUtilsService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.duplicateDataActionTypeOptions = keys(AX_ADD_DATA_WIZARD_STEP.duplicateDataActionTypes);
        this.recordDefinitions = [];
        this.duplicateConfigurationDataActionTypeOptions = chain(AX_ADD_DATA_WIZARD_STEP.duplicateDataActionTypes)
            .pick(['THROW_ERROR', 'REPLACE'])
            .keys()
            .value();
        this.destroyed$ = new ReplaySubject(1);
        this.optionFormatter = this.optionFormatter.bind(this);
    }
    isDeleteButtonDisabled() {
        let isDeleteButtonDisabled = true;
        if (this.definitionsDataGrid) {
            const selectedRows = this.definitionsDataGrid.api.getSelectedRows();
            isDeleteButtonDisabled = !selectedRows.length || Boolean(find(selectedRows, 'shouldExportData'));
        }
        return isDeleteButtonDisabled;
    }
    ngOnInit() {
        this.dataFilterColumnExpressionConfigurator = new DataFilterColumnExpressionConfiguratorClass(this.injector);
        this.globalDataFilterExpressionConfigurator = new GlobalDataFilterExpressionConfiguratorClass(this.injector);
        this.globalDataFilterExpressionConfigurator.configureForProperty({
            propertyPath: 'globalDataFilter',
            operators: this.globalDataFilterExpressionConfigurator.getOperatorRowsByGroup(ExpressionOperatorGroup.All),
            dataDictionary$: this.globalDataFilterExpressionConfigurator.commonDataDictionary$
        });
        this.globalDataFilterExpressionFormControlOptions = {
            isLabelHidden: true,
            dataDictionary$: this.globalDataFilterExpressionConfigurator.getDataDictionary('globalDataFilter'),
            operators: this.globalDataFilterExpressionConfigurator.getOperators(),
            clickToBuildExpressionLabel: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.global-data-filter.click-to-build-expression.label')
        };
        const gridColumns = [
            {
                fieldId: 'dataSource',
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.data-source.label'),
                wrapText: true
            },
            {
                fieldId: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.name.label'),
                wrapText: true,
                visible: false,
                cellTemplate: this.recordNameCellTemplate
            },
            {
                fieldId: 'aliasName',
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.alias-name.label'),
                visible: false
            },
            {
                fieldId: 'dataFilterExpression',
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.data-filter.label'),
                cellTemplate: this.dataFilterCellTemplate
            },
            {
                fieldId: 'dataFilterColumnExpressionFormControlOptions',
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.data-filter.label'),
                visible: false
            },
            {
                fieldId: 'ignoreRuleExecution',
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.ignore-rules.label'),
                cellTemplate: this.ignoreRulesCellTemplate
            },
            {
                fieldId: 'duplicateDataActionType',
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.duplicates.label'),
                cellTemplate: this.duplicateDataActionTypeCellTemplate
            }
        ].filter((column) => includes(this.options.gridConfig.columns, column.fieldId));
        const gridRecordDefinition = {
            fieldDefinitions: [
                {
                    id: 'dataSource',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'aliasName',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'dataFilterExpression',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'dataFilterColumnExpressionFormControlOptions',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.object
                },
                {
                    id: 'ignoreRuleExecution',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'duplicateDataActionType',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ].filter((definition) => includes(this.options.gridConfig.columns, definition.id))
        };
        this.rxWizardModalComponent.context$.pipe(take(1)).subscribe((context) => {
            context.cache.recordDefinitions.forEach((recordDefinition) => {
                this.dataFilterColumnExpressionConfigurator.configureForProperty({
                    propertyPath: `dataFilterExpression:${recordDefinition.name}`,
                    operators: this.dataFilterColumnExpressionConfigurator.getOperatorRowsByGroup(ExpressionOperatorGroup.All),
                    dataDictionary$: this.dataFilterColumnExpressionConfigurator.commonDataDictionary$.pipe(switchMap((commonDataDictionary) => this.rxRecordGridUtilsService.getAssociationDescriptors(recordDefinition.name).pipe(switchMap((associationDescriptors) => forkJoin([
                        this.rxRecordDefinitionCacheService.getRecordDefinition(recordDefinition.name),
                        ...associationDescriptors.map((associationDescriptor) => this.rxRecordDefinitionCacheService.getRecordDefinition(associationDescriptor.recordDefinitionName))
                    ]).pipe(map((definitions) => [
                        commonDataDictionary[0],
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.definition-fields.title', {
                                definitionName: this.rxDefinitionNameService.getDisplayName(recordDefinition.name)
                            }),
                            expanded: true,
                            children: [
                                ...chain(definitions)
                                    .find({ name: recordDefinition.name })
                                    .get('fieldDefinitions')
                                    .map((fieldDefinition) => ({
                                    label: fieldDefinition.name,
                                    icon: 'd-icon-field_text',
                                    expression: `'${fieldDefinition.id}'`
                                }))
                                    .value(),
                                isEmpty(associationDescriptors)
                                    ? []
                                    : {
                                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.expression-editor.data-dictionary.values.record-definition-associations.title'),
                                        children: associationDescriptors.map((associationDescriptor) => ({
                                            label: `${this.rxDefinitionNameService.getDisplayName(associationDescriptor.recordDefinitionName)} (${associationDescriptor.label})`,
                                            children: this.getAssociationsDataDictionary(definitions, associationDescriptor.recordDefinitionName, associationDescriptor)
                                        }))
                                    }
                            ]
                        }
                    ]))))))
                });
            });
            const recordDefinitions = [];
            this.recordDefinitions = context.cache.recordDefinitions
                .filter((recordDefinition) => recordDefinition.type !== RX_RECORD_DEFINITION.externalRecordDefinitionTypes.custom)
                .map((recordDefinition) => {
                const newRecordDefinition = {
                    duplicateDataActionType: [this.options.gridConfig.defaultDuplicateDataActionType],
                    name: recordDefinition.name,
                    dataSource: recordDefinition.aliasName || this.rxDefinitionNameService.getDisplayName(recordDefinition.name),
                    shouldExportData: recordDefinition.shouldExportData,
                    ignoreRuleExecution: false,
                    disabled: recordDefinition.shouldExportData,
                    selected: recordDefinition.shouldExportData
                };
                if (newRecordDefinition.selected) {
                    recordDefinitions.push(newRecordDefinition);
                }
                return newRecordDefinition;
            });
            this.addDataForm = new FormGroup({
                globalDataFilter: new FormControl(null),
                isConfigurationDataIncluded: new FormControl(context.deploymentPackageDescriptor.isConfigurationDataIncluded),
                duplicateConfigurationDataActionType: new FormControl([
                    context.deploymentPackageDescriptor.duplicateDataActionTypeForConfigurationData
                ]),
                recordDefinitions: new FormControl(recordDefinitions)
            });
            const newDeploymentPackageDescriptor = cloneDeep(context.deploymentPackageDescriptor);
            assign(newDeploymentPackageDescriptor, {
                dataImportOptionsByRecordDefinitionName: this.getDataImportOptionsByRecordDefinitionName(recordDefinitions)
            });
            this.rxWizardModalComponent.api.updateContext({
                deploymentPackageDescriptor: newDeploymentPackageDescriptor
            }, false);
        });
        this.addDataForm.valueChanges
            .pipe(withLatestFrom(this.rxWizardModalComponent.context$), takeUntil(this.destroyed$))
            .subscribe(([value, context]) => {
            const newDeploymentPackageDescriptor = cloneDeep(context.deploymentPackageDescriptor);
            const isConfigurationDataIncluded = newDeploymentPackageDescriptor.isConfigurationDataIncluded;
            assign(newDeploymentPackageDescriptor, {
                isConfigurationDataIncluded: value.isConfigurationDataIncluded,
                duplicateDataActionTypeForConfigurationData: head(value.duplicateConfigurationDataActionType),
                dataImportOptionsByRecordDefinitionName: this.getDataImportOptionsByRecordDefinitionName(value.recordDefinitions)
            });
            this.rxWizardModalComponent.api.updateContext({
                deploymentPackageDescriptor: newDeploymentPackageDescriptor,
                isPackageDataModified: true
            });
            if (isConfigurationDataIncluded === value.isConfigurationDataIncluded) {
                this.definitionsDataGrid.api.refresh().subscribe();
            }
        });
        this.recordGridConfig$ = of({
            columns: gridColumns,
            enableRowSelection: RowSelectionMode.Multiple,
            enableFiltering: false,
            recordIdField: 'dataSource',
            styles: 'flex-fill',
            useExternalFiltering: false,
            actionButtons: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.remove.label'),
                    style: 'tertiary',
                    iconCls: 'trash',
                    disabled: this.isDeleteButtonDisabled.bind(this),
                    actions: [
                        {
                            name: this.deleteDefinitionsDataFromSelection.bind(this)
                        }
                    ]
                }
            ],
            getRecordDefinition: () => of(gridRecordDefinition),
            getData: () => of({
                data: this.addDataForm.controls.recordDefinitions.value,
                totalSize: this.addDataForm.controls.recordDefinitions.value.length
            })
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    optionFormatter(recordDefinitionData) {
        return recordDefinitionData.dataSource;
    }
    duplicateDataActionTypesOptionFormatter(option) {
        return AX_ADD_DATA_WIZARD_STEP.duplicateDataActionTypes[option];
    }
    openDataFilterColumnExpressionEditor(dataItem, columnField) {
        this.rxExpressionEditorService
            .openEditor({
            property: {
                path: `dataFilterExpression:${dataItem.name}`,
                value: dataItem[columnField],
                label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.data-filter.label')
            },
            expressionConfigurator: this.dataFilterColumnExpressionConfigurator,
            legend: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.keyword.label'),
                    icon: 'd-icon-dollar'
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.legend.activity-result.label'),
                    icon: 'd-icon-field_text'
                }
            ]
        })
            .subscribe((expression) => {
            const recordDefinitions = this.addDataForm.controls.recordDefinitions.value;
            const recordDefinition = find(recordDefinitions, { name: dataItem.name });
            recordDefinition.dataFilterExpression = expression.value;
            this.addDataForm.controls.recordDefinitions.setValue(recordDefinitions);
        });
    }
    openGlobalDataFilterExpressionEditor() {
        this.rxExpressionEditorService
            .openEditor({
            property: {
                path: 'globalDataFilter',
                value: this.addDataForm.controls.globalDataFilter.value,
                label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.global-data-filter-expression-editor.label')
            },
            expressionConfigurator: this.globalDataFilterExpressionConfigurator,
            legend: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.keyword.label'),
                    icon: 'd-icon-dollar'
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.field.label'),
                    icon: 'd-icon-field_text'
                }
            ]
        })
            .subscribe((expression) => {
            this.addDataForm.controls.globalDataFilter.setValue(expression.value);
        });
    }
    deleteDefinitionsDataFromSelection() {
        const selectedRows = this.definitionsDataGrid.api.getSelectedRows();
        this.addDataForm.controls.recordDefinitions.patchValue(this.addDataForm.controls.recordDefinitions.value.filter((recordDefinition) => !find(selectedRows, { dataSource: recordDefinition.dataSource })));
    }
    updateDataImportOptionsByRecordDefinitionName(cellValue, recordDefinitionName, optionName) {
        const newDeploymentPackageDescriptor = cloneDeep(this.context.deploymentPackageDescriptor);
        newDeploymentPackageDescriptor.dataImportOptionsByRecordDefinitionName[recordDefinitionName][optionName] = isArray(cellValue)
            ? head(cellValue)
            : cellValue;
        this.rxWizardModalComponent.api.updateContext({
            deploymentPackageDescriptor: newDeploymentPackageDescriptor
        });
    }
    getAssociationsDataDictionary(recordDefinitions, recordDefinitionName, parentAssociation) {
        const fieldDefinitions = find(recordDefinitions, {
            name: recordDefinitionName
        }).fieldDefinitions;
        return fieldDefinitions.map((fieldDefinition) => ({
            label: fieldDefinition.name,
            icon: 'd-icon-field_text',
            expression: `'recordContext._associations.${parentAssociation.associationDefinition.guid}.${parentAssociation.nodeSide}[0].${fieldDefinition.id}'`
        }));
    }
    getDataImportOptionsByRecordDefinitionName(recordDefinitions) {
        return recordDefinitions.reduce((result, recordDefinition) => {
            const dataImportOptionsByRecordDefinitionName = {
                duplicateDataActionType: head(recordDefinition.duplicateDataActionType),
                ignoreRuleExecution: recordDefinition.ignoreRuleExecution
            };
            result[recordDefinition.name] = dataImportOptionsByRecordDefinitionName;
            return result;
        }, {});
    }
}
/** @nocollapse */ AddDataWizardStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddDataWizardStepComponent, deps: [{ token: i0.Injector }, { token: i2.RxDefinitionNameService }, { token: i2$1.RxExpressionEditorService }, { token: i1$5.RxRecordDefinitionCacheService }, { token: i5.RxRecordGridUtilsService }, { token: i2$1.RxWizardModalComponent }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ AddDataWizardStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AddDataWizardStepComponent, selector: "ax-add-data-wizard-step", inputs: { context: "context", options: "options" }, viewQueries: [{ propertyName: "definitionsDataGrid", first: true, predicate: ["definitionsDataGrid"], descendants: true }, { propertyName: "recordNameCellTemplate", first: true, predicate: ["recordNameCellTemplate"], descendants: true, static: true }, { propertyName: "dataFilterCellTemplate", first: true, predicate: ["dataFilterCellTemplate"], descendants: true, static: true }, { propertyName: "ignoreRulesCellTemplate", first: true, predicate: ["ignoreRulesCellTemplate"], descendants: true, static: true }, { propertyName: "duplicateDataActionTypeCellTemplate", first: true, predicate: ["duplicateDataActionTypeCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"d-flex justify-content-between\">\n  <h5 class=\"mt-0\">{{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.title' | translate }}</h5>\n  <div>\n    {{ options?.countTitle | translate: { count: addDataForm?.controls?.recordDefinitions?.value?.length } }}\n  </div>\n</div>\n\n<div class=\"mb-3\">{{ options?.descriptionTitle | translate }}</div>\n\n<ng-container [formGroup]=\"addDataForm\">\n  <div class=\"d-flex mb-3 justify-content-between\">\n    <adapt-rx-select\n      [formControl]=\"addDataForm.controls.recordDefinitions\"\n      [options]=\"recordDefinitions\"\n      [optionFormatter]=\"optionFormatter\"\n      [multiple]=\"true\"\n      [selectAllButton]=\"true\"\n      [deselectAllButton]=\"true\"\n      [enableFilter]=\"true\"\n      class=\"add-data-record-definitions-select\"\n    >\n    </adapt-rx-select>\n\n    <rx-expression-form-control\n      class=\"d-flex\"\n      *ngIf=\"options?.showGlobalFilterExpressionEditor\"\n      [options]=\"globalDataFilterExpressionFormControlOptions\"\n      (events)=\"openGlobalDataFilterExpressionEditor()\"\n      [formControl]=\"addDataForm.controls.globalDataFilter\"\n    >\n    </rx-expression-form-control>\n  </div>\n\n  <rx-record-grid class=\"mb-3\" [config]=\"recordGridConfig$\" #definitionsDataGrid></rx-record-grid>\n\n  <div class=\"d-flex pb-3\">\n    <adapt-rx-checkbox\n      class=\"add-data-is-configuration-data-included-checkbox pr-3\"\n      [label]=\"\n        'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.include-configuration-data-in-the-package.label'\n          | translate\n      \"\n      formControlName=\"isConfigurationDataIncluded\"\n    ></adapt-rx-checkbox>\n\n    <adapt-rx-select\n      *ngIf=\"addDataForm.controls.isConfigurationDataIncluded.value\"\n      class=\"flex-grow-1\"\n      appendToBody=\"true\"\n      [options]=\"duplicateConfigurationDataActionTypeOptions\"\n      [optionFormatter]=\"duplicateDataActionTypesOptionFormatter\"\n      formControlName=\"duplicateConfigurationDataActionType\"\n    ></adapt-rx-select>\n  </div>\n</ng-container>\n\n<ng-template #recordNameCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  {{ dataItem[column.field] | rxDefinitionNamePipe }}\n</ng-template>\n\n<ng-template #dataFilterCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <div>\n    <rx-expression-form-control\n      [options]=\"dataItem.dataFilterColumnExpressionFormControlOptions\"\n      (events)=\"openDataFilterColumnExpressionEditor(dataItem, column.field)\"\n      [(ngModel)]=\"dataItem[column.field]\"\n    >\n    </rx-expression-form-control>\n  </div>\n</ng-template>\n\n<ng-template #ignoreRulesCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <div>\n    <adapt-rx-switch\n      [(ngModel)]=\"dataItem[column.field]\"\n      (ngModelChange)=\"updateDataImportOptionsByRecordDefinitionName($event, dataItem.name, 'ignoreRuleExecution')\"\n    ></adapt-rx-switch>\n  </div>\n</ng-template>\n\n<ng-template #duplicateDataActionTypeCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <div>\n    <adapt-rx-select\n      appendToBody=\"true\"\n      [options]=\"duplicateDataActionTypeOptions\"\n      [optionFormatter]=\"duplicateDataActionTypesOptionFormatter\"\n      [(ngModel)]=\"dataItem[column.field]\"\n      (ngModelChange)=\"updateDataImportOptionsByRecordDefinitionName($event, dataItem.name, 'duplicateDataActionType')\"\n    >\n    </adapt-rx-select>\n  </div>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%}rx-record-grid{height:100%}.add-data-record-definitions-select,.add-data-is-configuration-data-included-checkbox{width:400px}\n"], components: [{ type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i2$1.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }, { type: i5.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i1.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i1.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }], directives: [{ type: i4.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i4.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i3.TranslatePipe, "rxDefinitionNamePipe": i2.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddDataWizardStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-add-data-wizard-step',
                    templateUrl: 'add-data-wizard-step.component.html',
                    styleUrls: ['./add-data-wizard-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i2.RxDefinitionNameService }, { type: i2$1.RxExpressionEditorService }, { type: i1$5.RxRecordDefinitionCacheService }, { type: i5.RxRecordGridUtilsService }, { type: i2$1.RxWizardModalComponent }, { type: i3.TranslateService }]; }, propDecorators: { context: [{
                type: Input
            }], options: [{
                type: Input
            }], definitionsDataGrid: [{
                type: ViewChild,
                args: ['definitionsDataGrid']
            }], recordNameCellTemplate: [{
                type: ViewChild,
                args: ['recordNameCellTemplate', { static: true }]
            }], dataFilterCellTemplate: [{
                type: ViewChild,
                args: ['dataFilterCellTemplate', { static: true }]
            }], ignoreRulesCellTemplate: [{
                type: ViewChild,
                args: ['ignoreRulesCellTemplate', { static: true }]
            }], duplicateDataActionTypeCellTemplate: [{
                type: ViewChild,
                args: ['duplicateDataActionTypeCellTemplate', { static: true }]
            }] } });

class DownloadWizardStepComponent {
    constructor(rxWizardModalComponent, axBundleDeploymentService) {
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.axBundleDeploymentService = axBundleDeploymentService;
    }
    download() {
        this.rxWizardModalComponent.context$
            .pipe(take(1), switchMap((context) => this.axBundleDeploymentService.downloadContentPackage(context.deploymentPackageDescriptor.id, context.packageGuid)))
            .subscribe();
    }
}
/** @nocollapse */ DownloadWizardStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DownloadWizardStepComponent, deps: [{ token: i2$1.RxWizardModalComponent }, { token: AxBundleDeploymentService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ DownloadWizardStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DownloadWizardStepComponent, selector: "ax-download-wizard-step", ngImport: i0, template: "<h5 class=\"mt-0\">{{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.download.title' | translate }}</h5>\n\n<button adapt-button type=\"button\" btn-type=\"primary\" (click)=\"download()\" rx-id=\"download-button\">\n  {{ 'com.bmc.arsys.rx.client.common.download.label' | translate }}\n</button>\n", components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DownloadWizardStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-download-wizard-step',
                    templateUrl: 'download-wizard-step.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i2$1.RxWizardModalComponent }, { type: AxBundleDeploymentService }]; } });

class OptionsWizardStepComponent {
    constructor(rxWizardModalComponent, translateService) {
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.versionRegexp = /^((\d+\.\d+)(\.\d+)?)(.*)$/;
        this.isApplication$ = this.rxWizardModalComponent.context$.pipe(take(1), pluck('bundleDetails', 'isApplication'));
        this.bundlesList$ = this.rxWizardModalComponent.context$.pipe(take(1), map((context) => context.bundleDescriptors
            .sort((a, b) => a.friendlyName.localeCompare(b.friendlyName))
            .reduce((result, bundleDescriptor) => {
            if (!includes([
                RX_APPLICATION.standardlib,
                RX_APPLICATION.innovationStudioBundleId,
                RX_APPLICATION.platformBundleId,
                context.bundleDetails.id
            ], bundleDescriptor.id)) {
                result.push(Object.assign({}, bundleDescriptor));
            }
            return result;
        }, [])), shareReplay(1));
        this.destroyed$ = new ReplaySubject(1);
        this.versionIncrementValidator = (fromVersionControl) => (control) => {
            let isValidateIncrementation = true;
            if ((fromVersionControl === null || fromVersionControl === void 0 ? void 0 : fromVersionControl.value) && control.value && this.versionRegexp.test(control.value)) {
                isValidateIncrementation = this.isValidateIncrementation(fromVersionControl.value, control.value);
            }
            return isValidateIncrementation
                ? null
                : {
                    invalidVersion: {
                        value: control.value,
                        message: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.options.version-increment.error.message')
                    }
                };
        };
    }
    ngOnInit() {
        combineLatest([this.bundlesList$, this.rxWizardModalComponent.context$])
            .pipe(take(1))
            .subscribe(([bundlesList, context]) => {
            var _a, _b, _c, _d, _e, _f;
            const dependentBundles = bundlesList.filter((bundleDescriptor) => some(context.bundleDetails.dependentBundles, { id: bundleDescriptor.id }));
            const optionsFormGroup = {};
            if ((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.bundleUpdateFromVersion) {
                optionsFormGroup.bundleUpdateFromVersion = new FormControl(context.deploymentPackageDescriptor.bundleUpdateFromVersion);
            }
            if ((_d = (_c = this.options) === null || _c === void 0 ? void 0 : _c.fields) === null || _d === void 0 ? void 0 : _d.customPackageName) {
                optionsFormGroup.customPackageName = new FormControl(context.deploymentPackageDescriptor.customPackageName);
            }
            Object.assign(optionsFormGroup, {
                id: new FormControl(context.bundleDetails.id),
                friendlyName: new FormControl(context.deploymentPackageDescriptor.friendlyName, [Validators.required]),
                version: new FormControl(context.deploymentPackageDescriptor.version, compact([
                    Validators.required,
                    Validators.pattern(this.versionRegexp),
                    ((_f = (_e = this.options) === null || _e === void 0 ? void 0 : _e.fields) === null || _f === void 0 ? void 0 : _f.bundleUpdateFromVersion)
                        ? this.versionIncrementValidator(optionsFormGroup.bundleUpdateFromVersion)
                        : null
                ])),
                description: new FormControl(context.deploymentPackageDescriptor.description, [Validators.required]),
                dependentBundles: new FormControl(dependentBundles)
            });
            this.optionsForm = new FormGroup(optionsFormGroup);
            const newDeploymentPackageDescriptor = cloneDeep(context.deploymentPackageDescriptor);
            assign(newDeploymentPackageDescriptor, {
                friendlyName: context.bundleDetails.friendlyName,
                version: context.bundleDetails.version,
                description: context.bundleDetails.description,
                id: context.bundleDetails.id,
                dependentBundles: dependentBundles.map((dependentBundleDetails) => ({
                    id: dependentBundleDetails.id,
                    name: dependentBundleDetails.friendlyName,
                    version: dependentBundleDetails.version
                }))
            });
            this.rxWizardModalComponent.api.updateContext({
                deploymentPackageDescriptor: newDeploymentPackageDescriptor
            }, false);
        });
        this.optionsForm.valueChanges
            .pipe(withLatestFrom(this.rxWizardModalComponent.context$), takeUntil(this.destroyed$))
            .subscribe(([value, context]) => {
            const newDeploymentPackageDescriptor = cloneDeep(context.deploymentPackageDescriptor);
            assign(newDeploymentPackageDescriptor, value);
            newDeploymentPackageDescriptor.dependentBundles = value.dependentBundles.map((dependentBundleDetails) => ({
                id: dependentBundleDetails.id,
                name: dependentBundleDetails.friendlyName,
                version: dependentBundleDetails.version
            }));
            this.rxWizardModalComponent.api.updateContext({
                deploymentPackageDescriptor: newDeploymentPackageDescriptor
            });
            if (this.optionsForm.valid) {
                this.rxWizardModalComponent.api.enableNextButton();
            }
            else {
                this.rxWizardModalComponent.api.disableNextButton();
            }
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    optionFormatter(field) {
        return `${field.friendlyName}, ${field.version}`;
    }
    isValidateIncrementation(currentVersion, newVersion) {
        let isUpdateToVersionIncrementedCorrectly = false;
        const newVersionBase = this.getBaseVersion(newVersion);
        const currentVersionBase = this.getBaseVersion(currentVersion);
        if (newVersionBase) {
            const newVersionBaseProperties = newVersionBase.split('.');
            const currentVersionBaseProperties = currentVersionBase.split('.');
            // check if the last digit incremented correctly
            // e.g. 1.1 > 1.2
            //      1.1 > 1.1.1
            //      1.1.0 > 1.1.1
            const isTheLastDigitNotDecremented = newVersionBaseProperties.length === currentVersionBaseProperties.length
                ? +last(newVersionBaseProperties) >= +last(currentVersionBaseProperties)
                : +last(initial(newVersionBaseProperties)) >= +last(currentVersionBaseProperties);
            // create regular expression based on current version
            // only the last and additional component can be changed
            // e.g. 1.1.0 > 1.1.n or 1.1.n-SNAPSHOT
            //      1.0 > 1.n or 1.n-SNAPSHOT or 1.1.n or 1.1.n-SNAPSHOT
            const correctRegExpGroup = currentVersionBaseProperties.length === 3 ? 2 : 3;
            const regExpSuffix = correctRegExpGroup === 2 ? '(\\.\\d+)' : '(\\.\\d+)(\\.\\d+)?';
            const updateToVersionRegExp = new RegExp('^' + currentVersionBase.match(this.versionRegexp)[correctRegExpGroup] + regExpSuffix + '$');
            isUpdateToVersionIncrementedCorrectly =
                updateToVersionRegExp.test(newVersionBase) && isTheLastDigitNotDecremented;
        }
        return isUpdateToVersionIncrementedCorrectly;
    }
    // get version without the optional qualifier, e.g. 1.1.0-SNAPSHOT > 1.1.0
    getBaseVersion(version) {
        const baseVersion = version.match(this.versionRegexp);
        return baseVersion ? baseVersion[1] : null;
    }
}
/** @nocollapse */ OptionsWizardStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionsWizardStepComponent, deps: [{ token: i2$1.RxWizardModalComponent }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ OptionsWizardStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: OptionsWizardStepComponent, selector: "ax-options-wizard-step", inputs: { options: "options" }, ngImport: i0, template: "<h5 class=\"mt-0\">{{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.options.label' | translate }}</h5>\n\n<ng-container [formGroup]=\"optionsForm\">\n  <div class=\"row h-100\">\n    <div class=\"col-6\">\n      <adapt-rx-textfield\n        *ngIf=\"options?.fields.customPackageName\"\n        [label]=\"'com.bmc.arsys.rx.innovation-studio.packaging.package-name.label' | translate\"\n        class=\"d-block form-group\"\n        formControlName=\"customPackageName\"\n        name=\"customPackageName\"\n        required=\"true\"\n      ></adapt-rx-textfield>\n\n      <adapt-rx-textfield\n        [label]=\"\n          ((isApplication$ | async)\n            ? 'com.bmc.arsys.rx.client.common.application-name.label'\n            : 'com.bmc.arsys.rx.client.common.library-name.label'\n          ) | translate\n        \"\n        formControlName=\"friendlyName\"\n        required=\"true\"\n        [readonly]=\"options?.fields.friendlyName?.disabled\"\n        [disabledStyleForReadonlyState]=\"true\"\n        class=\"d-block form-group\"\n        name=\"friendlyName\"\n      >\n      </adapt-rx-textfield>\n\n      <adapt-rx-textfield\n        *ngIf=\"options?.fields?.bundleUpdateFromVersion\"\n        [disabledStyleForReadonlyState]=\"true\"\n        [label]=\"\n          'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.options.update-from-version.label' | translate\n        \"\n        [pattern]=\"versionRegexp\"\n        [readonly]=\"true\"\n        class=\"d-block form-group\"\n        formControlName=\"bundleUpdateFromVersion\"\n        name=\"bundleUpdateFromVersion\"\n        [tooltip]=\"{\n          content: options?.fields.bundleUpdateFromVersion?.tooltip || bundleUpdateFromVersionTooltip,\n          iconName: 'question_circle_o',\n          placement: 'right'\n        }\"\n      >\n      </adapt-rx-textfield>\n\n      <adapt-rx-textfield\n        [label]=\"options?.fields.version?.label || 'com.bmc.arsys.rx.client.common.version.label' | translate\"\n        formControlName=\"version\"\n        required=\"true\"\n        [readonly]=\"options?.fields.version?.disabled\"\n        [disabledStyleForReadonlyState]=\"true\"\n        class=\"d-block form-group\"\n        name=\"version\"\n        [pattern]=\"versionRegexp\"\n        [class.mb-0]=\"optionsForm.controls.version.errors?.invalidVersion\"\n        [tooltip]=\"\n          options?.fields.version?.hideTooltip\n            ? null\n            : {\n                content: versionTooltip,\n                iconName: 'question_circle_o',\n                placement: 'right'\n              }\n        \"\n      >\n      </adapt-rx-textfield>\n\n      <adapt-rx-textfield\n        [label]=\"'com.bmc.arsys.rx.client.common.description.label' | translate\"\n        formControlName=\"description\"\n        required=\"true\"\n        [readonly]=\"options?.fields.description?.disabled\"\n        [disabledStyleForReadonlyState]=\"true\"\n        class=\"d-block form-group\"\n        name=\"description\"\n      >\n      </adapt-rx-textfield>\n\n      <adapt-rx-textfield\n        formControlName=\"id\"\n        [label]=\"\n          ((isApplication$ | async)\n            ? 'com.bmc.arsys.rx.client.common.application-id.label'\n            : 'com.bmc.arsys.rx.client.common.library-id.label'\n          ) | translate\n        \"\n        [readonly]=\"true\"\n        [disabledStyleForReadonlyState]=\"true\"\n        class=\"d-block form-group\"\n        name=\"id\"\n      >\n      </adapt-rx-textfield>\n    </div>\n\n    <div class=\"col-6 d-flex flex-column h-100\" *ngIf=\"!options?.fields.dependentBundlesList?.hidden\">\n      <adapt-rx-select\n        [inline]=\"true\"\n        [multiple]=\"true\"\n        [options]=\"bundlesList$ | async\"\n        [optionFormatter]=\"optionFormatter\"\n        [selectAllButton]=\"true\"\n        [deselectAllButton]=\"true\"\n        [popupMaxHeight]=\"560\"\n        [formControl]=\"optionsForm.controls.dependentBundles\"\n        [label]=\"'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.options.depends-on.label' | translate\"\n        class=\"h-100\"\n      >\n      </adapt-rx-select>\n    </div>\n  </div>\n</ng-container>\n\n<ng-template #bundleUpdateFromVersionTooltip>\n  <div\n    [innerHTML]=\"\n      'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.options.update-from-version.tooltip' | translate\n    \"\n  ></div>\n</ng-template>\n\n<ng-template #versionTooltip>\n  <div\n    *ngIf=\"options?.fields.version?.tooltip; else defaultVersionTooltip\"\n    [innerHTML]=\"options?.fields.version?.tooltip | translate\"\n  ></div>\n</ng-template>\n\n<ng-template #defaultVersionTooltip>\n  <div\n    [innerHTML]=\"'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.options.version.tooltip' | translate\"\n  ></div>\n</ng-template>\n", styles: [":host{display:flex;flex-direction:column;height:100%}.ax-dependent-bundles-list{overflow-y:scroll}\n"], components: [{ type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i4.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i4.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i4.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i4.PatternValidator, selector: "[pattern][formControlName],[pattern][formControl],[pattern][ngModel]", inputs: ["pattern"] }, { type: i4.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "translate": i3.TranslatePipe, "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionsWizardStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-options-wizard-step',
                    templateUrl: 'options-wizard-step.component.html',
                    styleUrls: ['./options-wizard-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i2$1.RxWizardModalComponent }, { type: i3.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }] } });

class OrderDataWizardStepComponent {
    constructor(rxWizardModalComponent, rxArrayUtilsService) {
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.rxArrayUtilsService = rxArrayUtilsService;
        this.recordDefinitions = [];
    }
    ngOnInit() {
        this.rxWizardModalComponent.context$.pipe(take(1)).subscribe((context) => {
            var _a;
            const newDeploymentPackageDescriptor = cloneDeep(context.deploymentPackageDescriptor);
            if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.importRecordDefinitionFromCache) {
                newDeploymentPackageDescriptor.dataImportOptionsByRecordDefinitionName = reduce(filter$1(context.cache.recordDefinitions, 'shouldExportData'), (result, recordDefinition, recordDefinitionIndex) => {
                    this.recordDefinitions.push({
                        name: recordDefinition.name,
                        importOrder: recordDefinitionIndex
                    });
                    result[recordDefinition.name] = { importOrder: recordDefinitionIndex };
                    return result;
                }, {});
            }
            else {
                let startIndex = 0;
                forEach(newDeploymentPackageDescriptor.dataImportOptionsByRecordDefinitionName, (recordDefinition, recordDefinitionName) => {
                    const recordDefinitionDetails = find(context.cache.recordDefinitions, { name: recordDefinitionName });
                    this.recordDefinitions.push({
                        name: recordDefinitionName,
                        importOrder: startIndex++,
                        disallowChangeOrder: recordDefinitionDetails.disallowChangeOrder
                    });
                });
            }
            this.rxWizardModalComponent.api.updateContext({
                deploymentPackageDescriptor: newDeploymentPackageDescriptor
            }, false);
            this.updateIndexes(false);
        });
        this.rxWizardModalComponent.context$.pipe(skip(1)).subscribe((context) => {
            let startIndex = this.recordDefinitions.length;
            this.recordDefinitions = sortBy(transform(context.deploymentPackageDescriptor.dataImportOptionsByRecordDefinitionName, (result, recordDefinition, recordDefinitionName) => {
                let importOrder;
                const existing = find(this.recordDefinitions, { name: recordDefinitionName });
                const recordDefinitionDetails = find(context.cache.recordDefinitions, { name: recordDefinitionName });
                if (!isUndefined(recordDefinitionDetails.initialFixedOrder) &&
                    recordDefinitionDetails.initialFixedOrder === (existing === null || existing === void 0 ? void 0 : existing.importOrder)) {
                    importOrder = recordDefinitionDetails.initialFixedOrder;
                }
                else if (existing) {
                    importOrder = existing.importOrder;
                }
                result.push({
                    name: recordDefinitionName,
                    importOrder: !isUndefined(importOrder) ? importOrder : startIndex++,
                    disallowChangeOrder: recordDefinitionDetails.disallowChangeOrder,
                    selected: existing === null || existing === void 0 ? void 0 : existing.selected
                });
            }, []), 'importOrder');
        });
    }
    isMoveDownButtonDisabled() {
        return (!this.recordDefinitions.length ||
            last(this.recordDefinitions).selected ||
            !find(this.recordDefinitions, 'selected'));
    }
    isMoveUpButtonDisabled() {
        return (!this.recordDefinitions.length ||
            head(this.recordDefinitions).selected ||
            !find(this.recordDefinitions, 'selected'));
    }
    moveDown() {
        this.recordDefinitions = this.rxArrayUtilsService.moveArrayElements(this.recordDefinitions, this.getSelectedIndexes(), 1);
        this.updateIndexes();
    }
    moveUp() {
        this.recordDefinitions = this.rxArrayUtilsService.moveArrayElements(this.recordDefinitions, this.getSelectedIndexes(), -1);
        this.updateIndexes();
    }
    trackBy(index, recordDefinition) {
        return recordDefinition.name;
    }
    getSelectedIndexes() {
        return this.recordDefinitions.reduce((result, recordDefinition, recordDefinitionIndex) => {
            if (recordDefinition.selected) {
                result.push(recordDefinitionIndex);
            }
            return result;
        }, []);
    }
    updateIndexes(markDirty = true) {
        this.rxWizardModalComponent.context$.pipe(take(1)).subscribe((context) => {
            const newDeploymentPackageDescriptor = cloneDeep(context.deploymentPackageDescriptor);
            this.recordDefinitions.forEach((recordDefinition, index) => {
                recordDefinition.importOrder = index;
                newDeploymentPackageDescriptor.dataImportOptionsByRecordDefinitionName[recordDefinition.name].importOrder =
                    index;
            });
            this.rxWizardModalComponent.api.updateContext({
                deploymentPackageDescriptor: newDeploymentPackageDescriptor,
                isPackageDataModified: true
            }, markDirty);
        });
    }
}
/** @nocollapse */ OrderDataWizardStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OrderDataWizardStepComponent, deps: [{ token: i2$1.RxWizardModalComponent }, { token: i5$1.RxArrayUtilsService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ OrderDataWizardStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: OrderDataWizardStepComponent, selector: "ax-order-data-wizard-step", inputs: { options: "options" }, ngImport: i0, template: "<h5 class=\"mt-0\">Data</h5>\n\n<div>Move data items up or down to set the order in which the data will be loaded onto target systems:</div>\n\n<div class=\"d-flex row\">\n  <button\n    adapt-button\n    btn-type=\"tertiary\"\n    class=\"d-icon-triangle_up_adapt\"\n    rx-id=\"move-up-button\"\n    [disabled]=\"isMoveUpButtonDisabled()\"\n    (click)=\"moveUp()\"\n  >\n    {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.order-data.move-up.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    btn-type=\"tertiary\"\n    class=\"d-icon-triangle_down_adapt\"\n    rx-id=\"move-down-button\"\n    [disabled]=\"isMoveDownButtonDisabled()\"\n    (click)=\"moveDown()\"\n  >\n    {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.order-data.move-down.label' | translate }}\n  </button>\n</div>\n\n<div class=\"d-flex flex-column border h-100 p-2 record-definitions-list\">\n  <div class=\"d-flex justify-content-center\">\n    <adapt-empty-state\n      class=\"align-self-center\"\n      type=\"objects\"\n      *ngIf=\"!recordDefinitions.length\"\n      [label]=\"'com.bmc.arsys.rx.client.empty-state.no-items-to-display.label' | translate\"\n    ></adapt-empty-state>\n  </div>\n\n  <div class=\"checkbox p-2 text-break\" *ngFor=\"let recordDefinition of recordDefinitions; trackBy: trackBy\">\n    <label>\n      <input\n        type=\"checkbox\"\n        [(ngModel)]=\"recordDefinition.selected\"\n        [disabled]=\"recordDefinition.disallowChangeOrder\"\n      />\n      <span class=\"checkbox__item\">{{ recordDefinition.name | rxDefinitionNamePipe }}</span>\n    </label>\n  </div>\n</div>\n", styles: [":host{display:flex;flex-direction:column;height:100%}.record-definitions-list{overflow-y:auto}\n"], components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i3.TranslatePipe, "rxDefinitionNamePipe": i2.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OrderDataWizardStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-order-data-wizard-step',
                    templateUrl: 'order-data-wizard-step.component.html',
                    styleUrls: ['./order-data-wizard-step.scss']
                }]
        }], ctorParameters: function () { return [{ type: i2$1.RxWizardModalComponent }, { type: i5$1.RxArrayUtilsService }]; }, propDecorators: { options: [{
                type: Input
            }] } });

class PackageWizardStepComponent {
    constructor(httpClient, axBundleDeploymentService, rxCommandFactoryService, rxServerErrorHandlerService, rxUtilityModalsService, rxWizardModalComponent, translateService) {
        this.httpClient = httpClient;
        this.axBundleDeploymentService = axBundleDeploymentService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxServerErrorHandlerService = rxServerErrorHandlerService;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.queueCreateDeploymentPackageCommand = this.rxCommandFactoryService.forResourceType('com.bmc.arsys.rx.application.bundledeploy.command.QueueCreateDeploymentPackageCommand');
        this.destroyed$ = new ReplaySubject(1);
        this.operationStatusSubject = new BehaviorSubject('');
        this.operationStatus$ = this.operationStatusSubject.asObservable();
        this.operationStatusMessage = null;
        this.operationStatuses = {
            pending: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.status.pending.label'),
            failed: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.status.failed.label'),
            succeeded: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.status.succeeded.label')
        };
        this.isApprovalConfigurationDataIncluded$ = this.rxWizardModalComponent.context$.pipe(map((context) => !isEmpty(context.deploymentPackageDescriptor.approvalConfigurationQueryOptions)));
        this.isConfigurationDataIncluded$ = this.rxWizardModalComponent.context$.pipe(map((context) => this.options.isInstallOperation || context.deploymentPackageDescriptor.isConfigurationDataIncluded));
        this.isDataImportOptionsByRecordDefinitionNameIncluded$ = this.rxWizardModalComponent.context$.pipe(map((context) => this.options.isInstallOperation ||
            !isEmpty(context.deploymentPackageDescriptor.dataImportOptionsByRecordDefinitionName)));
        this.isDefinitionsToDeleteByTypeIncluded$ = this.rxWizardModalComponent.context$.pipe(map((context) => this.options.isInstallOperation || !isEmpty(context.deploymentPackageDescriptor.definitionsToDeleteByType)));
        this.isDefinitionsToDeployByTypeIncluded$ = this.rxWizardModalComponent.context$.pipe(map((context) => this.options.isInstallOperation || !isEmpty(context.deploymentPackageDescriptor.definitionsToDeployByType)));
        this.isPackageDataEmpty$ = combineLatest([
            this.isDefinitionsToDeployByTypeIncluded$,
            this.isDataImportOptionsByRecordDefinitionNameIncluded$,
            this.isConfigurationDataIncluded$,
            this.isDefinitionsToDeleteByTypeIncluded$
        ]).pipe(map((params) => params.every((value) => !value)));
        this.isCreatePackageButtonDisabled$ = this.rxWizardModalComponent.context$.pipe(withLatestFrom(this.isPackageDataEmpty$, this.operationStatus$), map(([context, isPackageDataEmpty, operationStatus]) => operationStatus === this.operationStatuses.pending || !context.isPackageDataModified || isPackageDataEmpty));
    }
    ngOnInit() {
        var _a;
        this.isAllPackageDataIncluded$ = combineLatest([
            this.isDefinitionsToDeployByTypeIncluded$,
            this.isDataImportOptionsByRecordDefinitionNameIncluded$,
            this.isConfigurationDataIncluded$,
            this.isDefinitionsToDeleteByTypeIncluded$
        ].concat(((_a = this.options) === null || _a === void 0 ? void 0 : _a.isContentPackageOperation) ? [this.isApprovalConfigurationDataIncluded$] : [])).pipe(map((params) => params.every(Boolean)));
        this.rxWizardModalComponent.steps$
            .pipe(withLatestFrom(this.rxWizardModalComponent.tabIndex$, this.operationStatus$), takeUntil(this.destroyed$))
            .subscribe(([steps, tabIndex, operationStatus]) => {
            if (steps[tabIndex].id === 'package' && operationStatus !== this.operationStatuses.succeeded) {
                this.rxWizardModalComponent.api.disableNextButton();
            }
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    createPackage(forceStart = false) {
        this.rxWizardModalComponent.context$
            .pipe(take(1), tap(() => {
            var _a;
            this.rxWizardModalComponent.api.updateContext({
                isPackageDataModified: false
            });
            this.operationStatusSubject.next(this.operationStatuses.pending);
            if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.isContentPackageOperation) {
                this.rxWizardModalComponent.api.setFinishButtonLabel(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.close-and-continue-packaging.label'));
                this.rxWizardModalComponent.api.complete();
            }
        }), map((context) => {
            const parameters = {
                bundlePackageDescriptor: cloneDeep(context.deploymentPackageDescriptor),
                shouldForce: forceStart
            };
            forEach(parameters.bundlePackageDescriptor.dataImportOptionsByRecordDefinitionName, (dataImportOptionByRecordDefinitionName) => {
                delete dataImportOptionByRecordDefinitionName.dataFilterColumnExpressionFormControlOptions;
                delete dataImportOptionByRecordDefinitionName.dataFilterExpression;
                delete dataImportOptionByRecordDefinitionName.defaultFilter;
            });
            return parameters;
        }), switchMap((parameters) => this.queueCreateDeploymentPackageCommand.execute(parameters, { responseType: 'text' })), tap((response) => {
            this.guid = last(response.split('/'));
            this.rxWizardModalComponent.api.updateContext({
                packageGuid: this.guid
            });
        }), switchMap(() => this.axBundleDeploymentService
            .pollDeploymentStatus(this.guid, '/api/rx/application/bundle/createpackagestatus')
            .pipe(takeUntil(this.destroyed$))), tap((deploymentStatus) => {
            if (deploymentStatus.isFinished) {
                this.operationStatusSubject.next(this.operationStatuses.succeeded);
                this.rxWizardModalComponent.api.setFinishButtonLabel(this.translateService.instant('com.bmc.arsys.rx.client.common.close.label'));
                this.rxWizardModalComponent.api.complete();
                this.rxWizardModalComponent.api.enableNextButton();
            }
            else if (deploymentStatus.errorMessage) {
                this.operationStatusSubject.next(this.operationStatuses.failed);
                this.operationStatusMessage = deploymentStatus.errorMessage;
            }
        }), catchError((error) => {
            this.operationStatusSubject.next(this.operationStatuses.failed);
            this.rxWizardModalComponent.api.disableNextButton();
            this.rxWizardModalComponent.api.renew();
            const errorDetails = this.rxServerErrorHandlerService.getServerResponseErrorDetails(error.error);
            if (some(errorDetails, { messageNumber: AX_BUNDLE_DETAILS.errorCodes.packageCreationAlreadyInProgress })) {
                this.rxUtilityModalsService
                    .confirm(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.creation-operation-in-progress.message'))
                    .then((isConfirmed) => {
                    if (isConfirmed) {
                        this.createPackage(true);
                    }
                    else {
                        this.rxWizardModalComponent.api.updateContext({ isPackageDataModified: true });
                    }
                });
            }
            return EMPTY;
        }))
            .subscribe();
    }
}
/** @nocollapse */ PackageWizardStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PackageWizardStepComponent, deps: [{ token: i1$2.HttpClient }, { token: AxBundleDeploymentService }, { token: i2.RxCommandFactoryService }, { token: i2.RxServerErrorHandlerService }, { token: i3$1.RxUtilityModalsService }, { token: i2$1.RxWizardModalComponent }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ PackageWizardStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: PackageWizardStepComponent, selector: "ax-package-wizard-step", inputs: { options: "options" }, ngImport: i0, template: "<h5 class=\"mt-0\">{{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.label' | translate }}</h5>\n\n<button\n  adapt-button\n  btn-type=\"primary\"\n  rx-id=\"create-package-button\"\n  type=\"button\"\n  (click)=\"createPackage()\"\n  [disabled]=\"isCreatePackageButtonDisabled$ | async\"\n>\n  {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.create-package.label' | translate }}\n</button>\n\n<span\n  class=\"empty-package-warning d-icon-left-exclamation_triangle\"\n  rx-id=\"empty-package-message\"\n  [hidden]=\"!(isPackageDataEmpty$ | async)\"\n>\n  {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.empty-package.message' | translate }}\n</span>\n\n<ng-container *ngIf=\"!(isPackageDataEmpty$ | async)\">\n  <h6>{{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.included.label' | translate }}:</h6>\n\n  <ul>\n    <li [hidden]=\"!(isDefinitionsToDeployByTypeIncluded$ | async)\">\n      {{\n        'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions.customized-definitions.label'\n          | translate\n      }}\n    </li>\n    <li [hidden]=\"!(isDataImportOptionsByRecordDefinitionNameIncluded$ | async)\">\n      {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.data-items.label' | translate }}\n    </li>\n    <li [hidden]=\"!(isConfigurationDataIncluded$ | async)\">\n      {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.configuration-data.label' | translate }}\n    </li>\n    <li [hidden]=\"!(isApprovalConfigurationDataIncluded$ | async)\">\n      {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.approval-configurations.label' | translate }}\n    </li>\n    <li [hidden]=\"!(!options?.isInstallOperation && isDefinitionsToDeleteByTypeIncluded$ | async)\">\n      {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.definitions-to-delete.label' | translate }}\n    </li>\n  </ul>\n</ng-container>\n\n<ng-container *ngIf=\"!(isAllPackageDataIncluded$ | async)\">\n  <h6>{{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.not-included.label' | translate }}:</h6>\n\n  <ul>\n    <li [hidden]=\"isDefinitionsToDeployByTypeIncluded$ | async\">\n      {{\n        'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions.customized-definitions.label'\n          | translate\n      }}\n    </li>\n    <li [hidden]=\"isDataImportOptionsByRecordDefinitionNameIncluded$ | async\">\n      {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.data-items.label' | translate }}\n    </li>\n    <li [hidden]=\"isConfigurationDataIncluded$ | async\">\n      {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.configuration-data.label' | translate }}\n    </li>\n    <li [hidden]=\"!(options?.isContentPackageOperation && !(isApprovalConfigurationDataIncluded$ | async))\">\n      {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.approval-configurations.label' | translate }}\n    </li>\n    <li [hidden]=\"isDefinitionsToDeleteByTypeIncluded$ | async\">\n      {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.definitions-to-delete.label' | translate }}\n    </li>\n  </ul>\n</ng-container>\n\n<div class=\"mt-4\" *ngIf=\"operationStatus$ | async as operationStatus\">\n  <div *ngIf=\"operationStatus === operationStatuses.pending\">\n    <div class=\"mb-3\">\n      {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.creating-package.message' | translate }}\n    </div>\n\n    <div class=\"progress\">\n      <div\n        class=\"progress-bar progress-bar-intermediate w-100\"\n        role=\"progressbar\"\n        aria-valuenow=\"100\"\n        aria-valuemin=\"0\"\n        aria-valuemax=\"100\"\n      ></div>\n    </div>\n  </div>\n\n  <adapt-alert\n    *ngIf=\"operationStatus === operationStatuses.succeeded\"\n    [config]=\"{\n      content: translateService.instant(\n        'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.packaging-completed.message'\n      ),\n      dismissible: false,\n      type: 'inline',\n      variant: 'success'\n    }\"\n  ></adapt-alert>\n\n  <div *ngIf=\"operationStatus === operationStatuses.failed\">\n    <adapt-alert\n      [config]=\"{\n        content: translateService.instant(\n          'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.packaging-failed.message'\n        ),\n        dismissible: false,\n        type: 'inline',\n        variant: 'danger'\n      }\"\n    ></adapt-alert>\n\n    <adapt-rx-textarea\n      *ngIf=\"operationStatusMessage\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.messages.label' | translate }}\"\n      [ngModel]=\"operationStatusMessage\"\n      rx-id=\"messages-textarea\"\n      rows=\"13\"\n      [disabledStyleForReadonlyState]=\"true\"\n      [readonly]=\"true\"\n    ></adapt-rx-textarea>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.empty-package-warning{margin-left:15px}.empty-package-warning:before{color:#f1b521}\n"], components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i1.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i3.TranslatePipe, "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PackageWizardStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-package-wizard-step',
                    templateUrl: './package-wizard-step.component.html',
                    styleUrls: ['./package-wizard-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$2.HttpClient }, { type: AxBundleDeploymentService }, { type: i2.RxCommandFactoryService }, { type: i2.RxServerErrorHandlerService }, { type: i3$1.RxUtilityModalsService }, { type: i2$1.RxWizardModalComponent }, { type: i3.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }] } });

class SelectApprovalConfigurationsWizardStepComponent {
    constructor(rxDataPageService, rxDefinitionNameService, rxSessionExpirationService, translateService, rxWizardModalComponent) {
        this.rxDataPageService = rxDataPageService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxSessionExpirationService = rxSessionExpirationService;
        this.translateService = translateService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        var _a;
        const columns = [
            {
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.record-definition.label'),
                fieldId: 'recordDefinitionName',
                sortable: { direction: ColumnSortDirection.Asc, priority: 0 }
            },
            {
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-approval-configurations.flow-group.label'),
                fieldId: 'flowGroupName',
                sortable: { direction: ColumnSortDirection.Asc, priority: 1 }
            }
        ];
        const recordDefinition = {
            fieldDefinitions: [
                {
                    id: 'recordDefinitionName',
                    resourceType: RX_RECORD_DEFINITION.dataTypes.character.resourceType
                },
                {
                    id: 'flowGroupName',
                    resourceType: RX_RECORD_DEFINITION.dataTypes.character.resourceType
                }
            ]
        };
        this.recordGridConfig$ = of({
            columns,
            enableColumnSelection: false,
            enableRowSelection: (_a = this.options.gridConfig) === null || _a === void 0 ? void 0 : _a.enableRowSelection,
            recordIdField: 'definitionNameWithFlowGroup',
            styles: 'flex-fill',
            useExternalFiltering: false,
            expandGroups: true,
            getRecordDefinition: () => of(recordDefinition),
            getData: () => {
                this.rxWizardModalComponent.api.disableNextButton();
                return this.rxSessionExpirationService.keepSessionAlive().pipe(switchMap(() => this.rxDataPageService
                    .withType('com.bmc.arsys.rx.approval.application.datapage.ApprovalConfigurationsDataPageQuery')
                    .get({
                    params: {
                        startIndex: -1,
                        pageSize: 0,
                        bundleId: this.context.deploymentPackageDescriptor.id
                    }
                })
                    .pipe(map((response) => {
                    this.selectedDefinitionCount = 0;
                    const data = reduce(response.data[0], (result, flowGroupNames, recordDefinitionName) => {
                        const bundleFriendlyName = this.context.bundleFriendlyNamesById[this.rxDefinitionNameService.getBundleId(recordDefinitionName)];
                        const recordDefinitionDisplayName = this.rxDefinitionNameService.getDisplayName(recordDefinitionName);
                        let dataItem = find(result, { groupValue: bundleFriendlyName });
                        if (dataItem) {
                            flowGroupNames.forEach((flowGroupName) => {
                                dataItem.items.push({
                                    definitionName: recordDefinitionName,
                                    bundleName: bundleFriendlyName,
                                    recordDefinitionName: recordDefinitionDisplayName,
                                    flowGroupName,
                                    definitionNameWithFlowGroup: `${flowGroupName}:${recordDefinitionName}`
                                });
                            });
                        }
                        else {
                            dataItem = {
                                groupValue: bundleFriendlyName,
                                groupField: 'bundleName',
                                items: flowGroupNames.map((flowGroupName) => ({
                                    definitionName: recordDefinitionName,
                                    bundleName: bundleFriendlyName,
                                    recordDefinitionName: recordDefinitionDisplayName,
                                    flowGroupName,
                                    definitionNameWithFlowGroup: `${flowGroupName}:${recordDefinitionName}`
                                }))
                            };
                            result.push(dataItem);
                        }
                        return result;
                    }, []);
                    return {
                        data,
                        totalSize: data.length
                    };
                }))));
            }
        });
        combineLatest([this.recordGrid.rowSelectionChanged, this.rxWizardModalComponent.context$.pipe(take(1))])
            .pipe(takeUntil(this.destroyed$))
            .subscribe(([selectedRows, context]) => {
            this.selectedDefinitionCount = selectedRows.length;
            const newDeploymentPackageDescriptor = cloneDeep(context.deploymentPackageDescriptor);
            newDeploymentPackageDescriptor.approvalConfigurationQueryOptions = chain(selectedRows)
                .groupBy('definitionName')
                .map((config, definitionName) => ({
                recordDefinitionName: definitionName,
                flowGroups: map$1(config, 'flowGroupName')
            }))
                .value();
            this.rxWizardModalComponent.api.updateContext({
                deploymentPackageDescriptor: newDeploymentPackageDescriptor,
                isPackageDataModified: true
            }, this.selectedDefinitionCount > 0);
        });
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    onDataLoaded() {
        this.rxWizardModalComponent.api.enableNextButton();
    }
}
/** @nocollapse */ SelectApprovalConfigurationsWizardStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectApprovalConfigurationsWizardStepComponent, deps: [{ token: i2.RxDataPageFactoryService }, { token: i2.RxDefinitionNameService }, { token: i2.RxSessionExpirationService }, { token: i3.TranslateService }, { token: i2$1.RxWizardModalComponent }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ SelectApprovalConfigurationsWizardStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SelectApprovalConfigurationsWizardStepComponent, selector: "ax-select-approval-configurations-wizard-step", inputs: { context: "context", options: "options" }, viewQueries: [{ propertyName: "recordGrid", first: true, predicate: RecordGridComponent, descendants: true, static: true }], ngImport: i0, template: "<div class=\"d-flex justify-content-between\">\n  <h5 class=\"mt-0\">\n    {{\n      'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-approval-configurations.approval-configurations.label'\n        | translate\n    }}\n  </h5>\n  <div>\n    {{\n      'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-approval-configurations.approval-configurations-count.label'\n        | translate: { count: selectedDefinitionCount }\n    }}\n  </div>\n</div>\n\n<div class=\"mb-3\">\n  {{\n    'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-approval-configurations.selected-approval-configurations.label'\n      | translate\n  }}\n</div>\n\n<rx-record-grid [config]=\"recordGridConfig$\" (dataLoaded)=\"onDataLoaded()\"></rx-record-grid>\n", styles: [":host{display:flex;flex-direction:column;height:100%}rx-record-grid{height:100%}\n"], components: [{ type: i5.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectApprovalConfigurationsWizardStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-select-approval-configurations-wizard-step',
                    templateUrl: 'select-approval-configurations-wizard-step.component.html',
                    styleUrls: ['./select-approval-configurations-wizard-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i2.RxDataPageFactoryService }, { type: i2.RxDefinitionNameService }, { type: i2.RxSessionExpirationService }, { type: i3.TranslateService }, { type: i2$1.RxWizardModalComponent }]; }, propDecorators: { context: [{
                type: Input
            }], options: [{
                type: Input
            }], recordGrid: [{
                type: ViewChild,
                args: [RecordGridComponent, { static: true }]
            }] } });

class SelectBundleContentDefinitionsWizardStepComponent {
    constructor(rxBundleCacheService, rxDataPageService, rxDefinitionNameService, rxRecordDefinitionDataPageService, rxSessionExpirationService, rxStringService, rxWizardModalComponent, translateService) {
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxDataPageService = rxDataPageService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxRecordDefinitionDataPageService = rxRecordDefinitionDataPageService;
        this.rxSessionExpirationService = rxSessionExpirationService;
        this.rxStringService = rxStringService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        var _a;
        this.currentBundleId = this.rxBundleCacheService.bundleId;
        this.rxWizardModalComponent.api.updateContext({
            cache: {}
        }, false);
        const gridColumns = [
            {
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.item-type.label'),
                fieldId: 'displayType',
                filterable: false,
                sortable: {
                    direction: ColumnSortDirection.Asc,
                    priority: 0
                }
            },
            {
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                fieldId: 'displayName',
                searchable: false,
                filterable: false,
                visible: false
            },
            {
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                fieldId: 'definitionTypeWithName',
                cellTemplate: this.displayTypeWithCellTemplate
            },
            {
                title: this.translateService.instant('com.bmc.arsys.rx.client.bundle-name.label'),
                fieldId: 'bundleName',
                visible: false,
                filterable: false,
                sortable: {
                    direction: ColumnSortDirection.Asc,
                    priority: 1
                }
            },
            AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy,
            Object.assign(Object.assign({}, AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime), { sortable: {
                    direction: ColumnSortDirection.Asc,
                    priority: 2
                } })
        ].map((column) => (Object.assign(Object.assign({}, column), { title: this.translateService.instant(column.title) })));
        const recordDefinition = {
            fieldDefinitions: [
                {
                    id: 'displayType',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'displayName',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'definitionTypeWithName',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'bundleName',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy.fieldId,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime.fieldId,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
                }
            ]
        };
        const defaultParams = {
            propertySelection: ['name', 'lastUpdateTime', 'lastChangedBy']
        };
        const recordDefinitionsParams = { propertySelection: [...defaultParams.propertySelection, 'shouldExportData'] };
        const viewDefinitionsParams = {
            excludeExtensionViews: false,
            propertySelection: [...defaultParams.propertySelection]
        };
        const bundleContentRecordDefinitionParams = {
            requireDependent: true,
            recursive: true,
            propertySelection: [...defaultParams.propertySelection, 'internal', 'type']
        };
        this.recordGridConfig$ = of({
            columns: gridColumns,
            enableColumnSelection: false,
            enableFiltering: true,
            enableRowSelection: ((_a = this.options.gridConfig) === null || _a === void 0 ? void 0 : _a.enableRowSelection) || null,
            recordIdField: 'definitionTypeWithName',
            styles: 'flex-fill',
            useExternalFiltering: false,
            expandGroups: true,
            getRecordDefinition: () => of(recordDefinition),
            getData: (queryParams) => {
                this.rxWizardModalComponent.api.disableNextButton();
                return this.rxSessionExpirationService.keepSessionAlive().pipe(switchMap(() => combineLatest([
                    this.rxWizardModalComponent.context$.pipe(take(1)),
                    this.rxDataPageService
                        .withType('com.bmc.arsys.rx.application.bundle.datapage.BundleContentAssociationDefinitionDataPageQuery')
                        .get({
                        params: defaultParams
                    }),
                    this.rxDataPageService
                        .withType('com.bmc.arsys.rx.application.bundle.datapage.BundleContentDocumentDefinitionDataPageQuery')
                        .get({
                        params: defaultParams
                    }),
                    this.rxDataPageService
                        .withType('com.bmc.arsys.rx.application.bundle.datapage.BundleContentEventDefinitionDataPageQuery')
                        .get({
                        params: defaultParams
                    }),
                    this.rxDataPageService
                        .withType('com.bmc.arsys.rx.application.bundle.datapage.BundleContentEventStatisticsDefinitionDataPageQuery')
                        .get({
                        params: defaultParams
                    }),
                    this.rxDataPageService
                        .withType('com.bmc.arsys.rx.application.bundle.datapage.BundleContentNamedListDefinitionDataPageQuery')
                        .get({
                        params: defaultParams
                    }),
                    this.rxDataPageService
                        .withType('com.bmc.arsys.rx.application.bundle.datapage.BundleContentProcessDefinitionDataPageQuery')
                        .get({
                        params: defaultParams
                    }),
                    this.rxDataPageService
                        .withType('com.bmc.arsys.rx.application.bundle.datapage.BundleContentRecordDefinitionDataPageQuery')
                        .get({
                        params: recordDefinitionsParams
                    }),
                    this.rxDataPageService
                        .withType('com.bmc.arsys.rx.application.bundle.datapage.BundleContentRuleDefinitionDataPageQuery')
                        .get({
                        params: defaultParams
                    }),
                    this.rxDataPageService
                        .withType('com.bmc.arsys.rx.application.bundle.datapage.BundleContentViewDefinitionDataPageQuery')
                        .get({
                        params: viewDefinitionsParams
                    }),
                    this.rxDataPageService
                        .withType('com.bmc.arsys.rx.application.bundle.datapage.BundleContentWebApiDefinitionDataPageQuery')
                        .get({
                        params: defaultParams
                    }),
                    this.rxRecordDefinitionDataPageService.get({ params: bundleContentRecordDefinitionParams }),
                    this.rxDataPageService
                        .withType('com.bmc.arsys.rx.application.bundle.datapage.BundleContentRecordInstanceProviderDataPageQuery')
                        .get({
                        params: defaultParams
                    })
                ]).pipe(map(([context, associationDefinitions, documentDefinitions, eventDefinitions, eventStatisticsDefinitions, namedListDefinitions, processDefinitions, recordDefinitions, ruleDefinitions, viewDefinitions, webApiDefinitions, dependentBundleRecordDefinitions, recordInstances]) => {
                    const platformBundleIdPrefix = 'com.bmc.arsys';
                    const cacheRecordInstanceDefinitions = recordInstances.data.reduce((result, recordInstance, index) => {
                        recordInstance.selected = true;
                        recordInstance.initialFixedOrder = index;
                        if (!recordInstance.internal &&
                            !(startsWith(recordInstance.name, platformBundleIdPrefix) &&
                                !startsWith(this.currentBundleId, platformBundleIdPrefix))) {
                            recordInstance.defaultFilter = recordInstance.dataFilter;
                            recordInstance.dataFilter = null;
                            recordInstance.duplicateDataActionType = this.options.gridConfig.defaultDuplicateDataActionType;
                            recordInstance.ignoreRuleExecution = false;
                            recordInstance.bundleName =
                                context.bundleFriendlyNamesById[this.rxDefinitionNameService.getBundleId(recordInstance.name)];
                            result.push(recordInstance);
                        }
                        return result;
                    }, []);
                    const cacheDependentBundleRecordDefinitions = dependentBundleRecordDefinitions.data
                        .filter((instance) => {
                        return !find(cacheRecordInstanceDefinitions, { name: instance.name });
                    })
                        .reduce((result, instance) => {
                        if (!instance.internal &&
                            !(startsWith(instance.name, platformBundleIdPrefix) &&
                                !startsWith(this.currentBundleId, platformBundleIdPrefix))) {
                            instance.defaultFilter = instance.dataFilter;
                            instance.dataFilter = null;
                            instance.duplicateDataActionType = this.options.gridConfig.defaultDuplicateDataActionType;
                            instance.ignoreRuleExecution = false;
                            instance.bundleName =
                                context.bundleFriendlyNamesById[this.rxDefinitionNameService.getBundleId(instance.name)];
                            result.push(instance);
                        }
                        return result;
                    }, []);
                    const cacheRecordDefinitions = [
                        ...cacheRecordInstanceDefinitions,
                        ...cacheDependentBundleRecordDefinitions
                    ];
                    this.rxWizardModalComponent.api.updateContext({
                        cache: {
                            recordDefinitions: cloneDeep(cacheRecordDefinitions)
                        }
                    }, false);
                    this.selectedDefinitionCount = 0;
                    const definitions = reduce({
                        association: associationDefinitions,
                        document: documentDefinitions,
                        event: eventDefinitions,
                        eventStatistics: eventStatisticsDefinitions,
                        namedList: namedListDefinitions,
                        process: processDefinitions,
                        record: recordDefinitions,
                        rule: ruleDefinitions,
                        view: viewDefinitions,
                        webApi: webApiDefinitions
                    }, (allDefinitions, dataPage, definitionType) => {
                        const displayType = this.rxStringService.prettify(definitionType);
                        const definitionsByBundleName = dataPage.data.reduce((result, definition) => {
                            if (definition.customizationPerspective !==
                                RX_OVERLAY.operationTypes.notCustomizedInThisOverlayGroup) {
                                definition.type = definitionType;
                                definition.displayType = displayType;
                                definition.displayName = this.rxDefinitionNameService.getDisplayName(definition.name);
                                definition.definitionTypeWithName = `${definitionType}:${definition.name}`;
                                definition.bundleId = this.rxDefinitionNameService.getBundleId(definition.name);
                                definition.bundleFriendlyName = context.bundleFriendlyNamesById[definition.bundleId];
                                definition.bundleIdWithDefinitionType = `${definition.bundleId}:${definitionType}`;
                                let bundleGroup = find(result, { groupValue: definition.bundleIdWithDefinitionType });
                                if (bundleGroup) {
                                    bundleGroup.items.push(definition);
                                }
                                else {
                                    bundleGroup = {
                                        groupTitle: definition.bundleFriendlyName,
                                        groupValue: definition.bundleIdWithDefinitionType,
                                        groupField: 'bundleName',
                                        items: [definition]
                                    };
                                    result.push(bundleGroup);
                                }
                            }
                            return result;
                        }, []);
                        return allDefinitions.concat(definitionsByBundleName.length
                            ? [
                                {
                                    groupValue: displayType,
                                    groupField: 'displayType',
                                    items: definitionsByBundleName
                                }
                            ]
                            : []);
                    }, []);
                    return {
                        data: definitions,
                        totalSize: definitions.length
                    };
                }))));
            }
        });
        combineLatest([this.recordGrid.rowSelectionChanged, this.rxWizardModalComponent.context$.pipe(take(1))])
            .pipe(takeUntil(this.destroyed$))
            .subscribe(([selectedRows, context]) => {
            this.selectedDefinitionCount = selectedRows.length;
            const newDeploymentPackageDescriptor = cloneDeep(context.deploymentPackageDescriptor);
            newDeploymentPackageDescriptor.definitionsToDeployByType = selectedRows.reduce((definitionsToDeployByType, row) => {
                var _a;
                const definitionType = AX_BUNDLE_DETAILS.definitionTypes[row.type];
                definitionsToDeployByType[definitionType] = (_a = definitionsToDeployByType[definitionType]) !== null && _a !== void 0 ? _a : [];
                definitionsToDeployByType[definitionType].push(row.name);
                return definitionsToDeployByType;
            }, {});
            this.rxWizardModalComponent.api.updateContext({
                deploymentPackageDescriptor: newDeploymentPackageDescriptor,
                isPackageDataModified: true
            }, this.selectedDefinitionCount > 0);
        });
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    onDataLoaded() {
        this.rxWizardModalComponent.api.enableNextButton();
    }
}
/** @nocollapse */ SelectBundleContentDefinitionsWizardStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectBundleContentDefinitionsWizardStepComponent, deps: [{ token: i2.RxBundleCacheService }, { token: i2.RxDataPageFactoryService }, { token: i2.RxDefinitionNameService }, { token: i1$5.RxRecordDefinitionDataPageService }, { token: i2.RxSessionExpirationService }, { token: i5$1.RxStringService }, { token: i2$1.RxWizardModalComponent }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ SelectBundleContentDefinitionsWizardStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SelectBundleContentDefinitionsWizardStepComponent, selector: "ax-select-bundle-content-definitions-wizard-step", inputs: { options: "options" }, viewQueries: [{ propertyName: "recordGrid", first: true, predicate: RecordGridComponent, descendants: true, static: true }, { propertyName: "displayTypeWithCellTemplate", first: true, predicate: ["displayTypeWithCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"d-flex justify-content-between\">\n  <h5 class=\"mt-0\">\n    {{\n      'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions.customized-definitions.label'\n        | translate\n    }}\n  </h5>\n  <div>\n    {{\n      'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions.definitions-count.label'\n        | translate\n          : {\n              count: selectedDefinitionCount,\n              packageType: this.options.displayName.toLowerCase()\n            }\n    }}\n  </div>\n</div>\n\n<div class=\"mb-3\">\n  {{\n    'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-bundle-content-definitions.select-customized-definitions-to-include-in-the-package-content-package.label'\n      | translate\n  }}\n</div>\n\n<rx-record-grid [config]=\"recordGridConfig$\" (dataLoaded)=\"onDataLoaded()\"></rx-record-grid>\n\n<ng-template #displayTypeWithCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  {{ dataItem[column.field] | rxDefinitionNamePipe }}\n</ng-template>\n", styles: [":host{display:flex;flex-direction:column;height:100%}rx-record-grid{height:100%}\n"], components: [{ type: i5.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i3.TranslatePipe, "rxDefinitionNamePipe": i2.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectBundleContentDefinitionsWizardStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-select-bundle-content-definitions-wizard-step',
                    templateUrl: './select-bundle-content-definitions-wizard-step.component.html',
                    styleUrls: ['./select-bundle-content-definitions-wizard-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i2.RxBundleCacheService }, { type: i2.RxDataPageFactoryService }, { type: i2.RxDefinitionNameService }, { type: i1$5.RxRecordDefinitionDataPageService }, { type: i2.RxSessionExpirationService }, { type: i5$1.RxStringService }, { type: i2$1.RxWizardModalComponent }, { type: i3.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }], recordGrid: [{
                type: ViewChild,
                args: [RecordGridComponent, { static: true }]
            }], displayTypeWithCellTemplate: [{
                type: ViewChild,
                args: ['displayTypeWithCellTemplate', { static: true }]
            }] } });

class DefinitionHistoryDataPageService extends DataPage {
    constructor(injector) {
        super(injector, 'com.bmc.arsys.rx.application.definitionhistory.datapage.DefinitionHistoryDataPageQuery');
        this.injector = injector;
    }
}
/** @nocollapse */ DefinitionHistoryDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionHistoryDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ DefinitionHistoryDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionHistoryDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionHistoryDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class SelectDefinitionsToDeleteWizardStepComponent {
    constructor(definitionHistoryDataPageService, rxDefinitionNameService, rxSessionExpirationService, rxStringService, rxWizardModalComponent, translateService) {
        this.definitionHistoryDataPageService = definitionHistoryDataPageService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxSessionExpirationService = rxSessionExpirationService;
        this.rxStringService = rxStringService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.selectedDefinitionCount = 0;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        const gridColumns = [
            {
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.item-type.label'),
                fieldId: 'displayType',
                sortable: {
                    priority: 0,
                    direction: ColumnSortDirection.Asc
                },
                filterable: false
            },
            {
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                fieldId: 'objectName',
                wrapText: true,
                cellTemplate: this.recordNameCellTemplate
            },
            {
                fieldId: 'createdBy',
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions-to-delete.deleted-by.label')
            },
            {
                fieldId: 'createDate',
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions-to-delete.deleted-date.label'),
                sortable: {
                    priority: 2,
                    direction: ColumnSortDirection.Asc
                }
            },
            {
                fieldId: 'bundleName',
                title: this.translateService.instant('com.bmc.arsys.rx.client.bundle-name.label'),
                sortable: {
                    priority: 1,
                    direction: ColumnSortDirection.Asc
                },
                filterable: false,
                visible: false
            }
        ].map((column) => (Object.assign(Object.assign({}, column), { title: this.translateService.instant(column.title) })));
        const recordDefinition = {
            fieldDefinitions: [
                {
                    id: 'objectName',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'createdBy',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'createDate',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
                },
                {
                    id: 'displayType',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'bundleName',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
        combineLatest([this.recordGrid.rowSelectionChanged, this.rxWizardModalComponent.context$.pipe(take(1))])
            .pipe(takeUntil(this.destroyed$))
            .subscribe(([selectedRows, context]) => {
            const newDeploymentPackageDescriptor = cloneDeep(context.deploymentPackageDescriptor);
            this.selectedDefinitionCount = selectedRows.length;
            newDeploymentPackageDescriptor.definitionsToDeleteByType = selectedRows.reduce((definitionsToDeleteByType, row) => {
                var _a;
                const definitionType = AX_BUNDLE_DETAILS.definitionTypes[row.type];
                definitionsToDeleteByType[definitionType] = (_a = definitionsToDeleteByType[definitionType]) !== null && _a !== void 0 ? _a : [];
                definitionsToDeleteByType[definitionType].push(row.objectName);
                return definitionsToDeleteByType;
            }, {});
            this.rxWizardModalComponent.api.updateContext({
                deploymentPackageDescriptor: newDeploymentPackageDescriptor,
                isPackageDataModified: true
            }, this.selectedDefinitionCount > 0);
        });
        this.recordGridConfig$ = of({
            columns: gridColumns,
            enableColumnSelection: false,
            enableFiltering: true,
            enableRowSelection: RowSelectionMode.Multiple,
            recordIdField: 'definitionTypeWithName',
            styles: 'flex-fill',
            useExternalFiltering: false,
            expandGroups: true,
            getRecordDefinition: () => of(recordDefinition),
            getData: (queryParams) => {
                this.rxWizardModalComponent.api.disableNextButton();
                return this.rxSessionExpirationService.keepSessionAlive().pipe(switchMap(() => {
                    var _a;
                    const defaultParams = {
                        operationType: 'DELETE'
                    };
                    if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.isContentPackageOperation) {
                        defaultParams.requireDependent = true;
                        defaultParams.recursive = true;
                        defaultParams.requireLatestVersion = true;
                    }
                    return combineLatest([
                        this.definitionHistoryDataPageService.get({ params: Object.assign({ objectType: 'ASSOCIATION' }, defaultParams) }),
                        this.definitionHistoryDataPageService.get({
                            params: Object.assign({ objectType: 'DOCUMENT_DEFINITION' }, defaultParams)
                        }),
                        this.definitionHistoryDataPageService.get({
                            params: Object.assign({ objectType: 'EVENT_DEFINITION' }, defaultParams)
                        }),
                        this.definitionHistoryDataPageService.get({
                            params: Object.assign({ objectType: 'EVENT_STATISTICS_DEFINITION' }, defaultParams)
                        }),
                        this.definitionHistoryDataPageService.get({ params: Object.assign({ objectType: 'NAMED_LIST' }, defaultParams) }),
                        this.definitionHistoryDataPageService.get({
                            params: Object.assign({ objectType: 'PROCESS_DEFINITION' }, defaultParams)
                        }),
                        this.definitionHistoryDataPageService.get({
                            params: Object.assign({ objectType: 'RECORD_DEFINITION' }, defaultParams)
                        }),
                        this.definitionHistoryDataPageService.get({
                            params: Object.assign({ objectType: 'RULE_DEFINITION' }, defaultParams)
                        }),
                        this.definitionHistoryDataPageService.get({
                            params: Object.assign({ objectType: 'VIEW_DEFINITION' }, defaultParams)
                        }),
                        this.definitionHistoryDataPageService.get({
                            params: Object.assign({ objectType: 'WEBAPI_DEFINITION' }, defaultParams)
                        })
                    ]).pipe(map(([associationDefinitions, documentDefinitions, eventDefinitions, eventStatisticsDefinitions, namedListDefinitions, processDefinitions, recordDefinitions, ruleDefinitions, viewDefinitions, webApiDefinitions]) => {
                        const definitions = reduce({
                            association: associationDefinitions,
                            document: documentDefinitions,
                            event: eventDefinitions,
                            eventStatistic: eventStatisticsDefinitions,
                            namedList: namedListDefinitions,
                            process: processDefinitions,
                            record: recordDefinitions,
                            rule: ruleDefinitions,
                            view: viewDefinitions,
                            webApi: webApiDefinitions
                        }, (allDefinitions, dataPage, definitionType) => {
                            const definitionsByType = dataPage.data;
                            const displayType = this.rxStringService.prettify(definitionType);
                            definitionsByType.forEach((definition) => {
                                definition.type = definitionType;
                                definition.displayType = displayType;
                                definition.displayName = this.rxDefinitionNameService.getDisplayName(definition.objectName);
                                definition.definitionTypeWithName = `${definitionType}:${definition.objectName}`;
                            });
                            return allDefinitions.concat(definitionsByType.length
                                ? [
                                    {
                                        groupValue: displayType,
                                        groupField: 'type',
                                        items: definitionsByType
                                    }
                                ]
                                : []);
                        }, []);
                        return {
                            data: definitions,
                            totalSize: definitions.length
                        };
                    }));
                }));
            }
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    onDataLoaded() {
        this.rxWizardModalComponent.api.enableNextButton();
    }
}
/** @nocollapse */ SelectDefinitionsToDeleteWizardStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectDefinitionsToDeleteWizardStepComponent, deps: [{ token: DefinitionHistoryDataPageService }, { token: i2.RxDefinitionNameService }, { token: i2.RxSessionExpirationService }, { token: i5$1.RxStringService }, { token: i2$1.RxWizardModalComponent }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ SelectDefinitionsToDeleteWizardStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SelectDefinitionsToDeleteWizardStepComponent, selector: "ax-select-definitions-to-delete-wizard-step", inputs: { options: "options" }, viewQueries: [{ propertyName: "recordNameCellTemplate", first: true, predicate: ["recordNameCellTemplate"], descendants: true, static: true }, { propertyName: "recordGrid", first: true, predicate: RecordGridComponent, descendants: true, static: true }], ngImport: i0, template: "<div class=\"d-flex justify-content-between\">\n  <h5 class=\"mt-0\">\n    {{'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions-to-delete.deleted-definitions.label' |\n    translate}}\n\n    <adapt-icon\n      name=\"question_circle_o\"\n      class=\"ml-2\"\n      placement=\"bottom\"\n      maxWidth=\"400\"\n      [adaptPopover]=\"'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions-to-delete.tooltip' | translate\"\n    ></adapt-icon>\n  </h5>\n  <div>\n    {{'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions-to-delete.deleted-definitions-count.label'\n    | translate : { count: selectedDefinitionCount } }}\n  </div>\n</div>\n\n<div class=\"mb-3\">\n  {{'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions-to-delete.selected-deleted-definitions.label'\n  | translate}}\n</div>\n\n<rx-record-grid [config]=\"recordGridConfig$\" (dataLoaded)=\"onDataLoaded()\"></rx-record-grid>\n\n<ng-template #recordNameCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  {{ dataItem[column.field] | rxDefinitionNamePipe }}\n</ng-template>\n", styles: [":host{display:flex;flex-direction:column;height:100%}rx-record-grid{height:100%}\n"], components: [{ type: i1.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }, { type: i5.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], directives: [{ type: i1.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }], pipes: { "translate": i3.TranslatePipe, "rxDefinitionNamePipe": i2.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectDefinitionsToDeleteWizardStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-select-definitions-to-delete-wizard-step',
                    templateUrl: 'select-definitions-to-delete-wizard-step.components.html',
                    styleUrls: ['./select-definitions-to-delete-wizard-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: DefinitionHistoryDataPageService }, { type: i2.RxDefinitionNameService }, { type: i2.RxSessionExpirationService }, { type: i5$1.RxStringService }, { type: i2$1.RxWizardModalComponent }, { type: i3.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }], recordNameCellTemplate: [{
                type: ViewChild,
                args: ['recordNameCellTemplate', { static: true }]
            }], recordGrid: [{
                type: ViewChild,
                args: [RecordGridComponent, { static: true }]
            }] } });

class SelectDefinitionsWizardStepComponent {
    constructor(rxWizardModalComponent, rxAssociationDefinitionDataPageService, rxDefinitionNameService, rxDocumentDefinitionDataPageService, rxEventDefinitionDataPageService, rxEventStatisticsDefinitionDataPageService, rxNamedListDefinitionDataPageService, rxProcessDefinitionDataPageService, rxRecordDefinitionDataPageService, rxRuleDefinitionDataPageService, rxSessionExpirationService, rxStringService, rxViewDefinitionDataPageService, rxWebApiDefinitionDataPageService, translateService) {
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.rxAssociationDefinitionDataPageService = rxAssociationDefinitionDataPageService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxDocumentDefinitionDataPageService = rxDocumentDefinitionDataPageService;
        this.rxEventDefinitionDataPageService = rxEventDefinitionDataPageService;
        this.rxEventStatisticsDefinitionDataPageService = rxEventStatisticsDefinitionDataPageService;
        this.rxNamedListDefinitionDataPageService = rxNamedListDefinitionDataPageService;
        this.rxProcessDefinitionDataPageService = rxProcessDefinitionDataPageService;
        this.rxRecordDefinitionDataPageService = rxRecordDefinitionDataPageService;
        this.rxRuleDefinitionDataPageService = rxRuleDefinitionDataPageService;
        this.rxSessionExpirationService = rxSessionExpirationService;
        this.rxStringService = rxStringService;
        this.rxViewDefinitionDataPageService = rxViewDefinitionDataPageService;
        this.rxWebApiDefinitionDataPageService = rxWebApiDefinitionDataPageService;
        this.translateService = translateService;
        this.selectedDefinitionCount = 0;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        var _a, _b;
        this.rxWizardModalComponent.api.updateContext({
            cache: {}
        }, false);
        const gridColumns = [
            {
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.item-type.label'),
                fieldId: 'displayType',
                sortable: { direction: ColumnSortDirection.Desc, priority: 0 }
            },
            {
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                fieldId: 'displayName'
            },
            AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy,
            Object.assign({ sortable: { direction: ColumnSortDirection.Desc, priority: 1 } }, AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime),
            AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective
        ].map((column) => (Object.assign(Object.assign({}, column), { title: this.translateService.instant(column.title) })));
        const recordDefinition = {
            fieldDefinitions: [
                {
                    id: 'displayType',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'displayName',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy.fieldId,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime.fieldId,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
                },
                {
                    id: AX_BUNDLE_DETAILS.definitionGridColumns.customizationPerspective.fieldId,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
        const defaultParams = {
            propertySelection: ['name', 'lastUpdateTime', 'lastChangedBy', 'customizationPerspective']
        };
        const recordDefinitionsParams = {
            propertySelection: [...defaultParams.propertySelection, 'shouldExportData', 'type']
        };
        const viewDefinitionsParams = {
            excludeExtensionViews: false,
            propertySelection: [...defaultParams.propertySelection]
        };
        this.recordGridConfig$ = of({
            columns: gridColumns,
            enableColumnSelection: false,
            enableRowSelection: ((_a = this.options.gridConfig) === null || _a === void 0 ? void 0 : _a.enableRowSelection) || null,
            recordIdField: 'definitionTypeWithName',
            styles: 'flex-fill',
            useExternalFiltering: false,
            expandGroups: true,
            getRecordDefinition: () => of(recordDefinition),
            getData: (queryParams) => {
                this.rxWizardModalComponent.api.disableNextButton();
                return this.rxSessionExpirationService.keepSessionAlive().pipe(switchMap(() => combineLatest([
                    this.rxRecordDefinitionDataPageService.get({ params: recordDefinitionsParams }),
                    this.rxAssociationDefinitionDataPageService.get({ params: defaultParams }),
                    this.rxDocumentDefinitionDataPageService.get({ params: defaultParams }),
                    this.rxEventDefinitionDataPageService.get({ params: defaultParams }),
                    this.rxEventStatisticsDefinitionDataPageService.get({ params: defaultParams }),
                    this.rxNamedListDefinitionDataPageService.get({ params: defaultParams }),
                    this.rxProcessDefinitionDataPageService.get({ params: defaultParams }),
                    this.rxRuleDefinitionDataPageService.get({ params: defaultParams }),
                    this.rxViewDefinitionDataPageService.get({ params: viewDefinitionsParams }),
                    this.rxWebApiDefinitionDataPageService.get({ params: viewDefinitionsParams })
                ]).pipe(map(([recordDefinitions, associationDefinitions, documentDefinitions, eventDefinitions, eventStatisticsDefinitions, namedListDefinitions, processDefinitions, ruleDefinitions, viewDefinitions, webApiDefinitions]) => {
                    this.rxWizardModalComponent.api.updateContext({
                        cache: {
                            recordDefinitions: cloneDeep(recordDefinitions.data)
                        }
                    }, false);
                    this.selectedDefinitionCount = 0;
                    const definitions = reduce({
                        association: associationDefinitions,
                        document: documentDefinitions,
                        event: eventDefinitions,
                        eventStatistic: eventStatisticsDefinitions,
                        namedList: namedListDefinitions,
                        process: processDefinitions,
                        record: recordDefinitions,
                        rule: ruleDefinitions,
                        view: viewDefinitions,
                        webApi: webApiDefinitions
                    }, (allDefinitions, dataPage, definitionType) => {
                        var _a;
                        const definitionsByType = reject(dataPage.data, (definition) => definition.customizationPerspective ===
                            RX_OVERLAY.operationTypes.notCustomizedInThisOverlayGroup);
                        const displayType = this.rxStringService.prettify(definitionType);
                        definitionsByType.forEach((definition) => {
                            definition.type = definitionType;
                            definition.displayType = displayType;
                            definition.displayName = this.rxDefinitionNameService.getDisplayName(definition.name);
                            definition.definitionTypeWithName = `${definitionType}:${definition.name}`;
                        });
                        if (!((_a = this.options.gridConfig) === null || _a === void 0 ? void 0 : _a.enableRowSelection)) {
                            this.selectedDefinitionCount += definitionsByType.length;
                        }
                        return allDefinitions.concat((definitionsByType === null || definitionsByType === void 0 ? void 0 : definitionsByType.length)
                            ? [
                                {
                                    groupValue: displayType,
                                    groupField: 'displayType',
                                    items: definitionsByType
                                }
                            ]
                            : []);
                    }, []);
                    return {
                        data: definitions,
                        totalSize: definitions.length
                    };
                }))));
            }
        });
        if ((_b = this.options.gridConfig) === null || _b === void 0 ? void 0 : _b.enableRowSelection) {
            combineLatest([this.recordGrid.rowSelectionChanged, this.rxWizardModalComponent.context$.pipe(take(1))])
                .pipe(takeUntil(this.destroyed$))
                .subscribe(([selectedRows, context]) => {
                this.selectedDefinitionCount = selectedRows.length;
                const newDeploymentPackageDescriptor = cloneDeep(context.deploymentPackageDescriptor);
                newDeploymentPackageDescriptor.definitionsToDeployByType = selectedRows.reduce((definitionsToDeployByType, row) => {
                    var _a;
                    const definitionType = AX_BUNDLE_DETAILS.definitionTypes[row.type];
                    definitionsToDeployByType[definitionType] = (_a = definitionsToDeployByType[definitionType]) !== null && _a !== void 0 ? _a : [];
                    definitionsToDeployByType[definitionType].push(row.name);
                    return definitionsToDeployByType;
                }, {});
                this.rxWizardModalComponent.api.updateContext({
                    deploymentPackageDescriptor: newDeploymentPackageDescriptor,
                    isPackageDataModified: true
                }, this.selectedDefinitionCount > 0);
            });
        }
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    onDataLoaded() {
        this.rxWizardModalComponent.api.enableNextButton();
    }
}
/** @nocollapse */ SelectDefinitionsWizardStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectDefinitionsWizardStepComponent, deps: [{ token: i2$1.RxWizardModalComponent }, { token: i1$6.RxAssociationDefinitionDataPageService }, { token: i2.RxDefinitionNameService }, { token: i1$3.RxDocumentDefinitionDataPageService }, { token: i1$8.RxEventDefinitionDataPageService }, { token: i1$9.RxeventStatisticsDefinitionDataPageService }, { token: i1$7.RxNamedListDefinitionDataPageService }, { token: i6.RxProcessDefinitionDataPageService }, { token: i1$5.RxRecordDefinitionDataPageService }, { token: i2$4.RxRuleDefinitionDataPageService }, { token: i2.RxSessionExpirationService }, { token: i5$1.RxStringService }, { token: i2$3.RxViewDefinitionDataPageService }, { token: i1$4.RxWebApiDefinitionDataPageService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ SelectDefinitionsWizardStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SelectDefinitionsWizardStepComponent, selector: "ax-select-definitions-wizard-step", inputs: { options: "options" }, viewQueries: [{ propertyName: "recordGrid", first: true, predicate: RecordGridComponent, descendants: true, static: true }], ngImport: i0, template: "<div class=\"d-flex justify-content-between\">\n  <h5 class=\"mt-0\">\n    {{\n      'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions.customized-definitions.label'\n        | translate\n    }}\n  </h5>\n  <div>\n    {{\n      'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions.definitions-count.label'\n        | translate\n          : {\n              count: selectedDefinitionCount,\n              packageType: this.options.displayName.toLowerCase()\n            }\n    }}\n  </div>\n</div>\n\n<div class=\"mb-3\">\n  {{\n    'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions.definitions-included-in-the-package.label'\n      | translate\n  }}\n</div>\n\n<rx-record-grid [config]=\"recordGridConfig$\" (dataLoaded)=\"onDataLoaded()\"></rx-record-grid>\n", styles: [":host{display:flex;flex-direction:column;height:100%}rx-record-grid{height:100%}\n"], components: [{ type: i5.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectDefinitionsWizardStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-select-definitions-wizard-step',
                    templateUrl: './select-definitions-wizard-step.component.html',
                    styleUrls: ['./select-definitions-wizard-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i2$1.RxWizardModalComponent }, { type: i1$6.RxAssociationDefinitionDataPageService }, { type: i2.RxDefinitionNameService }, { type: i1$3.RxDocumentDefinitionDataPageService }, { type: i1$8.RxEventDefinitionDataPageService }, { type: i1$9.RxeventStatisticsDefinitionDataPageService }, { type: i1$7.RxNamedListDefinitionDataPageService }, { type: i6.RxProcessDefinitionDataPageService }, { type: i1$5.RxRecordDefinitionDataPageService }, { type: i2$4.RxRuleDefinitionDataPageService }, { type: i2.RxSessionExpirationService }, { type: i5$1.RxStringService }, { type: i2$3.RxViewDefinitionDataPageService }, { type: i1$4.RxWebApiDefinitionDataPageService }, { type: i3.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }], recordGrid: [{
                type: ViewChild,
                args: [RecordGridComponent, { static: true }]
            }] } });

const AX_BUNDLE_PACKAGING = {
    packageRegistry: {
        recordDefinitionName: 'BundleDeploy:PackageRegistry',
        fieldIds: {
            deployError: 3292,
            type: 3303,
            bundlePackageDescriptor: 3311,
            name: 3276,
            packageDeployStatus: RX_RECORD_DEFINITION.coreFieldIds.status
        }
    },
    packageTypes: {
        content: 3
    }
};

const AX_CONTENT_PACKAGE_IMPORT_LOGS = {
    messageTypes: {
        all: 'ALL'
    },
    importStatuses: {
        IMPORT_DEFINITIONS_SUCCESS: 'success',
        IMPORT_DEFINITIONS_WARNING: 'warning',
        IMPORT_DEFINITIONS_ERROR: 'error',
        IMPORT_DEFINITIONS_UNCHANGED: 'unchanged'
    },
    definitionTypeMap: {
        DOCUMENT_DEFINITION: 'Document',
        EVENT_DEFINITION: 'Event',
        EVENT_STATISTICS_DEFINITION: 'Event Statistic',
        NAMED_LIST: 'Names List',
        PROCESS_DEFINITION: 'Process',
        RECORD_DEFINITION: 'Record',
        RULE_DEFINITION: 'Rule',
        VIEW_DEFINITION: 'View',
        WEBAPI_DEFINITION: 'Web API'
    }
};

class ContentPackageImportLogsComponent extends RxModalClass {
    constructor(activeModalRef, axBundleDeploymentService, datePipe, injector, rxBundleCacheService, rxDefinitionNameService, rxGlobalCacheService, rxJsonParserService, rxModalService, rxRecordInstanceDataPageService, rxRecordInstanceService, rxStringService, translateService) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.axBundleDeploymentService = axBundleDeploymentService;
        this.datePipe = datePipe;
        this.injector = injector;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxModalService = rxModalService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxStringService = rxStringService;
        this.translateService = translateService;
        this.busyConfig = {
            busy: null,
            sticky: true,
            message: this.translateService.instant('com.bmc.arsys.rx.client.loading-data.label'),
            loaderType: LoaderType.LINE
        };
        this.viewTypes = [true, false];
        this.messageTypes = [true, false, false, false];
        this.packageCreationDateControl = new FormControl([]);
        this.packageNameControl = new FormControl('');
        this.createdByControl = new FormControl('');
        this.viewTypeControl = new FormControl(this.viewTypes);
        this.messagesTypeControl = new FormControl(this.messageTypes);
        this.buttonGroupConfig = [
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.common.definitions.label')
            },
            {
                name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.title')
            }
        ];
        this.messagesButtonGroupConfig = [
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.common.all.label'),
                value: AX_CONTENT_PACKAGE_IMPORT_LOGS.messageTypes.all
            },
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.common.success.label'),
                value: 'SUCCESS'
            },
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                value: 'WARNING'
            },
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.common.error.label'),
                value: 'ERROR'
            },
            {
                name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.content-package-import-logs.unchanged.label'),
                value: 'UNCHANGED'
            }
        ];
        this.selectedPackageContent = {};
        this.gridColumns = [
            {
                field: 'bundleName',
                header: ''
            }
        ];
        this.expandedRowColumns = {
            data: [
                {
                    field: 'dataSource',
                    header: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.data-source.label')
                },
                {
                    field: 'successCount',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.success.label')
                },
                {
                    field: 'warningCount',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label')
                },
                {
                    field: 'errorCount',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.error.label')
                },
                {
                    field: 'UnchangedCount',
                    header: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.content-package-import-logs.unchanged.label')
                }
            ],
            definitions: [
                {
                    field: 'definitionType',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.definition-type.label')
                },
                {
                    field: 'success',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.success.label')
                },
                {
                    field: 'warning',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label')
                },
                {
                    field: 'error',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.error.label')
                },
                {
                    field: 'Unchanged',
                    header: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.content-package-import-logs.unchanged.label')
                }
            ]
        };
        this.messagesGridColumns = {
            data: [
                {
                    field: 'dataSource',
                    header: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.data-source.label'),
                    width: '20%'
                },
                {
                    field: 'message',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.message.label')
                }
            ],
            definitions: [
                {
                    field: 'definitionType',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.definition-type.label'),
                    width: '20%'
                },
                {
                    field: 'name',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label')
                },
                {
                    field: 'message',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.message.label')
                }
            ]
        };
        this.gridData = [];
        this.messagesGridData = [];
        this.gridSelectedItems = [];
        this.expandedRowKeys = {};
        this.packagesList$ = this.rxRecordInstanceDataPageService
            .post({
            params: {
                recorddefinition: AX_BUNDLE_PACKAGING.packageRegistry.recordDefinitionName,
                propertySelection: [
                    RX_RECORD_DEFINITION.coreFieldIds.createdBy,
                    RX_RECORD_DEFINITION.coreFieldIds.modifiedDate,
                    RX_RECORD_DEFINITION.coreFieldIds.id,
                    ...values(AX_BUNDLE_PACKAGING.packageRegistry.fieldIds)
                ],
                queryExpression: [
                    `'${AX_BUNDLE_PACKAGING.packageRegistry.fieldIds.name}'="${this.rxBundleCacheService.bundleId}"`,
                    `'${AX_BUNDLE_PACKAGING.packageRegistry.fieldIds.type}'=${AX_BUNDLE_PACKAGING.packageTypes.content}`,
                    `'${AX_BUNDLE_PACKAGING.packageRegistry.fieldIds.deployError}'!=$NULL$`,
                    `'${AX_BUNDLE_PACKAGING.packageRegistry.fieldIds.packageDeployStatus}'="${AX_BUNDLE_DETAILS.packageDeployStatuses.deployed}"`
                ].join(' AND '),
                sortBy: -RX_RECORD_DEFINITION.coreFieldIds.modifiedDate
            }
        })
            .pipe(map((recordInstanceDataPage) => recordInstanceDataPage.data));
        this.packagesList = [];
        this.destroyed$ = new ReplaySubject(1);
        this.optionFormatter = this.optionFormatter.bind(this);
    }
    ngOnInit() {
        super.ngOnInit();
        this.busyConfig.busy = this.packagesList$.pipe(take(1)).subscribe((packagesList) => {
            if (packagesList.length) {
                this.packageCreationDateControl.setValue([packagesList[0]]);
            }
            this.packagesList = packagesList;
        });
        this.packageCreationDateControl.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
            const selectedPackage = first(value);
            if (selectedPackage) {
                this.packageNameControl.setValue(selectedPackage[AX_BUNDLE_PACKAGING.packageRegistry.fieldIds.name]);
                this.createdByControl.setValue(selectedPackage[RX_RECORD_DEFINITION.coreFieldIds.createdBy]);
                this.selectedPackageContent = this.rxJsonParserService.tryParseJson(selectedPackage[AX_BUNDLE_PACKAGING.packageRegistry.fieldIds.deployError]);
            }
            else {
                this.selectedPackageContent = {};
            }
            this.updateGridData();
        });
        this.viewTypeControl.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((buttonGroup) => {
            this.viewTypes = buttonGroup;
            this.gridSelectedItems = [];
            this.updateGridData();
            this.updateMessagesGridData();
        });
        this.messagesTypeControl.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((messagesButtonGroup) => {
            this.messageTypes = messagesButtonGroup;
            this.updateMessagesGridData();
        });
    }
    updateGridData() {
        var _a, _b, _c, _d;
        if (this.viewTypes[0] && ((_b = (_a = this.selectedPackageContent) === null || _a === void 0 ? void 0 : _a.overallImportSummary) === null || _b === void 0 ? void 0 : _b.definition)) {
            this.gridData = this.selectedPackageContent.overallImportSummary.definition.reduce((result, definitionsByType) => {
                definitionsByType.status.forEach((status) => {
                    const bundle = this.rxDefinitionNameService.getBundleId(status.name);
                    let bundleGroup = find(result, { groupValue: bundle });
                    if (bundleGroup) {
                        let definition = find(bundleGroup.subTableItems, {
                            definitionType: AX_CONTENT_PACKAGE_IMPORT_LOGS.definitionTypeMap[definitionsByType.definitionType]
                        });
                        if (!definition) {
                            definition = {
                                definitionType: AX_CONTENT_PACKAGE_IMPORT_LOGS.definitionTypeMap[definitionsByType.definitionType],
                                error: 0,
                                statuses: [],
                                success: 0,
                                unchanged: 0,
                                warning: 0
                            };
                            bundleGroup.subTableItems.push(definition);
                        }
                        definition[AX_CONTENT_PACKAGE_IMPORT_LOGS.importStatuses[status.messageType]]++;
                        definition.statuses.push(status);
                    }
                    else {
                        const definition = {
                            definitionType: AX_CONTENT_PACKAGE_IMPORT_LOGS.definitionTypeMap[definitionsByType.definitionType],
                            error: 0,
                            statuses: [status],
                            success: 0,
                            unchanged: 0,
                            warning: 0
                        };
                        definition[AX_CONTENT_PACKAGE_IMPORT_LOGS.importStatuses[status.messageType]]++;
                        bundleGroup = {
                            bundleName: bundle,
                            groupValue: bundle,
                            groupField: 'bundleName',
                            subTableItems: [definition]
                        };
                        this.rxGlobalCacheService
                            .getBundleFriendlyName(bundle)
                            .pipe(take(1))
                            .subscribe((bundleFriendlyName) => {
                            bundleGroup.bundleName = bundleFriendlyName;
                            this.expandedRowKeys[bundleFriendlyName] = true;
                        });
                        result.push(bundleGroup);
                    }
                });
                return result;
            }, []);
        }
        else if (this.viewTypes[1] && ((_d = (_c = this.selectedPackageContent) === null || _c === void 0 ? void 0 : _c.overallImportSummary) === null || _d === void 0 ? void 0 : _d.data)) {
            this.gridData = this.selectedPackageContent.overallImportSummary.data.reduce((result, dataItem) => {
                const bundle = this.rxDefinitionNameService.getBundleId(dataItem.recordDefinitionName);
                const dataSource = this.rxDefinitionNameService.getDisplayName(dataItem.recordDefinitionName);
                const item = Object.assign({ dataSource }, dataItem);
                let bundleGroup = find(result, { groupValue: bundle });
                if (bundleGroup) {
                    bundleGroup.subTableItems.push(item);
                }
                else {
                    bundleGroup = {
                        bundleName: bundle,
                        groupValue: bundle,
                        groupField: 'bundleName',
                        subTableItems: [item]
                    };
                    this.rxGlobalCacheService
                        .getBundleFriendlyName(bundle)
                        .pipe(take(1))
                        .subscribe((bundleFriendlyName) => {
                        bundleGroup.bundleName = bundleFriendlyName;
                    });
                    result.push(bundleGroup);
                }
                return result;
            }, []);
        }
    }
    updateMessagesGridData() {
        const messagesType = this.messagesButtonGroupConfig[this.messageTypes.indexOf(true)].value;
        if (this.viewTypes[0]) {
            this.messagesGridData = this.gridSelectedItems.reduce((result, item) => {
                const messages = item.statuses.reduce((res, status) => {
                    const statusMessages = status.messages.reduce((resultMessages, message) => {
                        if (messagesType === AX_CONTENT_PACKAGE_IMPORT_LOGS.messageTypes.all || startsWith(message, messagesType)) {
                            resultMessages.push({
                                definitionType: item.definitionType,
                                message,
                                name: this.rxDefinitionNameService.getDisplayName(status.name)
                            });
                        }
                        return resultMessages;
                    }, []);
                    return [...res, ...statusMessages];
                }, []);
                return [...result, ...messages];
            }, []);
        }
        else if (this.viewTypes[1]) {
            this.messagesGridData = this.gridSelectedItems.reduce((result, item) => {
                const messages = item.messages.reduce((res, message) => {
                    if (messagesType === AX_CONTENT_PACKAGE_IMPORT_LOGS.messageTypes.all || startsWith(message, messagesType)) {
                        res.push({
                            dataSource: item.dataSource,
                            message
                        });
                    }
                    return res;
                }, []);
                return [...result, ...messages];
            }, []);
        }
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    optionFormatter(entry) {
        return this.datePipe.transform(entry[RX_RECORD_DEFINITION.coreFieldIds.modifiedDate], 'medium');
    }
    onSelectionChange(selectedData) {
        this.gridSelectedItems = selectedData;
        this.updateMessagesGridData();
    }
    close() {
        this.activeModalRef.close();
    }
}
/** @nocollapse */ ContentPackageImportLogsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContentPackageImportLogsComponent, deps: [{ token: i1.ActiveModalRef }, { token: AxBundleDeploymentService }, { token: i8.DatePipe }, { token: i0.Injector }, { token: i2.RxBundleCacheService }, { token: i2.RxDefinitionNameService }, { token: i2.RxGlobalCacheService }, { token: i5$1.RxJsonParserService }, { token: i3$1.RxModalService }, { token: i1$5.RxRecordInstanceDataPageService }, { token: i1$5.RxRecordInstanceService }, { token: i5$1.RxStringService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ ContentPackageImportLogsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ContentPackageImportLogsComponent, selector: "ax-content-package-import-logs", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ 'com.bmc.arsys.rx.innovation-studio.content-package-import-logs.label' | translate }}\n  </h5>\n\n  <button\n    [attr.aria-label]=\"'com.bmc.arsys.rx.client.common.close.label' | translate\"\n    (click)=\"close()\"\n    class=\"close dp-close\"\n    rx-id=\"x-button\"\n    type=\"button\"\n  ></button>\n</div>\n\n<div class=\"modal-body d-flex flex-column\">\n  <div [ngBusy]=\"busyConfig\" class=\"container-fluid mb-3 pr-0\">\n    <div class=\"row flex-nowrap\">\n      <div class=\"row col-12 pr-0\">\n        <div class=\"col pl-0\">\n          <adapt-rx-select\n            [options]=\"packagesList\"\n            [optionFormatter]=\"optionFormatter\"\n            [popupMaxHeight]=\"560\"\n            [formControl]=\"packageCreationDateControl\"\n            [label]=\"\n              'com.bmc.arsys.rx.innovation-studio.manage-content-packages.package-creation-date.label' | translate\n            \"\n            appendToBody=\"true\"\n            rx-id=\"package-creation-date-select\"\n          >\n          </adapt-rx-select>\n        </div>\n        <div class=\"col\">\n          <adapt-rx-textfield\n            [disabledStyleForReadonlyState]=\"true\"\n            [label]=\"'com.bmc.arsys.rx.innovation-studio.packaging.package-name.label' | translate\"\n            [readonly]=\"true\"\n            [formControl]=\"packageNameControl\"\n            name=\"packageName\"\n            rx-id=\"package-name-field\"\n          ></adapt-rx-textfield>\n        </div>\n        <div class=\"col\">\n          <adapt-rx-textfield\n            [disabledStyleForReadonlyState]=\"true\"\n            [label]=\"'com.bmc.arsys.rx.innovation-studio.manage-content-packages.created-by.label' | translate\"\n            [readonly]=\"true\"\n            [formControl]=\"createdByControl\"\n            name=\"createdBy\"\n            rx-id=\"created-by-field\"\n          ></adapt-rx-textfield>\n        </div>\n        <div class=\"col pr-0\">\n          <adapt-rx-control-label label=\"{{ 'com.bmc.arsys.rx.client.common.action-view.label' | translate }}\">\n          </adapt-rx-control-label>\n\n          <adapt-button-group\n            [config]=\"buttonGroupConfig\"\n            [multiselectable]=\"false\"\n            [uncheckable]=\"false\"\n            [formControl]=\"viewTypeControl\"\n          ></adapt-button-group>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"adapt-table-toolbar adapt-table-toolbar_bordered font-weight-bold px-5 pt-2\">\n    {{ 'com.bmc.arsys.rx.client.common.application.label' | translate }}/{{\n      'com.bmc.arsys.rx.client.common.library.label' | translate\n    }}\n  </div>\n  <div class=\"h-100\">\n    <div class=\"h-50\">\n      <adapt-table\n        [bordered]=\"true\"\n        [columns]=\"gridColumns\"\n        [sortable]=\"true\"\n        [value]=\"gridData\"\n        [dataKey]=\"'bundleName'\"\n        [expandedRowKeys]=\"expandedRowKeys\"\n        [expandedRowTemplate]=\"expandedRowTemplate\"\n        [scrollable]=\"true\"\n        scrollHeight=\"flex\"\n        class=\"application-library-table\"\n      ></adapt-table>\n    </div>\n    <div class=\"h-50 overflow-hidden border-bottom\">\n      <adapt-rx-control-label\n        label=\"{{ 'com.bmc.arsys.rx.client.common.messages.label' | translate }}\"\n        class=\"d-flex my-2\"\n      ></adapt-rx-control-label>\n      <div class=\"my-2\">\n        <adapt-button-group\n          [config]=\"messagesButtonGroupConfig\"\n          [multiselectable]=\"false\"\n          [uncheckable]=\"false\"\n          [formControl]=\"messagesTypeControl\"\n          class=\"mb-2\"\n        ></adapt-button-group>\n      </div>\n      <adapt-table\n        [bordered]=\"true\"\n        [columns]=\"viewTypeControl.value[0] ? messagesGridColumns.definitions : messagesGridColumns.data\"\n        [dataKey]=\"'definitionType'\"\n        [sortable]=\"true\"\n        [sortMode]=\"'multiple'\"\n        [value]=\"messagesGridData\"\n        [scrollable]=\"true\"\n        scrollHeight=\"190px\"\n      ></adapt-table>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button adapt-button type=\"button\" btn-type=\"secondary\" rx-id=\"close-button\" (click)=\"close()\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n\n<ng-template #expandedRowTemplate let-dataItem=\"dataItem\" let-rowIndex=\"rowIndex\">\n  <div>\n    <adapt-table\n      [columns]=\"viewTypeControl.value[0] ? expandedRowColumns.definitions : expandedRowColumns.data\"\n      [value]=\"dataItem.subTableItems\"\n      [sortable]=\"true\"\n      [sortMode]=\"'multiple'\"\n      [selectionMode]=\"'multiple'\"\n      [selection]=\"gridSelectedItems\"\n      (selectionChange)=\"onSelectionChange($event)\"\n    ></adapt-table>\n  </div>\n</ng-template>\n", styles: [":host{display:flex;flex-direction:column;height:100%}adapt-table.application-library-table::ng-deep .ui-table-thead{display:none}adapt-table.application-library-table::ng-deep adapt-table .ui-table-thead{display:table-header-group}\n"], components: [{ type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1.AdaptButtonGroupComponent, selector: "adapt-button-group", inputs: ["config", "size", "groupType", "isVertical", "multiselectable", "uncheckable", "useCheckboxStyle"], outputs: ["modelArrayChanged"], exportAs: ["adaptBtnGroup"] }, { type: i9.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i1.AdaptBusyDirective, selector: "[adapt-busy], [ngBusy]", inputs: ["ngBusy", "adaptRadarDisableEventSending", "busyPromise", "determinate"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContentPackageImportLogsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-content-package-import-logs',
                    templateUrl: './content-package-import-logs.component.html',
                    styleUrls: ['content-package-import-logs.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: AxBundleDeploymentService }, { type: i8.DatePipe }, { type: i0.Injector }, { type: i2.RxBundleCacheService }, { type: i2.RxDefinitionNameService }, { type: i2.RxGlobalCacheService }, { type: i5$1.RxJsonParserService }, { type: i3$1.RxModalService }, { type: i1$5.RxRecordInstanceDataPageService }, { type: i1$5.RxRecordInstanceService }, { type: i5$1.RxStringService }, { type: i3.TranslateService }]; } });

class ManageContentPackagesComponent extends RxModalClass {
    constructor(activeModalRef, axBundleDeploymentService, datePipe, injector, rxBundleCacheService, rxDefinitionNameService, rxGlobalCacheService, rxJsonParserService, rxModalService, rxRecordInstanceDataPageService, rxRecordInstanceService, rxStringService, translateService) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.axBundleDeploymentService = axBundleDeploymentService;
        this.datePipe = datePipe;
        this.injector = injector;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxModalService = rxModalService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxStringService = rxStringService;
        this.translateService = translateService;
        this.busyConfig = {
            busy: null,
            sticky: true,
            message: this.translateService.instant('com.bmc.arsys.rx.client.common.loading-data'),
            loaderType: LoaderType.LINE
        };
        this.viewType = [true, false];
        this.packageCreationDateControl = new FormControl([]);
        this.packageNameControl = new FormControl('');
        this.createdByControl = new FormControl('');
        this.viewTypeControl = new FormControl(this.viewType);
        this.buttonGroupConfig = [
            {
                name: 'Definitions',
                value: this.translateService.instant('com.bmc.arsys.rx.client.common.definitions.label')
            },
            {
                name: 'Data',
                value: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.title')
            }
        ];
        this.gridColumns = [
            {
                field: 'bundleName',
                header: ''
            }
        ];
        this.gridData = [];
        this.expandedRowColumns = {
            definitions: [
                {
                    field: 'type',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.definition-type.label')
                },
                { field: 'name', header: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label') }
            ],
            data: [
                {
                    field: 'dataSource',
                    header: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.data-source.label')
                },
                {
                    field: 'dataFilter',
                    header: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.data-filter.label')
                },
                {
                    field: 'ignoreRuleExecution',
                    header: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.ignore-rules.label')
                },
                {
                    field: 'duplicateDataActionType',
                    header: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.duplicates.label')
                }
            ]
        };
        this.expandedRowKeys = {};
        this.packagesList$ = this.rxRecordInstanceDataPageService
            .post({
            params: {
                recorddefinition: AX_BUNDLE_PACKAGING.packageRegistry.recordDefinitionName,
                propertySelection: [
                    RX_RECORD_DEFINITION.coreFieldIds.createdBy,
                    RX_RECORD_DEFINITION.coreFieldIds.modifiedDate,
                    RX_RECORD_DEFINITION.coreFieldIds.id,
                    ...values(AX_BUNDLE_PACKAGING.packageRegistry.fieldIds)
                ],
                queryExpression: [
                    `'${AX_BUNDLE_PACKAGING.packageRegistry.fieldIds.name}'="${this.rxBundleCacheService.bundleId}"`,
                    `'${AX_BUNDLE_PACKAGING.packageRegistry.fieldIds.type}'=${AX_BUNDLE_PACKAGING.packageTypes.content}`,
                    `'${AX_BUNDLE_PACKAGING.packageRegistry.fieldIds.bundlePackageDescriptor}'!=$NULL$`
                ].join(' AND '),
                sortBy: -RX_RECORD_DEFINITION.coreFieldIds.modifiedDate
            }
        })
            .pipe(map((recordInstanceDataPage) => recordInstanceDataPage.data));
        this.packageCreationDateTooltip = {
            popoverMode: true,
            iconName: 'question_circle_o',
            placement: 'right',
            content: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.manage-content-packages.package-creation-date.tooltip')
        };
        this.packagesList = [];
        this.destroyed$ = new ReplaySubject(1);
        this.optionFormatter = this.optionFormatter.bind(this);
    }
    ngOnInit() {
        super.ngOnInit();
        this.busyConfig.busy = this.packagesList$.pipe(take(1)).subscribe((packagesList) => {
            if (packagesList.length) {
                this.packageCreationDateControl.setValue([packagesList[0]]);
            }
            this.packagesList = packagesList;
        });
        this.packageCreationDateControl.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
            const selectedPackage = first(value);
            if (selectedPackage) {
                this.selectedPackageContent = this.rxJsonParserService.tryParseJson(selectedPackage[AX_BUNDLE_PACKAGING.packageRegistry.fieldIds.bundlePackageDescriptor]);
                this.createdByControl.setValue(selectedPackage[RX_RECORD_DEFINITION.coreFieldIds.createdBy]);
                this.packageNameControl.setValue(this.selectedPackageContent.customPackageName);
            }
            else {
                this.selectedPackageContent = {};
            }
            this.updateGridData();
        });
        this.viewTypeControl.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((buttonGroup) => {
            this.viewType = buttonGroup;
            this.updateGridData();
        });
    }
    updateGridData() {
        var _a, _b;
        if (this.viewType[0] && ((_a = this.selectedPackageContent) === null || _a === void 0 ? void 0 : _a.definitionsToDeployByType)) {
            this.gridData = reduce(this.selectedPackageContent.definitionsToDeployByType, (result, definitionsByType, definitionType) => {
                const displayType = this.rxStringService.prettify(definitionType);
                definitionsByType.forEach((definitionName) => {
                    const definition = {
                        type: displayType,
                        bundle: this.rxDefinitionNameService.getBundleId(definitionName),
                        name: this.rxDefinitionNameService.getDisplayName(definitionName)
                    };
                    let bundleGroup = find(result, { groupValue: definition.bundle });
                    if (bundleGroup) {
                        bundleGroup.subTableItems.push(definition);
                    }
                    else {
                        bundleGroup = {
                            bundleName: definition.bundle,
                            groupValue: definition.bundle,
                            groupField: 'bundleName',
                            subTableItems: [definition]
                        };
                        this.rxGlobalCacheService
                            .getBundleFriendlyName(this.rxDefinitionNameService.getBundleId(definitionName))
                            .pipe(take(1))
                            .subscribe((bundleFriendlyName) => {
                            bundleGroup.bundleName = bundleFriendlyName;
                            this.expandedRowKeys[bundleFriendlyName] = true;
                        });
                        result.push(bundleGroup);
                    }
                });
                return result;
            }, []);
        }
        else if (this.viewType[1] && ((_b = this.selectedPackageContent) === null || _b === void 0 ? void 0 : _b.dataImportOptionsByRecordDefinitionName)) {
            this.gridData = reduce(this.selectedPackageContent.dataImportOptionsByRecordDefinitionName, (result, data, definitionName) => {
                const bundle = this.rxDefinitionNameService.getBundleId(definitionName);
                data.dataSource = this.rxDefinitionNameService.getDisplayName(definitionName);
                let bundleGroup = find(result, { groupValue: bundle });
                if (bundleGroup) {
                    bundleGroup.subTableItems.push(data);
                }
                else {
                    bundleGroup = {
                        bundleName: bundle,
                        groupValue: bundle,
                        groupField: 'bundleName',
                        subTableItems: [data]
                    };
                    this.rxGlobalCacheService
                        .getBundleFriendlyName(this.rxDefinitionNameService.getBundleId(definitionName))
                        .pipe(take(1))
                        .subscribe((bundleFriendlyName) => {
                        bundleGroup.bundleName = bundleFriendlyName;
                        this.expandedRowKeys[bundleFriendlyName] = true;
                    });
                    result.push(bundleGroup);
                }
                return result;
            }, []);
        }
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    optionFormatter(entry) {
        return this.datePipe.transform(entry[RX_RECORD_DEFINITION.coreFieldIds.modifiedDate], 'medium');
    }
    downloadPackage() {
        this.axBundleDeploymentService
            .download(first(this.packageCreationDateControl.value)[AX_BUNDLE_PACKAGING.packageRegistry.fieldIds.name], first(this.packageCreationDateControl.value)[RX_RECORD_DEFINITION.coreFieldIds.id])
            .subscribe((data) => {
            RxFileService.saveFile(data);
        });
    }
    deletePackage() {
        this.rxModalService
            .confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.manage-content-packages.delete-confirmation.message')
        })
            .then((result) => {
            if (result) {
                this.busyConfig.busy = this.rxRecordInstanceService
                    .delete(AX_BUNDLE_PACKAGING.packageRegistry.recordDefinitionName, first(this.packageCreationDateControl.value)[RX_RECORD_DEFINITION.coreFieldIds.id])
                    .pipe(switchMapTo(this.packagesList$), take(1))
                    .subscribe((packagesList) => {
                    this.packagesList = packagesList;
                    this.gridData = [];
                    this.packageCreationDateControl.setValue([]);
                    this.packageNameControl.setValue('');
                    this.createdByControl.setValue('');
                });
            }
        });
    }
    close() {
        this.activeModalRef.close();
    }
}
/** @nocollapse */ ManageContentPackagesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ManageContentPackagesComponent, deps: [{ token: i1.ActiveModalRef }, { token: AxBundleDeploymentService }, { token: i8.DatePipe }, { token: i0.Injector }, { token: i2.RxBundleCacheService }, { token: i2.RxDefinitionNameService }, { token: i2.RxGlobalCacheService }, { token: i5$1.RxJsonParserService }, { token: i3$1.RxModalService }, { token: i1$5.RxRecordInstanceDataPageService }, { token: i1$5.RxRecordInstanceService }, { token: i5$1.RxStringService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ ManageContentPackagesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ManageContentPackagesComponent, selector: "ax-manage-content-packages", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ 'com.bmc.arsys.rx.innovation-studio.manage-content-packages.label' | translate }}\n  </h5>\n\n  <button\n    [attr.aria-label]=\"'com.bmc.arsys.rx.client.common.close.label' | translate\"\n    (click)=\"close()\"\n    class=\"close dp-close\"\n    rx-id=\"x-button\"\n    type=\"button\"\n  ></button>\n</div>\n\n<div class=\"modal-body d-flex flex-column\">\n  <div [ngBusy]=\"busyConfig\" class=\"container-fluid mb-3 pr-0\">\n    <div class=\"row flex-nowrap\">\n      <div class=\"row col-12 pr-0\">\n        <div class=\"col pl-0\">\n          <adapt-rx-select\n            [options]=\"packagesList\"\n            [optionFormatter]=\"optionFormatter\"\n            [popupMaxHeight]=\"560\"\n            [formControl]=\"packageCreationDateControl\"\n            [label]=\"\n              'com.bmc.arsys.rx.innovation-studio.manage-content-packages.package-creation-date.label' | translate\n            \"\n            [tooltip]=\"packageCreationDateTooltip\"\n            appendToBody=\"true\"\n            rx-id=\"package-creation-date-select\"\n          >\n          </adapt-rx-select>\n        </div>\n        <div class=\"col\">\n          <adapt-rx-textfield\n            [disabledStyleForReadonlyState]=\"true\"\n            [label]=\"'com.bmc.arsys.rx.innovation-studio.packaging.package-name.label' | translate\"\n            [readonly]=\"true\"\n            [formControl]=\"packageNameControl\"\n            name=\"packageName\"\n            rx-id=\"package-name-field\"\n          ></adapt-rx-textfield>\n        </div>\n        <div class=\"col\">\n          <adapt-rx-textfield\n            [disabledStyleForReadonlyState]=\"true\"\n            [label]=\"'com.bmc.arsys.rx.innovation-studio.manage-content-packages.created-by.label' | translate\"\n            [readonly]=\"true\"\n            [formControl]=\"createdByControl\"\n            name=\"createdBy\"\n            rx-id=\"created-by-field\"\n          ></adapt-rx-textfield>\n        </div>\n        <div class=\"col pr-0\">\n          <adapt-rx-control-label label=\"{{ 'com.bmc.arsys.rx.client.common.action-view.label' | translate }}\">\n          </adapt-rx-control-label>\n\n          <adapt-button-group\n            [config]=\"buttonGroupConfig\"\n            [multiselectable]=\"false\"\n            [uncheckable]=\"false\"\n            [formControl]=\"viewTypeControl\"\n          ></adapt-button-group>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"adapt-table-toolbar adapt-table-toolbar_bordered font-weight-bold px-5 pt-2\">\n    {{ 'com.bmc.arsys.rx.client.common.application.label' | translate }}/{{\n      'com.bmc.arsys.rx.client.common.library.label' | translate\n    }}\n  </div>\n\n  <adapt-table\n    [bordered]=\"true\"\n    [columns]=\"gridColumns\"\n    [sortable]=\"true\"\n    [value]=\"gridData\"\n    [dataKey]=\"'bundleName'\"\n    [expandedRowTemplate]=\"expandedRowTemplate\"\n    [expandedRowKeys]=\"expandedRowKeys\"\n    [scrollable]=\"true\"\n    scrollHeight=\"flex\"\n  ></adapt-table>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    rx-id=\"download-button\"\n    [disabled]=\"!packageCreationDateControl.value?.length\"\n    (click)=\"downloadPackage()\"\n  >\n    {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.download.title' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    rx-id=\"delete-button\"\n    [disabled]=\"!packageCreationDateControl.value?.length\"\n    (click)=\"deletePackage()\"\n  >\n    {{ 'com.bmc.arsys.rx.innovation-studio.manage-content-packages.delete-package.label' | translate }}\n  </button>\n\n  <button adapt-button type=\"button\" btn-type=\"secondary\" rx-id=\"close-button\" (click)=\"close()\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n\n<ng-template #expandedRowTemplate let-dataItem=\"dataItem\" let-rowIndex=\"rowIndex\">\n  <div>\n    <adapt-table\n      [columns]=\"viewTypeControl.value[0] ? expandedRowColumns.definitions : expandedRowColumns.data\"\n      [value]=\"dataItem.subTableItems\"\n      [sortable]=\"true\"\n      [sortMode]=\"'multiple'\"\n    ></adapt-table>\n  </div>\n</ng-template>\n", styles: [":host{display:flex;flex-direction:column;height:100%}adapt-table::ng-deep .ui-table-thead{display:none}adapt-table::ng-deep adapt-table .ui-table-thead{display:table-header-group}\n"], components: [{ type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1.AdaptButtonGroupComponent, selector: "adapt-button-group", inputs: ["config", "size", "groupType", "isVertical", "multiselectable", "uncheckable", "useCheckboxStyle"], outputs: ["modelArrayChanged"], exportAs: ["adaptBtnGroup"] }, { type: i9.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i1.AdaptBusyDirective, selector: "[adapt-busy], [ngBusy]", inputs: ["ngBusy", "adaptRadarDisableEventSending", "busyPromise", "determinate"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ManageContentPackagesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-manage-content-packages',
                    templateUrl: './manage-content-packages.component.html',
                    styleUrls: ['manage-content-packages.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: AxBundleDeploymentService }, { type: i8.DatePipe }, { type: i0.Injector }, { type: i2.RxBundleCacheService }, { type: i2.RxDefinitionNameService }, { type: i2.RxGlobalCacheService }, { type: i5$1.RxJsonParserService }, { type: i3$1.RxModalService }, { type: i1$5.RxRecordInstanceDataPageService }, { type: i1$5.RxRecordInstanceService }, { type: i5$1.RxStringService }, { type: i3.TranslateService }]; } });

class BundleDetails {
    constructor(bundleDescriptor, injector) {
        this.bundleDescriptor = bundleDescriptor;
        this.injector = injector;
        const rxOverlayService = injector.get(RxOverlayService);
        const rxCurrentUserService = injector.get(RxCurrentUserService);
        const rxBundleService = injector.get(RxBundleService);
        this.friendlyName = bundleDescriptor.friendlyName;
        this.description = bundleDescriptor.description;
        this.version = bundleDescriptor.displayVersion || bundleDescriptor.version;
        this.developerId = bundleDescriptor.developerId;
        this.developerName = bundleDescriptor.developerName;
        this.id = bundleDescriptor.id;
        this.hasCustomEntryPoint = bundleDescriptor.hasCustomEntryPoint;
        this.containsJavaScript = bundleDescriptor.containsJavaScript;
        const overlayContext = rxOverlayService.getCurrentOverlayContext();
        this.isBundleFromCurrentOverlayGroup =
            overlayContext &&
                bundleDescriptor.overlayGroupId === overlayContext.overlayGroupId &&
                bundleDescriptor.customizationPerspective ===
                    RX_OVERLAY.bundleCustomizationOperationTypes.createdInThisOverlayGroup;
        this.type = bundleDescriptor.isApplication ? RX_BUNDLE.bundleTypes.application : RX_BUNDLE.bundleTypes.library;
        this.isFoundationBundle = bundleDescriptor.id === RX_APPLICATION.platformBundleIds.foundation;
        this.isActionMenuVisible =
            this.isFoundationBundle || this.isBundleFromCurrentOverlayGroup || !bundleDescriptor.platformBundle;
        this.isBusinessAnalyst = rxCurrentUserService.isBusinessAnalyst();
        this.isApplication = bundleDescriptor.isApplication;
    }
}

class BundleDetailsComponent {
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
/** @nocollapse */ BundleDetailsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BundleDetailsComponent, deps: [{ token: i1$1.ActivatedRoute }, { token: i0.ComponentFactoryResolver }, { token: i2.RxAngularApplicationService }, { token: i2.RxBundleCacheService }, { token: i2.RxBundleService }, { token: i2$1.RxWizardService }, { token: i0.Injector }, { token: AxBundleDeploymentService }, { token: i3$1.RxModalService }, { token: i3.TranslateService }, { token: i1.AdaptModalService }, { token: i1$1.Router }, { token: AxLocalizedStringsDataPageQuery }, { token: i0.NgZone }, { token: i2.RxLocalizedStringsLoaderService }, { token: i2.RxNotificationService }, { token: i2.RxGlobalCacheService }, { token: RxCreatePackageStatusDataPageService }, { token: i2.RxOverlayService }, { token: i0.Renderer2 }, { token: i2.RxSessionExpirationService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ BundleDetailsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: BundleDetailsComponent, selector: "ax-bundle-details", viewQueries: [{ propertyName: "fileInput", first: true, predicate: ["fileInput"], descendants: true }], ngImport: i0, template: "<div class=\"d-flex flex-column py-3\" *ngIf=\"bundleDetails$ | async as bundleDetails\">\n  <div class=\"d-flex flex-row-reverse align-items-center justify-content-between flex-fill pl-4\">\n    <div class=\"d-flex flex-row\">\n      <a\n        adapt-button\n        *ngIf=\"bundleDetails.isApplication\"\n        btn-type=\"tertiary\"\n        size=\"large\"\n        rx-id=\"navigation-button\"\n        class=\"d-icon-left-app_eye\"\n        [routerLink]=\"shellDesignerLink$ | async\"\n      >\n        {{ 'com.bmc.arsys.rx.innovation-studio.bundle-details.navigation.label' | translate }}\n      </a>\n\n      <div class=\"dropdown\" *ngIf=\"bundleDetails.isActionMenuVisible\" adaptDropdown placement=\"bottom-right\">\n        <button\n          adapt-button\n          adaptDropdownToggle\n          btn-type=\"tertiary\"\n          size=\"large\"\n          rx-id=\"actions-buttons\"\n          class=\"d-icon-left-action_button_cursor\"\n        >\n          {{ 'com.bmc.arsys.rx.innovation-studio.actions.label' | translate }}\n        </button>\n\n        <div class=\"dropdown-menu\" adaptDropdownMenu *ngIf=\"!bundleDetails.isBusinessAnalyst\">\n          <div class=\"dropdown-header\">\n            {{ 'com.bmc.arsys.rx.innovation-studio.packaging.label' | translate }}\n          </div>\n\n          <ng-container *ngIf=\"bundleDetails.isBundleFromCurrentOverlayGroup\">\n            <button rx-id=\"create-install-package-menu-item\" class=\"dropdown-item\" (click)=\"createInstallPackage()\">\n              {{ 'com.bmc.arsys.rx.innovation-studio.create-install-package.label' | translate }}\n            </button>\n            <button rx-id=\"create-update-package-menu-item\" class=\"dropdown-item\" (click)=\"createUpdatePackage()\">\n              {{ 'com.bmc.arsys.rx.innovation-studio.create-update-package.label' | translate }}\n            </button>\n          </ng-container>\n\n          <ng-container *ngIf=\"!bundleDetails.isBundleFromCurrentOverlayGroup\">\n            <button rx-id=\"create-content-package-menu-item\" class=\"dropdown-item\" (click)=\"createContentPackage()\">\n              {{ 'com.bmc.arsys.rx.innovation-studio.create-content-package.label' | translate }}\n            </button>\n            <button\n              rx-id=\"download-content-package-menu-item\"\n              class=\"dropdown-item\"\n              (click)=\"downloadContentPackage(bundleDetails)\"\n            >\n              {{ 'com.bmc.arsys.rx.innovation-studio.download-content-package.label' | translate }}\n            </button>\n            <button rx-id=\"manage-content-packages-menu-item\" class=\"dropdown-item\" (click)=\"manageContentPackages()\">\n              {{ 'com.bmc.arsys.rx.innovation-studio.manage-content-packages.label' | translate }}\n            </button>\n            <button\n              rx-id=\"content-package-import-logs-menu-item\"\n              class=\"dropdown-item\"\n              (click)=\"openContentPackageImportLogsModal()\"\n            >\n              {{ 'com.bmc.arsys.rx.innovation-studio.content-package-import-logs.label' | translate }}\n            </button>\n          </ng-container>\n\n          <div class=\"dropdown-header\">\n            {{ 'com.bmc.arsys.rx.innovation-studio.deployment.label' | translate }}\n          </div>\n\n          <button\n            rx-id=\"import-definitions-and-data-menu-item\"\n            class=\"dropdown-item\"\n            *ngIf=\"!bundleDetails.isBundleFromCurrentOverlayGroup\"\n            (click)=\"importDefinitionsAndData(bundleDetails)\"\n          >\n            {{ 'com.bmc.arsys.rx.innovation-studio.import-definition-and-data.label' | translate }}\n          </button>\n\n          <ng-container *ngIf=\"bundleDetails.isBundleFromCurrentOverlayGroup\">\n            <button rx-id=\"update-menu-item\" class=\"dropdown-item\" (click)=\"updateBundle(bundleDetails)\">\n              {{\n                'com.bmc.arsys.rx.innovation-studio.update-bundle.menu.label'\n                  | translate: { bundleType: bundleDetails.type.toLowerCase() }\n              }}\n            </button>\n            <button rx-id=\"reinstall-menu-item\" class=\"dropdown-item\" (click)=\"reinstallBundle(bundleDetails)\">\n              {{\n                'com.bmc.arsys.rx.innovation-studio.reinstall-bundle.menu.label'\n                  | translate: { bundleType: bundleDetails.type.toLowerCase() }\n              }}\n            </button>\n            <button rx-id=\"uninstall-menu-item\" class=\"dropdown-item\" (click)=\"uninstallBundle(bundleDetails)\">\n              {{\n                'com.bmc.arsys.rx.innovation-studio.uninstall-bundle.menu.label'\n                  | translate: { bundleType: bundleDetails.type.toLowerCase() }\n              }}\n            </button>\n          </ng-container>\n\n          <ng-container *ngIf=\"!bundleDetails.isFoundationBundle\">\n            <div class=\"dropdown-header\">\n              {{ 'com.bmc.arsys.rx.innovation-studio.translations.menu.label' | translate }}\n            </div>\n            <button\n              rx-id=\"download-translations-menu-item\"\n              class=\"dropdown-item\"\n              (click)=\"downloadTranslations(bundleDetails.id)\"\n            >\n              {{ 'com.bmc.arsys.rx.innovation-studio.download-translations.menu.label' | translate }}\n            </button>\n            <button\n              rx-id=\"upload-translations-menu-item\"\n              class=\"dropdown-item\"\n              (click)=\"uploadTranslations(bundleDetails)\"\n            >\n              {{ 'com.bmc.arsys.rx.innovation-studio.upload-translations.menu.label' | translate }}\n            </button>\n\n            <div class=\"dropdown-header\">{{ 'com.bmc.arsys.rx.innovation-studio.chat.label' | translate }}</div>\n            <button\n              rx-id=\"enable-chat-for-service\"\n              class=\"dropdown-item\"\n              (click)=\"publishChatEnabledService(bundleDetails.id)\"\n            >\n              {{ 'com.bmc.arsys.rx.innovation-studio.publish-chat-enabled-service.label' | translate }}\n            </button>\n          </ng-container>\n        </div>\n\n        <div class=\"dropdown-menu\" adaptDropdownMenu *ngIf=\"bundleDetails.isBusinessAnalyst\">\n          <div class=\"dropdown-header\">{{ 'com.bmc.arsys.rx.innovation-studio.chat.label' | translate }}</div>\n          <button\n            rx-id=\"enable-chat-for-service\"\n            class=\"dropdown-item\"\n            (click)=\"publishChatEnabledService(bundleDetails.id)\"\n          >\n            {{ 'com.bmc.arsys.rx.innovation-studio.publish-chat-enabled-service.label' | translate }}\n          </button>\n        </div>\n      </div>\n\n      <a\n        adapt-button\n        btn-type=\"tertiary\"\n        size=\"large\"\n        class=\"d-icon-left-pop_up\"\n        rx-id=\"visit-deployed-application-button\"\n        *ngIf=\"bundleDetails.isApplication\"\n        target=\"_blank\"\n        href=\"{{ applicationLink$ | async }}\"\n      >\n        {{ 'com.bmc.arsys.rx.innovation-studio.visit-deployed-application.label' | translate }}\n      </a>\n    </div>\n    <div class=\"d-flex flex-row align-items-center rx-ellipsis\">\n      <adapt-icon name=\"app\" class=\"mr-3 app-icon\"></adapt-icon>\n\n      <h1 class=\"m-0 py-2 rx-ellipsis\" title=\"{{ bundleDetails.friendlyName }}\">{{ bundleDetails.friendlyName }}</h1>\n\n      <adapt-icon\n        name=\"info_circle_o_adapt\"\n        class=\"ml-2 mt-1\"\n        placement=\"bottom\"\n        [autoClose]=\"'outside'\"\n        [adaptPopover]=\"popover\"\n      >\n      </adapt-icon>\n    </div>\n  </div>\n\n  <span class=\"text-tertiary ml-6 pl-3 rx-ellipsis\">{{ bundleDetails.description }}</span>\n\n  <input\n    #fileInput\n    type=\"file\"\n    accept=\".zip\"\n    hidden\n    [multiple]=\"false\"\n    (click)=\"onClickFileInput($event)\"\n    rx-id=\"package-file-input\"\n  />\n\n  <ng-template #popover>\n    <div class=\"bundle-info-popover\">\n      <strong>{{\n        (bundleDetails.type === bundleTypes.application\n          ? 'com.bmc.arsys.rx.client.common.application-id.label'\n          : 'com.bmc.arsys.rx.client.common.library-id.label'\n        ) | translate\n      }}</strong>\n      <div class=\"mb-2\">{{ bundleDetails.id }}</div>\n\n      <strong>{{ 'com.bmc.arsys.rx.innovation-studio.bundle-details.version.label' | translate }}</strong>\n      <div class=\"mb-2\">{{ bundleDetails.version }}</div>\n\n      <strong>{{ 'com.bmc.arsys.rx.innovation-studio.bundle-details.developer.label' | translate }}</strong>\n      <div>{{ bundleDetails.developerName }}</div>\n    </div>\n  </ng-template>\n</div>\n\n<router-outlet></router-outlet>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%}.app-icon{font-size:2rem}.bundle-info-popover{font-size:.75rem}\n"], components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i1.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1$1.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }, { type: i1.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i1.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i1.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }, { type: i1$1.RouterOutlet, selector: "router-outlet", outputs: ["activate", "deactivate"], exportAs: ["outlet"] }], pipes: { "async": i8.AsyncPipe, "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BundleDetailsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-bundle-details',
                    templateUrl: './bundle-details.component.html',
                    styleUrls: ['./bundle-details.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$1.ActivatedRoute }, { type: i0.ComponentFactoryResolver }, { type: i2.RxAngularApplicationService }, { type: i2.RxBundleCacheService }, { type: i2.RxBundleService }, { type: i2$1.RxWizardService }, { type: i0.Injector }, { type: AxBundleDeploymentService }, { type: i3$1.RxModalService }, { type: i3.TranslateService }, { type: i1.AdaptModalService }, { type: i1$1.Router }, { type: AxLocalizedStringsDataPageQuery }, { type: i0.NgZone }, { type: i2.RxLocalizedStringsLoaderService }, { type: i2.RxNotificationService }, { type: i2.RxGlobalCacheService }, { type: RxCreatePackageStatusDataPageService }, { type: i2.RxOverlayService }, { type: i0.Renderer2 }, { type: i2.RxSessionExpirationService }]; }, propDecorators: { fileInput: [{
                type: ViewChild,
                args: ['fileInput', { static: false }]
            }] } });

class RxRecordEditorBuilder {
    constructor(rxGuidService, rxDefaultRecordEditorInputType, rxFieldDefinitionService, translateService) {
        this.rxGuidService = rxGuidService;
        this.rxDefaultRecordEditorInputType = rxDefaultRecordEditorInputType;
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.translateService = translateService;
    }
    getViewDefinition(recordDefinition, recordInstanceId, isEditable = true) {
        const closeButtonId = this.rxGuidService.generate();
        const containerId = this.rxGuidService.generate();
        const recordEditorId = this.rxGuidService.generate();
        const saveButtonId = this.rxGuidService.generate();
        const viewDefinitionId = this.rxGuidService.generate();
        const recordEditorMode = recordInstanceId ? RecordEditorMode.Edit : RecordEditorMode.Create;
        const recordEditorComponentDefinitions = this.getComponentDefinitions(recordDefinition, recordEditorMode, recordEditorId);
        return {
            guid: viewDefinitionId,
            layout: JSON.stringify({
                outlets: [
                    {
                        name: 'DEFAULT',
                        columns: [
                            {
                                children: [recordEditorId]
                            }
                        ]
                    },
                    {
                        name: 'footer',
                        height: 60,
                        columns: [
                            {
                                children: [containerId]
                            }
                        ]
                    }
                ]
            }),
            outputParams: [
                {
                    name: 'recordInstance',
                    source: '${view.components.' + recordEditorId + '.recordInstance}'
                }
            ],
            inputParams: [],
            componentDefinitions: [
                {
                    resourceType: RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                    guid: recordEditorId,
                    type: RxViewComponentType.RecordEditor,
                    propertiesByName: {
                        recordInstanceId: `"${recordInstanceId}"`,
                        mode: recordEditorMode,
                        recordDefinitionName: recordDefinition.name,
                        styles: 'p-0 border-0',
                        allowEdit: isEditable ? '1' : '0'
                    },
                    componentDefinitions: recordEditorComponentDefinitions,
                    layout: JSON.stringify({
                        outlets: [
                            {
                                name: 'DEFAULT',
                                columns: [
                                    {
                                        children: recordEditorComponentDefinitions.map((componentDefinition) => componentDefinition.guid)
                                    }
                                ]
                            }
                        ]
                    })
                },
                {
                    resourceType: RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                    guid: containerId,
                    type: RxViewComponentType.ButtonBar,
                    propertiesByName: {
                        alignment: 'right',
                        hidden: '0'
                    },
                    layout: JSON.stringify({
                        outlets: [
                            {
                                name: 'DEFAULT',
                                columns: [
                                    {
                                        children: [saveButtonId, closeButtonId]
                                    }
                                ]
                            }
                        ]
                    }),
                    componentDefinitions: [
                        {
                            resourceType: RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                            guid: closeButtonId,
                            type: RxViewComponentType.ActionButton,
                            propertiesByName: {
                                label: isEditable
                                    ? this.translateService.instant('com.bmc.arsys.rx.client.common.cancel.label')
                                    : this.translateService.instant('com.bmc.arsys.rx.client.common.close.label'),
                                style: 'secondary',
                                size: 'default'
                            },
                            componentDefinitions: [
                                {
                                    resourceType: RX_VIEW_DEFINITION.resourceTypes.viewComponent,
                                    guid: this.rxGuidService.generate(),
                                    type: RxViewComponentType.Action,
                                    propertiesByName: {
                                        viewApi: '${view.api}',
                                        name: 'rxCloseViewAction',
                                        actAsCancel: 'true'
                                    }
                                }
                            ]
                        },
                        {
                            resourceType: RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                            guid: saveButtonId,
                            type: RxViewComponentType.ActionButton,
                            propertiesByName: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.save.label'),
                                hidden: isEditable ? '0' : '1',
                                style: 'primary',
                                disabled: 'NOT${view.components.' + recordEditorId + '.canSave}',
                                size: 'default'
                            },
                            componentDefinitions: [
                                {
                                    resourceType: RX_VIEW_DEFINITION.resourceTypes.viewComponent,
                                    guid: this.rxGuidService.generate(),
                                    type: RxViewComponentType.Action,
                                    propertiesByName: {
                                        viewApi: '${view.api}',
                                        name: 'rxSaveAction',
                                        targetApi: '${view.api}',
                                        closeAfterSave: true
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
    getComponentDefinitions(recordDefinition, recordEditorMode, recordEditorId) {
        const fieldGroupFilters = [RX_RECORD_DEFINITION.fieldOptions.required, RX_RECORD_DEFINITION.fieldOptions.optional];
        if (recordEditorMode === RecordEditorMode.Edit) {
            fieldGroupFilters.push(RX_RECORD_DEFINITION.fieldOptions.system);
        }
        const componentDefinitions = [];
        for (let i = 0; i < fieldGroupFilters.length; i++) {
            const recordFieldsComponentDefinitions = this.getFieldComponentDefinitions(recordDefinition, recordEditorMode, recordEditorId, fieldGroupFilters[i]);
            componentDefinitions.push({
                resourceType: RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                guid: this.rxGuidService.generate(),
                type: RxViewComponentType.Container,
                propertiesByName: {
                    rowWrap: ContainerRowWrap.Sm,
                    columnCount: '2',
                    styles: i + 1 !== fieldGroupFilters.length ? 'border-bottom pb-4' : ''
                },
                componentDefinitions: recordFieldsComponentDefinitions,
                layout: JSON.stringify({
                    outlets: [
                        {
                            name: 'DEFAULT',
                            columns: [
                                {
                                    children: recordFieldsComponentDefinitions
                                        .filter((componentDefinition, index) => index % 2 === 0)
                                        .map((componentDefinition) => componentDefinition.guid),
                                    span: '6'
                                },
                                {
                                    children: recordFieldsComponentDefinitions
                                        .filter((componentDefinition, index) => index % 2 === 1)
                                        .map((componentDefinition) => componentDefinition.guid),
                                    span: '6'
                                }
                            ]
                        }
                    ]
                })
            });
        }
        return componentDefinitions;
    }
    getFieldComponentDefinitions(recordDefinition, recordEditorMode, recordEditorId, fieldGroupFilter) {
        return reject(recordDefinition.fieldDefinitions, (fieldDefinition) => recordEditorMode === RecordEditorMode.Create && this.rxFieldDefinitionService.isSystemField(fieldDefinition))
            .filter((fieldDefinition) => fieldDefinition.fieldOption === fieldGroupFilter)
            .map((fieldDefinition) => {
            const componentDefinition = {
                resourceType: RX_VIEW_DEFINITION.resourceTypes.viewComponent,
                guid: this.rxGuidService.generate(),
                type: this.rxDefaultRecordEditorInputType.getFieldTypeByFieldDefinition(fieldDefinition),
                propertiesByName: {
                    fieldId: fieldDefinition.id,
                    recordDefinition: '${view.components.' + recordEditorId + '.recordDefinition}',
                    recordInstance: '${view.components.' + recordEditorId + '.recordInstance}',
                    label: fieldDefinition.name
                }
            };
            if (fieldDefinition.resourceType === RX_RECORD_DEFINITION.dataTypes.character.resourceType &&
                fieldDefinition.namedListDefinition) {
                componentDefinition.propertiesByName.enableMultiSelection = 'true';
            }
            return componentDefinition;
        })
            .sort((a, b) => a.propertiesByName.label.localeCompare(b.propertiesByName.label));
    }
}
/** @nocollapse */ RxRecordEditorBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordEditorBuilder, deps: [{ token: i5$1.RxGuidService }, { token: i5.RxDefaultRecordEditorInputType }, { token: i1$5.RxFieldDefinitionService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ RxRecordEditorBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordEditorBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordEditorBuilder, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i5$1.RxGuidService }, { type: i5.RxDefaultRecordEditorInputType }, { type: i1$5.RxFieldDefinitionService }, { type: i3.TranslateService }]; } });

class RecordDataEditorComponent {
    constructor(rxRecordEditorBuilder, route, router, translateService, rxDefinitionNameService, rxGlobalCacheService, rxPageTitleService, rxRecordDefinitionCacheService, rxBundleCacheService, viewComponentEventManager, rxOpenViewActionService, rxEditRecordsViewActionService) {
        this.rxRecordEditorBuilder = rxRecordEditorBuilder;
        this.route = route;
        this.router = router;
        this.translateService = translateService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxPageTitleService = rxPageTitleService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.viewComponentEventManager = viewComponentEventManager;
        this.rxOpenViewActionService = rxOpenViewActionService;
        this.rxEditRecordsViewActionService = rxEditRecordsViewActionService;
        this.destroyed$ = new ReplaySubject(1);
        this.recordDefinitionName$ = this.route.params.pipe(map((params) => params.definitionName), shareReplay(1));
        this.recordDefinition$ = this.recordDefinitionName$.pipe(switchMap((recordDefinitionName) => this.rxRecordDefinitionCacheService.getRecordDefinition(recordDefinitionName)));
        this.dataEditorGridConfig$ = this.recordDefinition$.pipe(tap((recordDefinition) => {
            var _a;
            this.recordDefinition = recordDefinition;
            this.isCustomRecordDefinition =
                ((_a = this.recordDefinition) === null || _a === void 0 ? void 0 : _a.type) === RX_RECORD_DEFINITION.externalRecordDefinitionTypes.custom;
        }), map((recordDefinition) => {
            const coreFieldIds = map$1(RX_RECORD_DEFINITION.coreFields, 'id');
            const gridColumns = map$1(recordDefinition.fieldDefinitions, (fieldDefinition) => ({
                title: fieldDefinition.name,
                fieldId: String(fieldDefinition.id),
                visible: fieldDefinition.id !== RX_RECORD_DEFINITION.coreFieldIds.notifierListening &&
                    includes(coreFieldIds, fieldDefinition.id),
                cellTemplate: fieldDefinition.id === RX_RECORD_DEFINITION.coreFieldIds.displayId && !this.isCustomRecordDefinition
                    ? this.displayIdColumnTemplate
                    : undefined
            }));
            return {
                recordDefinitionName: recordDefinition.name,
                columns: gridColumns,
                getRecordDefinition: () => of(recordDefinition),
                guid: 'rx-data-editor-' + recordDefinition.guid,
                styles: 'flex-fill',
                enableRowSelection: this.isCustomRecordDefinition ? null : RowSelectionMode.Multiple,
                actionButtons: [
                    {
                        label: this.isRecordEditable(this.recordDefinition)
                            ? this.translateService.instant('com.bmc.arsys.rx.client.common.edit.label')
                            : this.translateService.instant('com.bmc.arsys.rx.client.common.action-view.label'),
                        icon: this.isRecordEditable(this.recordDefinition) ? 'pencil' : 'eye',
                        style: 'tertiary',
                        actions: [
                            {
                                name: () => {
                                    if (this.dataEditorGrid.api.getSelectedRowCount() === 1) {
                                        this.editRecord(this.dataEditorGrid.api.getSelectedRows()[0][RX_RECORD_DEFINITION.coreFieldIds.id]);
                                    }
                                    else {
                                        this.rxEditRecordsViewActionService
                                            .execute({
                                            recordDefinitionName: recordDefinition.name,
                                            records: this.dataEditorGrid.api
                                        })
                                            .subscribe();
                                    }
                                }
                            }
                        ],
                        disabled: () => this.isCustomRecordDefinition ||
                            (!this.isRecordEditable(this.recordDefinition) && this.dataEditorGrid.api.getSelectedRowCount() !== 1)
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.delete.label'),
                        icon: 'trash',
                        style: 'tertiary',
                        actions: [
                            {
                                name: 'rxDeleteRecordsAction',
                                params: {
                                    recordDefinitionName: recordDefinition.name,
                                    records: this.dataEditorGrid.api
                                }
                            }
                        ],
                        disabled: this.isCustomRecordDefinition
                    }
                ],
                rowActionButtons: []
            };
        }), shareReplay(1));
        this.rxRecordDefinitionCacheService.registerConsumer(this.destroyed$);
    }
    ngOnInit() {
        this.recordDefinitionName$.pipe(takeUntil(this.destroyed$)).subscribe((recordDefinitionName) => {
            this.rxBundleCacheService.bundleId = this.rxDefinitionNameService.getBundleId(recordDefinitionName);
            this.setPageTitle(recordDefinitionName);
        });
    }
    close() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            this.rxBundleCacheService.bundleId,
            'record-definitions'
        ]);
    }
    createRecord() {
        this.viewComponentEventManager
            .executeActions([
            {
                guid: 'rx-data-editor-new-' + this.recordDefinition.guid,
                name: 'rxOpenViewAction',
                parameters: {
                    viewDefinitionName: this.rxRecordEditorBuilder.getViewDefinition(this.recordDefinition, null, this.isRecordEditable(this.recordDefinition)),
                    viewParams: null,
                    presentation: {
                        title: this.translateService.instant('com.bmc.arsys.rx.client.data-editor.new-record.title'),
                        modalSize: RX_OPEN_VIEW.modalSize.Large,
                        type: RX_OPEN_VIEW.type.DockedRightModal
                    }
                }
            }
        ], () => this.dataEditorGrid.api.refresh().subscribe())
            .catch(noop$1);
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    editRecord(recordInstanceId) {
        this.viewComponentEventManager
            .executeActions([
            {
                guid: 'rx-data-editor-edit-' + recordInstanceId,
                name: 'rxOpenViewAction',
                parameters: {
                    viewDefinitionName: this.rxRecordEditorBuilder.getViewDefinition(this.recordDefinition, recordInstanceId, this.isRecordEditable(this.recordDefinition)),
                    viewParams: null,
                    presentation: {
                        title: this.isRecordEditable(this.recordDefinition)
                            ? this.translateService.instant('com.bmc.arsys.rx.client.data-editor.edit-record.title')
                            : this.translateService.instant('com.bmc.arsys.rx.client.data-editor.view-record.title'),
                        modalSize: RX_OPEN_VIEW.modalSize.Large,
                        type: RX_OPEN_VIEW.type.DockedRightModal
                    }
                }
            }
        ], () => this.dataEditorGrid.api.refresh().subscribe())
            .catch(noop$1);
    }
    isRecordEditable(recordDefinition) {
        return !recordDefinition.isAuditRecordDefinition;
    }
    setPageTitle(recordDefinitionName) {
        this.rxGlobalCacheService
            .getBundleFriendlyName(this.rxBundleCacheService.bundleId)
            .pipe(take(1))
            .subscribe((bundleFriendlyName) => {
            this.rxPageTitleService.set([
                this.rxDefinitionNameService.getDisplayName(recordDefinitionName),
                this.translateService.instant('com.bmc.arsys.rx.client.data-editor.title'),
                bundleFriendlyName
            ], this.rxGlobalCacheService.applicationId);
        });
    }
}
/** @nocollapse */ RecordDataEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDataEditorComponent, deps: [{ token: RxRecordEditorBuilder }, { token: i1$1.ActivatedRoute }, { token: i1$1.Router }, { token: i3.TranslateService }, { token: i2.RxDefinitionNameService }, { token: i2.RxGlobalCacheService }, { token: i2.RxPageTitleService }, { token: i1$5.RxRecordDefinitionCacheService }, { token: i2.RxBundleCacheService }, { token: i6$1.ViewComponentEventManager }, { token: i7.RxOpenViewActionService }, { token: i7.RxEditRecordsViewActionService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ RecordDataEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordDataEditorComponent, selector: "ax-record-data-editor", viewQueries: [{ propertyName: "dataEditorGrid", first: true, predicate: ["dataEditorGrid"], descendants: true }, { propertyName: "displayIdColumnTemplate", first: true, predicate: ["displayIdColumnTemplate"], descendants: true }], ngImport: i0, template: "<div class=\"header d-flex align-items-center\">\n  <h5 class=\"ml-3\">\n    {{ 'com.bmc.arsys.rx.client.data-editor.title' | translate }} ({{\n      recordDefinitionName$ | async | rxDefinitionNamePipe\n    }})\n  </h5>\n\n  <div class=\"ml-auto m-2\">\n    <button\n      rx-id=\"close-button\"\n      size=\"small\"\n      adapt-button\n      type=\"button\"\n      rx-id=\"close-button\"\n      (click)=\"close()\"\n      btn-type=\"secondary\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n    </button>\n  </div>\n</div>\n<div>\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"tertiary\"\n    class=\"d-icon-left-plus_circle\"\n    rx-id=\"new-button\"\n    [disabled]=\"this.recordDefinition?.isAuditRecordDefinition || isCustomRecordDefinition\"\n    (click)=\"createRecord()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.new.label' | translate }}\n  </button>\n</div>\n\n<rx-record-grid rx-id=\"data-editor-grid\" #dataEditorGrid [config]=\"dataEditorGridConfig$\"></rx-record-grid>\n\n<ng-template #displayIdColumnTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <div class=\"rx-ellipsis\">\n    <a href=\"javascript:void(0)\" (click)=\"editRecord(dataItem['$ID$'])\">\n      {{ dataItem[1] }}\n    </a>\n  </div>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{position:relative;display:flex;flex-direction:column;height:100%;width:100%;overflow:hidden}.header{background:#f0f1f1;border-bottom:1px solid #d6d7d8}\n"], components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i5.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i3.TranslatePipe, "rxDefinitionNamePipe": i2.RxDefinitionNamePipe, "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDataEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-record-data-editor',
                    templateUrl: './record-data-editor.component.html',
                    styleUrls: ['./record-data-editor.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: RxRecordEditorBuilder }, { type: i1$1.ActivatedRoute }, { type: i1$1.Router }, { type: i3.TranslateService }, { type: i2.RxDefinitionNameService }, { type: i2.RxGlobalCacheService }, { type: i2.RxPageTitleService }, { type: i1$5.RxRecordDefinitionCacheService }, { type: i2.RxBundleCacheService }, { type: i6$1.ViewComponentEventManager }, { type: i7.RxOpenViewActionService }, { type: i7.RxEditRecordsViewActionService }]; }, propDecorators: { dataEditorGrid: [{
                type: ViewChild,
                args: ['dataEditorGrid']
            }], displayIdColumnTemplate: [{
                type: ViewChild,
                args: ['displayIdColumnTemplate']
            }] } });

const AX_DESIGNER_FRAME = {
    designerPageTitleKeys: {
        association: 'com.bmc.arsys.rx.client.association-designer.title',
        document: 'com.bmc.arsys.rx.client.document-designer.title',
        chatbot: 'com.bmc.arsys.rx.client.chatbot-designer.title',
        config: 'com.bmc.arsys.rx.client.config-designer.title',
        event: 'com.bmc.arsys.rx.client.event-designer.title',
        'event-statistics': 'com.bmc.arsys.rx.client.event-statistics-designer.title',
        'named-list': 'com.bmc.arsys.rx.client.named-list-designer.title',
        process: 'com.bmc.arsys.rx.client.process-designer.title',
        record: 'com.bmc.arsys.rx.client.record-designer.title',
        rule: 'com.bmc.arsys.rx.client.rule-designer.title',
        view: 'com.bmc.arsys.rx.client.view-designer.title',
        'web-api': 'com.bmc.arsys.rx.client.web-api-designer.title'
    },
    legacyDesignerNames: {
        processPreview: 'process-preview',
        chatWizard: 'chat-wizard',
        recordDataEditor: 'record-data-editor'
    },
    designerModes: {
        new: 'new',
        edit: 'edit'
    }
};

class DesignerFrameComponent {
    constructor(router, activatedRoute, rxDefinitionNameService, rxPageTitleService, rxGlobalCacheService, translateService, rxComponentCanDeactivateGuard, rxUtilityModalsService, rxIframeService, rxJsonParserService, rxPreviousStateService, rxGainsightConfiguratorService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxPageTitleService = rxPageTitleService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.translateService = translateService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.rxIframeService = rxIframeService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxPreviousStateService = rxPreviousStateService;
        this.rxGainsightConfiguratorService = rxGainsightConfiguratorService;
        this.isDefinitionDirty = false;
        this.destroyed$ = new ReplaySubject(1);
        this.designerOptions = get(this.router.getCurrentNavigation(), 'extras.state.designerOptions');
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd), withLatestFrom(this.activatedRoute.data, (_, data) => data), startWith(undefined), pairwise(), withLatestFrom(this.activatedRoute.params, this.activatedRoute.queryParams), tap(([[prevData, nextData], params]) => {
            if (((prevData === null || prevData === void 0 ? void 0 : prevData.designerMode) &&
                nextData.designerMode &&
                prevData.designerMode !== AX_DESIGNER_FRAME.designerModes.new &&
                nextData.designerMode !== AX_DESIGNER_FRAME.designerModes.edit) ||
                (prevData === null || prevData === void 0 ? void 0 : prevData.definitionType) !== nextData.definitionType) {
                this.intervalId = setInterval(noop, 100000);
                this.busySubscription = NEVER.subscribe();
            }
            this.currentBundleId =
                params.bundleId ||
                    this.rxDefinitionNameService.getBundleId(params.definitionName) ||
                    this.activatedRoute.parent.snapshot.data.defaultBundleId;
            this.setPageTitle(this.currentBundleId, this.activatedRoute.parent.snapshot.data.definitionType, this.activatedRoute.snapshot.data.legacyDesignerName, params.definitionName);
        }), map(([_, params, queryParams]) => this.buildDesignerUrl(this.currentBundleId, this.activatedRoute.parent.snapshot.data.definitionType, this.activatedRoute.snapshot.data.legacyDesignerName, params, queryParams)), takeUntil(this.destroyed$))
            .subscribe((url) => {
            this.rxIframeService.showIframe(url);
            this.iframeComponentApi = this.rxIframeService.getIframeApi();
        });
    }
    ngOnInit() {
        this.rxComponentCanDeactivateGuard.setPageComponent(this);
        this.rxGainsightConfiguratorService.updateGlobalContext({
            subProductLevel1: {
                name: 'Design'
            },
            subProductLevel2: {
                name: `${capitalize(this.activatedRoute.snapshot.data.definitionType)} designer`
            }
        });
    }
    ngOnDestroy() {
        this.rxComponentCanDeactivateGuard.setPageComponent(null);
        this.destroyed$.next();
        this.destroyed$.complete();
        this.rxIframeService.hideIframe();
    }
    canDeactivate() {
        return !this.isDefinitionDirty;
    }
    confirmDeactivation() {
        return this.rxUtilityModalsService.confirmUnsavedChanges().then((isConfirmed) => {
            if (isConfirmed) {
                this.isDefinitionDirty = false;
            }
            return isConfirmed;
        });
    }
    onMessage(event) {
        var _a, _b;
        const windowMessage = this.rxJsonParserService.tryParseJson(event.data);
        switch (windowMessage === null || windowMessage === void 0 ? void 0 : windowMessage.messageType) {
            case RX_DESIGNER.messageTypes.designerLoaded: {
                (_a = this.busySubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
                clearInterval(this.intervalId);
                break;
            }
            case RX_DESIGNER.messageTypes.closeDesigner: {
                if (this.activatedRoute.parent.snapshot.data.definitionType === 'shell' ||
                    this.activatedRoute.snapshot.data.legacyDesignerName === AX_DESIGNER_FRAME.legacyDesignerNames.processPreview) {
                    this.rxPreviousStateService.goToPrevState();
                }
                else if (this.activatedRoute.snapshot.data.legacyDesignerName === AX_DESIGNER_FRAME.legacyDesignerNames.chatWizard) {
                    this.router.navigate([RX_APPLICATION.innovationStudioBundleId, this.activatedRoute.snapshot.params.bundleId]);
                }
                else {
                    this.router.navigate([
                        RX_APPLICATION.innovationStudioBundleId,
                        this.currentBundleId,
                        `${this.activatedRoute.parent.snapshot.data.definitionType}-definitions`
                    ]);
                }
                break;
            }
            case RX_DESIGNER.messageTypes.afterSave: {
                if (!windowMessage.payload.isEditMode) {
                    this.router.navigate(['edit', windowMessage.payload.definitionName], {
                        relativeTo: this.activatedRoute.parent
                    });
                }
                this.isDefinitionDirty = false;
                break;
            }
            case RX_DESIGNER.messageTypes.waitingForDesignerOptions: {
                this.iframeComponentApi.postMessageToFrame({
                    messageType: 'designerOptions',
                    payload: this.designerOptions
                });
                break;
            }
            case RX_DESIGNER.messageTypes.designerLoadFailed: {
                (_b = this.busySubscription) === null || _b === void 0 ? void 0 : _b.unsubscribe();
                clearInterval(this.intervalId);
                from(this.router.navigate([
                    RX_APPLICATION.innovationStudioBundleId,
                    this.currentBundleId,
                    `${this.activatedRoute.parent.snapshot.data.definitionType}-definitions`
                ]))
                    .pipe(switchMap(() => {
                    const err = windowMessage.payload.err;
                    return throwError(new HttpErrorResponse({
                        error: err.data,
                        headers: new HttpHeaders(err.config.headers),
                        status: err.status,
                        statusText: err.statusText,
                        url: err.config.url
                    }));
                }))
                    .subscribe();
                break;
            }
            case RX_DESIGNER.messageTypes.definitionStatusChanged: {
                this.isDefinitionDirty = windowMessage.payload.isDirty;
                break;
            }
        }
    }
    buildDesignerUrl(bundleId, type, legacyDesignerName, params, queryParams) {
        const { definitionName, instanceId } = params;
        const debugOptions = window['rx'].logger.getCategories();
        const queryString = debugOptions.length ? `?debug=${debugOptions.join(',')}` : '';
        const baseInnovationStudioUrl = `/${RX_APPLICATION.innovationStudioBundleId}/index.html${queryString}#`;
        if (legacyDesignerName === AX_DESIGNER_FRAME.legacyDesignerNames.processPreview) {
            return `${baseInnovationStudioUrl}/app/bundle/${bundleId}/iprocess-instance/view/${definitionName}/${instanceId}`;
        }
        else if (legacyDesignerName === AX_DESIGNER_FRAME.legacyDesignerNames.chatWizard) {
            return `${baseInnovationStudioUrl}/app/bundle/${bundleId}/enable-chat-for-service`;
        }
        else if (legacyDesignerName === AX_DESIGNER_FRAME.legacyDesignerNames.recordDataEditor) {
            return `${baseInnovationStudioUrl}/app/bundle/${bundleId}/irecord-data-editor/${definitionName}`;
        }
        else if (type === 'shell') {
            return `${baseInnovationStudioUrl}/app/bundle/${bundleId}/ishell/config`;
        }
        else {
            let baseUrl = `${baseInnovationStudioUrl}/app/bundle/${bundleId}/i${type}/${definitionName || ''}`;
            if (!isEmpty(queryParams)) {
                const queryParamsString = map$1(queryParams, (value, name) => `${encodeURIComponent(name)}=${encodeURIComponent(value)}`).join('&');
                baseUrl += `?${queryParamsString}`;
            }
            return this.designerOptions ? `${baseUrl}?waitForDesignerOptions=true` : baseUrl;
        }
    }
    setPageTitle(bundleId, type, legacyDesignerName, definitionName) {
        this.rxGlobalCacheService
            .getBundleFriendlyName(bundleId)
            .pipe(take(1))
            .subscribe((bundleFriendlyName) => {
            if (legacyDesignerName === AX_DESIGNER_FRAME.legacyDesignerNames.processPreview) {
                this.rxPageTitleService.set([
                    this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.process-preview.title'),
                    bundleFriendlyName
                ], this.rxGlobalCacheService.applicationId);
            }
            else if (legacyDesignerName === AX_DESIGNER_FRAME.legacyDesignerNames.recordDataEditor) {
                this.rxPageTitleService.set([
                    this.rxDefinitionNameService.getDisplayName(definitionName),
                    this.translateService.instant('com.bmc.arsys.rx.client.data-editor.title'),
                    bundleFriendlyName
                ], this.rxGlobalCacheService.applicationId);
            }
            else if (legacyDesignerName === AX_DESIGNER_FRAME.legacyDesignerNames.chatWizard) {
                this.rxPageTitleService.set([
                    this.translateService.instant('com.bmc.arsys.rx.innovation-studio.publish-chat-enabled-service.label'),
                    bundleFriendlyName
                ], RX_APPLICATION.innovationStudioBundleId);
            }
            else if (type === 'shell') {
                this.rxPageTitleService.set([RX_APPLICATION.shellDefinitionName, bundleFriendlyName], RX_APPLICATION.innovationStudioBundleId);
            }
            else {
                this.rxPageTitleService.set([
                    definitionName
                        ? this.rxDefinitionNameService.getDisplayName(definitionName)
                        : this.translateService.instant('com.bmc.arsys.rx.client.create-new.title'),
                    this.translateService.instant(AX_DESIGNER_FRAME.designerPageTitleKeys[type]),
                    bundleFriendlyName
                ], this.rxGlobalCacheService.applicationId);
            }
        });
    }
}
/** @nocollapse */ DesignerFrameComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DesignerFrameComponent, deps: [{ token: i1$1.Router }, { token: i1$1.ActivatedRoute }, { token: i2.RxDefinitionNameService }, { token: i2.RxPageTitleService }, { token: i2.RxGlobalCacheService }, { token: i3.TranslateService }, { token: i2.RxComponentCanDeactivateGuard }, { token: i3$1.RxUtilityModalsService }, { token: i2$1.RxIframeService }, { token: i5$1.RxJsonParserService }, { token: i2.RxPreviousStateService }, { token: i2$1.RxGainsightConfiguratorService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ DesignerFrameComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DesignerFrameComponent, selector: "ax-designer-frame", host: { listeners: { "window:message": "onMessage($event)" } }, ngImport: i0, template: "<rx-busy-indicator [options]=\"{ busy: busySubscription }\"></rx-busy-indicator>\n", styles: [":host{position:relative;display:block;height:100%}\n"], components: [{ type: i3$1.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DesignerFrameComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-designer-frame',
                    templateUrl: './designer-frame.component.html',
                    styleUrls: ['./designer-frame.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$1.Router }, { type: i1$1.ActivatedRoute }, { type: i2.RxDefinitionNameService }, { type: i2.RxPageTitleService }, { type: i2.RxGlobalCacheService }, { type: i3.TranslateService }, { type: i2.RxComponentCanDeactivateGuard }, { type: i3$1.RxUtilityModalsService }, { type: i2$1.RxIframeService }, { type: i5$1.RxJsonParserService }, { type: i2.RxPreviousStateService }, { type: i2$1.RxGainsightConfiguratorService }]; }, propDecorators: { onMessage: [{
                type: HostListener,
                args: ['window:message', ['$event']]
            }] } });

const processInstanceGridColumns = {
    status: {
        title: 'com.bmc.arsys.rx.innovation-studio.process-management.grid-column.status.label',
        fieldId: 'status',
        visible: false,
        filterable: false,
        searchable: false,
        sortable: true
    },
    contextKey: {
        title: 'com.bmc.arsys.rx.innovation-studio.process-management.grid-column.context-key.label',
        fieldId: 'contextKey',
        searchable: false,
        sortable: false
    },
    instanceId: {
        title: 'com.bmc.arsys.rx.innovation-studio.process-management.grid-column.process-id.label',
        fieldId: 'instanceId',
        filterable: false,
        searchable: true,
        sortable: true
    },
    processDefinitionName: {
        title: 'com.bmc.arsys.rx.client.common.process-definition.label',
        fieldId: 'processDefinitionName',
        searchable: false,
        filterable: false,
        sortable: true
    },
    owner: {
        title: 'com.bmc.arsys.rx.innovation-studio.process-management.grid-column.owner.label',
        fieldId: 'owner',
        searchable: false,
        sortable: true
    },
    startTime: {
        title: 'com.bmc.arsys.rx.innovation-studio.process-management.grid-column.start-time.label',
        fieldId: 'startTime',
        searchable: false,
        filterable: false,
        sortable: true
    },
    endTime: {
        title: 'com.bmc.arsys.rx.innovation-studio.process-management.grid-column.completed-time.label',
        fieldId: 'endTime',
        searchable: false,
        filterable: false,
        sortable: true
    },
    isStartInstanceError: {
        title: 'com.bmc.arsys.rx.innovation-studio.process-management.grid-column.process-start-error.label',
        fieldId: 'isStartInstanceError',
        searchable: false,
        filterable: false,
        sortable: true
    }
};
const fieldDefinitions = {
    status: {
        id: processInstanceGridColumns.status.fieldId,
        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
    },
    processDefinitionName: {
        id: processInstanceGridColumns.processDefinitionName.fieldId,
        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
    },
    startTime: {
        id: processInstanceGridColumns.startTime.fieldId,
        resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
    },
    endTime: {
        id: processInstanceGridColumns.endTime.fieldId,
        resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
    },
    contextKey: {
        id: processInstanceGridColumns.contextKey.fieldId,
        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
    },
    instanceId: {
        id: processInstanceGridColumns.instanceId.fieldId,
        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
    },
    owner: {
        id: processInstanceGridColumns.owner.fieldId,
        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
    },
    isStartInstanceError: {
        id: processInstanceGridColumns.isStartInstanceError.fieldId,
        resourceType: RX_RECORD_DEFINITION.resourceTypes.boolean
    }
};
const AX_PROCESS_MANAGEMENT = {
    statusTabs: {
        [AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.active]: {
            title: 'com.bmc.arsys.rx.innovation-studio.process-management.status.active.label',
            badgeType: 'primary',
            status: AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.active,
            guid: 'rx-process-management-grid-active',
            gridColumns: [
                processInstanceGridColumns.contextKey,
                processInstanceGridColumns.instanceId,
                processInstanceGridColumns.processDefinitionName,
                processInstanceGridColumns.owner,
                processInstanceGridColumns.startTime,
                processInstanceGridColumns.status
            ],
            fieldDefinitions: [
                fieldDefinitions.contextKey,
                fieldDefinitions.instanceId,
                fieldDefinitions.processDefinitionName,
                fieldDefinitions.owner,
                fieldDefinitions.startTime,
                fieldDefinitions.status
            ]
        },
        [AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.suspended]: {
            title: 'com.bmc.arsys.rx.innovation-studio.process-management.status.suspended.label',
            badgeType: 'warning',
            status: AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.suspended,
            guid: 'rx-process-management-grid-suspended',
            gridColumns: [
                processInstanceGridColumns.contextKey,
                processInstanceGridColumns.instanceId,
                processInstanceGridColumns.processDefinitionName,
                processInstanceGridColumns.owner,
                processInstanceGridColumns.startTime,
                processInstanceGridColumns.status
            ],
            fieldDefinitions: [
                fieldDefinitions.contextKey,
                fieldDefinitions.instanceId,
                fieldDefinitions.processDefinitionName,
                fieldDefinitions.owner,
                fieldDefinitions.startTime,
                fieldDefinitions.status
            ]
        },
        [AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.errored]: {
            title: 'com.bmc.arsys.rx.innovation-studio.process-management.status.errored.label',
            badgeType: 'danger',
            status: AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.errored,
            guid: 'rx-process-management-grid-errored',
            gridColumns: [
                processInstanceGridColumns.contextKey,
                processInstanceGridColumns.instanceId,
                processInstanceGridColumns.processDefinitionName,
                processInstanceGridColumns.owner,
                processInstanceGridColumns.startTime,
                processInstanceGridColumns.isStartInstanceError,
                processInstanceGridColumns.status
            ],
            fieldDefinitions: [
                fieldDefinitions.contextKey,
                fieldDefinitions.instanceId,
                fieldDefinitions.processDefinitionName,
                fieldDefinitions.owner,
                fieldDefinitions.startTime,
                fieldDefinitions.isStartInstanceError,
                fieldDefinitions.status
            ]
        },
        [AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.completed]: {
            title: 'com.bmc.arsys.rx.innovation-studio.process-management.status.completed.label',
            badgeType: 'success',
            status: AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.completed,
            guid: 'rx-process-management-grid-completed',
            gridColumns: [
                processInstanceGridColumns.contextKey,
                processInstanceGridColumns.instanceId,
                processInstanceGridColumns.processDefinitionName,
                processInstanceGridColumns.owner,
                processInstanceGridColumns.startTime,
                processInstanceGridColumns.endTime,
                processInstanceGridColumns.status
            ],
            fieldDefinitions: [
                fieldDefinitions.contextKey,
                fieldDefinitions.instanceId,
                fieldDefinitions.processDefinitionName,
                fieldDefinitions.owner,
                fieldDefinitions.startTime,
                fieldDefinitions.endTime,
                fieldDefinitions.status
            ]
        }
    },
    timeframes: [
        {
            id: '$LASTHOUR$',
            label: 'com.bmc.arsys.rx.innovation-studio.process-management.timeframe.last-hour.label',
            value: moment.duration(1, 'hour')
        },
        {
            id: '$LASTDAY$',
            label: 'com.bmc.arsys.rx.innovation-studio.process-management.timeframe.last-day.label',
            value: moment.duration(1, 'day')
        },
        {
            id: '$LASTWEEK$',
            label: 'com.bmc.arsys.rx.innovation-studio.process-management.timeframe.last-week.label',
            value: moment.duration(1, 'week')
        },
        {
            id: '$LASTMONTH$',
            label: 'com.bmc.arsys.rx.innovation-studio.process-management.timeframe.last-month.label',
            value: moment.duration(1, 'month')
        },
        {
            id: '$LASTTHREEMONTHS$',
            label: 'com.bmc.arsys.rx.innovation-studio.process-management.timeframe.last-three-months.label',
            value: moment.duration(3, 'month')
        }
    ],
    processInstanceGridColumns
};

class ProcessPreviewModalComponent {
    constructor(activeModalRef) {
        this.activeModalRef = activeModalRef;
        this.processDefinitionName = this.activeModalRef.getData().processDefinitionName;
        this.isRunButtonDisabled = this.activeModalRef.getData().allowRun;
        this.processPreviewConfiguration$ = of({ processDefinitionName: this.processDefinitionName, zoomToFit: true });
    }
    zoomIn() {
        this.processPreview.zoomIn();
    }
    zoomOut() {
        this.processPreview.zoomOut();
    }
}
/** @nocollapse */ ProcessPreviewModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessPreviewModalComponent, deps: [{ token: i1.ActiveModalRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ ProcessPreviewModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ProcessPreviewModalComponent, selector: "ax-process-preview-modal", viewQueries: [{ propertyName: "processPreview", first: true, predicate: ["processPreview"], descendants: true, static: true }], ngImport: i0, template: "<div>\n  <div class=\"canvas-toolbar\">\n    <button adapt-button type=\"button\" class=\"zoom-in\" (click)=\"zoomIn()\">\n      <span class=\"d-icon-search_plus\"></span>\n    </button>\n\n    <button adapt-button type=\"button\" class=\"zoom-out\" (click)=\"zoomOut()\">\n      <span class=\"d-icon-search_minus\"></span>\n    </button>\n  </div>\n  <rx-process-preview #processPreview [config]=\"processPreviewConfiguration$\"></rx-process-preview>\n</div>\n\n<div class=\"modal-footer d-flex w-100\">\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    rx-id=\"ok-button\"\n    (click)=\"activeModalRef.close()\"\n    [disabled]=\"isRunButtonDisabled\"\n  >\n    {{ 'com.bmc.arsys.rx.innovation-studio.process-management.run-process.button.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    rx-id=\"cancel-button\"\n    (click)=\"activeModalRef.dismiss()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.canvas-toolbar{background:#f0f1f1;border-bottom:1px solid #d6d7d8}\n"], components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i2$5.RxProcessPreviewComponent, selector: "rx-process-preview", inputs: ["config"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessPreviewModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-process-preview-modal',
                    templateUrl: './process-preview-modal.component.html',
                    styleUrls: ['./process-preview-modal.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }]; }, propDecorators: { processPreview: [{
                type: ViewChild,
                args: ['processPreview', { static: true }]
            }] } });

class ProcessManagementService {
    constructor(rxNumberUtilsService) {
        this.rxNumberUtilsService = rxNumberUtilsService;
    }
    buildInputParamsControls(inputParams) {
        const propertyControls = [];
        forEach(inputParams, (inputParam) => {
            const config = {
                name: inputParam.name,
                options: {
                    label: inputParam.name,
                    required: inputParam.fieldOption === 'REQUIRED'
                },
                defaultValue: inputParam.defaultValue || null,
                dataType: inputParam.resourceType,
                validators: []
            };
            if (config.options.required) {
                config.validators.push(Validators.required);
            }
            switch (inputParam.resourceType) {
                case RX_RECORD_DEFINITION.resourceTypes.selection: {
                    const selectionInputParam = inputParam;
                    config.component = SelectFormControlComponent;
                    config.options = Object.assign(Object.assign({}, config.options), { options: map$1(selectionInputParam.optionNamesById, (value, key) => ({
                            id: key,
                            name: value
                        })), emptyOption: !config.options.required });
                    break;
                }
                case RX_RECORD_DEFINITION.resourceTypes.recordInstance: {
                    config.component = RecordInstanceFormControlComponent;
                    break;
                }
                case RX_RECORD_DEFINITION.resourceTypes.character: {
                    config.component = TextFormControlComponent;
                    break;
                }
                case RX_RECORD_DEFINITION.resourceTypes.boolean: {
                    config.component = BooleanFormControlComponent;
                    config.options.label = '';
                    config.options.description = inputParam.name;
                    config.options.shouldDisplayAsCheckbox = config.options.required;
                    break;
                }
                case RX_RECORD_DEFINITION.resourceTypes.decimal:
                case RX_RECORD_DEFINITION.resourceTypes.integer:
                case RX_RECORD_DEFINITION.resourceTypes.real: {
                    config.component = CounterFormControlComponent;
                    config.options.allowIntegerOnly = inputParam.resourceType === RX_RECORD_DEFINITION.resourceTypes.integer;
                    if (this.rxNumberUtilsService.isFiniteNumberString(inputParam.defaultValue)) {
                        config.defaultValue = Number(inputParam.defaultValue);
                    }
                    break;
                }
                case RX_RECORD_DEFINITION.resourceTypes.dateOnly: {
                    config.component = DateFormControlComponent;
                    break;
                }
                case RX_RECORD_DEFINITION.resourceTypes.dateTime: {
                    config.component = DateTimeFormControlComponent;
                    break;
                }
                case RX_RECORD_DEFINITION.resourceTypes.timeOnly: {
                    config.component = TimeFormControlComponent;
                    break;
                }
                case RX_RECORD_DEFINITION.resourceTypes.attachment: {
                    config.component = AttachmentFormControlComponent;
                    break;
                }
                case RX_RECORD_DEFINITION.resourceTypes.list: {
                    const listInputParam = inputParam;
                    if (listInputParam.subType === RX_PROCESS_DEFINITION.processVariableSubTypes.attachment) {
                        config.component = AttachmentFormControlComponent;
                        config.options.filesCount = '1000';
                    }
                    else {
                        config.component = InputListFormControlComponent;
                    }
                    break;
                }
                default: {
                    config.component = TextFormControlComponent;
                    break;
                }
            }
            propertyControls.push(config);
        });
        return propertyControls;
    }
    buildInputParamsModel(inputParams) {
        const propertyModel = {};
        forEach(inputParams, (inputParam) => {
            var _a;
            if (inputParam.resourceType === RX_RECORD_DEFINITION.resourceTypes.boolean) {
                if (inputParam.defaultValue === '1') {
                    propertyModel[inputParam.name] = true;
                }
                else if (inputParam.defaultValue === '0') {
                    propertyModel[inputParam.name] = false;
                }
                else {
                    propertyModel[inputParam.name] = inputParam.defaultValue;
                }
            }
            else {
                propertyModel[inputParam.name] = (_a = inputParam.defaultValue) !== null && _a !== void 0 ? _a : null;
            }
        });
        return propertyModel;
    }
}
/** @nocollapse */ ProcessManagementService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessManagementService, deps: [{ token: i5$1.RxNumberUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ ProcessManagementService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessManagementService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessManagementService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i5$1.RxNumberUtilsService }]; } });

class ProcessRunModalComponent {
    constructor(context, manageProcessesService) {
        this.context = context;
        this.manageProcessesService = manageProcessesService;
        this.inputParamsControls = this.manageProcessesService.buildInputParamsControls(context.getData().inputParams);
        this.inputParamsModel = this.manageProcessesService.buildInputParamsModel(context.getData().inputParams);
    }
    onModelChange(model) {
        this.inputParamsModel = Object.assign(Object.assign({}, this.inputParamsModel), model);
    }
    startProcess() {
        this.onBeforeStart();
        this.context.close(this.inputParamsModel);
    }
    isRunButtonDisabled() {
        let isDisabled = false;
        this.inputParamsControls
            .filter((param) => param.options.required)
            .map((param) => {
            const value = this.inputParamsModel[param.name];
            switch (param.dataType) {
                case RX_RECORD_DEFINITION.resourceTypes.character:
                case RX_RECORD_DEFINITION.resourceTypes.object:
                    if (isEmpty(value) || (value === null || value === void 0 ? void 0 : value.trim().length) === 0) {
                        isDisabled = true;
                    }
                    break;
                case RX_RECORD_DEFINITION.resourceTypes.recordInstance:
                    if (isEmpty(value) ||
                        !has(value, 'id') ||
                        !has(value, 'recordDefinitionName') ||
                        isEmpty(value.id) ||
                        isEmpty(value.recordDefinitionName)) {
                        isDisabled = true;
                    }
                    break;
                default:
                    if (isNull(value) || isUndefined(value)) {
                        isDisabled = true;
                    }
                    break;
            }
        });
        return isDisabled;
    }
    onBeforeStart() {
        this.inputParamsControls.map((param) => {
            const value = this.inputParamsModel[param.name];
            switch (param.dataType) {
                case RX_RECORD_DEFINITION.resourceTypes.boolean: {
                    if (value === true) {
                        this.inputParamsModel[param.name] = '1';
                    }
                    else if (value === false) {
                        this.inputParamsModel[param.name] = '0';
                    }
                    else {
                        this.inputParamsModel[param.name] = value;
                    }
                    break;
                }
                case RX_RECORD_DEFINITION.resourceTypes.decimal:
                case RX_RECORD_DEFINITION.resourceTypes.integer:
                case RX_RECORD_DEFINITION.resourceTypes.real: {
                    this.inputParamsModel[param.name] = (value === null || value === void 0 ? void 0 : value.toString()) || null;
                    break;
                }
                case RX_RECORD_DEFINITION.resourceTypes.character: {
                    this.inputParamsModel[param.name] = value === null || value === void 0 ? void 0 : value.trim();
                    break;
                }
                case RX_RECORD_DEFINITION.resourceTypes.object: {
                    this.inputParamsModel[param.name] = (value === null || value === void 0 ? void 0 : value.trim()) || null;
                    break;
                }
            }
        });
    }
}
/** @nocollapse */ ProcessRunModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessRunModalComponent, deps: [{ token: i1.DockedPanelContext }, { token: ProcessManagementService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ ProcessRunModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ProcessRunModalComponent, selector: "ax-process-run-modal", ngImport: i0, template: "<div class=\"modal-body\">\n  <rx-form-builder\n    *ngIf=\"inputParamsControls.length > 0\"\n    [config]=\"[{ controls: inputParamsControls }]\"\n    [model]=\"inputParamsModel\"\n    (modelChange)=\"onModelChange($event)\"\n  ></rx-form-builder>\n\n  <span *ngIf=\"inputParamsControls.length === 0\">{{\n    'com.bmc.arsys.rx.innovation-studio.process-management.run-process.no-input-params.label' | translate\n  }}</span>\n</div>\n\n<div class=\"modal-footer d-flex w-100\">\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    rx-id=\"ok-button\"\n    [disabled]=\"isRunButtonDisabled()\"\n    (click)=\"startProcess()\"\n  >\n    {{ 'com.bmc.arsys.rx.innovation-studio.process-management.run-process.button.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    (click)=\"context.dismiss(0)\"\n    rx-id=\"cancel-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i2$1.FormBuilderComponent, selector: "rx-form-builder", inputs: ["config", "model", "guid", "isReadOnly", "focusEditor$"], outputs: ["modelChange", "editorEvent", "formInitialized"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessRunModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-process-run-modal',
                    templateUrl: './process-run-modal.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.DockedPanelContext }, { type: ProcessManagementService }]; } });

class ProcessViewLogModalComponent {
    constructor(activeModalRef, translateService, ngZone, rxNotificationService, rxProcessInstanceService) {
        this.activeModalRef = activeModalRef;
        this.translateService = translateService;
        this.ngZone = ngZone;
        this.rxNotificationService = rxNotificationService;
        this.rxProcessInstanceService = rxProcessInstanceService;
        this.emptyStateLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.view-log.modal.no-log.label');
        this.logs = this.activeModalRef.getData().logContent;
    }
    downloadLog() {
        this.rxProcessInstanceService
            .downloadLog(this.activeModalRef.getData().processDefinitionName, this.activeModalRef.getData().instanceId)
            .subscribe((fileStream) => {
            if ((fileStream === null || fileStream === void 0 ? void 0 : fileStream.size) > 0) {
                const file = new Blob([fileStream], {
                    type: fileStream.type
                });
                this.ngZone.runOutsideAngular(() => {
                    saveAs(file, 'process.log');
                });
            }
            else {
                this.rxNotificationService.addInfoMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.view-log.modal.no-log.label'), '');
            }
        });
    }
}
/** @nocollapse */ ProcessViewLogModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessViewLogModalComponent, deps: [{ token: i1.ActiveModalRef }, { token: i3.TranslateService }, { token: i0.NgZone }, { token: i2.RxNotificationService }, { token: i6.RxProcessInstanceService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ ProcessViewLogModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ProcessViewLogModalComponent, selector: "ax-process-view-log-modal", ngImport: i0, template: "<div class=\"modal-body\">\n  <textarea class=\"form-control\" readonly *ngIf=\"this.logs\">{{ logs }}</textarea>\n  <adapt-empty-state [type]=\"'config'\" [label]=\"emptyStateLabel\" *ngIf=\"!this.logs\"> </adapt-empty-state>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    rx-id=\"download-log-button\"\n    *ngIf=\"this.logs\"\n    (click)=\"downloadLog()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.download.label' | translate }}\n  </button>\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    rx-id=\"close-button\"\n    (click)=\"activeModalRef.dismiss()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}textarea{color:#000;resize:none}.modal-body{justify-content:center;display:flex}adapt-empty-state{align-self:center}\n"], components: [{ type: i1.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessViewLogModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-process-view-log-modal',
                    templateUrl: './process-view-log-modal.component.html',
                    styleUrls: ['./process-view-log-modal.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i3.TranslateService }, { type: i0.NgZone }, { type: i2.RxNotificationService }, { type: i6.RxProcessInstanceService }]; } });

class ProcessManagementComponent {
    constructor(activatedRoute, adaptDockedPanelService, adaptModalService, errorHandler, ngZone, router, rxBundleCacheService, rxCommandFactoryService, rxDefinitionNameService, rxGainsightConfiguratorService, rxGlobalCacheService, rxModalService, rxNotificationService, rxPageTitleService, rxPreviousStateService, rxProcessDefinitionDataPageService, rxProcessDefinitionService, rxProcessInstanceDataPageService, rxProcessInstanceCountsByStatusDataPageService, rxProcessInstanceService, rxSessionExpirationService, rxSystemConfigurationService, translateService) {
        this.activatedRoute = activatedRoute;
        this.adaptDockedPanelService = adaptDockedPanelService;
        this.adaptModalService = adaptModalService;
        this.errorHandler = errorHandler;
        this.ngZone = ngZone;
        this.router = router;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxGainsightConfiguratorService = rxGainsightConfiguratorService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxModalService = rxModalService;
        this.rxNotificationService = rxNotificationService;
        this.rxPageTitleService = rxPageTitleService;
        this.rxPreviousStateService = rxPreviousStateService;
        this.rxProcessDefinitionDataPageService = rxProcessDefinitionDataPageService;
        this.rxProcessDefinitionService = rxProcessDefinitionService;
        this.rxProcessInstanceDataPageService = rxProcessInstanceDataPageService;
        this.rxProcessInstanceCountsByStatusDataPageService = rxProcessInstanceCountsByStatusDataPageService;
        this.rxProcessInstanceService = rxProcessInstanceService;
        this.rxSessionExpirationService = rxSessionExpirationService;
        this.rxSystemConfigurationService = rxSystemConfigurationService;
        this.translateService = translateService;
        this.activatedTabs = {
            [AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.active]: false,
            [AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.suspended]: false,
            [AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.errored]: false,
            [AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.completed]: false
        };
        this.busySubscription = NEVER.subscribe();
        this.innovationStudioBundleId = RX_APPLICATION.innovationStudioBundleId;
        this.processInstanceStatuses = [
            AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.active,
            AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.suspended,
            AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.errored,
            AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.completed
        ];
        this.selectedTimeframe = [];
        this.tabs = mapValues(AX_PROCESS_MANAGEMENT.statusTabs, (tab) => (Object.assign(Object.assign({}, tab), { title: this.translateService.instant(tab.title) })));
        this.texts = {
            searchPlaceholder: this.translateService.instant('com.bmc.arsys.rx.client.common.search.label')
        };
        this.timeframes = AX_PROCESS_MANAGEMENT.timeframes.map((timeframe) => (Object.assign(Object.assign({}, timeframe), { label: this.translateService.instant(timeframe.label) })));
        this.activeTabStatus = AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.active;
        this.destroyed$ = new ReplaySubject(1);
        this.refreshProcessInstanceCountsSubject = new Subject();
        this.refreshProcessDataSubject = new BehaviorSubject(true);
        this.breadcrumbItems$ = combineLatest([
            this.refreshProcessInstanceCountsSubject,
            this.refreshProcessDataSubject
        ]).pipe(map(() => {
            const breadcrumbItems = [
                {
                    data: {},
                    label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.manage-processes.menu.label')
                }
            ];
            if (this.selectedProcess && this.selectedProcess[0].data.name) {
                breadcrumbItems.push({
                    label: this.rxDefinitionNameService.getDisplayName(this.selectedProcess[0].data.name),
                    data: {}
                });
            }
            return breadcrumbItems;
        }));
        this.bundleId$ = this.activatedRoute.params.pipe(pluck('bundleId'), shareReplay(1));
        this.bundleDescriptor$ = this.bundleId$.pipe(switchMap((bundleId) => this.rxGlobalCacheService.getBundleDescriptor(bundleId)));
        this.isProcessHistoryEnabled$ = this.rxSystemConfigurationService.getConfiguration('Process-History-Level').pipe(take(1), map((processHistoryLevel) => processHistoryLevel.value !== 0), shareReplay(1));
        this.processActionButtonsState$ = combineLatest([
            this.refreshProcessInstanceCountsSubject,
            this.refreshProcessDataSubject
        ]).pipe(switchMap(() => of({
            isRunButtonDisabled: !this.selectedProcess || !this.selectedProcess[0].data.isEnabled,
            isViewButtonDisabled: !this.selectedProcess || isEmpty(this.selectedProcess[0].data.name)
        })));
        this.processDefinitionOptions$ = this.bundleId$.pipe(switchMap((bundleId) => combineLatest([
            this.activatedRoute.queryParams.pipe(pluck('definitionName')),
            this.getProcessDefinitions(bundleId)
        ]).pipe(map(([processDefinitionName, processDefinitions]) => {
            var _a;
            processDefinitionName = processDefinitionName || '';
            const options = processDefinitions.data.map((processDefinition) => ({
                label: this.rxDefinitionNameService.getDisplayName(processDefinition.name),
                data: processDefinition
            }));
            options.unshift({
                label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.all-processes.label'),
                data: { name: '' }
            });
            const processOption = (_a = options.find((option) => option.data.name === processDefinitionName)) !== null && _a !== void 0 ? _a : options[0];
            this.resetProcessSelection(processOption);
            this.refreshProcessInstanceCountsSubject.next();
            return options;
        }))));
        this.processInstanceCounts$ = this.refreshProcessInstanceCountsSubject.pipe(switchMap(() => {
            var _a;
            const queryParams = {
                pageSize: -1,
                startedAfter: moment().subtract(this.selectedTimeframe[0].value).toISOString()
            };
            const params = ((_a = this.selectedProcess[0]) === null || _a === void 0 ? void 0 : _a.data.name)
                ? Object.assign(Object.assign({}, queryParams), { processDefinitionName: this.selectedProcess[0].data.name }) : queryParams;
            return this.rxProcessInstanceCountsByStatusDataPageService
                .get({
                params
            })
                .pipe(map((response) => response.data[0]), catchError((error) => {
                this.errorHandler.handleError(error);
                return of({ status: '', data: [] });
            }));
        }), map((result) => transform(result, (acc, status, key) => (acc[key] = status), {})));
        this.vm$ = combineLatest([
            this.bundleDescriptor$,
            this.processDefinitionOptions$,
            this.isProcessHistoryEnabled$,
            this.processInstanceCounts$,
            this.processActionButtonsState$,
            this.breadcrumbItems$
        ]).pipe(map(([bundleDescriptor, processDefinitionOptions, isProcessHistoryEnabled, processInstanceCounts, processActionButtonsState, breadcrumbItems]) => ({
            bundleDescriptor,
            processDefinitionOptions,
            isProcessHistoryEnabled,
            processInstanceCounts,
            processActionButtonsState,
            breadcrumbItems
        })), tap(() => {
            this.busySubscription.unsubscribe();
        }), catchError((error) => {
            const bundleDesc = { friendlyName: '', id: '' };
            this.busySubscription.unsubscribe();
            this.errorHandler.handleError(error);
            return of({
                bundleDescriptor: bundleDesc,
                processDefinitionOptions: [],
                isProcessHistoryEnabled: true,
                processInstanceCounts: [0, 0, 0, 0],
                processActionButtonsState: { isRunButtonDisabled: true, isViewButtonDisabled: true },
                breadcrumbItems: []
            });
        }));
    }
    ngOnInit() {
        this.activatedRoute.params.pipe(pluck('bundleId'), take(1), takeUntil(this.destroyed$)).subscribe((bundleId) => {
            this.rxBundleCacheService.bundleId = bundleId;
            this.setPageTitle();
        });
        this.activatedRoute.queryParams.pipe(takeUntil(this.destroyed$)).subscribe((queryParams) => {
            let newQueryParams = {};
            const activeTabIndex = findIndex(this.processInstanceStatuses, (el) => el === queryParams.status);
            const timeframe = find(this.timeframes, { id: queryParams.timeframe });
            if (activeTabIndex !== -1) {
                this.activeTabIndex = activeTabIndex;
                this.activeTabStatus = queryParams.status;
            }
            else {
                newQueryParams = Object.assign(Object.assign({}, newQueryParams), { status: AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.active });
            }
            if (timeframe) {
                this.selectedTimeframe = [timeframe];
            }
            else {
                newQueryParams = Object.assign(Object.assign({}, newQueryParams), { timeframe: head(this.timeframes).id });
            }
            if (!isEmpty(newQueryParams)) {
                this.router.navigate([], {
                    relativeTo: this.activatedRoute,
                    queryParams: newQueryParams,
                    queryParamsHandling: 'merge'
                });
            }
            else {
                if (!this.activatedTabs[queryParams.status]) {
                    this.activatedTabs[queryParams.status] = true;
                }
                else {
                    this.refreshData();
                }
            }
        });
        this.rxGainsightConfiguratorService.updateGlobalContext({
            subProductLevel1: {
                name: 'Design'
            },
            subProductLevel2: {
                name: 'Manage processes'
            }
        });
    }
    ngOnDestroy() {
        this.refreshProcessDataSubject.complete();
        this.refreshProcessInstanceCountsSubject.complete();
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.rxGainsightConfiguratorService.removeGlobalContext(['subProductLevel2', 'subProductLevel3']);
    }
    close() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            this.rxBundleCacheService.bundleId,
            'process-definitions'
        ]);
    }
    getRecordGridConfig(status) {
        return of({
            enableFiltering: true,
            columns: this.getGridColumns(status),
            enableRowSelection: RowSelectionMode.Multiple,
            getRecordDefinition: () => of(this.getRecordDefinition(status)),
            recordIdField: AX_PROCESS_MANAGEMENT.processInstanceGridColumns.instanceId.fieldId,
            actionButtons: this.getActionButtons(),
            emptyStateLabelText: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.no-processes.label'),
            guid: AX_PROCESS_MANAGEMENT.statusTabs[status].guid,
            searchFieldPlaceholderText: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.search.placeholder'),
            getData: (queryParams) => {
                remove(queryParams.propertySelection, (property) => property === String(RX_RECORD_DEFINITION.coreFieldIds.id));
                this.refreshProcessInstanceCountsSubject.next(true);
                return this.getProcessInstanceRuns(Object.assign({}, omit(queryParams, ['shouldIncludeTotalSize', 'recorddefinition', 'searchText'])), this.tabs[status].status);
            },
            styles: 'flex-fill'
        });
    }
    onTimeframeChange(timeframe) {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {
                timeframe: head(timeframe).id
            },
            queryParamsHandling: 'merge'
        });
    }
    optionFormatter(option) {
        return option.label;
    }
    previewProcess(allowRun) {
        this.adaptModalService
            .open({
            title: this.rxDefinitionNameService.getDisplayName(this.selectedProcess[0].data.name),
            content: ProcessPreviewModalComponent,
            data: {
                processDefinitionName: this.selectedProcess[0].data.name,
                allowRun
            }
        })
            .then(() => {
            this.runProcess();
        })
            .catch(noop);
    }
    refreshData() {
        this.isProcessHistoryEnabled$.subscribe((isProcessHistoryEnabled) => {
            var _a;
            if (isProcessHistoryEnabled) {
                (_a = this.getCurrentGrid()) === null || _a === void 0 ? void 0 : _a.api.refresh().subscribe();
            }
            else {
                this.refreshProcessDataSubject.next(true);
            }
            const processName = (this.selectedProcess && this.selectedProcess[0].data.name) || '';
            const route = [RX_APPLICATION.innovationStudioBundleId, 'process', 'manage', this.rxBundleCacheService.bundleId];
            const currentQueryParams = this.activatedRoute.snapshot.queryParams;
            if (processName) {
                this.router.navigate(route, { queryParams: { definitionName: processName }, queryParamsHandling: 'merge' });
            }
            else {
                this.router.navigate(route, { queryParams: omit(currentQueryParams, 'definitionName') });
            }
        });
    }
    resetProcessSelection(processDefinitionOption) {
        this.selectedProcess = [processDefinitionOption];
        this.refreshData();
    }
    runProcess() {
        this.rxProcessDefinitionService.getInputParams(this.selectedProcess[0].data.name).subscribe((inputParams) => {
            from(this.adaptDockedPanelService.open({
                title: this.rxDefinitionNameService.getDisplayName(this.selectedProcess[0].data.name),
                content: ProcessRunModalComponent,
                size: 'lg',
                data: { inputParams }
            }))
                .pipe(switchMap((inputValues) => {
                const hasAttachmentInputs = some(inputValues, (inputValue) => some(inputValue, (item) => item instanceof File));
                if (hasAttachmentInputs) {
                    return this.runProcessWithAttachments(inputValues);
                }
                else {
                    return this.rxCommandFactoryService
                        .forResourceType('com.bmc.arsys.rx.application.process.command.StartProcessInstanceCommand')
                        .execute({
                        processDefinitionName: this.selectedProcess[0].data.name,
                        processInputValues: inputValues
                    });
                }
            }), tap(() => {
                this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.run-process.success.message'));
                this.refreshData();
            }), catchError((error) => {
                if (error !== DismissReasons.CLOSE_BTN) {
                    this.refreshData();
                }
                return throwError(error);
            }))
                .subscribe();
        });
    }
    tabChanged({ index }) {
        this.activeTabStatus = this.processInstanceStatuses[index];
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {
                status: this.activeTabStatus
            },
            queryParamsHandling: 'merge'
        });
    }
    executeAction(command, reason) {
        const records = castArray(this.getCurrentGrid().api.getSelectedRows());
        const actions$ = records.map((record) => {
            const payload = {
                processDefinitionName: record.processDefinitionName,
                processInstanceId: record.instanceId
            };
            return this.rxCommandFactoryService
                .forResourceType(command)
                .execute(reason ? Object.assign(Object.assign({}, payload), { cancelReason: reason }) : payload);
        });
        forkJoin(actions$)
            .pipe(finalize(() => {
            this.refreshData();
        }))
            .subscribe();
    }
    getActionButtons() {
        return [
            {
                label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.suspend.button.label'),
                style: 'tertiary',
                iconCls: 'pause_circle_o',
                hidden: () => this.isActionButtonDisabled(AX_PROCESS_DEFINITION_TAB.processInstanceActions.suspend),
                actions: [
                    {
                        name: () => {
                            this.executeAction('com.bmc.arsys.rx.application.process.command.SuspendProcessInstanceCommand');
                        }
                    }
                ]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.resume.button.label'),
                style: 'tertiary',
                iconCls: 'play_o',
                hidden: () => this.isActionButtonDisabled(AX_PROCESS_DEFINITION_TAB.processInstanceActions.resume),
                actions: [
                    {
                        name: () => {
                            this.executeAction('com.bmc.arsys.rx.application.process.command.ActivateProcessInstanceCommand');
                        }
                    }
                ]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.cancel.label'),
                style: 'tertiary',
                iconCls: 'cross_adapt',
                hidden: () => this.isActionButtonDisabled(AX_PROCESS_DEFINITION_TAB.processInstanceActions.cancel),
                actions: [
                    {
                        name: () => {
                            this.rxModalService
                                .prompt({
                                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.cancel-process.label'),
                                modalStyle: RX_MODAL.modalStyles.prompt,
                                message: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.cancellation-reason.label')
                            })
                                .then((promptResponse) => {
                                if (promptResponse.response) {
                                    this.executeAction('com.bmc.arsys.rx.application.process.command.CancelProcessInstanceCommand', promptResponse.answer);
                                }
                            });
                        }
                    }
                ]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.view-log.button.label'),
                style: 'tertiary',
                iconCls: 'monitor_gear_eye',
                disabled: () => this.isActionButtonDisabled(AX_PROCESS_DEFINITION_TAB.processInstanceActions.viewLog),
                actions: [
                    {
                        name: () => {
                            const processInstance = this.getCurrentGrid().api.getFirstSelectedRow();
                            this.rxProcessInstanceService
                                .getLog(processInstance.processDefinitionName, processInstance.instanceId)
                                .subscribe((data) => {
                                this.adaptModalService
                                    .open({
                                    title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.view-log.modal.title', {
                                        processDefinitionName: this.rxDefinitionNameService.getDisplayName(processInstance.processDefinitionName),
                                        processInstanceId: processInstance.instanceId
                                    }),
                                    content: ProcessViewLogModalComponent,
                                    size: OpenViewActionModalSize.Xlarge,
                                    data
                                })
                                    .catch(noop);
                            });
                        }
                    }
                ]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.download-log.button.label'),
                style: 'tertiary',
                iconCls: 'download',
                disabled: () => this.isActionButtonDisabled(AX_PROCESS_DEFINITION_TAB.processInstanceActions.downloadLog),
                actions: [
                    {
                        name: () => {
                            const processInstance = this.getCurrentGrid().api.getFirstSelectedRow();
                            this.rxProcessInstanceService
                                .downloadLog(processInstance.processDefinitionName, processInstance.instanceId)
                                .subscribe((fileStream) => {
                                if ((fileStream === null || fileStream === void 0 ? void 0 : fileStream.size) > 0) {
                                    const file = new Blob([fileStream], {
                                        type: fileStream.type
                                    });
                                    this.ngZone.runOutsideAngular(() => {
                                        saveAs(file, 'process.log');
                                    });
                                }
                                else {
                                    this.rxNotificationService.addInfoMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.view-log.modal.no-log.label'), '');
                                }
                            });
                        }
                    }
                ]
            }
        ];
    }
    getCurrentGrid() {
        return this.recordGrids.find((grid) => grid.guid === AX_PROCESS_MANAGEMENT.statusTabs[this.activeTabStatus].guid);
    }
    getGridColumns(status) {
        const gridColumns = AX_PROCESS_MANAGEMENT.statusTabs[status].gridColumns;
        return gridColumns.map((column) => {
            const columnConfig = Object.assign(Object.assign({}, column), { title: this.translateService.instant(column.title) });
            if (column.fieldId === AX_PROCESS_MANAGEMENT.processInstanceGridColumns.contextKey.fieldId) {
                columnConfig.cellTemplate = this.contextKeyCellTemplate;
            }
            else if (column.fieldId === AX_PROCESS_MANAGEMENT.processInstanceGridColumns.processDefinitionName.fieldId) {
                columnConfig.cellTemplate = this.processDefinitionCellTemplate;
            }
            return columnConfig;
        });
    }
    getProcessDefinitions(bundleId) {
        return this.rxSessionExpirationService.keepSessionAlive().pipe(switchMap(() => this.rxProcessDefinitionDataPageService
            .get({
            params: {
                propertySelection: ['name', 'isEnabled'],
                bundleId
            }
        })
            .pipe(catchError((error) => {
            this.errorHandler.handleError(error);
            return this.rxProcessDefinitionDataPageService.getEmptyDataPage();
        }))));
    }
    getProcessInstanceRuns(parameters, status) {
        var _a;
        const params = Object.assign(Object.assign({}, parameters), { startedAfter: moment().subtract(this.selectedTimeframe[0].value).toISOString() });
        const queryParams = ((_a = this.selectedProcess[0]) === null || _a === void 0 ? void 0 : _a.data.name)
            ? Object.assign(Object.assign({}, params), { processDefinitionName: this.selectedProcess[0].data.name }) : params;
        return this.rxProcessInstanceDataPageService
            .get({
            params: Object.assign(Object.assign({}, queryParams), { status })
        })
            .pipe(map((response) => (Object.assign(Object.assign({}, response), { status }))), catchError((error) => {
            this.errorHandler.handleError(error);
            return of({ status: '', data: [] });
        }));
    }
    getRecordDefinition(status) {
        const fieldDefinitions = AX_PROCESS_MANAGEMENT.statusTabs[status].fieldDefinitions;
        const fieldDefinitionsById = fieldDefinitions.reduce((result, fieldDefinition) => {
            result[fieldDefinition.id] = fieldDefinition;
            return result;
        }, {});
        return {
            fieldDefinitions,
            fieldDefinitionsById
        };
    }
    isActionButtonDisabled(action) {
        const dataSets = this.getCurrentGrid().api.getSelectedRows();
        switch (action) {
            case AX_PROCESS_DEFINITION_TAB.processInstanceActions.suspend:
                return some(dataSets, (dataset) => dataset.status !== AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.active);
            case AX_PROCESS_DEFINITION_TAB.processInstanceActions.resume:
                return some(dataSets, (dataset) => dataset.status !== AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.suspended);
            case AX_PROCESS_DEFINITION_TAB.processInstanceActions.cancel:
                return some(dataSets, (dataset) => dataset.status !== AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.suspended &&
                    dataset.status !== AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.active);
            case AX_PROCESS_DEFINITION_TAB.processInstanceActions.downloadLog:
            case AX_PROCESS_DEFINITION_TAB.processInstanceActions.viewLog:
                return dataSets.length !== 1;
            default:
                return true;
        }
    }
    runProcessWithAttachments(inputValues) {
        const formData = new FormData();
        const attachmentInputParams = pickBy(inputValues, (inputValue) => some(inputValue, (item) => item instanceof File));
        forOwn(attachmentInputParams, (inputParamValue, inputParamName) => {
            inputParamValue.forEach((file) => {
                formData.append(inputParamName, file);
            });
            delete inputValues[inputParamName];
        });
        const commandInstance = {
            processDefinitionName: this.selectedProcess[0].data.name,
            resourceType: 'com.bmc.arsys.rx.application.process.command.StartProcessInstanceCommand',
            processInputValues: inputValues
        };
        formData.append('commandInstance', JSON.stringify(commandInstance));
        return this.rxCommandFactoryService
            .forResourceType('com.bmc.arsys.rx.application.process.command.StartProcessInstanceCommand')
            .execute(formData);
    }
    setPageTitle() {
        this.rxGlobalCacheService
            .getBundleFriendlyName(this.rxBundleCacheService.bundleId)
            .pipe(take(1))
            .subscribe((bundleFriendlyName) => {
            this.rxPageTitleService.set([
                this.translateService.instant('com.bmc.arsys.rx.innovation-studio.manage-processes.menu.label'),
                bundleFriendlyName
            ], this.rxGlobalCacheService.applicationId);
        });
    }
}
/** @nocollapse */ ProcessManagementComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessManagementComponent, deps: [{ token: i1$1.ActivatedRoute }, { token: i1.AdaptDockedPanelService }, { token: i1.AdaptModalService }, { token: i0.ErrorHandler }, { token: i0.NgZone }, { token: i1$1.Router }, { token: i2.RxBundleCacheService }, { token: i2.RxCommandFactoryService }, { token: i2.RxDefinitionNameService }, { token: i2$1.RxGainsightConfiguratorService }, { token: i2.RxGlobalCacheService }, { token: i3$1.RxModalService }, { token: i2.RxNotificationService }, { token: i2.RxPageTitleService }, { token: i2.RxPreviousStateService }, { token: i6.RxProcessDefinitionDataPageService }, { token: i6.RxProcessDefinitionService }, { token: i6.RxProcessInstanceDataPageService }, { token: i6.RxProcessInstanceCountsByStatusDataPageService }, { token: i6.RxProcessInstanceService }, { token: i2.RxSessionExpirationService }, { token: i2.RxSystemConfigurationService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ ProcessManagementComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ProcessManagementComponent, selector: "ax-process-management", viewQueries: [{ propertyName: "contextKeyCellTemplate", first: true, predicate: ["contextKeyCellTemplate"], descendants: true, static: true }, { propertyName: "processDefinitionCellTemplate", first: true, predicate: ["processDefinitionCellTemplate"], descendants: true, static: true }, { propertyName: "recordGrids", predicate: RecordGridComponent, descendants: true }], ngImport: i0, template: "<div class=\"h-100\" *ngIf=\"vm$ | async as vm\">\n  <div class=\"header d-flex align-items-center\">\n    <h5 class=\"rx-ellipsis col-2 pb-1\" [adaptTooltip]=\"vm.bundleDescriptor.friendlyName\">\n      {{ vm.bundleDescriptor.friendlyName }}\n    </h5>\n\n    <div class=\"breadcrumbs-container pt-1\">\n      <rx-breadcrumb-bar\n        (selectedItem)=\"resetProcessSelection(vm.processDefinitionOptions[0])\"\n        [items]=\"vm.breadcrumbItems\"\n      ></rx-breadcrumb-bar>\n    </div>\n\n    <div class=\"ml-auto m-2\">\n      <button rx-id=\"close-button\" adapt-button type=\"button\" size=\"small\" (click)=\"close()\" btn-type=\"secondary\">\n        {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n      </button>\n    </div>\n  </div>\n\n  <div class=\"process-management-container\">\n    <adapt-sidebar [openedId]=\"0\" [adjustMainContainerWidth]=\"true\">\n      <adapt-sidebar-item\n        [iconClass]=\"'d-icon-layout_preview'\"\n        [headerTitle]=\"'com.bmc.arsys.rx.innovation-studio.process-management.process-sidebar.title' | translate\"\n      >\n        <div class=\"d-flex flex-column h-100\">\n          <div class=\"d-flex justify-content-start mb-3\">\n            <button\n              adapt-button\n              type=\"button\"\n              btn-type=\"primary\"\n              rx-id=\"run-button\"\n              class=\"mr-2 d-icon-left-play_o\"\n              size=\"small\"\n              (click)=\"runProcess()\"\n              [disabled]=\"vm.processActionButtonsState.isRunButtonDisabled\"\n            >\n              {{ 'com.bmc.arsys.rx.innovation-studio.process-management.run-process.button.label' | translate }}\n            </button>\n            <button\n              adapt-button\n              type=\"button\"\n              rx-id=\"view-button\"\n              class=\"d-icon-left-eye\"\n              size=\"small\"\n              [disabled]=\"vm.processActionButtonsState.isViewButtonDisabled\"\n              (click)=\"previewProcess(vm.processActionButtonsState.isRunButtonDisabled)\"\n              btn-type=\"secondary\"\n            >\n              {{ 'com.bmc.arsys.rx.innovation-studio.process-management.view-process.button.label' | translate }}\n            </button>\n          </div>\n\n          <div class=\"process-list h-100\">\n            <adapt-rx-select\n              class=\"h-100 d-flex\"\n              [(ngModel)]=\"selectedProcess\"\n              [options]=\"vm.processDefinitionOptions\"\n              [optionFormatter]=\"optionFormatter\"\n              [enableFilter]=\"true\"\n              [inline]=\"true\"\n              [selectAllButton]=\"false\"\n              [deselectAllButton]=\"false\"\n              [texts]=\"texts\"\n              [multiple]=\"false\"\n              [singleSelectStyle]=\"'line'\"\n              [popupMaxHeight]=\"'100%'\"\n              (ngModelChange)=\"refreshData()\"\n            ></adapt-rx-select>\n          </div>\n        </div>\n      </adapt-sidebar-item>\n      <div class=\"main h-100\">\n        <div class=\"h-100 d-flex flex-column\" *ngIf=\"vm.isProcessHistoryEnabled\">\n          <adapt-rx-select\n            class=\"form-group d-block\"\n            [label]=\"'com.bmc.arsys.rx.innovation-studio.process-management.timeframe.select.label' | translate\"\n            rx-id=\"timeframe\"\n            [ngModel]=\"selectedTimeframe\"\n            [options]=\"timeframes\"\n            [optionFormatter]=\"optionFormatter\"\n            (ngModelChange)=\"onTimeframeChange($event)\"\n            name=\"timeframe\"\n          >\n          </adapt-rx-select>\n          <adapt-tabset\n            rx-id=\"tabs\"\n            [type]=\"'pills'\"\n            [tab-active]=\"activeTabIndex\"\n            (tab-active-changed)=\"tabChanged($event)\"\n            class=\"h-100\"\n          >\n            <ng-container *ngFor=\"let status of processInstanceStatuses\">\n              <adapt-tab-panel\n                [adapt-tab-title]=\"tabs[status].title\"\n                [badge]=\"vm.processInstanceCounts[status]\"\n                [badge-type]=\"tabs[status].badgeType\"\n                [attr.rx-id]=\"'process-instances-tab-panel-' + status | lowercase\"\n              >\n                <rx-record-grid\n                  class=\"pt-3\"\n                  *ngIf=\"activatedTabs[status]\"\n                  [config]=\"getRecordGridConfig(status)\"\n                ></rx-record-grid>\n              </adapt-tab-panel>\n            </ng-container>\n          </adapt-tabset>\n        </div>\n\n        <div\n          class=\"d-flex align-items-center justify-content-center h-100\"\n          *ngIf=\"vm.isProcessHistoryEnabled === false\"\n        >\n          <adapt-empty-state\n            type=\"objects\"\n            label=\"{{\n              'com.bmc.arsys.rx.innovation-studio.process-management.process-history-disabled.message' | translate\n            }}\"\n          ></adapt-empty-state>\n        </div>\n      </div>\n    </adapt-sidebar>\n  </div>\n</div>\n<ng-template #contextKeyCellTemplate let-dataItem=\"dataItem\">\n  <div class=\"rx-ellipsis\">\n    <a\n      [routerLink]=\"[\n        '/',\n        innovationStudioBundleId,\n        'process',\n        'instance',\n        dataItem.processDefinitionName,\n        dataItem.instanceId\n      ]\"\n      >{{\n        dataItem.contextKey || 'com.bmc.arsys.rx.innovation-studio.process-management.process-instance.label'\n          | translate\n      }}\n    </a>\n  </div>\n</ng-template>\n\n<ng-template #processDefinitionCellTemplate let-dataItem=\"dataItem\">\n  {{ dataItem.processDefinitionName | rxDefinitionNamePipe }}\n</ng-template>\n\n<rx-busy-indicator [options]=\"{ busy: busySubscription }\"></rx-busy-indicator>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{position:relative;display:block;height:100%}adapt-rx-select{max-width:400px}.header{background:#f0f1f1;border-bottom:1px solid #d6d7d8}.breadcrumbs-container{font-size:.9375rem}.process-management-container{height:calc(100% - 60px)}.process-list{overflow:auto}:host::ng-deep .rx-select__controls{display:none}:host::ng-deep .rx-select__options-wrapper{width:100%}:host::ng-deep .tab-content{padding:0}:host::ng-deep .tab-content>.active{display:flex;flex-direction:column}\n"], components: [{ type: i3$1.RxBreadcrumbBarComponent, selector: "rx-breadcrumb-bar", inputs: ["items"], outputs: ["selectedItem"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.AdaptSidebarComponent, selector: "adapt-sidebar", inputs: ["className", "navClassName", "panelWidth", "panel2Width", "position", "theme", "widthLimit", "openedId", "adjustMainContainerWidth"], outputs: ["openedIdChange", "isPanelOpenedCurrently"], exportAs: ["adaptSidebar"] }, { type: i1.AdaptSidebarItemComponent, selector: "adapt-sidebar-item", inputs: ["iconClass", "headerTitle", "tooltipText", "aria-label"] }, { type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i1.AdaptTabsComponent, selector: "adapt-tabset", inputs: ["showTabToolbar", "customCssTabContent", "fullHeight", "texts", "enableDnD", "customClassTabList", "allow-tabs-adding", "id", "testID", "dropdown-title", "fadeColor", "carouselMode", "justify", "type", "tab-active"], outputs: ["tab-index-closed", "tab-active-changed", "add-tab-clicked", "tabClicked", "tabDropped"], exportAs: ["adaptTabset"] }, { type: i1.AdaptTabsPanelComponent, selector: "adapt-tab-panel, div[tab-panel]", inputs: ["isActive", "badge-type", "animateBadge", "showBadgeAlert", "badgeAlertVariant", "badgeCustomClass", "adapt-tab-title", "disabled", "isHidden", "icon", "subtext", "icon-right", "icon-close", "aria-label", "aria-labelledby", "kebabMenu", "id", "renderContentWhenInactive", "badge"] }, { type: i5.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i1.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i3$1.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.AdaptTooltipDirective, selector: "[adaptTooltip]", inputs: ["popupDelay", "placement", "width", "minWidth", "useWidthFitting", "adaptRadarDisableEventSending", "adaptTooltip", "manual"], outputs: ["shown", "hidden"], exportAs: ["tooltip"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1$1.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }], pipes: { "async": i8.AsyncPipe, "translate": i3.TranslatePipe, "lowercase": i8.LowerCasePipe, "rxDefinitionNamePipe": i2.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessManagementComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-process-management',
                    templateUrl: './process-management.component.html',
                    styleUrls: ['./process-management.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$1.ActivatedRoute }, { type: i1.AdaptDockedPanelService }, { type: i1.AdaptModalService }, { type: i0.ErrorHandler }, { type: i0.NgZone }, { type: i1$1.Router }, { type: i2.RxBundleCacheService }, { type: i2.RxCommandFactoryService }, { type: i2.RxDefinitionNameService }, { type: i2$1.RxGainsightConfiguratorService }, { type: i2.RxGlobalCacheService }, { type: i3$1.RxModalService }, { type: i2.RxNotificationService }, { type: i2.RxPageTitleService }, { type: i2.RxPreviousStateService }, { type: i6.RxProcessDefinitionDataPageService }, { type: i6.RxProcessDefinitionService }, { type: i6.RxProcessInstanceDataPageService }, { type: i6.RxProcessInstanceCountsByStatusDataPageService }, { type: i6.RxProcessInstanceService }, { type: i2.RxSessionExpirationService }, { type: i2.RxSystemConfigurationService }, { type: i3.TranslateService }]; }, propDecorators: { contextKeyCellTemplate: [{
                type: ViewChild,
                args: ['contextKeyCellTemplate', { static: true }]
            }], processDefinitionCellTemplate: [{
                type: ViewChild,
                args: ['processDefinitionCellTemplate', { static: true }]
            }], recordGrids: [{
                type: ViewChildren,
                args: [RecordGridComponent]
            }] } });

class RxValidViewDefinitionGuard {
    constructor(rxDefinitionNameService, rxGlobalCacheService, router) {
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.router = router;
    }
    canActivate(route) {
        const viewDefinitionName = route.params.definitionName;
        const bundleId = this.rxDefinitionNameService.getBundleId(viewDefinitionName);
        return this.rxGlobalCacheService.getBundleDescriptor(bundleId).pipe(map((bundleDescriptor) => {
            if (bundleDescriptor.isApplication &&
                this.rxDefinitionNameService.getDisplayName(viewDefinitionName) === RX_APPLICATION.shellDefinitionName) {
                return this.router.createUrlTree([RX_APPLICATION.innovationStudioBundleId, 'shell', bundleId]);
            }
            return true;
        }));
    }
}
/** @nocollapse */ RxValidViewDefinitionGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxValidViewDefinitionGuard, deps: [{ token: i2.RxDefinitionNameService }, { token: i2.RxGlobalCacheService }, { token: i1$1.Router }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ RxValidViewDefinitionGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxValidViewDefinitionGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxValidViewDefinitionGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i2.RxDefinitionNameService }, { type: i2.RxGlobalCacheService }, { type: i1$1.Router }]; } });

class CreateBundleModalComponent {
    constructor(context, translateService, axBundleDeploymentService) {
        this.context = context;
        this.translateService = translateService;
        this.axBundleDeploymentService = axBundleDeploymentService;
        this.bundleId = '';
        this.bundleCreationStatus = '';
        this.bundleCreationFinishedMessage = '';
        this.bundleName = '';
        this.bundleShortName = '';
        this.deploymentStatus = ProgressIndicatorStatus;
        this.groupId = '';
        this.type = this.context.getData().type === RX_BUNDLE.bundleTypes.application
            ? this.translateService.instant('com.bmc.arsys.rx.client.common.application.label')
            : this.translateService.instant('com.bmc.arsys.rx.client.common.library.label');
        this.bundleNameTooltip = new Tooltip(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.create-bundle.name.tooltip', {
            bundleType: this.type.toLowerCase()
        }));
        this.bundleShortNameTooltip = new Tooltip(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.create-bundle.short-name.tooltip', {
            bundleType: this.type.toLowerCase()
        }));
        this.groupIdTooltip = new Tooltip(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.create-bundle.group-id.tooltip', {
            bundleType: this.type.toLowerCase()
        }));
    }
    create() {
        this.bundleCreationStatus = ProgressIndicatorStatus.InProgress;
        this.axBundleDeploymentService
            .create({
            id: this.bundleId,
            name: this.bundleShortName,
            friendlyName: this.bundleName,
            developerId: this.groupId,
            isApplication: this.context.getData().type === RX_BUNDLE.bundleTypes.application
        })
            .pipe(catchError((error) => {
            this.bundleCreationStatus = ProgressIndicatorStatus.Failed;
            this.bundleCreationFinishedMessage = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.create-bundle.failure.message', { bundleType: this.type });
            return throwError(error);
        }))
            .subscribe((response) => {
            this.axBundleDeploymentService
                .pollDeploymentStatus(last(response.headers.get('location').split('/')))
                .subscribe((deploymentStatus) => {
                if (deploymentStatus.isFinished) {
                    this.bundleCreationStatus = ProgressIndicatorStatus.Finished;
                    this.bundleCreationFinishedMessage = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.bundle.create.successful.label', { bundleType: this.type });
                }
                else if (deploymentStatus.errorMessage) {
                    this.bundleCreationStatus = ProgressIndicatorStatus.Failed;
                    this.bundleCreationFinishedMessage = deploymentStatus.errorMessage;
                }
            });
        });
    }
    close(bundleId) {
        if (!isEmpty(bundleId) && this.bundleCreationStatus === ProgressIndicatorStatus.Finished) {
            this.context.close({ bundleId });
        }
        else {
            this.context.close();
        }
    }
    dismiss() {
        this.context.dismiss();
    }
    setBundleId() {
        this.bundleId = `${this.groupId}.${this.bundleShortName}`;
    }
}
/** @nocollapse */ CreateBundleModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateBundleModalComponent, deps: [{ token: i1.ActiveModalRef }, { token: i3.TranslateService }, { token: AxBundleDeploymentService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ CreateBundleModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CreateBundleModalComponent, selector: "ax-create-bundle-modal", ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{\n      'com.bmc.arsys.rx.innovation-studio.workspace.bundle.new.label'\n        | translate: { bundleType: this.type.toLowerCase() }\n    }}\n  </h5>\n  <button\n    class=\"close dp-close\"\n    data-dismiss=\"modal\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    [disabled]=\"bundleCreationStatus === deploymentStatus.InProgress\"\n    (click)=\"dismiss()\"\n  ></button>\n</div>\n<div class=\"modal-body\">\n  <form #createBundleForm=\"ngForm\">\n    <adapt-rx-textfield\n      rx-id=\"bundle-name\"\n      label=\"{{\n        'com.bmc.arsys.rx.innovation-studio.workspace.bundle.name.label' | translate: { bundleType: this.type }\n      }}\"\n      [(ngModel)]=\"bundleName\"\n      maxlength=\"254\"\n      required=\"true\"\n      class=\"d-block form-group\"\n      name=\"bundleName\"\n      [tooltip]=\"bundleNameTooltip\"\n      [autofocus]=\"true\"\n      [disabled]=\"\n        bundleCreationStatus === deploymentStatus.InProgress || bundleCreationStatus === deploymentStatus.Finished\n      \"\n    >\n    </adapt-rx-textfield>\n    <adapt-rx-textfield\n      rx-id=\"bundle-short-name\"\n      label=\"{{\n        'com.bmc.arsys.rx.innovation-studio.workspace.bundle.short-name.label' | translate: { bundleType: this.type }\n      }}\"\n      [(ngModel)]=\"bundleShortName\"\n      required=\"true\"\n      class=\"d-block form-group\"\n      name=\"bundleShortName\"\n      pattern=\"^([a-zA-Z0-9]+|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])$\"\n      (ngModelChange)=\"setBundleId()\"\n      [tooltip]=\"bundleShortNameTooltip\"\n      [disabled]=\"\n        bundleCreationStatus === deploymentStatus.InProgress || bundleCreationStatus === deploymentStatus.Finished\n      \"\n    >\n    </adapt-rx-textfield>\n    <adapt-rx-textfield\n      rx-id=\"group-id\"\n      label=\"{{ 'com.bmc.arsys.rx.innovation-studio.workspace.groupId.label' | translate }}\"\n      [(ngModel)]=\"groupId\"\n      pattern=\"[a-zA-Z][a-zA-Z0-9_]*(\\.[a-zA-Z0-9_]+)*\"\n      required=\"true\"\n      class=\"d-block form-group\"\n      name=\"groupId\"\n      (ngModelChange)=\"setBundleId()\"\n      [tooltip]=\"groupIdTooltip\"\n      [disabled]=\"\n        bundleCreationStatus === deploymentStatus.InProgress || bundleCreationStatus === deploymentStatus.Finished\n      \"\n    >\n    </adapt-rx-textfield>\n    <adapt-rx-textfield\n      rx-id=\"id\"\n      label=\"{{\n        'com.bmc.arsys.rx.innovation-studio.workspace.bundle.id.label' | translate: { bundleType: this.type }\n      }}\"\n      [(ngModel)]=\"bundleId\"\n      class=\"d-block form-group\"\n      name=\"bundleId\"\n      [disabled]=\"true\"\n    >\n    </adapt-rx-textfield>\n  </form>\n  <div *ngIf=\"bundleCreationStatus === deploymentStatus.InProgress\" class=\"progress\" rx-id=\"progress-bar\">\n    <div\n      class=\"progress-bar progress-bar-intermediate\"\n      role=\"progressbar\"\n      style=\"width: 100%\"\n      aria-valuenow=\"100\"\n      aria-valuemin=\"0\"\n      aria-valuemax=\"100\"\n    ></div>\n  </div>\n  <p\n    *ngIf=\"bundleCreationStatus === deploymentStatus.Finished\"\n    class=\"d-icon-left-check_adapt\"\n    rx-id=\"operation-succeeded-message\"\n  >\n    {{ bundleCreationFinishedMessage }}\n  </p>\n  <p\n    *ngIf=\"bundleCreationStatus === deploymentStatus.Failed\"\n    class=\"d-icon-left-exclamation_triangle\"\n    rx-id=\"operation-failed-message\"\n  >\n    {{ bundleCreationFinishedMessage }}\n  </p>\n</div>\n\n<div class=\"modal-footer d-flex w-100\">\n  <button\n    *ngIf=\"bundleCreationStatus !== deploymentStatus.Finished\"\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    (click)=\"create()\"\n    [disabled]=\"\n      bundleCreationStatus === deploymentStatus.InProgress || createBundleForm.pristine || createBundleForm.invalid\n    \"\n    rx-id=\"create-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.create.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    (click)=\"close(bundleId)\"\n    [disabled]=\"bundleCreationStatus === deploymentStatus.InProgress\"\n    rx-id=\"close-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.d-icon-left-check_adapt:before{color:#00a79d}.d-icon-left-exclamation_triangle:before{color:#f83200}\n"], components: [{ type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i4.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i4.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i4.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i4.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i4.PatternValidator, selector: "[pattern][formControlName],[pattern][formControl],[pattern][ngModel]", inputs: ["pattern"] }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateBundleModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-create-bundle-modal',
                    templateUrl: './create-bundle-modal.component.html',
                    styleUrls: ['./create-bundle-modal.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i3.TranslateService }, { type: AxBundleDeploymentService }]; } });

var BundleTypeFilter;
(function (BundleTypeFilter) {
    BundleTypeFilter["All"] = "all";
    BundleTypeFilter["Applications"] = "applications";
    BundleTypeFilter["Libraries"] = "libraries";
})(BundleTypeFilter || (BundleTypeFilter = {}));
var EditableBundleFilter;
(function (EditableBundleFilter) {
    EditableBundleFilter["All"] = "all";
    EditableBundleFilter["Editable"] = "editable";
})(EditableBundleFilter || (EditableBundleFilter = {}));

class WorkspaceComponent {
    constructor(rxCurrentUserService, rxGlobalCacheService, rxOverlayService, rxPageTitleService, translateService, rxSmartReportingService, rxNotificationService, axBundleDeploymentService, adaptModalService, router, renderer, rxGainsightConfiguratorService) {
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxOverlayService = rxOverlayService;
        this.rxPageTitleService = rxPageTitleService;
        this.translateService = translateService;
        this.rxSmartReportingService = rxSmartReportingService;
        this.rxNotificationService = rxNotificationService;
        this.axBundleDeploymentService = axBundleDeploymentService;
        this.adaptModalService = adaptModalService;
        this.router = router;
        this.renderer = renderer;
        this.rxGainsightConfiguratorService = rxGainsightConfiguratorService;
        this.bundleTypeSelectorModel = [true, false, false];
        this.bundleTypes = RX_BUNDLE.bundleTypes;
        this.editableBundles = this.rxCurrentUserService.getEditableBundles();
        this.editableBundleSelectorModel = [false, true];
        this.isBusinessAnalyst = this.rxCurrentUserService.isBusinessAnalyst();
        this.isShared = this.rxOverlayService.getCurrentOverlayContext().isShared;
        this.isInstallBundleActionAvailable = this.rxCurrentUserService.isAdministrator() && !this.isShared;
        this.innovationStudioBundleId = RX_APPLICATION.innovationStudioBundleId;
        this.isLoadingData = true;
        this.isNewBundleActionAvailable = !this.isShared;
        this.texts = {
            emptyStateLabelText: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.no-editable-bundles.label')
        };
        this.applicationLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.application.label');
        this.bundleTypeSelector$ = new BehaviorSubject(BundleTypeFilter.All);
        this.destroyed$ = new ReplaySubject(1);
        this.editableBundleSelector$ = new BehaviorSubject(EditableBundleFilter.Editable);
        this.libraryLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.library.label');
        this.bundles$ = this.rxGlobalCacheService.getBundleDescriptors().pipe(map((bundleDescriptors) => bundleDescriptors
            .filter((bundleDescriptor) => bundleDescriptor.id !== RX_APPLICATION.settingsBundleId &&
            bundleDescriptor.id !== RX_APPLICATION.standardlib &&
            bundleDescriptor.id !== RX_APPLICATION.innovationStudioBundleId &&
            bundleDescriptor.id !== RX_APPLICATION.platformBundleId)
            .map((bundle) => (Object.assign(Object.assign({}, bundle), {
            type: bundle.isApplication ? this.applicationLabel : this.libraryLabel,
            isEditable: !this.isBusinessAnalyst || includes(this.editableBundles, bundle.id)
        })))), tap(() => {
            this.isLoadingData = false;
        }), catchError((error) => {
            this.isLoadingData = false;
            return throwError(error);
        }));
        this.bundlesToDisplay$ = combineLatest([
            this.bundleTypeSelector$,
            this.editableBundleSelector$,
            this.bundles$
        ]).pipe(map(([bundleTypeFiler, editableBundleFilter, allBundles]) => allBundles.filter((bundle) => (bundleTypeFiler === BundleTypeFilter.All ||
            (bundleTypeFiler === BundleTypeFilter.Applications && bundle.isApplication) ||
            (bundleTypeFiler === BundleTypeFilter.Libraries && !bundle.isApplication)) &&
            (editableBundleFilter === EditableBundleFilter.All || bundle.isEditable))), takeUntil(this.destroyed$));
        this.bundleTypeSelectorConfig = [
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.common.all.label'),
                value: BundleTypeFilter.All
            },
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.common.applications.label'),
                value: BundleTypeFilter.Applications
            },
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.common.libraries.label'),
                value: BundleTypeFilter.Libraries
            }
        ];
        this.editableBundleSelectorConfig = [
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.common.all.label'),
                value: EditableBundleFilter.All
            },
            {
                name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.bundle.editable.label'),
                value: EditableBundleFilter.Editable
            }
        ];
    }
    ngOnInit() {
        this.columns = [
            {
                field: 'friendlyName',
                header: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                cellTemplate: this.nameColumnTemplate
            },
            { field: 'type', header: this.translateService.instant('com.bmc.arsys.rx.client.common.item-type.label') },
            {
                field: 'developerName',
                header: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.column.developer.label')
            },
            {
                field: 'displayVersion',
                header: this.translateService.instant('com.bmc.arsys.rx.client.common.version.label')
            },
            {
                field: 'id',
                hidden: true
            }
        ];
        this.rxSmartReportingService.getSmartReportingUrl().subscribe((smartReportingUrl) => {
            this.smartReportingUrl = smartReportingUrl;
        });
        this.setPageTitle();
        this.rxGainsightConfiguratorService.updateGlobalContext({
            subProductLevel1: {
                name: 'Design'
            },
            subProductLevel2: {
                name: 'Workspace'
            }
        });
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
        this.rxGainsightConfiguratorService.removeGlobalContext(['subProductLevel2']);
    }
    updateBundleType(bundleTypeSelectorModel) {
        this.bundleTypeSelector$.next(this.bundleTypeSelectorConfig[findIndex(bundleTypeSelectorModel, Boolean)].value);
    }
    toggleEditableBundles(editableSelectorModel) {
        this.editableBundleSelector$.next(this.editableBundleSelectorConfig[findIndex(editableSelectorModel, Boolean)].value);
    }
    openFileDialog() {
        this.renderer.selectRootElement(this.fileInput.nativeElement, true).click();
    }
    onClickFileInput(event) {
        const element = event.target;
        element.value = '';
    }
    onChangeFileInput(event) {
        var _a;
        const files = toArray(event.target.files);
        const bundleDeploymentProgressConfig = {
            title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.install.button.label'),
            status: ProgressIndicatorStatus.InProgress,
            header: this.translateService.instant('com.bmc.arsys.rx.client.common.application-or-library.label'),
            subHeader: (_a = files[0]) === null || _a === void 0 ? void 0 : _a.name.replace(/\.zip$/i, ''),
            inProgressMessage: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.installing.label'),
            finishedMessage: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.install-successful.label'),
            failedMessage: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.install-failed.label'),
            operationStatusMessage: ''
        };
        this.openModal(ProgressIndicatorModalComponent, bundleDeploymentProgressConfig)
            .then(() => window.location.reload())
            .catch(noop);
        this.axBundleDeploymentService
            .install(files[0])
            .pipe(catchError((error) => {
            bundleDeploymentProgressConfig.status = ProgressIndicatorStatus.Failed;
            bundleDeploymentProgressConfig.finishedMessage = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.install-failed.label');
            return throwError(error);
        }))
            .subscribe((response) => {
            this.axBundleDeploymentService
                .pollDeploymentStatus(last(response.headers.get('location').split('/')))
                .subscribe((deploymentStatus) => {
                if (deploymentStatus.isFinished) {
                    bundleDeploymentProgressConfig.status = ProgressIndicatorStatus.Finished;
                    bundleDeploymentProgressConfig.operationStatusMessage = this.axBundleDeploymentService.buildStatusMessage(deploymentStatus.deploymentParsedStatus);
                }
                else if (deploymentStatus.errorMessage) {
                    bundleDeploymentProgressConfig.status = ProgressIndicatorStatus.Failed;
                    bundleDeploymentProgressConfig.operationStatusMessage = deploymentStatus.errorMessage;
                }
            });
        });
    }
    createBundle(bundleType) {
        this.openModal(CreateBundleModalComponent, { type: bundleType })
            .then((result) => {
            const bundleId = result === null || result === void 0 ? void 0 : result.bundleId;
            if (bundleId) {
                this.rxGlobalCacheService.clear();
                this.router.navigate([RX_APPLICATION.innovationStudioBundleId, bundleId]).then(() => {
                    window.location.reload();
                });
                this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.create-bundle.success.message', {
                    bundleType: bundleType.toLowerCase()
                }));
            }
        })
            .catch(noop);
    }
    openModal(content, data) {
        return this.adaptModalService.open({
            content,
            data,
            size: 'sm',
            isDialog: true,
            hideBackdrop: false
        });
    }
    setPageTitle() {
        this.rxPageTitleService.set(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.page.label'), this.rxGlobalCacheService.applicationId);
    }
}
/** @nocollapse */ WorkspaceComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WorkspaceComponent, deps: [{ token: i2.RxCurrentUserService }, { token: i2.RxGlobalCacheService }, { token: i2.RxOverlayService }, { token: i2.RxPageTitleService }, { token: i3.TranslateService }, { token: i2.RxSmartReportingService }, { token: i2.RxNotificationService }, { token: AxBundleDeploymentService }, { token: i1.AdaptModalService }, { token: i1$1.Router }, { token: i0.Renderer2 }, { token: i2$1.RxGainsightConfiguratorService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ WorkspaceComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: WorkspaceComponent, selector: "ax-workspace", viewQueries: [{ propertyName: "fileInput", first: true, predicate: ["fileInput"], descendants: true }, { propertyName: "nameColumnTemplate", first: true, predicate: ["nameColumnTemplate"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"d-flex flex-column h-100\">\n  <div class=\"row w-100 align-items-center\">\n    <h1 class=\"h1 px-6 py-3 m-0\">{{ 'com.bmc.arsys.rx.innovation-studio.workspace.page.label' | translate }}</h1>\n\n    <div class=\"d-flex py-3\">\n      <span class=\"pl-6 pt-3 pr-2 workspace-toolbar-label mb-2\">\n        {{ 'com.bmc.arsys.rx.innovation-studio.workspace.show.label' | translate }}\n      </span>\n\n      <adapt-button-group\n        [(ngModel)]=\"bundleTypeSelectorModel\"\n        [config]=\"bundleTypeSelectorConfig\"\n        [multiselectable]=\"false\"\n        [uncheckable]=\"false\"\n        size=\"small\"\n        (ngModelChange)=\"updateBundleType($event)\"\n        rx-id=\"select-bundle-type\"\n        class=\"pt-1\"\n      ></adapt-button-group>\n\n      <adapt-button-group\n        class=\"pl-5 pt-1\"\n        *ngIf=\"isBusinessAnalyst\"\n        [(ngModel)]=\"editableBundleSelectorModel\"\n        [config]=\"editableBundleSelectorConfig\"\n        [multiselectable]=\"false\"\n        [uncheckable]=\"false\"\n        size=\"small\"\n        (ngModelChange)=\"toggleEditableBundles($event)\"\n        rx-id=\"select-bundle-type-ba\"\n      ></adapt-button-group>\n    </div>\n\n    <div class=\"d-flex py-3 align-items-center\">\n      <div\n        class=\"split-line ml-4\"\n        *ngIf=\"(isInstallBundleActionAvailable || isNewBundleActionAvailable) && !isBusinessAnalyst\"\n      ></div>\n\n      <div *ngIf=\"isNewBundleActionAvailable && !isBusinessAnalyst\" class=\"dropdown\" adaptDropdown>\n        <button\n          adapt-button\n          adaptDropdownToggle\n          type=\"button\"\n          btn-type=\"tertiary\"\n          class=\"d-icon-plus_circle align-self-start\"\n          rx-id=\"new-button\"\n        >\n          {{ 'com.bmc.arsys.rx.client.common.new.label' | translate }}\n        </button>\n\n        <div class=\"dropdown-menu\" adaptDropdownMenu>\n          <button (click)=\"createBundle(bundleTypes.application)\" class=\"dropdown-item\" rx-id=\"create-application\">\n            {{ 'com.bmc.arsys.rx.client.common.application.label' | translate }}\n          </button>\n          <button (click)=\"createBundle(bundleTypes.library)\" class=\"dropdown-item\" rx-id=\"create-library\">\n            {{ 'com.bmc.arsys.rx.client.common.library.label' | translate }}\n          </button>\n        </div>\n      </div>\n\n      <button\n        *ngIf=\"isInstallBundleActionAvailable && !isBusinessAnalyst\"\n        adapt-button\n        type=\"file\"\n        btn-type=\"tertiary\"\n        class=\"d-icon-left-download\"\n        rx-id=\"install-button\"\n        (click)=\"openFileDialog()\"\n      >\n        {{ 'com.bmc.arsys.rx.innovation-studio.workspace.install.button.label' | translate }}\n      </button>\n\n      <input\n        #fileInput\n        type=\"file\"\n        accept=\".zip\"\n        hidden\n        [multiple]=\"false\"\n        (change)=\"onChangeFileInput($event)\"\n        (click)=\"onClickFileInput($event)\"\n        rx-id=\"install-file-input\"\n      />\n    </div>\n\n    <div class=\"ml-auto py-3\" *ngIf=\"smartReportingUrl\">\n      <a\n        rx-id=\"reports-link\"\n        target=\"_blank\"\n        class=\"d-icon-file_chart d-icon-left px-4 py-2\"\n        [href]=\"smartReportingUrl\"\n      >\n        {{ 'com.bmc.arsys.rx.innovation-studio.workspace.reports.button.label' | translate }}\n      </a>\n    </div>\n  </div>\n\n  <div class=\"h-100\">\n    <adapt-table\n      class=\"mt-2\"\n      [value]=\"bundlesToDisplay$ | async\"\n      [columns]=\"columns\"\n      [sortable]=\"true\"\n      dataKey=\"friendlyName\"\n      sortField=\"friendlyName\"\n      [sortOrder]=\"1\"\n      [loading]=\"isLoadingData\"\n      [scrollable]=\"true\"\n      [scrollHeight]=\"'flex'\"\n      [hasEmptyState]=\"isBusinessAnalyst && editableBundles.length === 0\"\n      [texts]=\"texts\"\n      [bordered]=\"true\"\n    >\n    </adapt-table>\n  </div>\n</div>\n<ng-template #nameColumnTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <div class=\"rx-ellipsis\">\n    <a [routerLink]=\"['/', innovationStudioBundleId, dataItem.id]\">\n      {{ dataItem[column.field] }}\n    </a>\n  </div>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.workspace-toolbar-label{font-size:.75rem}.split-line{height:1.125rem;border-left:1px solid #d6d7d8}\n"], components: [{ type: i1.AdaptButtonGroupComponent, selector: "adapt-button-group", inputs: ["config", "size", "groupType", "isVertical", "multiselectable", "uncheckable", "useCheckboxStyle"], outputs: ["modelArrayChanged"], exportAs: ["adaptBtnGroup"] }, { type: i1.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i9.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }], directives: [{ type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i1.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i1$1.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }], pipes: { "translate": i3.TranslatePipe, "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WorkspaceComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-workspace',
                    templateUrl: './workspace.component.html',
                    styleUrls: ['./workspace.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i2.RxCurrentUserService }, { type: i2.RxGlobalCacheService }, { type: i2.RxOverlayService }, { type: i2.RxPageTitleService }, { type: i3.TranslateService }, { type: i2.RxSmartReportingService }, { type: i2.RxNotificationService }, { type: AxBundleDeploymentService }, { type: i1.AdaptModalService }, { type: i1$1.Router }, { type: i0.Renderer2 }, { type: i2$1.RxGainsightConfiguratorService }]; }, propDecorators: { fileInput: [{
                type: ViewChild,
                args: ['fileInput', { static: false }]
            }], nameColumnTemplate: [{
                type: ViewChild,
                args: ['nameColumnTemplate', { static: true }]
            }] } });

class AxBundleResolver {
    constructor(rxBundleService, rxLogService, rxGlobalCacheService, rxViewActionRegistryService, rxViewComponentRegistryService) {
        this.rxBundleService = rxBundleService;
        this.rxLogService = rxLogService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
    }
    resolve() {
        let angularBundleDescriptors = [];
        return this.rxGlobalCacheService.getLicensedBundleDescriptors().pipe(map((bundleDescriptors) => bundleDescriptors.filter((bundleDescriptor) => bundleDescriptor.containsAngular)), tap((bundleDescriptors) => (angularBundleDescriptors = bundleDescriptors)), map((bundleDescriptors) => bundleDescriptors.map((bundleDescriptor) => bundleDescriptor.id)), switchMap((bundleIds) => bundleIds.length ? this.rxBundleService.loadBundles(bundleIds, true) : of(bundleIds)), switchMap((bundleContexts) => this.rxViewComponentRegistryService.resolveAsyncDescriptors().pipe(map(() => bundleContexts))), tap((bundleContexts) => {
            const registeredComponents = this.rxViewComponentRegistryService.getRegisteredComponents();
            const registeredActions = this.rxViewActionRegistryService.getRegisteredActions();
            forEach(bundleContexts, (bundleContext) => {
                if (bundleContext.isBundleCompiled) {
                    const bundleDescriptor = find(angularBundleDescriptors, {
                        id: bundleContext.bundleId
                    });
                    if (bundleDescriptor) {
                        const unregisteredComponents = filter$1(bundleDescriptor.uiOptions.viewComponents, (rxViewComponentName) => !registeredComponents.has(rxViewComponentName));
                        const unregisteredActions = filter$1(bundleDescriptor.uiOptions.viewActions, (rxViewActionName) => !registeredActions.has(rxViewActionName));
                        if (!isEmpty(unregisteredComponents)) {
                            this.rxLogService.warning(`${bundleDescriptor.id}: Unregistered view components found in the manifest \n ${unregisteredComponents}`);
                        }
                        if (!isEmpty(unregisteredActions)) {
                            this.rxLogService.warning(`${bundleDescriptor.id}: Unregistered view actions found in the manifest \n ${unregisteredActions}`);
                        }
                    }
                }
            });
        }), shareReplay(1));
    }
}
/** @nocollapse */ AxBundleResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxBundleResolver, deps: [{ token: i2.RxBundleService }, { token: i2.RxLogService }, { token: i2.RxGlobalCacheService }, { token: i2$3.RxViewActionRegistryService }, { token: i2$3.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ AxBundleResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxBundleResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxBundleResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i2.RxBundleService }, { type: i2.RxLogService }, { type: i2.RxGlobalCacheService }, { type: i2$3.RxViewActionRegistryService }, { type: i2$3.RxViewComponentRegistryService }]; } });

class AxLegacyShellGuard {
    constructor(router, rxAngularApplicationService, rxDefinitionNameService, rxViewDefinitionService, rxLogService) {
        this.router = router;
        this.rxAngularApplicationService = rxAngularApplicationService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxViewDefinitionService = rxViewDefinitionService;
        this.rxLogService = rxLogService;
    }
    canActivate(route, state) {
        const { bundleId } = route.params;
        return forkJoin({
            isAngularJsApplication: this.rxAngularApplicationService.isAngularJsApplication(bundleId),
            shellViewDefinition: this.rxViewDefinitionService.get(this.rxDefinitionNameService.getDefinitionName(bundleId, RX_APPLICATION.shellDefinitionName))
        }).pipe(map(({ isAngularJsApplication, shellViewDefinition }) => {
            const isAngularJs = isAngularJsApplication && !includes(shellViewDefinition.layout, '"outlets"');
            if (isAngularJs && route.parent.routeConfig.path === 'shell') {
                return this.router.createUrlTree([RX_APPLICATION.innovationStudioBundleId, 'shell-legacy', bundleId]);
            }
            else if (!isAngularJs && route.parent.routeConfig.path === 'shell-legacy') {
                return this.router.createUrlTree([RX_APPLICATION.innovationStudioBundleId, 'shell', bundleId]);
            }
            else {
                return true;
            }
        }), catchError((error) => {
            this.rxLogService.error(error.message);
            return of(this.router.createUrlTree([RX_APPLICATION.innovationStudioBundleId, bundleId, 'record-definitions']));
        }));
    }
}
/** @nocollapse */ AxLegacyShellGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxLegacyShellGuard, deps: [{ token: i1$1.Router }, { token: i2.RxAngularApplicationService }, { token: i2.RxDefinitionNameService }, { token: i2$3.RxViewDefinitionService }, { token: i2.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ AxLegacyShellGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxLegacyShellGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxLegacyShellGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.Router }, { type: i2.RxAngularApplicationService }, { type: i2.RxDefinitionNameService }, { type: i2$3.RxViewDefinitionService }, { type: i2.RxLogService }]; } });

class AxLegacyViewGuard {
    constructor(router, rxAngularApplicationService, rxDefinitionNameService, rxViewDefinitionService, rxLogService) {
        this.router = router;
        this.rxAngularApplicationService = rxAngularApplicationService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxViewDefinitionService = rxViewDefinitionService;
        this.rxLogService = rxLogService;
    }
    canActivate(route, state) {
        const { bundleId, definitionName } = route.params;
        const effectiveBundleId = bundleId || this.rxDefinitionNameService.getBundleId(definitionName);
        return forkJoin({
            isAngularJsViewDesigner: this.rxAngularApplicationService.isAngularJsViewDesignerBundle(effectiveBundleId),
            viewDefinition: definitionName
                ? this.rxViewDefinitionService.get(definitionName, {
                    headers: new HttpHeaders({
                        'Design-Time': 'true',
                        'default-bundle-scope': effectiveBundleId
                    })
                })
                : of(null)
        }).pipe(map(({ isAngularJsViewDesigner, viewDefinition }) => {
            var _a, _b, _c, _d;
            if (route.routeConfig.path.includes('new')) {
                if (isAngularJsViewDesigner && ((_a = route.routeConfig.data) === null || _a === void 0 ? void 0 : _a.routerGroup) !== 'legacy-designer') {
                    return this.router.createUrlTree([RX_APPLICATION.innovationStudioBundleId, 'view', 'new-legacy', effectiveBundleId], {
                        queryParams: route.queryParams
                    });
                }
                else if (!isAngularJsViewDesigner && ((_b = route.routeConfig.data) === null || _b === void 0 ? void 0 : _b.routerGroup) === 'legacy-designer') {
                    return this.router.createUrlTree([RX_APPLICATION.innovationStudioBundleId, 'view', 'new', effectiveBundleId], {
                        queryParams: route.queryParams
                    });
                }
                else {
                    return true;
                }
            }
            const isAngularJsEditMode = isAngularJsViewDesigner && !includes(viewDefinition === null || viewDefinition === void 0 ? void 0 : viewDefinition.layout, '"outlets"');
            if (!isAngularJsEditMode && ((_c = route.routeConfig.data) === null || _c === void 0 ? void 0 : _c.routerGroup) === 'legacy-designer') {
                return this.router.createUrlTree([RX_APPLICATION.innovationStudioBundleId, 'view', 'edit', definitionName]);
            }
            else if (isAngularJsEditMode && ((_d = route.routeConfig.data) === null || _d === void 0 ? void 0 : _d.routerGroup) !== 'legacy-designer') {
                return this.router.createUrlTree([
                    RX_APPLICATION.innovationStudioBundleId,
                    'view',
                    'edit-legacy',
                    definitionName
                ]);
            }
            else {
                return true;
            }
        }), catchError((error) => {
            this.rxLogService.error(error.message);
            return of(this.router.createUrlTree([RX_APPLICATION.innovationStudioBundleId, effectiveBundleId, 'view-definitions']));
        }));
    }
}
/** @nocollapse */ AxLegacyViewGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxLegacyViewGuard, deps: [{ token: i1$1.Router }, { token: i2.RxAngularApplicationService }, { token: i2.RxDefinitionNameService }, { token: i2$3.RxViewDefinitionService }, { token: i2.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ AxLegacyViewGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxLegacyViewGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxLegacyViewGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.Router }, { type: i2.RxAngularApplicationService }, { type: i2.RxDefinitionNameService }, { type: i2$3.RxViewDefinitionService }, { type: i2.RxLogService }]; } });

class AxValidBundleGuard {
    constructor(rxGlobalCacheService, router, rxSessionService, rxLogService) {
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.router = router;
        this.rxSessionService = rxSessionService;
        this.rxLogService = rxLogService;
        this.defaultUrlTree = this.router.parseUrl('/innovationstudio');
    }
    canActivate(route, state) {
        return this.rxSessionService.sessionActive$.pipe(switchMap(() => this.checkBundleState(route)));
    }
    checkBundleState(route) {
        const bundleId = route.paramMap.get('bundleId');
        return this.rxGlobalCacheService.getBundleDescriptor(bundleId).pipe(map((bundleDescriptor) => {
            if (!bundleDescriptor) {
                this.rxLogService.warning(`Invalid bundle ID: ${bundleId}. Redirecting to home page.`);
                return this.defaultUrlTree;
            }
            return true;
        }));
    }
}
/** @nocollapse */ AxValidBundleGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxValidBundleGuard, deps: [{ token: i2.RxGlobalCacheService }, { token: i1$1.Router }, { token: i2.RxSessionService }, { token: i2.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ AxValidBundleGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxValidBundleGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxValidBundleGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i2.RxGlobalCacheService }, { type: i1$1.Router }, { type: i2.RxSessionService }, { type: i2.RxLogService }]; } });

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
class ComBmcArsysRxInnovationstudioRoutingModule {
}
/** @nocollapse */ ComBmcArsysRxInnovationstudioRoutingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ComBmcArsysRxInnovationstudioRoutingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ ComBmcArsysRxInnovationstudioRoutingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ComBmcArsysRxInnovationstudioRoutingModule, imports: [i1$1.RouterModule], exports: [RouterModule] });
/** @nocollapse */ ComBmcArsysRxInnovationstudioRoutingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ComBmcArsysRxInnovationstudioRoutingModule, imports: [[RouterModule.forChild(routes)], RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ComBmcArsysRxInnovationstudioRoutingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RouterModule.forChild(routes)],
                    exports: [RouterModule]
                }]
        }] });

class DefinitionTabModule {
}
/** @nocollapse */ DefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ DefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionTabModule, declarations: [DefinitionTabComponent], imports: [CommonModule,
        AdaptButtonModule,
        AdaptIconModule,
        AdaptDropdownModule,
        RxDefinitionModule,
        RecordGridModule,
        RxBusyIndicatorModule,
        RxOverlayModule,
        TranslateModule,
        RouterModule], exports: [DefinitionTabComponent] });
/** @nocollapse */ DefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionTabModule, imports: [[
            CommonModule,
            AdaptButtonModule,
            AdaptIconModule,
            AdaptDropdownModule,
            RxDefinitionModule,
            RecordGridModule,
            RxBusyIndicatorModule,
            RxOverlayModule,
            TranslateModule,
            RouterModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        AdaptButtonModule,
                        AdaptIconModule,
                        AdaptDropdownModule,
                        RxDefinitionModule,
                        RecordGridModule,
                        RxBusyIndicatorModule,
                        RxOverlayModule,
                        TranslateModule,
                        RouterModule
                    ],
                    declarations: [DefinitionTabComponent],
                    exports: [DefinitionTabComponent]
                }]
        }] });

class AssociationDefinitionTabModule {
}
/** @nocollapse */ AssociationDefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ AssociationDefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDefinitionTabModule, declarations: [AssociationDefinitionTabComponent], imports: [CommonModule, DefinitionTabModule, RxDefinitionModule, RxAssociationPipesModule], exports: [AssociationDefinitionTabComponent] });
/** @nocollapse */ AssociationDefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDefinitionTabModule, imports: [[CommonModule, DefinitionTabModule, RxDefinitionModule, RxAssociationPipesModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [AssociationDefinitionTabComponent],
                    imports: [CommonModule, DefinitionTabModule, RxDefinitionModule, RxAssociationPipesModule],
                    exports: [AssociationDefinitionTabComponent]
                }]
        }] });

class DocumentDefinitionTabModule {
}
/** @nocollapse */ DocumentDefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ DocumentDefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDefinitionTabModule, declarations: [DocumentDefinitionTabComponent], imports: [CommonModule, DefinitionTabModule, RxDefinitionModule, TranslateModule], exports: [DocumentDefinitionTabComponent] });
/** @nocollapse */ DocumentDefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDefinitionTabModule, imports: [[CommonModule, DefinitionTabModule, RxDefinitionModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [DocumentDefinitionTabComponent],
                    imports: [CommonModule, DefinitionTabModule, RxDefinitionModule, TranslateModule],
                    exports: [DocumentDefinitionTabComponent]
                }]
        }] });

class CreateCustomRecordModule {
}
/** @nocollapse */ CreateCustomRecordModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateCustomRecordModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ CreateCustomRecordModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateCustomRecordModule, declarations: [CreateCustomRecordComponent], imports: [CommonModule,
        ReactiveFormsModule,
        RxModalModule,
        AdaptRxTextfieldModule,
        AdaptRxSelectModule,
        AdaptButtonModule,
        AdaptBusyModule,
        TranslateModule] });
/** @nocollapse */ CreateCustomRecordModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateCustomRecordModule, imports: [[
            CommonModule,
            ReactiveFormsModule,
            RxModalModule,
            AdaptRxTextfieldModule,
            AdaptRxSelectModule,
            AdaptButtonModule,
            AdaptBusyModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateCustomRecordModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        RxModalModule,
                        AdaptRxTextfieldModule,
                        AdaptRxSelectModule,
                        AdaptButtonModule,
                        AdaptBusyModule,
                        TranslateModule
                    ],
                    declarations: [CreateCustomRecordComponent]
                }]
        }] });

class CreateJoinRecordModule {
}
/** @nocollapse */ CreateJoinRecordModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateJoinRecordModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ CreateJoinRecordModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateJoinRecordModule, declarations: [CreateJoinRecordComponent], imports: [CommonModule,
        ReactiveFormsModule,
        RxModalModule,
        AdaptRxTextfieldModule,
        AdaptRxSelectModule,
        AdaptButtonModule,
        AdaptBusyModule,
        TranslateModule,
        ExpressionFormControlModule,
        RxDefinitionPickerModule] });
/** @nocollapse */ CreateJoinRecordModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateJoinRecordModule, imports: [[
            CommonModule,
            ReactiveFormsModule,
            RxModalModule,
            AdaptRxTextfieldModule,
            AdaptRxSelectModule,
            AdaptButtonModule,
            AdaptBusyModule,
            TranslateModule,
            ExpressionFormControlModule,
            RxDefinitionPickerModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateJoinRecordModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        RxModalModule,
                        AdaptRxTextfieldModule,
                        AdaptRxSelectModule,
                        AdaptButtonModule,
                        AdaptBusyModule,
                        TranslateModule,
                        ExpressionFormControlModule,
                        RxDefinitionPickerModule
                    ],
                    declarations: [CreateJoinRecordComponent]
                }]
        }] });

class ExternalRecordWizardModule {
}
/** @nocollapse */ ExternalRecordWizardModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExternalRecordWizardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ ExternalRecordWizardModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExternalRecordWizardModule, declarations: [DataSourceStepComponent,
        DocumentSelectionStepComponent,
        FieldSelectionStepComponent$1,
        FieldTreeSelectionStepComponent,
        OperationSelectionStepComponent,
        RecordIdFieldsStepComponent,
        TableSelectionStepComponent,
        WebApiSelectionStepComponent], imports: [AdaptButtonModule,
        AdaptIconModule,
        AdaptRxFormControlModule,
        AdaptRxRadiobuttonModule,
        AdaptRxSelectModule,
        AdaptTooltipModule,
        AdaptTreeModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RecordGridModule,
        RxDefinitionModule,
        RxRecordDefinitionResourceTypePipeModule,
        RecordDesignerModule,
        RxWizardModule,
        TranslateModule,
        AdaptPopoverModule] });
/** @nocollapse */ ExternalRecordWizardModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExternalRecordWizardModule, providers: [ExternalRecordWizardService, RxDataSourceDataPageService, RxExternalDataService], imports: [[
            AdaptButtonModule,
            AdaptIconModule,
            AdaptRxFormControlModule,
            AdaptRxRadiobuttonModule,
            AdaptRxSelectModule,
            AdaptTooltipModule,
            AdaptTreeModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RecordGridModule,
            RxDefinitionModule,
            RxRecordDefinitionResourceTypePipeModule,
            RecordDesignerModule,
            RxWizardModule,
            TranslateModule,
            AdaptPopoverModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExternalRecordWizardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptButtonModule,
                        AdaptIconModule,
                        AdaptRxFormControlModule,
                        AdaptRxRadiobuttonModule,
                        AdaptRxSelectModule,
                        AdaptTooltipModule,
                        AdaptTreeModule,
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RecordGridModule,
                        RxDefinitionModule,
                        RxRecordDefinitionResourceTypePipeModule,
                        RecordDesignerModule,
                        RxWizardModule,
                        TranslateModule,
                        AdaptPopoverModule
                    ],
                    providers: [ExternalRecordWizardService, RxDataSourceDataPageService, RxExternalDataService],
                    declarations: [
                        DataSourceStepComponent,
                        DocumentSelectionStepComponent,
                        FieldSelectionStepComponent$1,
                        FieldTreeSelectionStepComponent,
                        OperationSelectionStepComponent,
                        RecordIdFieldsStepComponent,
                        TableSelectionStepComponent,
                        WebApiSelectionStepComponent
                    ]
                }]
        }] });

class JoinRecordWizardModule {
}
/** @nocollapse */ JoinRecordWizardModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JoinRecordWizardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ JoinRecordWizardModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JoinRecordWizardModule, declarations: [RecordDefinitionsStepComponent, JoinCriteriaStepComponent, FieldSelectionStepComponent], imports: [CommonModule,
        RxDefinitionPickerModule,
        TranslateModule,
        AdaptRxSelectModule,
        RxWizardModule,
        AdaptAlertModule,
        FormsModule,
        ReactiveFormsModule,
        ExpressionFormControlModule] });
/** @nocollapse */ JoinRecordWizardModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JoinRecordWizardModule, providers: [JoinRecordWizardService], imports: [[
            CommonModule,
            RxDefinitionPickerModule,
            TranslateModule,
            AdaptRxSelectModule,
            RxWizardModule,
            AdaptAlertModule,
            FormsModule,
            ReactiveFormsModule,
            ExpressionFormControlModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JoinRecordWizardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RxDefinitionPickerModule,
                        TranslateModule,
                        AdaptRxSelectModule,
                        RxWizardModule,
                        AdaptAlertModule,
                        FormsModule,
                        ReactiveFormsModule,
                        ExpressionFormControlModule
                    ],
                    providers: [JoinRecordWizardService],
                    declarations: [RecordDefinitionsStepComponent, JoinCriteriaStepComponent, FieldSelectionStepComponent]
                }]
        }] });

class RecordDefinitionTabModule {
}
/** @nocollapse */ RecordDefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ RecordDefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDefinitionTabModule, declarations: [RecordDefinitionTabComponent, AxRecordDefinitionTypePipe], imports: [CommonModule,
        DefinitionTabModule,
        ExternalRecordWizardModule,
        JoinRecordWizardModule,
        CreateCustomRecordModule,
        CreateJoinRecordModule], exports: [RecordDefinitionTabComponent] });
/** @nocollapse */ RecordDefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDefinitionTabModule, imports: [[
            CommonModule,
            DefinitionTabModule,
            ExternalRecordWizardModule,
            JoinRecordWizardModule,
            CreateCustomRecordModule,
            CreateJoinRecordModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        DefinitionTabModule,
                        ExternalRecordWizardModule,
                        JoinRecordWizardModule,
                        CreateCustomRecordModule,
                        CreateJoinRecordModule
                    ],
                    declarations: [RecordDefinitionTabComponent, AxRecordDefinitionTypePipe],
                    exports: [RecordDefinitionTabComponent]
                }]
        }] });

class ViewDefinitionTabModule {
}
/** @nocollapse */ ViewDefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ ViewDefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDefinitionTabModule, declarations: [ViewDefinitionTabComponent], imports: [CommonModule, DefinitionTabModule, RouterModule, RxDefinitionModule, RenameDefinitionModalModule], exports: [ViewDefinitionTabComponent] });
/** @nocollapse */ ViewDefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDefinitionTabModule, imports: [[CommonModule, DefinitionTabModule, RouterModule, RxDefinitionModule, RenameDefinitionModalModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ViewDefinitionTabComponent],
                    imports: [CommonModule, DefinitionTabModule, RouterModule, RxDefinitionModule, RenameDefinitionModalModule],
                    exports: [ViewDefinitionTabComponent]
                }]
        }] });

class ProcessRunModalModule {
}
/** @nocollapse */ ProcessRunModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessRunModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ ProcessRunModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessRunModalModule, declarations: [ProcessRunModalComponent], imports: [CommonModule, FormsModule, RxFormBuilderModule, TranslateModule, AdaptButtonModule] });
/** @nocollapse */ ProcessRunModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessRunModalModule, imports: [[CommonModule, FormsModule, RxFormBuilderModule, TranslateModule, AdaptButtonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessRunModalModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ProcessRunModalComponent],
                    imports: [CommonModule, FormsModule, RxFormBuilderModule, TranslateModule, AdaptButtonModule]
                }]
        }] });

class ProcessPreviewModalModule {
}
/** @nocollapse */ ProcessPreviewModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessPreviewModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ ProcessPreviewModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessPreviewModalModule, declarations: [ProcessPreviewModalComponent], imports: [CommonModule, TranslateModule, AdaptButtonModule, RxProcessPreviewModule] });
/** @nocollapse */ ProcessPreviewModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessPreviewModalModule, imports: [[CommonModule, TranslateModule, AdaptButtonModule, RxProcessPreviewModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessPreviewModalModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ProcessPreviewModalComponent],
                    imports: [CommonModule, TranslateModule, AdaptButtonModule, RxProcessPreviewModule]
                }]
        }] });

class ProcessViewLogModalModule {
}
/** @nocollapse */ ProcessViewLogModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessViewLogModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ ProcessViewLogModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessViewLogModalModule, declarations: [ProcessViewLogModalComponent], imports: [CommonModule, TranslateModule, AdaptButtonModule, AdaptEmptyStateModule, RxProcessPreviewModule] });
/** @nocollapse */ ProcessViewLogModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessViewLogModalModule, imports: [[CommonModule, TranslateModule, AdaptButtonModule, AdaptEmptyStateModule, RxProcessPreviewModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessViewLogModalModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ProcessViewLogModalComponent],
                    imports: [CommonModule, TranslateModule, AdaptButtonModule, AdaptEmptyStateModule, RxProcessPreviewModule]
                }]
        }] });

class ProcessManagementModule {
}
/** @nocollapse */ ProcessManagementModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessManagementModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ ProcessManagementModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessManagementModule, declarations: [ProcessManagementComponent], imports: [CommonModule,
        AdaptButtonModule,
        AdaptDockedPanelModule,
        TranslateModule,
        AdaptIconModule,
        AdaptTreeModule,
        AdaptTabsModule,
        AdaptRxSelectModule,
        AdaptRxFormControlModule,
        FormsModule,
        RxDefinitionModule,
        RecordGridModule,
        ProcessPreviewModalModule,
        ProcessViewLogModalModule,
        ProcessRunModalModule,
        RxFormBuilderModule,
        RxBusyIndicatorModule,
        RxBreadcrumbBarModule,
        AdaptTooltipModule,
        AdaptEmptyStateModule,
        AdaptSidebarModule,
        RouterModule] });
/** @nocollapse */ ProcessManagementModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessManagementModule, imports: [[
            CommonModule,
            AdaptButtonModule,
            AdaptDockedPanelModule,
            TranslateModule,
            AdaptIconModule,
            AdaptTreeModule,
            AdaptTabsModule,
            AdaptRxSelectModule,
            AdaptRxFormControlModule,
            FormsModule,
            RxDefinitionModule,
            RecordGridModule,
            ProcessPreviewModalModule,
            ProcessViewLogModalModule,
            ProcessRunModalModule,
            RxFormBuilderModule,
            RxBusyIndicatorModule,
            RxBreadcrumbBarModule,
            AdaptTooltipModule,
            AdaptEmptyStateModule,
            AdaptSidebarModule,
            RouterModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessManagementModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ProcessManagementComponent],
                    imports: [
                        CommonModule,
                        AdaptButtonModule,
                        AdaptDockedPanelModule,
                        TranslateModule,
                        AdaptIconModule,
                        AdaptTreeModule,
                        AdaptTabsModule,
                        AdaptRxSelectModule,
                        AdaptRxFormControlModule,
                        FormsModule,
                        RxDefinitionModule,
                        RecordGridModule,
                        ProcessPreviewModalModule,
                        ProcessViewLogModalModule,
                        ProcessRunModalModule,
                        RxFormBuilderModule,
                        RxBusyIndicatorModule,
                        RxBreadcrumbBarModule,
                        AdaptTooltipModule,
                        AdaptEmptyStateModule,
                        AdaptSidebarModule,
                        RouterModule
                    ]
                }]
        }] });

class ProcessDefinitionTabModule {
}
/** @nocollapse */ ProcessDefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ ProcessDefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDefinitionTabModule, declarations: [ProcessDefinitionTabComponent], imports: [CommonModule, DefinitionTabModule, ProcessManagementModule, RxDefinitionModule], exports: [ProcessDefinitionTabComponent] });
/** @nocollapse */ ProcessDefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDefinitionTabModule, imports: [[CommonModule, DefinitionTabModule, ProcessManagementModule, RxDefinitionModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ProcessDefinitionTabComponent],
                    imports: [CommonModule, DefinitionTabModule, ProcessManagementModule, RxDefinitionModule],
                    exports: [ProcessDefinitionTabComponent]
                }]
        }] });

class RuleDefinitionTabModule {
}
/** @nocollapse */ RuleDefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuleDefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ RuleDefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuleDefinitionTabModule, declarations: [RuleDefinitionTabComponent], imports: [CommonModule, DefinitionTabModule, RouterModule, RxDefinitionModule, RxRulePipesModule], exports: [RuleDefinitionTabComponent] });
/** @nocollapse */ RuleDefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuleDefinitionTabModule, imports: [[CommonModule, DefinitionTabModule, RouterModule, RxDefinitionModule, RxRulePipesModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuleDefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RuleDefinitionTabComponent],
                    imports: [CommonModule, DefinitionTabModule, RouterModule, RxDefinitionModule, RxRulePipesModule],
                    exports: [RuleDefinitionTabComponent]
                }]
        }] });

class NamedListDefinitionTabModule {
}
/** @nocollapse */ NamedListDefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedListDefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ NamedListDefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedListDefinitionTabModule, declarations: [NamedListDefinitionTabComponent], imports: [CommonModule, DefinitionTabModule, RxDefinitionModule], exports: [NamedListDefinitionTabComponent] });
/** @nocollapse */ NamedListDefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedListDefinitionTabModule, imports: [[CommonModule, DefinitionTabModule, RxDefinitionModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedListDefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NamedListDefinitionTabComponent],
                    imports: [CommonModule, DefinitionTabModule, RxDefinitionModule],
                    exports: [NamedListDefinitionTabComponent]
                }]
        }] });

class WebApiDefinitionTabModule {
}
/** @nocollapse */ WebApiDefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiDefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ WebApiDefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiDefinitionTabModule, declarations: [WebApiDefinitionTabComponent], imports: [CommonModule, DefinitionTabModule, RxDefinitionModule, TranslateModule], exports: [WebApiDefinitionTabComponent] });
/** @nocollapse */ WebApiDefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiDefinitionTabModule, imports: [[CommonModule, DefinitionTabModule, RxDefinitionModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiDefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [WebApiDefinitionTabComponent],
                    imports: [CommonModule, DefinitionTabModule, RxDefinitionModule, TranslateModule],
                    exports: [WebApiDefinitionTabComponent]
                }]
        }] });

class ChatbotDefinitionTabModule {
}
/** @nocollapse */ ChatbotDefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotDefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ ChatbotDefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotDefinitionTabModule, declarations: [ChatbotDefinitionTabComponent], imports: [CommonModule, DefinitionTabModule, RxDefinitionModule], exports: [ChatbotDefinitionTabComponent] });
/** @nocollapse */ ChatbotDefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotDefinitionTabModule, imports: [[CommonModule, DefinitionTabModule, RxDefinitionModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotDefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ChatbotDefinitionTabComponent],
                    imports: [CommonModule, DefinitionTabModule, RxDefinitionModule],
                    exports: [ChatbotDefinitionTabComponent]
                }]
        }] });

class EventDefinitionTabModule {
}
/** @nocollapse */ EventDefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EventDefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ EventDefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EventDefinitionTabModule, declarations: [EventDefinitionTabComponent], imports: [CommonModule, DefinitionTabModule, RxDefinitionModule, TranslateModule], exports: [EventDefinitionTabComponent] });
/** @nocollapse */ EventDefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EventDefinitionTabModule, imports: [[CommonModule, DefinitionTabModule, RxDefinitionModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EventDefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [EventDefinitionTabComponent],
                    imports: [CommonModule, DefinitionTabModule, RxDefinitionModule, TranslateModule],
                    exports: [EventDefinitionTabComponent]
                }]
        }] });

class EventStatisticsDefinitionTabModule {
}
/** @nocollapse */ EventStatisticsDefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EventStatisticsDefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ EventStatisticsDefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EventStatisticsDefinitionTabModule, declarations: [EventStatisticsDefinitionTabComponent], imports: [CommonModule, DefinitionTabModule, RxDefinitionModule, TranslateModule], exports: [EventStatisticsDefinitionTabComponent] });
/** @nocollapse */ EventStatisticsDefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EventStatisticsDefinitionTabModule, imports: [[CommonModule, DefinitionTabModule, RxDefinitionModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EventStatisticsDefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [EventStatisticsDefinitionTabComponent],
                    imports: [CommonModule, DefinitionTabModule, RxDefinitionModule, TranslateModule],
                    exports: [EventStatisticsDefinitionTabComponent]
                }]
        }] });

class ConfigurationDefinitionTabModule {
}
/** @nocollapse */ ConfigurationDefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigurationDefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ ConfigurationDefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigurationDefinitionTabModule, declarations: [ConfigurationDefinitionTabComponent, AdminSettingEditorComponent], imports: [AdaptModalModule,
        AdaptButtonModule,
        CommonModule,
        DefinitionTabModule,
        RouterModule,
        TranslateModule,
        ReactiveFormsModule,
        RxDefinitionPickerModule,
        RxPermissionEditorModule,
        AdaptRxTextfieldModule,
        AdaptRxLabelModule,
        AdaptRxCheckboxModule], exports: [ConfigurationDefinitionTabComponent] });
/** @nocollapse */ ConfigurationDefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigurationDefinitionTabModule, imports: [[
            AdaptModalModule,
            AdaptButtonModule,
            CommonModule,
            DefinitionTabModule,
            RouterModule,
            TranslateModule,
            ReactiveFormsModule,
            RxDefinitionPickerModule,
            RxPermissionEditorModule,
            AdaptRxTextfieldModule,
            AdaptRxLabelModule,
            AdaptRxCheckboxModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigurationDefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ConfigurationDefinitionTabComponent, AdminSettingEditorComponent],
                    imports: [
                        AdaptModalModule,
                        AdaptButtonModule,
                        CommonModule,
                        DefinitionTabModule,
                        RouterModule,
                        TranslateModule,
                        ReactiveFormsModule,
                        RxDefinitionPickerModule,
                        RxPermissionEditorModule,
                        AdaptRxTextfieldModule,
                        AdaptRxLabelModule,
                        AdaptRxCheckboxModule
                    ],
                    exports: [ConfigurationDefinitionTabComponent]
                }]
        }] });

class BundleDefinitionsModule {
}
/** @nocollapse */ BundleDefinitionsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BundleDefinitionsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ BundleDefinitionsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BundleDefinitionsModule, declarations: [BundleDefinitionsComponent], imports: [AdaptTabsModule,
        ProcessDefinitionTabModule,
        AssociationDefinitionTabModule,
        ChatbotDefinitionTabModule,
        CommonModule,
        NamedListDefinitionTabModule,
        DocumentDefinitionTabModule,
        RecordDefinitionTabModule,
        RuleDefinitionTabModule,
        RouterModule,
        TranslateModule,
        ViewDefinitionTabModule,
        EventDefinitionTabModule,
        EventStatisticsDefinitionTabModule,
        WebApiDefinitionTabModule,
        ConfigurationDefinitionTabModule], exports: [BundleDefinitionsComponent] });
/** @nocollapse */ BundleDefinitionsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BundleDefinitionsModule, imports: [[
            AdaptTabsModule,
            ProcessDefinitionTabModule,
            AssociationDefinitionTabModule,
            ChatbotDefinitionTabModule,
            CommonModule,
            NamedListDefinitionTabModule,
            DocumentDefinitionTabModule,
            RecordDefinitionTabModule,
            RuleDefinitionTabModule,
            RouterModule,
            TranslateModule,
            ViewDefinitionTabModule,
            EventDefinitionTabModule,
            EventStatisticsDefinitionTabModule,
            WebApiDefinitionTabModule,
            ConfigurationDefinitionTabModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BundleDefinitionsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptTabsModule,
                        ProcessDefinitionTabModule,
                        AssociationDefinitionTabModule,
                        ChatbotDefinitionTabModule,
                        CommonModule,
                        NamedListDefinitionTabModule,
                        DocumentDefinitionTabModule,
                        RecordDefinitionTabModule,
                        RuleDefinitionTabModule,
                        RouterModule,
                        TranslateModule,
                        ViewDefinitionTabModule,
                        EventDefinitionTabModule,
                        EventStatisticsDefinitionTabModule,
                        WebApiDefinitionTabModule,
                        ConfigurationDefinitionTabModule
                    ],
                    declarations: [BundleDefinitionsComponent],
                    exports: [BundleDefinitionsComponent]
                }]
        }] });

class AddBundleContentDataWizardStepModule {
}
/** @nocollapse */ AddBundleContentDataWizardStepModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddBundleContentDataWizardStepModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ AddBundleContentDataWizardStepModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddBundleContentDataWizardStepModule, declarations: [AddBundleContentDataWizardStepComponent], imports: [AdaptButtonModule,
        AdaptDropdownModule,
        AdaptIconModule,
        AdaptRxCheckboxModule,
        AdaptRxSelectModule,
        AdaptRxSwitchModule,
        CommonModule,
        ExpressionFormControlModule,
        FormsModule,
        ReactiveFormsModule,
        RecordGridModule,
        RxDefinitionModule,
        RxDefinitionPickerModule,
        TranslateModule,
        AdaptPopoverModule], exports: [AddBundleContentDataWizardStepComponent] });
/** @nocollapse */ AddBundleContentDataWizardStepModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddBundleContentDataWizardStepModule, imports: [[
            AdaptButtonModule,
            AdaptDropdownModule,
            AdaptIconModule,
            AdaptRxCheckboxModule,
            AdaptRxSelectModule,
            AdaptRxSwitchModule,
            CommonModule,
            ExpressionFormControlModule,
            FormsModule,
            ReactiveFormsModule,
            RecordGridModule,
            RxDefinitionModule,
            RxDefinitionPickerModule,
            TranslateModule,
            AdaptPopoverModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddBundleContentDataWizardStepModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptButtonModule,
                        AdaptDropdownModule,
                        AdaptIconModule,
                        AdaptRxCheckboxModule,
                        AdaptRxSelectModule,
                        AdaptRxSwitchModule,
                        CommonModule,
                        ExpressionFormControlModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RecordGridModule,
                        RxDefinitionModule,
                        RxDefinitionPickerModule,
                        TranslateModule,
                        AdaptPopoverModule
                    ],
                    declarations: [AddBundleContentDataWizardStepComponent],
                    exports: [AddBundleContentDataWizardStepComponent]
                }]
        }] });

class AddDataWizardStepModule {
}
/** @nocollapse */ AddDataWizardStepModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddDataWizardStepModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ AddDataWizardStepModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddDataWizardStepModule, declarations: [AddDataWizardStepComponent], imports: [AdaptButtonModule,
        AdaptDropdownModule,
        AdaptIconModule,
        AdaptRxCheckboxModule,
        AdaptRxSelectModule,
        AdaptRxSwitchModule,
        CommonModule,
        ExpressionFormControlModule,
        FormsModule,
        ReactiveFormsModule,
        RecordGridModule,
        RxDefinitionModule,
        RxDefinitionPickerModule,
        TranslateModule], exports: [AddDataWizardStepComponent] });
/** @nocollapse */ AddDataWizardStepModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddDataWizardStepModule, imports: [[
            AdaptButtonModule,
            AdaptDropdownModule,
            AdaptIconModule,
            AdaptRxCheckboxModule,
            AdaptRxSelectModule,
            AdaptRxSwitchModule,
            CommonModule,
            ExpressionFormControlModule,
            FormsModule,
            ReactiveFormsModule,
            RecordGridModule,
            RxDefinitionModule,
            RxDefinitionPickerModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddDataWizardStepModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptButtonModule,
                        AdaptDropdownModule,
                        AdaptIconModule,
                        AdaptRxCheckboxModule,
                        AdaptRxSelectModule,
                        AdaptRxSwitchModule,
                        CommonModule,
                        ExpressionFormControlModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RecordGridModule,
                        RxDefinitionModule,
                        RxDefinitionPickerModule,
                        TranslateModule
                    ],
                    declarations: [AddDataWizardStepComponent],
                    exports: [AddDataWizardStepComponent]
                }]
        }] });

class DownloadWizardStepModule {
}
/** @nocollapse */ DownloadWizardStepModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DownloadWizardStepModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ DownloadWizardStepModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DownloadWizardStepModule, declarations: [DownloadWizardStepComponent], imports: [CommonModule, AdaptButtonModule, TranslateModule], exports: [DownloadWizardStepComponent] });
/** @nocollapse */ DownloadWizardStepModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DownloadWizardStepModule, imports: [[CommonModule, AdaptButtonModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DownloadWizardStepModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AdaptButtonModule, TranslateModule],
                    declarations: [DownloadWizardStepComponent],
                    exports: [DownloadWizardStepComponent]
                }]
        }] });

class OptionsWizardStepModule {
}
/** @nocollapse */ OptionsWizardStepModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionsWizardStepModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ OptionsWizardStepModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionsWizardStepModule, declarations: [OptionsWizardStepComponent], imports: [AdaptRxCheckboxModule,
        AdaptRxLabelModule,
        AdaptRxTextfieldModule,
        AdaptTreeModule,
        AdaptRxSelectModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ReadOnlyFieldModule,
        TranslateModule], exports: [OptionsWizardStepComponent] });
/** @nocollapse */ OptionsWizardStepModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionsWizardStepModule, imports: [[
            AdaptRxCheckboxModule,
            AdaptRxLabelModule,
            AdaptRxTextfieldModule,
            AdaptTreeModule,
            AdaptRxSelectModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            ReadOnlyFieldModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionsWizardStepModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptRxCheckboxModule,
                        AdaptRxLabelModule,
                        AdaptRxTextfieldModule,
                        AdaptTreeModule,
                        AdaptRxSelectModule,
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        ReadOnlyFieldModule,
                        TranslateModule
                    ],
                    declarations: [OptionsWizardStepComponent],
                    exports: [OptionsWizardStepComponent]
                }]
        }] });

class OrderDataWizardStepModule {
}
/** @nocollapse */ OrderDataWizardStepModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OrderDataWizardStepModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ OrderDataWizardStepModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OrderDataWizardStepModule, declarations: [OrderDataWizardStepComponent], imports: [CommonModule, FormsModule, TranslateModule, AdaptButtonModule, RxDefinitionModule, AdaptEmptyStateModule], exports: [OrderDataWizardStepComponent] });
/** @nocollapse */ OrderDataWizardStepModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OrderDataWizardStepModule, imports: [[CommonModule, FormsModule, TranslateModule, AdaptButtonModule, RxDefinitionModule, AdaptEmptyStateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OrderDataWizardStepModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, TranslateModule, AdaptButtonModule, RxDefinitionModule, AdaptEmptyStateModule],
                    declarations: [OrderDataWizardStepComponent],
                    exports: [OrderDataWizardStepComponent]
                }]
        }] });

class PackageWizardStepModule {
}
/** @nocollapse */ PackageWizardStepModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PackageWizardStepModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ PackageWizardStepModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PackageWizardStepModule, declarations: [PackageWizardStepComponent], imports: [CommonModule, AdaptAlertModule, AdaptButtonModule, TranslateModule, AdaptRxTextareaModule, FormsModule], exports: [PackageWizardStepComponent] });
/** @nocollapse */ PackageWizardStepModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PackageWizardStepModule, imports: [[CommonModule, AdaptAlertModule, AdaptButtonModule, TranslateModule, AdaptRxTextareaModule, FormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PackageWizardStepModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AdaptAlertModule, AdaptButtonModule, TranslateModule, AdaptRxTextareaModule, FormsModule],
                    declarations: [PackageWizardStepComponent],
                    exports: [PackageWizardStepComponent]
                }]
        }] });

class SelectApprovalConfigurationsWizardStepModule {
}
/** @nocollapse */ SelectApprovalConfigurationsWizardStepModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectApprovalConfigurationsWizardStepModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ SelectApprovalConfigurationsWizardStepModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectApprovalConfigurationsWizardStepModule, declarations: [SelectApprovalConfigurationsWizardStepComponent], imports: [CommonModule, RecordGridModule, TranslateModule], exports: [SelectApprovalConfigurationsWizardStepComponent] });
/** @nocollapse */ SelectApprovalConfigurationsWizardStepModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectApprovalConfigurationsWizardStepModule, imports: [[CommonModule, RecordGridModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectApprovalConfigurationsWizardStepModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RecordGridModule, TranslateModule],
                    declarations: [SelectApprovalConfigurationsWizardStepComponent],
                    exports: [SelectApprovalConfigurationsWizardStepComponent]
                }]
        }] });

class SelectBundleContentDefinitionsWizardStepModule {
}
/** @nocollapse */ SelectBundleContentDefinitionsWizardStepModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectBundleContentDefinitionsWizardStepModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ SelectBundleContentDefinitionsWizardStepModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectBundleContentDefinitionsWizardStepModule, declarations: [SelectBundleContentDefinitionsWizardStepComponent], imports: [CommonModule, RecordGridModule, RxDefinitionModule, TranslateModule], exports: [SelectBundleContentDefinitionsWizardStepComponent] });
/** @nocollapse */ SelectBundleContentDefinitionsWizardStepModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectBundleContentDefinitionsWizardStepModule, imports: [[CommonModule, RecordGridModule, RxDefinitionModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectBundleContentDefinitionsWizardStepModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RecordGridModule, RxDefinitionModule, TranslateModule],
                    declarations: [SelectBundleContentDefinitionsWizardStepComponent],
                    exports: [SelectBundleContentDefinitionsWizardStepComponent]
                }]
        }] });

class SelectDefinitionsToDeleteWizardStepModule {
}
/** @nocollapse */ SelectDefinitionsToDeleteWizardStepModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectDefinitionsToDeleteWizardStepModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ SelectDefinitionsToDeleteWizardStepModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectDefinitionsToDeleteWizardStepModule, declarations: [SelectDefinitionsToDeleteWizardStepComponent], imports: [CommonModule, RecordGridModule, TranslateModule, AdaptPopoverModule, AdaptIconModule, RxDefinitionModule], exports: [SelectDefinitionsToDeleteWizardStepComponent] });
/** @nocollapse */ SelectDefinitionsToDeleteWizardStepModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectDefinitionsToDeleteWizardStepModule, imports: [[CommonModule, RecordGridModule, TranslateModule, AdaptPopoverModule, AdaptIconModule, RxDefinitionModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectDefinitionsToDeleteWizardStepModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RecordGridModule, TranslateModule, AdaptPopoverModule, AdaptIconModule, RxDefinitionModule],
                    declarations: [SelectDefinitionsToDeleteWizardStepComponent],
                    exports: [SelectDefinitionsToDeleteWizardStepComponent]
                }]
        }] });

class SelectDefinitionsWizardStepModule {
}
/** @nocollapse */ SelectDefinitionsWizardStepModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectDefinitionsWizardStepModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ SelectDefinitionsWizardStepModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectDefinitionsWizardStepModule, declarations: [SelectDefinitionsWizardStepComponent], imports: [CommonModule, RecordGridModule, TranslateModule], exports: [SelectDefinitionsWizardStepComponent] });
/** @nocollapse */ SelectDefinitionsWizardStepModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectDefinitionsWizardStepModule, imports: [[CommonModule, RecordGridModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectDefinitionsWizardStepModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RecordGridModule, TranslateModule],
                    declarations: [SelectDefinitionsWizardStepComponent],
                    exports: [SelectDefinitionsWizardStepComponent]
                }]
        }] });

class ContentPackageImportLogsModule {
}
/** @nocollapse */ ContentPackageImportLogsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContentPackageImportLogsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ ContentPackageImportLogsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContentPackageImportLogsModule, declarations: [ContentPackageImportLogsComponent], imports: [AdaptButtonModule,
        AdaptButtonGroupModule,
        AdaptRxSelectModule,
        AdaptRxTextfieldModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        RxBusyIndicatorModule,
        ReactiveFormsModule,
        RecordGridModule,
        AdaptRxLabelModule,
        AdaptTableModule,
        AdaptBusyModule] });
/** @nocollapse */ ContentPackageImportLogsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContentPackageImportLogsModule, providers: [DatePipe], imports: [[
            AdaptButtonModule,
            AdaptButtonGroupModule,
            AdaptRxSelectModule,
            AdaptRxTextfieldModule,
            CommonModule,
            FormsModule,
            TranslateModule,
            RxBusyIndicatorModule,
            ReactiveFormsModule,
            RecordGridModule,
            AdaptRxLabelModule,
            AdaptTableModule,
            AdaptBusyModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContentPackageImportLogsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ContentPackageImportLogsComponent],
                    imports: [
                        AdaptButtonModule,
                        AdaptButtonGroupModule,
                        AdaptRxSelectModule,
                        AdaptRxTextfieldModule,
                        CommonModule,
                        FormsModule,
                        TranslateModule,
                        RxBusyIndicatorModule,
                        ReactiveFormsModule,
                        RecordGridModule,
                        AdaptRxLabelModule,
                        AdaptTableModule,
                        AdaptBusyModule
                    ],
                    providers: [DatePipe]
                }]
        }] });

class ManageContentPackagesModule {
}
/** @nocollapse */ ManageContentPackagesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ManageContentPackagesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ ManageContentPackagesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ManageContentPackagesModule, declarations: [ManageContentPackagesComponent], imports: [AdaptButtonModule,
        AdaptButtonGroupModule,
        AdaptRxSelectModule,
        AdaptRxTextfieldModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        RxBusyIndicatorModule,
        ReactiveFormsModule,
        RecordGridModule,
        AdaptRxLabelModule,
        AdaptTableModule,
        AdaptBusyModule] });
/** @nocollapse */ ManageContentPackagesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ManageContentPackagesModule, providers: [DatePipe], imports: [[
            AdaptButtonModule,
            AdaptButtonGroupModule,
            AdaptRxSelectModule,
            AdaptRxTextfieldModule,
            CommonModule,
            FormsModule,
            TranslateModule,
            RxBusyIndicatorModule,
            ReactiveFormsModule,
            RecordGridModule,
            AdaptRxLabelModule,
            AdaptTableModule,
            AdaptBusyModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ManageContentPackagesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ManageContentPackagesComponent],
                    imports: [
                        AdaptButtonModule,
                        AdaptButtonGroupModule,
                        AdaptRxSelectModule,
                        AdaptRxTextfieldModule,
                        CommonModule,
                        FormsModule,
                        TranslateModule,
                        RxBusyIndicatorModule,
                        ReactiveFormsModule,
                        RecordGridModule,
                        AdaptRxLabelModule,
                        AdaptTableModule,
                        AdaptBusyModule
                    ],
                    providers: [DatePipe]
                }]
        }] });

class BundleDetailsModule {
}
/** @nocollapse */ BundleDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BundleDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ BundleDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BundleDetailsModule, declarations: [BundleDetailsComponent], imports: [CommonModule,
        AdaptButtonModule,
        AdaptTabsModule,
        RouterModule,
        AdaptIconModule,
        AdaptPopoverModule,
        AdaptDropdownModule,
        TranslateModule,
        AddBundleContentDataWizardStepModule,
        AddDataWizardStepModule,
        ContentPackageImportLogsModule,
        DownloadWizardStepModule,
        ManageContentPackagesModule,
        OptionsWizardStepModule,
        OrderDataWizardStepModule,
        PackageWizardStepModule,
        SelectApprovalConfigurationsWizardStepModule,
        SelectBundleContentDefinitionsWizardStepModule,
        SelectDefinitionsToDeleteWizardStepModule,
        SelectDefinitionsWizardStepModule], exports: [BundleDetailsComponent] });
/** @nocollapse */ BundleDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BundleDetailsModule, imports: [[
            CommonModule,
            AdaptButtonModule,
            AdaptTabsModule,
            RouterModule,
            AdaptIconModule,
            AdaptPopoverModule,
            AdaptDropdownModule,
            TranslateModule,
            AddBundleContentDataWizardStepModule,
            AddDataWizardStepModule,
            ContentPackageImportLogsModule,
            DownloadWizardStepModule,
            ManageContentPackagesModule,
            OptionsWizardStepModule,
            OrderDataWizardStepModule,
            PackageWizardStepModule,
            SelectApprovalConfigurationsWizardStepModule,
            SelectBundleContentDefinitionsWizardStepModule,
            SelectDefinitionsToDeleteWizardStepModule,
            SelectDefinitionsWizardStepModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BundleDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        AdaptButtonModule,
                        AdaptTabsModule,
                        RouterModule,
                        AdaptIconModule,
                        AdaptPopoverModule,
                        AdaptDropdownModule,
                        TranslateModule,
                        AddBundleContentDataWizardStepModule,
                        AddDataWizardStepModule,
                        ContentPackageImportLogsModule,
                        DownloadWizardStepModule,
                        ManageContentPackagesModule,
                        OptionsWizardStepModule,
                        OrderDataWizardStepModule,
                        PackageWizardStepModule,
                        SelectApprovalConfigurationsWizardStepModule,
                        SelectBundleContentDefinitionsWizardStepModule,
                        SelectDefinitionsToDeleteWizardStepModule,
                        SelectDefinitionsWizardStepModule
                    ],
                    declarations: [BundleDetailsComponent],
                    exports: [BundleDetailsComponent]
                }]
        }] });

class RecordDataEditorModule {
}
/** @nocollapse */ RecordDataEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDataEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ RecordDataEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDataEditorModule, declarations: [RecordDataEditorComponent], imports: [CommonModule,
        RxIframeModule,
        RxBusyIndicatorModule,
        TranslateModule,
        RecordGridModule,
        AdaptButtonModule,
        RxDefinitionModule,
        ActionButtonModule], exports: [RecordDataEditorComponent] });
/** @nocollapse */ RecordDataEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDataEditorModule, imports: [[
            CommonModule,
            RxIframeModule,
            RxBusyIndicatorModule,
            TranslateModule,
            RecordGridModule,
            AdaptButtonModule,
            RxDefinitionModule,
            ActionButtonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDataEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RxIframeModule,
                        RxBusyIndicatorModule,
                        TranslateModule,
                        RecordGridModule,
                        AdaptButtonModule,
                        RxDefinitionModule,
                        ActionButtonModule
                    ],
                    declarations: [RecordDataEditorComponent],
                    exports: [RecordDataEditorComponent]
                }]
        }] });

class DesignerFrameModule {
}
/** @nocollapse */ DesignerFrameModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DesignerFrameModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ DesignerFrameModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DesignerFrameModule, declarations: [DesignerFrameComponent], imports: [CommonModule, RxIframeModule, RxBusyIndicatorModule], exports: [DesignerFrameComponent] });
/** @nocollapse */ DesignerFrameModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DesignerFrameModule, imports: [[CommonModule, RxIframeModule, RxBusyIndicatorModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DesignerFrameModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RxIframeModule, RxBusyIndicatorModule],
                    declarations: [DesignerFrameComponent],
                    exports: [DesignerFrameComponent]
                }]
        }] });

class CreateBundleModalModule {
}
/** @nocollapse */ CreateBundleModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateBundleModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ CreateBundleModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateBundleModalModule, declarations: [CreateBundleModalComponent], imports: [CommonModule, TranslateModule, AdaptButtonModule, AdaptRxTextfieldModule, FormsModule, ReactiveFormsModule] });
/** @nocollapse */ CreateBundleModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateBundleModalModule, imports: [[CommonModule, TranslateModule, AdaptButtonModule, AdaptRxTextfieldModule, FormsModule, ReactiveFormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateBundleModalModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [CreateBundleModalComponent],
                    imports: [CommonModule, TranslateModule, AdaptButtonModule, AdaptRxTextfieldModule, FormsModule, ReactiveFormsModule]
                }]
        }] });

class WorkspaceModule {
}
/** @nocollapse */ WorkspaceModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WorkspaceModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ WorkspaceModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WorkspaceModule, declarations: [WorkspaceComponent], imports: [CommonModule,
        AdaptTableModule,
        FormsModule,
        ReactiveFormsModule,
        AdaptButtonModule,
        AdaptButtonGroupModule,
        AdaptDropdownModule,
        TranslateModule,
        CreateBundleModalModule,
        RouterModule] });
/** @nocollapse */ WorkspaceModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WorkspaceModule, imports: [[
            CommonModule,
            AdaptTableModule,
            FormsModule,
            ReactiveFormsModule,
            AdaptButtonModule,
            AdaptButtonGroupModule,
            AdaptDropdownModule,
            TranslateModule,
            CreateBundleModalModule,
            RouterModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WorkspaceModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [WorkspaceComponent],
                    imports: [
                        CommonModule,
                        AdaptTableModule,
                        FormsModule,
                        ReactiveFormsModule,
                        AdaptButtonModule,
                        AdaptButtonGroupModule,
                        AdaptDropdownModule,
                        TranslateModule,
                        CreateBundleModalModule,
                        RouterModule
                    ]
                }]
        }] });

class CopyDefinitionModule {
}
/** @nocollapse */ CopyDefinitionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CopyDefinitionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ CopyDefinitionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CopyDefinitionModule, declarations: [CopyDefinitionComponent], imports: [AdaptButtonModule,
        AdaptRxSelectModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        AdaptRxTextfieldModule,
        AdaptBusyModule] });
/** @nocollapse */ CopyDefinitionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CopyDefinitionModule, imports: [[
            AdaptButtonModule,
            AdaptRxSelectModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            TranslateModule,
            AdaptRxTextfieldModule,
            AdaptBusyModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CopyDefinitionModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [CopyDefinitionComponent],
                    imports: [
                        AdaptButtonModule,
                        AdaptRxSelectModule,
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        TranslateModule,
                        AdaptRxTextfieldModule,
                        AdaptBusyModule
                    ]
                }]
        }] });

class ComBmcArsysRxInnovationstudioModule {
}
/** @nocollapse */ ComBmcArsysRxInnovationstudioModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ComBmcArsysRxInnovationstudioModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ ComBmcArsysRxInnovationstudioModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ComBmcArsysRxInnovationstudioModule, imports: [CommonModule,
        ComBmcArsysRxInnovationstudioRoutingModule,
        BundleDetailsModule,
        BundleDefinitionsModule,
        DesignerFrameModule,
        DocumentDesignerPageModule,
        CopyDefinitionModule,
        RecordDataEditorModule,
        WorkspaceModule,
        RxViewDesignerPageModule,
        RxShellDesignerPageModule,
        RxAssociationDesignerPageModule,
        RxNamedListDesignerPageModule,
        ProcessDesignerPageModule,
        RecordDesignerPageModule,
        RxWebApiDesignerPageModule,
        RxEventDesignerPageModule,
        ConfigDesignerPageModule] });
/** @nocollapse */ ComBmcArsysRxInnovationstudioModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ComBmcArsysRxInnovationstudioModule, imports: [[
            CommonModule,
            ComBmcArsysRxInnovationstudioRoutingModule,
            BundleDetailsModule,
            BundleDefinitionsModule,
            DesignerFrameModule,
            DocumentDesignerPageModule,
            CopyDefinitionModule,
            RecordDataEditorModule,
            WorkspaceModule,
            RxViewDesignerPageModule,
            RxShellDesignerPageModule,
            RxAssociationDesignerPageModule,
            RxNamedListDesignerPageModule,
            ProcessDesignerPageModule,
            RecordDesignerPageModule,
            RxWebApiDesignerPageModule,
            RxEventDesignerPageModule,
            ConfigDesignerPageModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ComBmcArsysRxInnovationstudioModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ComBmcArsysRxInnovationstudioRoutingModule,
                        BundleDetailsModule,
                        BundleDefinitionsModule,
                        DesignerFrameModule,
                        DocumentDesignerPageModule,
                        CopyDefinitionModule,
                        RecordDataEditorModule,
                        WorkspaceModule,
                        RxViewDesignerPageModule,
                        RxShellDesignerPageModule,
                        RxAssociationDesignerPageModule,
                        RxNamedListDesignerPageModule,
                        ProcessDesignerPageModule,
                        RecordDesignerPageModule,
                        RxWebApiDesignerPageModule,
                        RxEventDesignerPageModule,
                        ConfigDesignerPageModule
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ComBmcArsysRxInnovationstudioModule };
//# sourceMappingURL=helix-com-bmc-arsys-rx-innovationstudio.js.map
