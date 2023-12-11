import { Pipe } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
export class RxBooleanPipe {
    constructor(translateService) {
        this.translateService = translateService;
    }
    transform(value, trueValueParam, falseValueParam) {
        const trueValueTranslation = this.translateService.instant('com.bmc.arsys.rx.client.common.true');
        const falseValueTranslation = this.translateService.instant('com.bmc.arsys.rx.client.common.false');
        let outputValue = value;
        switch (value) {
            case '1':
            case true:
            case 1: {
                outputValue = trueValueParam || trueValueTranslation;
                break;
            }
            case '0':
            case false:
            case 0: {
                outputValue = falseValueParam || falseValueTranslation;
                break;
            }
        }
        return outputValue;
    }
}
RxBooleanPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanPipe, deps: [{ token: i1.TranslateService }], target: i0.ɵɵFactoryTarget.Pipe });
RxBooleanPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanPipe, name: "rxBoolean" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'rxBoolean'
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }]; } });
//# sourceMappingURL=boolean.pipe.js.map