import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { AfterViewInit, Injector, NgZone, QueryList } from '@angular/core';
import { ActiveModalRef, AdaptTreeNodeTyped, TreeWrap } from '@bmc-ux/adapt-angular';
import { IAssociationDescriptor } from '@helix/platform/association/api';
import { IFieldDefinition, IRecordDefinition, RxFieldDefinitionService, RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { IExpressionConfigurator, RxDefinitionNameService } from '@helix/platform/shared/api';
import { ExpressionFormControlComponent, IExpressionFormControlOptions, ISelectFormControlOptions, IStepperWithUnitsFormControlOptions, RxExpressionEditorService } from '@helix/platform/shared/components';
import { RxModalClass, RxModalService } from '@helix/platform/ui-kit';
import { RxGuidService } from '@helix/platform/utils';
import { ActionListControlComponent } from '@helix/platform/view/designer';
import { RxRecordGridUtilsService } from '../../../../common/services/record-grid-utils.service';
import { IColumnEditorAvailableColumn, IColumnEditorColumnData, IRecordGridDesignColumnData } from '../record-grid-column-editor.types';
import { IAvailableColumnTreeData } from './types/available-column-tree-data.interface';
import { IColumnEditorProperty } from './types/column-editor-property.types';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RecordGridColumnEditorModalComponent extends RxModalClass implements AfterViewInit {
    private activeModalRef;
    private rxModalService;
    private definitionNameService;
    private rxRecordGridUtilsService;
    private rxFieldDefinitionService;
    private rxRecordDefinitionCacheService;
    private rxGuidService;
    private ngZone;
    protected injector: Injector;
    private translateService;
    private rxExpressionEditorService;
    columns: IColumnEditorColumnData[];
    recordDefinition: IRecordDefinition;
    columnProperties: IColumnEditorProperty[];
    actionsColumnProperties: {
        name: string;
        defaultValue: boolean;
        label: string;
    }[];
    filteredColumns: IColumnEditorAvailableColumn[];
    availableColumnsTree: AdaptTreeNodeTyped<IAvailableColumnTreeData>[];
    startedLoadingAssociationDescriptors: boolean;
    treeWrap: TreeWrap;
    expressionConfigurator: IExpressionConfigurator;
    isReadOnly: boolean;
    columnWidthPropertyOptions: IStepperWithUnitsFormControlOptions;
    typeaheadKeystrokeCountOptions: ISelectFormControlOptions;
    draggableSelectedColumns: QueryList<CdkDrag<IColumnEditorColumnData>>;
    selectedColumnsDropList: CdkDropList;
    draggableAssociatedAvailableColumns: QueryList<CdkDrag<IColumnEditorColumnData>>;
    actionListControlComponents: QueryList<ActionListControlComponent>;
    associatedAvailableColumnsDropList: CdkDropList;
    private accordionTabEls;
    private readonly activeColumn;
    private readonly activeActionIndex;
    constructor(activeModalRef: ActiveModalRef, rxModalService: RxModalService, definitionNameService: RxDefinitionNameService, rxRecordGridUtilsService: RxRecordGridUtilsService, rxFieldDefinitionService: RxFieldDefinitionService, rxRecordDefinitionCacheService: RxRecordDefinitionCacheService, rxGuidService: RxGuidService, ngZone: NgZone, injector: Injector, translateService: TranslateService, rxExpressionEditorService: RxExpressionEditorService);
    ngAfterViewInit(): void;
    isActionsColumn(fieldId: string): boolean;
    updateSelectedColumnsDropList(): void;
    updateAssociatedAvailableColumnsDropList(): void;
    updateColumnsDropList(draggableColumnsList: QueryList<CdkDrag<IColumnEditorColumnData>>, dropList: CdkDropList<IColumnEditorColumnData[]>): void;
    cancel(): void;
    onDropInSelectedColumnsContainer(event: CdkDragDrop<IColumnEditorColumnData[]>): void;
    onColumnCheckboxPropertyChange(value: boolean, column: IColumnEditorColumnData, columnProperty: IColumnEditorProperty): void;
    onColumnDragStarted(): void;
    onAssociatedAvailableColumnsDragStarted(): void;
    isColumnEditorAvailableColumn(column: IColumnEditorAvailableColumn | IColumnEditorColumnData): column is IColumnEditorAvailableColumn;
    moveColumn(fromIndex: number, toIndex: number): void;
    removeColumn(index: number): void;
    private getAssociatedAvailableColumnsNode;
    getAvailableColumnsTree(): void;
    updateAvailableColumnsTree(): void;
    onNodeExpand({ node }: {
        node: AdaptTreeNodeTyped<IAvailableColumnTreeData>;
    }): void;
    addColumn(availableColumn: IColumnEditorAvailableColumn, insertIndex?: number): void;
    getColumnEditorColumnData(availableColumn: IColumnEditorAvailableColumn): IColumnEditorColumnData;
    removeFromAvailableColumns(column: IColumnEditorAvailableColumn): void;
    sortAvailableColumns(availableColumns: IColumnEditorAvailableColumn[]): IColumnEditorAvailableColumn[];
    getAvailableColumns(recordDefinition: IRecordDefinition, associationDescriptor?: IAssociationDescriptor): IColumnEditorAvailableColumn[];
    getColumnMetadata(fieldDefinition: IFieldDefinition, associationDescriptor?: IAssociationDescriptor): IColumnEditorAvailableColumn;
    saveChanges(): void;
    trackByForColumns(index: number, column: IColumnEditorColumnData): string;
    trackByForColumnProperties(index: number, columnProperty: IColumnEditorProperty): string;
    isPropertyEditable(column: IColumnEditorColumnData, propertyName: string): boolean;
    private updateColumnIndexes;
    private openActiveAction;
    isTreeEmpty(): boolean;
    openAdditionalQueryCriteriaExpressionEditor(column: IColumnEditorColumnData, control: ExpressionFormControlComponent): void;
    getAdditionalQueryCriteriaExpressionOptions(column: IRecordGridDesignColumnData): IExpressionFormControlOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordGridColumnEditorModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RecordGridColumnEditorModalComponent, "ng-component", never, {}, {}, never, never>;
}
