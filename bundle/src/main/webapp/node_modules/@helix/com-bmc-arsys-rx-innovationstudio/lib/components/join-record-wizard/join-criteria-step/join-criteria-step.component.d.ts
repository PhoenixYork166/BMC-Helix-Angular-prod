import { Injector, OnDestroy, OnInit } from '@angular/core';
import { RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { IExpressionFormControlOptions, RxExpressionEditorService, RxWizardModalComponent } from '@helix/platform/shared/components';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class JoinCriteriaStepComponent implements OnInit, OnDestroy {
    private injector;
    private translateService;
    private rxExpressionEditorService;
    rxWizardModalComponent: RxWizardModalComponent;
    private rxRecordDefinitionCacheService;
    expressionOptions$: Observable<IExpressionFormControlOptions>;
    isExpressionFormControlVisible: boolean;
    private destroyed$;
    private expressionConfigurator;
    private expressionFormControlLabel;
    private expressionFormControlTooltip;
    constructor(injector: Injector, translateService: TranslateService, rxExpressionEditorService: RxExpressionEditorService, rxWizardModalComponent: RxWizardModalComponent, rxRecordDefinitionCacheService: RxRecordDefinitionCacheService);
    ngOnInit(): void;
    openEditor(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<JoinCriteriaStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<JoinCriteriaStepComponent, "ax-join-criteria-step", never, {}, {}, never, never>;
}
