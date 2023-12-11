import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ChangeDetectorRef, Injector, OnInit } from '@angular/core';
import { ActiveModalRef, RxSelectOption } from '@bmc-ux/adapt-angular';
import { RxModalClass } from '@helix/platform/ui-kit';
import { RxRecordDefinitionCacheService, RxRecordDefinitionService } from '@helix/platform/record/api';
import { RxDefinitionNameService, RxBundleCacheService } from '@helix/platform/shared/api';
import { RxDefinitionPickerType, RxExpressionEditorService } from '@helix/platform/shared/components';
import { TranslateService } from '@ngx-translate/core';
import { RxRecordDesignerService } from '@helix/platform/record/designer';
import * as i0 from "@angular/core";
export declare class CreateJoinRecordComponent extends RxModalClass implements OnInit {
    protected injector: Injector;
    private activeModalRef;
    private rxRecordDefinitionService;
    private rxDefinitionNameService;
    private rxBundleCache;
    private router;
    private translateService;
    private rxRecordDefinitionCacheService;
    private rxExpressionEditorService;
    private rxRecordDesignerService;
    private changeDetector;
    private destroyed$;
    private expressionFormControlLabel;
    private expressionFormControlTooltip;
    primaryRecordDefinitionPickerOptions: {
        label: any;
        definitionType: RxDefinitionPickerType;
        required: boolean;
    };
    secondaryRecordDefinitionPickerOptions: {
        label: any;
        definitionType: RxDefinitionPickerType;
        required: boolean;
    };
    joinTypes: RxSelectOption[];
    private primaryRecordDefinitionNameFormControl;
    private secondaryRecordDefinitionNameFormControl;
    private primaryRecordDefinition$;
    private secondaryRecordDefinition$;
    createJoinRecordForm: FormGroup;
    private expressionConfigurator;
    expressionFormControlOptions: {
        label: any;
        tooltip: {
            iconName: string;
            content: any;
        };
        dataDictionary$: import("rxjs").Observable<import("@helix/platform/shared/api").IDataDictionary>;
        operators: import("@helix/platform/shared/api").IExpressionOperator[];
    };
    constructor(injector: Injector, activeModalRef: ActiveModalRef, rxRecordDefinitionService: RxRecordDefinitionService, rxDefinitionNameService: RxDefinitionNameService, rxBundleCache: RxBundleCacheService, router: Router, translateService: TranslateService, rxRecordDefinitionCacheService: RxRecordDefinitionCacheService, rxExpressionEditorService: RxExpressionEditorService, rxRecordDesignerService: RxRecordDesignerService, changeDetector: ChangeDetectorRef);
    ngOnInit(): void;
    optionFormatter(selectOption: RxSelectOption): string;
    openEditor(): void;
    createRecord(): void;
    cancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CreateJoinRecordComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CreateJoinRecordComponent, "rx-create-join-record", never, {}, {}, never, never>;
}
