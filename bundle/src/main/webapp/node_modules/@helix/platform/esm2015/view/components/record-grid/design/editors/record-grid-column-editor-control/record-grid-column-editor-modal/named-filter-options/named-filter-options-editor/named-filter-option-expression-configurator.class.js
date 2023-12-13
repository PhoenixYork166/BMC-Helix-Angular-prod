import { Injectable, Injector } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RxViewDataDictionaryService, RxViewExpressionConfigurator } from '@helix/platform/view/designer';
import { map } from 'rxjs/operators';
import { RxDefaultExpressionEvaluatorService } from '@helix/platform/view/api';
import { RX_RECORD_GRID_DESIGN } from '../../../../../record-grid-design.constant';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/view/designer";
import * as i3 from "@helix/platform/view/api";
export class NamedFilterOptionExpressionConfigurator extends RxViewExpressionConfigurator {
    constructor(injector, activeModalRef, rxViewDataDictionaryService, rxDefaultExpressionEvaluatorService) {
        super(injector);
        this.injector = injector;
        this.activeModalRef = activeModalRef;
        this.rxViewDataDictionaryService = rxViewDataDictionaryService;
        this.rxDefaultExpressionEvaluatorService = rxDefaultExpressionEvaluatorService;
        this.commonDataDictionary$ = this.rxViewDataDictionaryService.commonDataDictionary$.pipe(map((dataDictionary) => [
            {
                expression: `'${this.activeModalRef.getData().column.fieldId}'`,
                icon: 'd-icon-file_o_gear',
                label: this.activeModalRef.getData().column.title
            },
            RX_RECORD_GRID_DESIGN.keywords,
            // removing 'General' and 'Functions' groups from data dictionary.
            ...dataDictionary.slice(2)
        ]));
    }
    getExpressionEvaluator() {
        return this.rxDefaultExpressionEvaluatorService;
    }
}
NamedFilterOptionExpressionConfigurator.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedFilterOptionExpressionConfigurator, deps: [{ token: i0.Injector }, { token: i1.ActiveModalRef }, { token: i2.RxViewDataDictionaryService }, { token: i3.RxDefaultExpressionEvaluatorService }], target: i0.ɵɵFactoryTarget.Injectable });
NamedFilterOptionExpressionConfigurator.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedFilterOptionExpressionConfigurator });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedFilterOptionExpressionConfigurator, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.ActiveModalRef }, { type: i2.RxViewDataDictionaryService }, { type: i3.RxDefaultExpressionEvaluatorService }]; } });
//# sourceMappingURL=named-filter-option-expression-configurator.class.js.map