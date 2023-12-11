import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RxConnectorConfigurationDataPageService } from './connector-configuration-data-page.service';
import { IConnector, IConnectorConfiguration, IConnectorProfile } from './connector-configuration.interface';
import { RxConnectorsDataPageService } from './connectors-data-page.service';
import * as i0 from "@angular/core";
export declare class RxConnectorConfigurationService {
    private httpClient;
    private rxConnectorsDataPageService;
    private rxConnectorConfigurationDataPageService;
    private readonly connectorConfigs;
    private readonly connectorProfiles;
    constructor(httpClient: HttpClient, rxConnectorsDataPageService: RxConnectorsDataPageService, rxConnectorConfigurationDataPageService: RxConnectorConfigurationDataPageService);
    getConnectors(): Observable<IConnector[]>;
    getConnectorConfigurations(connectorId: any): Observable<IConnectorConfiguration[]>;
    getConnectorProfiles(connectorId: any, configId: any): Observable<IConnectorProfile[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxConnectorConfigurationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxConnectorConfigurationService>;
}
