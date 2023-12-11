import { IViewActionService } from '@helix/platform/view/api';
import { Observable } from 'rxjs';
import { IRefreshViewActionParams } from './refresh-view-action-params.interface';
import * as i0 from "@angular/core";
export declare class RxRefreshViewActionService implements IViewActionService<IRefreshViewActionParams, never> {
    execute(params: IRefreshViewActionParams): Observable<never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRefreshViewActionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRefreshViewActionService>;
}
