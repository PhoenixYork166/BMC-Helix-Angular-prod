import { Pipe } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RX_OVERLAY } from './overlay.constant';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
export class RxCustomizationStatusPipe {
    constructor(translateService) {
        this.translateService = translateService;
    }
    transform(value) {
        switch (value) {
            case RX_OVERLAY.customizationPerspective.createdInThisOverlayGroup:
                return this.translateService.instant('com.bmc.arsys.rx.innovation-studio.customization-status.created-in-this-overlay-group.label');
            case RX_OVERLAY.customizationPerspective.customizedInThisOverlayGroup:
                return this.translateService.instant('com.bmc.arsys.rx.innovation-studio.customization-status.customized-in-this-overlay-group.label');
            case RX_OVERLAY.customizationPerspective.notCustomizedInThisOverlayGroup:
                return this.translateService.instant('com.bmc.arsys.rx.innovation-studio.customization-status.not-customized-in-this-overlay-group.label');
            default:
                return '';
        }
    }
}
RxCustomizationStatusPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCustomizationStatusPipe, deps: [{ token: i1.TranslateService }], target: i0.ɵɵFactoryTarget.Pipe });
RxCustomizationStatusPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCustomizationStatusPipe, name: "rxCustomizationStatus" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCustomizationStatusPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'rxCustomizationStatus'
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }]; } });
//# sourceMappingURL=customization-status.pipe.js.map