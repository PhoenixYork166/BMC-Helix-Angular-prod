import { ControlValueAccessor } from '@angular/forms';
export declare class ValueAccessor<T> implements ControlValueAccessor {
    protected innerValue: T;
    isDisabled: boolean;
    onTouched: () => void;
    protected onChange: (T: any) => void;
    get value(): T;
    set value(value: T);
    touch(): void;
    writeValue(value: T): void;
    registerOnChange(fn: (value: T) => void): void;
    registerOnTouched(fn: () => void): void;
    onWriteValue(value: any): void;
    setDisabledState(isDisabled: boolean): void;
    onSetValue(value: T): void;
}
