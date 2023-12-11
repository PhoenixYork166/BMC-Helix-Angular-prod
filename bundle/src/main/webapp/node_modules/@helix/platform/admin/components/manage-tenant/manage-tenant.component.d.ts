import { OnInit } from '@angular/core';
import { RxDataPageFactoryService, RxNotificationService } from '@helix/platform/shared/api';
import { RxModalService } from '@helix/platform/ui-kit';
import { IRecordGridConfig, RecordGridComponent } from '@helix/platform/view/components';
import { Observable } from 'rxjs';
import { RxTenantService } from './manage-tenant.service';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class ManageTenantAdminComponent implements OnInit {
    private rxDataPageService;
    private rxTenantService;
    private rxModalService;
    private rxNotificationService;
    private translateService;
    manageTenantGrid: RecordGridComponent;
    manageTenantGridConfig: Observable<IRecordGridConfig>;
    private dataPage;
    constructor(rxDataPageService: RxDataPageFactoryService, rxTenantService: RxTenantService, rxModalService: RxModalService, rxNotificationService: RxNotificationService, translateService: TranslateService);
    ngOnInit(): void;
    private getData;
    private getRecordDefinition;
    private refreshManageTenantGrid;
    addTenant(): void;
    private editTenant;
    private openDockedPanel;
    private deleteTenant;
    static ɵfac: i0.ɵɵFactoryDeclaration<ManageTenantAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ManageTenantAdminComponent, "rx-admin-manage-tenant", never, {}, {}, never, never>;
}
