import { Injector, OnInit } from '@angular/core';
import { ActiveModalRef, DockedPanelContext } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export declare class RxModalClass implements OnInit {
    protected context: DockedPanelContext | ActiveModalRef;
    protected injector: Injector;
    private rxUtilityModalsService;
    private _isDirty;
    protected dialogApi: {
        dismissDialog: any;
        isDirty: any;
    };
    constructor(context: DockedPanelContext | ActiveModalRef, injector: Injector);
    get allowDismiss(): boolean;
    set allowDismiss(value: boolean);
    markAsDirty(): void;
    isDirty(): boolean;
    ngOnInit(): void;
    dismissDialog(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxModalClass, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxModalClass>;
}
