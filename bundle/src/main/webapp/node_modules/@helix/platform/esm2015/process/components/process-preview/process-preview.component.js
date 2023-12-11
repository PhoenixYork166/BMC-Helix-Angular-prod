import { Component, ElementRef, Input } from '@angular/core';
import { isEqual } from 'lodash';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, filter, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { RX_PROCESS_DEFINITION, RxProcessDefinitionCacheService, RxProcessElementSearchService } from '@helix/platform/process/api';
import { RxProcessElementService, RxRappidPaperService } from '@helix/platform/process/elements';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/process/api";
import * as i2 from "@helix/platform/process/elements";
export class RxProcessPreviewComponent {
    constructor(element, rxProcessDefinitionCacheService, rxProcessElementService, rxProcessElementSearchService, rxRappidPaperService) {
        this.element = element;
        this.rxProcessDefinitionCacheService = rxProcessDefinitionCacheService;
        this.rxProcessElementService = rxProcessElementService;
        this.rxProcessElementSearchService = rxProcessElementSearchService;
        this.rxRappidPaperService = rxRappidPaperService;
        this.zoomToFit = false;
        this.destroyed$ = new ReplaySubject(1);
        this.rxProcessDefinitionCacheService.registerConsumer(this.destroyed$);
    }
    ngOnInit() {
        const config$ = this.config.pipe(distinctUntilChanged(isEqual), filter((config) => config.processDefinitionName), tap((config) => {
            this.onClick = config.onClick;
            this.processDefinitionName = config.processDefinitionName;
            this.zoomToFit = config.zoomToFit;
        }), switchMap((config) => {
            return this.rxProcessDefinitionCacheService.getProcessDefinition(config.processDefinitionName).pipe(tap((processDefinition) => {
                this.processDefinition = processDefinition;
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
        let graph;
        if (this.processDefinition.layout) {
            graph = this.rxProcessElementService.getGraph(this.processDefinition);
        }
        else {
            graph = this.getGraph(this.processDefinition);
        }
        this.paperScroller = this.rxRappidPaperService.init(this.element.nativeElement, graph, this.zoomToFit);
        if (this.onClick) {
            this.paperScroller.options.paper.on('blank:pointerdown', () => {
                this.onClick({
                    processDefinition: this.processDefinition,
                    cellView: null
                });
            });
            this.paperScroller.options.paper.on('cell:pointerup', (cellView) => {
                this.onClick({
                    processDefinition: this.processDefinition,
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
    getGraph(processDefinition) {
        const actionsLength = this.rxProcessElementSearchService.filter(processDefinition, (element) => {
            return (element.resourceType === RX_PROCESS_DEFINITION.processElementResourceTypes.processAction ||
                element.resourceType === RX_PROCESS_DEFINITION.processElementResourceTypes.userTask ||
                element.resourceType === RX_PROCESS_DEFINITION.processElementResourceTypes.receiveTask ||
                element.resourceType === RX_PROCESS_DEFINITION.processElementResourceTypes.callActivity);
        }).length;
        const start = new joint.shapes.bpmn.Event({
            size: {
                width: 50,
                height: 50
            },
            attrs: {
                '.label': {
                    fill: 'gray',
                    text: 'Start'
                }
            },
            eventType: 'start',
            position: {
                x: 50,
                y: 50
            }
        });
        const startCount = new joint.shapes.basic.Rect({
            size: {
                width: 30,
                height: 30
            },
            attrs: {
                text: {
                    text: processDefinition.inputParams.length || 0
                },
                g: {
                    'stroke-opacity': 0
                }
            },
            position: {
                x: 60,
                y: 60
            }
        });
        const actionLabel = new joint.shapes.basic.Rect({
            size: {
                width: 30,
                height: 30
            },
            attrs: {
                text: {
                    text: 'Actions',
                    fill: 'gray'
                },
                g: {
                    'stroke-opacity': 0
                }
            },
            position: {
                x: 235,
                y: 110
            }
        });
        const endCount = new joint.shapes.basic.Rect({
            size: {
                width: 30,
                height: 30
            },
            attrs: {
                text: {
                    text: '1'
                },
                g: {
                    'stroke-opacity': 0
                }
            },
            position: {
                x: 410,
                y: 60
            }
        });
        const end = new joint.shapes.bpmn.Event({
            size: {
                width: 50,
                height: 50
            },
            attrs: {
                '.label': {
                    fill: 'gray',
                    text: RX_PROCESS_DEFINITION.processElementDisplayNames.endEvent
                }
            },
            eventType: 'end',
            position: {
                x: 400,
                y: 50
            }
        });
        const action = new joint.shapes.basic.Rect({
            size: {
                width: 200,
                height: 50
            },
            attrs: {
                text: {
                    text: String(actionsLength)
                }
            },
            position: {
                x: 150,
                y: 50
            },
            eventType: 'start'
        });
        const startActionLink = new joint.shapes.bpmn.Flow({
            source: {
                x: 100,
                y: 75
            },
            target: {
                id: action.id
            }
        });
        const actionEndLink = new joint.shapes.bpmn.Flow({
            source: {
                id: action.id
            },
            target: {
                x: 400,
                y: 75
            }
        });
        const graph = new joint.dia.Graph();
        graph.addCells([start, end, action, startActionLink, actionEndLink, startCount, endCount, actionLabel]);
        return graph.toJSON();
    }
}
RxProcessPreviewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessPreviewComponent, deps: [{ token: i0.ElementRef }, { token: i1.RxProcessDefinitionCacheService }, { token: i2.RxProcessElementService }, { token: i1.RxProcessElementSearchService }, { token: i2.RxRappidPaperService }], target: i0.ɵɵFactoryTarget.Component });
RxProcessPreviewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxProcessPreviewComponent, selector: "rx-process-preview", inputs: { config: "config" }, ngImport: i0, template: '', isInline: true, styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block;height:600px;width:100%}:host::ng-deep .joint-element{cursor:default}:host::ng-deep .joint-link{color:#f9f9fa}:host::ng-deep .joint-link:hover .marker-arrowheads,:host::ng-deep .joint-link:hover .tool-remove,:host::ng-deep .joint-link:hover .marker-vertices,:host::ng-deep .joint-link:hover .marker-arrowheads,:host::ng-deep .joint-link:hover .link-tools{opacity:0;cursor:default}:host::ng-deep .joint-link .connection-wrap:hover{opacity:0}:host::ng-deep .joint-link .connection-wrap{cursor:default}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessPreviewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-process-preview',
                    template: '',
                    styleUrls: ['./process-preview.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.RxProcessDefinitionCacheService }, { type: i2.RxProcessElementService }, { type: i1.RxProcessElementSearchService }, { type: i2.RxRappidPaperService }]; }, propDecorators: { config: [{
                type: Input
            }] } });
//# sourceMappingURL=process-preview.component.js.map