import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { AxBundleDeploymentService } from '../../../services/bundle-deployment/bundle-deployment.service';
import * as i0 from "@angular/core";
export declare class DownloadWizardStepComponent {
    private rxWizardModalComponent;
    private axBundleDeploymentService;
    constructor(rxWizardModalComponent: RxWizardModalComponent, axBundleDeploymentService: AxBundleDeploymentService);
    download(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DownloadWizardStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DownloadWizardStepComponent, "ax-download-wizard-step", never, {}, {}, never, never>;
}
