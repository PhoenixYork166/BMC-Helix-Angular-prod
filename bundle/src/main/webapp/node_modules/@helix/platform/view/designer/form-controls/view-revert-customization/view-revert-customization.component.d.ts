import { EventEmitter } from '@angular/core';
import { IFormBuilderEvent, IFormWidgetComponent, IPlainObject } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
import { ViewDesignerFacade } from '../../+state/view-designer.facade';
import { IRevertCustomizationOptions } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
export declare class RxViewRevertCustomizationComponent implements IFormWidgetComponent {
    private viewDesignerFacade;
    options: IPlainObject;
    isDisabled: boolean;
    events: EventEmitter<IFormBuilderEvent>;
    controlOptions$: Observable<IRevertCustomizationOptions>;
    constructor(viewDesignerFacade: ViewDesignerFacade);
    static ɵfac: i0.ɵɵFactoryDeclaration<RxViewRevertCustomizationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxViewRevertCustomizationComponent, "rx-view-revert-customization", never, { "options": "options"; "isDisabled": "isDisabled"; }, { "events": "events"; }, never, never>;
}
