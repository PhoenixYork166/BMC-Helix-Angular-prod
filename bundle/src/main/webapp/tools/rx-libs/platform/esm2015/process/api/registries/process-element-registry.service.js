import { Injectable } from '@angular/core';
import { RxLogService } from '@helix/platform/shared/api';
import { RX_PROCESS_DEFINITION } from '../process-definition.constant';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
export class RxProcessElementRegistryService {
    constructor(rxLogService) {
        this.rxLogService = rxLogService;
        this.elementDescriptors = new Map();
    }
    get(type) {
        var _a;
        return ((_a = this.elementDescriptors.get(type)) !== null && _a !== void 0 ? _a : this.elementDescriptors.get(RX_PROCESS_DEFINITION.processElementTypes.processAction));
    }
    getAll() {
        return Array.from(this.elementDescriptors.values());
    }
    register(descriptor) {
        if (this.elementDescriptors.has(descriptor.type)) {
            this.rxLogService.warning(`Process element ${descriptor.type} is already registered.`);
        }
        else {
            joint.util.setByPath(joint.shapes.rx, descriptor.shapeType, descriptor.shapeClass, '.');
            joint.util.setByPath(joint.shapes.rx, descriptor.viewShapeType, descriptor.viewShapeClass, '.');
            this.elementDescriptors.set(descriptor.type, descriptor);
        }
    }
}
RxProcessElementRegistryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementRegistryService, deps: [{ token: i1.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
RxProcessElementRegistryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementRegistryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementRegistryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxLogService }]; } });
//# sourceMappingURL=process-element-registry.service.js.map