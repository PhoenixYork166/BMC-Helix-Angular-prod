import { RxModalService } from '@helix/platform/ui-kit';
import { ValueAccessor } from '@helix/platform/shared/components';
import { TranslateService } from '@ngx-translate/core';
import { IRecordIndexesControlOptions } from './record-indexes-control.types';
import { IIndexDefinitionModel } from '../../record-designer.types';
import { IFormFocusable } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RecordIndexesControlComponent extends ValueAccessor<IIndexDefinitionModel[]> implements IFormFocusable {
    private rxModalService;
    private translateService;
    options: IRecordIndexesControlOptions;
    constructor(rxModalService: RxModalService, translateService: TranslateService);
    openIndexesEditor(indexToEditIndex?: number): void;
    removeIndex($index: number): void;
    focus(data?: {
        indexToEditIndex: number;
    }): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordIndexesControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RecordIndexesControlComponent, "rx-record-indexes", never, { "options": "options"; }, {}, never, never>;
}
