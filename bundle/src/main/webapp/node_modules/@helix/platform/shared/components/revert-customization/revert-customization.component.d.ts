import { EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { IFormBuilderEvent, IFormWidgetComponent, RxOverlayService } from '@helix/platform/shared/api';
import { RxModalService } from '@helix/platform/ui-kit';
import { IRevertCustomizationOptions } from './revert-customization.interfaces';
import * as i0 from "@angular/core";
export declare class RxRevertCustomizationComponent implements OnInit, OnDestroy, OnChanges, IFormWidgetComponent {
    private rxModalService;
    private rxOverlayService;
    options: IRevertCustomizationOptions;
    isDisabled: boolean;
    events: EventEmitter<IFormBuilderEvent>;
    showOverlayOptions: boolean;
    isRevertActionHidden: boolean;
    isOverlayOperationHidden: boolean;
    overlayOperation: string;
    private destroyed$;
    constructor(rxModalService: RxModalService, rxOverlayService: RxOverlayService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private updateData;
    private revertCustomization;
    private getOverlayOperation;
    private shouldHideRevertAction;
    onRevertCustomization(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRevertCustomizationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxRevertCustomizationComponent, "rx-revert-customization", never, { "options": "options"; "isDisabled": "isDisabled"; }, { "events": "events"; }, never, never>;
}
