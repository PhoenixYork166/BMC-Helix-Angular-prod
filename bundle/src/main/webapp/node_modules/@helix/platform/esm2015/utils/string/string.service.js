import { Injectable } from '@angular/core';
import { includes, isEmpty, isString, kebabCase, toLower, trim, some, isRegExp, lowerCase, upperFirst } from 'lodash';
import utf8 from 'utf8';
import quotedPrintable from 'quoted-printable';
import * as i0 from "@angular/core";
export class RxStringService {
    prettify(value) {
        return upperFirst(lowerCase(value));
    }
    isNonEmptyString(str) {
        return isString(str) && str.length > 0;
    }
    isEmptySafe(string) {
        return isEmpty(trim(string));
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
//# sourceMappingURL=string.service.js.map