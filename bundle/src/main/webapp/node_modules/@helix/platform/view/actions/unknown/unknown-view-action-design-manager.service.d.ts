import { IViewActionDesignManager, IViewActionDesignProperties } from '@helix/platform/view/api';
import { IViewComponentDesignValidationIssue } from '@helix/platform/view/designer';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RxUnknownViewActionDesignManager implements IViewActionDesignManager {
    validate(actionProperties: IViewActionDesignProperties, propertyName: string): Observable<IViewComponentDesignValidationIssue[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxUnknownViewActionDesignManager, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxUnknownViewActionDesignManager>;
}
