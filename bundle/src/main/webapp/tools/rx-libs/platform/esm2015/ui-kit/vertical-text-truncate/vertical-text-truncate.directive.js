import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export class RxVerticalTextTruncateDirective {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.textToTruncate = '';
        this.rxVerticalTextTruncate = '';
    }
    ngAfterViewInit() {
        this.truncateText();
    }
    ngOnChanges() {
        this.truncateText();
    }
    truncateText() {
        const el = this.renderer.selectRootElement(this.el.nativeElement, true);
        this.textToTruncate = this.rxVerticalTextTruncate;
        if (this.textToTruncate) {
            const words = this.textToTruncate.trim().replace(/\n|\r/g, '').split(' ');
            let resultValue = '';
            for (const word of words) {
                const innerText = el.innerText;
                resultValue = `${innerText} ${word}`;
                if (el.scrollHeight > el.offsetHeight) {
                    // Subtract 3 characters, since we concatenate ...
                    resultValue = `${innerText.slice(0, innerText.length - 3)}...`;
                    break;
                }
            }
            this.renderer.setProperty(el, 'innerText', resultValue);
        }
    }
}
RxVerticalTextTruncateDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxVerticalTextTruncateDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
RxVerticalTextTruncateDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: RxVerticalTextTruncateDirective, selector: "[rxVerticalTextTruncate]", inputs: { rxVerticalTextTruncate: "rxVerticalTextTruncate" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxVerticalTextTruncateDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[rxVerticalTextTruncate]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { rxVerticalTextTruncate: [{
                type: Input
            }] } });
//# sourceMappingURL=vertical-text-truncate.directive.js.map