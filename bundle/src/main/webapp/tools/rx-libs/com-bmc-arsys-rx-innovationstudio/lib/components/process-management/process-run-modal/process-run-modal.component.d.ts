import { DockedPanelContext } from '@bmc-ux/adapt-angular';
import { IPlainObject } from '@helix/platform/shared/api';
import { ProcessManagementService } from '../process-management.service';
import * as i0 from "@angular/core";
export declare class ProcessRunModalComponent {
    context: DockedPanelContext;
    private manageProcessesService;
    inputParamsModel: IPlainObject;
    inputParamsControls: IPlainObject[];
    constructor(context: DockedPanelContext, manageProcessesService: ProcessManagementService);
    onModelChange(model: IPlainObject): void;
    startProcess(): void;
    isRunButtonDisabled(): boolean;
    private onBeforeStart;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProcessRunModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProcessRunModalComponent, "ax-process-run-modal", never, {}, {}, never, never>;
}
