import { OnInit } from '@angular/core';
import { IRecordPreviewCardConfig } from './record-preview-card.types';
import * as i0 from "@angular/core";
export declare class RxRecordPreviewCardComponent implements OnInit {
    config: IRecordPreviewCardConfig;
    private maxFieldValueLength;
    ngOnInit(): void;
    isEditableState(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRecordPreviewCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxRecordPreviewCardComponent, "rx-record-preview-card", never, { "config": "config"; }, {}, never, never>;
}
