import { RxModalService } from './modal.service';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RxUtilityModalsService {
    private rxModalService;
    private translateService;
    private confirmationResult;
    constructor(rxModalService: RxModalService, translateService: TranslateService);
    confirmExternalChange(message: string): Promise<boolean>;
    confirm(message: string, title?: string, style?: import("@bmc-ux/adapt-angular").ColorVariantType): Promise<boolean>;
    confirmUnsavedChanges(): Promise<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxUtilityModalsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxUtilityModalsService>;
}
