import { ElementRef, AfterViewInit, OnChanges, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class RxVerticalTextTruncateDirective implements AfterViewInit, OnChanges {
    private el;
    private renderer;
    constructor(el: ElementRef, renderer: Renderer2);
    textToTruncate: string;
    rxVerticalTextTruncate: string;
    ngAfterViewInit(): void;
    ngOnChanges(): void;
    truncateText(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxVerticalTextTruncateDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RxVerticalTextTruncateDirective, "[rxVerticalTextTruncate]", never, { "rxVerticalTextTruncate": "rxVerticalTextTruncate"; }, {}, never>;
}
