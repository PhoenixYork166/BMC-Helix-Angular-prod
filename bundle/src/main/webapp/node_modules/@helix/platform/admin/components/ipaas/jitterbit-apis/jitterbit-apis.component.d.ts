import { IIpaasApiInfo, IIpaasApisConfig } from '../ipaas-base-apis/ipaas-base-apis.types';
import { RxModalService } from '@helix/platform/ui-kit';
import { IpaasBaseApisComponent } from '../ipaas-base-apis/ipaas-base-apis.component';
import { RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { RxJitterbitApisService } from './jitterbit-apis.service';
import * as i0 from "@angular/core";
export declare class JitterbitApisAdminComponent {
    private rxModalService;
    private rxNotificationService;
    private translateService;
    private rxJitterbitApisService;
    ipaasBaseApisComponent: IpaasBaseApisComponent;
    jitterbitApisConfig: IIpaasApisConfig;
    constructor(rxModalService: RxModalService, rxNotificationService: RxNotificationService, translateService: TranslateService, rxJitterbitApisService: RxJitterbitApisService);
    openJitterbitCreateApiEditor(apiInfo: IIpaasApiInfo): Promise<any>;
    openJitterbitEditApiEditor(apiInfo: IIpaasApiInfo): Promise<any>;
    deleteJitterbitApis(apiIds: string[]): void;
    private deleteApiDefinitions;
    static ɵfac: i0.ɵɵFactoryDeclaration<JitterbitApisAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<JitterbitApisAdminComponent, "rx-admin-jitterbit-apis", never, {}, {}, never, never>;
}
