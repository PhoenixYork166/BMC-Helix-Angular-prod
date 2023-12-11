import { Injectable } from '@angular/core';
import { forEach, join } from 'lodash';
import * as i0 from "@angular/core";
export class RxCsvService {
    convertToCsv(csvData) {
        let csv = '';
        forEach(csvData, (row) => {
            const record = join(row, ',');
            csv += `${record}\n`;
        });
        return csv;
    }
}
RxCsvService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCsvService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxCsvService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCsvService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCsvService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=csv.service.js.map