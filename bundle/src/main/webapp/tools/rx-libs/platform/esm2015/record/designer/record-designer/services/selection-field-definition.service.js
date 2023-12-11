import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxBaseFieldDefinitionService } from './base-field-definition.service';
import { Injectable, Injector } from '@angular/core';
import { SelectionFieldOptionsComponent } from '@helix/platform/shared/components';
import { ValidationIssueType } from '@helix/platform/ui-kit';
import { isEmpty } from 'lodash';
import * as i0 from "@angular/core";
export class RxSelectionFieldDefinitionService extends RxBaseFieldDefinitionService {
    constructor(injector) {
        super(injector);
        this.resourceType = RX_RECORD_DEFINITION.dataTypes.selection.resourceType;
    }
    getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly) {
        const inspectorConfig = super.getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly);
        inspectorConfig[1].controls.push({
            name: 'selectionFieldOptionProperties',
            component: SelectionFieldOptionsComponent,
            options: {
                isReadOnly: !this.rxFieldDefinitionInspectorHelperService.isFieldEditable(fieldModel)
            }
        });
        return inspectorConfig;
    }
    validate(fieldModel, definitionModel) {
        var _a;
        const validationIssues = super.validate(fieldModel, definitionModel);
        if (isEmpty((_a = fieldModel.selectionFieldOptionProperties) === null || _a === void 0 ? void 0 : _a.optionNamesById)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', { propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.options.label') }),
                data: {
                    propertyName: 'selectionFieldOptionProperties',
                    guid: fieldModel.guid
                }
            });
        }
        return validationIssues;
    }
}
RxSelectionFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectionFieldDefinitionService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxSelectionFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectionFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectionFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=selection-field-definition.service.js.map