import { Pipe } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RX_RECORD_DEFINITION } from './record-definition.constant';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
export class RxRecordDefinitionFieldOptionPipe {
    constructor(translateService) {
        this.translateService = translateService;
    }
    transform(value) {
        let fieldOption;
        if (value === RX_RECORD_DEFINITION.fieldOptions.required) {
            fieldOption = this.translateService.instant('com.bmc.arsys.rx.client.common.yes.label');
        }
        else if (value === RX_RECORD_DEFINITION.fieldOptions.optional) {
            fieldOption = this.translateService.instant('com.bmc.arsys.rx.client.common.no.label');
        }
        else if (value === RX_RECORD_DEFINITION.fieldOptions.system) {
            fieldOption = `${this.translateService.instant('com.bmc.arsys.rx.client.common.yes.label')} (${this.translateService.instant('com.bmc.arsys.rx.client.field-definition.type.system.label')})`;
        }
        return fieldOption;
    }
}
RxRecordDefinitionFieldOptionPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionFieldOptionPipe, deps: [{ token: i1.TranslateService }], target: i0.ɵɵFactoryTarget.Pipe });
RxRecordDefinitionFieldOptionPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionFieldOptionPipe, name: "rxRecordDefinitionFieldOption" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionFieldOptionPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'rxRecordDefinitionFieldOption'
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }]; } });
//# sourceMappingURL=record-definition-field-option.pipe.js.map