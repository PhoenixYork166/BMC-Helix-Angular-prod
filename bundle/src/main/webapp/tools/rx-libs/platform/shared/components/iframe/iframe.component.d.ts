import { ElementRef, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IWindowMessage, RxJsonParserService } from '@helix/platform/utils';
import { IIframeApi } from './iframe.interface';
import * as i0 from "@angular/core";
export declare class RxIframeComponent implements OnChanges {
    private rxJsonParserService;
    private domSanitizer;
    url: string;
    class: string;
    isAbsolutePositioned: boolean;
    isHidden: boolean;
    rxMessage: EventEmitter<IWindowMessage>;
    iframe: ElementRef;
    src: SafeResourceUrl;
    api: IIframeApi;
    onMessage(event: MessageEvent): void;
    constructor(rxJsonParserService: RxJsonParserService, domSanitizer: DomSanitizer);
    ngOnChanges(changes: SimpleChanges): void;
    updateUrl(url: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxIframeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxIframeComponent, "rx-iframe", never, { "url": "url"; }, { "rxMessage": "rxMessage"; }, never, never>;
}
