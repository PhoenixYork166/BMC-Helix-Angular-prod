import { IViewActionService } from '@helix/platform/view/api';
import { Observable } from 'rxjs';
import { ISaveViewActionParams } from './save-view-action.interfaces';
import * as i0 from "@angular/core";
export declare class RxSaveViewActionService implements IViewActionService<ISaveViewActionParams, never> {
    execute(params: ISaveViewActionParams): Observable<never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxSaveViewActionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxSaveViewActionService>;
}
