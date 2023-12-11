import { HttpResponse } from '@angular/common/http';
import * as i0 from "@angular/core";
export declare class RxFileService {
    static saveFile(fileStream: HttpResponse<ArrayBuffer>): void;
    static extractFileName(fileStream: HttpResponse<ArrayBuffer>): string | undefined;
    createAndDownloadBlob(data: any, type: string, name: string, extension: string): void;
    extractFileName(fileStream: HttpResponse<ArrayBuffer>): string | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxFileService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxFileService>;
}
