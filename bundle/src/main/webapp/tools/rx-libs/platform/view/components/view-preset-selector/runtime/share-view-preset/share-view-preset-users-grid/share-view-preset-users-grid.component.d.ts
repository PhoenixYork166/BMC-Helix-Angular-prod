import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecordGridConfig } from '../../../../record-grid/runtime/types/record-grid-config.interface';
import { RecordGridComponent } from '../../../../record-grid/runtime/record-grid.component';
import { TranslateService } from '@ngx-translate/core';
import { IShareViewPresetUserPayload } from '../share-view-preset.types';
import * as i0 from "@angular/core";
export declare class ShareViewPresetUsersGridComponent implements OnChanges {
    private translateService;
    recordGrid: RecordGridComponent;
    users: IShareViewPresetUserPayload[];
    remove: EventEmitter<string[]>;
    recordGridConfig$: Observable<IRecordGridConfig>;
    constructor(translateService: TranslateService);
    ngOnChanges(changes: SimpleChanges): void;
    private getRecordGridConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<ShareViewPresetUsersGridComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ShareViewPresetUsersGridComponent, "rx-share-view-preset-users-grid", never, { "users": "users"; }, { "remove": "remove"; }, never, never>;
}
