import { EventEmitter } from '@angular/core';
import { ConnectionTestStatus } from './connection-tester.types';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RxConnectionTesterComponent {
    translateService: TranslateService;
    status: ConnectionTestStatus;
    buttonType: string;
    testConnection: EventEmitter<void>;
    constructor(translateService: TranslateService);
    onTestConnection(): void;
    isConnectionTestFailed(): boolean;
    isConnectionTestPassed(): boolean;
    isTestConnectionButtonDisabled(): boolean;
    isConnectionTestInProgress(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxConnectionTesterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxConnectionTesterComponent, "rx-connection-tester", never, { "status": "status"; "buttonType": "buttonType"; }, { "testConnection": "testConnection"; }, never, never>;
}
