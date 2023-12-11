import { RxIdService, RxJsonParserService } from '@helix/platform/utils';
import { IDesignerGraph, IDesignerGraphConfig } from '@helix/platform/shared/api';
import { IProcessDefinition, RxProcessElementRegistryService, RxProcessElementSearchService } from '@helix/platform/process/api';
import { IProcessDefinitionModel, RxEndEventService, RxProcessService, RxStartEventService } from '@helix/platform/process/elements';
declare var joint: any;
export declare class RxProcessDesignerGraph extends joint.dia.Graph implements IDesignerGraph<IProcessDefinition, IProcessDefinitionModel> {
    rxEndEventService: RxEndEventService;
    rxIdService: RxIdService;
    rxJsonParserService: RxJsonParserService;
    rxProcessElementRegistryService: RxProcessElementRegistryService;
    rxProcessElementSearchService: RxProcessElementSearchService;
    rxProcessService: RxProcessService;
    rxStartEventService: RxStartEventService;
    constructor(config: IDesignerGraphConfig);
    reset(): void;
    addDefaultElements(definitionModel: IProcessDefinitionModel): void;
    getDefinitionFromGraph(): Partial<IProcessDefinition>;
    loadGraphFromDefinition(definition: IProcessDefinition): any;
    private getDefinitionBase;
    private getFlowElements;
    private getJsonObject;
    private getLayout;
    private adaptCell;
    private removeRedundantProperties;
}
export {};
