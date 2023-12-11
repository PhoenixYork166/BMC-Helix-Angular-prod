import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { RecordGridComponent } from '../../../../record-grid/runtime/record-grid.component';
import { RowSelectionMode } from '../../../../record-grid/runtime/types/row-selection-mode.enum';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "../../../../record-grid/runtime/record-grid.component";
export class ShareViewPresetUsersGridComponent {
    constructor(translateService) {
        this.translateService = translateService;
        this.users = [];
        this.remove = new EventEmitter();
        this.recordGridConfig$ = this.getRecordGridConfig();
    }
    ngOnChanges(changes) {
        if (changes.users.currentValue && !changes.users.firstChange) {
            this.recordGrid.api.refresh().subscribe();
        }
    }
    getRecordGridConfig() {
        const gridColumns = [
            {
                fieldId: 'fullName',
                title: this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.share-view-preset.grid.column.name.title')
            },
            {
                fieldId: 'emailAddress',
                title: this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.share-view-preset.grid.column.email.title')
            }
        ];
        const gridRecordDefinition = {
            fieldDefinitions: [
                {
                    id: 'fullName',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'emailAddress',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
        return of({
            columns: gridColumns,
            enableFiltering: false,
            enableRowSelection: RowSelectionMode.Multiple,
            recordIdField: 'loginId',
            styles: 'flex-fill',
            toolbarConfig: {
                filter: false,
                visibleColumnsMenu: false
            },
            useExternalFiltering: false,
            actionButtons: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.remove.label'),
                    style: 'tertiary',
                    iconCls: 'minus_circle_o',
                    disabled: () => this.recordGrid.api.getSelectedRows().length === 0,
                    actions: [
                        {
                            name: () => {
                                const selectedUserLoginIds = this.recordGrid.api.getSelectedRows().map((row) => row.loginId);
                                this.remove.emit(selectedUserLoginIds);
                            }
                        }
                    ]
                }
            ],
            getRecordDefinition: () => of(gridRecordDefinition),
            getData: () => of({
                data: this.users,
                totalSize: this.users.length
            })
        });
    }
}
ShareViewPresetUsersGridComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ShareViewPresetUsersGridComponent, deps: [{ token: i1.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
ShareViewPresetUsersGridComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ShareViewPresetUsersGridComponent, selector: "rx-share-view-preset-users-grid", inputs: { users: "users" }, outputs: { remove: "remove" }, viewQueries: [{ propertyName: "recordGrid", first: true, predicate: RecordGridComponent, descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<rx-record-grid [config]=\"recordGridConfig$\"></rx-record-grid>\n", components: [{ type: i2.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ShareViewPresetUsersGridComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-share-view-preset-users-grid',
                    templateUrl: './share-view-preset-users-grid.component.html',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }]; }, propDecorators: { recordGrid: [{
                type: ViewChild,
                args: [RecordGridComponent, { static: true }]
            }], users: [{
                type: Input
            }], remove: [{
                type: Output
            }] } });
//# sourceMappingURL=share-view-preset-users-grid.component.js.map