import { IIpaasApiInfo, IIpaasApisConfig } from '../ipaas-base-apis/ipaas-base-apis.types';
import { RxModalService } from '@helix/platform/ui-kit';
import { IpaasBaseApisComponent } from '../ipaas-base-apis/ipaas-base-apis.component';
import { RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { RxMulesoftApisService } from './mulesoft-apis.service';
import * as i0 from "@angular/core";
export declare class MulesoftApisAdminComponent {
    private rxModalService;
    private rxNotificationService;
    private translateService;
    private rxMulesoftApisService;
    ipaasBaseApisComponent: IpaasBaseApisComponent;
    mulesoftConfig: IIpaasApisConfig;
    constructor(rxModalService: RxModalService, rxNotificationService: RxNotificationService, translateService: TranslateService, rxMulesoftApisService: RxMulesoftApisService);
    openMulesoftCreateApiEditor(apiInfo: IIpaasApiInfo): Promise<any>;
    openMulesoftEditApiEditor(apiInfo: IIpaasApiInfo): Promise<any>;
    deleteMulesoftApis(apiIds: string[]): void;
    private deleteApiDefinitions;
    static ɵfac: i0.ɵɵFactoryDeclaration<MulesoftApisAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MulesoftApisAdminComponent, "rx-admin-mulesoft-apis", never, {}, {}, never, never>;
}
