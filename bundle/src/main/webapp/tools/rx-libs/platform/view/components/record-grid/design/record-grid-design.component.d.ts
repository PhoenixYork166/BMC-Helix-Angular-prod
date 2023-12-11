import { OnInit, TemplateRef } from '@angular/core';
import { IViewComponentDropData } from '@helix/platform/view/designer';
import { SortEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { RxRecordGridUtilsService } from '../common/services/record-grid-utils.service';
import { RxRecordGridConfigUtilsService } from '../runtime/services/record-grid-config-utils.service';
import { RecordGridDesignModel } from './record-grid-design.model';
import { IRecordGridDesignAdaptTableConfig } from './record-grid-design.types';
import * as i0 from "@angular/core";
export declare class RecordGridDesignComponent implements OnInit {
    private rxRecordGridConfigUtilsService;
    private rxRecordGridUtilsService;
    model: RecordGridDesignModel;
    filterTemplate: TemplateRef<any>;
    visibleColumnsMenuTemplate: TemplateRef<any>;
    isReadOnly: boolean;
    adaptTableConfig$: Observable<IRecordGridDesignAdaptTableConfig>;
    hasRecordDefinitionName$: Observable<boolean>;
    constructor(rxRecordGridConfigUtilsService: RxRecordGridConfigUtilsService, rxRecordGridUtilsService: RxRecordGridUtilsService);
    ngOnInit(): void;
    onSort(event: SortEvent): void;
    onBeforeViewComponentDrop(data: IViewComponentDropData): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordGridDesignComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RecordGridDesignComponent, "rx-record-grid-design", never, { "model": "model"; "isReadOnly": "isReadOnly"; }, {}, never, never>;
}
