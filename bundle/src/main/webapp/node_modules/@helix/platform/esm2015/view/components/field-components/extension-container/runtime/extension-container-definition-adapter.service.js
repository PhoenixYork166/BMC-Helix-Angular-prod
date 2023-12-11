import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RX_ASSOCIATED_RECORD_NODE_SIDES } from '@helix/platform/association/api';
import { RxDefinitionNameService, RxGlobalCacheService, RxNotificationService } from '@helix/platform/shared/api';
import { RxTreeService } from '@helix/platform/utils';
import { RX_AVAILABLE_ON_DEVICES_PROP_NAME, RX_VIEW_DEFINITION, RxViewComponentType, RxViewDefinitionDataPageService, RxViewDefinitionLocalizationService, RxViewDefinitionParserService, ViewDefinitionType } from '@helix/platform/view/api';
import { RxRuntimeViewUtilsService } from '@helix/platform/view/runtime';
import { filter, forEach, isString, map as _map, reduce, values } from 'lodash';
import moment from 'moment-es6';
import { combineLatest, forkJoin, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { RX_EXTENSION_CONTAINER } from '../extension-container.constant';
import { RxExtensionContainerHelperService } from './extension-container-helper.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/utils";
import * as i4 from "./extension-container-helper.service";
import * as i5 from "@helix/platform/view/runtime";
import * as i6 from "@ngx-translate/core";
export class RxExtensionContainerDefinitionAdapterService {
    constructor(rxViewDefinitionParserService, rxViewDefinitionDataPageService, rxGlobalCacheService, rxDefinitionNameService, rxTreeService, rxExtensionContainerHelperService, rxNotificationService, rxRuntimeViewUtilsService, rxViewDefinitionLocalizationService, translateService) {
        this.rxViewDefinitionParserService = rxViewDefinitionParserService;
        this.rxViewDefinitionDataPageService = rxViewDefinitionDataPageService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxTreeService = rxTreeService;
        this.rxExtensionContainerHelperService = rxExtensionContainerHelperService;
        this.rxNotificationService = rxNotificationService;
        this.rxRuntimeViewUtilsService = rxRuntimeViewUtilsService;
        this.rxViewDefinitionLocalizationService = rxViewDefinitionLocalizationService;
        this.translateService = translateService;
    }
    adaptDefinition(extensionContainerComponentDefinition, viewDefinition) {
        const targetRecordEditorComponentDefinition = this.getTargetRecordEditorComponentDefinition(viewDefinition, extensionContainerComponentDefinition);
        extensionContainerComponentDefinition.propertiesByName.mode =
            targetRecordEditorComponentDefinition.propertiesByName.mode;
        return this.getExtensionViewDefinitions(extensionContainerComponentDefinition.guid).pipe(map(this.getViewDefinitionMap.bind(this)), map(this.filterDuplicatedRecordEditorComponentDefinitions.bind(this)), map((viewDefinitionMaps) => this.filterIncompatibleRecordEditorComponentDefinitions(viewDefinitionMaps, targetRecordEditorComponentDefinition)), switchMap(this.setRecordEditorLabels.bind(this)), map(this.getExtensionRecordEditorComponentDefinitions.bind(this)), switchMap((extensionRecordEditorComponentDefinitions) => {
            const processAndAddChildrenToExtensionContainer = () => {
                extensionContainerComponentDefinition.componentDefinitions = [];
                extensionContainerComponentDefinition.resourceType =
                    RX_VIEW_DEFINITION.resourceTypes.containerViewComponent;
                forEach(extensionRecordEditorComponentDefinitions, (extensionRecordEditorComponentDefinition) => {
                    // re-assign expression for child Record editor component definitions
                    this.processRecordEditorComponentDefinition(extensionRecordEditorComponentDefinition, targetRecordEditorComponentDefinition, extensionContainerComponentDefinition);
                    extensionContainerComponentDefinition.componentDefinitions.push(this.getExtensionContainerSectionViewComponentDefinition(extensionRecordEditorComponentDefinition, targetRecordEditorComponentDefinition));
                });
                const children = extensionContainerComponentDefinition.componentDefinitions.map((component) => component.guid);
                extensionContainerComponentDefinition.layout = JSON.stringify({
                    outlets: [
                        {
                            name: RX_VIEW_DEFINITION.defaultOutletName,
                            columns: [
                                {
                                    children
                                }
                            ]
                        }
                    ]
                });
                return extensionRecordEditorComponentDefinitions;
            };
            // run adapters for all Record editors and it's children
            const adapters$ = extensionRecordEditorComponentDefinitions.map((recordEditorComponent) => {
                return combineLatest([
                    ...this.rxRuntimeViewUtilsService.runAdaptersForComponents(viewDefinition, recordEditorComponent)
                ]);
            });
            return combineLatest(adapters$).pipe(tap({
                complete: () => processAndAddChildrenToExtensionContainer()
            }));
        }));
    }
    getExtensionViewDefinitions(extensionContainerGuid) {
        return this.rxViewDefinitionDataPageService
            .get({
            params: {
                propertySelection: [
                    'name',
                    'targetExtensionContainerGuid',
                    'targetViewDefinitionName',
                    'componentDefinitions',
                    'localizableStringsByComponentId',
                    'lastUpdateTime'
                ],
                viewType: ViewDefinitionType.Regular,
                targetExtensionContainerGuid: extensionContainerGuid,
                excludeExtensionViews: false
            },
            headers: {
                'default-bundle-scope': ''
            }
        })
            .pipe(map((response) => {
            const associationsInExtensionContainer = [];
            forEach(response.data, (viewDefinition) => {
                var _a;
                this.rxViewDefinitionLocalizationService.applyLocalization(viewDefinition);
                const associationDefinitionName = (_a = viewDefinition.componentDefinitions[0]) === null || _a === void 0 ? void 0 : _a.propertiesByName.associationDefinitionName;
                if (isString(associationDefinitionName)) {
                    if (associationsInExtensionContainer.includes(associationDefinitionName)) {
                        this.rxNotificationService.addWarningMessage(this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-editor.extension-container.duplicate-extensions.warning'));
                    }
                    else {
                        associationsInExtensionContainer.push(associationDefinitionName);
                    }
                }
            });
            return response.data;
        }));
    }
    getTargetRecordEditorComponentDefinition(viewDefinition, extensionContainerComponentDefinition) {
        return this.rxViewDefinitionParserService.findParentComponentDefinition(viewDefinition, extensionContainerComponentDefinition, (parentComponentDefinition) => parentComponentDefinition.type === RxViewComponentType.RecordEditor);
    }
    getViewDefinitionMap(viewDefinitions) {
        return reduce(viewDefinitions, (result, viewDefinition) => {
            const recordEditorComponentDefinition = viewDefinition.componentDefinitions[0];
            // View may not contain Record editor component definition because of permission restrictions
            if (recordEditorComponentDefinition) {
                result.push({
                    viewDefinition,
                    recordEditorComponentDefinition
                });
            }
            return result;
        }, []);
    }
    filterDuplicatedRecordEditorComponentDefinitions(viewDefinitionMaps) {
        return values(reduce(viewDefinitionMaps, (result, viewDefinitionMap) => {
            // Allow multiple record editors to be displayed in the extension container if they are bound
            // to the same parent record instance. In this case they have no associationDefinitionName.
            if (!viewDefinitionMap.recordEditorComponentDefinition.propertiesByName.associationDefinitionName) {
                result[viewDefinitionMap.recordEditorComponentDefinition.guid] = viewDefinitionMap;
                return result;
            }
            const key = [
                viewDefinitionMap.recordEditorComponentDefinition.propertiesByName.recordDefinitionName,
                viewDefinitionMap.recordEditorComponentDefinition.propertiesByName.associationDefinitionName
            ].join('');
            if (!result[key]) {
                result[key] = viewDefinitionMap;
            }
            else if (moment(viewDefinitionMap.viewDefinition.lastUpdateTime) < moment(result[key].viewDefinition.lastUpdateTime)) {
                result[key] = viewDefinitionMap;
            }
            return result;
        }, {}));
    }
    filterIncompatibleRecordEditorComponentDefinitions(viewDefinitionMaps, targetRecordEditorComponentDefinition) {
        return filter(viewDefinitionMaps, (viewDefinitionMap) => {
            const hasSameMode = viewDefinitionMap.recordEditorComponentDefinition.propertiesByName.mode ===
                targetRecordEditorComponentDefinition.propertiesByName.mode;
            const hasSameRecordDefinitionName = targetRecordEditorComponentDefinition.propertiesByName.recordDefinitionName ===
                viewDefinitionMap.recordEditorComponentDefinition.propertiesByName.recordDefinitionName;
            const hasAssociation = viewDefinitionMap.recordEditorComponentDefinition.propertiesByName.associationDefinitionName;
            const validExtensionWithoutAssociation = hasSameRecordDefinitionName && !hasAssociation && hasSameMode;
            const validExtensionWithAssociation = hasAssociation && hasSameMode;
            return validExtensionWithoutAssociation || validExtensionWithAssociation;
        });
    }
    setRecordEditorLabels(viewDefinitionMaps) {
        return forkJoin([
            ...viewDefinitionMaps.map((viewDefinitionMap) => {
                let label$;
                if (viewDefinitionMap.recordEditorComponentDefinition.propertiesByName.label) {
                    label$ = of(viewDefinitionMap.recordEditorComponentDefinition.propertiesByName.label);
                }
                else {
                    label$ = this.rxGlobalCacheService.getBundleFriendlyName(this.rxDefinitionNameService.getBundleId(viewDefinitionMap.viewDefinition.name));
                }
                return label$.pipe(map((label) => {
                    viewDefinitionMap.recordEditorComponentDefinition.propertiesByName.label = label;
                    return viewDefinitionMap;
                }));
            })
        ]);
    }
    getExtensionRecordEditorComponentDefinitions(viewDefinitionMaps) {
        return _map(viewDefinitionMaps, 'recordEditorComponentDefinition');
    }
    processRecordEditorComponentDefinition(extensionRecordEditorComponentDefinition, targetRecordEditorComponentDefinition, extensionContainerComponentDefinition) {
        this.rxTreeService
            .flattenTree(extensionRecordEditorComponentDefinition, 'componentDefinitions')
            .forEach((componentDefinition) => {
            this.patchFieldComponentExpressions(componentDefinition, extensionRecordEditorComponentDefinition, targetRecordEditorComponentDefinition, extensionContainerComponentDefinition);
        });
        return extensionRecordEditorComponentDefinition;
    }
    // re-assign all expressions from extension Record editor to target Record editor
    // old path: ${view.components.<extension-record-editor-guid>.recordInstance}
    // new path: ${view.components.<target-record-editor-guid>.recordInstance.associationInstances[<association-definition-name>].extensions[0]}
    patchFieldComponentExpressions(componentDefinition, extensionRecordEditorComponentDefinition, targetRecordEditorComponentDefinition, targetExtensionContainerComponentDefinition) {
        // ${view.components.<target-record-editor-guid>.recordInstance.associationInstances[<association-definition-name>].extensions[0]}
        const recordInstanceReferencingExpression = extensionRecordEditorComponentDefinition.propertiesByName
            .associationDefinitionName
            ? [
                targetRecordEditorComponentDefinition.guid,
                '.',
                "recordInstance.associationInstances['",
                extensionRecordEditorComponentDefinition.propertiesByName.associationDefinitionName,
                "'].",
                RX_ASSOCIATED_RECORD_NODE_SIDES.nodeB.value,
                '.extensions[0]'
            ].join('')
            : [targetRecordEditorComponentDefinition.guid, '.recordInstance'].join('');
        // ${view.components.<target-record-editor-guid>.recordInstance.associationInstances[<association-definition-name>].extensions[0].recordDefinitionName}
        const recordDefinitionNameReferencingExpression = [
            recordInstanceReferencingExpression,
            '.recordDefinitionName'
        ].join('');
        // ${view.components.<target-extension-container-guid>.recordDefinitions.<extension-record-definition-name>}
        const recordDefinitionReferencingExpression = extensionRecordEditorComponentDefinition.propertiesByName
            .associationDefinitionName
            ? [
                targetExtensionContainerComponentDefinition.guid,
                '.',
                RX_EXTENSION_CONTAINER.recordDefinitionsReferencingExpression,
                "['",
                extensionRecordEditorComponentDefinition.propertiesByName.recordDefinitionName,
                "']"
            ].join('')
            : [targetRecordEditorComponentDefinition.guid, '.recordDefinition'].join('');
        // ${view.components.<target-record-editor-guid>.recordInstance.associationInstances[<association-definition-name>].extensions[0].id}
        const recordInstanceIdReferencingExpression = [recordInstanceReferencingExpression, '.id'].join('');
        let selectionFieldOptionNamesByIdReferencingExpression;
        if (extensionRecordEditorComponentDefinition.propertiesByName.associationDefinitionName) {
            // ${view.components.<target-extension-container-guid>.<extension-record-editor-guid>:selectionFieldOptionNamesById}
            selectionFieldOptionNamesByIdReferencingExpression = [
                targetExtensionContainerComponentDefinition.guid,
                '.',
                this.rxExtensionContainerHelperService.getSelectionFieldOptionNamesByIdExpression(extensionRecordEditorComponentDefinition.guid)
            ].join('');
        }
        else {
            // ${view.components.<targetRecordEditorComponentDefinition>.selectionFieldOptionNamesById}
            selectionFieldOptionNamesByIdReferencingExpression = `${targetRecordEditorComponentDefinition.guid}.selectionFieldOptionNamesById`;
        }
        /*
         * {
         *   regExp - determines the part of the old expression
         *   expression - determines new value which should replace <regExp> match
         * }
         * */
        const expressionMap = [
            // patch record instance id expression
            {
                regExp: new RegExp(extensionRecordEditorComponentDefinition.guid + '.recordInstanceId', 'g'),
                expression: recordInstanceIdReferencingExpression
            },
            // patch record instance expression
            {
                regExp: new RegExp(extensionRecordEditorComponentDefinition.guid + '.recordInstance', 'g'),
                expression: recordInstanceReferencingExpression
            },
            // patch record definition name expression
            {
                regExp: new RegExp(extensionRecordEditorComponentDefinition.guid + '.recordDefinitionName', 'g'),
                expression: recordDefinitionNameReferencingExpression
            },
            // patch record definition name expression
            {
                regExp: new RegExp(extensionRecordEditorComponentDefinition.guid + '.recordDefinition', 'g'),
                expression: recordDefinitionReferencingExpression
            },
            // patch selection field option names by id expression
            {
                regExp: new RegExp(extensionRecordEditorComponentDefinition.guid + '.selectionFieldOptionNamesById', 'g'),
                expression: selectionFieldOptionNamesByIdReferencingExpression
            },
            // patch record editor properties like 'canSave', 'inReadState', 'isValid', 'isDirty'
            // ${view.components.<target-record-editor-guid>.canSave}
            // ${view.components.<target-record-editor-guid>.inReadState} ...
            {
                regExp: new RegExp(`${extensionRecordEditorComponentDefinition.guid}\\.(\\w+)}`, 'g'),
                expression: `${targetRecordEditorComponentDefinition.guid}.$1}`
            }
        ];
        const propertiesToPatch = ['disabled', 'hidden', 'value', 'html'];
        propertiesToPatch
            .filter((propertyName) => isString(componentDefinition.propertiesByName[propertyName]))
            .forEach((propertyName) => {
            forEach(expressionMap, (expressionConfig) => {
                componentDefinition.propertiesByName[propertyName] = componentDefinition.propertiesByName[propertyName].replace(expressionConfig.regExp, expressionConfig.expression);
            });
        });
        componentDefinition.propertiesByName.api = `\${view.components.${targetRecordEditorComponentDefinition.guid}.api}`;
        componentDefinition.propertiesByName.inReadState = `\${view.components.${targetRecordEditorComponentDefinition.guid}.inReadState}`;
        if (extensionRecordEditorComponentDefinition.propertiesByName.associationDefinitionName) {
            componentDefinition.propertiesByName.associatedRecordPath = [
                extensionRecordEditorComponentDefinition.propertiesByName.associationDefinitionName,
                RX_ASSOCIATED_RECORD_NODE_SIDES.nodeB.value,
                'extensions',
                0
            ];
        }
        if (componentDefinition.propertiesByName.recordInstance) {
            componentDefinition.propertiesByName.recordInstance = [
                '${view.components.',
                recordInstanceReferencingExpression,
                '}'
            ].join('');
        }
        if (componentDefinition.propertiesByName.recordDefinition) {
            componentDefinition.propertiesByName.recordDefinition = [
                '${view.components.',
                recordDefinitionReferencingExpression,
                '}'
            ].join('');
        }
    }
    getExtensionContainerSectionViewComponentDefinition(recordEditorComponentDefinition, targetRecordEditorComponentDefinition) {
        return {
            guid: recordEditorComponentDefinition.guid,
            type: RX_EXTENSION_CONTAINER.extensionContainerSectionComponent,
            layout: recordEditorComponentDefinition.layout,
            resourceType: RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
            componentDefinitions: recordEditorComponentDefinition.componentDefinitions,
            propertiesByName: {
                label: recordEditorComponentDefinition.propertiesByName.label,
                styles: recordEditorComponentDefinition.propertiesByName.styles,
                recordDefinitionName: recordEditorComponentDefinition.propertiesByName.recordDefinitionName,
                associationDefinitionName: recordEditorComponentDefinition.propertiesByName.associationDefinitionName,
                [RX_AVAILABLE_ON_DEVICES_PROP_NAME]: recordEditorComponentDefinition.propertiesByName[RX_AVAILABLE_ON_DEVICES_PROP_NAME],
                api: `\${view.components.${targetRecordEditorComponentDefinition.guid}.api}`,
                associatedRecordPath: [
                    recordEditorComponentDefinition.propertiesByName.associationDefinitionName,
                    RX_ASSOCIATED_RECORD_NODE_SIDES.nodeB.value,
                    'extensions',
                    0
                ]
            }
        };
    }
}
RxExtensionContainerDefinitionAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExtensionContainerDefinitionAdapterService, deps: [{ token: i1.RxViewDefinitionParserService }, { token: i1.RxViewDefinitionDataPageService }, { token: i2.RxGlobalCacheService }, { token: i2.RxDefinitionNameService }, { token: i3.RxTreeService }, { token: i4.RxExtensionContainerHelperService }, { token: i2.RxNotificationService }, { token: i5.RxRuntimeViewUtilsService }, { token: i1.RxViewDefinitionLocalizationService }, { token: i6.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
RxExtensionContainerDefinitionAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExtensionContainerDefinitionAdapterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExtensionContainerDefinitionAdapterService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxViewDefinitionParserService }, { type: i1.RxViewDefinitionDataPageService }, { type: i2.RxGlobalCacheService }, { type: i2.RxDefinitionNameService }, { type: i3.RxTreeService }, { type: i4.RxExtensionContainerHelperService }, { type: i2.RxNotificationService }, { type: i5.RxRuntimeViewUtilsService }, { type: i1.RxViewDefinitionLocalizationService }, { type: i6.TranslateService }]; } });
//# sourceMappingURL=extension-container-definition-adapter.service.js.map