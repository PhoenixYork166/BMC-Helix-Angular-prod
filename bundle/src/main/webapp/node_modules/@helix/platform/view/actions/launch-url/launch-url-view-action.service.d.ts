import { Observable } from 'rxjs';
import { IViewActionService } from '@helix/platform/view/api';
import { ILaunchUrlViewActionParams } from './launch-url-view-action-params.interface';
import * as i0 from "@angular/core";
export declare class RxLaunchUrlViewActionService implements IViewActionService<ILaunchUrlViewActionParams, never> {
    execute(params: ILaunchUrlViewActionParams): Observable<never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxLaunchUrlViewActionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxLaunchUrlViewActionService>;
}
