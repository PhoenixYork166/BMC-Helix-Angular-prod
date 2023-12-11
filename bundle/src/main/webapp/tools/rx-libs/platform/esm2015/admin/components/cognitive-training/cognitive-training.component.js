import { Component } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { find } from 'lodash';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { RX_COGNITIVE_TRAINING } from './cognitive-training.constant';
import { RxCognitiveTrainingService } from './cognitive-training.service';
import { CognitiveTrainingTabNames } from './cognitive-training.types';
import * as i0 from "@angular/core";
import * as i1 from "./cognitive-training.service";
import * as i2 from "@helix/platform/shared/components";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "./components/cognitive-training-record-grid/cognitive-training-record-grid.component";
import * as i5 from "@angular/common";
import * as i6 from "@ngx-translate/core";
export class CognitiveTrainingAdminComponent extends BaseViewComponent {
    constructor(rxCognitiveTrainingService) {
        super();
        this.rxCognitiveTrainingService = rxCognitiveTrainingService;
        this.sections = RX_COGNITIVE_TRAINING.settings.sections;
        this.tabs = [
            RX_COGNITIVE_TRAINING.settings.tabs[CognitiveTrainingTabNames.DataSets],
            RX_COGNITIVE_TRAINING.settings.tabs[CognitiveTrainingTabNames.TestResults]
        ];
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        super.ngOnInit();
        this.busy = this.rxCognitiveTrainingService
            .getClassificationServiceProvider()
            .pipe(takeUntil(this.destroyed$))
            .subscribe((classificationServiceProvider) => {
            this.trainingType = RX_COGNITIVE_TRAINING.settings.trainingTypes[classificationServiceProvider.value];
            find(this.sections, {
                evaluationName: RX_COGNITIVE_TRAINING.settings.evaluations.autoClassificationTrainingAndEvaluation.name
            }).title = this.trainingType.title;
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
CognitiveTrainingAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveTrainingAdminComponent, deps: [{ token: i1.RxCognitiveTrainingService }], target: i0.ɵɵFactoryTarget.Component });
CognitiveTrainingAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CognitiveTrainingAdminComponent, selector: "rx-admin-cognitive-training", usesInheritance: true, ngImport: i0, template: "<rx-admin-settings header=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-training.header.title' | translate }}\">\n  <adapt-accordion multiselect=\"true\">\n    <adapt-accordion-tab\n      *ngFor=\"let section of sections\"\n      [title]=\"section.title | translate\"\n      [isOpen]=\"section.isExpanded\"\n    >\n      <adapt-tabset *ngIf=\"trainingType\">\n        <adapt-tab-panel *ngFor=\"let tab of tabs\" [adapt-tab-title]=\"tab.title | translate\">\n          <rx-cognitive-training-record-grid\n            [evaluationName]=\"section.evaluationName\"\n            [tab]=\"tab\"\n            [recordDefinitionName]=\"tab.recordDefinitionName\"\n            [trainingType]=\"trainingType\"\n          >\n          </rx-cognitive-training-record-grid>\n        </adapt-tab-panel>\n      </adapt-tabset>\n    </adapt-accordion-tab>\n  </adapt-accordion>\n</rx-admin-settings>\n", components: [{ type: i2.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i3.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i3.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i3.AdaptTabsComponent, selector: "adapt-tabset", inputs: ["showTabToolbar", "customCssTabContent", "fullHeight", "texts", "enableDnD", "customClassTabList", "allow-tabs-adding", "id", "testID", "dropdown-title", "fadeColor", "carouselMode", "justify", "type", "tab-active"], outputs: ["tab-index-closed", "tab-active-changed", "add-tab-clicked", "tabClicked", "tabDropped"], exportAs: ["adaptTabset"] }, { type: i3.AdaptTabsPanelComponent, selector: "adapt-tab-panel, div[tab-panel]", inputs: ["isActive", "badge-type", "animateBadge", "showBadgeAlert", "badgeAlertVariant", "badgeCustomClass", "adapt-tab-title", "disabled", "isHidden", "icon", "subtext", "icon-right", "icon-close", "aria-label", "aria-labelledby", "kebabMenu", "id", "renderContentWhenInactive", "badge"] }, { type: i4.CognitiveTrainingRecordGridComponent, selector: "rx-cognitive-training-record-grid", inputs: ["tab", "evaluationName", "recordDefinitionName", "trainingType"] }], directives: [{ type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i6.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveTrainingAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-cognitive-training',
                    templateUrl: './cognitive-training.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxCognitiveTrainingService }]; } });
//# sourceMappingURL=cognitive-training.component.js.map