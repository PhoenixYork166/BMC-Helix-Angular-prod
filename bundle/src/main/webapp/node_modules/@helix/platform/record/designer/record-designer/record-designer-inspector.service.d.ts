import { RxFieldDefinitionService } from '@helix/platform/record/api';
import { TranslateService } from '@ngx-translate/core';
import { IFormSectionBuilderConfig, RxOverlayService } from '@helix/platform/shared/api';
import { IRecordDefinitionModel } from '../record-designer.types';
import { RecordDesignerExpressionConfigurator } from './record-designer-expression-configurator.class';
import * as i0 from "@angular/core";
export declare class RxRecordDesignerInspectorService {
    private rxFieldDefinitionService;
    private rxOverlayService;
    private translateService;
    constructor(rxFieldDefinitionService: RxFieldDefinitionService, rxOverlayService: RxOverlayService, translateService: TranslateService);
    getDefinitionInspectorConfig(isNewDefinition: boolean, definitionModel: IRecordDefinitionModel, definitionModelFromDefinition: IRecordDefinitionModel, bundleId: string, isPropertiesCustomizationAllowed: boolean, isIndexCustomizationAllowed: boolean, isPermissionsCustomizationAllowed: boolean, isFieldsCustomizationAllowed: boolean, isReadOnly: boolean, expressionConfigurator: RecordDesignerExpressionConfigurator): IFormSectionBuilderConfig[];
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRecordDesignerInspectorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRecordDesignerInspectorService>;
}
