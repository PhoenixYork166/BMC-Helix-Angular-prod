import { IViewActionDesignManager, RxViewActionRegistryService } from '@helix/platform/view/api';
import { ILaunchProcessViewDesignProperties } from './launch-process-view-action.types';
import { Observable } from 'rxjs';
import { IViewComponentDesignValidationIssue, RxViewExpressionValidatorService } from '@helix/platform/view/designer';
import { RxProcessDefinitionService } from '@helix/platform/process/api';
import * as i0 from "@angular/core";
export declare class RxLaunchProcessViewActionDesignManagerService implements IViewActionDesignManager<ILaunchProcessViewDesignProperties> {
    private rxProcessDefinitionService;
    private rxViewActionRegistryService;
    private rxViewExpressionValidatorService;
    constructor(rxProcessDefinitionService: RxProcessDefinitionService, rxViewActionRegistryService: RxViewActionRegistryService, rxViewExpressionValidatorService: RxViewExpressionValidatorService);
    validate(properties: ILaunchProcessViewDesignProperties, propertyName: string): Observable<IViewComponentDesignValidationIssue[]>;
    private validateInputParamExpressions;
    private validateInputParams;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxLaunchProcessViewActionDesignManagerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxLaunchProcessViewActionDesignManagerService>;
}
