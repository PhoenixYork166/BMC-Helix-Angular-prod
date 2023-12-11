import * as i0 from '@angular/core';
import { Injectable, LOCALE_ID, Inject, Directive, Input, NgModule, SecurityContext } from '@angular/core';
import { isEmpty } from '@bmc-ux/adapt-angular';
import { cloneDeep, uniq, forEachRight, forEach, words, join, get, isEmpty as isEmpty$1, trim, forOwn, transform, isObject, assign, isPlainObject, keys, isUndefined, isFinite, isString, upperFirst, lowerCase, kebabCase, includes, toLower, some, isRegExp, size, map } from 'lodash';
import { formatDate } from '@angular/common';
import { saveAs } from 'file-saver';
import { NG_VALIDATORS } from '@angular/forms';
import * as i1 from '@ngx-translate/core';
import BigNumber from 'bignumber.js';
import utf8 from 'utf8';
import quotedPrintable from 'quoted-printable';
import * as i1$1 from '@angular/router';
import * as i2 from '@angular/platform-browser';

class RxArrayUtilsService {
    moveArrayElements(source, elementIndexesToMove, delta) {
        source = cloneDeep(source);
        elementIndexesToMove = uniq(elementIndexesToMove.sort((a, b) => a - b));
        if (delta !== 0 && !isEmpty(elementIndexesToMove)) {
            if (delta > 0) {
                if (elementIndexesToMove[elementIndexesToMove.length - 1] < source.length - 1) {
                    forEachRight(elementIndexesToMove, (indexToMove) => {
                        source.splice(indexToMove + delta, 0, source.splice(indexToMove, 1)[0]);
                    });
                }
            }
            else {
                if (elementIndexesToMove[0] > 0) {
                    forEach(elementIndexesToMove, (indexToMove) => {
                        source.splice(indexToMove + delta, 0, source.splice(indexToMove, 1)[0]);
                    });
                }
            }
        }
        return source;
    }
}
RxArrayUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxArrayUtilsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxArrayUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxArrayUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxArrayUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxColorUtilsService {
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

class RxDateUtilsService {
    constructor(locale) {
        this.locale = locale;
    }
    formatDate(date, format, locale) {
        return formatDate(date, format, locale !== null && locale !== void 0 ? locale : this.locale);
    }
    isTwelveHourClock() {
        const dateString = new Date().toLocaleString();
        return /am|pm/i.test(dateString);
    }
}
RxDateUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDateUtilsService, deps: [{ token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Injectable });
RxDateUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDateUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDateUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [LOCALE_ID]
                }] }]; } });

const RX_SIZE_UNITS = {
    bytes: {
        unit: 'Bytes',
        value: 1
    },
    kilobytes: {
        unit: 'KB',
        value: 1000
    },
    megabytes: {
        unit: 'MB',
        value: 1000000
    },
    gigabytes: {
        unit: 'GB',
        value: 1000000000
    }
};

class RxFileService {
    static saveFile(fileStream) {
        var _a;
        const arrayBufferView = new Uint8Array(fileStream.body);
        const fileName = RxFileService.extractFileName(fileStream);
        const file = new Blob([arrayBufferView], {
            type: (_a = fileStream.headers.get('content-type')) !== null && _a !== void 0 ? _a : undefined
        });
        saveAs(file, fileName);
    }
    static extractFileName(fileStream) {
        var _a;
        const contentDisposition = (_a = fileStream.headers.get('content-disposition')) !== null && _a !== void 0 ? _a : '';
        /*
         *  words('attachment; filename = logs.tar.gz'.replace(/\s/g, ''), /filename=(.*)/)[1];
         *  => 'logs.tar.gz'
         */
        return words(contentDisposition.replace(/\s/g, ''), /filename=(.*)/)[1];
    }
    createAndDownloadBlob(data, type, name, extension) {
        const blob = new Blob([data], { type });
        saveAs(blob, `${name}.${extension}`);
    }
    extractFileName(fileStream) {
        return RxFileService.extractFileName(fileStream);
    }
}
RxFileService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFileService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxFileService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFileService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFileService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxCsvService {
    convertToCsv(csvData) {
        let csv = '';
        forEach(csvData, (row) => {
            const record = join(row, ',');
            csv += `${record}\n`;
        });
        return csv;
    }
}
RxCsvService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCsvService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxCsvService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCsvService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCsvService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxUnitService {
    getValueWithUnits(value) {
        const kilobytes = RX_SIZE_UNITS.kilobytes;
        const megabytes = RX_SIZE_UNITS.megabytes;
        const gigabytes = RX_SIZE_UNITS.gigabytes;
        let valueWithUnits = null;
        if (value < kilobytes.value) {
            valueWithUnits = `${value} ${RX_SIZE_UNITS.bytes.unit}`;
        }
        else if (value < megabytes.value) {
            valueWithUnits = `${value / kilobytes.value} ${kilobytes.unit}`;
        }
        else if (value < gigabytes.value) {
            valueWithUnits = `${value / megabytes.value} ${megabytes.unit}`;
        }
        else {
            valueWithUnits = `${value / gigabytes.value} ${gigabytes.unit}`;
        }
        return valueWithUnits;
    }
    getValueWithoutUnitsByUnitType(value, unitType) {
        const kilobytes = RX_SIZE_UNITS.kilobytes;
        const megabytes = RX_SIZE_UNITS.megabytes;
        const gigabytes = RX_SIZE_UNITS.gigabytes;
        let valueWithoutUnits = null;
        if (unitType === kilobytes.unit) {
            valueWithoutUnits = value / kilobytes.value;
        }
        else if (unitType === megabytes.unit) {
            valueWithoutUnits = value / megabytes.value;
        }
        else if (unitType === gigabytes.unit) {
            valueWithoutUnits = value / gigabytes.value;
        }
        else {
            valueWithoutUnits = value;
        }
        return valueWithoutUnits;
    }
}
RxUnitService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUnitService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxUnitService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUnitService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUnitService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

const baseGuidPattern = '[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';
const idPrefix = 'rx-';
const RX_GUID = {
    baseGuidPattern,
    baseIdPattern: idPrefix + baseGuidPattern,
    idPrefix
};

class RxGuidService {
    generate(prefix) {
        // taken from JointJS, credit: http://stackoverflow.com/posts/2117523/revisions
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0; // tslint:disable-line
            const v = c == 'x' ? r : (r & 0x3) | 0x8; // tslint:disable-line
            return v.toString(16);
        });
        if (prefix) {
            uuid = prefix + uuid;
        }
        return uuid;
    }
    isGuid(tested) {
        const guidPattern = new RegExp('^' + RX_GUID.baseGuidPattern + '$', 'i');
        return guidPattern.test(tested);
    }
}
RxGuidService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGuidService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxGuidService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGuidService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGuidService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxIdService {
    constructor(rxGuidService) {
        this.rxGuidService = rxGuidService;
        this.prefix = 'rx-';
    }
    get(cellId) {
        return cellId ? (cellId.slice(0, this.prefix.length) === this.prefix ? cellId : this.prefix + cellId) : cellId;
    }
    getBase(id) {
        return id.slice(this.prefix.length);
    }
    generate() {
        return this.rxGuidService.generate(this.prefix);
    }
}
RxIdService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIdService, deps: [{ token: RxGuidService }], target: i0.ɵɵFactoryTarget.Injectable });
RxIdService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIdService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIdService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxGuidService }]; } });

class RxIframeUtilsService {
    isRunningInIframe() {
        try {
            return window.self !== window.top;
        }
        catch (e) {
            return true;
        }
    }
    postMessageToHost(messageObject) {
        window.parent.postMessage(JSON.stringify(messageObject), '*');
    }
}
RxIframeUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIframeUtilsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxIframeUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIframeUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIframeUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxJsonValidator {
    constructor(translateService) {
        this.translateService = translateService;
        this.errorMessage = '';
    }
    ngOnInit() {
        this.errorMessage = get(this.rxJson, 'errorMessage', this.translateService.instant('com.bmc.arsys.rx.client.utils.json-validator.error-message'));
    }
    validate(control) {
        let result = null;
        if (control.value) {
            try {
                JSON.parse(control.value);
            }
            catch (ignored) {
                result = {
                    error: {
                        message: this.errorMessage
                    }
                };
            }
        }
        return result;
    }
}
RxJsonValidator.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxJsonValidator, deps: [{ token: i1.TranslateService }], target: i0.ɵɵFactoryTarget.Directive });
RxJsonValidator.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: RxJsonValidator, selector: "[rxJson]", inputs: { rxJson: "rxJson" }, providers: [{ provide: NG_VALIDATORS, useExisting: RxJsonValidator, multi: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxJsonValidator, decorators: [{
            type: Directive,
            args: [{
                    selector: '[rxJson]',
                    providers: [{ provide: NG_VALIDATORS, useExisting: RxJsonValidator, multi: true }]
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }]; }, propDecorators: { rxJson: [{
                type: Input
            }] } });

class RxJsonModule {
}
RxJsonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxJsonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxJsonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxJsonModule, declarations: [RxJsonValidator], exports: [RxJsonValidator] });
RxJsonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxJsonModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxJsonModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxJsonValidator],
                    exports: [RxJsonValidator]
                }]
        }] });

class RxJsonParserService {
    tryParseJson(value, defaultValue) {
        try {
            return JSON.parse(value);
        }
        catch (ignored) {
            return defaultValue;
        }
    }
}
RxJsonParserService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxJsonParserService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxJsonParserService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxJsonParserService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxJsonParserService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxNoWhitespaceValidator {
    constructor(translateService) {
        this.translateService = translateService;
    }
    validate(control) {
        let result = null;
        if (this.rxNoWhitespace !== false && control.value && isEmpty$1(trim(control.value))) {
            result = {
                error: {
                    message: this.translateService.instant('com.bmc.arsys.rx.client.view-components.validation.required.message')
                }
            };
        }
        return result;
    }
}
RxNoWhitespaceValidator.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNoWhitespaceValidator, deps: [{ token: i1.TranslateService }], target: i0.ɵɵFactoryTarget.Directive });
RxNoWhitespaceValidator.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: RxNoWhitespaceValidator, selector: "[rxNoWhitespace]", inputs: { rxNoWhitespace: "rxNoWhitespace" }, providers: [{ provide: NG_VALIDATORS, useExisting: RxNoWhitespaceValidator, multi: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNoWhitespaceValidator, decorators: [{
            type: Directive,
            args: [{
                    selector: '[rxNoWhitespace]',
                    providers: [{ provide: NG_VALIDATORS, useExisting: RxNoWhitespaceValidator, multi: true }]
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }]; }, propDecorators: { rxNoWhitespace: [{
                type: Input
            }] } });

class RxNoWhitespaceValidatorModule {
}
RxNoWhitespaceValidatorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNoWhitespaceValidatorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxNoWhitespaceValidatorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNoWhitespaceValidatorModule, declarations: [RxNoWhitespaceValidator], exports: [RxNoWhitespaceValidator] });
RxNoWhitespaceValidatorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNoWhitespaceValidatorModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNoWhitespaceValidatorModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxNoWhitespaceValidator],
                    exports: [RxNoWhitespaceValidator]
                }]
        }] });

class RxObjectUtilsService {
    /*
      This method creates an object from a string using '.' as separator, for example:
      {
        'foo.bar': 'value',
        'foo.bar2': 'value2'
        'foo1[0].bar3': 'value3'
      }
      will become:
      {
        foo: {
          bar: 'value',
          bar2: 'value2'
        },
        foo1: {
          0: {
            bar3: 'value3
          }
        }
      }
     */
    expandProperties(serializedParameters) {
        const deserializedParameters = {};
        function setNewValue(parameters, keySegments, value) {
            let i = 0;
            while (i < keySegments.length - 1) {
                parameters[keySegments[i]] = parameters[keySegments[i]] || {};
                parameters = parameters[keySegments[i]];
                i++;
            }
            parameters[keySegments[i]] = value;
        }
        forOwn(serializedParameters, function (parameter, key) {
            /*
              Regex
              Input: 'a.b[1].2.c'
              Output: ["a", "b", "1", "", "2", "c"]
            */
            const keySegments = key.split(/[\.(\[\])]/gi).filter(Boolean);
            setNewValue(deserializedParameters, keySegments, parameter);
        });
        return deserializedParameters;
    }
    /*
      This method serializes nested object using '.' as separator, for example:
      {
        foo: {
          bar: 'value',
          bar2: 'value2'
        },
        foo1: 2
      }
  
      will become:
      {
        'foo.bar': 'value',
        'foo.bar2': 'value2'
        'foo1': '2'
      }
     */
    serializeObject(object) {
        return processObject(object);
        function processObject(obj, startWith = {}, prefix) {
            return transform(obj, (result, value, key) => {
                const setKey = prefix ? [prefix, key].join('.') : key;
                if (isObject(value)) {
                    assign(result, processObject(value, startWith, setKey));
                }
                else {
                    result[setKey] = value;
                }
            }, startWith);
        }
    }
    isEmptyObject(value) {
        return isPlainObject(value) && keys(value).length === 0;
    }
    /**
     * Creates a deep clone of a value using JSON converting. This method is much faster than cloneDeep from lodash,
     * but has some serious limitations. To get more details please check JSON.stringify method description.
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Description
     */
    cloneDeep(value) {
        return isUndefined(value) ? value : JSON.parse(JSON.stringify(value));
    }
    mapFromArray(collection, propertyName) {
        return transform(collection, (result, item) => {
            if (!isEmpty$1(item[propertyName])) {
                result.set(item[propertyName], item);
            }
        }, new Map());
    }
}
RxObjectUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxObjectUtilsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxObjectUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxObjectUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxObjectUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxNumberUtilsService {
    isFinite(value) {
        return BigNumber.isBigNumber(value) || isFinite(value);
    }
    isFiniteOrNumberString(value) {
        return this.isFinite(value) || this.isFiniteNumberString(value);
    }
    isFiniteNumberString(value) {
        return isString(value) && value.trim() !== '' && isFinite(Number(value));
    }
}
RxNumberUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNumberUtilsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxNumberUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNumberUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNumberUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

const RX_NUMBER = {
    maxInteger: 2147483647,
    minInteger: -2147483648,
    minDecimal: -1e26,
    maxDecimal: 1e26
};

class RxStringService {
    prettify(value) {
        return upperFirst(lowerCase(value));
    }
    isNonEmptyString(str) {
        return isString(str) && str.length > 0;
    }
    isEmptySafe(string) {
        return isEmpty$1(trim(string));
    }
    toRxId(str) {
        return kebabCase(str);
    }
    escapeRegExp(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }
    caseInsensitiveSearch(searchIn, searchFor) {
        return includes(toLower(searchIn), toLower(searchFor));
    }
    caseInsensitiveIsEqual(stringInitial, stringToCompare) {
        return toLower(stringInitial) === toLower(stringToCompare);
    }
    // Decodes a UTF-8 string encoded with Q encoding according to the rules of RFC 2047.
    // The decoding is done with the use of utf8 and quoted-printable libraries.
    // Some manipulations are done first to strip the 'charset' and 'encoding' from the string
    // as well as replace underscores (_) with a space (=20) in order to convert the string to
    // quoted-printable format.
    decodeQ(qEncodedString) {
        return qEncodedString && qEncodedString.match(/^=\?utf-8\?q\?/i)
            ? utf8.decode(quotedPrintable.decode(qEncodedString.replace(/\s?=\?utf-8\?q\?([^?]+)\?=/gi, '$1').replace(/\_/g, '=20')))
            : qEncodedString;
    }
    // Determines if a given string is included in the array.
    // Array can contain strings, or regular expressions against which the string will be tested.
    isIncluded(str, array) {
        return some(array, (item) => {
            let match = false;
            if (isString(item)) {
                match = item === str;
            }
            else if (isRegExp(item)) {
                match = item.test(str);
            }
            return match;
        });
    }
}
RxStringService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStringService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxStringService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStringService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStringService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxTreeService {
    flatten(tree, childrenPropertyName = 'children') {
        const flattenElements = [];
        const stack = [];
        let currentNode;
        stack.push(tree);
        while (stack.length > 0) {
            currentNode = stack.pop();
            flattenElements.push(currentNode);
            if (!isEmpty$1(currentNode[childrenPropertyName])) {
                currentNode[childrenPropertyName].forEach((childrenNode) => {
                    stack.push(childrenNode);
                });
            }
        }
        return flattenElements;
    }
    flattenTree(tree, ...childrenPropertyNames) {
        let queue = [];
        let currentIndex = 0;
        let currentNode;
        queue.push(tree);
        while (currentIndex < queue.length) {
            currentNode = queue[currentIndex++];
            if (currentNode) {
                forEach(childrenPropertyNames, function (propertyName) {
                    if (size(currentNode[propertyName]) > 0) {
                        queue = queue.concat(currentNode[propertyName]);
                    }
                });
            }
        }
        return queue;
    }
    flattenBy(tree, predicate) {
        const flattenElements = [];
        const stack = [];
        let currentNode = null;
        stack.push(tree);
        while (stack.length > 0) {
            currentNode = stack.pop();
            flattenElements.push(currentNode);
            predicate(currentNode).forEach((childrenNode) => {
                stack.push(childrenNode);
            });
        }
        return flattenElements;
    }
}
RxTreeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTreeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxTreeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTreeService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTreeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxUniqueValidator {
    validate(control) {
        let result = null;
        if (control.dirty && control.value && includes(this.rxUnique.items, control.value)) {
            result = {
                error: {
                    message: this.rxUnique.errorMessage
                }
            };
        }
        return result;
    }
}
RxUniqueValidator.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUniqueValidator, deps: [], target: i0.ɵɵFactoryTarget.Directive });
RxUniqueValidator.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: RxUniqueValidator, selector: "[rxUnique]", inputs: { rxUnique: "rxUnique" }, providers: [{ provide: NG_VALIDATORS, useExisting: RxUniqueValidator, multi: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUniqueValidator, decorators: [{
            type: Directive,
            args: [{
                    selector: '[rxUnique]',
                    providers: [{ provide: NG_VALIDATORS, useExisting: RxUniqueValidator, multi: true }]
                }]
        }], propDecorators: { rxUnique: [{
                type: Input
            }] } });

class RxUniqueValidatorModule {
}
RxUniqueValidatorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUniqueValidatorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxUniqueValidatorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUniqueValidatorModule, declarations: [RxUniqueValidator], exports: [RxUniqueValidator] });
RxUniqueValidatorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUniqueValidatorModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUniqueValidatorModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxUniqueValidator],
                    exports: [RxUniqueValidator]
                }]
        }] });

class RxUrlUtilsService {
    constructor(router, domSanitizer) {
        this.router = router;
        this.domSanitizer = domSanitizer;
    }
    buildUrl(baseUrl, ...queryParams) {
        let url = baseUrl;
        const queryString = this.toQueryString(...queryParams);
        if (queryString) {
            url += '?' + queryString;
        }
        return url;
    }
    isValidUrl(url, isProtocolRequired = true) {
        const regExp = isProtocolRequired
            ? /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/
            : /^((https?|ftp):\/\/)?[^\s/$.?#].[^\s]*$/;
        return regExp.test(url);
    }
    toQueryString(...queryParams) {
        return map(queryParams, (params) => map(params, (value, key) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&')).join('&');
    }
    getBundleIdFromUrl(url) {
        return get(this.router.parseUrl(url !== null && url !== void 0 ? url : window.location.hash.substring(1)), 'root.children.primary.segments[0].path');
    }
    isUrlSafe(url) {
        const sanitizedUrl = this.domSanitizer.sanitize(SecurityContext.URL, url);
        return url === sanitizedUrl;
    }
}
RxUrlUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUrlUtilsService, deps: [{ token: i1$1.Router }, { token: i2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Injectable });
RxUrlUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUrlUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUrlUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.Router }, { type: i2.DomSanitizer }]; } });

class RxError extends Error {
}

/**
 * Generated bundle index. Do not edit.
 */

export { RX_GUID, RX_NUMBER, RX_SIZE_UNITS, RxArrayUtilsService, RxColorUtilsService, RxCsvService, RxDateUtilsService, RxError, RxFileService, RxGuidService, RxIdService, RxIframeUtilsService, RxJsonModule, RxJsonParserService, RxJsonValidator, RxNoWhitespaceValidator, RxNoWhitespaceValidatorModule, RxNumberUtilsService, RxObjectUtilsService, RxStringService, RxTreeService, RxUniqueValidator, RxUniqueValidatorModule, RxUnitService, RxUrlUtilsService };
//# sourceMappingURL=helix-platform-utils.js.map
