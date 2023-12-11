import { RxCurrentUserService, RxNotificationService } from '@helix/platform/shared/api';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RxRecordInstanceDataPageService, RxRecordInstanceService, RxRecordInstanceUpdateService } from '@helix/platform/record/api';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RxUserAvailabilityComponent {
    private rxCurrentUserService;
    private activeModalRef;
    private rxRecordInstanceDataPageService;
    private rxRecordInstanceService;
    private rxRecordInstanceUpdateService;
    private rxNotificationService;
    private translateService;
    isUserAvailableForAssignment: boolean;
    isSaveInProgress: boolean;
    constructor(rxCurrentUserService: RxCurrentUserService, activeModalRef: ActiveModalRef, rxRecordInstanceDataPageService: RxRecordInstanceDataPageService, rxRecordInstanceService: RxRecordInstanceService, rxRecordInstanceUpdateService: RxRecordInstanceUpdateService, rxNotificationService: RxNotificationService, translateService: TranslateService);
    updateAssignmentAvailability(): void;
    cancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxUserAvailabilityComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxUserAvailabilityComponent, "rx-user-availability", never, {}, {}, never, never>;
}
