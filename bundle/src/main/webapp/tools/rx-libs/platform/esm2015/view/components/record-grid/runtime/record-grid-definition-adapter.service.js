import { Injectable } from '@angular/core';
import { chain, filter, without } from 'lodash';
import { RxViewComponentType, RxViewDefinitionParserService } from '@helix/platform/view/api';
import { RxJsonParserService } from '@helix/platform/utils';
import { RX_RECORD_GRID } from '../record-grid.constant';
import { ActionButtonSize, ActionButtonStyle } from '../../action-button/action-button.types';
import { RxRecordGridConfigUtilsService } from '../runtime/services/record-grid-config-utils.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "@helix/platform/utils";
import * as i3 from "../runtime/services/record-grid-config-utils.service";
export class RxRecordGridDefinitionAdapterService {
    constructor(viewDefinitionParserService, rxJsonParserService, rxRecordGridConfigUtilsService) {
        this.viewDefinitionParserService = viewDefinitionParserService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxRecordGridConfigUtilsService = rxRecordGridConfigUtilsService;
    }
    adaptDefinition(recordGridContainerViewComponentDefinition, viewDefinition) {
        const cellDisplayPropertiesList = recordGridContainerViewComponentDefinition.componentDefinitions
            .filter(({ type }) => type === RX_RECORD_GRID.components.column)
            .map(({ propertiesByName }) => propertiesByName.cellDisplayProperties)
            .filter(Boolean);
        this.viewDefinitionParserService
            .getComponents(recordGridContainerViewComponentDefinition)
            .map((componentDefinition) => componentDefinition.componentDefinition)
            .forEach((componentDefinition) => {
            var _a, _b, _c, _d;
            switch (componentDefinition.type) {
                case RX_RECORD_GRID.type: {
                    componentDefinition.propertiesByName.enableFilterPresets =
                        (_a = componentDefinition.propertiesByName.enableFilterPresets) !== null && _a !== void 0 ? _a : 'true';
                    componentDefinition.propertiesByName.requiredFilters =
                        (_b = componentDefinition.propertiesByName.requiredFilters) !== null && _b !== void 0 ? _b : (componentDefinition.propertiesByName['requireFiltering'] === 'true' ? 1 : 0);
                    const layout = this.rxJsonParserService.tryParseJson(componentDefinition.layout);
                    const actionButtons = filter(componentDefinition.componentDefinitions, {
                        type: RxViewComponentType.ActionButton
                    });
                    const rowActionButtons = this.getActionButtonsForOutlet(layout, RX_RECORD_GRID.rowActionsOutletName, actionButtons);
                    rowActionButtons.forEach((action) => {
                        action.propertiesByName = Object.assign(Object.assign({}, action.propertiesByName), { cls: 'dropdown-item', styles: 'p-0' });
                    });
                    without(actionButtons, ...rowActionButtons).forEach((actionButton) => {
                        if ([ActionButtonStyle.Primary, ActionButtonStyle.Secondary].includes(actionButton.propertiesByName.style)) {
                            actionButton.propertiesByName.size = ActionButtonSize.Small;
                        }
                    });
                    break;
                }
                case RX_RECORD_GRID.components.column: {
                    let isReferenced = null;
                    if (!this.rxRecordGridConfigUtilsService.getBooleanValue(recordGridContainerViewComponentDefinition.propertiesByName.getDataForHiddenColumns)) {
                        const recordGridGuid = recordGridContainerViewComponentDefinition.guid;
                        const columnFieldId = componentDefinition.propertiesByName.fieldId;
                        const isReferencedInExpression = viewDefinition.viewComponentExpressions.some((expression) => expression.includes(`\$\{view.components.${recordGridGuid}.firstSelectedRow.${columnFieldId}`) ||
                            expression.includes(`\$\{view.components.${recordGridGuid}.clickableRow.${columnFieldId}`));
                        const isReferencedInCellDisplayProperties = cellDisplayPropertiesList.some((cellDisplayProperties) => cellDisplayProperties.includes(`\$\{view.components.grid.clickableRow.${columnFieldId}`));
                        isReferenced = isReferencedInExpression || isReferencedInCellDisplayProperties;
                    }
                    const adaptedProperties = {
                        actions: [],
                        clickable: false,
                        guid: componentDefinition.guid,
                        wrapText: (_c = componentDefinition.propertiesByName.wrapText) !== null && _c !== void 0 ? _c : false,
                        referenced: isReferenced,
                        typeaheadKeystrokeCount: (_d = componentDefinition.propertiesByName.typeaheadKeystrokeCount) !== null && _d !== void 0 ? _d : RX_RECORD_GRID.defaultTypeaheadKeystrokeCount
                    };
                    const actions = filter(componentDefinition.componentDefinitions, {
                        type: 'rx-action'
                    }).map((action) => action.propertiesByName);
                    if (actions.length) {
                        adaptedProperties.clickable = true;
                        adaptedProperties.actions = actions;
                    }
                    Object.assign(componentDefinition.propertiesByName, adaptedProperties);
                    break;
                }
                case RX_RECORD_GRID.components.filterPreset:
                case RX_RECORD_GRID.components.filter: {
                    Object.assign(componentDefinition.propertiesByName, {
                        guid: componentDefinition.guid
                    });
                    break;
                }
            }
        });
    }
    getActionButtonsForOutlet(layout, outletName, actionButtons) {
        const actionButtonsGuids = chain(layout.outlets)
            .filter({
            name: outletName
        })
            .head()
            .get('columns[0].children', [])
            .value();
        return filter(actionButtons, (actionButton) => actionButtonsGuids.includes(actionButton.guid));
    }
}
RxRecordGridDefinitionAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridDefinitionAdapterService, deps: [{ token: i1.RxViewDefinitionParserService }, { token: i2.RxJsonParserService }, { token: i3.RxRecordGridConfigUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordGridDefinitionAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridDefinitionAdapterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridDefinitionAdapterService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxViewDefinitionParserService }, { type: i2.RxJsonParserService }, { type: i3.RxRecordGridConfigUtilsService }]; } });
//# sourceMappingURL=record-grid-definition-adapter.service.js.map