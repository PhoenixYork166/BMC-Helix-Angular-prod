import { RxIdService, RxJsonParserService } from '@helix/platform/utils';
import { IProcessDefinition, RxProcessElementSearchService } from '@helix/platform/process/api';
import * as i0 from "@angular/core";
export declare class RxProcessElementService {
    private rxIdService;
    private rxJsonParserService;
    private rxProcessElementSearchService;
    constructor(rxIdService: RxIdService, rxJsonParserService: RxJsonParserService, rxProcessElementSearchService: RxProcessElementSearchService);
    getGraph(definition: IProcessDefinition): {
        cells: any[];
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<RxProcessElementService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxProcessElementService>;
}
