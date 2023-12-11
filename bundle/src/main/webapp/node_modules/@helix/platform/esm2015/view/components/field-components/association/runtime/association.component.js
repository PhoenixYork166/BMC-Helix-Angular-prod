import { DatePipe } from '@angular/common';
import { Component, ViewChild, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { castArray, find, forEach, get, head, includes, isNil, isString, isUndefined, map as _map, transform, isEmpty, isEqual, every } from 'lodash';
import { combineLatest, EMPTY, of } from 'rxjs';
import { delay, distinctUntilChanged, filter, map, skip, startWith, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { RX_ASSOCIATION_DEFINITION, RxAssociatedRecordNodeSide, RxAssociationDefinitionService, RxAssociationInstanceDataPageService } from '@helix/platform/association/api';
import { RX_RECORD_DEFINITION, RxRecordDefinitionInheritanceDataPageService, RxRecordInstanceDataPageService, RxRecordInstanceUtilsService } from '@helix/platform/record/api';
import { RxSelectWithPaginationComponent } from '@helix/platform/shared/components';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { RecordEditorState } from '../../../record-editor';
import { RxAssociationEditingMode } from '../association.types';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@helix/platform/association/api";
import * as i3 from "@helix/platform/record/api";
import * as i4 from "@helix/platform/ui-kit";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@helix/platform/view/runtime";
import * as i7 from "./record-preview-card/record-preview-card.component";
import * as i8 from "@helix/platform/shared/components";
import * as i9 from "@angular/forms";
import * as i10 from "@ngx-translate/core";
export class RxAssociationComponent extends BaseViewComponent {
    constructor(datePipe, rxAssociationDefinitionService, rxAssociationInstanceDataPageService, rxRecordDefinitionInheritanceDataPageService, rxRecordInstanceDataPageService, rxRecordInstanceUtilsService) {
        super();
        this.datePipe = datePipe;
        this.rxAssociationDefinitionService = rxAssociationDefinitionService;
        this.rxAssociationInstanceDataPageService = rxAssociationInstanceDataPageService;
        this.rxRecordDefinitionInheritanceDataPageService = rxRecordDefinitionInheritanceDataPageService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.rxRecordInstanceUtilsService = rxRecordInstanceUtilsService;
        this.isDisabled = false;
        this.api = {
            associate: (associations) => {
                this.associationManager.addToPending(associations, this.extractRolesConfig());
            }
        };
        this.modelToViewValueAdapterFunc = this.modelToViewValueAdapter.bind(this);
        this.optionLoaderFunc = this.getAssociationsOptionPage.bind(this);
        this.viewToModelValueAdapterFunc = this.viewToModelValueAdapter.bind(this);
        this.existingPreviewConfigurations = [];
        this.pendingPreviewConfigurations = [];
        this.selectedOptions = [];
        this.pendingPageSize = 10;
        this.currentPendingCount = 10;
        this.totalPendingCount = 0;
        this.associationCandidateRecordInstances = [];
        this.fieldDefinitions = {};
        this.fieldId = null;
        this.fields = [];
        this.inReadState = false;
        this.label = null;
        this.recordDefinition = null;
        this.recordDefinitionName = null;
        this.useDefaultRoles = null;
        this.nodeARole = null;
        this.nodeBRole = null;
        this.formControl = new FormControl('', null);
        this.isHidden = false;
    }
    ngOnInit() {
        super.ngOnInit();
        const config$ = this.config.pipe(filter((config) => Boolean(config.api && config.recordDefinition)), takeUntil(this.destroyed$));
        config$.pipe(take(1)).subscribe((config) => {
            this.onConfigInitialized(config);
            this.onConfigUpdated(config);
        });
        config$.pipe(skip(1)).subscribe(this.onConfigUpdated.bind(this));
        this.notifyPropertyChanged('api', this.api);
        this.previewRolesConfig = this.extractRolesConfig();
    }
    ngAfterViewInit() {
        if (this.editingMode === RxAssociationEditingMode.Dropdown) {
            this.formControl.valueChanges
                .pipe(distinctUntilChanged(), startWith(this.formControl.value), takeUntil(this.destroyed$))
                .subscribe(() => {
                this.updateSelectedOptions();
            });
        }
    }
    onConfigInitialized(config) {
        this.associationDefinitionName = config.associationDefinitionName;
        this.associatedRecordNodeSide = config.associatedRecordNodeSide;
        this.editingMode = config.editingMode || RxAssociationEditingMode.Views;
        this.fieldId = config.fieldId;
        this.fields = config.fields;
        this.recordDefinition = config.recordDefinition;
        this.recordDefinitionName = config.recordDefinitionName;
        this.recordEditorApi = config.api;
        this.state = config.state;
        this.useDefaultRoles = config.useDefaultRoles;
        this.nodeARole = config.nodeARole;
        this.nodeBRole = config.nodeBRole;
        if (this.fieldId) {
            this.fieldDefinition = config.recordDefinition.fieldDefinitions.find((definition) => definition.id === Number(this.fieldId));
        }
    }
    onConfigUpdated(config) {
        var _a;
        const inReadState = Boolean(config.inReadState);
        const isDisabled = Boolean(config.disabled) || this.permissionType === RX_RECORD_DEFINITION.fieldPermissionTypes.view;
        let forceUpdatePreviewCardConfigState = false;
        this.isHidden = Boolean(config.hidden);
        this.areActionsAvailable = !inReadState && this.editingMode === RxAssociationEditingMode.Views;
        if (this.isDisabled !== isDisabled) {
            this.isDisabled = isDisabled;
            forceUpdatePreviewCardConfigState = true;
        }
        if (this.inReadState !== inReadState) {
            this.inReadState = inReadState;
            forceUpdatePreviewCardConfigState = true;
        }
        if (forceUpdatePreviewCardConfigState && this.existingPreviewConfigurations.length) {
            this.updatePreviewCardConfigState();
        }
        this.label = isUndefined(config.label) ? (_a = this.fieldDefinition.name) !== null && _a !== void 0 ? _a : '' : config.label;
        if (this.selectWithPaginationComponent &&
            this.associationFilter &&
            get(config, 'associationFilter[0]') &&
            this.associationFilter.recordInstanceId !== config.associationFilter[0].recordInstanceId) {
            // Do not delete existing association until Record editor is ready.
            // This is needed in case when e.g. one association view component
            // is filtered by the value selected in the other association view component.
            // If during initialization, the value in the second view component gets loaded
            // faster than the value in the first one, the value in the second view component
            // would be cleared after the first component's value is loaded.
            if (this.recordEditorApi.isReady()) {
                this.deleteAllExisting();
            }
            this.deleteAllPending();
            this.selectWithPaginationComponent.resetLoadedOptions();
            this.associationCandidateRecordInstances = [];
            if (!this.associationFilterNodeSide) {
                this.rxAssociationDefinitionService
                    .get(this.associationFilter.associationDefinitionName)
                    .pipe(switchMap((associationDefinition) => {
                    if (associationDefinition.nodeAId === this.recordDefinitionName) {
                        this.associationFilterNodeSide = RxAssociatedRecordNodeSide.NodeA;
                    }
                    else if (associationDefinition.nodeBId === this.recordDefinitionName) {
                        this.associationFilterNodeSide = RxAssociatedRecordNodeSide.NodeB;
                    }
                    else {
                        return this.rxRecordDefinitionInheritanceDataPageService
                            .get({ params: { recorddefinition: this.recordDefinitionName } })
                            .pipe(tap((recordDefinitionInheritanceDataPage) => {
                            const recordDefinitionAncestors = recordDefinitionInheritanceDataPage.data;
                            if (includes(recordDefinitionAncestors, associationDefinition.nodeAId)) {
                                this.associationFilterNodeSide = RxAssociatedRecordNodeSide.NodeA;
                            }
                            else if (includes(recordDefinitionAncestors, associationDefinition.nodeBId)) {
                                this.associatedRecordNodeSide = RxAssociatedRecordNodeSide.NodeB;
                            }
                            else {
                                throw new Error('No matches for association definition node side within inheritance ancestors.');
                            }
                        }));
                    }
                    return EMPTY;
                }))
                    .subscribe();
            }
        }
        this.associationFilter = head(config.associationFilter);
        if (config.recordInstance && this.recordInstance !== config.recordInstance) {
            this.recordInstance = config.recordInstance;
            this.isDisabled = true;
            this.notifyPropertyChanged('isDisabled', this.isDisabled);
            this.recordEditorApi.notifyComponentReady(this.guid, false);
            this.associationManager = this.getAssociationManager();
            this.associationManager
                .initialize()
                .pipe(delay(0), switchMap(() => this.associationManager.loadExistingAssociations()), tap(() => {
                this.isDisabled =
                    Boolean(config.disabled) || this.permissionType === RX_RECORD_DEFINITION.fieldPermissionTypes.view;
                this.notifyPropertyChanged('isDisabled', this.isDisabled);
                this.areActionsAvailable = !this.inReadState && this.editingMode === RxAssociationEditingMode.Views;
                if (this.editingMode === RxAssociationEditingMode.Views) {
                    this.fieldDefinitions = transform(this.fields, (result, field) => {
                        const fieldDefinition = find(this.associationManager.recordDefinition.fieldDefinitions, {
                            id: Number(field.fieldId)
                        });
                        result[fieldDefinition.id] = fieldDefinition;
                    }, {});
                }
                this.associationManager.existing$.pipe(takeUntil(this.destroyed$)).subscribe((newValue) => {
                    this.onAssociationsChanged(newValue, 'existingPreviewConfigurations');
                    this.updateTotalExistingAssociationsCount();
                });
                this.associationManager.pending$.pipe(takeUntil(this.destroyed$)).subscribe((newValue) => {
                    this.onAssociationsChanged(newValue, 'pendingPreviewConfigurations');
                    this.totalPendingCount = this.pendingPreviewConfigurations.length;
                });
                combineLatest([this.associationManager.pending$, this.associationManager.existing$])
                    .pipe(take(1))
                    .subscribe(() => {
                    this.recordEditorApi.notifyComponentReady(this.guid, true);
                });
            }))
                .subscribe();
        }
    }
    getAssociationManager() {
        const fieldsIds = this.fieldId
            ? [this.fieldId, RX_RECORD_DEFINITION.coreFieldIds.id]
            : _map(this.fields, 'fieldId');
        return this.recordEditorApi.getAssociationManager({
            associationDefinitionName: this.associationDefinitionName,
            associatedRecordNodeSide: this.associatedRecordNodeSide || RX_ASSOCIATION_DEFINITION.roles.second.value,
            associatedRecordInstanceId: this.recordInstance.id,
            recordDefinitionName: this.recordDefinitionName,
            fieldIds: fieldsIds,
            rolesConfig: this.extractRolesConfig()
        });
    }
    getAssociationsOptionPage(startIndex, pageSize, searchQuery) {
        const params = {
            pageSize: pageSize,
            startIndex: startIndex,
            recorddefinition: this.recordDefinitionName,
            propertySelection: this.associationManager.getFieldIds()
        };
        let instanceDataPageService;
        if (this.associationFilter) {
            if (this.associationFilter.recordInstanceId) {
                params.associationDefinition = this.associationFilter.associationDefinitionName;
                params.associatedRecordInstanceId = this.associationFilter.recordInstanceId;
                params.nodeToQuery = this.associationFilterNodeSide;
                instanceDataPageService = this.rxAssociationInstanceDataPageService;
            }
        }
        else {
            params.sortBy = this.fieldId;
            if (searchQuery) {
                params.queryExpression = `('${this.fieldId}' LIKE "%${this.rxRecordInstanceUtilsService.escapeTextWildcards(searchQuery)}%")`;
            }
            instanceDataPageService = this.rxRecordInstanceDataPageService;
        }
        return instanceDataPageService
            ? instanceDataPageService.post({ params: params }).pipe(map((result) => {
                this.associationCandidateRecordInstances.push(...result.data);
                return {
                    totalSize: result.totalSize,
                    options: result.data.map((recordInstance) => ({
                        displayValue: recordInstance[this.fieldId] || '',
                        value: recordInstance[RX_RECORD_DEFINITION.coreFieldIds.id]
                    }))
                };
            }))
            : of({
                options: [],
                totalSize: 0
            });
    }
    deleteAllExisting() {
        this.associationManager.deleteAllExisting();
    }
    deleteAllPending() {
        this.associationManager.deleteAllPending();
    }
    loadExistingAssociations() {
        this.associationManager
            .loadExistingAssociations()
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => this.updateTotalExistingAssociationsCount());
    }
    isReadModeEnabled() {
        return this.inReadState;
    }
    isEditModeEnabled() {
        return !this.inReadState;
    }
    getAssociatedValue() {
        return get(this, 'selectedOptions[0].displayValue');
    }
    // [{displayValue: 'FOO', value: 'foo'}, {displayValue: 'BAR', value: 'bar'}] -> 'foo;bar;baz'
    viewToModelValueAdapter(selectedOptions) {
        return selectedOptions.map((option) => option.value).join(';');
    }
    // 'foo;bar;baz' -> [{displayValue: 'FOO', value: 'foo'}, {displayValue: 'BAR', value: 'bar'}]
    modelToViewValueAdapter(modelValue) {
        return modelValue ? castArray(this.selectedOptions) : [];
    }
    resetDropdownSelection() {
        this.selectedOptions = [];
    }
    updatePreviewCardConfigState() {
        forEach(this.existingPreviewConfigurations, (previewCardConfig) => {
            previewCardConfig.state = this.getStateForPreviewConfiguration();
        });
    }
    updateSelectedOptions() {
        if (this.formControl.value && !isNil(this.formControl.value)) {
            const pendingAssociation = {
                id: this.formControl.value,
                fieldInstances: null
            };
            const selectedRecordInstance = find(this.associationCandidateRecordInstances, function (association) {
                return association[RX_RECORD_DEFINITION.coreFieldIds.id] === pendingAssociation.id;
            });
            pendingAssociation.fieldInstances = transform(selectedRecordInstance, function (result, value, filedId) {
                result[filedId] = { value: value };
            }, {});
            this.associationManager.addToPending([pendingAssociation], null);
        }
        else {
            this.deleteAllExisting();
            this.deleteAllPending();
        }
    }
    buildPreviewConfig(association, fields, state) {
        return {
            id: association.id,
            state: state,
            onDelete: (associationId) => {
                this.associationManager.delete(associationId);
            },
            fields: _map(fields, (field) => {
                const fieldDefinition = this.fieldDefinitions[field.fieldId];
                const fieldInstance = association.fieldInstances[field.fieldId];
                let value;
                if (fieldInstance) {
                    value = fieldInstance.value;
                }
                if (fieldDefinition.resourceType === RX_RECORD_DEFINITION.dataTypes.selection.resourceType) {
                    value = fieldDefinition.optionNamesById[value];
                }
                if (fieldDefinition.resourceType === RX_RECORD_DEFINITION.dataTypes.dateTime.resourceType ||
                    (fieldDefinition.resourceType === RX_RECORD_DEFINITION.dataTypes.dateOnly.resourceType && isString(value))) {
                    value = this.datePipe.transform(value, 'mediumDate');
                }
                return {
                    label: field.label,
                    value: value || '<unknown>',
                    index: field.index,
                    fieldId: field.fieldId
                };
            })
        };
    }
    showPendingAssociations() {
        this.currentPendingCount += this.pendingPageSize;
    }
    getPendingPreviewConfigurations() {
        return this.pendingPreviewConfigurations.slice(0, this.currentPendingCount);
    }
    extractRolesConfig() {
        return {
            useDefaultRoles: this.useDefaultRoles,
            nodeARole: this.nodeARole,
            nodeBRole: this.nodeBRole
        };
    }
    updateTotalExistingAssociationsCount() {
        this.associationManager.totalExistingCount =
            (this.associationManager.remainingAssociatedRecordCount || 0) + this.existingPreviewConfigurations.length;
    }
    getStateForPreviewConfiguration() {
        return this.areActionsAvailable && !this.isDisabled ? RecordEditorState.Edit : RecordEditorState.Read;
    }
    getFirstAssociationRecord() {
        return this.associationManager.existing[0] || this.associationManager.pending[0] || {};
    }
    onAssociationsChanged(associations, configName) {
        var _a;
        const firstAssociatedRecord = this.getFirstAssociationRecord();
        this.notifyPropertyChanged('firstAssociatedRecord', { id: firstAssociatedRecord.id || '' });
        if (this.editingMode === RxAssociationEditingMode.Views) {
            const associationsToPreview = associations.filter((association) => every(this.previewRolesConfig, isEmpty) || isEqual(this.previewRolesConfig, association.rolesConfig));
            this[configName] = this.rebuildPreviewConfigurations(associationsToPreview);
        }
        else if (this.editingMode === RxAssociationEditingMode.Dropdown) {
            if (firstAssociatedRecord.id) {
                this.selectedOptions = [
                    {
                        displayValue: (_a = firstAssociatedRecord.fieldInstances[this.fieldId]) === null || _a === void 0 ? void 0 : _a.value,
                        value: firstAssociatedRecord.id
                    }
                ];
            }
            else {
                this.resetDropdownSelection();
            }
            this.formControl.setValue(firstAssociatedRecord.id);
        }
    }
    rebuildPreviewConfigurations(associations) {
        const state = this.getStateForPreviewConfiguration();
        return _map(associations, (association) => {
            return this.buildPreviewConfig(association, this.fields, state);
        });
    }
}
RxAssociationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationComponent, deps: [{ token: i1.DatePipe }, { token: i2.RxAssociationDefinitionService }, { token: i2.RxAssociationInstanceDataPageService }, { token: i3.RxRecordDefinitionInheritanceDataPageService }, { token: i3.RxRecordInstanceDataPageService }, { token: i3.RxRecordInstanceUtilsService }], target: i0.ɵɵFactoryTarget.Component });
RxAssociationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxAssociationComponent, selector: "rx-association", host: { properties: { "class.rx-field-disabled": "this.isDisabled" } }, viewQueries: [{ propertyName: "selectWithPaginationComponent", first: true, predicate: RxSelectWithPaginationComponent, descendants: true }], usesInheritance: true, ngImport: i0, template: "<rx-read-only-field\n  *ngIf=\"!isHidden && isReadModeEnabled() && (existingPreviewConfigurations.length === 0 || editingMode === 'dropdown')\"\n  [label]=\"label\"\n  [value]=\"getAssociatedValue()\"\n></rx-read-only-field>\n\n<div *ngIf=\"!isHidden\" [ngSwitch]=\"editingMode\">\n  <div *ngSwitchCase=\"'views'\" [attr.aria-label]=\"label\" [ngClass]=\"{ 'read-state': isReadModeEnabled() }\">\n    <adapt-rx-control-label *ngIf=\"isEditModeEnabled() || existingPreviewConfigurations.length > 0\" [label]=\"label\">\n    </adapt-rx-control-label>\n\n    <div *ngIf=\"areActionsAvailable\">\n      <rx-runtime-view-canvas-outlet></rx-runtime-view-canvas-outlet>\n    </div>\n\n    <div *ngIf=\"isReadModeEnabled()\">\n      <div [ngSwitch]=\"associationManager.cardinalityType\">\n        <div *ngSwitchCase=\"associationManager.cardinalityTypes.One\">\n          <div *ngIf=\"existingPreviewConfigurations.length || pendingPreviewConfigurations.length\" class=\"list-group\">\n            <rx-record-preview-card\n              [config]=\"existingPreviewConfigurations[0] || pendingPreviewConfigurations[0]\"\n              class=\"list-group-item\"\n            ></rx-record-preview-card>\n          </div>\n        </div>\n\n        <div *ngSwitchDefault>\n          <div class=\"list-group\">\n            <rx-record-preview-card\n              *ngFor=\"let previewCardConfig of existingPreviewConfigurations\"\n              [config]=\"previewCardConfig\"\n              class=\"list-group-item\"\n            ></rx-record-preview-card>\n          </div>\n\n          <button\n            *ngIf=\"\n              associationManager.totalExistingCount >\n              existingPreviewConfigurations.length + associationManager.deleted.length\n            \"\n            (click)=\"loadExistingAssociations()\"\n            adapt-button\n            size=\"small\"\n            btn-type=\"tertiary\"\n            type=\"button\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.show-more.label' | translate }}\n          </button>\n        </div>\n      </div>\n    </div>\n\n    <div *ngIf=\"isEditModeEnabled()\">\n      <div *ngIf=\"existingPreviewConfigurations.length\" class=\"form-group\">\n        <div class=\"d-flex justify-content-end pb-1\">\n          <span class=\"preview-count\">\n            {{\n              associationManager.totalExistingCount > 1\n                ? ('com.bmc.arsys.rx.client.view-components.record-editor.association.total-items.label'\n                  | translate\n                    : {\n                        count: associationManager.totalExistingCount\n                      })\n                : ('com.bmc.arsys.rx.client.view-components.record-editor.association.single-item.label' | translate)\n            }}\n          </span>\n\n          <button\n            [hidden]=\"!areActionsAvailable || isDisabled\"\n            (click)=\"deleteAllExisting()\"\n            adapt-button\n            size=\"small\"\n            btn-type=\"tertiary\"\n            class=\"btn btn-link py-0\"\n            type=\"button\"\n          >\n            {{ 'com.bmc.arsys.rx.client.view-components.record-editor.association.button.clear-all.label' | translate }}\n          </button>\n        </div>\n\n        <div class=\"list-group\">\n          <rx-record-preview-card\n            *ngFor=\"let previewCardConfig of existingPreviewConfigurations\"\n            [config]=\"previewCardConfig\"\n            class=\"list-group-item\"\n          ></rx-record-preview-card>\n        </div>\n\n        <button\n          *ngIf=\"\n            associationManager.totalExistingCount >\n            existingPreviewConfigurations.length + associationManager.deleted.length\n          \"\n          (click)=\"loadExistingAssociations()\"\n          adapt-button\n          size=\"small\"\n          btn-type=\"tertiary\"\n          type=\"button\"\n        >\n          {{ 'com.bmc.arsys.rx.client.common.show-more.label' | translate }}\n        </button>\n      </div>\n\n      <div *ngIf=\"pendingPreviewConfigurations.length\" class=\"form-group mt-3\">\n        <div class=\"d-flex justify-content-between\">\n          <div class=\"m-0\">\n            {{\n              'com.bmc.arsys.rx.client.view-components.record-editor.association.pending-associations.label' | translate\n            }}\n            :\n          </div>\n\n          <div class=\"d-flex pb-1\">\n            <span class=\"preview-count\">\n              {{\n                totalPendingCount > 1\n                  ? ('com.bmc.arsys.rx.client.view-components.record-editor.association.total-items.label'\n                    | translate\n                      : {\n                          count: totalPendingCount\n                        })\n                  : ('com.bmc.arsys.rx.client.view-components.record-editor.association.single-item.label' | translate)\n              }}\n            </span>\n\n            <button\n              [hidden]=\"!areActionsAvailable || isDisabled\"\n              (click)=\"deleteAllPending()\"\n              adapt-button\n              size=\"small\"\n              btn-type=\"tertiary\"\n              class=\"btn btn-link py-0\"\n              type=\"button\"\n            >\n              {{\n                'com.bmc.arsys.rx.client.view-components.record-editor.association.button.clear-all.label' | translate\n              }}\n            </button>\n          </div>\n        </div>\n\n        <div class=\"list-group\">\n          <rx-record-preview-card\n            *ngFor=\"let previewCardConfig of getPendingPreviewConfigurations()\"\n            [config]=\"previewCardConfig\"\n            class=\"list-group-item\"\n          ></rx-record-preview-card>\n        </div>\n\n        <button\n          *ngIf=\"totalPendingCount > currentPendingCount\"\n          (click)=\"showPendingAssociations()\"\n          adapt-button\n          size=\"small\"\n          btn-type=\"tertiary\"\n          type=\"button\"\n        >\n          {{ 'com.bmc.arsys.rx.client.common.show-more.label' | translate }}\n        </button>\n      </div>\n    </div>\n  </div>\n\n  <div *ngSwitchCase=\"'dropdown'\">\n    <div *ngIf=\"isEditModeEnabled()\" [attr.aria-label]=\"label\">\n      <rx-select-with-pagination\n        [formControl]=\"formControl\"\n        [readonly]=\"isDisabled\"\n        [label]=\"label\"\n        [modelToViewValueAdapter]=\"modelToViewValueAdapterFunc\"\n        [optionLoader]=\"optionLoaderFunc\"\n        [viewToModelValueAdapter]=\"viewToModelValueAdapterFunc\"\n      ></rx-select-with-pagination>\n    </div>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block}:host::ng-deep rx-runtime-view-canvas-item-container{display:flex}:host::ng-deep .rx-runtime-view-canvas-item-margin{margin-bottom:0}:host::ng-deep rx-runtime-view-canvas-item+rx-runtime-view-canvas-item{margin-left:5px}:host::ng-deep .read-state .form-control-label{font-weight:var(--font-weight-normal)}.rx-group-title{font-size:.8125rem;color:#959899;display:flex;align-items:center}.rx-preview-existing-head{margin-top:-30px}.rx-preview-count{font-size:.8125rem;color:#959899;vertical-align:middle}\n"], components: [{ type: i4.ReadOnlyFieldComponent, selector: "rx-read-only-field", inputs: ["label", "value"] }, { type: i5.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i6.RuntimeViewCanvasOutletComponent, selector: "rx-runtime-view-canvas-outlet", inputs: ["name"] }, { type: i7.RxRecordPreviewCardComponent, selector: "rx-record-preview-card", inputs: ["config"] }, { type: i5.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i8.RxSelectWithPaginationComponent, selector: "rx-select-with-pagination", inputs: ["label", "required", "isMultiSelectionMode", "optionLoader", "pageSize", "showDefaultTitle", "showUncheckAll", "readonly", "template", "viewToModelValueAdapter", "modelToViewValueAdapter", "optionFormatter"], outputs: ["toggleDropdown", "selectionChange"] }], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i9.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i9.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "translate": i10.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-association',
                    templateUrl: './association.component.html',
                    styleUrls: ['./association.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.DatePipe }, { type: i2.RxAssociationDefinitionService }, { type: i2.RxAssociationInstanceDataPageService }, { type: i3.RxRecordDefinitionInheritanceDataPageService }, { type: i3.RxRecordInstanceDataPageService }, { type: i3.RxRecordInstanceUtilsService }]; }, propDecorators: { selectWithPaginationComponent: [{
                type: ViewChild,
                args: [RxSelectWithPaginationComponent]
            }], isDisabled: [{
                type: HostBinding,
                args: ['class.rx-field-disabled']
            }] } });
//# sourceMappingURL=association.component.js.map