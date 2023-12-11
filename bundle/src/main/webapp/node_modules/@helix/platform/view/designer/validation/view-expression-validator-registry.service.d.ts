import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { ViewDesignerFacade } from '../+state/view-designer.facade';
import { RxViewExpressionValidatorService } from './view-expression-validator.service';
import * as i0 from "@angular/core";
export declare class RxViewExpressionValidatorRegistryService {
    private rxViewComponentRegistryService;
    private viewDesignerFacade;
    private rxViewExpressionValidatorService;
    private issuesObservableMap;
    private validateSubscription;
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService, viewDesignerFacade: ViewDesignerFacade, rxViewExpressionValidatorService: RxViewExpressionValidatorService);
    registerComponents(guids: string[]): void;
    unregisterComponents(guids: string[]): void;
    unregisterAllComponents(): void;
    private initValidation;
    private getComponentValidationIssues;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxViewExpressionValidatorRegistryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxViewExpressionValidatorRegistryService>;
}
