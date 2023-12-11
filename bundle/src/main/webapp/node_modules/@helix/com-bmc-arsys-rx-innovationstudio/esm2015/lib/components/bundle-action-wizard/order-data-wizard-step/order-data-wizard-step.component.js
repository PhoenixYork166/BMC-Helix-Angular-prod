import { Component, Input } from '@angular/core';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { RxArrayUtilsService } from '@helix/platform/utils';
import { cloneDeep, filter, find, forEach, head, isUndefined, last, reduce, sortBy, transform } from 'lodash';
import { skip, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/components";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "@ngx-translate/core";
import * as i7 from "@helix/platform/shared/api";
export class OrderDataWizardStepComponent {
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
                newDeploymentPackageDescriptor.dataImportOptionsByRecordDefinitionName = reduce(filter(context.cache.recordDefinitions, 'shouldExportData'), (result, recordDefinition, recordDefinitionIndex) => {
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
/** @nocollapse */ OrderDataWizardStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OrderDataWizardStepComponent, deps: [{ token: i1.RxWizardModalComponent }, { token: i2.RxArrayUtilsService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ OrderDataWizardStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: OrderDataWizardStepComponent, selector: "ax-order-data-wizard-step", inputs: { options: "options" }, ngImport: i0, template: "<h5 class=\"mt-0\">Data</h5>\n\n<div>Move data items up or down to set the order in which the data will be loaded onto target systems:</div>\n\n<div class=\"d-flex row\">\n  <button\n    adapt-button\n    btn-type=\"tertiary\"\n    class=\"d-icon-triangle_up_adapt\"\n    rx-id=\"move-up-button\"\n    [disabled]=\"isMoveUpButtonDisabled()\"\n    (click)=\"moveUp()\"\n  >\n    {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.order-data.move-up.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    btn-type=\"tertiary\"\n    class=\"d-icon-triangle_down_adapt\"\n    rx-id=\"move-down-button\"\n    [disabled]=\"isMoveDownButtonDisabled()\"\n    (click)=\"moveDown()\"\n  >\n    {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.order-data.move-down.label' | translate }}\n  </button>\n</div>\n\n<div class=\"d-flex flex-column border h-100 p-2 record-definitions-list\">\n  <div class=\"d-flex justify-content-center\">\n    <adapt-empty-state\n      class=\"align-self-center\"\n      type=\"objects\"\n      *ngIf=\"!recordDefinitions.length\"\n      [label]=\"'com.bmc.arsys.rx.client.empty-state.no-items-to-display.label' | translate\"\n    ></adapt-empty-state>\n  </div>\n\n  <div class=\"checkbox p-2 text-break\" *ngFor=\"let recordDefinition of recordDefinitions; trackBy: trackBy\">\n    <label>\n      <input\n        type=\"checkbox\"\n        [(ngModel)]=\"recordDefinition.selected\"\n        [disabled]=\"recordDefinition.disallowChangeOrder\"\n      />\n      <span class=\"checkbox__item\">{{ recordDefinition.name | rxDefinitionNamePipe }}</span>\n    </label>\n  </div>\n</div>\n", styles: [":host{display:flex;flex-direction:column;height:100%}.record-definitions-list{overflow-y:auto}\n"], components: [{ type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i3.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i6.TranslatePipe, "rxDefinitionNamePipe": i7.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OrderDataWizardStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-order-data-wizard-step',
                    templateUrl: 'order-data-wizard-step.component.html',
                    styleUrls: ['./order-data-wizard-step.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxWizardModalComponent }, { type: i2.RxArrayUtilsService }]; }, propDecorators: { options: [{
                type: Input
            }] } });
//# sourceMappingURL=order-data-wizard-step.component.js.map