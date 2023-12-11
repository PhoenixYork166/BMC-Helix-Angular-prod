import { ValueAccessor } from '../form-builder/value-accessor';
import { IPermissionEditorComponentOptions } from './interfaces/permission-editor-component-options.interface';
import { PermissionOwner } from './interfaces/permission.interfaces';
import { RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class RxPermissionEditorComponent extends ValueAccessor<PermissionOwner[]> {
    private rxModalService;
    private dialogApi;
    options: IPermissionEditorComponentOptions;
    constructor(rxModalService: RxModalService);
    openEditor(): void;
    isDirty(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxPermissionEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxPermissionEditorComponent, "rx-permission-editor", never, { "options": "options"; }, {}, never, never>;
}
