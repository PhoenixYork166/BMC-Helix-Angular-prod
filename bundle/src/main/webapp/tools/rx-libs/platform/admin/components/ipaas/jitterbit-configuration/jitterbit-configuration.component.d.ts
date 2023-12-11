import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { IIpaasBaseConfig } from '../ipaas-base-configuration/ipaas-base-configuration.types';
import { IpaasBaseConfigurationComponent } from '../ipaas-base-configuration/ipaas-base-configuration.component';
import * as i0 from "@angular/core";
export declare class JitterbitConfigurationAdminComponent extends BaseViewComponent implements OnInit {
    private formBuilder;
    ipaasBaseConfigurationComponent: IpaasBaseConfigurationComponent;
    jitterBitConfigurationForm: FormGroup;
    jitterbitConfig: IIpaasBaseConfig;
    constructor(formBuilder: FormBuilder);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<JitterbitConfigurationAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<JitterbitConfigurationAdminComponent, "rx-admin-jitterbit-configuration", never, {}, {}, never, never>;
}
