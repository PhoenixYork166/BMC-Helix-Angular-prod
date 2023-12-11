import { IViewActionService } from '@helix/platform/view/api';
import { Observable } from 'rxjs';
import { ISetPropertyViewActionParams } from './set-property-view-action.interfaces';
import * as i0 from "@angular/core";
export declare class RxSetPropertyViewActionService implements IViewActionService<ISetPropertyViewActionParams, never> {
    execute(params: ISetPropertyViewActionParams): Observable<never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxSetPropertyViewActionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxSetPropertyViewActionService>;
}
