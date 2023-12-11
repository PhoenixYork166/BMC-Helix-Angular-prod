import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IExpressionConfiguratorProvider } from '@helix/platform/shared/api';
import { IExpressionInspectorControlOptions } from './expression-inspector-control-options.interface';
import { InspectorControlBase } from '../../inspector/inspector-control-base.class';
import { IExpressionFormControlOptions } from '../../form-controls/expression-form-control/expression-form-control.types';
import * as i0 from "@angular/core";
export declare class ExpressionInspectorControlComponent extends InspectorControlBase<string, IExpressionInspectorControlOptions, IExpressionConfiguratorProvider> implements OnInit, OnChanges {
    formControl: FormControl;
    expressionFormControlOptions: IExpressionFormControlOptions;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private patchOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExpressionInspectorControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ExpressionInspectorControlComponent, "rx-expression-inspector-form-control", never, {}, {}, never, never>;
}
