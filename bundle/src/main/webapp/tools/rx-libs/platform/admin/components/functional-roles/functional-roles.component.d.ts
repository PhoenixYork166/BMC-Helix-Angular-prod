import { RxNotificationService } from '@helix/platform/shared/api';
import { RxModalService } from '@helix/platform/ui-kit';
import { IRecordGridConfig, RecordGridComponent } from '@helix/platform/view/components';
import { Observable } from 'rxjs';
import { RxFuntionalRoleService } from './functional-role.service';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class FunctionalRolesAdminComponent {
    private rxFuntionalRoleService;
    private rxNotificationService;
    private rxModalService;
    private translateService;
    gridConfig$: Observable<IRecordGridConfig>;
    functionalRolesRecordGrid: RecordGridComponent;
    constructor(rxFuntionalRoleService: RxFuntionalRoleService, rxNotificationService: RxNotificationService, rxModalService: RxModalService, translateService: TranslateService);
    private getActionButtons;
    private getColumns;
    private openModal;
    createFunctionalRole(): void;
    private editFunctionalRole;
    static ɵfac: i0.ɵɵFactoryDeclaration<FunctionalRolesAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FunctionalRolesAdminComponent, "rx-admin-functional-roles", never, {}, {}, never, never>;
}
