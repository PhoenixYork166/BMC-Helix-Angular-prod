import { Injectable } from '@angular/core';
import { assign, forOwn, isEmpty, isObject, isPlainObject, isUndefined, keys, transform } from 'lodash';
import * as i0 from "@angular/core";
export class RxObjectUtilsService {
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
            if (!isEmpty(item[propertyName])) {
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
//# sourceMappingURL=object-utils.service.js.map