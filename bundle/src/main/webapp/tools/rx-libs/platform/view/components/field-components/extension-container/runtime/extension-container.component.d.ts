import { OnInit } from '@angular/core';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { IRecordDefinition, RxRecordDefinitionCacheService, RxRecordDefinitionService } from '@helix/platform/record/api';
import { IRxExtensionContainerConfig } from './extension-container.types';
import * as i0 from "@angular/core";
export declare class RxExtensionContainerComponent extends BaseViewComponent implements OnInit {
    private rxRecordDefinitionCacheService;
    private rxRecordDefinitionService;
    recordDefinitions: {
        [name: string]: IRecordDefinition;
    };
    state: IRxExtensionContainerConfig;
    constructor(rxRecordDefinitionCacheService: RxRecordDefinitionCacheService, rxRecordDefinitionService: RxRecordDefinitionService);
    ngOnInit(): void;
    loadRecordDefinition(name: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxExtensionContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxExtensionContainerComponent, "rx-extension-container", never, {}, {}, never, never>;
}
