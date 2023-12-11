export class ValueAccessor {
    get value() {
        return this.innerValue;
    }
    set value(value) {
        if (this.innerValue !== value) {
            this.innerValue = value;
            this.onChange(value);
            this.onSetValue(value);
        }
    }
    touch() { }
    writeValue(value) {
        this.innerValue = value;
        this.onWriteValue(value);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    onWriteValue(value) { }
    setDisabledState(isDisabled) {
        this.isDisabled = isDisabled;
    }
    // helper that called when control sets value to model
    onSetValue(value) { }
}
//# sourceMappingURL=value-accessor.js.map