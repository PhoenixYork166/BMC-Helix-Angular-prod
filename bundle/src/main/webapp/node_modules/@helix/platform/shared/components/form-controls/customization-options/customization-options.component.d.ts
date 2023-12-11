import { OnChanges, SimpleChanges } from '@angular/core';
import { ICustomizationControlValue, ICustomizationOptions, RxBundleCacheService, RxOverlayService } from '@helix/platform/shared/api';
import { RxModalService } from '@helix/platform/ui-kit';
import { ValueAccessor } from '../../form-builder/value-accessor';
import * as i0 from "@angular/core";
export declare class CustomizationOptionsComponent extends ValueAccessor<ICustomizationControlValue> implements OnChanges {
    private rxModalService;
    private rxBundleCacheService;
    private rxOverlayService;
    options: ICustomizationOptions;
    allowOverlayLabel: string;
    definitionScopeName: string;
    overlayOperation: string;
    private scopeSelectionOptions;
    constructor(rxModalService: RxModalService, rxBundleCacheService: RxBundleCacheService, rxOverlayService: RxOverlayService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private getOverlayOperation;
    private updateValues;
    openCustomizationOptionsEditor(): void;
    setAllowOverlayLabel(allowOverlay: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomizationOptionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomizationOptionsComponent, "rx-scope-customization-control", never, { "options": "options"; }, {}, never, never>;
}
