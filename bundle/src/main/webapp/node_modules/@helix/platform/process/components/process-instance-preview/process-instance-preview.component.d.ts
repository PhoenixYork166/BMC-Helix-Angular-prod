import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProcessDefinition, IProcessInstance, RxProcessDefinitionCacheService, RxProcessInstanceService } from '@helix/platform/process/api';
import { RxRappidPaperService } from '@helix/platform/process/elements';
import { IProcessInstancePreviewConfig } from './process-instance-preview-config.interface';
import * as i0 from "@angular/core";
export declare class RxProcessInstancePreviewComponent implements OnDestroy, OnInit {
    private element;
    private rxProcessDefinitionCacheService;
    private rxProcessInstanceService;
    private rxRappidPaperService;
    config: Observable<IProcessInstancePreviewConfig>;
    processDefinitionName: string;
    processInstanceId: string;
    zoomToFit: boolean;
    onClick: ({ processDefinition: IProcessDefinition, processInstance: IProcessInstance, cellView: {} }: {
        processDefinition: any;
        processInstance: any;
        cellView: {};
    }) => void;
    processDefinition: IProcessDefinition;
    processInstance: IProcessInstance;
    private destroyed$;
    private paperScroller;
    constructor(element: ElementRef, rxProcessDefinitionCacheService: RxProcessDefinitionCacheService, rxProcessInstanceService: RxProcessInstanceService, rxRappidPaperService: RxRappidPaperService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    initialize(): void;
    zoomIn(): void;
    zoomOut(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxProcessInstancePreviewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxProcessInstancePreviewComponent, "rx-process-instance-preview", never, { "config": "config"; }, {}, never, never>;
}
