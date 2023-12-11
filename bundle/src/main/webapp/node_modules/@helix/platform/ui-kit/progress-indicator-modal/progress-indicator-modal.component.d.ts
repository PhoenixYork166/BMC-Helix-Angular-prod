import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { IProgressIndicatorModalConfiguration } from './progress-indicator-modal.interface';
import { ProgressIndicatorStatus } from './progress-indicator-status.enum';
import * as i0 from "@angular/core";
export declare class ProgressIndicatorModalComponent {
    context: ActiveModalRef;
    config: IProgressIndicatorModalConfiguration;
    deploymentStatus: typeof ProgressIndicatorStatus;
    constructor(context: ActiveModalRef);
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProgressIndicatorModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProgressIndicatorModalComponent, "rx-progress-indicator-modal", never, {}, {}, never, never>;
}
