import { ElementRef, Injector, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { RxIdService } from '@helix/platform/utils';
import { IFormWidgetComponent, IProcessActionElementModel, RxDesignerCacheService } from '@helix/platform/shared/api';
import { InspectorWidgetBase, RxExpressionEditorService } from '@helix/platform/shared/components';
import { ISelectedElementInspectorDesignerItemModel } from '@helix/platform/process/api';
import { IExpressionInputMapInspectorConfig, IExpressionInputMapInspectorWidgetOptions } from './expression-input-map-inspector-widget.types';
import * as i0 from "@angular/core";
export declare class RxExpressionInputMapInspectorWidgetComponent extends InspectorWidgetBase<IExpressionInputMapInspectorWidgetOptions, Observable<ISelectedElementInspectorDesignerItemModel<IProcessActionElementModel>>> implements OnInit, OnDestroy, OnChanges, IFormWidgetComponent {
    private renderer;
    private rxDesignerCacheService;
    private rxExpressionEditorService;
    private rxIdService;
    protected injector: Injector;
    expressionInputMapInspectorElementRef: ElementRef;
    config: IExpressionInputMapInspectorConfig[];
    elementModel$: Observable<IProcessActionElementModel>;
    graph$: Observable<any>;
    private destroyed$;
    constructor(renderer: Renderer2, rxDesignerCacheService: RxDesignerCacheService, rxExpressionEditorService: RxExpressionEditorService, rxIdService: RxIdService, injector: Injector);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    openExpressionEditor(section: IExpressionInputMapInspectorConfig, elementModel: IProcessActionElementModel, inspectorElementRef: ElementRef): void;
    private getExpressionProperties;
    private patchConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxExpressionInputMapInspectorWidgetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxExpressionInputMapInspectorWidgetComponent, "rx-expression-input-map-inspector-widget", never, {}, {}, never, never>;
}
