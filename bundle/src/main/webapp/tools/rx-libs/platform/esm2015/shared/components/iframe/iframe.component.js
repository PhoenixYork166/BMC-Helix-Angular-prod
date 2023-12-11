import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RxJsonParserService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "@angular/platform-browser";
export class RxIframeComponent {
    constructor(rxJsonParserService, domSanitizer) {
        this.rxJsonParserService = rxJsonParserService;
        this.domSanitizer = domSanitizer;
        this.class = 'd-block';
        this.isAbsolutePositioned = false;
        this.isHidden = false;
        this.rxMessage = new EventEmitter();
        this.api = {
            postMessageToFrame: (message) => {
                this.iframe.nativeElement.contentWindow.postMessage(message, '*');
            }
        };
    }
    onMessage(event) {
        if (event.data) {
            const windowMessage = this.rxJsonParserService.tryParseJson(event.data);
            if (windowMessage) {
                this.rxMessage.emit(windowMessage);
            }
        }
    }
    ngOnChanges(changes) {
        var _a;
        if ((_a = changes.url) === null || _a === void 0 ? void 0 : _a.currentValue) {
            this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(changes.url.currentValue);
        }
    }
    updateUrl(url) {
        this.iframe.nativeElement.contentWindow.location.replace(url);
    }
}
RxIframeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIframeComponent, deps: [{ token: i1.RxJsonParserService }, { token: i2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
RxIframeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxIframeComponent, selector: "rx-iframe", inputs: { url: "url" }, outputs: { rxMessage: "rxMessage" }, host: { listeners: { "window:message": "onMessage($event)" }, properties: { "class": "this.class", "class.position-absolute": "this.isAbsolutePositioned", "class.isHidden": "this.isHidden" } }, viewQueries: [{ propertyName: "iframe", first: true, predicate: ["frame"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<iframe #frame class=\"w-100 h-100 d-block\" frameborder=\"0\" [src]=\"src\"></iframe>\n", styles: [":host.position-absolute{top:52px;bottom:0;left:0;right:0;height:calc(100% - 52px)}:host.position-absolute.isHidden{z-index:-1;visibility:hidden}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIframeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-iframe',
                    templateUrl: './iframe.component.html',
                    styleUrls: ['./iframe.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxJsonParserService }, { type: i2.DomSanitizer }]; }, propDecorators: { url: [{
                type: Input
            }], class: [{
                type: HostBinding,
                args: ['class']
            }], isAbsolutePositioned: [{
                type: HostBinding,
                args: ['class.position-absolute']
            }], isHidden: [{
                type: HostBinding,
                args: ['class.isHidden']
            }], rxMessage: [{
                type: Output
            }], iframe: [{
                type: ViewChild,
                args: ['frame']
            }], onMessage: [{
                type: HostListener,
                args: ['window:message', ['$event']]
            }] } });
//# sourceMappingURL=iframe.component.js.map