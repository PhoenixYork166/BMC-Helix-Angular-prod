import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { IValidationIssue } from '@helix/platform/ui-kit';
import { RxStringService } from '@helix/platform/utils';
import { IFormBuilderConfig, RxDefinitionNameService, IPlainObject } from '@helix/platform/shared/api';
import { IProcessDefinition } from '@helix/platform/process/api';
import { IProcessDefinitionModel } from './process.types';
import { RxProcess } from './process.class';
import * as i0 from "@angular/core";
export declare class RxProcessService {
    private rxDefinitionNameService;
    private rxStringService;
    private translateService;
    constructor(rxDefinitionNameService: RxDefinitionNameService, rxStringService: RxStringService, translateService: TranslateService);
    getDefinitionFromModel(definitionModel: IProcessDefinitionModel): Partial<IProcessDefinition>;
    getInspectorConfig(definitionModel: IProcessDefinitionModel): IFormBuilderConfig;
    getModelFromDefinition(definition: IProcessDefinition, bundleId: string): IProcessDefinitionModel;
    getShape(options: IPlainObject): RxProcess;
    validate(definitionModel: IProcessDefinitionModel, availableCells: any[]): Observable<IValidationIssue[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxProcessService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxProcessService>;
}
