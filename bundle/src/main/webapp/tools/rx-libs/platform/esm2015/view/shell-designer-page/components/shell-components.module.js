import { NgModule } from '@angular/core';
import { RxShellDesignModule } from './shell/shell-design.module';
import { RxShellMenuItemDesignModule } from './shell-menu-item/shell-menu-item-design.module';
import { RxShellMenuGroupDesignModule } from './shell-menu-group/shell-menu-group-design.module';
import { RxShellUserMenuDesignModule } from './shell-user-menu/shell-user-menu-design.module';
import { RxShellActionDesignModule } from './shell-action/shell-action-design.module';
import * as i0 from "@angular/core";
export class RxShellComponentsModule {
}
RxShellComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxShellComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellComponentsModule, imports: [RxShellDesignModule,
        RxShellMenuItemDesignModule,
        RxShellMenuGroupDesignModule,
        RxShellUserMenuDesignModule,
        RxShellActionDesignModule] });
RxShellComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellComponentsModule, imports: [[
            RxShellDesignModule,
            RxShellMenuItemDesignModule,
            RxShellMenuGroupDesignModule,
            RxShellUserMenuDesignModule,
            RxShellActionDesignModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [],
                    imports: [
                        RxShellDesignModule,
                        RxShellMenuItemDesignModule,
                        RxShellMenuGroupDesignModule,
                        RxShellUserMenuDesignModule,
                        RxShellActionDesignModule
                    ]
                }]
        }] });
//# sourceMappingURL=shell-components.module.js.map