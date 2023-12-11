import { Injector, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxSelectOption } from '@bmc-ux/adapt-angular';
import { RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { IPlainObject, RxDefinitionNameService } from '@helix/platform/shared/api';
import { IExpressionFormControlOptions, RxExpressionEditorService, RxWizardModalComponent } from '@helix/platform/shared/components';
import { IRowDataItem } from '@helix/platform/view/api';
import { IRecordGridConfig, RecordGridComponent, RxRecordGridUtilsService } from '@helix/platform/view/components';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ICreateUpdatePackageContext } from '../../bundle-details/bundle-details.types';
import * as i0 from "@angular/core";
interface IDataImportOptionsByRecordDefinitionName {
    dataFilter?: string;
    dataFilterExpression?: string;
    dataFilterColumnExpressionFormControlOptions?: IPlainObject;
    defaultFilter?: string;
    duplicateDataActionType: string | string[];
    ignoreRuleExecution?: boolean;
}
interface IRecordDefinitionData extends IDataImportOptionsByRecordDefinitionName {
    aliasName?: string;
    dataSource: string;
    disabled: boolean;
    name: string;
    selected?: string;
    shouldExportData: boolean;
}
export declare class AddDataWizardStepComponent implements OnInit, OnDestroy {
    private injector;
    private rxDefinitionNameService;
    private rxExpressionEditorService;
    private rxRecordDefinitionCacheService;
    private rxRecordGridUtilsService;
    private rxWizardModalComponent;
    private translateService;
    context: ICreateUpdatePackageContext;
    options: IPlainObject;
    definitionsDataGrid: RecordGridComponent;
    recordNameCellTemplate: TemplateRef<any>;
    dataFilterCellTemplate: TemplateRef<any>;
    ignoreRulesCellTemplate: TemplateRef<any>;
    duplicateDataActionTypeCellTemplate: TemplateRef<any>;
    addDataForm: FormGroup;
    dataFilterColumnExpressionFormControlOptions: IExpressionFormControlOptions;
    globalDataFilterExpressionFormControlOptions: IExpressionFormControlOptions;
    duplicateDataActionTypeOptions: RxSelectOption[];
    recordDefinitions: IRecordDefinitionData[];
    duplicateConfigurationDataActionTypeOptions: RxSelectOption[];
    recordGridConfig$: Observable<IRecordGridConfig>;
    private destroyed$;
    protected dataFilterColumnExpressionConfigurator: any;
    protected globalDataFilterExpressionConfigurator: any;
    private isDeleteButtonDisabled;
    constructor(injector: Injector, rxDefinitionNameService: RxDefinitionNameService, rxExpressionEditorService: RxExpressionEditorService, rxRecordDefinitionCacheService: RxRecordDefinitionCacheService, rxRecordGridUtilsService: RxRecordGridUtilsService, rxWizardModalComponent: RxWizardModalComponent, translateService: TranslateService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    optionFormatter(recordDefinitionData: IRecordDefinitionData): string;
    duplicateDataActionTypesOptionFormatter(option: RxSelectOption): string;
    openDataFilterColumnExpressionEditor(dataItem: IRowDataItem, columnField: string): void;
    openGlobalDataFilterExpressionEditor(): void;
    private deleteDefinitionsDataFromSelection;
    updateDataImportOptionsByRecordDefinitionName(cellValue: string | RxSelectOption, recordDefinitionName: string, optionName: string): void;
    private getAssociationsDataDictionary;
    private getDataImportOptionsByRecordDefinitionName;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddDataWizardStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AddDataWizardStepComponent, "ax-add-data-wizard-step", never, { "context": "context"; "options": "options"; }, {}, never, never>;
}
export {};
