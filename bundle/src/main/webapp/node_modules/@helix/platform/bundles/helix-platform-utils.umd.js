(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@bmc-ux/adapt-angular'), require('lodash'), require('@angular/common'), require('file-saver'), require('@angular/forms'), require('@ngx-translate/core'), require('bignumber.js'), require('utf8'), require('quoted-printable'), require('@angular/router'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/utils', ['exports', '@angular/core', '@bmc-ux/adapt-angular', 'lodash', '@angular/common', 'file-saver', '@angular/forms', '@ngx-translate/core', 'bignumber.js', 'utf8', 'quoted-printable', '@angular/router', '@angular/platform-browser'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform.utils = {}), global.ng.core, global.adaptAngular, global.lodash, global.ng.common, global.fileSaver, global.ng.forms, global.ngxTranslateCore, global.bigNumber, global.utf8, global.quotedPrintable, global.ng.router, global.ng.platformBrowser));
})(this, (function (exports, i0, adaptAngular, lodash, common, fileSaver, forms, i1, BigNumber, utf8, quotedPrintable, i1$1, i2) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var BigNumber__default = /*#__PURE__*/_interopDefaultLegacy(BigNumber);
    var utf8__default = /*#__PURE__*/_interopDefaultLegacy(utf8);
    var quotedPrintable__default = /*#__PURE__*/_interopDefaultLegacy(quotedPrintable);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);

    var RxArrayUtilsService = /** @class */ (function () {
        function RxArrayUtilsService() {
        }
        RxArrayUtilsService.prototype.moveArrayElements = function (source, elementIndexesToMove, delta) {
            source = lodash.cloneDeep(source);
            elementIndexesToMove = lodash.uniq(elementIndexesToMove.sort(function (a, b) { return a - b; }));
            if (delta !== 0 && !adaptAngular.isEmpty(elementIndexesToMove)) {
                if (delta > 0) {
                    if (elementIndexesToMove[elementIndexesToMove.length - 1] < source.length - 1) {
                        lodash.forEachRight(elementIndexesToMove, function (indexToMove) {
                            source.splice(indexToMove + delta, 0, source.splice(indexToMove, 1)[0]);
                        });
                    }
                }
                else {
                    if (elementIndexesToMove[0] > 0) {
                        lodash.forEach(elementIndexesToMove, function (indexToMove) {
                            source.splice(indexToMove + delta, 0, source.splice(indexToMove, 1)[0]);
                        });
                    }
                }
            }
            return source;
        };
        return RxArrayUtilsService;
    }());
    RxArrayUtilsService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxArrayUtilsService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxArrayUtilsService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxArrayUtilsService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxArrayUtilsService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxColorUtilsService = /** @class */ (function () {
        function RxColorUtilsService() {
            this.rgbColorRegex = /^rgb\(\d{1,3},\d{1,3},\d{1,3}\)$/i;
        }
        RxColorUtilsService.prototype.normalize = function (color) {
            var normalizedColor = color;
            if (this.isValidColor(color)) {
                if (color.length === 4) {
                    normalizedColor = "#" + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
                }
                else if (this.rgbColorRegex.test(color)) {
                    normalizedColor = this.rgbToHex(color);
                }
            }
            else {
                normalizedColor = '';
            }
            return normalizedColor.toLowerCase() || null;
        };
        RxColorUtilsService.prototype.isSameColor = function (color1, color2) {
            return this.normalize(color1) === this.normalize(color2);
        };
        RxColorUtilsService.prototype.rgbToHex = function (rgbColor) {
            var hexColor = rgbColor
                .match(/\d+/g)
                .map(function (x) { return Number(x).toString(16).padStart(2, '0'); })
                .join('');
            return "#" + hexColor;
        };
        RxColorUtilsService.prototype.isValidColor = function (color) {
            var hexColorRegex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
            return hexColorRegex.test(color) || this.rgbColorRegex.test(color);
        };
        return RxColorUtilsService;
    }());
    RxColorUtilsService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxColorUtilsService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxColorUtilsService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxColorUtilsService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxColorUtilsService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxDateUtilsService = /** @class */ (function () {
        function RxDateUtilsService(locale) {
            this.locale = locale;
        }
        RxDateUtilsService.prototype.formatDate = function (date, format, locale) {
            return common.formatDate(date, format, locale !== null && locale !== void 0 ? locale : this.locale);
        };
        RxDateUtilsService.prototype.isTwelveHourClock = function () {
            var dateString = new Date().toLocaleString();
            return /am|pm/i.test(dateString);
        };
        return RxDateUtilsService;
    }());
    RxDateUtilsService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDateUtilsService, deps: [{ token: i0.LOCALE_ID }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxDateUtilsService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDateUtilsService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDateUtilsService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i0.LOCALE_ID]
                        }] }];
        } });

    var RX_SIZE_UNITS = {
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

    var RxFileService = /** @class */ (function () {
        function RxFileService() {
        }
        RxFileService.saveFile = function (fileStream) {
            var _a;
            var arrayBufferView = new Uint8Array(fileStream.body);
            var fileName = RxFileService.extractFileName(fileStream);
            var file = new Blob([arrayBufferView], {
                type: (_a = fileStream.headers.get('content-type')) !== null && _a !== void 0 ? _a : undefined
            });
            fileSaver.saveAs(file, fileName);
        };
        RxFileService.extractFileName = function (fileStream) {
            var _a;
            var contentDisposition = (_a = fileStream.headers.get('content-disposition')) !== null && _a !== void 0 ? _a : '';
            /*
             *  words('attachment; filename = logs.tar.gz'.replace(/\s/g, ''), /filename=(.*)/)[1];
             *  => 'logs.tar.gz'
             */
            return lodash.words(contentDisposition.replace(/\s/g, ''), /filename=(.*)/)[1];
        };
        RxFileService.prototype.createAndDownloadBlob = function (data, type, name, extension) {
            var blob = new Blob([data], { type: type });
            fileSaver.saveAs(blob, name + "." + extension);
        };
        RxFileService.prototype.extractFileName = function (fileStream) {
            return RxFileService.extractFileName(fileStream);
        };
        return RxFileService;
    }());
    RxFileService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFileService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxFileService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFileService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFileService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxCsvService = /** @class */ (function () {
        function RxCsvService() {
        }
        RxCsvService.prototype.convertToCsv = function (csvData) {
            var csv = '';
            lodash.forEach(csvData, function (row) {
                var record = lodash.join(row, ',');
                csv += record + "\n";
            });
            return csv;
        };
        return RxCsvService;
    }());
    RxCsvService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCsvService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxCsvService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCsvService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCsvService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxUnitService = /** @class */ (function () {
        function RxUnitService() {
        }
        RxUnitService.prototype.getValueWithUnits = function (value) {
            var kilobytes = RX_SIZE_UNITS.kilobytes;
            var megabytes = RX_SIZE_UNITS.megabytes;
            var gigabytes = RX_SIZE_UNITS.gigabytes;
            var valueWithUnits = null;
            if (value < kilobytes.value) {
                valueWithUnits = value + " " + RX_SIZE_UNITS.bytes.unit;
            }
            else if (value < megabytes.value) {
                valueWithUnits = value / kilobytes.value + " " + kilobytes.unit;
            }
            else if (value < gigabytes.value) {
                valueWithUnits = value / megabytes.value + " " + megabytes.unit;
            }
            else {
                valueWithUnits = value / gigabytes.value + " " + gigabytes.unit;
            }
            return valueWithUnits;
        };
        RxUnitService.prototype.getValueWithoutUnitsByUnitType = function (value, unitType) {
            var kilobytes = RX_SIZE_UNITS.kilobytes;
            var megabytes = RX_SIZE_UNITS.megabytes;
            var gigabytes = RX_SIZE_UNITS.gigabytes;
            var valueWithoutUnits = null;
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
        };
        return RxUnitService;
    }());
    RxUnitService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUnitService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxUnitService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUnitService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUnitService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var baseGuidPattern = '[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';
    var idPrefix = 'rx-';
    var RX_GUID = {
        baseGuidPattern: baseGuidPattern,
        baseIdPattern: idPrefix + baseGuidPattern,
        idPrefix: idPrefix
    };

    var RxGuidService = /** @class */ (function () {
        function RxGuidService() {
        }
        RxGuidService.prototype.generate = function (prefix) {
            // taken from JointJS, credit: http://stackoverflow.com/posts/2117523/revisions
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (Math.random() * 16) | 0; // tslint:disable-line
                var v = c == 'x' ? r : (r & 0x3) | 0x8; // tslint:disable-line
                return v.toString(16);
            });
            if (prefix) {
                uuid = prefix + uuid;
            }
            return uuid;
        };
        RxGuidService.prototype.isGuid = function (tested) {
            var guidPattern = new RegExp('^' + RX_GUID.baseGuidPattern + '$', 'i');
            return guidPattern.test(tested);
        };
        return RxGuidService;
    }());
    RxGuidService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGuidService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxGuidService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGuidService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGuidService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxIdService = /** @class */ (function () {
        function RxIdService(rxGuidService) {
            this.rxGuidService = rxGuidService;
            this.prefix = 'rx-';
        }
        RxIdService.prototype.get = function (cellId) {
            return cellId ? (cellId.slice(0, this.prefix.length) === this.prefix ? cellId : this.prefix + cellId) : cellId;
        };
        RxIdService.prototype.getBase = function (id) {
            return id.slice(this.prefix.length);
        };
        RxIdService.prototype.generate = function () {
            return this.rxGuidService.generate(this.prefix);
        };
        return RxIdService;
    }());
    RxIdService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIdService, deps: [{ token: RxGuidService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxIdService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIdService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIdService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxGuidService }]; } });

    var RxIframeUtilsService = /** @class */ (function () {
        function RxIframeUtilsService() {
        }
        RxIframeUtilsService.prototype.isRunningInIframe = function () {
            try {
                return window.self !== window.top;
            }
            catch (e) {
                return true;
            }
        };
        RxIframeUtilsService.prototype.postMessageToHost = function (messageObject) {
            window.parent.postMessage(JSON.stringify(messageObject), '*');
        };
        return RxIframeUtilsService;
    }());
    RxIframeUtilsService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIframeUtilsService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxIframeUtilsService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIframeUtilsService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIframeUtilsService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxJsonValidator = /** @class */ (function () {
        function RxJsonValidator(translateService) {
            this.translateService = translateService;
            this.errorMessage = '';
        }
        RxJsonValidator.prototype.ngOnInit = function () {
            this.errorMessage = lodash.get(this.rxJson, 'errorMessage', this.translateService.instant('com.bmc.arsys.rx.client.utils.json-validator.error-message'));
        };
        RxJsonValidator.prototype.validate = function (control) {
            var result = null;
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
        };
        return RxJsonValidator;
    }());
    RxJsonValidator.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxJsonValidator, deps: [{ token: i1__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    RxJsonValidator.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: RxJsonValidator, selector: "[rxJson]", inputs: { rxJson: "rxJson" }, providers: [{ provide: forms.NG_VALIDATORS, useExisting: RxJsonValidator, multi: true }], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxJsonValidator, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[rxJson]',
                        providers: [{ provide: forms.NG_VALIDATORS, useExisting: RxJsonValidator, multi: true }]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.TranslateService }]; }, propDecorators: { rxJson: [{
                    type: i0.Input
                }] } });

    var RxJsonModule = /** @class */ (function () {
        function RxJsonModule() {
        }
        return RxJsonModule;
    }());
    RxJsonModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxJsonModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxJsonModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxJsonModule, declarations: [RxJsonValidator], exports: [RxJsonValidator] });
    RxJsonModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxJsonModule });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxJsonModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxJsonValidator],
                        exports: [RxJsonValidator]
                    }]
            }] });

    var RxJsonParserService = /** @class */ (function () {
        function RxJsonParserService() {
        }
        RxJsonParserService.prototype.tryParseJson = function (value, defaultValue) {
            try {
                return JSON.parse(value);
            }
            catch (ignored) {
                return defaultValue;
            }
        };
        return RxJsonParserService;
    }());
    RxJsonParserService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxJsonParserService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxJsonParserService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxJsonParserService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxJsonParserService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxNoWhitespaceValidator = /** @class */ (function () {
        function RxNoWhitespaceValidator(translateService) {
            this.translateService = translateService;
        }
        RxNoWhitespaceValidator.prototype.validate = function (control) {
            var result = null;
            if (this.rxNoWhitespace !== false && control.value && lodash.isEmpty(lodash.trim(control.value))) {
                result = {
                    error: {
                        message: this.translateService.instant('com.bmc.arsys.rx.client.view-components.validation.required.message')
                    }
                };
            }
            return result;
        };
        return RxNoWhitespaceValidator;
    }());
    RxNoWhitespaceValidator.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNoWhitespaceValidator, deps: [{ token: i1__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    RxNoWhitespaceValidator.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: RxNoWhitespaceValidator, selector: "[rxNoWhitespace]", inputs: { rxNoWhitespace: "rxNoWhitespace" }, providers: [{ provide: forms.NG_VALIDATORS, useExisting: RxNoWhitespaceValidator, multi: true }], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNoWhitespaceValidator, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[rxNoWhitespace]',
                        providers: [{ provide: forms.NG_VALIDATORS, useExisting: RxNoWhitespaceValidator, multi: true }]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.TranslateService }]; }, propDecorators: { rxNoWhitespace: [{
                    type: i0.Input
                }] } });

    var RxNoWhitespaceValidatorModule = /** @class */ (function () {
        function RxNoWhitespaceValidatorModule() {
        }
        return RxNoWhitespaceValidatorModule;
    }());
    RxNoWhitespaceValidatorModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNoWhitespaceValidatorModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxNoWhitespaceValidatorModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNoWhitespaceValidatorModule, declarations: [RxNoWhitespaceValidator], exports: [RxNoWhitespaceValidator] });
    RxNoWhitespaceValidatorModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNoWhitespaceValidatorModule });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNoWhitespaceValidatorModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxNoWhitespaceValidator],
                        exports: [RxNoWhitespaceValidator]
                    }]
            }] });

    var RxObjectUtilsService = /** @class */ (function () {
        function RxObjectUtilsService() {
        }
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
        RxObjectUtilsService.prototype.expandProperties = function (serializedParameters) {
            var deserializedParameters = {};
            function setNewValue(parameters, keySegments, value) {
                var i = 0;
                while (i < keySegments.length - 1) {
                    parameters[keySegments[i]] = parameters[keySegments[i]] || {};
                    parameters = parameters[keySegments[i]];
                    i++;
                }
                parameters[keySegments[i]] = value;
            }
            lodash.forOwn(serializedParameters, function (parameter, key) {
                /*
                  Regex
                  Input: 'a.b[1].2.c'
                  Output: ["a", "b", "1", "", "2", "c"]
                */
                var keySegments = key.split(/[\.(\[\])]/gi).filter(Boolean);
                setNewValue(deserializedParameters, keySegments, parameter);
            });
            return deserializedParameters;
        };
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
        RxObjectUtilsService.prototype.serializeObject = function (object) {
            return processObject(object);
            function processObject(obj, startWith, prefix) {
                if (startWith === void 0) { startWith = {}; }
                return lodash.transform(obj, function (result, value, key) {
                    var setKey = prefix ? [prefix, key].join('.') : key;
                    if (lodash.isObject(value)) {
                        lodash.assign(result, processObject(value, startWith, setKey));
                    }
                    else {
                        result[setKey] = value;
                    }
                }, startWith);
            }
        };
        RxObjectUtilsService.prototype.isEmptyObject = function (value) {
            return lodash.isPlainObject(value) && lodash.keys(value).length === 0;
        };
        /**
         * Creates a deep clone of a value using JSON converting. This method is much faster than cloneDeep from lodash,
         * but has some serious limitations. To get more details please check JSON.stringify method description.
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Description
         */
        RxObjectUtilsService.prototype.cloneDeep = function (value) {
            return lodash.isUndefined(value) ? value : JSON.parse(JSON.stringify(value));
        };
        RxObjectUtilsService.prototype.mapFromArray = function (collection, propertyName) {
            return lodash.transform(collection, function (result, item) {
                if (!lodash.isEmpty(item[propertyName])) {
                    result.set(item[propertyName], item);
                }
            }, new Map());
        };
        return RxObjectUtilsService;
    }());
    RxObjectUtilsService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxObjectUtilsService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxObjectUtilsService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxObjectUtilsService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxObjectUtilsService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxNumberUtilsService = /** @class */ (function () {
        function RxNumberUtilsService() {
        }
        RxNumberUtilsService.prototype.isFinite = function (value) {
            return BigNumber__default["default"].isBigNumber(value) || lodash.isFinite(value);
        };
        RxNumberUtilsService.prototype.isFiniteOrNumberString = function (value) {
            return this.isFinite(value) || this.isFiniteNumberString(value);
        };
        RxNumberUtilsService.prototype.isFiniteNumberString = function (value) {
            return lodash.isString(value) && value.trim() !== '' && lodash.isFinite(Number(value));
        };
        return RxNumberUtilsService;
    }());
    RxNumberUtilsService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNumberUtilsService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxNumberUtilsService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNumberUtilsService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNumberUtilsService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RX_NUMBER = {
        maxInteger: 2147483647,
        minInteger: -2147483648,
        minDecimal: -1e26,
        maxDecimal: 1e26
    };

    var RxStringService = /** @class */ (function () {
        function RxStringService() {
        }
        RxStringService.prototype.prettify = function (value) {
            return lodash.upperFirst(lodash.lowerCase(value));
        };
        RxStringService.prototype.isNonEmptyString = function (str) {
            return lodash.isString(str) && str.length > 0;
        };
        RxStringService.prototype.isEmptySafe = function (string) {
            return lodash.isEmpty(lodash.trim(string));
        };
        RxStringService.prototype.toRxId = function (str) {
            return lodash.kebabCase(str);
        };
        RxStringService.prototype.escapeRegExp = function (text) {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        };
        RxStringService.prototype.caseInsensitiveSearch = function (searchIn, searchFor) {
            return lodash.includes(lodash.toLower(searchIn), lodash.toLower(searchFor));
        };
        RxStringService.prototype.caseInsensitiveIsEqual = function (stringInitial, stringToCompare) {
            return lodash.toLower(stringInitial) === lodash.toLower(stringToCompare);
        };
        // Decodes a UTF-8 string encoded with Q encoding according to the rules of RFC 2047.
        // The decoding is done with the use of utf8 and quoted-printable libraries.
        // Some manipulations are done first to strip the 'charset' and 'encoding' from the string
        // as well as replace underscores (_) with a space (=20) in order to convert the string to
        // quoted-printable format.
        RxStringService.prototype.decodeQ = function (qEncodedString) {
            return qEncodedString && qEncodedString.match(/^=\?utf-8\?q\?/i)
                ? utf8__default["default"].decode(quotedPrintable__default["default"].decode(qEncodedString.replace(/\s?=\?utf-8\?q\?([^?]+)\?=/gi, '$1').replace(/\_/g, '=20')))
                : qEncodedString;
        };
        // Determines if a given string is included in the array.
        // Array can contain strings, or regular expressions against which the string will be tested.
        RxStringService.prototype.isIncluded = function (str, array) {
            return lodash.some(array, function (item) {
                var match = false;
                if (lodash.isString(item)) {
                    match = item === str;
                }
                else if (lodash.isRegExp(item)) {
                    match = item.test(str);
                }
                return match;
            });
        };
        return RxStringService;
    }());
    RxStringService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxStringService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxStringService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxStringService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxStringService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxTreeService = /** @class */ (function () {
        function RxTreeService() {
        }
        RxTreeService.prototype.flatten = function (tree, childrenPropertyName) {
            if (childrenPropertyName === void 0) { childrenPropertyName = 'children'; }
            var flattenElements = [];
            var stack = [];
            var currentNode;
            stack.push(tree);
            while (stack.length > 0) {
                currentNode = stack.pop();
                flattenElements.push(currentNode);
                if (!lodash.isEmpty(currentNode[childrenPropertyName])) {
                    currentNode[childrenPropertyName].forEach(function (childrenNode) {
                        stack.push(childrenNode);
                    });
                }
            }
            return flattenElements;
        };
        RxTreeService.prototype.flattenTree = function (tree) {
            var childrenPropertyNames = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                childrenPropertyNames[_i - 1] = arguments[_i];
            }
            var queue = [];
            var currentIndex = 0;
            var currentNode;
            queue.push(tree);
            while (currentIndex < queue.length) {
                currentNode = queue[currentIndex++];
                if (currentNode) {
                    lodash.forEach(childrenPropertyNames, function (propertyName) {
                        if (lodash.size(currentNode[propertyName]) > 0) {
                            queue = queue.concat(currentNode[propertyName]);
                        }
                    });
                }
            }
            return queue;
        };
        RxTreeService.prototype.flattenBy = function (tree, predicate) {
            var flattenElements = [];
            var stack = [];
            var currentNode = null;
            stack.push(tree);
            while (stack.length > 0) {
                currentNode = stack.pop();
                flattenElements.push(currentNode);
                predicate(currentNode).forEach(function (childrenNode) {
                    stack.push(childrenNode);
                });
            }
            return flattenElements;
        };
        return RxTreeService;
    }());
    RxTreeService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxTreeService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxTreeService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxTreeService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxTreeService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxUniqueValidator = /** @class */ (function () {
        function RxUniqueValidator() {
        }
        RxUniqueValidator.prototype.validate = function (control) {
            var result = null;
            if (control.dirty && control.value && lodash.includes(this.rxUnique.items, control.value)) {
                result = {
                    error: {
                        message: this.rxUnique.errorMessage
                    }
                };
            }
            return result;
        };
        return RxUniqueValidator;
    }());
    RxUniqueValidator.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUniqueValidator, deps: [], target: i0__namespace.ɵɵFactoryTarget.Directive });
    RxUniqueValidator.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: RxUniqueValidator, selector: "[rxUnique]", inputs: { rxUnique: "rxUnique" }, providers: [{ provide: forms.NG_VALIDATORS, useExisting: RxUniqueValidator, multi: true }], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUniqueValidator, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[rxUnique]',
                        providers: [{ provide: forms.NG_VALIDATORS, useExisting: RxUniqueValidator, multi: true }]
                    }]
            }], propDecorators: { rxUnique: [{
                    type: i0.Input
                }] } });

    var RxUniqueValidatorModule = /** @class */ (function () {
        function RxUniqueValidatorModule() {
        }
        return RxUniqueValidatorModule;
    }());
    RxUniqueValidatorModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUniqueValidatorModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxUniqueValidatorModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUniqueValidatorModule, declarations: [RxUniqueValidator], exports: [RxUniqueValidator] });
    RxUniqueValidatorModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUniqueValidatorModule });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUniqueValidatorModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxUniqueValidator],
                        exports: [RxUniqueValidator]
                    }]
            }] });

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var RxUrlUtilsService = /** @class */ (function () {
        function RxUrlUtilsService(router, domSanitizer) {
            this.router = router;
            this.domSanitizer = domSanitizer;
        }
        RxUrlUtilsService.prototype.buildUrl = function (baseUrl) {
            var queryParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                queryParams[_i - 1] = arguments[_i];
            }
            var url = baseUrl;
            var queryString = this.toQueryString.apply(this, __spreadArray([], __read(queryParams)));
            if (queryString) {
                url += '?' + queryString;
            }
            return url;
        };
        RxUrlUtilsService.prototype.isValidUrl = function (url, isProtocolRequired) {
            if (isProtocolRequired === void 0) { isProtocolRequired = true; }
            var regExp = isProtocolRequired
                ? /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/
                : /^((https?|ftp):\/\/)?[^\s/$.?#].[^\s]*$/;
            return regExp.test(url);
        };
        RxUrlUtilsService.prototype.toQueryString = function () {
            var queryParams = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                queryParams[_i] = arguments[_i];
            }
            return lodash.map(queryParams, function (params) { return lodash.map(params, function (value, key) { return encodeURIComponent(key) + "=" + encodeURIComponent(value); }).join('&'); }).join('&');
        };
        RxUrlUtilsService.prototype.getBundleIdFromUrl = function (url) {
            return lodash.get(this.router.parseUrl(url !== null && url !== void 0 ? url : window.location.hash.substring(1)), 'root.children.primary.segments[0].path');
        };
        RxUrlUtilsService.prototype.isUrlSafe = function (url) {
            var sanitizedUrl = this.domSanitizer.sanitize(i0.SecurityContext.URL, url);
            return url === sanitizedUrl;
        };
        return RxUrlUtilsService;
    }());
    RxUrlUtilsService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUrlUtilsService, deps: [{ token: i1__namespace$1.Router }, { token: i2__namespace.DomSanitizer }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxUrlUtilsService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUrlUtilsService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUrlUtilsService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.Router }, { type: i2__namespace.DomSanitizer }]; } });

    var RxError = /** @class */ (function (_super) {
        __extends(RxError, _super);
        function RxError() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return RxError;
    }(Error));

    /**
     * Generated bundle index. Do not edit.
     */

    exports.RX_GUID = RX_GUID;
    exports.RX_NUMBER = RX_NUMBER;
    exports.RX_SIZE_UNITS = RX_SIZE_UNITS;
    exports.RxArrayUtilsService = RxArrayUtilsService;
    exports.RxColorUtilsService = RxColorUtilsService;
    exports.RxCsvService = RxCsvService;
    exports.RxDateUtilsService = RxDateUtilsService;
    exports.RxError = RxError;
    exports.RxFileService = RxFileService;
    exports.RxGuidService = RxGuidService;
    exports.RxIdService = RxIdService;
    exports.RxIframeUtilsService = RxIframeUtilsService;
    exports.RxJsonModule = RxJsonModule;
    exports.RxJsonParserService = RxJsonParserService;
    exports.RxJsonValidator = RxJsonValidator;
    exports.RxNoWhitespaceValidator = RxNoWhitespaceValidator;
    exports.RxNoWhitespaceValidatorModule = RxNoWhitespaceValidatorModule;
    exports.RxNumberUtilsService = RxNumberUtilsService;
    exports.RxObjectUtilsService = RxObjectUtilsService;
    exports.RxStringService = RxStringService;
    exports.RxTreeService = RxTreeService;
    exports.RxUniqueValidator = RxUniqueValidator;
    exports.RxUniqueValidatorModule = RxUniqueValidatorModule;
    exports.RxUnitService = RxUnitService;
    exports.RxUrlUtilsService = RxUrlUtilsService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-utils.umd.js.map
