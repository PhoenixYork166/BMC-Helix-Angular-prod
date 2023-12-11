import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProcessDefinition, RxProcessDefinitionCacheService, RxProcessElementSearchService } from '@helix/platform/process/api';
import { RxProcessElementService, RxRappidPaperService } from '@helix/platform/process/elements';
import * as i0 from "@angular/core";
export interface IProcessDesignerConfiguration {
    processDefinitionName?: string;
    zoomToFit?: boolean;
    onClick?: ({ processDefinition: IProcessDefinition, cellView: {} }: {
        processDefinition: any;
        cellView: {};
    }) => void;
}
export declare class RxProcessPreviewComponent implements OnDestroy, OnInit {
    private element;
    private rxProcessDefinitionCacheService;
    private rxProcessElementService;
    private rxProcessElementSearchService;
    private rxRappidPaperService;
    config: Observable<IProcessDesignerConfiguration>;
    onClick: ({ processDefinition: IProcessDefinition, cellView: {} }: {
        processDefinition: any;
        cellView: {};
    }) => void;
    processDefinitionName: string;
    zoomToFit: boolean;
    processDefinition: IProcessDefinition;
    private destroyed$;
    private paperScroller;
    constructor(element: ElementRef, rxProcessDefinitionCacheService: RxProcessDefinitionCacheService, rxProcessElementService: RxProcessElementService, rxProcessElementSearchService: RxProcessElementSearchService, rxRappidPaperService: RxRappidPaperService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    initialize(): void;
    zoomIn(): void;
    zoomOut(): void;
    private getGraph;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxProcessPreviewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxProcessPreviewComponent, "rx-process-preview", never, { "config": "config"; }, {}, never, never>;
}
