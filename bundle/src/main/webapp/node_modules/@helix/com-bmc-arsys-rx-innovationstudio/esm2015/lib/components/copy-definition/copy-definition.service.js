import { Injectable } from '@angular/core';
import { CopyDefinitionComponent } from './copy-definition.component';
import { RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
export class RxCopyDefinitionService {
    constructor(rxModalService) {
        this.rxModalService = rxModalService;
    }
    openCopyDefinitionComponentModal(row, definitionType, editFragment) {
        return this.rxModalService.openModal({
            content: CopyDefinitionComponent,
            data: {
                definitionName: row.name,
                definitionType,
                editFragment
            },
            size: 'sm'
        });
    }
}
/** @nocollapse */ RxCopyDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCopyDefinitionService, deps: [{ token: i1.RxModalService }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ RxCopyDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCopyDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCopyDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }]; } });
//# sourceMappingURL=copy-definition.service.js.map