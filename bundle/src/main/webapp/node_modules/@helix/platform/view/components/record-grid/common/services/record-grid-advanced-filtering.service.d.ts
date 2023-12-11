import { TemplateRef } from '@angular/core';
import { AdaptTranslateService, AdvancedFilterDataTypesConfigsService, AdvancedFilterOption } from '@bmc-ux/adapt-angular';
import { IAssociationDescriptor } from '@helix/platform/association/api';
import { IFieldDefinition, IFieldDefinitionsById, IRecordDefinition, RxRecordDefinitionService } from '@helix/platform/record/api';
import { RxObjectUtilsService } from '@helix/platform/utils';
import { IRecordGridFilterConfig } from '../types/record-grid-filter-config.interfaces';
import { RxRecordGridUtilsService } from './record-grid-utils.service';
import { IRecordGridColumnNamedFilterOption } from '../types/record-grid.types';
import { RxNamedListService } from '@helix/platform/named-list/api';
import * as i0 from "@angular/core";
export declare class RxRecordGridAdvancedFilteringService {
    private rxRecordDefinitionService;
    private rxObjectUtilsService;
    private rxRecordGridUtilsService;
    private rxNamedListService;
    private advancedFilterDataTypesConfigsService;
    private adaptTranslateService;
    translation: import("@bmc-ux/adapt-angular").KeyValueObject<any>;
    adaptTexts: {
        fromLabel: any;
        toLabel: any;
        trueLabel: any;
        falseLabel: any;
        blankLabel: any;
        validationErrors: {
            invalidRangeName: any;
            invalidRangeText: any;
            numberTypeTexts: {
                fromValueMustBeNumber: any;
                toValueMustBeNumber: any;
                invalidBetweenMinAndMax: any;
                invalidMinValue: any;
                invalidMaxValue: any;
            };
        };
    };
    defaultConfig: import("@bmc-ux/adapt-angular").AdvancedFilterDataTypesConfigs;
    constructor(rxRecordDefinitionService: RxRecordDefinitionService, rxObjectUtilsService: RxObjectUtilsService, rxRecordGridUtilsService: RxRecordGridUtilsService, rxNamedListService: RxNamedListService, advancedFilterDataTypesConfigsService: AdvancedFilterDataTypesConfigsService, adaptTranslateService: AdaptTranslateService);
    addAssociationFieldsToFieldDefinitionsById(fieldDefinitionsById: IFieldDefinitionsById, associationDescriptors: IAssociationDescriptor[], associatedRecordDefinitions: IRecordDefinition[]): IFieldDefinitionsById;
    getAdvancedFilterOption(fieldId: string, header: string, fieldDefinition: IFieldDefinition, filterConfig: IRecordGridFilterConfig, isHidden?: boolean, customFilterTemplates?: {
        [key: string]: TemplateRef<any>;
    }, prefixLabel?: string, namedFilterOptions?: IRecordGridColumnNamedFilterOption[], typeaheadKeystrokeCount?: number, additionalQueryCriteria?: string): AdvancedFilterOption;
    private parseStringTagFieldExpression;
    private updateFilterValue;
    private buildTagLabel;
    private getNamedOptionTitles;
    private getDatetimeCustomConfig;
    private getExpressionRawValues;
    private getFilterValueFromString;
    private getNamedFilterOptionTips;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRecordGridAdvancedFilteringService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRecordGridAdvancedFilteringService>;
}
