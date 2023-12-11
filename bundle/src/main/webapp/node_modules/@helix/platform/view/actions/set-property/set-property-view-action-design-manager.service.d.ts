import { IViewActionDesignManager } from '@helix/platform/view/api';
import { IViewComponentDesignValidationIssue } from '@helix/platform/view/designer';
import { Observable } from 'rxjs';
import { ISetPropertyViewActionDesignProperties } from './set-property-view-action.interfaces';
import * as i0 from "@angular/core";
export declare class RxSetPropertyViewActionDesignManagerService implements IViewActionDesignManager<ISetPropertyViewActionDesignProperties> {
    validate(actionProperties: ISetPropertyViewActionDesignProperties, propertyName: string): Observable<IViewComponentDesignValidationIssue[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxSetPropertyViewActionDesignManagerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxSetPropertyViewActionDesignManagerService>;
}
