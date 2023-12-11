import { Injector, OnDestroy, OnInit } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { IPlainObject } from '@helix/platform/shared/api';
import { RxModalClass } from '@helix/platform/ui-kit';
import { Observable } from 'rxjs';
import { IWizardApi, IWizardConfig } from './wizard.types';
import * as i0 from "@angular/core";
export declare class RxWizardModalComponent extends RxModalClass implements OnInit, OnDestroy {
    activeModalRef: ActiveModalRef;
    protected injector: Injector;
    constructor(activeModalRef: ActiveModalRef, injector: Injector);
    adaptTabset: any;
    activeTabIndex: number;
    config: IWizardConfig<any>;
    isWizardCompleted: boolean;
    private nextSubject;
    next$: Observable<string>;
    api: IWizardApi;
    private contextSubject$;
    private stepsSubject$;
    private tabIndexSubject$;
    private isWizardDirty;
    context$: Observable<IPlainObject>;
    steps$: Observable<IPlainObject>;
    tabIndex$: Observable<number>;
    isDirty(): boolean;
    ngOnInit(): void;
    tabChanged({ index }: {
        index: any;
    }): void;
    back(): void;
    next(force?: boolean): void;
    finish(): void;
    close(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxWizardModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxWizardModalComponent, "rx-wizard-modal", never, {}, {}, never, never>;
}
