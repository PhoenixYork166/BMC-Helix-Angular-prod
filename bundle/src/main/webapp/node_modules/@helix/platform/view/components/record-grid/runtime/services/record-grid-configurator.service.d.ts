import { IRecordDefinition, RxFieldDefinitionService } from '@helix/platform/record/api';
import { IPlainObject } from '@helix/platform/shared/api';
import { RxGuidService } from '@helix/platform/utils';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { RxRecordGridUtilsService } from '../../common/services/record-grid-utils.service';
import { IRecordGridColumn, IRecordGridColumnWithMetadata } from '../types/record-grid-column.types';
import { IRecordGridConfig } from '../types/record-grid-config.interface';
import { RxRecordGridConfigUtilsService } from './record-grid-config-utils.service';
import * as i0 from "@angular/core";
export declare class RxRecordGridConfiguratorService {
    private rxGuidService;
    private rxFieldDefinitionService;
    private rxRecordGridConfigUtilsService;
    private rxRecordGridUtilsService;
    private translateService;
    private allowedOpenViewActionExpressionsForHrefRegex;
    constructor(rxGuidService: RxGuidService, rxFieldDefinitionService: RxFieldDefinitionService, rxRecordGridConfigUtilsService: RxRecordGridConfigUtilsService, rxRecordGridUtilsService: RxRecordGridUtilsService, translateService: TranslateService);
    getGridConfig(rxConfiguration: IRecordGridConfig): IRecordGridConfig;
    getColumnsWithMetadata(recordGridGuid: string, columns: IRecordGridColumn[], recordDefinition: IRecordDefinition): Observable<IRecordGridColumnWithMetadata[]>;
    getSelectionFieldOptionLabelsByFieldId(columns: IRecordGridColumn[], recordDefinition: IRecordDefinition): IPlainObject;
    private getFieldDefinitionResourceTypeShortName;
    private isColumnClickableWithHref;
    private canViewParamsBeEvaluatedForHref;
    private canExpressionBeEvaluatedForHref;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRecordGridConfiguratorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRecordGridConfiguratorService>;
}
