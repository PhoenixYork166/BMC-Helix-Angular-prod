import { OnInit, Renderer2 } from '@angular/core';
import { OperatorFunction } from 'rxjs';
import { AdaptModalService, AdaptRxTypeaheadComponent, RxTypeaheadSelectItemEvent } from '@bmc-ux/adapt-angular';
import { IFormControlComponent } from '@helix/platform/shared/api';
import { IIconGlyph, IIconPickerFormControlOptions } from './icon-picker.types';
import { ValueAccessor } from '../../form-builder/value-accessor';
import * as i0 from "@angular/core";
export declare class IconPickerFormControlComponent extends ValueAccessor<string> implements OnInit, IFormControlComponent {
    private adaptModalService;
    private renderer;
    options: IIconPickerFormControlOptions;
    selectedIcon: IIconGlyph;
    private focus$;
    private iconGlyphs;
    typeahead: AdaptRxTypeaheadComponent;
    constructor(adaptModalService: AdaptModalService, renderer: Renderer2);
    ngOnInit(): void;
    search: OperatorFunction<string, IIconGlyph[]>;
    inputFormatter(option: IIconGlyph): string;
    onSelectItem(event: RxTypeaheadSelectItemEvent): void;
    onWriteValue(value: string): void;
    onFocus(event: FocusEvent): void;
    onBlur(): void;
    openIconBrowserDialog(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IconPickerFormControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IconPickerFormControlComponent, "rx-icon-picker-form-control", never, { "options": "options"; }, {}, never, never>;
}
