import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AdaptTreeNode } from '@bmc-ux/adapt-angular';
import { IDataDictionary } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class DataDictionaryComponent implements OnChanges {
    dataDictionary: IDataDictionary;
    nodeSelected: EventEmitter<any>;
    dragStart: EventEmitter<any>;
    tree: AdaptTreeNode[];
    onDragStart(event: DragEvent): void;
    ngOnChanges(changes: SimpleChanges): void;
    onNodeExpand(e: any): void;
    onNodeSelected(node: AdaptTreeNode): void;
    private prepareTreeForAdapt;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataDictionaryComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DataDictionaryComponent, "rx-data-dictionary", never, { "dataDictionary": "dataDictionary"; }, { "nodeSelected": "nodeSelected"; "dragStart": "dragStart"; }, never, never>;
}
