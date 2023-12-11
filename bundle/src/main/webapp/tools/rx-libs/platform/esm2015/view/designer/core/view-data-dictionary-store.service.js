import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { flow, has, isEmpty, map, omit, reject, sortBy } from 'lodash';
import * as i0 from "@angular/core";
export class RxViewDataDictionaryStoreService {
    constructor() {
        this.componentsCommon = null;
        this.componentsCommonSubject = new ReplaySubject(1);
        this.componentsCommon$ = this.componentsCommonSubject.asObservable();
        this.viewCommon = null;
        this.viewCommonSubject = new ReplaySubject(1);
        this.viewCommon$ = this.viewCommonSubject.asObservable();
        this.actionsOutput = [];
        this.actionsOutputSubject = new ReplaySubject(1);
        this.actionsOutput$ = this.actionsOutputSubject.asObservable();
        this.settableProperties = null;
        this.settablePropertiesSubject = new ReplaySubject(1);
        this.settableProperties$ = this.settablePropertiesSubject.asObservable();
    }
    setCommonDataDictionaryBranch(guid, dataDictionaryBranch) {
        this.setComponentCommon(isEmpty(dataDictionaryBranch)
            ? omit(this.componentsCommon, [guid])
            : Object.assign(Object.assign({}, this.componentsCommon), { [guid]: dataDictionaryBranch }));
    }
    setViewCommonDataDictionaryBranch(dataDictionaryBranch) {
        this.setViewCommon(dataDictionaryBranch);
    }
    setSettablePropertiesDataDictionary(items) {
        this.setSettableProperties(Object.assign(Object.assign({}, this.settableProperties), items.reduce((result, { guid, componentName, dataDictionary }) => {
            result[guid] = { componentName, dataDictionary };
            return result;
        }, {})));
    }
    removeDataDictionaryForComponents(guids) {
        if (guids.some((guid) => has(this.componentsCommon, guid))) {
            this.setComponentCommon(omit(this.componentsCommon, guids));
        }
        if (guids.some((guid) => has(this.settableProperties, guid))) {
            this.setSettableProperties(omit(this.settableProperties, guids));
        }
    }
    setActionOutputDataDictionaryBranch(guid, index, dataDictionaryBranch) {
        this.setActionsOutput(flow((actions) => [
            ...reject(actions, { guid }),
            { guid, index, dataDictionaryBranch }
        ], (actions) => sortBy(actions, 'index'))(this.actionsOutput));
    }
    updateActionOutputDataDictionaryBranchOrder(actions) {
        this.setActionsOutput(flow((actionsOutput) => map(actionsOutput, (actionOutput) => (Object.assign(Object.assign({}, actionOutput), { index: actions[actionOutput.guid] }))), (actionsOutput) => sortBy(actionsOutput, 'index'))(this.actionsOutput));
    }
    removeActionOutputDataDictionaryBranch(guid) {
        this.setActionsOutput(reject(this.actionsOutput, { guid }));
    }
    removeAllActionOutputDataDictionaryBranches() {
        this.setActionsOutput(null);
    }
    clear() {
        this.setComponentCommon(null);
        this.setViewCommon(null);
        this.setSettableProperties(null);
        this.setActionsOutput([]);
    }
    setComponentCommon(state) {
        this.componentsCommon = state;
        this.componentsCommonSubject.next(this.componentsCommon);
    }
    setViewCommon(state) {
        this.viewCommon = state;
        this.viewCommonSubject.next(this.viewCommon);
    }
    setActionsOutput(state) {
        this.actionsOutput = state;
        this.actionsOutputSubject.next(this.actionsOutput);
    }
    setSettableProperties(state) {
        this.settableProperties = state;
        this.settablePropertiesSubject.next(this.settableProperties);
    }
}
RxViewDataDictionaryStoreService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDataDictionaryStoreService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDataDictionaryStoreService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDataDictionaryStoreService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDataDictionaryStoreService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=view-data-dictionary-store.service.js.map