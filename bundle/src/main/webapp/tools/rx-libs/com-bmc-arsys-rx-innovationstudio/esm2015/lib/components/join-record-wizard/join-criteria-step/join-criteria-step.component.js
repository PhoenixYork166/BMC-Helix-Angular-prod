import { Component, Injector } from '@angular/core';
import { RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { ExpressionOperatorGroup, ExpressionOperatorRowsByGroup } from '@helix/platform/shared/api';
import { RxExpressionEditorService, RxWizardModalComponent } from '@helix/platform/shared/components';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, filter, map, pluck, switchMap, take, tap } from 'rxjs/operators';
import { JoinCriteriaExpressionConfigurator } from './join-criteria-expression-configurator';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "@helix/platform/shared/components";
import * as i3 from "@helix/platform/record/api";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
export class JoinCriteriaStepComponent {
    constructor(injector, translateService, rxExpressionEditorService, rxWizardModalComponent, rxRecordDefinitionCacheService) {
        this.injector = injector;
        this.translateService = translateService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.isExpressionFormControlVisible = false;
        this.destroyed$ = new ReplaySubject(1);
        this.expressionFormControlLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.on-statement.label');
        this.expressionFormControlTooltip = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.on-statement.tooltip');
    }
    ngOnInit() {
        const primaryRecordDefinition$ = this.rxWizardModalComponent.context$.pipe(pluck('primaryRecordDefinitionName'), distinctUntilChanged(), filter(Boolean), switchMap((primaryRecordDefinitionName) => this.rxRecordDefinitionCacheService.getRecordDefinition(primaryRecordDefinitionName)));
        const secondaryRecordDefinition$ = this.rxWizardModalComponent.context$.pipe(pluck('secondaryRecordDefinitionName'), distinctUntilChanged(), filter(Boolean), switchMap((secondaryRecordDefinitionName) => this.rxRecordDefinitionCacheService.getRecordDefinition(secondaryRecordDefinitionName)));
        this.expressionOptions$ = combineLatest([primaryRecordDefinition$, secondaryRecordDefinition$]).pipe(tap(() => {
            this.isExpressionFormControlVisible = false;
            setTimeout(() => {
                this.isExpressionFormControlVisible = true;
            });
        }), map(([primaryRecordDefinition, secondaryRecordDefinition]) => {
            this.expressionConfigurator = new JoinCriteriaExpressionConfigurator(primaryRecordDefinition, secondaryRecordDefinition, this.injector);
            this.expressionConfigurator.configureForProperty({
                propertyPath: 'joinCriteria',
                operators: ExpressionOperatorRowsByGroup.get(ExpressionOperatorGroup.All)
            });
            return {
                dataDictionary$: this.expressionConfigurator.getDataDictionary('joinCriteria'),
                label: this.expressionFormControlLabel,
                tooltip: {
                    iconName: 'question_circle_o',
                    content: this.expressionFormControlTooltip
                },
                operators: this.expressionConfigurator.getOperators('joinCriteria')
            };
        }));
    }
    openEditor() {
        this.rxWizardModalComponent.context$
            .pipe(pluck('joinCriteria'), take(1), switchMap((joinCriteria) => this.rxExpressionEditorService.openEditor({
            property: {
                value: joinCriteria,
                path: 'joinCriteria',
                label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.on-statement.label')
            },
            expressionConfigurator: this.expressionConfigurator,
            legend: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.field.label'),
                    icon: 'd-icon-field_text'
                }
            ]
        })))
            .subscribe((expression) => {
            this.rxWizardModalComponent.api.updateContext({ joinCriteria: expression.value });
        });
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
/** @nocollapse */ JoinCriteriaStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JoinCriteriaStepComponent, deps: [{ token: i0.Injector }, { token: i1.TranslateService }, { token: i2.RxExpressionEditorService }, { token: i2.RxWizardModalComponent }, { token: i3.RxRecordDefinitionCacheService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ JoinCriteriaStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: JoinCriteriaStepComponent, selector: "ax-join-criteria-step", ngImport: i0, template: "<p>\n  {{ 'com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.info' | translate }}\n</p>\n\n<div *ngIf=\"expressionOptions$ | async as expressionOptions\">\n  <ng-container *ngIf=\"isExpressionFormControlVisible\">\n    <rx-expression-form-control\n      [ngModel]=\"(rxWizardModalComponent.context$ | async).joinCriteria\"\n      (events)=\"openEditor()\"\n      [options]=\"expressionOptions\"\n    ></rx-expression-form-control>\n  </ng-container>\n</div>\n", components: [{ type: i2.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i1.TranslatePipe, "async": i4.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JoinCriteriaStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-join-criteria-step',
                    templateUrl: 'join-criteria-step.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.TranslateService }, { type: i2.RxExpressionEditorService }, { type: i2.RxWizardModalComponent }, { type: i3.RxRecordDefinitionCacheService }]; } });
//# sourceMappingURL=join-criteria-step.component.js.map