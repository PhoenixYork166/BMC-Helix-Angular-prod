import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDefinitionTabComponent } from './event-definition-tab.component';
import { DefinitionTabModule } from '../definition-tab/definition-tab.module';
import { RxDefinitionModule } from '@helix/platform/shared/api';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export class EventDefinitionTabModule {
}
/** @nocollapse */ EventDefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EventDefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ EventDefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EventDefinitionTabModule, declarations: [EventDefinitionTabComponent], imports: [CommonModule, DefinitionTabModule, RxDefinitionModule, TranslateModule], exports: [EventDefinitionTabComponent] });
/** @nocollapse */ EventDefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EventDefinitionTabModule, imports: [[CommonModule, DefinitionTabModule, RxDefinitionModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EventDefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [EventDefinitionTabComponent],
                    imports: [CommonModule, DefinitionTabModule, RxDefinitionModule, TranslateModule],
                    exports: [EventDefinitionTabComponent]
                }]
        }] });
//# sourceMappingURL=event-definition-tab.module.js.map