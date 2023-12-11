import { EventEmitter, OnInit } from '@angular/core';
import { RxSelectOption } from '@bmc-ux/adapt-angular';
import { IFormControlComponent } from '@helix/platform/shared/api';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { IOptionalExpressionControlOptions } from './optional-expression-control-options.interface';
import { IExpressionFormControlOptions } from '../expression-form-control';
import * as i0 from "@angular/core";
export declare class OptionalExpressionControlComponent extends ValueAccessor<string> implements IFormControlComponent, OnInit {
    options: IOptionalExpressionControlOptions;
    propertyPath: string;
    events: EventEmitter<any>;
    expressionFieldOptions: IExpressionFormControlOptions;
    checkbox: boolean;
    modelValues: {
        disable: string;
        enable: string;
    };
    selectValues: {
        all: string;
        condition: string;
    };
    selectOptions: RxSelectOption[];
    selectedCondition: RxSelectOption[];
    conditionValue: string;
    ngOnInit(): void;
    onWriteValue(modelValue: string): void;
    onSwitcherChange(modelValue: boolean): void;
    onSelectChange(selectedValue: RxSelectOption[]): void;
    onConditionChange(expressionValue: string): void;
    optionFormatter(option: RxSelectOption): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OptionalExpressionControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OptionalExpressionControlComponent, "rx-optional-expression-form-control", never, { "options": "options"; "propertyPath": "propertyPath"; }, { "events": "events"; }, never, never>;
}
