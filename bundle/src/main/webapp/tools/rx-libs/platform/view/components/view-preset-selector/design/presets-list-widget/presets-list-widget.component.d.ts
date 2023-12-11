import { Injector, OnInit } from '@angular/core';
import { AdaptRxListBuilderComponent, RxListBuilderItem } from '@bmc-ux/adapt-angular';
import { InspectorWidgetBase } from '@helix/platform/shared/components';
import { ViewPresetSelectorDesignModel } from '../view-preset-selector-design.model';
import { IFormFocusable, IFormWidgetComponent, IPlainObject } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class PresetsListWidgetComponent extends InspectorWidgetBase<IPlainObject, ViewPresetSelectorDesignModel> implements OnInit, IFormWidgetComponent, IFormFocusable {
    protected injector: Injector;
    private translateService;
    private editedPreset;
    presets: RxListBuilderItem[];
    isDisabled: boolean;
    adaptRxListBuilderComponent: AdaptRxListBuilderComponent;
    private strings;
    itemValidationFn: any;
    constructor(injector: Injector, translateService: TranslateService);
    ngOnInit(): void;
    onPresetsListChange(items: RxListBuilderItem[]): void;
    onListItemAdd(): void;
    onListItemEdit(preset: RxListBuilderItem): void;
    onListItemUpdate(): void;
    focus(): void;
    private itemValidation;
    static ɵfac: i0.ɵɵFactoryDeclaration<PresetsListWidgetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PresetsListWidgetComponent, "rx-presets-list-widget", never, {}, {}, never, never>;
}
