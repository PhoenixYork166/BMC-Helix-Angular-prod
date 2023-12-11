import { AdaptDockedPanelService, AdaptModalService, ModalDeferred } from '@bmc-ux/adapt-angular';
import { IModalConfig, IPromptResponse } from './modal.config.interfaces';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RxModalService {
    private adaptModalService;
    private translateService;
    private adaptDockedPanelService;
    constructor(adaptModalService: AdaptModalService, translateService: TranslateService, adaptDockedPanelService: AdaptDockedPanelService);
    isAnyDockedPanelDirty(): boolean;
    isAnyModalDirty(): boolean;
    confirm(modalConfig: IModalConfig, allowDismiss?: boolean): Promise<boolean>;
    alert(modalConfig: IModalConfig): ModalDeferred;
    prompt(modalConfig: IModalConfig): Promise<IPromptResponse>;
    private setButtons;
    private open;
    /**
     * @deprecated The method is deprecated, use openModal instead
     */
    openDialog(config: any): ModalDeferred | Promise<any>;
    openModal(config: any): ModalDeferred | Promise<any>;
    openDockedPanel(config: any): ModalDeferred | Promise<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxModalService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxModalService>;
}
