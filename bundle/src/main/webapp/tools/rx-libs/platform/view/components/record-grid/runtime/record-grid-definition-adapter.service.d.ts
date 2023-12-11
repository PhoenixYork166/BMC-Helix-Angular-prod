import { IDefinitionAdapter } from '@helix/platform/shared/api';
import { IContainerViewComponentDefinition, IViewDefinition, RxViewDefinitionParserService } from '@helix/platform/view/api';
import { RxJsonParserService } from '@helix/platform/utils';
import { RxRecordGridConfigUtilsService } from '../runtime/services/record-grid-config-utils.service';
import * as i0 from "@angular/core";
export declare class RxRecordGridDefinitionAdapterService implements IDefinitionAdapter<IContainerViewComponentDefinition, IViewDefinition> {
    private viewDefinitionParserService;
    private rxJsonParserService;
    private rxRecordGridConfigUtilsService;
    constructor(viewDefinitionParserService: RxViewDefinitionParserService, rxJsonParserService: RxJsonParserService, rxRecordGridConfigUtilsService: RxRecordGridConfigUtilsService);
    adaptDefinition(recordGridContainerViewComponentDefinition: IContainerViewComponentDefinition, viewDefinition: IViewDefinition): void;
    private getActionButtonsForOutlet;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRecordGridDefinitionAdapterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRecordGridDefinitionAdapterService>;
}
