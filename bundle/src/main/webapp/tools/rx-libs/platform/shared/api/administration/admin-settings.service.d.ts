import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPlainObject } from '../common-types';
import { IAdminComponentDefinition, IAdminComponentGridData, IAdminComponentSetting, IAdminComponentSettings, IAdminNavigationMenuItem, IAdminSetting } from './administration.types';
import { RxCommandFactoryService } from '../command';
import * as i0 from "@angular/core";
export declare class RxAdminSettingsService {
    private httpClient;
    private rxCommandFactoryService;
    constructor(httpClient: HttpClient, rxCommandFactoryService: RxCommandFactoryService);
    getComponentGridData(componentName: string, customHeaders?: IPlainObject): Observable<IAdminComponentGridData>;
    getComponentDefinition(componentName: string, customHeaders?: IPlainObject): Observable<IAdminComponentDefinition>;
    getAdminNavigationMenuItems(): Observable<IAdminNavigationMenuItem[]>;
    getComponentSettings(componentName: string, customHeaders?: IPlainObject): Observable<IAdminComponentSettings>;
    deleteComponentSettings(componentName: string, customHeaders?: IPlainObject): Observable<any>;
    createComponentSettings(componentName: string, data: IAdminComponentSetting[], customHeaders?: IPlainObject): Observable<string>;
    updateComponentSettings(componentName: string, data: IAdminComponentSetting[], customHeaders?: IPlainObject): Observable<Object>;
    getAdminSetting(componentName: string, customHeaders?: IPlainObject): Observable<IAdminSetting>;
    createAdminSetting(data: IAdminSetting): Observable<Object>;
    updateAdminSetting(data: IAdminSetting): Observable<Object>;
    deleteAdminSetting(definitionNames: string[]): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxAdminSettingsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxAdminSettingsService>;
}
