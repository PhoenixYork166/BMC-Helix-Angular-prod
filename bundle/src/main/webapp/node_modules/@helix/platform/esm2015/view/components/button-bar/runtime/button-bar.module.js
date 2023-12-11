import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdaptDropdownModule } from '@bmc-ux/adapt-angular';
import { RuntimeViewCanvasModule } from '@helix/platform/view/runtime';
import { ButtonBarComponent } from './button-bar.component';
import { ButtonBarDropdownItemComponent } from './components/button-bar-dropdown-item/button-bar-dropdown-item.component';
import { RxButtonBarService } from '../button-bar.service';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
export class ButtonBarModule {
}
ButtonBarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ButtonBarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ButtonBarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ButtonBarModule, declarations: [ButtonBarComponent, ButtonBarDropdownItemComponent], imports: [CommonModule, RuntimeViewCanvasModule, i1.AdaptDropdownModule], exports: [ButtonBarComponent] });
ButtonBarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ButtonBarModule, providers: [RxButtonBarService], imports: [[CommonModule, RuntimeViewCanvasModule, AdaptDropdownModule.forRoot()]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ButtonBarModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ButtonBarComponent, ButtonBarDropdownItemComponent],
                    imports: [CommonModule, RuntimeViewCanvasModule, AdaptDropdownModule.forRoot()],
                    exports: [ButtonBarComponent],
                    entryComponents: [ButtonBarComponent],
                    providers: [RxButtonBarService]
                }]
        }] });
//# sourceMappingURL=button-bar.module.js.map