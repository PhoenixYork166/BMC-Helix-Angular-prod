import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptEmptyStateModule, AdaptIconModule, AdaptRxSearchModule } from '@bmc-ux/adapt-angular';
import { IconBrowserDialogComponent } from './icon-browser-dialog.component';
import * as i0 from "@angular/core";
export class IconBrowserDialogModule {
}
IconBrowserDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IconBrowserDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
IconBrowserDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IconBrowserDialogModule, declarations: [IconBrowserDialogComponent], imports: [CommonModule,
        ReactiveFormsModule,
        AdaptButtonModule,
        AdaptRxSearchModule,
        AdaptIconModule,
        AdaptEmptyStateModule], exports: [IconBrowserDialogComponent] });
IconBrowserDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IconBrowserDialogModule, imports: [[
            CommonModule,
            ReactiveFormsModule,
            AdaptButtonModule,
            AdaptRxSearchModule,
            AdaptIconModule,
            AdaptEmptyStateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IconBrowserDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        AdaptButtonModule,
                        AdaptRxSearchModule,
                        AdaptIconModule,
                        AdaptEmptyStateModule
                    ],
                    declarations: [IconBrowserDialogComponent],
                    exports: [IconBrowserDialogComponent]
                }]
        }] });
//# sourceMappingURL=icon-browser-dialog.module.js.map