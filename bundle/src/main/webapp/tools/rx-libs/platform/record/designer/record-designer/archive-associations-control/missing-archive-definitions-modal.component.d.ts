import { Injector, OnInit } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RxModalClass } from '@helix/platform/ui-kit';
import { IMissingArchiveAssociation } from './archive-associations-control.types';
import * as i0 from "@angular/core";
export declare class MissingArchiveDefinitionsModalComponent extends RxModalClass implements OnInit {
    private activeModalRef;
    protected injector: Injector;
    missingAssociations: IMissingArchiveAssociation[];
    constructor(activeModalRef: ActiveModalRef, injector: Injector);
    ngOnInit(): void;
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MissingArchiveDefinitionsModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MissingArchiveDefinitionsModalComponent, "rx-missing-archive-definitions-modal-selector", never, {}, {}, never, never>;
}
