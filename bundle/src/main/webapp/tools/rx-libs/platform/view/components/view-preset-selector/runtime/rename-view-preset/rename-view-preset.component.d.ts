import { Injector, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RxModalClass } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class RenameViewPresetComponent extends RxModalClass implements OnInit, OnDestroy {
    private activeModalRef;
    protected injector: Injector;
    modalData: any;
    viewPresetNameFormControl: FormControl;
    private destroyed$;
    constructor(activeModalRef: ActiveModalRef, injector: Injector);
    ngOnInit(): void;
    ngOnDestroy(): void;
    save(): void;
    cancel(): void;
    isViewPresetNameUnique(viewPresetName: string): boolean;
    private generateUniqueViewPresetName;
    static ɵfac: i0.ɵɵFactoryDeclaration<RenameViewPresetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RenameViewPresetComponent, "rx-rename-view-preset", never, {}, {}, never, never>;
}
