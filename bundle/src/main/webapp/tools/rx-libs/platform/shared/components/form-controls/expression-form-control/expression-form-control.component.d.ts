import { EventEmitter, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { IFormControlComponent, RxDataDictionaryUtils, RxExpressionParserService } from '@helix/platform/shared/api';
import { RxObjectUtilsService, RxTreeService } from '@helix/platform/utils';
import { IExpressionFormControlOptions } from './expression-form-control.types';
import { ValueAccessor } from '../../form-builder/value-accessor';
import * as i0 from "@angular/core";
interface IExpressionNode {
    id: string;
    label?: string;
    expression: string;
    isInvalid?: boolean;
    tooltip?: string;
}
export declare class ExpressionFormControlComponent extends ValueAccessor<string> implements OnInit, OnDestroy, IFormControlComponent {
    private rxExpressionParserService;
    private rxObjectUtilsService;
    private rxDataDictionaryUtils;
    private rxTreeService;
    private changeDetectorRef;
    options: IExpressionFormControlOptions;
    isDisabled: boolean;
    propertyPath: string;
    get propertyLabel(): string;
    events: EventEmitter<any>;
    nodes: Array<IExpressionNode>;
    private valueSubject;
    private dataDictionaryExpressionMap;
    private expressionNodeMap;
    private destroyed$;
    private dataDictionary$;
    isTouched: boolean;
    constructor(rxExpressionParserService: RxExpressionParserService, rxObjectUtilsService: RxObjectUtilsService, rxDataDictionaryUtils: RxDataDictionaryUtils, rxTreeService: RxTreeService, changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    onWriteValue(value: string): void;
    openEditor(): void;
    ngOnDestroy(): void;
    private onDataDictionaryChange;
    private getExpressionNode;
    private updateNodes;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExpressionFormControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ExpressionFormControlComponent, "rx-expression-form-control", never, { "options": "options"; "isDisabled": "isDisabled"; "propertyPath": "propertyPath"; }, { "events": "events"; }, never, never>;
}
export {};
