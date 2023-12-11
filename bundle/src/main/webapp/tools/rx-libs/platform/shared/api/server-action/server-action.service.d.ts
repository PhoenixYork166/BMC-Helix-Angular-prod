import { Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { IValidationIssue } from '@helix/platform/ui-kit';
import { RxStringService } from '@helix/platform/utils';
import { IPlainObject } from '../common-types/plain-object.interface';
import { IActionType } from '../action-type/action-type.interfaces';
import { IServerActionModel } from '../designer/designer.types';
import * as i0 from "@angular/core";
export declare abstract class RxServerActionService {
    protected injector: Injector;
    private rxDesignerCacheService;
    protected rxStringService: RxStringService;
    protected translateService: TranslateService;
    protected constructor(injector: Injector);
    protected abstract getModelFromDefinition(definition: any): IServerActionModel;
    protected getActionTypeByName(actionTypeName: string): IActionType;
    protected getClassConfig(options: IPlainObject): IPlainObject;
    protected validateInputMap(model: IServerActionModel, availableCells: any[]): Observable<IValidationIssue[]>;
    protected validateServerAction(model: IServerActionModel, availableCells: any[]): Observable<IValidationIssue[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxServerActionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxServerActionService>;
}
