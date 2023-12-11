import { RxViewActionRegistryService } from '@helix/platform/view/api';
import { RxEditRecordsViewActionService } from './services/edit-records-view-action.service';
import * as i0 from "@angular/core";
import * as i1 from "./result-modal/result-modal.component";
import * as i2 from "@angular/common";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@angular/forms";
export declare class EditRecordsViewActionModule {
    private rxViewActionRegistryService;
    private rxEditRecordsActionService;
    constructor(rxViewActionRegistryService: RxViewActionRegistryService, rxEditRecordsActionService: RxEditRecordsViewActionService);
    static ɵfac: i0.ɵɵFactoryDeclaration<EditRecordsViewActionModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<EditRecordsViewActionModule, [typeof i1.ResultModalComponent], [typeof i2.CommonModule, typeof i3.AdaptIconModule, typeof i4.TranslateModule, typeof i5.FormsModule, typeof i3.AdaptRxTextareaModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<EditRecordsViewActionModule>;
}
