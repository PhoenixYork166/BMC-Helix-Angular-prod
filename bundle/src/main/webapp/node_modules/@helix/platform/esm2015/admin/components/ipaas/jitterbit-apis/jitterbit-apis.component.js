import { Component, ViewChild } from '@angular/core';
import { RxModalService } from '@helix/platform/ui-kit';
import { JitterbitApiEditorComponent } from './jitterbit-api-editor.component';
import { EMPTY, forkJoin, noop } from 'rxjs';
import { IpaasBaseApisComponent } from '../ipaas-base-apis/ipaas-base-apis.component';
import { RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { RxJitterbitApisService } from './jitterbit-apis.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@ngx-translate/core";
import * as i4 from "./jitterbit-apis.service";
import * as i5 from "../ipaas-base-apis/ipaas-base-apis.component";
export class JitterbitApisAdminComponent {
    constructor(rxModalService, rxNotificationService, translateService, rxJitterbitApisService) {
        this.rxModalService = rxModalService;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.rxJitterbitApisService = rxJitterbitApisService;
        this.jitterbitApisConfig = {
            titleKey: 'com.bmc.arsys.rx.client.admin.jitterbit-apis.header.title',
            recordDefinitionName: 'com.bmc.dsm.ipaas-jitterbit:iPaaS Jitterbit API Definition',
            resourceType: 'com.bmc.dsm.ipaas.jitterbit.command.RenameJitterbitApiGroupCommand'
        };
    }
    openJitterbitCreateApiEditor(apiInfo) {
        return this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.admin.ipaas-api-editor.add-api.label'),
            content: JitterbitApiEditorComponent,
            data: apiInfo
        })
            .then((result) => {
            if (result) {
                this.ipaasBaseApisComponent.refreshIpaasGrid();
            }
        })
            .catch(noop);
    }
    openJitterbitEditApiEditor(apiInfo) {
        return this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.admin.ipaas-api-editor.edit-api.label'),
            content: JitterbitApiEditorComponent,
            data: apiInfo
        })
            .then((result) => {
            if (result) {
                this.ipaasBaseApisComponent.refreshIpaasGrid();
            }
        })
            .catch(noop);
    }
    deleteJitterbitApis(apiIds) {
        this.deleteApiDefinitions(apiIds).subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.ipaas-apis.delete-api.success.message'));
            this.ipaasBaseApisComponent.refreshIpaasGrid();
        });
    }
    deleteApiDefinitions(apiIds) {
        if (apiIds.length) {
            const deleteApiObservables$ = apiIds.map((apiId) => this.rxJitterbitApisService.deleteApiDefinition(apiId));
            return forkJoin(deleteApiObservables$);
        }
        return EMPTY;
    }
}
JitterbitApisAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JitterbitApisAdminComponent, deps: [{ token: i1.RxModalService }, { token: i2.RxNotificationService }, { token: i3.TranslateService }, { token: i4.RxJitterbitApisService }], target: i0.ɵɵFactoryTarget.Component });
JitterbitApisAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: JitterbitApisAdminComponent, selector: "rx-admin-jitterbit-apis", viewQueries: [{ propertyName: "ipaasBaseApisComponent", first: true, predicate: ["ipaasBaseApisConfiguration"], descendants: true }], ngImport: i0, template: "<rx-ipaas-base-apis\n  [ipaasApisConfig]=\"jitterbitApisConfig\"\n  (createApi)=\"openJitterbitCreateApiEditor($event)\"\n  (editApi)=\"openJitterbitEditApiEditor($event)\"\n  (deleteApis)=\"deleteJitterbitApis($event)\"\n  #ipaasBaseApisConfiguration\n></rx-ipaas-base-apis>\n", components: [{ type: i5.IpaasBaseApisComponent, selector: "rx-ipaas-base-apis", inputs: ["ipaasApisConfig"], outputs: ["createApi", "editApi", "deleteApis"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JitterbitApisAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-jitterbit-apis',
                    templateUrl: './jitterbit-apis.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.RxNotificationService }, { type: i3.TranslateService }, { type: i4.RxJitterbitApisService }]; }, propDecorators: { ipaasBaseApisComponent: [{
                type: ViewChild,
                args: ['ipaasBaseApisConfiguration']
            }] } });
//# sourceMappingURL=jitterbit-apis.component.js.map