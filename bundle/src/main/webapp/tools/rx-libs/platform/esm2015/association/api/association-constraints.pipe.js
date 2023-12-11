import { Pipe } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { find } from 'lodash';
import { RX_ASSOCIATION_DEFINITION } from './association-definition.constant';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
export class RxAssociationConstraintsPipe {
    constructor(translateService) {
        this.translateService = translateService;
    }
    transform(value) {
        return this.translateService.instant(find(RX_ASSOCIATION_DEFINITION.constraints, ['value', value]).nameKey);
    }
}
RxAssociationConstraintsPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationConstraintsPipe, deps: [{ token: i1.TranslateService }], target: i0.ɵɵFactoryTarget.Pipe });
RxAssociationConstraintsPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationConstraintsPipe, name: "rxAssociationConstraintsPipe" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationConstraintsPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'rxAssociationConstraintsPipe'
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }]; } });
//# sourceMappingURL=association-constraints.pipe.js.map