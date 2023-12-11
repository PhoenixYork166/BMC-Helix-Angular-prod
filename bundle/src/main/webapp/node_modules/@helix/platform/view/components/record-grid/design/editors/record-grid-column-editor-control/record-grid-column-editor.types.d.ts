import { BooleanLike, IExpressionConfigurator } from '@helix/platform/shared/api';
import { RecordGridColumnAlignment } from '../../../common/types/record-grid-column-alignment.enum';
import { IFieldDefinition, IRecordDefinition } from '@helix/platform/record/api';
import { IAssociationDescriptor } from '@helix/platform/association/api';
import { IRecordGridSortable } from '../../../runtime/types/record-grid-column.types';
import { IViewComponentDesignData } from '@helix/platform/view/designer';
import { IViewActionDesignProperties } from '@helix/platform/view/api';
import { ICellDisplayProperties } from '../../../common/types/cell-display-properties.types';
import { INamedFilterOptionDesignData } from './record-grid-column-editor-modal/named-filter-options/named-filter-options.types';
import { IRecordGridSortableObject } from '../../../common/types/record-grid.types';
import { IExpressionFormControlOptions } from '@helix/platform/shared/components';
export interface IRecordGridColumnEditorControlOptions {
    recordDefinition: IRecordDefinition;
}
export interface IRecordGridColumnDesignModel {
    alignment: RecordGridColumnAlignment;
    fieldId: string;
    filterable: BooleanLike;
    filterType: string;
    index: string;
    sortable: IRecordGridSortable;
    title: string;
    visible: BooleanLike;
    searchable: BooleanLike;
    cellDisplayProperties: ICellDisplayProperties[];
    width: string;
    wrapText: BooleanLike;
    typeaheadKeystrokeCount: number;
    additionalQueryCriteria: string;
}
export interface IRecordGridDesignInspectorColumnConfig {
    actions?: IViewComponentDesignData<IViewActionDesignProperties>[];
    alignment?: RecordGridColumnAlignment;
    clickable?: boolean;
    fieldId?: string;
    filterable?: boolean;
    searchable?: boolean;
    filterType?: string;
    guid?: string;
    index?: number;
    sortable?: boolean | IRecordGridSortableObject;
    title?: string;
    fallbackTitle?: string;
    visible?: boolean;
    cellDisplayProperties?: ICellDisplayProperties[];
    namedFilterOptions?: INamedFilterOptionDesignData[];
    width?: string;
    wrapText?: boolean;
    typeaheadKeystrokeCount?: number;
    additionalQueryCriteria?: string;
}
export interface IColumnEditorAvailableColumn {
    fieldDefinitionName: string;
    label: string;
    fieldId: string;
    isSortable: boolean;
    associationDescriptor: IAssociationDescriptor;
    fieldDefinition: IFieldDefinition;
}
export interface IRecordGridDesignColumnData extends IRecordGridDesignInspectorColumnConfig {
    fieldDefinition: IFieldDefinition;
    associationDescriptor: IAssociationDescriptor;
}
export interface IColumnEditorColumnData extends IRecordGridDesignColumnData {
    isOpen: boolean;
    label: string;
    additionalQueryCriteriaExpressionOptions?: IExpressionFormControlOptions;
}
export interface IRecordGridColumnEditorModalParams {
    columns: IRecordGridDesignColumnData[];
    activeColumn: IRecordGridDesignColumnData;
    recordDefinition: IRecordDefinition;
    isReadOnly?: boolean;
    activeActionIndex?: number;
    expressionConfigurator?: IExpressionConfigurator;
}
export interface IRecordGridColumnEditorModalResult {
    columns: IRecordGridDesignColumnData[];
}
