import { OnInit } from '@angular/core';
import { RecordInstance } from '@helix/platform/record/api';
import { IRole, RxNotificationService, RxRoleDataPageService } from '@helix/platform/shared/api';
import { RxModalService } from '@helix/platform/ui-kit';
import { IRecordGridConfig, RecordGridComponent } from '@helix/platform/view/components';
import { Observable } from 'rxjs';
import { RxRolePermissionsService } from './role-permissions.service';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RolePermissionsAdminComponent implements OnInit {
    private rxRolePermissionsService;
    private rxNotificationService;
    private rxModalService;
    private rxRoleDataPage;
    private translateService;
    recordGridConfig$: Observable<IRecordGridConfig>;
    rolesPermissionsRecordGrid: RecordGridComponent;
    currentRecordInstance: Observable<RecordInstance>;
    isDirty: boolean;
    constructor(rxRolePermissionsService: RxRolePermissionsService, rxNotificationService: RxNotificationService, rxModalService: RxModalService, rxRoleDataPage: RxRoleDataPageService, translateService: TranslateService);
    ngOnInit(): void;
    private getData;
    openDockedPanel(title: string, role: IRole): void;
    createRole(): void;
    private editRole;
    static ɵfac: i0.ɵɵFactoryDeclaration<RolePermissionsAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RolePermissionsAdminComponent, "rx-admin-role-permissions", never, {}, {}, never, never>;
}
