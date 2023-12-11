import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabPanelDesignComponent } from './tab-panel-design.component';
import { ViewDesignerCanvasModule } from '@helix/platform/view/designer';
import { AdaptButtonModule, AdaptTabsModule } from '@bmc-ux/adapt-angular';
import { TabContainerDesignComponent } from './tab-container-design/tab-container-design.component';
import * as i0 from "@angular/core";
export class TabPanelDesignModule {
}
TabPanelDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TabPanelDesignModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TabPanelDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TabPanelDesignModule, declarations: [TabPanelDesignComponent, TabContainerDesignComponent], imports: [CommonModule, AdaptButtonModule, AdaptTabsModule, ViewDesignerCanvasModule] });
TabPanelDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TabPanelDesignModule, imports: [[CommonModule, AdaptButtonModule, AdaptTabsModule, ViewDesignerCanvasModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TabPanelDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [TabPanelDesignComponent, TabContainerDesignComponent],
                    entryComponents: [TabPanelDesignComponent, TabContainerDesignComponent],
                    imports: [CommonModule, AdaptButtonModule, AdaptTabsModule, ViewDesignerCanvasModule]
                }]
        }] });
//# sourceMappingURL=tab-panel-design.module.js.map