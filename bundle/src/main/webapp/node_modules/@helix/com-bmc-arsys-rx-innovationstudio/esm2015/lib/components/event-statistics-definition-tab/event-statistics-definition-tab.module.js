import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventStatisticsDefinitionTabComponent } from './event-statistics-definition-tab.component';
import { DefinitionTabModule } from '../definition-tab/definition-tab.module';
import { RxDefinitionModule } from '@helix/platform/shared/api';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export class EventStatisticsDefinitionTabModule {
}
/** @nocollapse */ EventStatisticsDefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EventStatisticsDefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ EventStatisticsDefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EventStatisticsDefinitionTabModule, declarations: [EventStatisticsDefinitionTabComponent], imports: [CommonModule, DefinitionTabModule, RxDefinitionModule, TranslateModule], exports: [EventStatisticsDefinitionTabComponent] });
/** @nocollapse */ EventStatisticsDefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EventStatisticsDefinitionTabModule, imports: [[CommonModule, DefinitionTabModule, RxDefinitionModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EventStatisticsDefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [EventStatisticsDefinitionTabComponent],
                    imports: [CommonModule, DefinitionTabModule, RxDefinitionModule, TranslateModule],
                    exports: [EventStatisticsDefinitionTabComponent]
                }]
        }] });
//# sourceMappingURL=event-statistics-definition-tab.module.js.map