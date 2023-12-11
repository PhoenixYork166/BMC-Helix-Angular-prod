import { DataPage } from '@helix/platform/shared/api';
import { Injectable, Injector } from '@angular/core';
import * as i0 from "@angular/core";
const userMessageDataPageQuery = 'com.bmc.arsys.rx.application.usermessage.datapage.UserMessageDataPageQuery';
export class RxUserMessageDataPageService extends DataPage {
    constructor(injector) {
        super(injector, userMessageDataPageQuery);
        this.injector = injector;
    }
}
RxUserMessageDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserMessageDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxUserMessageDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserMessageDataPageService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserMessageDataPageService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=user-message-data-page.service.js.map