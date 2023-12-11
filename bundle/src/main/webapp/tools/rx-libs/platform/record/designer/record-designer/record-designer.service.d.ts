import { IRecordDefinitionModel } from '../record-designer.types';
import { IRecordDefinition, RxFieldDefinitionService, RxRecordDefinitionService } from '@helix/platform/record/api';
import { RxDefinitionNameService, RxLocalizationService, RxOverlayService } from '@helix/platform/shared/api';
import { RxDateUtilsService, RxGuidService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export declare class RxRecordDesignerService {
    private rxDefinitionNameService;
    private rxFieldDefinitionService;
    private rxGuidService;
    private rxOverlayService;
    private rxRecordDefinitionService;
    private rxLocalizationService;
    private rxDateUtilService;
    constructor(rxDefinitionNameService: RxDefinitionNameService, rxFieldDefinitionService: RxFieldDefinitionService, rxGuidService: RxGuidService, rxOverlayService: RxOverlayService, rxRecordDefinitionService: RxRecordDefinitionService, rxLocalizationService: RxLocalizationService, rxDateUtilService: RxDateUtilsService);
    getJoinCriteriaExpression(joinCriteria: string, primaryRecordDefinitionName: string, secondaryRecordDefinitionName: string): string;
    getJoinCriteriaArExpression(joinCriteria: string, primaryRecordDefinitionName: string, secondaryRecordDefinitionName: string): string;
    getDefinitionFromDefinitionModel(model: IRecordDefinitionModel, bundleId: string): IRecordDefinition;
    getDefinitionModelFromDefinition(recordDefinition: IRecordDefinition): IRecordDefinitionModel;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRecordDesignerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRecordDesignerService>;
}
