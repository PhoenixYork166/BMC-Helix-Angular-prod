import { AdaptButtonComponent, RxSelectionChangeEvent } from '@bmc-ux/adapt-angular';
import { IFormControlComponent, IFormFocusable } from '@helix/platform/shared/api';
import { RxModalService } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { ValueAccessor } from '../form-builder';
import { ISelectOption } from '../form-controls/select-form-control';
import { ISelectionFieldOptionProperties, ISelectionOption } from './selection-field-options.interface';
import * as i0 from "@angular/core";
export declare class SelectionFieldOptionsComponent extends ValueAccessor<ISelectionFieldOptionProperties> implements IFormControlComponent, IFormFocusable {
    private rxModalService;
    private translateService;
    options: ISelectionFieldOptionProperties;
    adaptButtonComponent: AdaptButtonComponent;
    currentOptions: ISelectionOption[];
    defaultOption: ISelectionOption[];
    constructor(rxModalService: RxModalService, translateService: TranslateService);
    onWriteValue(currentOptionProperties: ISelectionFieldOptionProperties): void;
    openOptionsEditor(): void;
    private fetchValue;
    private validateDefaultValue;
    onSelectionChange(event: RxSelectionChangeEvent): void;
    focus(): void;
    optionFormatter(option: ISelectOption): string;
    removeOption(option: ISelectionOption): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectionFieldOptionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectionFieldOptionsComponent, "rx-selection-field-options", never, { "options": "options"; }, {}, never, never>;
}
