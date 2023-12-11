import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHttpGetParams, RxCommandFactoryService, RxLocalizationService } from '@helix/platform/shared/api';
import { RxGuidService } from '@helix/platform/utils';
import { IViewDefinition } from '../domain/view-definition.interface';
import { RxViewDefinitionLocalizationService } from './view-definition-localization.service';
import * as i0 from "@angular/core";
export declare const renameViewDefinitionCommand = "com.bmc.arsys.rx.application.view.command.RenameViewDefinitionCommand";
export declare const revertCustomizationResourceType = "com.bmc.arsys.rx.application.view.command.RevertViewDefinitionCommand";
export declare class RxViewDefinitionService {
    private httpClient;
    private rxGuidService;
    private rxCommandFactoryService;
    private rxViewDefinitionLocalizationService;
    private rxLocalizationService;
    private renameCommand;
    private revertCustomizationCommand;
    constructor(httpClient: HttpClient, rxGuidService: RxGuidService, rxCommandFactoryService: RxCommandFactoryService, rxViewDefinitionLocalizationService: RxViewDefinitionLocalizationService, rxLocalizationService: RxLocalizationService);
    get(viewDefinitionName: string, options?: IHttpGetParams): Observable<IViewDefinition>;
    getNew(layoutTemplate: number): Observable<IViewDefinition>;
    create(viewDefinition: IViewDefinition): Observable<HttpResponse<any>>;
    update(viewDefinitionName: string, viewDefinition: IViewDefinition, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
    }): Observable<any>;
    delete(viewDefinitionName: string): Observable<any>;
    rename(oldViewDefinitionName: string, newViewDefinitionName: string): Observable<any>;
    isPageView(viewDefinition: IViewDefinition): boolean;
    revertCustomization(viewDefinitionName: string): Observable<any>;
    private getUrl;
    private getNewViewDefinition;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxViewDefinitionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxViewDefinitionService>;
}
