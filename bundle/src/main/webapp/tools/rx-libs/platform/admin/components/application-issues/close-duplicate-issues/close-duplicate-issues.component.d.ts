import { OnInit } from '@angular/core';
import { IRecordGridConfig, RecordGridComponent } from '@helix/platform/view/components';
import { Observable } from 'rxjs';
import { AdaptDockedPanelService, DockedPanelContext } from '@bmc-ux/adapt-angular';
import { RxCommandFactoryService, RxNotificationService } from '@helix/platform/shared/api';
import { ColumnConfig, RowDataItem } from '@bmc-ux/adapt-table';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class CloseDuplicateIssuesComponent implements OnInit {
    private adaptDockedPanelService;
    private dockedPanelContext;
    private rxCommandFactoryService;
    private rxNotificationService;
    private translateService;
    submittedIssuesGrid: RecordGridComponent;
    selectedIssuesData: RowDataItem[];
    submittedIssuesGridConfiguration$: Observable<IRecordGridConfig>;
    selectedIssuesGridColumns: ColumnConfig[];
    constructor(adaptDockedPanelService: AdaptDockedPanelService, dockedPanelContext: DockedPanelContext, rxCommandFactoryService: RxCommandFactoryService, rxNotificationService: RxNotificationService, translateService: TranslateService);
    ngOnInit(): void;
    private getSubmittedIssuesGridColumns;
    private submittedIssuesGridConfiguration;
    cancel(): void;
    closeSelectedIssues(): void;
    isCloseSelectedIssuesButtonDisabled(): boolean;
    private showIssueDetails;
    static ɵfac: i0.ɵɵFactoryDeclaration<CloseDuplicateIssuesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CloseDuplicateIssuesComponent, "rx-close-duplicate-issues", never, {}, {}, never, never>;
}
