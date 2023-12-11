import { Injector, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DockedPanelContext, RxSelectOption } from '@bmc-ux/adapt-angular';
import { RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { RxGlobalCacheService } from '@helix/platform/shared/api';
import { RxModalClass } from '@helix/platform/ui-kit';
import { IEmailProfile } from '../email-profiles.interfaces';
import * as i0 from "@angular/core";
export declare class CreateEmailProfileComponent extends RxModalClass implements OnInit, OnDestroy {
    private formBuilder;
    private rxGlobalCacheService;
    private rxRecordInstanceDataPageService;
    private dockedPanelContext;
    protected injector: Injector;
    emailProfile: IEmailProfile;
    createEmailProfileFormGroup: FormGroup;
    mailboxFunctions: {
        incoming: {
            id: number;
            label: string;
            value: string;
        };
        outgoing: {
            id: number;
            label: string;
            value: string;
        };
    };
    bundleOptions: RxSelectOption[];
    mailboxOptions: RxSelectOption[];
    availableMailboxOptions: RxSelectOption[];
    validDefinitionNameRegex: RegExp;
    private subscription;
    constructor(formBuilder: FormBuilder, rxGlobalCacheService: RxGlobalCacheService, rxRecordInstanceDataPageService: RxRecordInstanceDataPageService, dockedPanelContext: DockedPanelContext, injector: Injector);
    ngOnInit(): void;
    isDirty(): boolean;
    ngOnDestroy(): void;
    private filterMailboxes;
    private loadEmailProfileData;
    bundleNameFormatter(bundleOption: RxSelectOption): string;
    mailboxNameFormatter(mailboxOption: RxSelectOption): string;
    save(): void;
    cancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CreateEmailProfileComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CreateEmailProfileComponent, "rx-create-email-profile", never, {}, {}, never, never>;
}
