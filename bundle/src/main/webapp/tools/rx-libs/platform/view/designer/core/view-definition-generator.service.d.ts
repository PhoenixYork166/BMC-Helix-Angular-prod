import { IViewDefinition, RxViewDefinitionLocalizationService } from '@helix/platform/view/api';
import { IViewComponentDesignModels } from '../interfaces/view-component-design-models.interface';
import { IViewDesignModel } from '../interfaces/view-design-model.interface';
import { RxBundleCacheService, RxDefinitionNameService } from '@helix/platform/shared/api';
import { RxViewDesignerModels } from './view-designer-models.service';
import * as i0 from "@angular/core";
export declare class RxViewDefinitionGeneratorService {
    private rxDefinitionNameService;
    private rxBundleCacheService;
    private viewDesignerModels;
    private rxViewDefinitionLocalizationService;
    constructor(rxDefinitionNameService: RxDefinitionNameService, rxBundleCacheService: RxBundleCacheService, viewDesignerModels: RxViewDesignerModels, rxViewDefinitionLocalizationService: RxViewDefinitionLocalizationService);
    generate(viewModel: IViewDesignModel, componentModels: IViewComponentDesignModels, forSave?: boolean): IViewDefinition;
    private generateComponentDefinitions;
    private serializeComponentDefinitionProperties;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxViewDefinitionGeneratorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxViewDefinitionGeneratorService>;
}
