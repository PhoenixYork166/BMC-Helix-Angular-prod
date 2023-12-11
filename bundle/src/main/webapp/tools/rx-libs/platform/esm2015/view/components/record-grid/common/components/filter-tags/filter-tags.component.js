import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RxRecordGridUtilsService } from '../../services/record-grid-utils.service';
import { clone, findIndex, get, isNull } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "../../services/record-grid-utils.service";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
import * as i4 from "@ngx-translate/core";
export class FilterTagsComponent {
    constructor(rxRecordGridUtilsService) {
        this.rxRecordGridUtilsService = rxRecordGridUtilsService;
        this.restTagsDropdownPlacement = ['bottom', 'bottom-right', 'auto'];
        this.removeTag = new EventEmitter();
        this.trackByForFilterTags = this.trackByForFilterTags.bind(this);
    }
    getTranslateParams() {
        return { count: this.getRestTagsCount() };
    }
    getRestTagsCount() {
        return this.tagsLimit && this.tags ? this.tags.length - this.tagsLimit : 0;
    }
    onRemoveFilterTag(tag) {
        const filterOption = tag.data.filterOption;
        const tags = clone(this.tags);
        let index;
        if (isNull(filterOption)) {
            index = findIndex(tags, (toolbarTag) => this.rxRecordGridUtilsService.isSharedFilterPresetTag(toolbarTag));
        }
        else {
            const filterOptionId = tag.data.filterOption.id;
            index = findIndex(tags, (toolbarTag) => get(toolbarTag.data.filterOption, 'id') === filterOptionId);
        }
        if (index > -1) {
            tags.splice(index, 1);
        }
        this.removeTag.emit({ removedTag: tag, newTags: tags });
    }
    trackByForFilterTags(index, tag) {
        return this.rxRecordGridUtilsService.isSharedFilterPresetTag(tag) ? index : tag.data.filterOption.id || index;
    }
}
FilterTagsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FilterTagsComponent, deps: [{ token: i1.RxRecordGridUtilsService }], target: i0.ɵɵFactoryTarget.Component });
FilterTagsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FilterTagsComponent, selector: "rx-filter-tags", inputs: { tags: "tags", isDisabled: "isDisabled", tagsLimit: "tagsLimit", restTagsDropdownPlacement: "restTagsDropdownPlacement" }, outputs: { removeTag: "removeTag" }, ngImport: i0, template: "<div>\n  <adapt-tag\n    class=\"mr-1\"\n    [removable]=\"!isDisabled\"\n    [disabled]=\"isDisabled\"\n    *ngFor=\"\n      let tag of tags | slice: 0:(tagsLimit ? tagsLimit : tags?.length);\n      let index = index;\n      trackBy: trackByForFilterTags\n    \"\n    type=\"active\"\n    (remove)=\"onRemoveFilterTag(tag)\"\n  >\n    <span class=\"filter-tags__tag-text\" [title]=\"tag.data.value?.title ?? tag.text\">{{ tag.text }}</span>\n  </adapt-tag>\n\n  <span adaptDropdown *ngIf=\"getRestTagsCount() > 0\" [appendToBody]=\"true\" [placement]=\"restTagsDropdownPlacement\">\n    <button adaptDropdownToggle type=\"button\" class=\"filter-tags__dropdown-toggle btn btn-link p-0 ml-1\">\n      {{\n        'com.bmc.arsys.rx.client.view-components.record-grid.filters.show-more-filters.label'\n          | translate: getTranslateParams()\n      }}\n    </button>\n\n    <div adaptDropdownMenu class=\"dropdown-menu filter-tags__dropdown-menu p-2\">\n      <div *ngFor=\"let tag of tags | slice: -getRestTagsCount(); let index = index; trackBy: trackByForFilterTags\">\n        <adapt-tag type=\"active\" [removable]=\"!isDisabled\" (remove)=\"onRemoveFilterTag(tag)\">\n          <span class=\"filter-tags__tag-text\" [title]=\"tag.data.value?.title ?? tag.text\">{{ tag.text }}</span>\n        </adapt-tag>\n      </div>\n    </div>\n  </span>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.filter-tags__dropdown-toggle:after{border:0!important}.filter-tags__tag-text{display:table-cell;max-width:190px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.filter-tags__dropdown-menu .filter-tags__tag-text{max-width:350px}\n"], components: [{ type: i2.AdaptTagComponent, selector: "adapt-tag", inputs: ["type", "removable", "disabled"], outputs: ["remove"] }, { type: i2.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }], directives: [{ type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i2.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }], pipes: { "slice": i3.SlicePipe, "translate": i4.TranslatePipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FilterTagsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-filter-tags',
                    templateUrl: './filter-tags.component.html',
                    styleUrls: ['./filter-tags.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.RxRecordGridUtilsService }]; }, propDecorators: { tags: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], tagsLimit: [{
                type: Input
            }], restTagsDropdownPlacement: [{
                type: Input
            }], removeTag: [{
                type: Output
            }] } });
//# sourceMappingURL=filter-tags.component.js.map