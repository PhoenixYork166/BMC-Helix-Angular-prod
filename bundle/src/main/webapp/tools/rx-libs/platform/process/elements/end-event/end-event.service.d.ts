import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { IValidationIssue } from '@helix/platform/ui-kit';
import { RxStringService } from '@helix/platform/utils';
import { IDataDictionaryBranch, IDesignerElementService, IFormBuilderConfig, IPlainObject } from '@helix/platform/shared/api';
import { IProcessFlowElementDefinition } from '@helix/platform/process/api';
import { IEndEventModel } from './end-event.interfaces';
import * as i0 from "@angular/core";
export declare class RxEndEventService implements IDesignerElementService<IProcessFlowElementDefinition, IEndEventModel> {
    private rxStringService;
    private translateService;
    constructor(rxStringService: RxStringService, translateService: TranslateService);
    getDefinitionFromModel(model: IEndEventModel): Partial<IProcessFlowElementDefinition>;
    getInspectorConfig(): IFormBuilderConfig;
    getModelFromDefinition(definition?: IProcessFlowElementDefinition): IEndEventModel;
    getShape(options: IPlainObject): any;
    setCommonDataDictionaryBranch(guid: string, dataDictionaryBranch: Observable<IDataDictionaryBranch>): void;
    validate(model: IEndEventModel, availableCells: any): Observable<IValidationIssue[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxEndEventService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxEndEventService>;
}
