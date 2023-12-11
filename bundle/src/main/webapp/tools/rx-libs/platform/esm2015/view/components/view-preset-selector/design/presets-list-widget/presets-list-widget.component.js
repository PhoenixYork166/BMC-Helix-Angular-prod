import { Component, Injector, ViewChild } from '@angular/core';
import { AdaptRxListBuilderComponent } from '@bmc-ux/adapt-angular';
import { InspectorWidgetBase } from '@helix/platform/shared/components';
import { RxViewComponentType } from '@helix/platform/view/api';
import { first, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { chain, cloneDeep, trim } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/forms";
export class PresetsListWidgetComponent extends InspectorWidgetBase {
    constructor(injector, translateService) {
        super(injector);
        this.injector = injector;
        this.translateService = translateService;
        this.editedPreset = null;
        this.presets = [];
        this.strings = {
            cannotBeBlank: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                propertyName: 'View preset name'
            }),
            duplicateValue: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.duplicate-value.message')
        };
        this.itemValidationFn = this.itemValidation.bind(this);
    }
    ngOnInit() {
        this.designerItemModel.sandbox
            .getChildComponents()
            .pipe(first(), takeUntil(this.designerItemModel.sandbox.destroyed$))
            .subscribe((res) => {
            res.sort((a, b) => a.data.index - b.data.index);
            this.presets = res.map((component) => ({
                name: component.data.label,
                id: component.guid
            }));
        });
    }
    onPresetsListChange(items) {
        items.forEach((item) => {
            item.name = trim(item.name);
        });
        this.presets = cloneDeep(items);
        const payload = items.map(({ name, id }, index) => ({
            type: RxViewComponentType.ViewPreset,
            guid: String(id),
            data: {
                label: name,
                index
            }
        }));
        this.designerItemModel.sandbox.setChildren(payload);
    }
    onListItemAdd() {
        this.presets.push(this.presets.shift());
    }
    onListItemEdit(preset) {
        this.editedPreset = preset;
    }
    onListItemUpdate() {
        this.editedPreset = null;
    }
    focus() {
        this.adaptRxListBuilderComponent.inputEl.nativeElement.focus();
    }
    itemValidation(value, items, isEdit) {
        let errorMessage = null;
        const otherItemNames = chain(items)
            .reject((item) => isEdit && item.id === this.editedPreset.id)
            .map('name')
            .value();
        const trimmedValue = trim(value);
        if (trimmedValue.length === 0) {
            errorMessage = this.strings.cannotBeBlank;
        }
        else if (otherItemNames.includes(trimmedValue)) {
            errorMessage = this.strings.duplicateValue;
        }
        return errorMessage;
    }
}
PresetsListWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PresetsListWidgetComponent, deps: [{ token: i0.Injector }, { token: i1.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
PresetsListWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: PresetsListWidgetComponent, selector: "rx-presets-list-widget", viewQueries: [{ propertyName: "adaptRxListBuilderComponent", first: true, predicate: AdaptRxListBuilderComponent, descendants: true }], usesInheritance: true, ngImport: i0, template: "<adapt-rx-list-builder\n  [label]=\"'View preset names'\"\n  [(ngModel)]=\"presets\"\n  (ngModelChange)=\"onPresetsListChange($event)\"\n  [hideListAreaLabel]=\"true\"\n  [texts]=\"options.texts\"\n  [readonly]=\"isDisabled\"\n  (listItemAdd)=\"onListItemAdd()\"\n  (listItemEdit)=\"onListItemEdit($event)\"\n  (listItemUpdate)=\"onListItemUpdate()\"\n  [itemValidation]=\"itemValidationFn\"\n>\n</adapt-rx-list-builder>\n", styles: [""], components: [{ type: i2.AdaptRxListBuilderComponent, selector: "adapt-rx-list-builder", inputs: ["hideSearchField", "hideEdit", "hideDelete", "hideListAreaLabel", "customSort", "texts", "menuHeight", "listItemMaxLength", "generateListItemId", "itemValidation", "disabled", "treeStructure", "listItemFormatter", "listItemSetterProp", "listItemContentTemplate", "selectionMode"], outputs: ["listItemAdd", "listItemEdit", "listItemUpdate", "listItemRemove"] }], directives: [{ type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PresetsListWidgetComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-presets-list-widget',
                    templateUrl: './presets-list-widget.component.html',
                    styleUrls: ['./presets-list-widget.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.TranslateService }]; }, propDecorators: { adaptRxListBuilderComponent: [{
                type: ViewChild,
                args: [AdaptRxListBuilderComponent]
            }] } });
//# sourceMappingURL=presets-list-widget.component.js.map