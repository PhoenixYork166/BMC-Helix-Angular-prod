import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IExpressionConfiguratorProvider } from '@helix/platform/shared/api';
import { InspectorControlBase } from '../../inspector/inspector-control-base.class';
import { IOptionalExpressionInspectorControlOptions } from './optional-expression-inspector-control-options.interface';
import { IOptionalExpressionControlOptions } from '../../form-controls';
import * as i0 from "@angular/core";
export declare class OptionalExpressionInspectorControlComponent extends InspectorControlBase<string, IOptionalExpressionInspectorControlOptions, IExpressionConfiguratorProvider> implements OnInit, OnChanges {
    formControl: FormControl;
    optionalExpressionFormControlOptions: IOptionalExpressionControlOptions;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private patchOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<OptionalExpressionInspectorControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OptionalExpressionInspectorControlComponent, "rx-optional-expression-inspector-control", never, {}, {}, never, never>;
}
