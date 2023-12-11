import { IViewDefinition, RxDeviceDetectionService } from '@helix/platform/view/api';
import { RxJsonParserService, RxObjectUtilsService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export declare class RxViewDefinitionAdapterService {
    private rxObjectUtilsService;
    private rxJsonParserService;
    private rxDeviceDetectionService;
    constructor(rxObjectUtilsService: RxObjectUtilsService, rxJsonParserService: RxJsonParserService, rxDeviceDetectionService: RxDeviceDetectionService);
    preProcessViewDefinition(viewDefinition: IViewDefinition): void;
    postProcessViewDefinition(viewDefinition: IViewDefinition): void;
    private expandProperties;
    private filterComponentsForDevice;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxViewDefinitionAdapterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxViewDefinitionAdapterService>;
}
