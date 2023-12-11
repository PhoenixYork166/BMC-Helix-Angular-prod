import { OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { IpaasBaseConfigurationComponent } from '../ipaas-base-configuration/ipaas-base-configuration.component';
import { IAuthenticationOption } from './mulesoft-configuration.types';
import { IIpaasBaseConfig } from '../ipaas-base-configuration/ipaas-base-configuration.types';
import * as i0 from "@angular/core";
export declare class MulesoftConfigurationAdminComponent extends BaseViewComponent implements OnInit {
    private formBuilder;
    ipaasBaseConfigurationComponent: IpaasBaseConfigurationComponent;
    mulesoftConfigurationForm: FormGroup;
    mulesoftConfig: IIpaasBaseConfig;
    authenticationOptions: IAuthenticationOption[];
    optionFormatter: (authenticationOption: IAuthenticationOption) => string;
    constructor(formBuilder: FormBuilder);
    ngOnInit(): void;
    get authType(): AbstractControl;
    private getAuthTypeOption;
    private getAuthTypePayload;
    static ɵfac: i0.ɵɵFactoryDeclaration<MulesoftConfigurationAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MulesoftConfigurationAdminComponent, "rx-admin-mulesoft-configuration", never, {}, {}, never, never>;
}
