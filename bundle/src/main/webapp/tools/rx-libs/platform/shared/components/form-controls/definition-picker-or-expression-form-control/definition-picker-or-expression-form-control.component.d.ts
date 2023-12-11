import { EventEmitter, OnInit } from '@angular/core';
import { IFormControlComponent } from '@helix/platform/shared/api';
import { IDefinitionPickerComponentOptions } from '../../definition-picker';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { IExpressionFormControlOptions } from '../expression-form-control';
import { IDefinitionPickerOrExpressionFormControlOptions } from './definition-picker-or-expression-form-control.types';
import * as i0 from "@angular/core";
declare enum DefinitionPickerOrExpressionComponentMode {
    Definition = "Definition",
    Expression = "Expression"
}
export declare class DefinitionPickerOrExpressionFormControlComponent extends ValueAccessor<string> implements OnInit, IFormControlComponent {
    options: IDefinitionPickerOrExpressionFormControlOptions;
    propertyPath: string;
    events: EventEmitter<any>;
    definitionPickerOptions: IDefinitionPickerComponentOptions;
    expressionFormControlOptions: IExpressionFormControlOptions;
    componentMode: typeof DefinitionPickerOrExpressionComponentMode;
    activeMode: DefinitionPickerOrExpressionComponentMode;
    ngOnInit(): void;
    selectMode(mode: DefinitionPickerOrExpressionComponentMode): void;
    onModelValueChange(expressionValue: string): void;
    private isDynamicDefinitionName;
    static ɵfac: i0.ɵɵFactoryDeclaration<DefinitionPickerOrExpressionFormControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DefinitionPickerOrExpressionFormControlComponent, "rx-definition-picker-or-expression-form-control", never, { "options": "options"; "propertyPath": "propertyPath"; }, { "events": "events"; }, never, never>;
}
export {};
