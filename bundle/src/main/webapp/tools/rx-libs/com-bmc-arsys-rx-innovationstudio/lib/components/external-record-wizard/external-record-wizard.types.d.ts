import { AdaptTreeNode } from '@bmc-ux/adapt-angular/tree';
import { IFieldDefinition, IRecordDefinition } from '@helix/platform/record/api';
import { IWebApiDefinition } from '@helix/platform/web-api/api';
import { IDocumentDefinition } from '@helix/platform/document/api';
export interface IExternalRecordDesignerOptions {
    dataSourceName: string;
    fieldDefinitions: IFieldDefinition[];
    resourceType: string;
    tableName: string;
    vendorSchemaDescriptor?: {
        dataSourceEntity: {
            webApiDefinitionGuid: string;
            documentDefinitionGuid: string;
        };
        dataSourceOperations: IWebApiRequestOperation[];
    };
}
export interface IExternalRecordWizardContext {
    dataSourceType?: string;
    dataSourceName?: string;
    tableName?: string;
    externalTableDefinition?: IRecordDefinition;
    fieldDefinitions?: IFieldDefinition[];
    mappedInternalFields?: IFieldDefinition[];
    selectedExternalFields?: IFieldDefinition[];
    selectedFieldMapping?: {
        displayId: string;
        id: string;
    };
    securityLabels?: [];
    webApi?: IWebApiDefinition;
    document?: IDocumentDefinition;
    operations?: IWebApiRequestOperation[];
    fields?: IWebApiDocumentSchemaField[];
    documentSchemaFields?: IWebApiDocumentSchemaField[];
    nonDocumentSchemaFields?: IWebApiDocumentSchemaField[];
    webRequestGuid?: string;
}
export interface IWebApiDocumentSchemaField {
    name: string;
    path: string;
    type?: string;
}
export interface IWebApiDocumentTreeNode extends AdaptTreeNode, IWebApiDocumentSchemaField {
    isArray?: boolean;
}
export interface IWebApiRequestOperation {
    webRequestGuid: string;
    operation: string;
}
