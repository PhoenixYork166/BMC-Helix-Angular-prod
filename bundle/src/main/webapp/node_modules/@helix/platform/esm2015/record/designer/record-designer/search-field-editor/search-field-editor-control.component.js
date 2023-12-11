import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '@helix/platform/shared/components';
import { TranslateService } from '@ngx-translate/core';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { BehaviorSubject } from 'rxjs';
import { shareReplay, take } from 'rxjs/operators';
import { SearchFieldEditorModalComponent } from './search-field-editor-modal.component';
import { RX_OVERLAY } from '@helix/platform/shared/api';
import { noop } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/common";
export class SearchFieldEditorControlComponent extends ValueAccessor {
    constructor(rxModalService, translateService) {
        super();
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.searchFieldsSubject = new BehaviorSubject([]);
        this.searchFields$ = this.searchFieldsSubject.asObservable().pipe(shareReplay(1));
    }
    ngOnInit() {
        if (this.options) {
            this.updateValues();
        }
    }
    ngOnChanges(changes) {
        if (changes.options) {
            this.updateValues();
        }
    }
    ngOnDestroy() {
        this.searchFieldsSubject.complete();
    }
    updateValues() {
        const searchFields = this.options.recordDefinitionModel.fields.filter((fieldDefinition) => {
            var _a, _b;
            return (fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.character ||
                fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.attachment) &&
                Boolean(fieldDefinition.searchDefinition) &&
                (((_a = fieldDefinition.searchDefinition) === null || _a === void 0 ? void 0 : _a.enableFTSSearch) || ((_b = fieldDefinition.searchDefinition) === null || _b === void 0 ? void 0 : _b.enableCognitiveSearch));
        });
        this.searchFieldsSubject.next(searchFields);
    }
    openEditor(searchFieldIndex) {
        this.searchFields$.pipe(take(1)).subscribe((searchFields) => {
            this.rxModalService
                .openModal({
                content: SearchFieldEditorModalComponent,
                title: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.search-fields.search-field-editor.title'),
                data: {
                    searchFields: searchFields,
                    fieldDefinitions: this.options.recordDefinitionModel.fields,
                    recordDefinition: this.options.recordDefinitionModel,
                    searchFieldIndex,
                    isReadOnly: this.options.isReadOnly
                }
            })
                .then((updatedSearchFields) => {
                const searchFieldDefinitions = updatedSearchFields.map((searchField) => {
                    var _a;
                    const field = this.options.recordDefinitionModel.fields.find((fieldDefinition) => { var _a; return ((_a = searchField.get('searchFieldName')) === null || _a === void 0 ? void 0 : _a.value[0].id) === fieldDefinition.id; });
                    if (field) {
                        return Object.assign(Object.assign({}, field), { searchDefinition: Object.assign(Object.assign({}, field.searchDefinition), { enableCognitiveSearch: Boolean(this.options.recordDefinitionModel.enableCognitiveSearch), enableFTSSearch: ((_a = field.searchDefinition) === null || _a === void 0 ? void 0 : _a.enableFTSSearch) ||
                                    !Boolean(this.options.recordDefinitionModel.enableCognitiveSearch), stripTagsForSearch: false, enableLiteralSearch: false, searchCategoryName: searchField.get('category').value }), overlayDescriptor: Object.assign(Object.assign({}, field.overlayDescriptor), { otherPropertiesOverlayType: RX_OVERLAY.overlayTypes.overwrite }) });
                    }
                });
                this.value = searchFieldDefinitions;
                this.searchFieldsSubject.next(searchFieldDefinitions);
            })
                .catch(noop);
        });
    }
    removeSearchField(searchField) {
        this.searchFields$.pipe(take(1)).subscribe((searchFields) => {
            this.rxModalService
                .confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: RX_MODAL.modalStyles.warning,
                message: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.search-fields.delete-confirmation.message', { name: searchField.name })
            })
                .then((isDeleteConfirmed) => {
                if (isDeleteConfirmed) {
                    const searchFieldsList = searchFields.filter((fieldDefinition) => fieldDefinition.name !== searchField.name);
                    this.value = searchFieldsList;
                    this.searchFieldsSubject.next(searchFieldsList);
                }
            });
        });
    }
}
SearchFieldEditorControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFieldEditorControlComponent, deps: [{ token: i1.RxModalService }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
SearchFieldEditorControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SearchFieldEditorControlComponent, selector: "rx-search-field-editor-control-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SearchFieldEditorControlComponent,
            multi: true
        }
    ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<adapt-button\n  type=\"button\"\n  class=\"p-0 pb-1\"\n  btn-type=\"tertiary\"\n  rx-id=\"add-search-field-button\"\n  *ngIf=\"!isDisabled\"\n  (click)=\"openEditor()\"\n>\n  <span class=\"d-icon-left-plus_circle\"> </span>\n  {{ 'com.bmc.arsys.rx.client.record-designer.search-fields.search-field-editor.title' | translate }}\n</adapt-button>\n\n<div *ngIf=\"searchFields$ | async as searchFields\">\n  <div class=\"rx-search-field\" *ngFor=\"let searchField of searchFields\">\n    <div class=\"rx-selected-column__header-container\">\n      <span rx-id=\"card-title\" class=\"rx-search-field__header-title\">{{ searchField.name }}</span>\n\n      <button\n        type=\"button\"\n        (click)=\"removeSearchField(searchField)\"\n        class=\"rx-button-unstyled d-icon-cross btn-link float-right\"\n        *ngIf=\"!options.isReadOnly\"\n        rx-id=\"remove-search-field\"\n      ></button>\n\n      <button\n        type=\"button\"\n        class=\"rx-button-unstyled d-icon-left-pencil btn-link float-right\"\n        rx-id=\"edit-button\"\n        (click)=\"openEditor(searchField.id)\"\n      ></button>\n    </div>\n\n    <div class=\"rx-search-field-type\" rx-id=\"search-field-type\">\n      <span>\n        {{\n          (searchField.searchDefinition.enableFTSSearch\n            ? 'com.bmc.arsys.rx.client.record-designer.search-fields.full-text-search.label'\n            : 'com.bmc.arsys.rx.client.record-designer.search-fields.cognitive-search.label'\n          ) | translate\n        }}\n      </span>\n    </div>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.rx-search-field{margin-bottom:5px;border:1px solid #d6d7d8;border-radius:2px;padding:5px 10px;word-break:break-all;font-weight:var(--font-weight-bold)}.rx-search-field__header-container{display:flex}.rx-search-field__header-title{flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;font-size:14px}.rx-search-field-type{color:#959899;font-size:10px;overflow:hidden;text-overflow:ellipsis}.d-icon-cross,.d-icon-left-pencil{cursor:pointer}.d-icon-cross:not(:hover),.d-icon-left-pencil:not(:hover){color:#313538}\n"], components: [{ type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i2.TranslatePipe, "async": i4.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFieldEditorControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-search-field-editor-control-control',
                    templateUrl: './search-field-editor-control.component.html',
                    styleUrls: ['./search-field-editor-control.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: SearchFieldEditorControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }] } });
//# sourceMappingURL=search-field-editor-control.component.js.map