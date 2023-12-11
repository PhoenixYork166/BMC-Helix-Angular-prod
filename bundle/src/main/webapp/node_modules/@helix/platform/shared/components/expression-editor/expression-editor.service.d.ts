import { Observable } from 'rxjs';
import { IExpressionEditorConfig, IExpressionEditorPropertyChange } from './expression-editor.interfaces';
import { TranslateService } from '@ngx-translate/core';
import { IDialogApi, RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class RxExpressionEditorService {
    private translateService;
    private rxModalService;
    constructor(translateService: TranslateService, rxModalService: RxModalService);
    openEditor(config: IExpressionEditorConfig, onDialogApiReady?: (dialogApi: IDialogApi) => void): Observable<IExpressionEditorPropertyChange>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxExpressionEditorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxExpressionEditorService>;
}
