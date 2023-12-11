import { Directive, ElementRef, EventEmitter, Host, Input, NgZone, Output, Renderer2, TemplateRef } from '@angular/core';
import { AdaptTableComponent } from '@bmc-ux/adapt-table';
import { ResizeSensor } from 'css-element-queries';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-table";
export class GridCardLayoutDirective {
    constructor(adaptTable, ngZone, renderer) {
        this.adaptTable = adaptTable;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.changedCardLayout = new EventEmitter();
        this.hasCardLayout = false;
        this._hasViewInitialized = false;
    }
    set cardLayoutWidth(value) {
        this._cardLayoutWidth = value;
        if (this._hasViewInitialized) {
            const { offsetWidth } = this.renderer.selectRootElement(this.adaptTable.el.nativeElement, true);
            this.changeTableCardLayout(offsetWidth);
        }
    }
    get cardLayoutWidth() {
        return this._cardLayoutWidth;
    }
    ngAfterViewInit() {
        setTimeout(() => {
            const recordGrid = this.renderer.selectRootElement(this.recordGridElementRef.nativeElement, true);
            this.changeTableCardLayout(recordGrid.offsetWidth);
        });
        this.ngZone.runOutsideAngular(() => {
            this.resizeSensor = new ResizeSensor(this.recordGridElementRef.nativeElement, (size) => {
                this.ngZone.run(() => {
                    this.changeTableCardLayout(size.width);
                });
            });
        });
        this._hasViewInitialized = true;
    }
    changeTableCardLayout(gridWidth) {
        const hasCardLayout = gridWidth <= this.cardLayoutWidth;
        if (this.hasCardLayout === hasCardLayout || !gridWidth) {
            return;
        }
        this.hasCardLayout = hasCardLayout;
        const adaptTable = this.adaptTable;
        this.scrollToFirstVisibleRow();
        if (hasCardLayout) {
            this.renderer.addClass(adaptTable.el.nativeElement, 'rx-table-card-layout');
        }
        else {
            this.renderer.removeClass(adaptTable.el.nativeElement, 'rx-table-card-layout');
        }
        // fix for updating margin in header. Just primeng flaw
        adaptTable.tableService.onValueChange(adaptTable.value);
        this.changedCardLayout.emit({
            cardLayoutColumns: hasCardLayout ? this.getCardLayoutColumns() : null
        });
    }
    getCardLayoutColumns() {
        return [
            {
                field: 'fields',
                header: 'Fields',
                filterable: false,
                sortable: false,
                headerTitleTemplate: this.cardLayoutFieldsHeaderTemplate,
                width: '35%',
                dataCellClass: this.getDataCellClass.bind(this),
                cellTemplate: this.cardLayoutFieldsDataCellTemplate,
                testId: 'fields-column'
            },
            {
                field: 'fields',
                header: 'Values',
                filterable: false,
                sortable: false,
                headerTitleTemplate: this.cardLayoutValuesHeaderTemplate,
                width: '65%',
                dataCellClass: this.getDataCellClass.bind(this),
                cellTemplate: this.cardLayoutValuesDataCellTemplate,
                testId: 'values-column'
            }
        ];
    }
    getDataCellClass() {
        return `${this.recordGridGetDataCellClass()} rx-card-layout-data-cell`;
    }
    scrollToFirstVisibleRow() {
        const adaptTable = this.adaptTable;
        if (adaptTable.scrollable) {
            const scrollableBody = this.renderer
                .selectRootElement(adaptTable.el.nativeElement, true)
                .querySelector('.ui-table-scrollable-body');
            const scrollableBodyScrollTop = scrollableBody && scrollableBody.scrollTop;
            if (scrollableBodyScrollTop) {
                const firstVisibleRow = adaptTable.dataRows.find((dataRow) => {
                    const rowEl = dataRow.element.nativeElement;
                    return rowEl.offsetTop + rowEl.offsetHeight >= scrollableBodyScrollTop;
                });
                if (firstVisibleRow) {
                    let rowEl = firstVisibleRow.element.nativeElement;
                    const scrollRowProportion = (scrollableBodyScrollTop - rowEl.offsetTop) / rowEl.offsetHeight;
                    this.ngZone.onStable.pipe(take(1)).subscribe(() => {
                        rowEl = firstVisibleRow.element.nativeElement;
                        scrollableBody.scrollTop = rowEl.offsetTop + rowEl.offsetHeight * scrollRowProportion;
                    });
                }
            }
        }
    }
    ngOnDestroy() {
        this.resizeSensor.detach();
    }
}
GridCardLayoutDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GridCardLayoutDirective, deps: [{ token: i1.AdaptTableComponent, host: true }, { token: i0.NgZone }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
GridCardLayoutDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: GridCardLayoutDirective, selector: "[rxCardLayout]", inputs: { cardLayoutFieldsHeaderTemplate: "cardLayoutFieldsHeaderTemplate", cardLayoutValuesHeaderTemplate: "cardLayoutValuesHeaderTemplate", cardLayoutFieldsDataCellTemplate: "cardLayoutFieldsDataCellTemplate", cardLayoutValuesDataCellTemplate: "cardLayoutValuesDataCellTemplate", recordGridGetDataCellClass: ["cardLayoutGetDataCellClass", "recordGridGetDataCellClass"], recordGridElementRef: ["cardLayoutRecordGridElementRef", "recordGridElementRef"], cardLayoutWidth: "cardLayoutWidth" }, outputs: { changedCardLayout: "changedCardLayout" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GridCardLayoutDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[rxCardLayout]'
                }]
        }], ctorParameters: function () { return [{ type: i1.AdaptTableComponent, decorators: [{
                    type: Host
                }] }, { type: i0.NgZone }, { type: i0.Renderer2 }]; }, propDecorators: { cardLayoutFieldsHeaderTemplate: [{
                type: Input
            }], cardLayoutValuesHeaderTemplate: [{
                type: Input
            }], cardLayoutFieldsDataCellTemplate: [{
                type: Input
            }], cardLayoutValuesDataCellTemplate: [{
                type: Input
            }], recordGridGetDataCellClass: [{
                type: Input,
                args: ['cardLayoutGetDataCellClass']
            }], recordGridElementRef: [{
                type: Input,
                args: ['cardLayoutRecordGridElementRef']
            }], cardLayoutWidth: [{
                type: Input
            }], changedCardLayout: [{
                type: Output
            }] } });
//# sourceMappingURL=record-grid-card-layout.directive.js.map