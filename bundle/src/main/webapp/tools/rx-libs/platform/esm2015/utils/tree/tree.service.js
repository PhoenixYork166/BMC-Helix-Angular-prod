import { forEach, isEmpty, size } from 'lodash';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class RxTreeService {
    flatten(tree, childrenPropertyName = 'children') {
        const flattenElements = [];
        const stack = [];
        let currentNode;
        stack.push(tree);
        while (stack.length > 0) {
            currentNode = stack.pop();
            flattenElements.push(currentNode);
            if (!isEmpty(currentNode[childrenPropertyName])) {
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
//# sourceMappingURL=tree.service.js.map