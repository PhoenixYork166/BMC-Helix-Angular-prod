import { OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RxRecordInstanceService } from '@helix/platform/record/api';
import { RxNotificationService } from '@helix/platform/shared/api';
import { RxModalService } from '@helix/platform/ui-kit';
import { IRecordGridConfig, RecordGridComponent } from '@helix/platform/view/components';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class WebhookCallbackConfigurationAdminComponent implements OnInit {
    private formBuilder;
    private rxModalService;
    private rxNotificationService;
    private rxRecordInstanceService;
    private translateService;
    gridConfig: Observable<IRecordGridConfig>;
    grid: RecordGridComponent;
    constructor(formBuilder: FormBuilder, rxModalService: RxModalService, rxNotificationService: RxNotificationService, rxRecordInstanceService: RxRecordInstanceService, translateService: TranslateService);
    ngOnInit(): void;
    private editConfiguration;
    createConfiguration(): void;
    private deleteConfigurations;
    private getColumns;
    private openDockedPanel;
    static ɵfac: i0.ɵɵFactoryDeclaration<WebhookCallbackConfigurationAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WebhookCallbackConfigurationAdminComponent, "rx-admin-webhook-callback-configuration", never, {}, {}, never, never>;
}
