import { OnInit } from '@angular/core';
import { RxLogService, RxNotificationService } from '@helix/platform/shared/api';
import { BaseViewComponent, IViewComponentSetProperty, RuntimeViewModelApi } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { RxActionButtonService } from '../action-button.service';
import { IActionButtonConfig, IActionButtonState } from './action-button.types';
import * as i0 from "@angular/core";
export declare class ActionButtonComponent extends BaseViewComponent implements OnInit, IViewComponentSetProperty {
    private rxLogService;
    private translateService;
    private rxNotificationService;
    private rxActionButtonService;
    api: {
        click: any;
        setProperty: any;
    };
    state: IActionButtonState;
    isActionInProgress: boolean;
    isDisabled: boolean;
    buttonType: string;
    guid: string;
    config: Observable<IActionButtonConfig>;
    runtimeViewModelApi: RuntimeViewModelApi;
    get hostClass(): string;
    constructor(rxLogService: RxLogService, translateService: TranslateService, rxNotificationService: RxNotificationService, rxActionButtonService: RxActionButtonService);
    ngOnInit(): void;
    click(): Promise<void>;
    isDisabledFunc(): boolean;
    isHiddenFunc(): boolean;
    setProperty(propertyPath: string, value: any): void | Observable<never>;
    private validateRecordDefinitionName;
    static ɵfac: i0.ɵɵFactoryDeclaration<ActionButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ActionButtonComponent, "rx-action-button", never, { "guid": "guid"; "config": "config"; "runtimeViewModelApi": "runtimeViewModelApi"; }, {}, never, never>;
}
