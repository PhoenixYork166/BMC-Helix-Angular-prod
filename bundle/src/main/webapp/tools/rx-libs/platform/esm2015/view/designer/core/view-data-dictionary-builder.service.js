import { Injectable } from '@angular/core';
import { map, flow, compact, map as _map } from 'lodash';
import * as i0 from "@angular/core";
export class RxViewDataDictionaryBuilderService {
    constructor() {
        this.componentIcon = 'd-icon-file_o';
        this.componentPropertyIcon = 'd-icon-file_o_gear';
        this.settablePropertiesIcon = 'd-icon-arrow_right_square_input';
        this.actionOutputIcon = 'd-icon-arrow_chart';
    }
    getActionOutputDataDictionaryBranch(actionName, dataDictionary) {
        return {
            label: actionName,
            icon: 'd-icon-arrow_chart',
            children: _map(dataDictionary, (dataDictionaryBranch) => this.buildDataDictionaryBranch(dataDictionaryBranch, this.actionOutputIcon))
        };
    }
    getComponentCommonDataDictionaryBranch(branch) {
        return Object.assign(Object.assign({}, branch), { icon: this.componentIcon, children: flow((children) => map(children, (child) => this.buildDataDictionaryBranch(child, this.componentPropertyIcon)), compact)(branch.children) });
    }
    getSettablePropertiesDataDictionary(branches) {
        return map(branches, (branch) => this.buildDataDictionaryBranch(branch, this.settablePropertiesIcon));
    }
    buildDataDictionaryBranch(branch, icon) {
        const node = Object.assign({}, branch);
        if (branch.expression) {
            node.icon = icon;
        }
        if (branch.children) {
            node.children = flow((children) => map(children, (child) => this.buildDataDictionaryBranch(child, icon)), compact)(branch.children);
        }
        return node;
    }
}
RxViewDataDictionaryBuilderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDataDictionaryBuilderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDataDictionaryBuilderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDataDictionaryBuilderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDataDictionaryBuilderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=view-data-dictionary-builder.service.js.map