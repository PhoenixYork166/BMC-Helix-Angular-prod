import { Pipe } from '@angular/core';
import { RX_RECORD_DEFINITION } from './record-definition.constant';
import * as i0 from "@angular/core";
export class RxRecordDefinitionResourceTypePipe {
    transform(value) {
        var _a;
        const resourceType = RX_RECORD_DEFINITION.resourceTypesByFullName[value];
        return ((_a = RX_RECORD_DEFINITION.dataTypes[resourceType]) === null || _a === void 0 ? void 0 : _a.displayName) || '';
    }
}
RxRecordDefinitionResourceTypePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionResourceTypePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
RxRecordDefinitionResourceTypePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionResourceTypePipe, name: "rxRecordDefinitionResourceType" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionResourceTypePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'rxRecordDefinitionResourceType'
                }]
        }] });
//# sourceMappingURL=record-definition-resource-type.pipe.js.map