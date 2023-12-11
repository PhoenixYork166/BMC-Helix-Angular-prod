import { Injectable } from '@angular/core';
import { RX_RECORD_DEFINITION, RxFieldDefinitionService } from '@helix/platform/record/api';
import { RxError, RxGuidService } from '@helix/platform/utils';
import { OpenViewActionLaunchBehavior, OpenViewActionType, RX_VIEW_ACTION } from '@helix/platform/view/api';
import { TranslateService } from '@ngx-translate/core';
import { defaults, every, has, isUndefined, reduce } from 'lodash';
import { forkJoin, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { RxRecordGridUtilsService } from '../../common/services/record-grid-utils.service';
import { RX_RECORD_GRID } from '../../record-grid.constant';
import { RxRecordGridConfigUtilsService } from './record-grid-config-utils.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "@helix/platform/record/api";
import * as i3 from "./record-grid-config-utils.service";
import * as i4 from "../../common/services/record-grid-utils.service";
import * as i5 from "@ngx-translate/core";
export class RxRecordGridConfiguratorService {
    constructor(rxGuidService, rxFieldDefinitionService, rxRecordGridConfigUtilsService, rxRecordGridUtilsService, translateService) {
        this.rxGuidService = rxGuidService;
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.rxRecordGridConfigUtilsService = rxRecordGridConfigUtilsService;
        this.rxRecordGridUtilsService = rxRecordGridUtilsService;
        this.translateService = translateService;
    }
    getGridConfig(rxConfiguration) {
        const config = defaults(this.rxRecordGridConfigUtilsService.configDeepClone(rxConfiguration), {
            associatedRecordId: null,
            associatedRoleName: null,
            enableColumnSelection: true,
            enableFiltering: true,
            expandable: false,
            useExternalFiltering: true,
            enableRowSelection: RX_RECORD_GRID.selectionTypes.multiple,
            filterExpression: null,
            filters: RX_RECORD_GRID.defaultFilter,
            filterTagsLimit: 3,
            recordIdField: RX_RECORD_DEFINITION.coreFieldIds.id.toString(),
            emptyStateLabelText: this.translateService.instant('com.bmc.arsys.rx.client.empty-state.no-items-to-display.label'),
            emptyStateWithFilterLabelText: this.translateService.instant('com.bmc.arsys.rx.client.empty-state.no-items-to-display.label'),
            searchFieldPlaceholderText: this.translateService.instant('com.bmc.arsys.rx.client.common.search.label'),
            styles: ''
        });
        if (!config.recordDefinitionName) {
            if (!rxConfiguration.getRecordDefinition) {
                throwError(new RxError('getRecordDefinition function must be defined if recordDefinitionName is not set.'));
            }
            if (!rxConfiguration.getData) {
                throwError(new RxError('getData function must be defined if recordDefinitionName is not set.'));
            }
        }
        config.enableFiltering = Boolean(config.enableFiltering);
        config.cardLayoutWidth = parseFloat(config.cardLayoutWidth) || null;
        return config;
    }
    getColumnsWithMetadata(recordGridGuid, columns, recordDefinition) {
        const columnsClone = this.rxRecordGridConfigUtilsService.columnsDeepClone(columns);
        this.allowedOpenViewActionExpressionsForHrefRegex = new RegExp(`^\\$\\{view\\.components\\.${recordGridGuid}\\.(clickableRow|recordDefinition)\\.|^\\$\\{view\\.inputParams\\.`);
        const columnsDefinitions$ = columnsClone.map((column) => {
            return this.rxRecordGridUtilsService.getFieldDefinition(column.fieldId, recordDefinition).pipe(map((fieldDefinition) => {
                var _a;
                let filterType = fieldDefinition.resourceType
                    ? this.getFieldDefinitionResourceTypeShortName(fieldDefinition.resourceType)
                    : null;
                if (filterType === RX_RECORD_DEFINITION.dataTypes.attachment.shortName) {
                    filterType = RX_RECORD_DEFINITION.dataTypes.character.shortName;
                }
                const filterable = this.rxRecordGridConfigUtilsService.getBooleanValue(column.filterable) || isUndefined(column.filterable);
                const searchable = has(column, 'searchable')
                    ? this.rxRecordGridConfigUtilsService.getBooleanValue(column.searchable)
                    : filterable && this.rxRecordGridUtilsService.isSearchable(fieldDefinition, recordDefinition);
                const columnWithMetadata = Object.assign(Object.assign({}, column), { clickable: this.rxRecordGridConfigUtilsService.getBooleanValue(column.clickable), filterable, sortable: this.rxRecordGridConfigUtilsService.parseConfigString(column.sortable) ||
                        isUndefined(column.sortable), visible: this.rxRecordGridConfigUtilsService.getBooleanValue(column.visible) || isUndefined(column.visible), searchable,
                    fieldDefinition,
                    filterType, clickableWithHref: this.isColumnClickableWithHref(column), title: (_a = column.title) === null || _a === void 0 ? void 0 : _a.trim(), fallbackTitle: `[${fieldDefinition.name}]` });
                return columnWithMetadata;
            }));
        });
        return forkJoin(columnsDefinitions$);
    }
    getSelectionFieldOptionLabelsByFieldId(columns, recordDefinition) {
        return reduce(columns, (result, column) => {
            const fieldDefinition = recordDefinition.fieldDefinitionsById[column.fieldId];
            if (fieldDefinition.resourceType === RX_RECORD_DEFINITION.dataTypes.selection.resourceType) {
                result[column.fieldId] = fieldDefinition.optionLabelsById;
            }
            return result;
        }, {});
    }
    getFieldDefinitionResourceTypeShortName(resourceType) {
        return resourceType
            .split('.')
            .pop()
            .replace(/fieldDefinition/i, '');
    }
    isColumnClickableWithHref(column) {
        let clickableWithHref = false;
        if (this.rxRecordGridConfigUtilsService.getBooleanValue(column.clickable)) {
            clickableWithHref = column.actions.every((action) => {
                return ((action.name === RX_VIEW_ACTION.viewActionNames.launchUrl ||
                    (action.name === RX_VIEW_ACTION.viewActionNames.openView &&
                        action.presentation.launchBehavior === OpenViewActionLaunchBehavior.SameWindow &&
                        action.presentation.type === OpenViewActionType.FullWidth &&
                        this.canViewParamsBeEvaluatedForHref(action.viewParams))) &&
                    this.canExpressionBeEvaluatedForHref(action.$condition$));
            });
        }
        return clickableWithHref;
    }
    canViewParamsBeEvaluatedForHref(viewParams) {
        return every(viewParams, (viewParamValue) => this.canExpressionBeEvaluatedForHref(viewParamValue));
    }
    canExpressionBeEvaluatedForHref(expression) {
        return every(expression === null || expression === void 0 ? void 0 : expression.match(/\$\{[^{]*\}/g), (expressionToken) => this.allowedOpenViewActionExpressionsForHrefRegex.test(expressionToken));
    }
}
RxRecordGridConfiguratorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridConfiguratorService, deps: [{ token: i1.RxGuidService }, { token: i2.RxFieldDefinitionService }, { token: i3.RxRecordGridConfigUtilsService }, { token: i4.RxRecordGridUtilsService }, { token: i5.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordGridConfiguratorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridConfiguratorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridConfiguratorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxGuidService }, { type: i2.RxFieldDefinitionService }, { type: i3.RxRecordGridConfigUtilsService }, { type: i4.RxRecordGridUtilsService }, { type: i5.TranslateService }]; } });
//# sourceMappingURL=record-grid-configurator.service.js.map