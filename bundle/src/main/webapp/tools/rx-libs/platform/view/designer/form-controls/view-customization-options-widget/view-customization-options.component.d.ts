import { OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ViewDesignerFacade } from '../../+state/view-designer.facade';
import { ICustomizationControlValue, ICustomizationOptions, IFormWidgetComponent, RxOverlayService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxViewCustomizationOptionsComponent implements OnInit, OnDestroy, IFormWidgetComponent {
    private viewDesignerFacade;
    private rxOverlayService;
    private translateService;
    options: any;
    value: ICustomizationControlValue;
    controlOptions: ICustomizationOptions;
    private destroyed$;
    constructor(viewDesignerFacade: ViewDesignerFacade, rxOverlayService: RxOverlayService, translateService: TranslateService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    setCustomization(customizationOptions: ICustomizationControlValue): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxViewCustomizationOptionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxViewCustomizationOptionsComponent, "rx-view-customization-options", never, { "options": "options"; }, {}, never, never>;
}
