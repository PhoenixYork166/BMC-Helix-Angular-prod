import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { find, flow, forEach, groupBy, map } from 'lodash';
import { Observable } from 'rxjs';
import { distinctUntilChanged, finalize, pluck, takeUntil, withLatestFrom } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/forms";
export class ServiceListComponent extends BaseViewComponent {
    constructor(httpClient) {
        super();
        this.httpClient = httpClient;
        this.isDisabled = true;
        this.serviceListOptions = [];
        this.service = {
            id: null,
            name: null,
            guid: null
        };
    }
    ngOnInit() {
        super.ngOnInit();
        const serviceRequestId$ = this.config.pipe(pluck('serviceRequestId'), distinctUntilChanged(), takeUntil(this.destroyed$));
        this.httpClient
            .get('/api/com.bmc.dsm.chatbot/rx/application/chatbot/services')
            .pipe(withLatestFrom(serviceRequestId$), finalize(() => {
            this.isDisabled = false;
        }), takeUntil(this.destroyed$))
            .subscribe(([chatbotServices, serviceRequestId]) => {
            this.serviceListOptions = flow((catalogs) => groupBy(catalogs, 'groupName'), (catalogsByGroup) => map(catalogsByGroup, (catalogs, groupName) => ({
                name: groupName,
                children: map(catalogs, (catalog) => ({
                    id: catalog.id,
                    name: catalog.name,
                    guid: catalog.guid
                }))
            })))((chatbotServices === null || chatbotServices === void 0 ? void 0 : chatbotServices.catalogDetailsList) || []);
            this.selectServiceRequest(serviceRequestId);
        });
        serviceRequestId$.pipe(takeUntil(this.destroyed$)).subscribe((requestId) => {
            this.selectServiceRequest(requestId);
        });
    }
    selectServiceRequest(serviceRequestId) {
        let service;
        forEach(this.serviceListOptions, (item) => {
            if (service) {
                return false;
            }
            service = find(item.children, {
                id: serviceRequestId
            });
        });
        this.service = service
            ? [
                {
                    id: service.id,
                    name: service.name,
                    guid: service.guid
                }
            ]
            : [];
    }
    onSelectionChange(event) {
        const service = event.options[0];
        this.notifyPropertyChanged('serviceRequestId', service.id);
        this.notifyPropertyChanged('serviceRequestName', service.name);
        this.notifyPropertyChanged('serviceRequestGuid', service.guid);
    }
    optionFormatter(option) {
        return option.name;
    }
}
ServiceListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServiceListComponent, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Component });
ServiceListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ServiceListComponent, selector: "rx-service-list", inputs: { config: "config" }, usesInheritance: true, ngImport: i0, template: "<adapt-rx-select\n  label=\"Service name\"\n  required=\"true\"\n  [options]=\"serviceListOptions\"\n  [disabled]=\"isDisabled\"\n  (onSelectionChange)=\"onSelectionChange($event)\"\n  [ngModel]=\"service\"\n  [optionFormatter]=\"optionFormatter\"\n  enableFilter=\"true\"\n>\n</adapt-rx-select>\n", components: [{ type: i2.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServiceListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-service-list',
                    templateUrl: './service-list.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; }, propDecorators: { config: [{
                type: Input
            }] } });
//# sourceMappingURL=service-list.component.js.map