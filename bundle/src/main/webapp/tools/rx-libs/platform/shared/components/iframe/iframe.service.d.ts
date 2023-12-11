import { ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { IIframeApi } from './iframe.interface';
import * as i0 from "@angular/core";
export declare class RxIframeService {
    private applicationRef;
    private document;
    private componentFactoryResolver;
    private injector;
    private iframeComponentRef;
    constructor(applicationRef: ApplicationRef, document: any, componentFactoryResolver: ComponentFactoryResolver, injector: Injector);
    showIframe(url: string): void;
    hideIframe(): void;
    getIframeApi(): IIframeApi;
    private setIframeUrl;
    private updateIframeUrl;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxIframeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxIframeService>;
}
