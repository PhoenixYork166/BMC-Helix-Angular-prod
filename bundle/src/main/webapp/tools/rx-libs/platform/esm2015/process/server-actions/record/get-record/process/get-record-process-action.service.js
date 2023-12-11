import { Injectable, Injector } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { chain, isEmpty } from 'lodash';
import { RxTreeService } from '@helix/platform/utils';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import { RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { RxProcessDefinitionService } from '@helix/platform/process/api';
import { RxProcessActionService } from '@helix/platform/process/elements';
import { RxRecordServerActionServiceMixin } from '../../record-server-action-service.mixin';
import { RxGetRecordServerActionServiceMixin } from '../get-record-server-action-service.mixin';
import { RxGetRecordInputMapInspectorWidgetComponent } from '../components/get-record-input-map-inspector-widget';
import { RxGetRecordProcessActionExpressionConfiguratorClass } from './get-record-process-action-expression-configurator.class';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/process/api";
import * as i3 from "@helix/platform/record/api";
import * as i4 from "@helix/platform/utils";
export class RxGetRecordProcessActionService extends RxGetRecordServerActionServiceMixin(RxRecordServerActionServiceMixin(RxProcessActionService)) {
    constructor(rxDefinitionNameService, rxProcessDefinitionService, rxRecordDefinitionCacheService, rxTreeService, injector) {
        super(injector);
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxProcessDefinitionService = rxProcessDefinitionService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxTreeService = rxTreeService;
        this.injector = injector;
    }
    buildOutputDataDictionaryBranch(model) {
        const recordDefinitionName = super.getRecordDefinitionNameFromInputMap(model.inputMap);
        return recordDefinitionName
            ? this.rxRecordDefinitionCacheService.getRecordAssociationTree(recordDefinitionName).pipe(switchMap((recordAssociationTrees) => {
                const recordDefinitionNames = chain(recordAssociationTrees)
                    .map('value')
                    .compact()
                    .map('recordDefinitionName')
                    .push(recordDefinitionName)
                    .value();
                return this.rxRecordDefinitionCacheService
                    .getRecordDefinitions(recordDefinitionNames)
                    .pipe(map((recordDefinitions) => this.getOutputChildrenBranch(recordDefinitionName, recordAssociationTrees, recordDefinitions)));
            }))
            : of(null);
    }
    getClass() {
        return joint.shapes.rx.ProcessActions.getRecord;
    }
    getElementType(actionTypeName) {
        return this.rxProcessDefinitionService.getServerActionModelType(actionTypeName);
    }
    getExpressionConfiguratorClass() {
        return RxGetRecordProcessActionExpressionConfiguratorClass;
    }
    getInputMapInspectorWidgetConfig() {
        return {
            component: RxGetRecordInputMapInspectorWidgetComponent,
            options: {
                expressionConfigurator: this.getExpressionConfigurator()
            }
        };
    }
    getAssociationsBranch(recordAssociationTree, recordDefinitions, prefix) {
        return isEmpty(recordAssociationTree)
            ? null
            : {
                label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.associations.label'),
                children: recordAssociationTree.map((association) => {
                    let newPrefix = `_associations.${association.value.associationDefintionGuid}.${association.value.nodeSide}[0]`;
                    const recordDefinitionName = association.value.recordDefinitionName;
                    newPrefix = prefix ? `${prefix}.${newPrefix}` : newPrefix;
                    const associationNodeLabel = association.value.nodeName !== recordDefinitionName
                        ? `${this.rxDefinitionNameService.getDisplayName(recordDefinitionName)} (${this.rxDefinitionNameService.getDisplayName(association.value.nodeName)})`
                        : this.rxDefinitionNameService.getDisplayName(recordDefinitionName);
                    return {
                        label: associationNodeLabel,
                        outputPropertyPath: newPrefix,
                        children: this.getAssociationChildren(recordDefinitionName, association.children, recordDefinitions, newPrefix)
                    };
                })
            };
    }
    getAssociationChildren(recordDefinitionName, recordAssociationTree, recordDefinitions, prefix) {
        const associationsBranch = this.getAssociationsBranch(recordAssociationTree, recordDefinitions, prefix);
        const children = chain(recordDefinitions)
            .find({ name: recordDefinitionName })
            .get('fieldDefinitions')
            .map(function (fieldDefinition) {
            return {
                label: fieldDefinition.name,
                outputPropertyPath: `${prefix}.${fieldDefinition.id}`
            };
        })
            .value();
        if (!isEmpty(associationsBranch)) {
            children.push(associationsBranch);
        }
        return children;
    }
    getOutputChildrenBranch(recordDefinitionName, recordAssociationTree, recordDefinitions) {
        const associationsBranch = this.getAssociationsBranch(recordAssociationTree, recordDefinitions);
        const children = chain(recordDefinitions)
            .find({ name: recordDefinitionName })
            .get('fieldDefinitions')
            .map((fieldDefinition) => ({
            label: fieldDefinition.name,
            outputPropertyPath: [fieldDefinition.id, fieldDefinition.name]
        }))
            .value();
        if (!isEmpty(associationsBranch)) {
            children.push(associationsBranch);
        }
        return children;
    }
}
RxGetRecordProcessActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGetRecordProcessActionService, deps: [{ token: i1.RxDefinitionNameService }, { token: i2.RxProcessDefinitionService }, { token: i3.RxRecordDefinitionCacheService }, { token: i4.RxTreeService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxGetRecordProcessActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGetRecordProcessActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGetRecordProcessActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDefinitionNameService }, { type: i2.RxProcessDefinitionService }, { type: i3.RxRecordDefinitionCacheService }, { type: i4.RxTreeService }, { type: i0.Injector }]; } });
//# sourceMappingURL=get-record-process-action.service.js.map