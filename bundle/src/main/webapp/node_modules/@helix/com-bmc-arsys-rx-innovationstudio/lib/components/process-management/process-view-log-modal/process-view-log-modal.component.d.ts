import { NgZone } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { TranslateService } from '@ngx-translate/core';
import { RxNotificationService } from '@helix/platform/shared/api';
import { RxProcessInstanceService } from '@helix/platform/process/api';
import * as i0 from "@angular/core";
export declare class ProcessViewLogModalComponent {
    activeModalRef: ActiveModalRef;
    translateService: TranslateService;
    private ngZone;
    private rxNotificationService;
    private rxProcessInstanceService;
    logs: string;
    emptyStateLabel: any;
    constructor(activeModalRef: ActiveModalRef, translateService: TranslateService, ngZone: NgZone, rxNotificationService: RxNotificationService, rxProcessInstanceService: RxProcessInstanceService);
    downloadLog(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProcessViewLogModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProcessViewLogModalComponent, "ax-process-view-log-modal", never, {}, {}, never, never>;
}
