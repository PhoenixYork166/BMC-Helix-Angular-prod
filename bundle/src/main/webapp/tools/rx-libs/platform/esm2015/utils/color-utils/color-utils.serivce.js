import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class RxColorUtilsService {
    constructor() {
        this.rgbColorRegex = /^rgb\(\d{1,3},\d{1,3},\d{1,3}\)$/i;
    }
    normalize(color) {
        let normalizedColor = color;
        if (this.isValidColor(color)) {
            if (color.length === 4) {
                normalizedColor = `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
            }
            else if (this.rgbColorRegex.test(color)) {
                normalizedColor = this.rgbToHex(color);
            }
        }
        else {
            normalizedColor = '';
        }
        return normalizedColor.toLowerCase() || null;
    }
    isSameColor(color1, color2) {
        return this.normalize(color1) === this.normalize(color2);
    }
    rgbToHex(rgbColor) {
        const hexColor = rgbColor
            .match(/\d+/g)
            .map((x) => Number(x).toString(16).padStart(2, '0'))
            .join('');
        return `#${hexColor}`;
    }
    isValidColor(color) {
        const hexColorRegex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
        return hexColorRegex.test(color) || this.rgbColorRegex.test(color);
    }
}
RxColorUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxColorUtilsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxColorUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxColorUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxColorUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=color-utils.serivce.js.map