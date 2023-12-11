import { Injectable } from '@angular/core';
import { ContainerComponentDefinitionAdapterService } from '../../../container/runtime/container-component-definition-adapter.service';
import { RxJsonParserService } from '@helix/platform/utils';
import { RxViewComponentType, RxViewDefinitionParserService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "@helix/platform/utils";
export class RxTabContainerComponentDefinitionAdapterService extends ContainerComponentDefinitionAdapterService {
    constructor(viewDefinitionParserService, rxJsonParserService) {
        super(viewDefinitionParserService, rxJsonParserService);
        this.componentDefinitionType = RxViewComponentType.TabContainer;
    }
}
RxTabContainerComponentDefinitionAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTabContainerComponentDefinitionAdapterService, deps: [{ token: i1.RxViewDefinitionParserService }, { token: i2.RxJsonParserService }], target: i0.ɵɵFactoryTarget.Injectable });
RxTabContainerComponentDefinitionAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTabContainerComponentDefinitionAdapterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTabContainerComponentDefinitionAdapterService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxViewDefinitionParserService }, { type: i2.RxJsonParserService }]; } });
//# sourceMappingURL=tab-container-component-definition-adapter.service.js.map