import { Injectable } from '@angular/core';
import { compact, flow, filter, find, flatten, map as _map, sortBy, uniq } from 'lodash';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class RxDesignerStencilBuilder {
    buildElementsTree(elementsSources, elementGroups) {
        return forkJoin(elementsSources).pipe(map((elements) => {
            return flow(flatten, (chainElements) => _map(chainElements, 'group'), uniq, compact, (groupNames) => sortBy(groupNames, (groupName) => groupName.toLowerCase()), (groupNames) => sortBy(groupNames, (groupName) => (find(elementGroups, { name: groupName }) || elementGroups.default).priority), (groupNames) => _map(groupNames, (groupName) => {
                return {
                    label: groupName,
                    children: flow(flatten, (chainElements) => filter(chainElements, { group: groupName }), (chainElements) => sortBy(chainElements, (element) => element.label.toLowerCase()))(elements)
                };
            }))(elements);
        }));
    }
}
RxDesignerStencilBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerStencilBuilder, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxDesignerStencilBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerStencilBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerStencilBuilder, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=designer-stencil-builder.service.js.map