import { RxGuidService } from '@helix/platform/utils';
import { IViewDefinition } from '@helix/platform/view/api';
import { IRecordDefinition, RxFieldDefinitionService } from '@helix/platform/record/api';
import { TranslateService } from '@ngx-translate/core';
import { RxDefaultRecordEditorInputType } from '@helix/platform/view/components';
import * as i0 from "@angular/core";
export declare class RxRecordEditorBuilder {
    private rxGuidService;
    private rxDefaultRecordEditorInputType;
    private rxFieldDefinitionService;
    private translateService;
    constructor(rxGuidService: RxGuidService, rxDefaultRecordEditorInputType: RxDefaultRecordEditorInputType, rxFieldDefinitionService: RxFieldDefinitionService, translateService: TranslateService);
    getViewDefinition(recordDefinition: IRecordDefinition, recordInstanceId: string, isEditable?: boolean): IViewDefinition;
    private getComponentDefinitions;
    private getFieldComponentDefinitions;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRecordEditorBuilder, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRecordEditorBuilder>;
}
