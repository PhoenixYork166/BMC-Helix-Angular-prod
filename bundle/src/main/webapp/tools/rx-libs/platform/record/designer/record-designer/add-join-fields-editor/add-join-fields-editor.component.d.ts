import { OnDestroy, OnInit, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActiveModalRef, SelectTexts } from '@bmc-ux/adapt-angular';
import { IFieldDefinition, RxFieldDefinitionService, RxRecordDefinitionService } from '@helix/platform/record/api';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import { RxGuidService } from '@helix/platform/utils';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { RxModalClass } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class AddJoinFieldsEditorComponent extends RxModalClass implements OnInit, OnDestroy {
    private translateService;
    private rxGuidService;
    private rxRecordDefinitionService;
    activeModalRef: ActiveModalRef;
    private rxDefinitionNameService;
    private rxFieldDefinitionService;
    protected injector: Injector;
    private notificationMessage;
    private destroyed$;
    primaryRecordDefinitionName: any;
    secondaryRecordDefinitionName: any;
    selectLabel: any;
    private addedPrimaryFields;
    private addedSecondaryFields;
    primarySelectedFieldsFormControl: FormControl;
    secondarySelectedFieldsFormControl: FormControl;
    private primarySelectedFields$;
    private secondarySelectedFields$;
    private primaryAvailableFields$;
    private secondaryAvailableFields$;
    private duplicateNames$;
    private hasDuplicates$;
    private selectedFields$;
    vm$: Observable<{
        primaryAvailableFields: IFieldDefinition[];
        secondaryAvailableFields: IFieldDefinition[];
        hasDuplicates: boolean;
        selectedFields: any[];
    }>;
    private selectedFields;
    alertConfig: {
        content: any;
        variant: string;
        type: string;
        dismissible: boolean;
    };
    selectTexts: SelectTexts;
    constructor(translateService: TranslateService, rxGuidService: RxGuidService, rxRecordDefinitionService: RxRecordDefinitionService, activeModalRef: ActiveModalRef, rxDefinitionNameService: RxDefinitionNameService, rxFieldDefinitionService: RxFieldDefinitionService, injector: Injector);
    ngOnInit(): void;
    save(): void;
    cancel(): void;
    optionFormatter(field: IFieldDefinition): string;
    private getSourceFieldId;
    private getJoinFieldDefinitions;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddJoinFieldsEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AddJoinFieldsEditorComponent, "rx-add-join-fields-editor", never, {}, {}, never, never>;
}