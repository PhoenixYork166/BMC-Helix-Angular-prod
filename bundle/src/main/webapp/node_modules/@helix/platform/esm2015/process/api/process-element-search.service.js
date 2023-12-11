import { Injectable } from '@angular/core';
import { find, forEach, filter, transform, flatten } from 'lodash';
import * as i0 from "@angular/core";
export class RxProcessElementSearchService {
    find(definition, predicate) {
        let processElement = this.findElementInDefinition(definition, predicate);
        if (!processElement) {
            processElement = find(this.flattenElements(definition), predicate);
        }
        return processElement;
    }
    findElementInDefinition(definition, predicate) {
        return find(definition.flowElements, predicate) || find(definition.artifacts, predicate);
    }
    findOwner(definition, guid) {
        const processElement = this.findElementInDefinition(definition, { guid: guid });
        let result;
        if (processElement) {
            result = definition;
        }
        else {
            result = find(this.flattenElements(definition), (element) => {
                return this.findElementInDefinition(element, { guid: guid });
            });
        }
        return result;
    }
    findByGuid(definition, guid) {
        return this.find(definition, { guid: guid });
    }
    filter(definition, predicate) {
        return filter(this.flattenElements(definition), predicate);
    }
    forEach(definition, iteratee) {
        return forEach(this.flattenElements(definition), iteratee);
    }
    flattenElements(definition) {
        return flatten(transform([].concat(definition.flowElements || [], definition.artifacts || []), (result, element) => {
            result.push(element);
            if (element.flowElements) {
                result.push(this.flattenElements(element));
            }
        }, []));
    }
}
RxProcessElementSearchService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementSearchService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxProcessElementSearchService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementSearchService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementSearchService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=process-element-search.service.js.map