import { Injectable, Injector } from '@angular/core';
import { isFunction, omit } from 'lodash';
import { ActionSandbox } from '../../action-sandbox/action-sandbox.class';
import { RxViewDesignerDefaultActionModel } from '../../model/view-designer-default-action-model.class';
import * as i0 from "@angular/core";
export class RxActionListModelManagerService {
    constructor(injector) {
        this.injector = injector;
        this.models = new Map();
    }
    create(descriptor, guid, initialProps) {
        var _a;
        const sandbox = new ActionSandbox(this.injector, descriptor, guid, isFunction((_a = descriptor === null || descriptor === void 0 ? void 0 : descriptor.designModel) === null || _a === void 0 ? void 0 : _a.getInitialProperties)
            ? Object.assign(Object.assign({}, descriptor.designModel.getInitialProperties(omit(initialProps, ['index', 'name']))), { name: initialProps.name, index: initialProps.index }) : initialProps);
        const Model = descriptor.designModel || RxViewDesignerDefaultActionModel;
        const actionModel = new Model(this.injector, sandbox);
        this.models.set(guid, actionModel);
        return actionModel;
    }
    remove(guid) {
        this.models.delete(guid);
    }
    get(guid) {
        return this.models.get(guid);
    }
    ngOnDestroy() {
        this.models.forEach((model) => model.sandbox.onDestroy());
        this.models.clear();
    }
}
RxActionListModelManagerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxActionListModelManagerService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxActionListModelManagerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxActionListModelManagerService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxActionListModelManagerService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=action-list-model-manager.service.js.map