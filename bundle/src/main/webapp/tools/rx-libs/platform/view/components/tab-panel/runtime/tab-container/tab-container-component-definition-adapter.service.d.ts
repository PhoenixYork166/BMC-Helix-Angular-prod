import { ContainerComponentDefinitionAdapterService } from '../../../container/runtime/container-component-definition-adapter.service';
import { RxJsonParserService } from '@helix/platform/utils';
import { RxViewDefinitionParserService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export declare class RxTabContainerComponentDefinitionAdapterService extends ContainerComponentDefinitionAdapterService {
    constructor(viewDefinitionParserService: RxViewDefinitionParserService, rxJsonParserService: RxJsonParserService);
    static ɵfac: i0.ɵɵFactoryDeclaration<RxTabContainerComponentDefinitionAdapterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxTabContainerComponentDefinitionAdapterService>;
}
