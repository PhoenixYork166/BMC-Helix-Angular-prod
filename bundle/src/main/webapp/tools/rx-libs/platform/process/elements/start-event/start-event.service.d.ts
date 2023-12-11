import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { IValidationIssue } from '@helix/platform/ui-kit';
import { RxStringService } from '@helix/platform/utils';
import { IDataDictionaryBranch, IDesignerElementService, IFormBuilderConfig, IPlainObject } from '@helix/platform/shared/api';
import { IProcessFlowElementDefinition } from '@helix/platform/process/api';
import { IStartEventModel } from './start-event.interfaces';
import * as i0 from "@angular/core";
export declare class RxStartEventService implements IDesignerElementService<IProcessFlowElementDefinition, IStartEventModel> {
    private rxStringService;
    private translateService;
    constructor(rxStringService: RxStringService, translateService: TranslateService);
    getDefinitionFromModel(model: IStartEventModel): Partial<IProcessFlowElementDefinition>;
    getInspectorConfig(): IFormBuilderConfig;
    getModelFromDefinition(definition?: IProcessFlowElementDefinition): IStartEventModel;
    getShape(options: IPlainObject): any;
    setCommonDataDictionaryBranch(guid: string, dataDictionaryBranch: Observable<IDataDictionaryBranch>): void;
    validate(model: IStartEventModel, availableCells: any): Observable<IValidationIssue[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxStartEventService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxStartEventService>;
}
