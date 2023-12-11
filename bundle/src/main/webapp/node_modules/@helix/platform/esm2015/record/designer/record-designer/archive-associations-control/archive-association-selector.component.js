import { ChangeDetectionStrategy, Component, Injector, TemplateRef, ViewChild } from '@angular/core';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { RxModalClass } from '@helix/platform/ui-kit';
import { RX_ASSOCIATION_DEFINITION } from '@helix/platform/association/api';
import { AssociationSelectionType } from '@helix/platform/record/api';
import { includes, map } from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@bmc-ux/adapt-table";
import * as i4 from "@angular/forms";
import * as i5 from "@angular/common";
import * as i6 from "@helix/platform/shared/api";
export class ArchiveAssociationSelectorComponent extends RxModalClass {
    constructor(activeModalRef, translateService, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.translateService = translateService;
        this.injector = injector;
        this.isOverlayMode = this.activeModalRef.getData().isOverlayMode;
        this.isReadOnly = this.activeModalRef.getData().isReadOnly;
        this.actualAssociationsToFollow = this.activeModalRef.getData().actualAssociationsToFollow;
        this.selectedAssociationsToFollow = this.activeModalRef.getData().selectedAssociationsToFollow;
        this.associationType = this.selectedAssociationsToFollow.selectionType;
        this.associationTypes = {
            followParent: AssociationSelectionType.FollowParent,
            selected: AssociationSelectionType.Selected,
            allEnforced: AssociationSelectionType.AllEnforced,
            all: AssociationSelectionType.All
        };
        this.columns = [];
        this.associationGridRows = this.activeModalRef.getData().associationDefinitions.map((association) => ({
            name: association.name,
            firstRecord: association.nodeAId,
            secondRecord: association.nodeBId,
            enforced: association.nodeAModality === RX_ASSOCIATION_DEFINITION.modality.required,
            isSelectionDisabled: this.isReadOnly,
            isAssociationSelectedInBase: this.isOverlayMode && this.actualAssociationsToFollow.specificAssociationNames.includes(association.name)
        }));
        this.selectedAssociationGridRows = [];
    }
    ngOnInit() {
        super.ngOnInit();
        this.columns = [
            {
                field: 'name',
                header: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                cellTemplate: this.nameCellTemplate
            },
            {
                field: 'firstRecord',
                header: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.association-first-record.label'),
                cellTemplate: this.nameCellTemplate
            },
            {
                field: 'secondRecord',
                header: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.association-second-record.label'),
                cellTemplate: this.nameCellTemplate
            },
            {
                field: 'enforced',
                header: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.enforced-association.label'),
                cellTemplate: this.enforceCellTemplate
            }
        ];
        this.selectAssociations();
        this.selectedAssociationGridRows = this.selectedAssociationGridRows.concat(this.associationGridRows.filter((associationGridRow) => includes(this.selectedAssociationsToFollow.specificAssociationNames, associationGridRow.name)));
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    onSelectionChange(selectedRows) {
        this.markAsDirty();
        this.selectedAssociationGridRows = selectedRows;
    }
    disabledRowSelectionResolver(rowData) {
        return rowData.isSelectionDisabled || rowData.isAssociationSelectedInBase;
    }
    selectAssociations() {
        this.selectedAssociationGridRows = [];
        if (this.associationType === AssociationSelectionType.Selected) {
            this.enableRowSelection();
        }
        else if (this.associationType === AssociationSelectionType.All) {
            this.selectedAssociationGridRows = [...this.associationGridRows];
            this.disableRowSelection();
        }
        else if (this.associationType === AssociationSelectionType.AllEnforced) {
            this.selectedAssociationGridRows = this.associationGridRows.filter((row) => row.enforced);
            this.disableRowSelectionForEnforcedAssociations();
        }
        else if (this.associationType === AssociationSelectionType.FollowParent) {
            this.disableRowSelection();
        }
        if (this.isOverlayMode &&
            (this.actualAssociationsToFollow.selectionType === AssociationSelectionType.AllEnforced ||
                this.actualAssociationsToFollow.selectionType === AssociationSelectionType.Selected)) {
            this.selectAssociationsFromBase();
        }
    }
    selectAssociationsFromBase() {
        this.selectedAssociationGridRows = this.selectedAssociationGridRows.concat(this.associationGridRows.filter((associationGridRow) => includes(this.actualAssociationsToFollow.specificAssociationNames, associationGridRow.name)));
    }
    disableRowSelectionForEnforcedAssociations() {
        this.associationGridRows.forEach((row) => {
            row.isSelectionDisabled = this.isReadOnly || row.enforced;
        });
    }
    disableRowSelection() {
        this.associationGridRows.forEach((row) => {
            row.isSelectionDisabled = true;
        });
    }
    enableRowSelection() {
        this.associationGridRows.forEach((row) => {
            row.isSelectionDisabled = this.isReadOnly;
        });
    }
    save() {
        let selectedAssociationNames = [];
        if (this.associationType === AssociationSelectionType.Selected) {
            selectedAssociationNames = map(this.selectedAssociationGridRows, 'name');
        }
        else if (this.associationType === AssociationSelectionType.AllEnforced) {
            selectedAssociationNames = this.selectedAssociationGridRows
                .filter((associationGridRow) => !associationGridRow.enforced)
                .map((associationGridRow) => associationGridRow.name);
        }
        this.activeModalRef.close({
            specificAssociationNames: selectedAssociationNames,
            selectionType: this.associationType
        });
    }
}
ArchiveAssociationSelectorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ArchiveAssociationSelectorComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.TranslateService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ArchiveAssociationSelectorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ArchiveAssociationSelectorComponent, selector: "rx-archive-associations-editor", viewQueries: [{ propertyName: "nameCellTemplate", first: true, predicate: ["nameCellTemplate"], descendants: true, static: true }, { propertyName: "enforceCellTemplate", first: true, predicate: ["enforceCellTemplate"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"modal-body designer-modal-body d-flex mh-100 flex-column\">\n  <span>\n    {{\n      'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.select-associations-to-follow.message'\n        | translate\n    }}\n  </span>\n\n  <adapt-rx-radiobutton-group [(ngModel)]=\"associationType\" (ngModelChange)=\"markAsDirty(); selectAssociations()\">\n    <adapt-rx-radiobutton\n      class=\"radio-inline\"\n      label=\"{{\n        'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.selected-associations.label'\n          | translate\n      }}\"\n      [value]=\"associationTypes.selected\"\n      [disabled]=\"\n        isReadOnly ||\n        (isOverlayMode &&\n          (actualAssociationsToFollow.selectionType === associationTypes.all ||\n            actualAssociationsToFollow.selectionType === associationTypes.allEnforced ||\n            actualAssociationsToFollow.selectionType === associationTypes.followParent))\n      \"\n      rx-id=\"selected-associations\"\n    ></adapt-rx-radiobutton>\n\n    <adapt-rx-radiobutton\n      class=\"radio-inline\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.all.label' | translate }}\"\n      [value]=\"associationTypes.all\"\n      [disabled]=\"\n        isReadOnly ||\n        (isOverlayMode &&\n          (actualAssociationsToFollow.selectionType === associationTypes.all ||\n            actualAssociationsToFollow.selectionType === associationTypes.followParent))\n      \"\n      rx-id=\"all-associations\"\n    ></adapt-rx-radiobutton>\n\n    <adapt-rx-radiobutton\n      class=\"radio-inline\"\n      label=\"{{\n        'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.all-enforced-associations.label'\n          | translate\n      }}\"\n      [value]=\"associationTypes.allEnforced\"\n      [disabled]=\"\n        isReadOnly ||\n        (isOverlayMode &&\n          (actualAssociationsToFollow.selectionType === associationTypes.all ||\n            actualAssociationsToFollow.selectionType === associationTypes.followParent))\n      \"\n      rx-id=\"all-enforced-associations\"\n    ></adapt-rx-radiobutton>\n\n    <adapt-rx-radiobutton\n      class=\"radio-inline\"\n      label=\"{{\n        'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.follow-parent-associations.label'\n          | translate\n      }}\"\n      [value]=\"associationTypes.followParent\"\n      [disabled]=\"\n        isReadOnly ||\n        (isOverlayMode &&\n          (actualAssociationsToFollow.selectionType === associationTypes.selected ||\n            actualAssociationsToFollow.selectionType === associationTypes.all ||\n            actualAssociationsToFollow.selectionType === associationTypes.allEnforced ||\n            actualAssociationsToFollow.selectionType === associationTypes.followParent))\n      \"\n      rx-id=\"follow-parent-association\"\n    ></adapt-rx-radiobutton>\n  </adapt-rx-radiobutton-group>\n\n  <adapt-table\n    [value]=\"associationGridRows\"\n    [selection]=\"selectedAssociationGridRows\"\n    [columns]=\"columns\"\n    [scrollable]=\"true\"\n    scrollHeight=\"flex\"\n    [sortable]=\"true\"\n    [resizableColumns]=\"false\"\n    [bordered]=\"true\"\n    [filterable]=\"false\"\n    [dataKey]=\"'name'\"\n    [disableRowSelection]=\"false\"\n    [selectionMode]=\"'multiple'\"\n    (selectionChange)=\"onSelectionChange($event)\"\n    [disabledRowSelectionResolver]=\"disabledRowSelectionResolver\"\n  >\n  </adapt-table>\n</div>\n\n<div class=\"modal-footer\">\n  <button type=\"button\" adapt-button btn-type=\"primary\" (click)=\"save()\" rx-id=\"save-button\" [disabled]=\"!isDirty()\">\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button type=\"button\" adapt-button btn-type=\"secondary\" (click)=\"cancel()\" rx-id=\"cancel-button\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n\n<ng-template #nameCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  {{ dataItem[column.field] | rxDefinitionNamePipe }}\n</ng-template>\n\n<ng-template #enforceCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <span *ngIf=\"dataItem[column.field]\">{{ 'com.bmc.arsys.rx.client.common.yes.label' | translate }}</span>\n  <span *ngIf=\"!dataItem[column.field]\">{{ 'com.bmc.arsys.rx.client.common.no.label' | translate }}</span>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}\n"], components: [{ type: i1.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i1.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }, { type: i3.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i2.TranslatePipe, "rxDefinitionNamePipe": i6.RxDefinitionNamePipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ArchiveAssociationSelectorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-archive-associations-editor',
                    templateUrl: './archive-association-selector.component.html',
                    styleUrls: ['./archive-association-selector.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.TranslateService }, { type: i0.Injector }]; }, propDecorators: { nameCellTemplate: [{
                type: ViewChild,
                args: ['nameCellTemplate', { static: true }]
            }], enforceCellTemplate: [{
                type: ViewChild,
                args: ['enforceCellTemplate', { static: true }]
            }] } });
//# sourceMappingURL=archive-association-selector.component.js.map