import { NgModule } from '@angular/core';
import * as i0 from "@angular/core";
export class ViewModule {
    static registerComponents(components) {
        return {
            ngModule: ViewModule,
            providers: [
                {
                    provide: 'components',
                    useValue: [...components]
                }
            ]
        };
    }
}
ViewModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ViewModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewModule });
ViewModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewModule, decorators: [{
            type: NgModule
        }] });
//# sourceMappingURL=view.module.js.map