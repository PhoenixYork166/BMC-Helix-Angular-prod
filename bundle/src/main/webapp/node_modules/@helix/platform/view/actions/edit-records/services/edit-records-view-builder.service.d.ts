import { RxGuidService } from '@helix/platform/utils';
import { IViewDefinition } from '@helix/platform/view/api';
import { RxFieldDefinitionService } from '@helix/platform/record/api';
import { TranslateService } from '@ngx-translate/core';
import { IColumnDescriptor, RxDefaultRecordEditorInputType } from '@helix/platform/view/components';
import { RxSystemConfigurationService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxEditRecordsViewBuilder {
    private rxGuidService;
    private rxDefaultRecordEditorInputType;
    private rxFieldDefinitionService;
    private translateService;
    private rxSystemConfigurationService;
    constructor(rxGuidService: RxGuidService, rxDefaultRecordEditorInputType: RxDefaultRecordEditorInputType, rxFieldDefinitionService: RxFieldDefinitionService, translateService: TranslateService, rxSystemConfigurationService: RxSystemConfigurationService);
    getViewDefinition(recordDefinitionName: string, columnDescriptors: IColumnDescriptor[]): IViewDefinition;
    private getComponentDefinitions;
    private getFieldContainerComponentDefinitions;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxEditRecordsViewBuilder, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxEditRecordsViewBuilder>;
}
