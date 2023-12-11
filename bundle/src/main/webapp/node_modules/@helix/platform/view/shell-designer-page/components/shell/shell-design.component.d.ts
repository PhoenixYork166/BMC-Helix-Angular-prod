import { IViewComponentDropPredicateData, ViewDesignerFacade } from '@helix/platform/view/designer';
import { RxShellDesignModel } from './shell-design.model';
import * as i0 from "@angular/core";
export declare class RxShellDesignComponent {
    viewDesignerFacade: ViewDesignerFacade;
    model: RxShellDesignModel;
    constructor(viewDesignerFacade: ViewDesignerFacade);
    dropPredicate(data: IViewComponentDropPredicateData): boolean;
    dropPredicateAction(data: IViewComponentDropPredicateData): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxShellDesignComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxShellDesignComponent, "rx-shell-design", never, { "model": "model"; }, {}, never, never>;
}
