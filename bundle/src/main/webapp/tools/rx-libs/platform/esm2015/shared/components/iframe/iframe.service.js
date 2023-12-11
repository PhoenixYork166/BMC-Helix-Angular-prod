import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector, SimpleChange } from '@angular/core';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxIframeComponent } from './iframe.component';
import * as i0 from "@angular/core";
export class RxIframeService {
    constructor(applicationRef, document, componentFactoryResolver, injector) {
        this.applicationRef = applicationRef;
        this.document = document;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
    }
    showIframe(url) {
        if (!this.iframeComponentRef) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(RxIframeComponent);
            this.iframeComponentRef = componentFactory.create(this.injector);
            this.iframeComponentRef.instance.isAbsolutePositioned = true;
            this.applicationRef.attachView(this.iframeComponentRef.hostView);
            const rxIframeHtmlElement = this.iframeComponentRef.hostView
                .rootNodes[0];
            this.document.querySelector('rx-root').appendChild(rxIframeHtmlElement);
            this.setIframeUrl(url);
        }
        else {
            this.iframeComponentRef.instance.isHidden = false;
            this.updateIframeUrl(url);
        }
    }
    hideIframe() {
        this.iframeComponentRef.instance.isHidden = true;
        this.updateIframeUrl(`/${RX_APPLICATION.innovationStudioBundleId}/index.html#/blank`);
    }
    getIframeApi() {
        return this.iframeComponentRef.instance.api;
    }
    setIframeUrl(url) {
        this.iframeComponentRef.instance.ngOnChanges({
            url: new SimpleChange(null, url, false)
        });
    }
    updateIframeUrl(url) {
        this.iframeComponentRef.instance.updateUrl(url);
    }
}
RxIframeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIframeService, deps: [{ token: i0.ApplicationRef }, { token: DOCUMENT }, { token: i0.ComponentFactoryResolver }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxIframeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIframeService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIframeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.ApplicationRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ComponentFactoryResolver }, { type: i0.Injector }]; } });
//# sourceMappingURL=iframe.service.js.map