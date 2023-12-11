import { RxRecordInstanceService } from '@helix/platform/record/api';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RxEmailProfilesService {
    private rxRecordInstanceService;
    constructor(rxRecordInstanceService: RxRecordInstanceService);
    deleteEmailProfiles(recordDefinitionName: string, recordInstanceIds: string[]): Observable<any[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxEmailProfilesService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxEmailProfilesService>;
}
