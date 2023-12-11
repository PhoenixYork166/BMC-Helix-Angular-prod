import { Injectable } from '@angular/core';
import { chain, map } from 'lodash';
import { NodeInfoType } from './data-dictionary.types';
import * as i0 from "@angular/core";
export class RxDataDictionaryUtils {
    addTooltips(dataDictionary, parentNodeLabel) {
        return map(dataDictionary, (node) => {
            const tooltip = parentNodeLabel ? `${parentNodeLabel} > ${node.label}` : node.label;
            return Object.assign(Object.assign({}, node), { tooltip, children: node.children ? this.addTooltips(node.children, tooltip) : null });
        });
    }
    // TODO-VS: refactor to use below method
    getFunctionsDataDictionaryBranch(functionDescriptors) {
        return chain(functionDescriptors)
            .groupBy('category')
            .map((functionDescriptors, category) => ({
            label: category,
            children: map(functionDescriptors, (functionDescriptor) => ({
                label: functionDescriptor.name + '()',
                icon: 'd-icon-mathematical_function',
                expression: functionDescriptor.name + '()',
                info: {
                    type: NodeInfoType.function,
                    data: functionDescriptor
                }
            }))
        }))
            .value();
    }
    getFunctionDataDictionaryBranch(functionDescriptors) {
        return chain(functionDescriptors)
            .groupBy('type')
            .map((functionDescriptors, functionType) => ({
            label: functionType,
            children: map(functionDescriptors, (functionDescriptor) => ({
                label: functionDescriptor.name + '()',
                icon: 'd-icon-mathematical_function',
                expression: functionDescriptor.name + '()',
                info: {
                    type: NodeInfoType.function,
                    data: functionDescriptor
                }
            }))
        }))
            .value();
    }
}
RxDataDictionaryUtils.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataDictionaryUtils, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxDataDictionaryUtils.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataDictionaryUtils, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataDictionaryUtils, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data-dictionary-utils.service.js.map