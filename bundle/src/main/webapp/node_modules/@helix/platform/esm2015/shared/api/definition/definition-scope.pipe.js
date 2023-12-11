import { Pipe } from '@angular/core';
import { RxDefinitionService } from './definition.service';
import * as i0 from "@angular/core";
import * as i1 from "./definition.service";
export class RxDefinitionScopePipe {
    constructor(rxDefinitionService) {
        this.rxDefinitionService = rxDefinitionService;
    }
    transform(value, bundleDescriptor) {
        return this.rxDefinitionService.getScopeName(value, bundleDescriptor);
    }
}
RxDefinitionScopePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionScopePipe, deps: [{ token: i1.RxDefinitionService }], target: i0.ɵɵFactoryTarget.Pipe });
RxDefinitionScopePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionScopePipe, name: "rxDefinitionScopePipe" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionScopePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'rxDefinitionScopePipe'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDefinitionService }]; } });
//# sourceMappingURL=definition-scope.pipe.js.map