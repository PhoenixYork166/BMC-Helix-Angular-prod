import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/components";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "./document-tone-analysis/document-tone-analysis.component";
import * as i4 from "./user-engagement-tone-analysis/user-engagement-tone-analysis.component";
import * as i5 from "@ngx-translate/core";
export class ToneAnalysisTestingAdminComponent {
}
ToneAnalysisTestingAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ToneAnalysisTestingAdminComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ToneAnalysisTestingAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ToneAnalysisTestingAdminComponent, selector: "rx-tone-analysis-testing", ngImport: i0, template: "<rx-admin-settings header=\"Tone analysis testing\">\n  <adapt-tabset [fullHeight]=\"true\">\n    <adapt-tab-panel\n      adapt-tab-title=\"{{\n        'com.bmc.arsys.rx.client.admin.tone-analysis-testing.document-tone-analysis.title' | translate\n      }}\"\n    >\n      <rx-document-tone-analysis></rx-document-tone-analysis>\n    </adapt-tab-panel>\n    <adapt-tab-panel\n      adapt-tab-title=\"{{\n        'com.bmc.arsys.rx.client.admin.tone-analysis-testing.user-engagement-tone-analysis.title' | translate\n      }}\"\n    >\n      <rx-user-engagement-tone-analysis></rx-user-engagement-tone-analysis>\n    </adapt-tab-panel>\n  </adapt-tabset>\n</rx-admin-settings>\n", components: [{ type: i1.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i2.AdaptTabsComponent, selector: "adapt-tabset", inputs: ["showTabToolbar", "customCssTabContent", "fullHeight", "texts", "enableDnD", "customClassTabList", "allow-tabs-adding", "id", "testID", "dropdown-title", "fadeColor", "carouselMode", "justify", "type", "tab-active"], outputs: ["tab-index-closed", "tab-active-changed", "add-tab-clicked", "tabClicked", "tabDropped"], exportAs: ["adaptTabset"] }, { type: i2.AdaptTabsPanelComponent, selector: "adapt-tab-panel, div[tab-panel]", inputs: ["isActive", "badge-type", "animateBadge", "showBadgeAlert", "badgeAlertVariant", "badgeCustomClass", "adapt-tab-title", "disabled", "isHidden", "icon", "subtext", "icon-right", "icon-close", "aria-label", "aria-labelledby", "kebabMenu", "id", "renderContentWhenInactive", "badge"] }, { type: i3.DocumentToneAnalysisComponent, selector: "rx-document-tone-analysis" }, { type: i4.UserEngagementToneAnalysisComponent, selector: "rx-user-engagement-tone-analysis" }], pipes: { "translate": i5.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ToneAnalysisTestingAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-tone-analysis-testing',
                    templateUrl: './tone-analysis-testing.component.html'
                }]
        }] });
//# sourceMappingURL=tone-analysis-testing.component.js.map