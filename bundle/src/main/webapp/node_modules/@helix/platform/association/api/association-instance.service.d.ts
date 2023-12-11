import { Observable } from 'rxjs';
import { RxCommandFactoryService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare const associateMultipleCommand = "com.bmc.arsys.rx.application.association.command.AssociateMultipleCommand";
export declare const disassociateMultipleCommand = "com.bmc.arsys.rx.application.association.command.DisassociateMultipleCommand";
export declare class RxAssociationInstanceService {
    private rxCommandFactoryService;
    private associateCommand;
    private disassociateCommand;
    constructor(rxCommandFactoryService: RxCommandFactoryService);
    associateRecords(associationDefinitionName: string, nodeAIds: string | string[], nodeBIds: string | string[], useDefaultRoles: boolean, nodeARole: string, nodeBRole: string): Observable<any>;
    disassociateRecords(associationDefinitionName: string, nodeAIds: string | string[], nodeBIds: string | string[]): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxAssociationInstanceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxAssociationInstanceService>;
}
