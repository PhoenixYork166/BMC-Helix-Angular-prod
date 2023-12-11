import { Observable } from 'rxjs';
import { IViewActionDesignProperties, RxViewActionRegistryService } from '@helix/platform/view/api';
import { RxStringService } from '@helix/platform/utils';
import { RxLogService } from '@helix/platform/shared/api';
import { RxViewExpressionValidatorService } from './view-expression-validator.service';
import { IViewComponentDesignData } from '../public-interfaces/view-component-design.types';
import { IViewComponentDesignValidationIssue } from '../public-interfaces/view-component-design-validation-issue.interface';
import * as i0 from "@angular/core";
export declare class RxViewActionValidatorService {
    private rxViewActionRegistryService;
    private rxStringService;
    private rxLogService;
    private rxViewExpressionValidatorService;
    constructor(rxViewActionRegistryService: RxViewActionRegistryService, rxStringService: RxStringService, rxLogService: RxLogService, rxViewExpressionValidatorService: RxViewExpressionValidatorService);
    validate(actionsDesignData: IViewComponentDesignData<IViewActionDesignProperties>[], propertyName: string): Observable<IViewComponentDesignValidationIssue[]>;
    private performCustomValidation;
    private validateRequiredProps;
    private validateExpressions;
    private validateActionSequence;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxViewActionValidatorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxViewActionValidatorService>;
}
