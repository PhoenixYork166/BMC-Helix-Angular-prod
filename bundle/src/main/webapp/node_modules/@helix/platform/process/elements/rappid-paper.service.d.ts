import { IProcessDefinition, IProcessInstance, RxProcessElementSearchService } from '@helix/platform/process/api';
import { RxIdService, RxTreeService } from '@helix/platform/utils';
import { RxProcessElementService } from './process-element.service';
import * as i0 from "@angular/core";
export declare class RxRappidPaperService {
    private rxIdService;
    private rxProcessElementService;
    private rxProcessElementSearchService;
    private rxTreeService;
    private green;
    private gray;
    private red;
    constructor(rxIdService: RxIdService, rxProcessElementService: RxProcessElementService, rxProcessElementSearchService: RxProcessElementSearchService, rxTreeService: RxTreeService);
    init(element: any, graph?: any, shouldZoomToFit?: boolean): any;
    setGraph(paperScroller: any, processDefinition: IProcessDefinition, processInstance: IProcessInstance, shouldZoomToFit?: boolean): void;
    private highlight;
    private highlightActivity;
    private highlightCell;
    private highlightVisibleErroredCell;
    private resetScroll;
    private zoomToFit;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRappidPaperService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRappidPaperService>;
}
