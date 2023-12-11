import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { RecordFieldOption, RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxFieldDefinitionManagerService } from '@helix/platform/record/designer';
import { RxWizardService } from '@helix/platform/shared/components';
import { RxIdService } from '@helix/platform/utils';
import { TranslateService } from '@ngx-translate/core';
import { chain, find, get, map, reject, some } from 'lodash';
import { DataSourceStepComponent } from './data-source-step/data-source-step.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "@helix/platform/record/designer";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@ngx-translate/core";
export class ExternalRecordWizardService {
    constructor(componentFactoryResolver, rxIdService, rxFieldDefinitionManagerService, rxWizardService, translateService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxIdService = rxIdService;
        this.rxFieldDefinitionManagerService = rxFieldDefinitionManagerService;
        this.rxWizardService = rxWizardService;
        this.translateService = translateService;
        this.systemFieldsNames = {
            idFieldName: 'Record ID',
            displayIdFieldName: 'Request ID'
        };
    }
    open() {
        const wizardConfig = {
            title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.title'),
            allowFinish: true,
            finishButtonLabel: this.translateService.instant('com.bmc.arsys.rx.client.common.save.label'),
            steps: [
                {
                    id: 'data-source',
                    name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.data-source.title'),
                    componentFactory: this.componentFactoryResolver.resolveComponentFactory(DataSourceStepComponent)
                }
            ]
        };
        return this.rxWizardService
            .open({
            context: {},
            options: wizardConfig
        })
            .then((context) => {
            const webApiProperties = (context === null || context === void 0 ? void 0 : context.webApi)
                ? {
                    vendorSchemaDescriptor: {
                        dataSourceEntity: {
                            webApiDefinitionGuid: context.webApi.guid,
                            documentDefinitionGuid: context.document.guid
                        },
                        dataSourceOperations: context.operations
                    },
                    tableName: context.dataSourceName
                }
                : {};
            return context
                ? Object.assign({ dataSourceName: context.dataSourceName, fieldDefinitions: context.webApi
                        ? this.getWebApiFieldDefinitions(context)
                        : this.getArsFieldDefinitions(context), resourceType: RX_RECORD_DEFINITION.recordDefinitionTypes.external.recordDefinitionType, tableName: context.tableName }, webApiProperties) : null;
        });
    }
    getArsFieldDefinitions(context) {
        const mappedCoreFields = map(context.mappedInternalFields, (coreField) => {
            coreField.fieldMapping.resourceType = RX_RECORD_DEFINITION.externalFieldMapping;
            return coreField;
        });
        const selectedExternalFields = chain(context.selectedExternalFields)
            .reject(isAssociatedField)
            .map((externalField) => {
            externalField.id = this.rxIdService.generate();
            if (externalField.fieldOption === RecordFieldOption.System) {
                externalField.fieldOption = RecordFieldOption.Required;
            }
            ['lastChangedBy', 'lastUpdateTime'].forEach((columnProperty) => {
                delete externalField[columnProperty];
            });
            return externalField;
        })
            .value();
        function isAssociatedField(externalField) {
            const path = 'fieldMapping.externalFieldId';
            return some(context.mappedInternalFields, [path, get(externalField, path)]);
        }
        return mappedCoreFields.concat(selectedExternalFields);
    }
    getWebApiFieldDefinitions(context) {
        var _a, _b;
        let nonDocumentSchemaFields = [];
        if ((_a = context.selectedFieldMapping) === null || _a === void 0 ? void 0 : _a.id) {
            nonDocumentSchemaFields = reject(context.nonDocumentSchemaFields, { name: this.systemFieldsNames.idFieldName });
        }
        if ((_b = context.selectedFieldMapping) === null || _b === void 0 ? void 0 : _b.displayId) {
            nonDocumentSchemaFields = reject(nonDocumentSchemaFields, { name: this.systemFieldsNames.displayIdFieldName });
        }
        return [...context.documentSchemaFields, ...nonDocumentSchemaFields].map((field) => {
            var _a, _b;
            if (((_a = context.selectedFieldMapping) === null || _a === void 0 ? void 0 : _a.id) === field.path || field.name === this.systemFieldsNames.idFieldName) {
                return getIdFieldDefinition(RX_RECORD_DEFINITION.coreFieldIds.id, field);
            }
            else if (((_b = context.selectedFieldMapping) === null || _b === void 0 ? void 0 : _b.displayId) === field.path ||
                field.name === this.systemFieldsNames.displayIdFieldName) {
                return getIdFieldDefinition(RX_RECORD_DEFINITION.coreFieldIds.displayId, field);
            }
            function getIdFieldDefinition(coreFieldId, documentSchemaField) {
                const fieldDefinition = find(RX_RECORD_DEFINITION.coreFields, { id: coreFieldId });
                return Object.assign({ fieldMapping: {
                        resourceType: RX_RECORD_DEFINITION.externalFieldMapping,
                        externalFieldId: documentSchemaField.path
                    } }, fieldDefinition);
            }
            const newFieldDefinition = this.rxFieldDefinitionManagerService.getNewFieldDefinitionModel(field.type, {
                name: field.name
            });
            return Object.assign({ fieldMapping: {
                    resourceType: RX_RECORD_DEFINITION.externalFieldMapping,
                    externalFieldId: field.path
                } }, newFieldDefinition);
        });
    }
}
/** @nocollapse */ ExternalRecordWizardService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExternalRecordWizardService, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxIdService }, { token: i2.RxFieldDefinitionManagerService }, { token: i3.RxWizardService }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ ExternalRecordWizardService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExternalRecordWizardService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExternalRecordWizardService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxIdService }, { type: i2.RxFieldDefinitionManagerService }, { type: i3.RxWizardService }, { type: i4.TranslateService }]; } });
//# sourceMappingURL=external-record-wizard.service.js.map