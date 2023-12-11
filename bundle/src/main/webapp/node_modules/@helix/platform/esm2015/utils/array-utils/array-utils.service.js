import { Injectable } from '@angular/core';
import { isEmpty } from '@bmc-ux/adapt-angular';
import { cloneDeep, forEach, forEachRight, uniq } from 'lodash';
import * as i0 from "@angular/core";
export class RxArrayUtilsService {
    moveArrayElements(source, elementIndexesToMove, delta) {
        source = cloneDeep(source);
        elementIndexesToMove = uniq(elementIndexesToMove.sort((a, b) => a - b));
        if (delta !== 0 && !isEmpty(elementIndexesToMove)) {
            if (delta > 0) {
                if (elementIndexesToMove[elementIndexesToMove.length - 1] < source.length - 1) {
                    forEachRight(elementIndexesToMove, (indexToMove) => {
                        source.splice(indexToMove + delta, 0, source.splice(indexToMove, 1)[0]);
                    });
                }
            }
            else {
                if (elementIndexesToMove[0] > 0) {
                    forEach(elementIndexesToMove, (indexToMove) => {
                        source.splice(indexToMove + delta, 0, source.splice(indexToMove, 1)[0]);
                    });
                }
            }
        }
        return source;
    }
}
RxArrayUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxArrayUtilsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxArrayUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxArrayUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxArrayUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=array-utils.service.js.map