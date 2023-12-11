import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IServerInformation } from './server-information.interface';
import { RxServerInformationService } from './server-information.service';
import * as i0 from "@angular/core";
export declare class ServerInformationAdminComponent implements OnInit {
    private rxServerInformationService;
    busy: Subscription;
    serverInformation: IServerInformation;
    constructor(rxServerInformationService: RxServerInformationService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ServerInformationAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ServerInformationAdminComponent, "rx-admin-server-information", never, {}, {}, never, never>;
}
