import { Injector } from '@angular/core';
import { IViewComponentDesignSandbox, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { Observable } from 'rxjs';
import { RxAssociationEditingMode } from '../association.types';
import { IAssociationDesignProperties, IAssociationProperties } from './association-design.types';
import { IAssociatedRecordField } from './association-record-field-selector-field';
export declare class AssociationDesignModel extends ViewDesignerComponentModel {
    protected injector: Injector;
    sandbox: IViewComponentDesignSandbox<IAssociationDesignProperties>;
    private rxAssociationDefinitionCacheService;
    private rxGuidService;
    private rxDefinitionNameService;
    private associationDesignHelperService;
    private updateInspector$;
    private recordEditorGuid;
    private recordDefinitionNameFromHostRecordEditor$;
    private childComponents$;
    private associationChildComponentsData$;
    private associationDefinitions;
    private associationDefinitionFilters;
    private recordDefinitionFields;
    private associatedRecordNodeSide;
    private previousDropdownFieldDefinition;
    private isManyToManyAssociation;
    readonly otherAssociationRecordEditorComponentGuids$: Observable<string[]>;
    readonly recordEditorGuid$: Observable<string>;
    readonly editingMode$: Observable<RxAssociationEditingMode>;
    readonly label$: Observable<string>;
    readonly displayedFields$: Observable<IAssociatedRecordField[]>;
    static getInitialProperties(initialProperties: IAssociationDesignProperties): IAssociationDesignProperties;
    constructor(injector: Injector, sandbox: IViewComponentDesignSandbox<IAssociationDesignProperties>);
    getPropertiesByName(properties: IAssociationDesignProperties): IAssociationProperties;
    private updateAssociationFilterComponent;
    private updateChildActionButtonDefinition;
    private updateComponentRecordFields;
    private getChildComponentsData;
    private generateInitialUpdateParameters;
    private updatePreviousDropdownFieldDefinition;
    private setIsManyToManyAssociation;
    private getViewDefinitionNameForAssociation;
    private getViewDefinitionNameFromActionButton;
    private updateRecordDefinitionFields;
    private updateAssociationNodeSideOptions;
    private updateAssociationDefinitionsOptions;
    private updateAssociationDefinitionsFilterOptions;
    private getInspectorConfig;
}
