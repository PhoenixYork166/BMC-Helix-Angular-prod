import { Injector, OnInit } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { AbstractControl, NgForm, ValidationErrors } from '@angular/forms';
import { IPlainObject, RxDefinitionNameService } from '@helix/platform/shared/api';
import { RxModalClass } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class RenameDefinitionModalComponent extends RxModalClass implements OnInit {
    protected injector: Injector;
    private activeModalRef;
    private rxDefinitionNameService;
    modalData: IPlainObject;
    bundleId: string;
    definitionDisplayName: string;
    oldDefinitionDisplayName: string;
    definitionNames: string[];
    renameDefinitionModalForm: NgForm;
    constructor(injector: Injector, activeModalRef: ActiveModalRef, rxDefinitionNameService: RxDefinitionNameService);
    ngOnInit(): void;
    isDirty(): boolean;
    getCorrectDefinitionNameValidator(): (control: AbstractControl) => ValidationErrors | null;
    onCancelClick(): void;
    onSaveClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RenameDefinitionModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RenameDefinitionModalComponent, "rx-rename-definition-modal", never, {}, {}, never, never>;
}
