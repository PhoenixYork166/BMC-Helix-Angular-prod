import { Component, ElementRef, Input } from '@angular/core';
import { forkJoin, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { isEqual } from 'lodash';
import { RxProcessDefinitionCacheService, RxProcessInstanceService } from '@helix/platform/process/api';
import { RxRappidPaperService } from '@helix/platform/process/elements';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/process/api";
import * as i2 from "@helix/platform/process/elements";
export class RxProcessInstancePreviewComponent {
    constructor(element, rxProcessDefinitionCacheService, rxProcessInstanceService, rxRappidPaperService) {
        this.element = element;
        this.rxProcessDefinitionCacheService = rxProcessDefinitionCacheService;
        this.rxProcessInstanceService = rxProcessInstanceService;
        this.rxRappidPaperService = rxRappidPaperService;
        this.zoomToFit = false;
        this.processInstance = {};
        this.destroyed$ = new ReplaySubject(1);
        this.rxProcessDefinitionCacheService.registerConsumer(this.destroyed$);
    }
    ngOnInit() {
        const config$ = this.config.pipe(distinctUntilChanged(isEqual), filter((config) => config.processDefinitionName && config.processInstanceId), tap((config) => {
            this.onClick = config.onClick;
            this.processDefinitionName = config.processDefinitionName;
            this.processInstanceId = config.processInstanceId;
            this.zoomToFit = config.zoomToFit;
        }), switchMap((config) => {
            return forkJoin([
                this.rxProcessDefinitionCacheService.getProcessDefinition(config.processDefinitionName),
                this.rxProcessInstanceService.get(config.processDefinitionName, config.processInstanceId)
            ]).pipe(map(([processDefinition, processInstance]) => {
                this.processDefinition = processDefinition;
                this.processInstance = processInstance;
            }));
        }), shareReplay(1));
        config$
            .pipe(tap(() => this.initialize()), takeUntil(this.destroyed$))
            .subscribe();
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    initialize() {
        this.paperScroller = this.rxRappidPaperService.init(this.element.nativeElement);
        this.rxRappidPaperService.setGraph(this.paperScroller, this.processDefinition, this.processInstance, this.zoomToFit);
        if (this.onClick) {
            this.paperScroller.options.paper.on('blank:pointerdown', () => {
                this.onClick({
                    processDefinition: this.processDefinition,
                    processInstance: this.processInstance,
                    cellView: null
                });
            });
            this.paperScroller.options.paper.on('cell:pointerup', (cellView) => {
                this.onClick({
                    processDefinition: this.processDefinition,
                    processInstance: this.processInstance,
                    cellView: cellView
                });
            });
        }
    }
    zoomIn() {
        this.paperScroller.zoom(0.2, { max: 4 });
    }
    zoomOut() {
        this.paperScroller.zoom(-0.2, { min: 0.2 });
    }
}
RxProcessInstancePreviewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessInstancePreviewComponent, deps: [{ token: i0.ElementRef }, { token: i1.RxProcessDefinitionCacheService }, { token: i1.RxProcessInstanceService }, { token: i2.RxRappidPaperService }], target: i0.ɵɵFactoryTarget.Component });
RxProcessInstancePreviewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxProcessInstancePreviewComponent, selector: "rx-process-instance-preview", inputs: { config: "config" }, ngImport: i0, template: '', isInline: true, styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block;height:600px;width:100%}:host::ng-deep .joint-element{cursor:default}:host::ng-deep .joint-link{color:#f9f9fa}:host::ng-deep .joint-link:hover .marker-arrowheads,:host::ng-deep .joint-link:hover .tool-remove,:host::ng-deep .joint-link:hover .marker-vertices,:host::ng-deep .joint-link:hover .marker-arrowheads,:host::ng-deep .joint-link:hover .link-tools{opacity:0;cursor:default}:host::ng-deep .joint-link .connection-wrap:hover{opacity:0}:host::ng-deep .joint-link .connection-wrap{cursor:default}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessInstancePreviewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-process-instance-preview',
                    template: '',
                    styleUrls: ['./process-instance-preview.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.RxProcessDefinitionCacheService }, { type: i1.RxProcessInstanceService }, { type: i2.RxRappidPaperService }]; }, propDecorators: { config: [{
                type: Input
            }] } });
//# sourceMappingURL=process-instance-preview.component.js.map