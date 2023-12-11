import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class RuntimeViewCanvasService {
    constructor() {
        this.componentPropertyChangedSubject = new Subject();
        this.componentPropertyChanged$ = this.componentPropertyChangedSubject.asObservable();
    }
    onViewComponentPropertyChanged(componentPropertyChange) {
        this.componentPropertyChangedSubject.next(componentPropertyChange);
    }
}
RuntimeViewCanvasService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RuntimeViewCanvasService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=runtime-view-canvas.service.js.map