import { ValueAccessor } from '@helix/platform/shared/components';
import { IFormControlComponent, IFormFocusable } from '@helix/platform/shared/api';
import { IShellGlobalSearchRecord } from '../../shell-design.types';
import { RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class RxShellGlobalSearchRecordsControlComponent extends ValueAccessor<IShellGlobalSearchRecord[]> implements IFormControlComponent, IFormFocusable {
    private rxModalService;
    options: any;
    constructor(rxModalService: RxModalService);
    openModal(recordToEdit?: IShellGlobalSearchRecord): void;
    focus(): void;
    edit(record: IShellGlobalSearchRecord): void;
    remove(record: IShellGlobalSearchRecord): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxShellGlobalSearchRecordsControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxShellGlobalSearchRecordsControlComponent, "rx-shell-global-search-records-control", never, { "options": "options"; }, {}, never, never>;
}
