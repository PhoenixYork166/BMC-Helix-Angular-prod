import { Component, Injector, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { chain } from 'lodash';
import { DismissReasons, DockedPanelContext } from '@bmc-ux/adapt-angular';
import { RX_RECORD_DEFINITION, RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { RxCommandFactoryService } from '@helix/platform/shared/api';
import { RxModalClass } from '@helix/platform/ui-kit';
import { RX_COGNITIVE_TRAINING } from '../../cognitive-training.constant';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/record/api";
import * as i4 from "@helix/platform/ui-kit";
import * as i5 from "@angular/forms";
import * as i6 from "@angular/common";
import * as i7 from "@ngx-translate/core";
export class InteractiveEvaluationBladeComponent extends RxModalClass {
    constructor(dockedPanelContext, rxCommandFactoryService, rxRecordInstanceDataPageService, injector) {
        super(dockedPanelContext, injector);
        this.dockedPanelContext = dockedPanelContext;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.injector = injector;
        this.classifications = [];
        this.evaluationText = '';
        this.trainedDataSetOptions = [];
        this.optionFormatter = (opt) => opt.name;
        this.contextData = this.dockedPanelContext.getData();
    }
    ngOnInit() {
        super.ngOnInit();
        this.getDataSetList();
    }
    isDirty() {
        return this.interactiveEvaluationForm.dirty;
    }
    getDataSetList() {
        const params = {
            recorddefinition: RX_COGNITIVE_TRAINING.settings.dataSetDefinitionName,
            sortBy: RX_COGNITIVE_TRAINING.settings.fieldIds.dataSetName,
            queryExpression: this.contextData.evaluation.queryExpression +
                JSON.stringify(this.contextData.bundleId) +
                this.contextData.evaluation.serviceProviderQueryExpresion +
                this.contextData.trainingType.uniqueValue,
            propertySelection: [
                RX_COGNITIVE_TRAINING.settings.fieldIds.dataSetName,
                RX_RECORD_DEFINITION.coreFieldIds.status
            ].join(',')
        };
        this.busy = this.rxRecordInstanceDataPageService.post({ params }).subscribe((result) => {
            this.trainedDataSetOptions = chain(result.data)
                .filter((dataSet) => dataSet[RX_RECORD_DEFINITION.coreFieldIds.status] ===
                RX_COGNITIVE_TRAINING.settings.trainingStatuses.trained.value ||
                dataSet[RX_RECORD_DEFINITION.coreFieldIds.status] ===
                    RX_COGNITIVE_TRAINING.settings.trainingStatuses.pendingRetraining.value)
                .map((dataSet) => ({
                id: this.trainedDataSetOptions.length + 1,
                name: dataSet[RX_COGNITIVE_TRAINING.settings.fieldIds.dataSetName]
            }))
                .value();
        });
    }
    classify() {
        this.rxCommandFactoryService
            .forResourceType(RX_COGNITIVE_TRAINING.settings.commands.classify)
            .execute({
            textToClassify: this.evaluationText,
            trainingDataSetName: this.contextData.bundleId + ':' + this.trainedDataSet[0].name
        })
            .subscribe((classifications) => {
            this.classifications = classifications;
        });
    }
    displayClassification(classification) {
        return `${classification.className} ${classification.confidence.toFixed(2)}`;
    }
    onCloseClick() {
        this.dockedPanelContext.dismiss(DismissReasons.CLOSE_BTN);
    }
}
InteractiveEvaluationBladeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InteractiveEvaluationBladeComponent, deps: [{ token: i1.DockedPanelContext }, { token: i2.RxCommandFactoryService }, { token: i3.RxRecordInstanceDataPageService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
InteractiveEvaluationBladeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: InteractiveEvaluationBladeComponent, selector: "rx-interactive-evaluation-blade", viewQueries: [{ propertyName: "interactiveEvaluationForm", first: true, predicate: ["interactiveEvaluationForm"], descendants: true, read: NgForm, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"dp-body\">\n  <form #interactiveEvaluationForm=\"ngForm\">\n    <rx-busy-indicator [options]=\"{ busy: busy, loaderType: 'section' }\"></rx-busy-indicator>\n\n    <div class=\"d-flex flex-row justify-content-between\">\n      <adapt-rx-select\n        class=\"form-group d-block w-100\"\n        name=\"trained-data-set\"\n        label=\"{{\n          'com.bmc.arsys.rx.client.admin.cognitive-training.interactive-evaluation-blade.trained-data-set.label'\n            | translate\n        }}\"\n        rx-id=\"trained-data-set-field\"\n        required\n        [options]=\"trainedDataSetOptions\"\n        [optionFormatter]=\"optionFormatter\"\n        [(ngModel)]=\"trainedDataSet\"\n      >\n      </adapt-rx-select>\n\n      <button\n        class=\"d-icon-refresh_adapt\"\n        type=\"button\"\n        rx-id=\"refresh-button\"\n        adapt-button\n        btn-type=\"tertiary\"\n        (click)=\"getDataSetList()\"\n      >\n        {{ 'com.bmc.arsys.rx.client.common.refresh.label' | translate }}\n      </button>\n    </div>\n\n    <adapt-rx-textfield\n      class=\"form-group d-block\"\n      name=\"evaluation-text\"\n      label=\"{{\n        'com.bmc.arsys.rx.client.admin.cognitive-training.interactive-evaluation-blade.text.label' | translate\n      }}\"\n      rx-id=\"evaluation-text-field\"\n      required\n      [tooltip]=\"{\n        iconName: 'question_circle_o',\n        content: 'Separate text entries for multiple fields with a comma.',\n        placement: 'right',\n        popoverMode: true\n      }\"\n      [(ngModel)]=\"evaluationText\"\n    >\n    </adapt-rx-textfield>\n\n    <button\n      type=\"button\"\n      rx-id=\"classify-button\"\n      adapt-button\n      btn-type=\"primary\"\n      [disabled]=\"interactiveEvaluationForm.invalid\"\n      (click)=\"classify()\"\n    >\n      {{ 'com.bmc.arsys.rx.client.admin.cognitive-training.interactive-evaluation.classify.label' | translate }}\n    </button>\n\n    <div *ngIf=\"classifications\">\n      <hr />\n\n      <div class=\"card card-well mb-2\" *ngFor=\"let classification of classifications; let index = index\">\n        {{ displayClassification(classification) }}\n      </div>\n    </div>\n  </form>\n</div>\n\n<div class=\"dp-footer\">\n  <button class=\"mr-2\" type=\"button\" rx-id=\"close-button\" adapt-button btn-type=\"secondary\" (click)=\"onCloseClick()\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i4.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }, { type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i5.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i5.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i7.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InteractiveEvaluationBladeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-interactive-evaluation-blade',
                    templateUrl: './interactive-evaluation-blade.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.DockedPanelContext }, { type: i2.RxCommandFactoryService }, { type: i3.RxRecordInstanceDataPageService }, { type: i0.Injector }]; }, propDecorators: { interactiveEvaluationForm: [{
                type: ViewChild,
                args: ['interactiveEvaluationForm', { static: true, read: NgForm }]
            }] } });
//# sourceMappingURL=interactive-evaluation-blade.component.js.map