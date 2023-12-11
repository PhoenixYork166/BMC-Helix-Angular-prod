import { IAdminComponentControl, IPlainObject, RxAdminSettingsService, RxNotificationService } from '@helix/platform/shared/api';
import { RxModalService } from '@helix/platform/ui-kit';
import { RxNumberUtilsService } from '@helix/platform/utils';
import { IRecordGridConfig } from '@helix/platform/view/components';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { IGetRecordGridConfigParams, IOpenSettingsDetailsParams } from './admin-common-settings.types';
import * as i0 from "@angular/core";
export declare class RxAdminCommonSettingsService {
    private rxAdminSettingsService;
    private translateService;
    private rxNotificationService;
    private rxModalService;
    private rxNumberUtilsService;
    constructor(rxAdminSettingsService: RxAdminSettingsService, translateService: TranslateService, rxNotificationService: RxNotificationService, rxModalService: RxModalService, rxNumberUtilsService: RxNumberUtilsService);
    openSettingsDetails({ title, componentName, groups, ownerKeyValue, isChildSetting, childOwnerKeyValue, onDialogApiReady }: IOpenSettingsDetailsParams): Promise<any>;
    createPropertyConfig(adminComponentControl: IAdminComponentControl): IPlainObject;
    getRecordGridConfig({ componentName, controls, getCurrentGridFn, createPermission, groups, bladeTitle, ownerKeyValue, groupName, onDialogApiReady }: IGetRecordGridConfigParams): Observable<IRecordGridConfig>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxAdminCommonSettingsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxAdminCommonSettingsService>;
}
