import { Pipe } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { find } from 'lodash';
import { RX_ASSOCIATION_DEFINITION } from './association-definition.constant';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
export class RxAssociationCardinalityPipe {
    constructor(translateService) {
        this.translateService = translateService;
    }
    transform(value) {
        return this.translateService.instant(find(RX_ASSOCIATION_DEFINITION.cardinality, ['value', value]).labelKey);
    }
}
RxAssociationCardinalityPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationCardinalityPipe, deps: [{ token: i1.TranslateService }], target: i0.ɵɵFactoryTarget.Pipe });
RxAssociationCardinalityPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationCardinalityPipe, name: "rxAssociationCardinalityPipe" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationCardinalityPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'rxAssociationCardinalityPipe'
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }]; } });
//# sourceMappingURL=association-cardinality.pipe.js.map