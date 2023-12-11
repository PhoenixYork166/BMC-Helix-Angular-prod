import { IRecordDefinition } from '@helix/platform/record/api';
import { IAssociationDefinition } from '@helix/platform/association/api';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
export declare class DataExportService {
    private httpClient;
    url: string;
    constructor(httpClient: HttpClient);
    isRecordDefinitionResponse(definitionResponse: IRecordDefinition | IAssociationDefinition): definitionResponse is IRecordDefinition;
    startDataExport(instanceId: string): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataExportService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DataExportService>;
}
