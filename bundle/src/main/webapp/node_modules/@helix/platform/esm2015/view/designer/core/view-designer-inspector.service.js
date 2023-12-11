import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class RxViewDesignerInspectorService {
    constructor() {
        this.onChangeSubject = new Subject();
        this.configs = new Map();
        this.onChange$ = this.onChangeSubject.asObservable();
    }
    clear() {
        this.configs.clear();
    }
    set(guid, config) {
        this.configs.set(guid, config);
        this.onChangeSubject.next({ guid, config });
    }
    get(guid) {
        return this.configs.get(guid);
    }
    delete(guid) {
        this.onChangeSubject.next({ guid, config: null });
        this.configs.delete(guid);
    }
}
RxViewDesignerInspectorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerInspectorService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDesignerInspectorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerInspectorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerInspectorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=view-designer-inspector.service.js.map