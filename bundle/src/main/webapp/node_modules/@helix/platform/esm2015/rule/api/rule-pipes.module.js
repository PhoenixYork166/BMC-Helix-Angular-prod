import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxRuleTriggerEventPipe } from './rule-trigger-event.pipe';
import { RxRuleTriggerTimeCriteriaDisplayValuePipe } from './rule-trigger-time-criteria-display-value.pipe';
import * as i0 from "@angular/core";
export class RxRulePipesModule {
}
RxRulePipesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRulePipesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxRulePipesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRulePipesModule, declarations: [RxRuleTriggerEventPipe, RxRuleTriggerTimeCriteriaDisplayValuePipe], imports: [CommonModule], exports: [RxRuleTriggerEventPipe, RxRuleTriggerTimeCriteriaDisplayValuePipe] });
RxRulePipesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRulePipesModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRulePipesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [RxRuleTriggerEventPipe, RxRuleTriggerTimeCriteriaDisplayValuePipe],
                    exports: [RxRuleTriggerEventPipe, RxRuleTriggerTimeCriteriaDisplayValuePipe]
                }]
        }] });
//# sourceMappingURL=rule-pipes.module.js.map