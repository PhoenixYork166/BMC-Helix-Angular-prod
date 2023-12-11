import { IDefinitionAdapter } from '@helix/platform/shared/api';
import { IContainerViewComponentDefinition, IViewComponentDefinition, IViewDefinition } from '@helix/platform/view/api';
import { IApplyGridFilterViewActionDesignProperties } from './apply-grid-filter-view-action.types';
import { RxRecordGridFilterHelperService } from '@helix/platform/view/components';
import { RxJsonParserService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export declare class RxApplyGridFilterViewActionDefinitionAdapterService implements IDefinitionAdapter<IViewComponentDefinition, IViewDefinition> {
    private rxJsonParserService;
    private rxRecordGridFilterHelperService;
    constructor(rxJsonParserService: RxJsonParserService, rxRecordGridFilterHelperService: RxRecordGridFilterHelperService);
    adaptDefinition({ componentDefinitions, propertiesByName }: IContainerViewComponentDefinition<IApplyGridFilterViewActionDesignProperties>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxApplyGridFilterViewActionDefinitionAdapterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxApplyGridFilterViewActionDefinitionAdapterService>;
}
