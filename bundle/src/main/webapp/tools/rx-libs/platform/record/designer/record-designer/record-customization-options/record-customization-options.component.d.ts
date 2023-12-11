import { OnChanges, SimpleChanges } from '@angular/core';
import { IScopeSelectionOption, RxBundleCacheService, RxOverlayService } from '@helix/platform/shared/api';
import { ValueAccessor } from '@helix/platform/shared/components';
import { RxModalService } from '@helix/platform/ui-kit';
import { IRecordCustomizationControlValue, IRecordCustomizationOptions } from './record-customization-options.interfaces';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RecordCustomizationOptionsComponent extends ValueAccessor<IRecordCustomizationControlValue> implements OnChanges {
    private rxModalService;
    private rxBundleCacheService;
    private rxOverlayService;
    private translateService;
    options: IRecordCustomizationOptions;
    allowOverlayLabel: string;
    definitionScopeName: string;
    overlayOperation: string;
    private scopeSelectionOptions;
    private scopeNameSubject;
    private scopeSelectionOptions$;
    private definitionScopeName$;
    vm$: import("rxjs").Observable<{
        definitionScopeName: string;
        scopeSelectionOptions: IScopeSelectionOption[];
    }>;
    constructor(rxModalService: RxModalService, rxBundleCacheService: RxBundleCacheService, rxOverlayService: RxOverlayService, translateService: TranslateService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private getOverlayOperation;
    private updateValues;
    openCustomizationOptionsEditor(): void;
    setAllowOverlayLabel(allowOverlay: boolean): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordCustomizationOptionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RecordCustomizationOptionsComponent, "rx-scope-record-customization-control", never, { "options": "options"; }, {}, never, never>;
}
