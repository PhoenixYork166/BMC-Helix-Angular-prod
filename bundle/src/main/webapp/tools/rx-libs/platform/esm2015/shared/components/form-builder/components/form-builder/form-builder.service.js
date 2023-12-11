import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class FormBuilderService {
    constructor() {
        this.editorEventSubject = new Subject();
        this.focusEditorSubject = new Subject();
        this.editorEvent$ = this.editorEventSubject.asObservable();
        this.focusEditor$ = this.focusEditorSubject.asObservable();
    }
    setFocusEditor(focusEditor) {
        this.focusEditorSubject.next(focusEditor);
    }
    dispatch(builderEvent) {
        this.editorEventSubject.next(builderEvent);
    }
}
FormBuilderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormBuilderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FormBuilderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormBuilderService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormBuilderService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=form-builder.service.js.map