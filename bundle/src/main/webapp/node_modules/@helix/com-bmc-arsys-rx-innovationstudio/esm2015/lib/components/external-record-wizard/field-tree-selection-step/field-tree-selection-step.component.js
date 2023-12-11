import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TreeWrap } from '@bmc-ux/adapt-angular';
import { RxDocumentDefinitionService } from '@helix/platform/document/api';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { RxJsonParserService } from '@helix/platform/utils';
import { RecordGridComponent } from '@helix/platform/view/components';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep, find, forEach, head, includes, isArray, isEmpty, isEqual, isObject, reduce, remove, some, sortBy } from 'lodash';
import { combineLatest, of, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, skipWhile, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { AX_BUNDLE_DETAILS } from '../../bundle-details/bundle-details.constant';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/document/api";
import * as i3 from "@helix/platform/utils";
import * as i4 from "@helix/platform/shared/components";
import * as i5 from "@ngx-translate/core";
import * as i6 from "@bmc-ux/adapt-angular";
import * as i7 from "@helix/platform/view/components";
import * as i8 from "@angular/forms";
export class FieldTreeSelectionStepComponent {
    constructor(rxDefinitionNameService, rxDocumentDefinitionService, rxJsonParserService, rxWizardModalComponent, translateService) {
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxDocumentDefinitionService = rxDocumentDefinitionService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.selectedDocumentTreeNodes = [];
        this.treeWrap = TreeWrap.WrapAll;
        this.selectedDocumentSchemaFields = [];
        this.selectedFieldsGroup = new FormGroup({});
        this.mappingGroup = new FormGroup({
            displayId: new FormControl([]),
            id: new FormControl([])
        });
        this.supportedFieldTypes = ['boolean', 'character', 'dateOnly', 'dateTime', 'decimal', 'integer', 'real', 'timeOnly'];
        this.fieldTypes = sortBy(reduce(RX_RECORD_DEFINITION.dataTypes, (result, type, key) => {
            if (includes(this.supportedFieldTypes, key)) {
                result.push(type);
            }
            return result;
        }, []), 'displayName');
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.availableFieldsSectionLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.field-tree-selection.available-fields.section.label');
        this.mapToDisplayIdLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.field-tree-selection.map-to-display-id.label');
        this.mapToIdLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.field-tree-selection.map-to-id.label');
        this.selectedFieldsSectionLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.field-tree-selection.selected-fields.section.label');
        const gridColumns = [
            {
                fieldId: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                title: this.translateService.instant(AX_BUNDLE_DETAILS.definitionGridColumns.name.title)
            },
            {
                fieldId: 'type',
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.item-type.label'),
                sortable: false,
                cellTemplate: this.typeCellTemplate
            },
            {
                fieldId: 'delete',
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.delete.label'),
                sortable: false,
                cellTemplate: this.deleteCellTemplate
            }
        ];
        const gridRecordDefinition = {
            fieldDefinitions: [
                {
                    id: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'type',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'delete',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
        this.recordGridConfig$ = of({
            columns: gridColumns,
            emptyStateLabelText: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.external-record-wizard.field-tree-selection.grid.empty-state.label'),
            enableFiltering: false,
            enableRowSelection: null,
            recordIdField: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
            styles: 'flex-fill',
            toolbarConfig: {
                filter: false,
                visibleColumnsMenu: false
            },
            useExternalFiltering: false,
            getRecordDefinition: () => of(gridRecordDefinition),
            getData: () => of({
                data: this.selectedDocumentSchemaFields,
                totalSize: this.selectedDocumentSchemaFields.length
            })
        });
        const fieldTreeSelectionStepContext$ = this.rxWizardModalComponent.context$.pipe(shareReplay(1), takeUntil(this.destroyed$));
        fieldTreeSelectionStepContext$
            .pipe(map((stepContext) => { var _a; return (_a = stepContext.document) === null || _a === void 0 ? void 0 : _a.name; }), distinctUntilChanged(isEqual), switchMap((documentName) => {
            this.selectedDocumentTreeNodes = [];
            this.selectedDocumentSchemaFields = [];
            this.rxWizardModalComponent.api.updateContext({
                documentSchemaFields: [],
                nonDocumentSchemaFields: []
            });
            if (documentName) {
                return this.rxDocumentDefinitionService.get(documentName);
            }
            else {
                return of();
            }
        }), skipWhile(isEmpty))
            .subscribe((documentDefinition) => {
            this.documentTree = [
                {
                    data: documentDefinition.guid,
                    label: this.rxDefinitionNameService.getDisplayName(documentDefinition.name),
                    children: this.prepareTreeForAdapt(documentDefinition.documentSchema, []),
                    expanded: true,
                    disallowMultipleNodeSelection: true
                }
            ];
            this.recordGrid.api.refresh().subscribe();
        });
        const isCurrentStep$ = combineLatest([
            this.rxWizardModalComponent.steps$,
            this.rxWizardModalComponent.tabIndex$
        ]).pipe(map(([steps, tabIndex]) => steps[tabIndex].id === 'field-tree-selection'), takeUntil(this.destroyed$));
        const documentSchemaFields$ = fieldTreeSelectionStepContext$.pipe(map((stepContext) => stepContext.documentSchemaFields), distinctUntilChanged(isEqual));
        combineLatest([isCurrentStep$, documentSchemaFields$])
            .pipe(filter(([isCurrentStep, documentSchemaFields]) => isCurrentStep), distinctUntilChanged(isEqual))
            .subscribe(([isCurrentStep, documentSchemaFields]) => {
            if (documentSchemaFields.length) {
                this.rxWizardModalComponent.api.enableNextButton();
            }
            else {
                this.rxWizardModalComponent.api.disableNextButton();
            }
            forEach(this.mappingGroup.controls, (formControl) => {
                if (formControl.value.length && !some(documentSchemaFields, ['path', formControl.value[0].path])) {
                    formControl.reset([]);
                }
            });
        });
        this.mappingGroup.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((mappedValues) => {
            var _a, _b;
            const selectedFieldMapping = {
                displayId: (mappedValues.displayId && ((_a = mappedValues.displayId[0]) === null || _a === void 0 ? void 0 : _a.path)) || '',
                id: (mappedValues.id && ((_b = mappedValues.id[0]) === null || _b === void 0 ? void 0 : _b.path)) || ''
            };
            this.rxWizardModalComponent.api.updateContext({ selectedFieldMapping });
        });
        this.selectedFieldsGroup.valueChanges
            .pipe(withLatestFrom(this.rxWizardModalComponent.context$), takeUntil(this.destroyed$))
            .subscribe(([value, context]) => {
            const documentSchemaFields = cloneDeep(context.documentSchemaFields);
            documentSchemaFields.forEach((field) => {
                field.type = value[field.path][0].resourceType;
            });
            this.rxWizardModalComponent.api.updateContext({ documentSchemaFields });
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    getCoreFieldMappingOptions() {
        return sortBy(this.selectedDocumentSchemaFields, 'name');
    }
    optionFormatter(selectOption) {
        return selectOption.displayName || selectOption.name;
    }
    selectFields() {
        this.selectedDocumentSchemaFields = this.selectedDocumentTreeNodes.reduce((result, node) => {
            if (!node.children) {
                const field = {
                    name: node.name,
                    path: node.path,
                    type: RX_RECORD_DEFINITION.dataTypes.character.resourceType
                };
                if (!node.disallowMultipleNodeSelection) {
                    node.disallowMultipleNodeSelection = true;
                    this.selectedFieldsGroup.setControl(node.path, new FormControl([RX_RECORD_DEFINITION.dataTypes.character]));
                }
                result.push(field);
            }
            return result;
        }, []);
        this.rxWizardModalComponent.api.updateContext({
            documentSchemaFields: cloneDeep(this.selectedDocumentSchemaFields)
        });
        this.recordGrid.api.refresh().subscribe();
    }
    unselectField(field) {
        find(this.selectedDocumentTreeNodes, { data: field.path }).disallowMultipleNodeSelection = false;
        this.selectedDocumentTreeNodes = this.selectedDocumentTreeNodes.filter((node) => { var _a; return node.data !== field.path && !((_a = node.children) === null || _a === void 0 ? void 0 : _a.some((element) => element.data === field.path)); });
        remove(this.selectedDocumentSchemaFields, { path: field.path });
        this.rxWizardModalComponent.api.updateContext({
            documentSchemaFields: cloneDeep(this.selectedDocumentSchemaFields)
        });
        this.recordGrid.api.refresh().subscribe();
    }
    prepareTreeForAdapt(documentSchema, selectedFields) {
        let documentSchemaJson = this.rxJsonParserService.tryParseJson(documentSchema, {});
        if (isArray(documentSchemaJson)) {
            documentSchemaJson = head(documentSchemaJson);
        }
        return this.deepProcessJson(documentSchemaJson, '', [], selectedFields);
    }
    // Due to backend limitation, arrays can be processed only once per node
    // i.e. all arrays nested in arrays should be displayed as a leaf and in the tree
    // In runtime server will store complete stringified array as a value in record definition
    deepProcessJson(json, currentPath, arraysProcessedInPath, selectedFields, parentNode) {
        return reduce(json, (tree, value, key) => {
            const path = (currentPath ? currentPath + '||' : '') + key;
            const isNodeSelected = some(selectedFields, ['path', path]);
            let childNodes = null;
            const node = {
                name: key,
                label: key,
                data: path,
                path,
                type: RX_RECORD_DEFINITION.resourceTypes.character,
                isArray: isArray(value),
                parent: parentNode,
                children: null,
                expanded: true,
                disallowMultipleNodeSelection: null
            };
            if (isArray(value)) {
                const arrayHasBeenProcessedInSamePath = arraysProcessedInPath.some((processedPath) => path.indexOf(processedPath) !== -1);
                if (!arrayHasBeenProcessedInSamePath) {
                    arraysProcessedInPath.push(path);
                    childNodes = this.flattenListStructure(value, path, arraysProcessedInPath, selectedFields, node);
                }
            }
            else if (isObject(value)) {
                childNodes = this.deepProcessJson(value, path, arraysProcessedInPath, selectedFields, node);
            }
            node.children = childNodes;
            node.disallowMultipleNodeSelection = Boolean(childNodes);
            tree.push(node);
            return tree;
        }, []);
    }
    flattenListStructure(list, currentPath, arraysProcessedInPath, selectedFields, parentNode) {
        const entry = head(list);
        return isObject(entry)
            ? this.deepProcessJson(entry, currentPath, arraysProcessedInPath, selectedFields, parentNode)
            : [];
    }
}
/** @nocollapse */ FieldTreeSelectionStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldTreeSelectionStepComponent, deps: [{ token: i1.RxDefinitionNameService }, { token: i2.RxDocumentDefinitionService }, { token: i3.RxJsonParserService }, { token: i4.RxWizardModalComponent }, { token: i5.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ FieldTreeSelectionStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FieldTreeSelectionStepComponent, selector: "ax-field-tree-selection-step", viewQueries: [{ propertyName: "recordGrid", first: true, predicate: RecordGridComponent, descendants: true, static: true }, { propertyName: "typeCellTemplate", first: true, predicate: ["typeCellTemplate"], descendants: true, static: true }, { propertyName: "deleteCellTemplate", first: true, predicate: ["deleteCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"row\">\n  <div class=\"col-5 d-flex flex-column pr-0 mh-100\">\n    <adapt-rx-control-label [label]=\"availableFieldsSectionLabel\"></adapt-rx-control-label>\n    <div class=\"border h-100 p-1 field-tree-wrapper\">\n      <adapt-tree\n        [(selection)]=\"selectedDocumentTreeNodes\"\n        [value]=\"documentTree\"\n        [wrap]=\"treeWrap\"\n        selectionMode=\"checkbox\"\n      ></adapt-tree>\n    </div>\n  </div>\n\n  <div class=\"col-1 d-flex align-items-center\">\n    <button\n      type=\"button\"\n      adapt-button\n      btn-type=\"secondary\"\n      class=\"d-icon-angle_right\"\n      rx-id=\"add-button\"\n      (click)=\"selectFields()\"\n    ></button>\n  </div>\n\n  <div class=\"col-6 d-flex flex-column pl-0\">\n    <adapt-rx-control-label [label]=\"selectedFieldsSectionLabel\" [showRequiredLabel]=\"true\"></adapt-rx-control-label>\n\n    <rx-record-grid class=\"form-group\" [config]=\"recordGridConfig$\"></rx-record-grid>\n\n    <div class=\"d-flex flex-column control-width\">\n      <adapt-rx-select\n        class=\"form-group\"\n        appendToBody=\"true\"\n        [formControl]=\"mappingGroup.controls.displayId\"\n        [label]=\"mapToDisplayIdLabel\"\n        [options]=\"getCoreFieldMappingOptions()\"\n        [optionFormatter]=\"optionFormatter\"\n      >\n      </adapt-rx-select>\n      <adapt-rx-select\n        appendToBody=\"true\"\n        [formControl]=\"mappingGroup.controls.id\"\n        [label]=\"mapToIdLabel\"\n        [options]=\"getCoreFieldMappingOptions()\"\n        [optionFormatter]=\"optionFormatter\"\n      >\n      </adapt-rx-select>\n    </div>\n  </div>\n</div>\n\n<ng-template #typeCellTemplate let-dataItem=\"dataItem\">\n  <adapt-rx-select\n    class=\"type-selector\"\n    appendToBody=\"true\"\n    [formControl]=\"selectedFieldsGroup.controls[dataItem.path]\"\n    [options]=\"fieldTypes\"\n    [optionFormatter]=\"optionFormatter\"\n    [popupMaxHeight]=\"290\"\n  >\n  </adapt-rx-select>\n</ng-template>\n\n<ng-template #deleteCellTemplate let-dataItem=\"dataItem\">\n  <button\n    class=\"unselect-field-button d-icon-minus_circle text-danger\"\n    adapt-button\n    btn-type=\"tertiary\"\n    type=\"button\"\n    (click)=\"unselectField(dataItem)\"\n  ></button>\n</ng-template>\n", styles: [":host{display:flex;height:100%}:host ::ng-deep .rx-custom-cell{max-height:38px}:host ::ng-deep .type-selector,:host ::ng-deep .unselect-field-button{margin:-.5rem -13px}rx-record-grid{height:100%}.field-tree-wrapper{overflow:auto}\n"], components: [{ type: i6.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i6.AdaptTreeComponent, selector: "adapt-tree", inputs: ["value", "filter", "texts", "filterBtnClearText", "filterPlaceholder", "testID", "lazy", "lazyLoading", "trim", "wrap", "selectAllButton", "deselectAllButton", "treeScrollHeight", "adaptRadarDisableEventSending", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "validateDrop"], outputs: ["onNodeDrop", "lazyLoad"] }, { type: i6.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i7.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i6.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i8.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldTreeSelectionStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-field-tree-selection-step',
                    templateUrl: 'field-tree-selection-step.component.html',
                    styleUrls: ['./field-tree-selection-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDefinitionNameService }, { type: i2.RxDocumentDefinitionService }, { type: i3.RxJsonParserService }, { type: i4.RxWizardModalComponent }, { type: i5.TranslateService }]; }, propDecorators: { recordGrid: [{
                type: ViewChild,
                args: [RecordGridComponent, { static: true }]
            }], typeCellTemplate: [{
                type: ViewChild,
                args: ['typeCellTemplate', { static: true }]
            }], deleteCellTemplate: [{
                type: ViewChild,
                args: ['deleteCellTemplate', { static: true }]
            }] } });
//# sourceMappingURL=field-tree-selection-step.component.js.map