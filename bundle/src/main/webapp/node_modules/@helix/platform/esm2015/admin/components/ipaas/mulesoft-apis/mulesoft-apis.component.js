import { Component, ViewChild } from '@angular/core';
import { EMPTY, forkJoin, noop } from 'rxjs';
import { RxModalService } from '@helix/platform/ui-kit';
import { MulesoftApiEditorComponent } from './mulesoft-api-editor.component';
import { IpaasBaseApisComponent } from '../ipaas-base-apis/ipaas-base-apis.component';
import { RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { RxMulesoftApisService } from './mulesoft-apis.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@ngx-translate/core";
import * as i4 from "./mulesoft-apis.service";
import * as i5 from "../ipaas-base-apis/ipaas-base-apis.component";
export class MulesoftApisAdminComponent {
    constructor(rxModalService, rxNotificationService, translateService, rxMulesoftApisService) {
        this.rxModalService = rxModalService;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.rxMulesoftApisService = rxMulesoftApisService;
        this.mulesoftConfig = {
            titleKey: 'com.bmc.arsys.rx.client.admin.mulesoft-apis.header.title',
            recordDefinitionName: 'com.bmc.dsm.ipaas-mulesoft:iPaaS MuleSoft API Definition',
            resourceType: 'com.bmc.dsm.ipaas.mulesoft.command.RenameMuleSoftApiGroupCommand'
        };
    }
    openMulesoftCreateApiEditor(apiInfo) {
        return this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.admin.ipaas-api-editor.add-api.label'),
            content: MulesoftApiEditorComponent,
            data: apiInfo
        })
            .then((result) => {
            if (result) {
                this.ipaasBaseApisComponent.refreshIpaasGrid();
            }
        })
            .catch(noop);
    }
    openMulesoftEditApiEditor(apiInfo) {
        return this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.admin.ipaas-api-editor.edit-api.label'),
            content: MulesoftApiEditorComponent,
            data: apiInfo
        })
            .then((result) => {
            if (result) {
                this.ipaasBaseApisComponent.refreshIpaasGrid();
            }
        })
            .catch(noop);
    }
    deleteMulesoftApis(apiIds) {
        this.deleteApiDefinitions(apiIds).subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.ipaas-apis.delete-api.success.message'));
            this.ipaasBaseApisComponent.refreshIpaasGrid();
        });
    }
    deleteApiDefinitions(apiIds) {
        if (apiIds.length) {
            const deleteApiObservables$ = apiIds.map((apiId) => this.rxMulesoftApisService.deleteApiDefinition(apiId));
            return forkJoin(deleteApiObservables$);
        }
        return EMPTY;
    }
}
MulesoftApisAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: MulesoftApisAdminComponent, deps: [{ token: i1.RxModalService }, { token: i2.RxNotificationService }, { token: i3.TranslateService }, { token: i4.RxMulesoftApisService }], target: i0.ɵɵFactoryTarget.Component });
MulesoftApisAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: MulesoftApisAdminComponent, selector: "rx-admin-mulesoft-apis", viewQueries: [{ propertyName: "ipaasBaseApisComponent", first: true, predicate: ["ipaasBaseApisConfiguration"], descendants: true }], ngImport: i0, template: "<rx-ipaas-base-apis\n  [ipaasApisConfig]=\"mulesoftConfig\"\n  (createApi)=\"openMulesoftCreateApiEditor($event)\"\n  (editApi)=\"openMulesoftEditApiEditor($event)\"\n  (deleteApis)=\"deleteMulesoftApis($event)\"\n  #ipaasBaseApisConfiguration\n></rx-ipaas-base-apis>\n", components: [{ type: i5.IpaasBaseApisComponent, selector: "rx-ipaas-base-apis", inputs: ["ipaasApisConfig"], outputs: ["createApi", "editApi", "deleteApis"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: MulesoftApisAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-mulesoft-apis',
                    templateUrl: './mulesoft-apis.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.RxNotificationService }, { type: i3.TranslateService }, { type: i4.RxMulesoftApisService }]; }, propDecorators: { ipaasBaseApisComponent: [{
                type: ViewChild,
                args: ['ipaasBaseApisConfiguration']
            }] } });
//# sourceMappingURL=mulesoft-apis.component.js.map