import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IPlainObject } from '@helix/platform/shared/api';
import { ICellDisplayProperties } from '../../common/types/cell-display-properties.types';
import { RxExpressionEvaluatorService } from '@helix/platform/view/api';
import { RxObjectUtilsService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export declare class CellDisplayPropertiesDirective implements OnInit, OnChanges {
    private rxExpressionEvaluatorService;
    private rxObjectUtilsService;
    rxCellDisplayProps: ICellDisplayProperties[];
    rxCellDisplayPropsBadgeElem: HTMLElement;
    rxCellDisplayPropsDataItem: IPlainObject;
    cssClasses: string;
    private evaluationData;
    constructor(rxExpressionEvaluatorService: RxExpressionEvaluatorService, rxObjectUtilsService: RxObjectUtilsService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private getActiveProps;
    private getCellCssClasses;
    private getSpanCssClasses;
    private updateCellClasses;
    static ɵfac: i0.ɵɵFactoryDeclaration<CellDisplayPropertiesDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CellDisplayPropertiesDirective, "[rxCellDisplayProps]", never, { "rxCellDisplayProps": "rxCellDisplayProps"; "rxCellDisplayPropsBadgeElem": "rxCellDisplayPropsBadgeElem"; "rxCellDisplayPropsDataItem": "rxCellDisplayPropsDataItem"; }, {}, never>;
}
