import { Renderer2 } from '@angular/core';
import { IFormControlComponent, IFormFocusable } from '@helix/platform/shared/api';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { ITagsFormControlOptions, ITagsFormControlModel, ITagAutocompleteValue } from './tags-form-control.types';
import { AdaptMetatagComponent, InitTagEditingEvent } from '@bmc-ux/adapt-angular';
import { Observable } from 'rxjs';
import { RxStringService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export declare class TagsFormControlComponent extends ValueAccessor<string> implements IFormControlComponent, IFormFocusable {
    private rxStringService;
    private renderer;
    options: ITagsFormControlOptions;
    adaptTagField: AdaptMetatagComponent;
    tags: ITagsFormControlModel[];
    autocompleteSearchBound: (text$: Observable<string>) => Observable<ITagAutocompleteValue[]>;
    constructor(rxStringService: RxStringService, renderer: Renderer2);
    focus(): void;
    onTagsModelChange(tags: ITagsFormControlModel[]): void;
    onWriteValue(value: string): void;
    getStringFromTags(tags: ITagsFormControlModel[]): string;
    isAutocompleteTag(tag: ITagsFormControlModel): tag is ITagAutocompleteValue;
    getTagsFromString(tagsString: string): ITagsFormControlModel[];
    autocompleteSearch(text$: Observable<string>): Observable<ITagAutocompleteValue[]>;
    onInitTagEditing(event: InitTagEditingEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TagsFormControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TagsFormControlComponent, "rx-tags-form-control", never, { "options": "options"; }, {}, never, never>;
}
