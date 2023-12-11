import { ComponentFactoryResolver, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RxSelectOption } from '@bmc-ux/adapt-angular';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { RxExternalDataService } from '../../../services/external-data/external-data.service';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class DataSourceStepComponent implements OnDestroy, OnInit {
    private componentFactoryResolver;
    private rxExternalDataService;
    private rxWizardModalComponent;
    private translateService;
    private destroyed$;
    dataSourceTypeLabel: string;
    dataSourceTypeFormControl: FormControl;
    dataSourceTypes: RxSelectOption[];
    dataSourceNameLabel: string;
    dataSourceNameFormControl: FormControl;
    dataSourceNames: RxSelectOption[];
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxExternalDataService: RxExternalDataService, rxWizardModalComponent: RxWizardModalComponent, translateService: TranslateService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataSourceStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DataSourceStepComponent, "ax-data-source-step", never, {}, {}, never, never>;
}
