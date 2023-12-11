import { FormControl } from '@angular/forms';
export declare class RecordEditorFormControl extends FormControl {
    private _touchedSubject;
    readonly touched$: import("rxjs").Observable<boolean>;
    markAsTouched(opts?: {
        onlySelf?: boolean;
    }): void;
    markAsUntouched(opts?: {
        onlySelf?: boolean;
    }): void;
}
