import { EventEmitter } from '@angular/core';
import { AdaptTreeNode } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export declare class DataDictionaryNodeComponent {
    node: AdaptTreeNode;
    filterQuery: string;
    expressionNodeSelected: EventEmitter<AdaptTreeNode>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataDictionaryNodeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DataDictionaryNodeComponent, "rx-data-dictionary-node", never, { "node": "node"; "filterQuery": "filterQuery"; }, { "expressionNodeSelected": "expressionNodeSelected"; }, never, never>;
}
