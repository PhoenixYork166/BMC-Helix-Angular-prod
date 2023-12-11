import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { RxCommandManagerService } from '@helix/platform/shared/api';
import { RX_DESIGNER_CANVAS } from './designer-canvas.constant';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
import * as i4 from "@ngx-translate/core";
export class RxDesignerCanvasComponent {
    constructor(elementRef, rxCommandManagerService) {
        this.elementRef = elementRef;
        this.rxCommandManagerService = rxCommandManagerService;
        this.elementSelected = new EventEmitter();
    }
    ngOnInit() {
        this.commandManager = new joint.dia.CommandManager({
            graph: this.graph,
            cmdBeforeAdd: (cmdName, cell, graph, options) => {
                return this.commandManager.enabled && !(options === null || options === void 0 ? void 0 : options.ignoreCommandManager);
            }
        });
        this.rxCommandManagerService.set(this.commandManager);
        this.paper = new joint.dia.Paper({
            defaultLink: new joint.shapes.bpmn.Flow(),
            embeddingMode: true,
            gridSize: 5,
            height: RX_DESIGNER_CANVAS.paperOptions.height,
            interactive: this.configuration.interactive,
            model: this.graph,
            width: RX_DESIGNER_CANVAS.paperOptions.width,
            restrictTranslate: function (elementView) {
                // TODO-VS: implement restrictTranslate logic
                return false;
            },
            validateEmbedding: function (childView, parentView) {
                // TODO-VS: implement validateEmbedding logic
                return true;
            }
        });
        this.paper.drawBackground({
            color: RX_DESIGNER_CANVAS.paperOptions.backgroundColor,
            image: RX_DESIGNER_CANVAS.paperOptions.backgroundImage,
            repeat: 'repeat',
            position: {
                x: -1,
                y: -1
            }
        });
        this.paperScroller = new joint.ui.PaperScroller({
            autoResizePaper: true,
            cursor: 'grab',
            padding: 32,
            paper: this.paper
        });
        this.paper.on('blank:pointerdown', (evt) => {
            this.paperScroller.startPanning(evt);
            this.elementSelected.emit(null);
        });
        this.paper.on('cell:pointerup', (cellView, evt) => {
            if (cellView) {
                this.elementSelected.emit(cellView.model.prop('elementModel/guid'));
            }
        });
        if (this.configuration.interactive) {
            this.commandManager.enable = () => {
                this.commandManager.enabled = true;
            };
            this.commandManager.disable = () => {
                this.commandManager.enabled = false;
            };
            this.commandManager.enable();
            this.paper.on('cell:expand:begin cell:collapse:begin', () => {
                this.commandManager.disable();
            });
            this.paper.on('cell:expand:done cell:collapse:done', (cellView) => {
                if (!cellView.model.get('inCallActivity')) {
                    this.commandManager.enable();
                }
            });
        }
        this.paperScroller.render();
    }
    ngAfterViewInit() {
        this.elementRef.nativeElement.appendChild(this.paperScroller.el);
        this.paperScroller.center();
    }
    ngOnChanges(changes) {
        var _a;
        if ((_a = changes.droppedElement) === null || _a === void 0 ? void 0 : _a.currentValue) {
            this.addElementToCanvas(changes.droppedElement.currentValue);
        }
    }
    hasRedo() {
        return this.commandManager.hasRedo();
    }
    hasUndo() {
        return this.commandManager.hasUndo();
    }
    onClearCanvas() {
        // TODO-VS: add clear logic
    }
    onCopy() {
        // TODO-VS: add copy logic
    }
    onCut() {
        // TODO-VS: add cut logic
    }
    onExportToPng() {
        // TODO-VS: add export logic
    }
    onPaste() {
        // TODO-VS: add paste logic
    }
    onPrint() {
        // TODO-VS: add print logic
    }
    onRedo() {
        this.commandManager.redo();
    }
    onUndo() {
        this.commandManager.undo();
    }
    onZoomIn() {
        // TODO-VS: add zoom in logic
    }
    onZoomOut() {
        // TODO-VS: add zoom out logic
    }
    // TODO-VS: update types
    addElementToCanvas(dropData) {
        const paperDropArea = this.getCanvasDropArea(this.paper.$el);
        const localPoint = this.paper.clientToLocalPoint({ x: dropData.dropPoint.x, y: dropData.dropPoint.y });
        if (this.canDrop(paperDropArea, localPoint)) {
            const elementService = this.configuration.elementRegistry.get(dropData.item.data.value.type).elementService;
            const droppedElementShape = elementService.getShape(Object.assign({ position: localPoint }, dropData.item.data.value));
            this.graph.addCell(droppedElementShape);
            setTimeout(() => {
                this.elementSelected.emit(droppedElementShape.prop('elementModel/guid'));
            });
        }
    }
    // TODO-VS: update types
    canDrop(paperDropArea, localPoint) {
        return (localPoint.x > paperDropArea.x.start &&
            localPoint.x < paperDropArea.x.end &&
            localPoint.y > paperDropArea.y.start &&
            localPoint.y < paperDropArea.y.end);
    }
    // TODO-VS: update types
    getCanvasDropArea(el) {
        const offset = el.offset();
        const innerWidth = el.innerWidth();
        const innerHeight = el.innerHeight();
        return {
            x: {
                start: offset.left,
                end: offset.left + innerWidth
            },
            y: {
                start: offset.top,
                end: offset.top + innerHeight
            }
        };
    }
}
RxDesignerCanvasComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerCanvasComponent, deps: [{ token: i0.ElementRef }, { token: i1.RxCommandManagerService }], target: i0.ɵɵFactoryTarget.Component });
RxDesignerCanvasComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxDesignerCanvasComponent, selector: "rx-designer-canvas", inputs: { configuration: "configuration", graph: "graph", droppedElement: "droppedElement" }, outputs: { elementSelected: "elementSelected" }, usesOnChanges: true, ngImport: i0, template: "<div *ngIf=\"configuration.showToolbar\" class=\"rx-designer-toolbar\">\n  <!-- TODO-VS: Add custom actions -->\n\n  <button\n    *ngIf=\"configuration.interactive\"\n    class=\"d-icon-undo\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.undo.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"undo-button\"\n    [disabled]=\"!hasUndo()\"\n    (click)=\"onUndo()\"\n  ></button>\n\n  <button\n    *ngIf=\"configuration.interactive\"\n    class=\"d-icon-redo\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.redo.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"redo-button\"\n    [disabled]=\"!hasRedo()\"\n    (click)=\"onRedo()\"\n  ></button>\n\n  <button\n    *ngIf=\"!configuration.isReadOnly && configuration.enableMultiSelection\"\n    class=\"d-icon-scissors\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.cut.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"cut-button\"\n    (click)=\"onCut()\"\n  ></button>\n\n  <button\n    *ngIf=\"!configuration.isReadOnly && configuration.enableMultiSelection\"\n    class=\"d-icon-files_copy_o\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.copy.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"copy-button\"\n    (click)=\"onCopy()\"\n  ></button>\n\n  <button\n    *ngIf=\"!configuration.isReadOnly && configuration.enableMultiSelection\"\n    class=\"d-icon-files_text\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.paste.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"paste-button\"\n    (click)=\"onPaste()\"\n  ></button>\n\n  <button\n    class=\"d-icon-search_plus\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.zoom-in.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"zoom-in-button\"\n    (click)=\"onZoomIn()\"\n  ></button>\n\n  <button\n    class=\"d-icon-search_minus\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.zoom-out.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"zoom-out-button\"\n    (click)=\"onZoomOut()\"\n  ></button>\n\n  <button\n    class=\"d-icon-printer\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.print.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"print-button\"\n    (click)=\"onPrint()\"\n  ></button>\n\n  <button\n    *ngIf=\"configuration.interactive\"\n    class=\"d-icon-cross_square\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.clear-canvas.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"clear-canvas-button\"\n    (click)=\"onClearCanvas()\"\n  ></button>\n\n  <button\n    class=\"d-icon-file_arrow_png_o\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.export-to-png.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"export-to-png-button\"\n    (click)=\"onExportToPng()\"\n  ></button>\n\n  <!-- TODO-VS: Add grid size slider, snaplines checkbox and custom actions -->\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host ::ng-deep .joint-paper-scroller{height:calc(100% - 55px);background-color:#f0f1f1}:host ::ng-deep .joint-paper-scroller .joint-paper .connection{stroke:#959899}:host ::ng-deep .joint-paper-scroller .joint-paper .marker-target,:host ::ng-deep .joint-paper-scroller .joint-paper .marker-source{fill:#959899;stroke:#959899}:host ::ng-deep .joint-paper-scroller .joint-paper .joint-element .fobj div{font-size:12px}:host ::ng-deep .joint-paper-scroller .joint-paper g .label{font-size:12px;font-weight:inherit}.rx-designer-toolbar{display:flex;height:55px;border-bottom:1px solid #d6d7d8;padding-left:300px}\n"], components: [{ type: i2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.AdaptTooltipDirective, selector: "[adaptTooltip]", inputs: ["popupDelay", "placement", "width", "minWidth", "useWidthFitting", "adaptRadarDisableEventSending", "adaptTooltip", "manual"], outputs: ["shown", "hidden"], exportAs: ["tooltip"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerCanvasComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-designer-canvas',
                    templateUrl: './designer-canvas.component.html',
                    styleUrls: ['./designer-canvas.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.RxCommandManagerService }]; }, propDecorators: { configuration: [{
                type: Input
            }], graph: [{
                type: Input
            }], droppedElement: [{
                type: Input
            }], elementSelected: [{
                type: Output
            }] } });
//# sourceMappingURL=designer-canvas.component.js.map