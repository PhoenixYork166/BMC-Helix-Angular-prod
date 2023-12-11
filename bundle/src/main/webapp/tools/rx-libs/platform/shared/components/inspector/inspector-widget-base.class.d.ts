import { EventEmitter, Injector } from '@angular/core';
import * as i0 from "@angular/core";
export declare class InspectorWidgetBase<TInspectorComponentOptions, TDesignerItemModel> {
    protected injector: Injector;
    options: TInspectorComponentOptions;
    events: EventEmitter<any>;
    readonly designerItemModel: TDesignerItemModel;
    constructor(injector: Injector);
    static ɵfac: i0.ɵɵFactoryDeclaration<InspectorWidgetBase<any, any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<InspectorWidgetBase<any, any>>;
}
