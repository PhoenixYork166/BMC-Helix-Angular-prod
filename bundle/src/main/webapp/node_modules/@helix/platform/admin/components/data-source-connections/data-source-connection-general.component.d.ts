import { OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxSelectOption } from '@bmc-ux/adapt-angular';
import { TranslateService } from '@ngx-translate/core';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
export declare class DataSourceConnectionGeneralComponent implements OnInit, OnDestroy {
    private rxWizardModalComponent;
    private translateService;
    generalForm: FormGroup;
    dataSourceConfigTypes: RxSelectOption[];
    private defaultSelection;
    private destroyed$;
    constructor(rxWizardModalComponent: RxWizardModalComponent, translateService: TranslateService);
    ngOnInit(): void;
    optionFormatter: (dataSourceOption: RxSelectOption) => string;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataSourceConnectionGeneralComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DataSourceConnectionGeneralComponent, "rx-data-source-connection-general", never, {}, {}, never, never>;
}
