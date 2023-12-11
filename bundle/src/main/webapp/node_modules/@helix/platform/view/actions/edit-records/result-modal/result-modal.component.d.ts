import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { IEditRecordsActionResults } from '../interfaces/edit-records-action-results.interface';
import * as i0 from "@angular/core";
export declare class ResultModalComponent {
    activeModelRef: ActiveModalRef;
    data: any;
    constructor(activeModelRef: ActiveModalRef);
    close(): void;
    hasActionResultDetails(data: IEditRecordsActionResults): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ResultModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ResultModalComponent, "rx-edit-records-result-modal", never, {}, {}, never, never>;
}
