import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class RxViewDesignerModels {
    constructor() {
        this.models = new Map();
    }
    clear() {
        this.models.clear();
    }
    set(guid, model) {
        this.models.set(guid, model);
    }
    get(guid) {
        return this.models.get(guid);
    }
    delete(guid) {
        this.models.delete(guid);
    }
}
RxViewDesignerModels.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerModels, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDesignerModels.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerModels, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerModels, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=view-designer-models.service.js.map