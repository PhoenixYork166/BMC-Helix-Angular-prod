import { Injectable } from '@angular/core';
import { OpenViewActionModalSize } from '@helix/platform/view/api';
import { Observable } from 'rxjs';
import { ExpressionEditorComponent } from './expression-editor.component';
import { RxError } from '@helix/platform/utils';
import { isString } from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "@helix/platform/ui-kit";
export class RxExpressionEditorService {
    constructor(translateService, rxModalService) {
        this.translateService = translateService;
        this.rxModalService = rxModalService;
    }
    openEditor(config, onDialogApiReady) {
        return new Observable((observer) => {
            this.rxModalService
                .openModal({
                title: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.edit-expression.title'),
                data: Object.assign(Object.assign({}, config), { api: {
                        writeValue(propertyPath, propertyValue) {
                            observer.next({ path: propertyPath, value: propertyValue });
                        }
                    }, onApiReady: (dialogApi) => {
                        onDialogApiReady === null || onDialogApiReady === void 0 ? void 0 : onDialogApiReady(dialogApi);
                    } }),
                content: ExpressionEditorComponent,
                size: (config.isReadOnly ? 'sm' : OpenViewActionModalSize.Large)
            })
                .then(() => observer.complete())
                .catch((e) => {
                onDialogApiReady === null || onDialogApiReady === void 0 ? void 0 : onDialogApiReady(null);
                return isString(e) ? new RxError(e) : e;
            });
        });
    }
}
RxExpressionEditorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionEditorService, deps: [{ token: i1.TranslateService }, { token: i2.RxModalService }], target: i0.ɵɵFactoryTarget.Injectable });
RxExpressionEditorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionEditorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionEditorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }, { type: i2.RxModalService }]; } });
//# sourceMappingURL=expression-editor.service.js.map