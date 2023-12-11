import { Component, ComponentFactoryResolver } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { isEqual } from 'lodash';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { DocumentSelectionStepComponent } from '../document-selection-step/document-selection-step.component';
import { RxExternalDataService } from '../../../services/external-data/external-data.service';
import { FieldSelectionStepComponent } from '../field-selection-step/field-selection-step.component';
import { FieldTreeSelectionStepComponent } from '../field-tree-selection-step/field-tree-selection-step.component';
import { OperationSelectionStepComponent } from '../operation-selection-step/operation-selection-step.component';
import { RecordIdFieldsStepComponent } from '../record-id-fields-step/record-id-fields-step.component';
import { TableSelectionStepComponent } from '../table-selection-step/table-selection-step.component';
import { WebApiSelectionStepComponent } from '../web-api-selection-step/web-api-selection-step.component';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/external-data/external-data.service";
import * as i2 from "@helix/platform/shared/components";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@angular/forms";
export class DataSourceStepComponent {
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
                    componentFactory: this.componentFactoryResolver.resolveComponentFactory(FieldSelectionStepComponent)
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
/** @nocollapse */ DataSourceStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataSourceStepComponent, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxExternalDataService }, { token: i2.RxWizardModalComponent }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ DataSourceStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataSourceStepComponent, selector: "ax-data-source-step", ngImport: i0, template: "<div class=\"d-flex flex-column control-width\">\n  <adapt-rx-select\n    [label]=\"dataSourceTypeLabel\"\n    [options]=\"dataSourceTypes\"\n    [required]=\"true\"\n    [formControl]=\"dataSourceTypeFormControl\"\n    class=\"form-group\"\n  ></adapt-rx-select>\n  <adapt-rx-select\n    [label]=\"dataSourceNameLabel\"\n    [options]=\"dataSourceNames\"\n    [required]=\"true\"\n    [formControl]=\"dataSourceNameFormControl\"\n    class=\"form-group\"\n  ></adapt-rx-select>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.control-width{max-width:400px}\n"], components: [{ type: i4.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataSourceStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-data-source-step',
                    templateUrl: 'data-source-step.component.html',
                    styleUrls: ['./data-source-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxExternalDataService }, { type: i2.RxWizardModalComponent }, { type: i3.TranslateService }]; } });
//# sourceMappingURL=data-source-step.component.js.map