import { EventEmitter, Injector } from '@angular/core';
import { ValueAccessor } from '../form-builder';
import { IFormControlComponent } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class InspectorControlBase<TInspectorControlValue, TInspectorControlOptions, TDesignerItemModel> extends ValueAccessor<TInspectorControlValue> implements IFormControlComponent {
    protected injector: Injector;
    propertyPath: string;
    options: TInspectorControlOptions;
    events: EventEmitter<any>;
    readonly designerItemModel: TDesignerItemModel;
    constructor(injector: Injector);
    static ɵfac: i0.ɵɵFactoryDeclaration<InspectorControlBase<any, any, any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<InspectorControlBase<any, any, any>, never, never, { "propertyPath": "propertyPath"; "options": "options"; }, { "events": "events"; }, never>;
}
