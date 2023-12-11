import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
// TODO-VS: do not provide in root
export class RxCommandManagerService {
    // TODO-VS: update types
    get() {
        return this.commandManager;
    }
    // TODO-VS: update types
    set(commandManager) {
        this.commandManager = commandManager;
    }
}
RxCommandManagerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCommandManagerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxCommandManagerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCommandManagerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCommandManagerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=command-manager.service.js.map