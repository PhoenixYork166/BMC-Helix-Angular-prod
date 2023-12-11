import { RequestBody, SendFileUtils } from '@bmc-ux/adapt-angular';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class UploaderService implements SendFileUtils {
    url: string;
    deleteFile(file: any, url?: string): any;
    responseCallback(response?: any): any;
    sendChunk(requestBody: RequestBody, uploadAsOneChunk?: boolean, url?: string): Observable<any>;
    sendFile(file: any): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UploaderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UploaderService>;
}
