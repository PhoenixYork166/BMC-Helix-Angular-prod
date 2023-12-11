import { RxDefinitionNameService } from './definition-name.service';
import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./definition-name.service";
export class RxDefinitionNamePipe {
    constructor(rxDefinitionNameService) {
        this.rxDefinitionNameService = rxDefinitionNameService;
    }
    transform(value) {
        return this.rxDefinitionNameService.getDisplayName(value);
    }
}
RxDefinitionNamePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionNamePipe, deps: [{ token: i1.RxDefinitionNameService }], target: i0.ɵɵFactoryTarget.Pipe });
RxDefinitionNamePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionNamePipe, name: "rxDefinitionNamePipe" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionNamePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'rxDefinitionNamePipe'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDefinitionNameService }]; } });
//# sourceMappingURL=definition-name.pipe.js.map