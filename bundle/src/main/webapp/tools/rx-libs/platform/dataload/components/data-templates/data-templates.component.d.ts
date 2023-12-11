import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecordGridConfig, RecordGridComponent } from '@helix/platform/view/components';
import { RxRecordInstanceService } from '@helix/platform/record/api';
import { RxModalService } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { RxNotificationService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class DataTemplatesComponent implements OnInit {
    private rxNotificationService;
    private rxModalService;
    private translateService;
    private rxRecordInstanceService;
    hostClass: string;
    gridConfig$: Observable<IRecordGridConfig>;
    showDeprecated: boolean;
    grid: RecordGridComponent;
    constructor(rxNotificationService: RxNotificationService, rxModalService: RxModalService, translateService: TranslateService, rxRecordInstanceService: RxRecordInstanceService);
    ngOnInit(): void;
    private deleteSelectedDataTemplate;
    private getColumns;
    private editDataTemplate;
    createDataTemplate(): void;
    private openDockedPanel;
    private getRecordDefinition;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataTemplatesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DataTemplatesComponent, "dl-data-templates", never, {}, {}, never, never>;
}
