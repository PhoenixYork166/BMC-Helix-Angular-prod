import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class RxAssociatedRecordFieldNamePipe {
    transform(value, associatedRecordFieldNames) {
        return (associatedRecordFieldNames === null || associatedRecordFieldNames === void 0 ? void 0 : associatedRecordFieldNames[value]) || value;
    }
}
RxAssociatedRecordFieldNamePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociatedRecordFieldNamePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
RxAssociatedRecordFieldNamePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociatedRecordFieldNamePipe, name: "rxAssociatedRecordFieldNamePipe" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociatedRecordFieldNamePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'rxAssociatedRecordFieldNamePipe'
                }]
        }] });
//# sourceMappingURL=associated-record-field-name.pipe.js.map