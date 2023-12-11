import { Injector } from '@angular/core';
import { IFormWidgetBuilderConfig } from '@helix/platform/shared/api';
import { RxProcessDefinitionService } from '@helix/platform/process/api';
import { RxProcessActionService } from '@helix/platform/process/elements';
import * as i0 from "@angular/core";
export declare class RxCreateListProcessActionService extends RxProcessActionService {
    private rxProcessDefinitionService;
    protected injector: Injector;
    constructor(rxProcessDefinitionService: RxProcessDefinitionService, injector: Injector);
    getInputMapInspectorWidgetConfig(): IFormWidgetBuilderConfig;
    getElementType(actionTypeName: string): string;
    getClass(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxCreateListProcessActionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxCreateListProcessActionService>;
}
