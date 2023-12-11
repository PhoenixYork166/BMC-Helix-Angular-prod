import { RxRecordInstanceService, RxRecordInstanceUpdateService } from '@helix/platform/record/api';
import { Observable } from 'rxjs';
import { IBundleDescriptor } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxChatbotDefinitionService {
    private rxRecordInstanceService;
    private rxRecordInstanceUpdateService;
    constructor(rxRecordInstanceService: RxRecordInstanceService, rxRecordInstanceUpdateService: RxRecordInstanceUpdateService);
    delete(recordInstanceIds: string[]): Observable<any[]>;
    create(chatbotName: string, bundleDescriptor: IBundleDescriptor): Observable<any>;
    rename(recordInstanceId: string, newChatbotName: string): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxChatbotDefinitionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxChatbotDefinitionService>;
}
