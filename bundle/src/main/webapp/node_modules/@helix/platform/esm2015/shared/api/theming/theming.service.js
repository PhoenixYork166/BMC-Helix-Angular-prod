import { Injectable } from '@angular/core';
import { forOwn } from 'lodash';
import { RX_THEMING } from './theming.constant';
import * as i0 from "@angular/core";
export class RxThemingService {
    setCssVariables() {
        Array.from(document.querySelector('link[href*="application/theme"]').sheet.cssRules).forEach((cssStyleRule) => {
            forOwn(RX_THEMING.cssVariableLocator[cssStyleRule.selectorText] || {}, (cssVariableName, cssProperty) => {
                const cssValue = cssStyleRule.style.getPropertyValue(cssProperty);
                if (cssValue) {
                    document.documentElement.style.setProperty(cssVariableName, cssValue);
                }
            });
        });
    }
    copyCssVariables(variables, targetDocument) {
        const sourceStyle = document.documentElement.style;
        const targetStyle = targetDocument.documentElement.style;
        variables.forEach((variableName) => {
            targetStyle.setProperty(variableName, sourceStyle.getPropertyValue(variableName));
        });
    }
}
RxThemingService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxThemingService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxThemingService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxThemingService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxThemingService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=theming.service.js.map