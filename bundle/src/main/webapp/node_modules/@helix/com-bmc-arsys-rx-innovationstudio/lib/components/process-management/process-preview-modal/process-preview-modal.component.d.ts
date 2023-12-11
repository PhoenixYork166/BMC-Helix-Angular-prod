import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { Observable } from 'rxjs';
import { IProcessDesignerConfiguration, RxProcessPreviewComponent } from '@helix/platform/process/components';
import * as i0 from "@angular/core";
export declare class ProcessPreviewModalComponent {
    activeModalRef: ActiveModalRef;
    processDefinitionName: string;
    isRunButtonDisabled: boolean;
    processPreviewConfiguration$: Observable<IProcessDesignerConfiguration>;
    processPreview: RxProcessPreviewComponent;
    constructor(activeModalRef: ActiveModalRef);
    zoomIn(): void;
    zoomOut(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProcessPreviewModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProcessPreviewModalComponent, "ax-process-preview-modal", never, {}, {}, never, never>;
}
