import { OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RxModalService } from '@helix/platform/ui-kit';
import { IRecordGridConfig, RecordGridComponent } from '@helix/platform/view/components';
import { Observable, Subscription } from 'rxjs';
import { IConnector } from './connector-configuration.interface';
import { RxConnectorConfigurationService } from './connector-configuration.service';
import * as i0 from "@angular/core";
export declare class ConnectorConfigurationAdminComponent implements OnInit {
    private formBuilder;
    private rxModalService;
    private rxConnectorConfigurationService;
    errorText: string;
    gridConfig: Observable<IRecordGridConfig>;
    connectorList: IConnector[];
    busySubscription: Subscription;
    grid: RecordGridComponent;
    connectorConfigurationTemplate: TemplateRef<any>;
    constructor(formBuilder: FormBuilder, rxModalService: RxModalService, rxConnectorConfigurationService: RxConnectorConfigurationService);
    ngOnInit(): void;
    newConnectionConfiguration(): void;
    private openConnectionConfiguration;
    private getRecordDefinition;
    private getColumns;
    private openConnectorConfigurationEditor;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConnectorConfigurationAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConnectorConfigurationAdminComponent, "rx-admin-connector-configuration", never, {}, {}, never, never>;
}
