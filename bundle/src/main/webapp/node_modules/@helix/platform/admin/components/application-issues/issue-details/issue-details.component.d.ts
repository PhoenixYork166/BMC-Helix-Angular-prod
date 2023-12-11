import { OnInit } from '@angular/core';
import { DockedPanelContext } from '@bmc-ux/adapt-angular';
import { RowDataItem } from '@bmc-ux/adapt-table';
import { IPlainObject } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class IssueDetailsComponent implements OnInit {
    private dockedPanelContext;
    issueFields: RowDataItem;
    fieldIds: IPlainObject;
    coreFieldIds: IPlainObject;
    constructor(dockedPanelContext: DockedPanelContext);
    ngOnInit(): void;
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IssueDetailsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IssueDetailsComponent, "rx-issue-detail", never, {}, {}, never, never>;
}
