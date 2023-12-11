import { Injector } from '@angular/core';
import { TextFieldDesignModel } from './text-field-design.model';
import { RxViewComponentExpressionConfigurator } from '@helix/platform/view/designer';
export declare class TextFieldExpressionConfigurator extends RxViewComponentExpressionConfigurator {
    protected injector: Injector;
    protected componentGuid: string;
    protected componentModel: TextFieldDesignModel;
    constructor(injector: Injector, componentGuid: string, componentModel: TextFieldDesignModel);
}
