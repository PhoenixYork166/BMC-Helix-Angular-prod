import { Injectable } from '@angular/core';
import { forEach, includes, isEmpty, isEqual, isString, keys, reduce } from 'lodash';
import { RxJsonParserService } from '@helix/platform/utils';
import { RecordGridFilterOperator } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
export class RxRecordGridFilterHelperService {
    constructor(rxJsonParserService) {
        this.rxJsonParserService = rxJsonParserService;
        this.filtersKeywords = ['$NULL$', '$TIME$', '$DATE$', '$TIMESTAMP$', '$USER$'];
    }
    // Convert predefined filter data from:
    // "{
    //   and: [
    //     "or": [
    //       {
    //         "eq": "36dfbd6f-7a19-4b4a-81bf-431fe41f6862"
    //       }
    //     ]
    //   ]
    // }"
    //
    //
    // to:
    // {
    //   and: [
    //     "or": [
    //       {
    //         "eq": {
    //           "1": "bar"
    //         }
    //       }
    //     ]
    //   ]
    // }
    //
    getRecordGridFilterDataFromPredefinedFilter(filterJson, recordGridFilters) {
        if (!isEmpty(recordGridFilters) && filterJson) {
            filterJson = this.normalizeFilterString(filterJson, recordGridFilters);
        }
        return this.clearFilterData(this.rxJsonParserService.tryParseJson(filterJson));
    }
    // Convert predefined filter string from:
    // "{
    //   and: [
    //     "or": [
    //       {
    //         "eq": "36dfbd6f-7a19-4b4a-81bf-431fe41f6862"
    //       }
    //     ]
    //   ]
    // }"
    //
    // to:
    // "{
    //   and: [
    //     "or": [
    //       {
    //         "eq": {
    //           "1": "bar"
    //         }
    //       }
    //     ]
    //   ]
    // }"
    //
    normalizeFilterString(filterString, filterComponents) {
        forEach(filterComponents, (filterComponent) => {
            const filterExpression = Object.assign({ [filterComponent.fieldId]: filterComponent.value }, (filterComponent.$DISPLAYVALUE$ && { $DISPLAYVALUE$: filterComponent.$DISPLAYVALUE$ }));
            filterString = filterString.replace(`"${filterComponent.guid}"`, JSON.stringify(filterExpression));
        });
        return filterString;
    }
    // Convert predefined filter string from:
    // "{
    //   and: [
    //     "or": [
    //       {
    //         "eq": {
    //           "1": "bar"
    //         }
    //       }
    //     ]
    //   ]
    // }"
    //
    //
    // to:
    // "{
    //   and: [
    //     "or": [
    //       {
    //         "eq": "36dfbd6f-7a19-4b4a-81bf-431fe41f6862"
    //       }
    //     ]
    //   ]
    // }"
    //
    denormalizeFilterString(filterString, filterComponents) {
        forEach(filterComponents, (filterComponent) => {
            const filterExpression = Object.assign({ [filterComponent.fieldId]: filterComponent.value }, (filterComponent.$DISPLAYVALUE$ && { $DISPLAYVALUE$: filterComponent.$DISPLAYVALUE$ }));
            if (filterExpression.$DISPLAYVALUE$) {
                filterString = JSON.stringify(JSON.parse(filterString), this.replacer(this.denormalize(filterComponent.guid, filterExpression)));
            }
            else {
                filterString = filterString.replace(JSON.stringify(filterExpression), `"${filterComponent.guid}"`);
            }
        });
        return filterString;
    }
    // e.g.
    // fn = denormalize(guid, {"536870913":"AGGADG1AAXPMRARKA0FGRKA0FG6I01","$DISPLAYVALUE$":"foo"});
    //
    // var filterExpression = {
    //   "and": [
    //     {
    //       "or": [
    //         {
    //           "eq": {
    //             "536870913": "AGGADG1AAXPMRARKA0FGRKA0FG6I01",
    //             "$DISPLAYVALUE$": "foo"
    //           }
    //         }
    //       ]
    //     }
    //   ]
    // };
    //
    // JSON.stringify(filterExpression,replacer(fn));
    // Here the filterExpression's keys are "add", “0”, “or”, “0”, “eq”
    //
    replacer(fn) {
        return (key, value) => (typeof key === 'string' && fn[key] ? fn[key](value) : value);
    }
    // This method declares, how object's value of an operator key should denormalize.
    //
    // Converts the Enum RecordGridFilterOperator
    // to
    // "
    // {
    //   "eq": fn(),
    //   "gte": fn(),
    //   "lte": fn(),
    //   "like": fn(),
    //   "ne": fn(),
    //   "lt": fn(),
    //   "gt": fn(),
    //   "in": fn()
    // }
    // "
    //  Note : fn() defines, how the value should be updated.
    //
    // e.g.
    // Converts predefined filter string from:
    //  {"and":[{"or":[{"eq":{"Foo":"Bar","$DISPLAYVALUE$":"Baz"}}]}]}
    // to:
    //  {“and":[{"or":[{"eq":"aa88747c-8b8e-4dee-abf2-556b84b7d28e"}]}]}
    denormalize(guid, filterExpression) {
        return reduce(RecordGridFilterOperator, (result, operator) => {
            result[operator] = (value) => (isEqual(value, filterExpression) ? guid : value);
            return result;
        }, {});
    }
    clearFilterData(node) {
        const nodeKeys = keys(node);
        let result = node;
        if (!isEmpty(nodeKeys)) {
            const operator = nodeKeys[0];
            switch (true) {
                case includes(['or', 'and'], operator): {
                    const children = node[operator].map(this.clearFilterData.bind(this)).filter((child) => Boolean(child));
                    if (!isEmpty(children)) {
                        node[operator] = children;
                    }
                    else {
                        result = null;
                    }
                    break;
                }
                case isString(node[operator]): {
                    result = null;
                    break;
                }
            }
        }
        return result;
    }
    replaceKeywords(query) {
        const singleQuoteRegexTemplate = '([^|^"])"(' + this.filtersKeywords.join('|').replace(/\$/g, '\\$') + ')"(?!")';
        const tripleQuoteRegexTemplate = '([^|^"])"""(' + this.filtersKeywords.join('|').replace(/\$/g, '\\$') + ')"""(?!")';
        const singleQuoteRegex = new RegExp(singleQuoteRegexTemplate, 'g');
        const tripleQuoteRegex = new RegExp(tripleQuoteRegexTemplate, 'g');
        return query.replace(singleQuoteRegex, '$1$2').replace(tripleQuoteRegex, '$1"$2"');
    }
}
RxRecordGridFilterHelperService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridFilterHelperService, deps: [{ token: i1.RxJsonParserService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordGridFilterHelperService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridFilterHelperService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridFilterHelperService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxJsonParserService }]; } });
//# sourceMappingURL=record-grid-filter-helper.service.js.map