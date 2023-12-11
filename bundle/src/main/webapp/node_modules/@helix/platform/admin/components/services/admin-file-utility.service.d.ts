import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RxAdminFileUtilityService {
    convertBase64ToFile(decodedString: string, fileName: string, fileType: string): File;
    convertFileToBase64(file: File): Observable<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxAdminFileUtilityService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxAdminFileUtilityService>;
}
