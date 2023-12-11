import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { DropComponentData } from './drop-component-data.class';
import * as i0 from "@angular/core";
export class ViewDesignerCanvasService {
    constructor() {
        this.componentSelectSubject = new ReplaySubject();
        this.componentRemoveSubject = new ReplaySubject();
        this.componentDropSubject = new ReplaySubject();
        this.componentDrop$ = this.componentDropSubject.asObservable();
        this.componentSelect$ = this.componentSelectSubject.asObservable();
        this.componentRemove$ = this.componentRemoveSubject.asObservable();
    }
    selectComponent(guid) {
        this.componentSelectSubject.next(guid);
    }
    removeComponent(guid) {
        this.componentRemoveSubject.next(guid);
    }
    dropComponent(data, targetGuid, outletName, insertIndex) {
        this.componentDropSubject.next(new DropComponentData(data, targetGuid, outletName, insertIndex));
    }
}
ViewDesignerCanvasService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerCanvasService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ViewDesignerCanvasService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerCanvasService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerCanvasService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=view-designer-canvas.service.js.map