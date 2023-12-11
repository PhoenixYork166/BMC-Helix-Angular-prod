import { Injector } from '@angular/core';
import { RxViewComponentExpressionConfigurator } from '@helix/platform/view/designer';
import { AssociationDesignModel } from './association-design.model';
export declare class AssociationExpressionConfigurator extends RxViewComponentExpressionConfigurator {
    protected injector: Injector;
    protected componentGuid: string;
    protected componentModel: AssociationDesignModel;
    private rxDefinitionNameService;
    constructor(injector: Injector, componentGuid: string, componentModel: AssociationDesignModel);
    private getRecordEditorBranch;
}
