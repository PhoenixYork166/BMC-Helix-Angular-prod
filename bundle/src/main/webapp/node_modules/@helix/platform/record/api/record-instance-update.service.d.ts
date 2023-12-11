import { RxRecordInstanceService } from './record-instance.service';
import { RecordInstance } from './record-instance.class';
import { Observable } from 'rxjs';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class RxRecordInstanceUpdateService {
    private rxRecordInstanceService;
    private rxUtilityModalsService;
    constructor(rxRecordInstanceService: RxRecordInstanceService, rxUtilityModalsService: RxUtilityModalsService);
    execute(recordInstance: RecordInstance): Observable<any>;
    private handleModifiedInstanceError;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRecordInstanceUpdateService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRecordInstanceUpdateService>;
}
