import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RxCommandFactoryService } from '@helix/platform/shared/api';
import { RxGuidService } from '@helix/platform/utils';
import { IRuleDefinition } from './rule-definition.types';
import * as i0 from "@angular/core";
export declare const renameRuleDefinitionCommand = "com.bmc.arsys.rx.application.rule.command.RenameRuleDefinitionCommand";
export declare const revertRuleCustomizationResourceType = "com.bmc.arsys.rx.application.rule.command.RevertRuleDefinitionCommand";
export declare class RxRuleDefinitionService {
    private httpClient;
    private rxGuidService;
    private rxCommandFactoryService;
    private renameCommand;
    private revertCustomizationCommand;
    constructor(httpClient: HttpClient, rxGuidService: RxGuidService, rxCommandFactoryService: RxCommandFactoryService);
    get(ruleDefinitionName: string): Observable<IRuleDefinition>;
    rename(oldRuleDefinitionName: string, newRuleDefinitionName: string): Observable<any>;
    revertCustomization(ruleDefinitionName: string): Observable<any>;
    update(ruleDefinition: IRuleDefinition): Observable<any>;
    private getUrl;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRuleDefinitionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRuleDefinitionService>;
}
