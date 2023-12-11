import { Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DockedPanelContext } from '@bmc-ux/adapt-angular';
import { RxModalClass } from '@helix/platform/ui-kit';
import { RxTenantService } from '../manage-tenant.service';
import { RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class TenantEditorComponent extends RxModalClass implements OnInit {
    private formBuilder;
    private dockedPanelContext;
    private rxManageTenantService;
    private rxNotificationService;
    private translateService;
    protected injector: Injector;
    validDefinitionNameRegex: any;
    tenantEditorFormGroup: FormGroup;
    domainIdentifierRegexp: RegExp;
    isEditMode: boolean;
    constructor(formBuilder: FormBuilder, dockedPanelContext: DockedPanelContext, rxManageTenantService: RxTenantService, rxNotificationService: RxNotificationService, translateService: TranslateService, injector: Injector);
    ngOnInit(): void;
    isDirty(): boolean;
    save(): void;
    cancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TenantEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TenantEditorComponent, "rx-tenant-editor", never, {}, {}, never, never>;
}
