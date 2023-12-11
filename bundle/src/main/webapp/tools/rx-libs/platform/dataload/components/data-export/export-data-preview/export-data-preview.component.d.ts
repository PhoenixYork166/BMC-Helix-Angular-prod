import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecordGridConfig } from '@helix/platform/view/components';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import * as i0 from "@angular/core";
export declare class ExportDataPreviewComponent implements OnInit {
    private activeModalRef;
    private rxRecordInstanceDataPageService;
    gridConfig: Observable<IRecordGridConfig>;
    gridContext: any;
    constructor(activeModalRef: ActiveModalRef, rxRecordInstanceDataPageService: RxRecordInstanceDataPageService);
    ngOnInit(): void;
    private getData;
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExportDataPreviewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ExportDataPreviewComponent, "dl-export-data-preview", never, {}, {}, never, never>;
}
