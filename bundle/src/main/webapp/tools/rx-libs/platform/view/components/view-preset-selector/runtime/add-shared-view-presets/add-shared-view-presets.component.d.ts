import { Injector, OnInit } from '@angular/core';
import { RxModalClass } from '@helix/platform/ui-kit';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { Observable } from 'rxjs';
import { IRecordGridConfig } from '../../../record-grid/runtime/types/record-grid-config.interface';
import { RecordGridComponent } from '../../../record-grid/runtime/record-grid.component';
import { TranslateService } from '@ngx-translate/core';
import { IAddSharedViewPresetsModalData } from './add-shared-view-presets.types';
import * as i0 from "@angular/core";
export declare class AddSharedViewPresetsComponent extends RxModalClass implements OnInit {
    private activeModalRef;
    protected injector: Injector;
    private translateService;
    recordGrid: RecordGridComponent;
    recordGridConfig$: Observable<IRecordGridConfig>;
    modalData: IAddSharedViewPresetsModalData;
    private presets;
    isAddButtonDisabled$: Observable<boolean>;
    constructor(activeModalRef: ActiveModalRef, injector: Injector, translateService: TranslateService);
    ngOnInit(): void;
    add(): void;
    cancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddSharedViewPresetsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AddSharedViewPresetsComponent, "rx-add-shared-view-presets", never, {}, {}, never, never>;
}
