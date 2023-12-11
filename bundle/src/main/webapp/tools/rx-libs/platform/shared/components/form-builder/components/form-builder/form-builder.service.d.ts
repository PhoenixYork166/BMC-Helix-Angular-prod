import { IFormBuilderEvent } from '@helix/platform/shared/api';
import { IFormBuilderEditor } from './form-builder-editor.interface';
import * as i0 from "@angular/core";
export declare class FormBuilderService {
    private editorEventSubject;
    private focusEditorSubject;
    editorEvent$: import("rxjs").Observable<IFormBuilderEvent>;
    focusEditor$: import("rxjs").Observable<IFormBuilderEditor>;
    setFocusEditor(focusEditor: IFormBuilderEditor): void;
    dispatch(builderEvent: IFormBuilderEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormBuilderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormBuilderService>;
}
