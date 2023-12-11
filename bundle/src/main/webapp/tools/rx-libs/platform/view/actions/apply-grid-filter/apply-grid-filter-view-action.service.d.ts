import { IViewActionService } from '@helix/platform/view/api';
import { Observable } from 'rxjs';
import { IApplyGridFilterViewActionParams } from './apply-grid-filter-view-action.types';
import * as i0 from "@angular/core";
export declare class RxApplyGridFilterViewActionService implements IViewActionService<IApplyGridFilterViewActionParams, never> {
    execute(params: IApplyGridFilterViewActionParams): Observable<never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxApplyGridFilterViewActionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxApplyGridFilterViewActionService>;
}
