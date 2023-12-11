import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Injector } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RxModalClass } from '@helix/platform/ui-kit';
import { RxRecordDefinitionService } from '@helix/platform/record/api';
import { RxDefinitionNameService, RxBundleCacheService } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
import { RxExternalDataService } from '../../services/external-data/external-data.service';
import * as i0 from "@angular/core";
export declare class CreateCustomRecordComponent extends RxModalClass {
    protected injector: Injector;
    private formBuilder;
    private activeModalRef;
    private rxExternalDataService;
    private rxRecordDefinitionService;
    private rxDefinitionNameService;
    private rxBundleCache;
    private router;
    createCustomRecordForm: FormGroup;
    customDataSourceNames$: Observable<string[]>;
    constructor(injector: Injector, formBuilder: FormBuilder, activeModalRef: ActiveModalRef, rxExternalDataService: RxExternalDataService, rxRecordDefinitionService: RxRecordDefinitionService, rxDefinitionNameService: RxDefinitionNameService, rxBundleCache: RxBundleCacheService, router: Router);
    submit(): void;
    cancel(): void;
    private initForm;
    static ɵfac: i0.ɵɵFactoryDeclaration<CreateCustomRecordComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CreateCustomRecordComponent, "ax-create-custom-record", never, {}, {}, never, never>;
}
