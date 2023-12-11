import { Injector, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RxModalClass } from '@helix/platform/ui-kit';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export declare class GroupEditorComponent extends RxModalClass implements OnInit {
    private activeModalRef;
    protected injector: Injector;
    groupNameForm: NgForm;
    groupName: '';
    groupNames: string[];
    private oldGroupName;
    constructor(activeModalRef: ActiveModalRef, injector: Injector);
    ngOnInit(): void;
    isDirty(): boolean;
    isSaveButtonDisabled(): boolean;
    saveGroupName(): void;
    cancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GroupEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GroupEditorComponent, "rx-group-editor", never, {}, {}, never, never>;
}
