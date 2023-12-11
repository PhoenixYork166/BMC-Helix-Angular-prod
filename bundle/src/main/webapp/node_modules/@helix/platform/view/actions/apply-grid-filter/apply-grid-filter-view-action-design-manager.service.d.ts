import { IViewActionDesignManager } from '@helix/platform/view/api';
import { IViewComponentDesignValidationIssue, ViewDesignerFacade } from '@helix/platform/view/designer';
import { Observable } from 'rxjs';
import { IApplyGridFilterViewActionDesignProperties } from './apply-grid-filter-view-action.types';
import { RxRecordGridDesignUtilsService, RxRecordGridFilterHelperService } from '@helix/platform/view/components';
import * as i0 from "@angular/core";
export declare class RxApplyGridFilterViewActionDesignManagerService implements IViewActionDesignManager<IApplyGridFilterViewActionDesignProperties> {
    private viewDesignerFacade;
    private rxRecordGridDesignUtilsService;
    private rxRecordGridFilterHelperService;
    constructor(viewDesignerFacade: ViewDesignerFacade, rxRecordGridDesignUtilsService: RxRecordGridDesignUtilsService, rxRecordGridFilterHelperService: RxRecordGridFilterHelperService);
    private getActionsToUpdate;
    private getGridColumnChanges;
    private getGridDefinitionChanges;
    private getUpdatedFilterComponents;
    validate(actionProperties: IApplyGridFilterViewActionDesignProperties, propertyName: string): Observable<IViewComponentDesignValidationIssue[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxApplyGridFilterViewActionDesignManagerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxApplyGridFilterViewActionDesignManagerService>;
}
