import { Injectable, Injector } from '@angular/core';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { SelectionFieldOptionsComponent } from '@helix/platform/shared/components';
import { BaseFieldDefinitionService } from './base-field-definition.service';
import { ValidationIssueType } from '@helix/platform/ui-kit';
import { isEmpty } from 'lodash';
import * as i0 from "@angular/core";
export class SelectionFieldDefinitionService extends BaseFieldDefinitionService {
    constructor(injector) {
        super(injector);
        this.dataType = RX_RECORD_DEFINITION.dataTypes.selection.resourceType;
    }
    getFieldInspectorConfig(options) {
        var _a, _b, _c;
        const inspectorConfig = super.getFieldInspectorConfig(options);
        inspectorConfig[1].controls.splice(1, 0, {
            name: 'selectionFieldOptionProperties',
            component: SelectionFieldOptionsComponent,
            options: {
                defaultValue: (_a = options.selectionFieldOptionProperties) === null || _a === void 0 ? void 0 : _a.defaultValue,
                optionNamesById: (_b = options.selectionFieldOptionProperties) === null || _b === void 0 ? void 0 : _b.optionNamesById,
                optionLabelsById: (_c = options.selectionFieldOptionProperties) === null || _c === void 0 ? void 0 : _c.optionLabelsById
            }
        });
        return inspectorConfig;
    }
    validate(fieldModel) {
        var _a;
        const validationIssues = super.validate(fieldModel);
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
SelectionFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldDefinitionService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
SelectionFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=selection-field-definition.service.js.map