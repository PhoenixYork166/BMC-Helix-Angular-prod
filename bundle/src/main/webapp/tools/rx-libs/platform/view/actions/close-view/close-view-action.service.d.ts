import { IViewActionService } from '@helix/platform/view/api';
import { Observable } from 'rxjs';
import { ICloseViewActionParams } from './close-view-action-params.interface';
import * as i0 from "@angular/core";
export declare class RxCloseViewActionService implements IViewActionService<ICloseViewActionParams, never> {
    execute(params: ICloseViewActionParams): Observable<never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxCloseViewActionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxCloseViewActionService>;
}
