import { Injector, OnInit } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { Observable } from 'rxjs';
import { IApiPath, IEnvironmentData, IIpaasApiDefinition, IOrganizationData } from '../ipaas-base-apis/ipaas-base-apis.types';
import { ApiEditorBase } from '../ipaas-base-apis/api-editor/api-editor-base.class';
import { RxJitterbitApisService } from './jitterbit-apis.service';
import * as i0 from "@angular/core";
export declare class JitterbitApiEditorComponent extends ApiEditorBase implements OnInit {
    private rxJitterbitApisService;
    protected activeModalRef: ActiveModalRef;
    protected injector: Injector;
    constructor(rxJitterbitApisService: RxJitterbitApisService, activeModalRef: ActiveModalRef, injector: Injector);
    ngOnInit(): void;
    protected getOrganizationsAndEnvironments(): Observable<IOrganizationData[]>;
    protected getApiPathDefinitions(environment: IEnvironmentData): Observable<IApiPath>;
    protected getApiDefinition(apiId: string): Observable<IIpaasApiDefinition>;
    protected editApiDefinition(apiDefinition: IIpaasApiDefinition): Observable<any>;
    protected createApiDefinition(apiDefinition: IIpaasApiDefinition): Observable<any>;
    protected getEnvironmentList(): IEnvironmentData[];
    static ɵfac: i0.ɵɵFactoryDeclaration<JitterbitApiEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<JitterbitApiEditorComponent, "rx-jitterbit-api-editor", never, {}, {}, never, never>;
}
