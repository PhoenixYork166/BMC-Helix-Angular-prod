import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxServerLogsService } from './server-logs.service';
import { RxNotificationService, RxServerErrorHandlerService } from '@helix/platform/shared/api';
import { Subscription } from 'rxjs';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import * as i0 from "@angular/core";
export declare class ServerLogsAdminComponent extends BaseViewComponent implements OnInit {
    private formBuilder;
    private rxNotificationService;
    private rxServerErrorHandlerService;
    private rxServerLogsService;
    hostClass: string;
    constructor(formBuilder: FormBuilder, rxNotificationService: RxNotificationService, rxServerErrorHandlerService: RxServerErrorHandlerService, rxServerLogsService: RxServerLogsService);
    busy: Subscription;
    serverLogsForm: FormGroup;
    shouldDisplayAdditionalLogTypes: boolean;
    isDownloadInProgress: boolean;
    private getServerLogsConfig;
    toggleAdditionalLogTypes(): void;
    save(): void;
    downloadLogs(): void;
    get autoTurnOffDuration(): any;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ServerLogsAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ServerLogsAdminComponent, "rx-admin-server-logs", never, {}, {}, never, never>;
}
