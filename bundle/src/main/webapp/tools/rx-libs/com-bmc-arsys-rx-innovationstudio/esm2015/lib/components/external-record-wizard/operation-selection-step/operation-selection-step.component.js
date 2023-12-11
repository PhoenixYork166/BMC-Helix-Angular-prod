import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { includes, isEqual } from 'lodash';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, takeUntil } from 'rxjs/operators';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/shared/components";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@angular/forms";
import * as i6 from "@angular/common";
export class OperationSelectionStepComponent {
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
/** @nocollapse */ OperationSelectionStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OperationSelectionStepComponent, deps: [{ token: i1.RxDefinitionNameService }, { token: i2.RxWizardModalComponent }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ OperationSelectionStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: OperationSelectionStepComponent, selector: "ax-operation-selection-step", inputs: { context: "context" }, ngImport: i0, template: "<div class=\"row\">\n  <div class=\"col-2\">\n    <adapt-rx-control-label [label]=\"operationTypeLabel\"></adapt-rx-control-label>\n  </div>\n  <div class=\"col-10\">\n    <adapt-rx-control-label [label]=\"webApiRequestLabel\" [showRequiredLabel]=\"true\"></adapt-rx-control-label>\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-2\">\n    <adapt-rx-radiobutton-group [formControl]=\"operationTypeFormControl\">\n      <adapt-rx-radiobutton *ngFor=\"let item of availableOperationTypes\" [value]=\"item\" [label]=\"item\">\n      </adapt-rx-radiobutton>\n    </adapt-rx-radiobutton-group>\n  </div>\n  <div class=\"col-10\">\n    <adapt-rx-select\n      [options]=\"availableRequests\"\n      [required]=\"true\"\n      [formControl]=\"webApiRequestNameFormControl\"\n      [optionFormatter]=\"optionFormatter\"\n    ></adapt-rx-select>\n  </div>\n</div>\n", components: [{ type: i4.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i4.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i4.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }, { type: i4.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OperationSelectionStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-operation-selection-step',
                    templateUrl: 'operation-selection-step.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDefinitionNameService }, { type: i2.RxWizardModalComponent }, { type: i3.TranslateService }]; }, propDecorators: { context: [{
                type: Input
            }] } });
//# sourceMappingURL=operation-selection-step.component.js.map