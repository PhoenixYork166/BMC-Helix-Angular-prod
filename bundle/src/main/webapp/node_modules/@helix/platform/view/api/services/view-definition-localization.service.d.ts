import { IViewDefinition, IViewLocalizableStrings } from '../domain/view-definition.interface';
import { RxViewDefinitionParserService } from './view-definition-parser.service';
import { RxViewComponentRegistryService } from '../registries/view-component-registry.service';
import { RxViewActionRegistryService } from '../view-action/view-action-registry.service';
import { RxGuidService, RxTreeService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export declare class RxViewDefinitionLocalizationService {
    private rxViewDefinitionParserService;
    private rxViewComponentRegistryService;
    private rxViewActionRegistryService;
    private rxGuidService;
    private rxTreeService;
    constructor(rxViewDefinitionParserService: RxViewDefinitionParserService, rxViewComponentRegistryService: RxViewComponentRegistryService, rxViewActionRegistryService: RxViewActionRegistryService, rxGuidService: RxGuidService, rxTreeService: RxTreeService);
    applyLocalization(viewDefinition: IViewDefinition): IViewDefinition;
    extractLocalizableStrings(viewDefinition: IViewDefinition): IViewLocalizableStrings;
    private applyComponentDefinitionLocalization;
    private getLocalizableActionParameterNames;
    private getLocalizableComponentPropertyNames;
    private convertOldSelectGroupLocalization;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxViewDefinitionLocalizationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxViewDefinitionLocalizationService>;
}
