import * as i0 from '@angular/core';
import { Injectable, Pipe, NgModule } from '@angular/core';
import * as i1$1 from '@helix/platform/shared/api';
import { DataPage, RX_BUNDLE } from '@helix/platform/shared/api';
import { forkJoin, of } from 'rxjs';
import { castArray, isEmpty, find } from 'lodash';
import * as i1 from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import * as i1$2 from '@ngx-translate/core';

var RxAssociatedRecordNodeSide;
(function (RxAssociatedRecordNodeSide) {
    RxAssociatedRecordNodeSide["NodeA"] = "nodeA";
    RxAssociatedRecordNodeSide["NodeB"] = "nodeB";
})(RxAssociatedRecordNodeSide || (RxAssociatedRecordNodeSide = {}));

const RX_ASSOCIATED_RECORD_NODE_SIDES = {
    nodeA: {
        value: RxAssociatedRecordNodeSide.NodeA,
        recordDefinitionNameKey: 'nodeAId',
        defaultName: 'First record'
    },
    nodeB: {
        value: RxAssociatedRecordNodeSide.NodeB,
        recordDefinitionNameKey: 'nodeBId',
        defaultName: 'Second record'
    }
};

class RxAssociationDefinitionDataPageService extends DataPage {
    constructor(injector) {
        super(injector, 'com.bmc.arsys.rx.application.association.datapage.AssociationDefinitionDataPageQuery');
        this.injector = injector;
    }
    getRecordAssociationDefinitions(recordDefinitionNames) {
        const recordDefinitionNamesList = castArray(recordDefinitionNames);
        const observables$ = recordDefinitionNamesList.map((name) => {
            return this.get({
                headers: { 'default-bundle-scope': '' },
                params: { firstRecordDefinitionName: name }
            });
        });
        return forkJoin(observables$);
    }
}
RxAssociationDefinitionDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDefinitionDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxAssociationDefinitionDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDefinitionDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDefinitionDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

var RxCardinalityType;
(function (RxCardinalityType) {
    RxCardinalityType["OneToOne"] = "ONE_TO_ONE";
    RxCardinalityType["OneToMany"] = "ONE_TO_MANY";
    RxCardinalityType["ManyToMany"] = "MANY_TO_MANY";
})(RxCardinalityType || (RxCardinalityType = {}));
var RxModalityType;
(function (RxModalityType) {
    RxModalityType["Required"] = "REQUIRED";
    RxModalityType["Optional"] = "OPTIONAL";
})(RxModalityType || (RxModalityType = {}));

const RX_ASSOCIATION_DEFINITION = {
    modality: {
        required: RxModalityType.Required,
        optional: RxModalityType.Optional
    },
    roles: {
        second: {
            value: 'nodeB'
        }
    },
    cardinality: {
        oneToOne: {
            value: RxCardinalityType.OneToOne,
            labelKey: 'com.bmc.arsys.rx.client.association.cardinality.one-to-one.label'
        },
        oneToMany: {
            value: RxCardinalityType.OneToMany,
            labelKey: 'com.bmc.arsys.rx.client.association.cardinality.one-to-many.label'
        },
        manyToMany: {
            value: RxCardinalityType.ManyToMany,
            labelKey: 'com.bmc.arsys.rx.client.association.cardinality.many-to-many.label'
        }
    },
    constraints: [
        {
            nameKey: 'com.bmc.arsys.rx.client.association.constraints.cascade-delete.label',
            value: true
        },
        {
            nameKey: 'com.bmc.arsys.rx.client.common.none.label',
            value: false
        }
    ]
};

class RxAssociationDefinitionService {
    constructor(httpClient, rxCommandFactoryService) {
        this.httpClient = httpClient;
        this.rxCommandFactoryService = rxCommandFactoryService;
    }
    get(associationDefinitionName, options) {
        return this.httpClient.get(this.getUrl(associationDefinitionName), options);
    }
    getNew() {
        return of({
            name: '',
            description: null,
            nodeAId: null,
            nodeBId: null,
            nodeAKeys: [379],
            nodeBKeys: [379],
            nodeAName: null,
            nodeBName: null,
            cardinality: RX_ASSOCIATION_DEFINITION.cardinality.oneToOne.value,
            shouldCascadeDelete: false,
            nodeAModality: RX_ASSOCIATION_DEFINITION.modality.optional,
            isEnabled: true,
            allowOverlay: false,
            scope: RX_BUNDLE.definitionScopeTypes.bundle
        });
    }
    create(associationDefinition) {
        return this.httpClient.post(this.getUrl(), associationDefinition, { observe: 'response' });
    }
    update(associationDefinition, options) {
        return this.httpClient.put(this.getUrl(associationDefinition.name), associationDefinition, options);
    }
    delete(associationDefinitionName) {
        return this.httpClient.delete(this.getUrl(associationDefinitionName));
    }
    revertCustomization(associationDefinitionName) {
        const revertCustomizationCommand = this.rxCommandFactoryService.forResourceType('com.bmc.arsys.rx.application.association.command.RevertAssociationDefinitionCommand');
        return revertCustomizationCommand.execute({ associationDefinitionName });
    }
    rename(oldAssociationDefinitionName, newAssociationDefinitionName) {
        const renameCommand = this.rxCommandFactoryService.forResourceType('com.bmc.arsys.rx.application.association.command.RenameAssociationDefinitionCommand');
        return renameCommand.execute({
            name: oldAssociationDefinitionName,
            newName: newAssociationDefinitionName
        });
    }
    getUrl(associationDefinitionName) {
        return associationDefinitionName
            ? `/api/rx/application/association/associationdefinition/${encodeURIComponent(associationDefinitionName)}`
            : `/api/rx/application/association/associationdefinition`;
    }
}
RxAssociationDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDefinitionService, deps: [{ token: i1.HttpClient }, { token: i1$1.RxCommandFactoryService }], target: i0.ɵɵFactoryTarget.Injectable });
RxAssociationDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i1$1.RxCommandFactoryService }]; } });

const associationInstanceDataPageQuery = 'com.bmc.arsys.rx.application.association.datapage.AssociationInstanceDataPageQuery';
class RxAssociationInstanceDataPageService extends DataPage {
    constructor(injector, rxLogService) {
        super(injector, associationInstanceDataPageQuery);
        this.injector = injector;
        this.rxLogService = rxLogService;
    }
    get(dataPageRequestConfiguration = {}) {
        this.rxLogService.warning('RxAssociationInstanceDataPageService: The get() method is deprecated. Use post() instead.');
        return super.get(dataPageRequestConfiguration);
    }
}
RxAssociationInstanceDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationInstanceDataPageService, deps: [{ token: i0.Injector }, { token: i1$1.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
RxAssociationInstanceDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationInstanceDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationInstanceDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1$1.RxLogService }]; } });

const associateMultipleCommand = 'com.bmc.arsys.rx.application.association.command.AssociateMultipleCommand';
const disassociateMultipleCommand = 'com.bmc.arsys.rx.application.association.command.DisassociateMultipleCommand';
class RxAssociationInstanceService {
    constructor(rxCommandFactoryService) {
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.associateCommand = this.rxCommandFactoryService.forResourceType(associateMultipleCommand);
        this.disassociateCommand = this.rxCommandFactoryService.forResourceType(disassociateMultipleCommand);
    }
    associateRecords(associationDefinitionName, nodeAIds, nodeBIds, useDefaultRoles, nodeARole, nodeBRole) {
        return this.associateCommand.execute({
            associationDefinitionName,
            nodeARecordInstanceIds: castArray(nodeAIds),
            nodeBRecordInstanceIds: castArray(nodeBIds),
            useDefaultRoles,
            nodeARole,
            nodeBRole
        });
    }
    disassociateRecords(associationDefinitionName, nodeAIds, nodeBIds) {
        return this.disassociateCommand.execute({
            associationDefinitionName,
            nodeARecordInstanceIds: castArray(nodeAIds),
            nodeBRecordInstanceIds: castArray(nodeBIds)
        });
    }
}
RxAssociationInstanceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationInstanceService, deps: [{ token: i1$1.RxCommandFactoryService }], target: i0.ɵɵFactoryTarget.Injectable });
RxAssociationInstanceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationInstanceService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationInstanceService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.RxCommandFactoryService }]; } });

const associationNodeTreeDataPageQuery = 'com.bmc.arsys.rx.application.association.datapage.AssociationNodeTreeDataPageQuery';
class RxAssociationNodeTreeDataPageService extends DataPage {
    constructor(injector) {
        super(injector, associationNodeTreeDataPageQuery, {
            params: {
                depth: 2
            }
        });
        this.injector = injector;
    }
}
RxAssociationNodeTreeDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationNodeTreeDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxAssociationNodeTreeDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationNodeTreeDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationNodeTreeDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxAssociationDefinitionCacheService {
    constructor(rxAssociationDefinitionService) {
        this.rxAssociationDefinitionService = rxAssociationDefinitionService;
        this.associationDefinitions = new Map();
        this.consumers = new Set();
    }
    getAssociationDefinition(associationDefinitionName, options) {
        if (!this.associationDefinitions.has(associationDefinitionName)) {
            const associationDefinition$ = this.rxAssociationDefinitionService
                .get(associationDefinitionName, options)
                .pipe(shareReplay(1));
            this.associationDefinitions.set(associationDefinitionName, associationDefinition$);
        }
        return this.associationDefinitions.get(associationDefinitionName);
    }
    registerConsumer(consumerDestroy$) {
        this.consumers.add(consumerDestroy$);
        consumerDestroy$.subscribe(() => {
            this.consumers.delete(consumerDestroy$);
            if (isEmpty(this.consumers)) {
                this.clearCache();
            }
        });
    }
    clearCache() {
        this.associationDefinitions.clear();
    }
}
RxAssociationDefinitionCacheService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDefinitionCacheService, deps: [{ token: RxAssociationDefinitionService }], target: i0.ɵɵFactoryTarget.Injectable });
RxAssociationDefinitionCacheService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDefinitionCacheService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDefinitionCacheService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxAssociationDefinitionService }]; } });

class RxAssociationCardinalityPipe {
    constructor(translateService) {
        this.translateService = translateService;
    }
    transform(value) {
        return this.translateService.instant(find(RX_ASSOCIATION_DEFINITION.cardinality, ['value', value]).labelKey);
    }
}
RxAssociationCardinalityPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationCardinalityPipe, deps: [{ token: i1$2.TranslateService }], target: i0.ɵɵFactoryTarget.Pipe });
RxAssociationCardinalityPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationCardinalityPipe, name: "rxAssociationCardinalityPipe" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationCardinalityPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'rxAssociationCardinalityPipe'
                }]
        }], ctorParameters: function () { return [{ type: i1$2.TranslateService }]; } });

class RxAssociationConstraintsPipe {
    constructor(translateService) {
        this.translateService = translateService;
    }
    transform(value) {
        return this.translateService.instant(find(RX_ASSOCIATION_DEFINITION.constraints, ['value', value]).nameKey);
    }
}
RxAssociationConstraintsPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationConstraintsPipe, deps: [{ token: i1$2.TranslateService }], target: i0.ɵɵFactoryTarget.Pipe });
RxAssociationConstraintsPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationConstraintsPipe, name: "rxAssociationConstraintsPipe" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationConstraintsPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'rxAssociationConstraintsPipe'
                }]
        }], ctorParameters: function () { return [{ type: i1$2.TranslateService }]; } });

class RxAssociationPipesModule {
}
RxAssociationPipesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationPipesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxAssociationPipesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationPipesModule, declarations: [RxAssociationCardinalityPipe, RxAssociationConstraintsPipe], exports: [RxAssociationCardinalityPipe, RxAssociationConstraintsPipe] });
RxAssociationPipesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationPipesModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationPipesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxAssociationCardinalityPipe, RxAssociationConstraintsPipe],
                    exports: [RxAssociationCardinalityPipe, RxAssociationConstraintsPipe]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { RX_ASSOCIATED_RECORD_NODE_SIDES, RX_ASSOCIATION_DEFINITION, RxAssociatedRecordNodeSide, RxAssociationCardinalityPipe, RxAssociationConstraintsPipe, RxAssociationDefinitionCacheService, RxAssociationDefinitionDataPageService, RxAssociationDefinitionService, RxAssociationInstanceDataPageService, RxAssociationInstanceService, RxAssociationNodeTreeDataPageService, RxAssociationPipesModule, RxCardinalityType, RxModalityType, associateMultipleCommand, disassociateMultipleCommand };
//# sourceMappingURL=helix-platform-association-api.js.map
