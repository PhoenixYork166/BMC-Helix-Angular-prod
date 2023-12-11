import { RxNotificationService } from './notification.service';
import * as i0 from "@angular/core";
import * as i1 from "./notification-component/notification.component";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
import * as i4 from "@ngx-translate/core";
export declare class RxNotificationModule {
    private rxNotificationService;
    constructor(rxNotificationService: RxNotificationService);
    static ɵfac: i0.ɵɵFactoryDeclaration<RxNotificationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RxNotificationModule, [typeof i1.RxNotificationComponent], [typeof i2.AdaptToastModule, typeof i3.CommonModule, typeof i4.TranslateModule], [typeof i1.RxNotificationComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RxNotificationModule>;
}
