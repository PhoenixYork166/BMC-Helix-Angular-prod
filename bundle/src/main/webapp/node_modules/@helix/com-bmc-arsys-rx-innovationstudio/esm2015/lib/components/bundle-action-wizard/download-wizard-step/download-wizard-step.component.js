import { Component } from '@angular/core';
import { switchMap, take } from 'rxjs/operators';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { AxBundleDeploymentService } from '../../../services/bundle-deployment/bundle-deployment.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/components";
import * as i2 from "../../../services/bundle-deployment/bundle-deployment.service";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@ngx-translate/core";
export class DownloadWizardStepComponent {
    constructor(rxWizardModalComponent, axBundleDeploymentService) {
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.axBundleDeploymentService = axBundleDeploymentService;
    }
    download() {
        this.rxWizardModalComponent.context$
            .pipe(take(1), switchMap((context) => this.axBundleDeploymentService.downloadContentPackage(context.deploymentPackageDescriptor.id, context.packageGuid)))
            .subscribe();
    }
}
/** @nocollapse */ DownloadWizardStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DownloadWizardStepComponent, deps: [{ token: i1.RxWizardModalComponent }, { token: i2.AxBundleDeploymentService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ DownloadWizardStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DownloadWizardStepComponent, selector: "ax-download-wizard-step", ngImport: i0, template: "<h5 class=\"mt-0\">{{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.download.title' | translate }}</h5>\n\n<button adapt-button type=\"button\" btn-type=\"primary\" (click)=\"download()\" rx-id=\"download-button\">\n  {{ 'com.bmc.arsys.rx.client.common.download.label' | translate }}\n</button>\n", components: [{ type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DownloadWizardStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-download-wizard-step',
                    templateUrl: 'download-wizard-step.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxWizardModalComponent }, { type: i2.AxBundleDeploymentService }]; } });
//# sourceMappingURL=download-wizard-step.component.js.map