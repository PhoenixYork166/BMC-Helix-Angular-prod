import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
export class RecordEditorFormControl extends FormControl {
    constructor() {
        super(...arguments);
        this._touchedSubject = new BehaviorSubject(this.touched);
        this.touched$ = this._touchedSubject.asObservable().pipe(distinctUntilChanged());
    }
    markAsTouched(opts) {
        super.markAsTouched(opts);
        this._touchedSubject.next(this.touched);
    }
    markAsUntouched(opts) {
        super.markAsUntouched(opts);
        this._touchedSubject.next(this.touched);
    }
}
//# sourceMappingURL=record-editor-form-control.class.js.map