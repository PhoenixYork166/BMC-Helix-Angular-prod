import { EventEmitter } from '@angular/core';
import { RxRecordGridUtilsService } from '../../services/record-grid-utils.service';
import { IRecordGridFilterTag } from '../../types/record-grid-filter.types';
import { IRemoveFilterTagEvent } from './filter-tags.types';
import { Placement } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export declare class FilterTagsComponent {
    private rxRecordGridUtilsService;
    tags: IRecordGridFilterTag[];
    isDisabled: boolean;
    tagsLimit: number;
    restTagsDropdownPlacement: Placement[];
    removeTag: EventEmitter<IRemoveFilterTagEvent>;
    constructor(rxRecordGridUtilsService: RxRecordGridUtilsService);
    getTranslateParams(): {
        count: number;
    };
    getRestTagsCount(): number;
    onRemoveFilterTag(tag: IRecordGridFilterTag): void;
    trackByForFilterTags(index: number, tag: IRecordGridFilterTag): number | string;
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterTagsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FilterTagsComponent, "rx-filter-tags", never, { "tags": "tags"; "isDisabled": "isDisabled"; "tagsLimit": "tagsLimit"; "restTagsDropdownPlacement": "restTagsDropdownPlacement"; }, { "removeTag": "removeTag"; }, never, never>;
}
