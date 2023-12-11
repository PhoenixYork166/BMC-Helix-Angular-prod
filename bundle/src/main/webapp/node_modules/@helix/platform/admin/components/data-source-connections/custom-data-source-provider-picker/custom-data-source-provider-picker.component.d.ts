import { ElementRef, Renderer2 } from '@angular/core';
import { AdaptDropdownDirective } from '@bmc-ux/adapt-angular';
import { ValueAccessor } from '@helix/platform/shared/components';
import { TranslateService } from '@ngx-translate/core';
import { ICustomDataSourceProviderPickerComponentOptions } from './custom-data-source-provider-picker-component.types';
import * as i0 from "@angular/core";
export declare class RxCustomDataSourceProviderPickerComponent extends ValueAccessor<string> {
    private translateService;
    private renderer;
    options: ICustomDataSourceProviderPickerComponentOptions;
    dropdownButton: ElementRef;
    dropdown: AdaptDropdownDirective;
    defaultText: any;
    dropdownWidth: number;
    constructor(translateService: TranslateService, renderer: Renderer2);
    setDropdownWidth(): void;
    selectProvider(providerName: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxCustomDataSourceProviderPickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxCustomDataSourceProviderPickerComponent, "rx-custom-data-source-provider-picker", never, { "options": "options"; }, {}, never, never>;
}
