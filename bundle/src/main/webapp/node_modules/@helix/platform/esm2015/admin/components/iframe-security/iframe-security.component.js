import { Component, HostBinding, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { cloneDeep, map, some } from 'lodash';
import { RX_IFRAME_SECURITY } from './iframe-security.constant';
import { RxIframeSecurityService } from './iframe-security.service';
import { RxNotificationService } from '@helix/platform/shared/api';
import { RxUrlUtilsService } from '@helix/platform/utils';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "./iframe-security.service";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/utils";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@helix/platform/shared/components";
import * as i6 from "@bmc-ux/adapt-angular";
import * as i7 from "@angular/forms";
export class IframeSecurityAdminComponent extends BaseViewComponent {
    constructor(rxIframeSecurityService, rxNotificationService, rxUrlUtilsService, translateService) {
        super();
        this.rxIframeSecurityService = rxIframeSecurityService;
        this.rxNotificationService = rxNotificationService;
        this.rxUrlUtilsService = rxUrlUtilsService;
        this.translateService = translateService;
        this.hostClass = 'd-block col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6 p-0';
        this.sections = cloneDeep(RX_IFRAME_SECURITY.sections);
        this.listBuilderTexts = {
            searchPlaceholder: this.translateService.instant('com.bmc.arsys.rx.client.admin.iframe-security.filter-or-add-urls.label'),
            notFound: this.translateService.instant('com.bmc.arsys.rx.client.admin.iframe-security.no-urls-added.label')
        };
        this.counter = 0;
        this.invalidUrlMsg = this.translateService.instant('com.bmc.arsys.rx.client.admin.invalid-url.label');
        this.duplicateUrlMsg = this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.duplicate-value.message');
        this.generateId = () => {
            return this.counter++;
        };
        this.iframeAllowedSitesValidation = (value, items) => {
            return this.itemValidation(value, items, false);
        };
        this.trustedWebsitesValidation = (value, items) => {
            return this.itemValidation(value, items);
        };
    }
    ngOnInit() {
        this.notifyPropertyChanged('api', {
            isDirty: () => this.isDirty()
        });
        this.busy = this.rxIframeSecurityService.getIframeSecurities().subscribe((result) => {
            const iframeAllowedSites = result.iframeAllowedSites;
            const trustedWebsites = result.trustedWebsites;
            if (iframeAllowedSites.value) {
                this.sections.iframeAllowedSites.urls = map(iframeAllowedSites.value.split(' '), (url) => ({
                    id: this.generateId(),
                    name: url
                }));
            }
            if (trustedWebsites.value) {
                this.sections.trustedWebsites.urls = map(trustedWebsites.value.split(' '), (url) => ({
                    id: this.generateId(),
                    name: url
                }));
            }
        });
    }
    isDirty() {
        return this.iframeAllowedSitesListBuilder.dirty || this.trustedWebsitesListBuilder.dirty;
    }
    onSaveClick() {
        const iframeAllowedSitesData = {
            id: this.sections.iframeAllowedSites.name,
            name: this.sections.iframeAllowedSites.name,
            value: map(this.sections.iframeAllowedSites.urls, 'name').join(' ')
        };
        const trustedWebsitesData = {
            id: this.sections.trustedWebsites.name,
            name: this.sections.trustedWebsites.name,
            value: map(this.sections.trustedWebsites.urls, 'name').join(' ')
        };
        this.rxIframeSecurityService.postIframeSecurities(iframeAllowedSitesData, trustedWebsitesData).subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.iframe-security.iframe-security-information-saved.message'));
            this.iframeAllowedSitesListBuilder.control.markAsPristine();
            this.trustedWebsitesListBuilder.control.markAsPristine();
        });
    }
    itemValidation(value, items, isProtocolRequired = true) {
        let errorMessage = null;
        if (some(items, { name: value })) {
            errorMessage = this.duplicateUrlMsg;
        }
        else if (!this.rxUrlUtilsService.isValidUrl(value, isProtocolRequired)) {
            errorMessage = this.invalidUrlMsg;
        }
        return errorMessage;
    }
}
IframeSecurityAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IframeSecurityAdminComponent, deps: [{ token: i1.RxIframeSecurityService }, { token: i2.RxNotificationService }, { token: i3.RxUrlUtilsService }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
IframeSecurityAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: IframeSecurityAdminComponent, selector: "rx-admin-iframe-security", host: { properties: { "class": "this.hostClass" } }, viewQueries: [{ propertyName: "iframeAllowedSitesListBuilder", first: true, predicate: ["iframeAllowedSitesListBuilder"], descendants: true, read: NgModel, static: true }, { propertyName: "trustedWebsitesListBuilder", first: true, predicate: ["trustedWebsitesListBuilder"], descendants: true, read: NgModel, static: true }], usesInheritance: true, ngImport: i0, template: "<rx-admin-settings header=\"Iframe security\" [busy]=\"busy\">\n  <h4>{{ sections.iframeAllowedSites.title | translate }}</h4>\n\n  <adapt-rx-list-builder\n    class=\"d-block mb-4\"\n    name=\"iframeAllowedSitesListBuilder\"\n    [(ngModel)]=\"sections.iframeAllowedSites.urls\"\n    [label]=\"sections.iframeAllowedSites.infoMessage | translate\"\n    [texts]=\"listBuilderTexts\"\n    [itemValidation]=\"iframeAllowedSitesValidation\"\n    hideListAreaLabel=\"true\"\n    #iframeAllowedSitesListBuilder=\"ngModel\"\n  ></adapt-rx-list-builder>\n\n  <h4>{{ sections.trustedWebsites.title | translate }}</h4>\n\n  <adapt-rx-list-builder\n    class=\"d-block mb-4\"\n    name=\"trustedWebsitesListBuilder\"\n    [(ngModel)]=\"sections.trustedWebsites.urls\"\n    [label]=\"sections.trustedWebsites.infoMessage | translate\"\n    [texts]=\"listBuilderTexts\"\n    [itemValidation]=\"trustedWebsitesValidation\"\n    hideListAreaLabel=\"true\"\n    #trustedWebsitesListBuilder=\"ngModel\"\n  ></adapt-rx-list-builder>\n\n  <button\n    class=\"align-self-start\"\n    rx-id=\"save-button\"\n    adapt-button\n    btn-type=\"primary\"\n    size=\"small\"\n    type=\"button\"\n    [disabled]=\"!isDirty()\"\n    (click)=\"onSaveClick()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n</rx-admin-settings>\n", components: [{ type: i5.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i6.AdaptRxListBuilderComponent, selector: "adapt-rx-list-builder", inputs: ["hideSearchField", "hideEdit", "hideDelete", "hideListAreaLabel", "customSort", "texts", "menuHeight", "listItemMaxLength", "generateListItemId", "itemValidation", "disabled", "treeStructure", "listItemFormatter", "listItemSetterProp", "listItemContentTemplate", "selectionMode"], outputs: ["listItemAdd", "listItemEdit", "listItemUpdate", "listItemRemove"] }, { type: i6.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IframeSecurityAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-iframe-security',
                    templateUrl: './iframe-security.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxIframeSecurityService }, { type: i2.RxNotificationService }, { type: i3.RxUrlUtilsService }, { type: i4.TranslateService }]; }, propDecorators: { hostClass: [{
                type: HostBinding,
                args: ['class']
            }], iframeAllowedSitesListBuilder: [{
                type: ViewChild,
                args: ['iframeAllowedSitesListBuilder', { read: NgModel, static: true }]
            }], trustedWebsitesListBuilder: [{
                type: ViewChild,
                args: ['trustedWebsitesListBuilder', { read: NgModel, static: true }]
            }] } });
//# sourceMappingURL=iframe-security.component.js.map