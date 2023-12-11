import { Component, Injector } from '@angular/core';
import { InspectorWidgetBase } from '@helix/platform/shared/components';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { OpenViewActionModalSize, RX_AVAILABLE_ON_DEVICES_PROP_NAME } from '@helix/platform/view/api';
import { TranslateService } from '@ngx-translate/core';
import { noop, omit, pick } from 'lodash';
import { from } from 'rxjs';
import { map, shareReplay, switchMap, take } from 'rxjs/operators';
import { RecordGridRowActionEditorModalComponent } from './record-grid-row-action-editor-modal/record-grid-row-action-editor-modal.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/common";
export class RxRecordGridRowActionEditorWidgetComponent extends InspectorWidgetBase {
    constructor(injector, rxModalService, translateService) {
        super(injector);
        this.injector = injector;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rowActions$ = this.designerItemModel.rowActionButtonComponents$.pipe(map((rowActionButtons) => {
            return rowActionButtons.map((rowActionButtonComponent) => {
                const actions = rowActionButtonComponent.children.map((action) => omit(action, 'type', 'children'));
                return Object.assign(Object.assign({}, pick(rowActionButtonComponent.data, [
                    'recordDefinitionName',
                    'recordInstance',
                    'fieldId',
                    'icon',
                    'disabled',
                    'hidden',
                    'label',
                    RX_AVAILABLE_ON_DEVICES_PROP_NAME
                ])), { guid: rowActionButtonComponent.guid, actions });
            });
        }), shareReplay(1));
    }
    openEditor(rowActionIndex, activeActionIndex) {
        this.rowActions$
            .pipe(take(1), switchMap((rowActions) => from(this.rxModalService.openModal({
            content: RecordGridRowActionEditorModalComponent,
            title: this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid-row-actions.modal.title'),
            size: OpenViewActionModalSize.Large,
            testID: 'edit-row-actions',
            data: {
                expressionConfigurator: this.designerItemModel.expressionConfigurator,
                isReadOnly: this.isDisabled,
                rowActionIndex,
                rowActions,
                activeActionIndex
            }
        }))))
            .subscribe({
            next: (newRowActions) => this.designerItemModel.setRowActions(newRowActions),
            error: noop
        });
    }
    trackByForRowActions(index, rowAction) {
        return rowAction.label;
    }
    removeRowAction(index, rowActions) {
        this.rxModalService
            .confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid-row-actions.row-action-delete.warning', { name: rowActions[index].label })
        })
            .then((response) => {
            if (response) {
                rowActions.splice(index, 1);
                this.designerItemModel.setRowActions(rowActions);
            }
        });
    }
    focus(data) {
        this.openEditor(data.rowActionIndex, data.actionIndex);
    }
}
RxRecordGridRowActionEditorWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridRowActionEditorWidgetComponent, deps: [{ token: i0.Injector }, { token: i1.RxModalService }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RxRecordGridRowActionEditorWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxRecordGridRowActionEditorWidgetComponent, selector: "rx-record-grid-row-action-editor-widget", usesInheritance: true, ngImport: i0, template: "<adapt-button btn-type=\"tertiary\" rx-id=\"open-row-action-editor-modal-button\" class=\"p-0 pb-1\" (click)=\"openEditor()\">\n  <span class=\"d-icon-plus_circle\"></span>\n  Edit row actions\n</adapt-button>\n\n<div *ngIf=\"rowActions$ | async as rowActions\">\n  <span rx-id=\"no-row-actions\" *ngIf=\"rowActions.length === 0\" class=\"text-tertiary\"> No row actions added. </span>\n  <div\n    rx-id=\"row-actions-list\"\n    class=\"rx-selected-row-action\"\n    *ngFor=\"let rowAction of rowActions; let index = index; trackBy: trackByForRowActions\"\n  >\n    <div class=\"rx-selected-row-action__header-container\">\n      <span rx-id=\"row-action\" class=\"rx-selected-row-action__header-title\" [title]=\"rowAction.label\">\n        {{ rowAction.label }}\n      </span>\n\n      <button\n        type=\"button\"\n        class=\"rx-button-unstyled d-icon-left-pencil btn-link\"\n        rx-id=\"edit-button\"\n        (click)=\"openEditor(index)\"\n      ></button>\n      <button\n        type=\"button\"\n        class=\"rx-button-unstyled d-icon-cross btn-link\"\n        rx-id=\"remove-button\"\n        (click)=\"removeRowAction(index, rowActions)\"\n      ></button>\n    </div>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.rx-selected-row-action{margin-bottom:5px;border:1px solid #d6d7d8;border-radius:2px;padding:5px 10px;word-break:break-all;font-weight:var(--font-weight-bold)}.rx-selected-row-action__header-container{display:flex}.rx-selected-row-action__header-title{flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;font-size:14px}.d-icon-cross,.d-icon-left-pencil{cursor:pointer}.d-icon-cross:not(:hover),.d-icon-left-pencil:not(:hover){color:#313538}\n"], components: [{ type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "async": i4.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridRowActionEditorWidgetComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-grid-row-action-editor-widget',
                    templateUrl: './record-grid-row-action-editor-widget.component.html',
                    styleUrls: ['./record-grid-row-action-editor-widget.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.RxModalService }, { type: i2.TranslateService }]; } });
//# sourceMappingURL=record-grid-row-action-editor-widget.component.js.map