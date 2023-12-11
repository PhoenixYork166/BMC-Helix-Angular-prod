import { OnInit } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RxStringService } from '@helix/platform/utils';
import { IAvailableFieldsGroup } from './field-selector.types';
import { IRecordFieldDefinitionItem } from '../fields-inspector-widget.types';
import * as i0 from "@angular/core";
interface ModelObject {
    [id: string]: boolean;
}
export declare class FieldSelectorComponent implements OnInit {
    context: ActiveModalRef;
    private stringService;
    searchQuery: string;
    selectedFieldIdsModel: ModelObject;
    availableFieldGroups: IAvailableFieldsGroup[];
    hideSystemFields: boolean;
    isApplyButtonDisabled: boolean;
    private selectedFieldDefinitionIds;
    private availableFieldDefinitions;
    constructor(context: ActiveModalRef, stringService: RxStringService);
    ngOnInit(): void;
    closeModal(): void;
    search(searchQuery: string): void;
    select(groupName: string): void;
    updateApplyButtonDisabledStatus(): void;
    groupFieldsByFieldOption(availableFields: IRecordFieldDefinitionItem[]): IAvailableFieldsGroup[];
    trackByLabel(index: number, item: IAvailableFieldsGroup): string;
    trackById(index: number, item: IRecordFieldDefinitionItem): string;
    private idsToModel;
    private modelToIds;
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldSelectorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FieldSelectorComponent, "ng-component", never, {}, {}, never, never>;
}
export {};
