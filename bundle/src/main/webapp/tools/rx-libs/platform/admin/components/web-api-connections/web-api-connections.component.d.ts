import { ComponentFactoryResolver, TemplateRef } from '@angular/core';
import { DataCellTemplateParams } from '@bmc-ux/adapt-table/public-api';
import { IRecordDefinition, RxRecordInstanceService } from '@helix/platform/record/api';
import { RxCurrentUserService, RxNotificationService } from '@helix/platform/shared/api';
import { RxWizardService } from '@helix/platform/shared/components';
import { RxModalService } from '@helix/platform/ui-kit';
import { IRecordGridConfig, RecordGridComponent } from '@helix/platform/view/components';
import { Observable } from 'rxjs';
import { RxWebAPIConnectionsService } from './web-api-connections.service';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class WebApiConnectionsAdminComponent {
    private rxModalService;
    private rxCurrentUserService;
    private rxWebAPIConnectionsService;
    private rxNotificationService;
    private rxRecordInstanceService;
    private componentFactoryResolver;
    private rxWizardService;
    private translateService;
    gridConfig$: Observable<IRecordGridConfig>;
    private currentRecordInstanceId;
    private isNewConfiguration;
    private webApiConnectionWizardContext;
    webApiConnectionsRecordGrid: RecordGridComponent;
    portCellTemplate: TemplateRef<DataCellTemplateParams>;
    recordDefinition: IRecordDefinition;
    constructor(rxModalService: RxModalService, rxCurrentUserService: RxCurrentUserService, rxWebAPIConnectionsService: RxWebAPIConnectionsService, rxNotificationService: RxNotificationService, rxRecordInstanceService: RxRecordInstanceService, componentFactoryResolver: ComponentFactoryResolver, rxWizardService: RxWizardService, translateService: TranslateService);
    save(): void;
    private getActionButtons;
    private getWebApiConnectionColumns;
    private resetFields;
    private openWizard;
    createWebApiConnection(): void;
    private editWebApiConnection;
    static ɵfac: i0.ɵɵFactoryDeclaration<WebApiConnectionsAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WebApiConnectionsAdminComponent, "rx-admin-web-api-connections", never, {}, {}, never, never>;
}