import { Injectable } from '@angular/core';
import { isFunction } from 'lodash';
import { EMPTY, isObservable, throwError } from 'rxjs';
import { RxError } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export class RxSetPropertyViewActionService {
    execute(params) {
        let executionResult = throwError(new RxError('rxSetPropertyAction: component is not specified.'));
        if (params.componentApi && isFunction(params.componentApi.setProperty) && params.propertyPath) {
            // Extract <Path> from  ${view.components.<ID>.<Path>}
            const matches = params.propertyPath.match(/^\$\{view\.components\.[0-9a-z-]+\.(.+)}$/);
            if (matches && matches[1]) {
                executionResult = params.componentApi.setProperty(matches[1], params.propertyValue);
            }
        }
        return isObservable(executionResult) ? executionResult : EMPTY;
    }
}
RxSetPropertyViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSetPropertyViewActionService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxSetPropertyViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSetPropertyViewActionService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSetPropertyViewActionService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=set-property-view-action.service.js.map