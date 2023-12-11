import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { words } from 'lodash';
import * as i0 from "@angular/core";
export class RxFileService {
    static saveFile(fileStream) {
        var _a;
        const arrayBufferView = new Uint8Array(fileStream.body);
        const fileName = RxFileService.extractFileName(fileStream);
        const file = new Blob([arrayBufferView], {
            type: (_a = fileStream.headers.get('content-type')) !== null && _a !== void 0 ? _a : undefined
        });
        saveAs(file, fileName);
    }
    static extractFileName(fileStream) {
        var _a;
        const contentDisposition = (_a = fileStream.headers.get('content-disposition')) !== null && _a !== void 0 ? _a : '';
        /*
         *  words('attachment; filename = logs.tar.gz'.replace(/\s/g, ''), /filename=(.*)/)[1];
         *  => 'logs.tar.gz'
         */
        return words(contentDisposition.replace(/\s/g, ''), /filename=(.*)/)[1];
    }
    createAndDownloadBlob(data, type, name, extension) {
        const blob = new Blob([data], { type });
        saveAs(blob, `${name}.${extension}`);
    }
    extractFileName(fileStream) {
        return RxFileService.extractFileName(fileStream);
    }
}
RxFileService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFileService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxFileService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFileService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFileService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=file.service.js.map