import { Injector, OnInit } from '@angular/core';
import { ApiEditorBase } from '../ipaas-base-apis/api-editor/api-editor-base.class';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RxMulesoftApisService } from './mulesoft-apis.service';
import { IApiEditorFormData, IApiPath, IEnvironmentData, IIpaasApiDefinition, IOrganizationData } from '../ipaas-base-apis/ipaas-base-apis.types';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class MulesoftApiEditorComponent extends ApiEditorBase implements OnInit {
    private rxMulesoftApisService;
    protected activeModalRef: ActiveModalRef;
    protected injector: Injector;
    constructor(rxMulesoftApisService: RxMulesoftApisService, activeModalRef: ActiveModalRef, injector: Injector);
    ngOnInit(): void;
    protected getOrganizationsAndEnvironments(): Observable<IOrganizationData[]>;
    protected getApiPathDefinitions(environment: IEnvironmentData): Observable<IApiPath>;
    protected getApiDefinition(apiId: string): Observable<IIpaasApiDefinition>;
    protected editApiDefinition(apiDefinition: IIpaasApiDefinition, formValue: IApiEditorFormData): Observable<any>;
    protected createApiDefinition(apiDefinition: IIpaasApiDefinition, formValue: IApiEditorFormData): Observable<any>;
    protected getEnvironmentList(): IEnvironmentData[];
    static ɵfac: i0.ɵɵFactoryDeclaration<MulesoftApiEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MulesoftApiEditorComponent, "rx-mulesoft-api-editor", never, {}, {}, never, never>;
}
