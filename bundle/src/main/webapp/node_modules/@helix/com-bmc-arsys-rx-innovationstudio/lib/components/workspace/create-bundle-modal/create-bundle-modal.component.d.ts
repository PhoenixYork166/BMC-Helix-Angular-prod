import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { Tooltip } from '@helix/platform/shared/api';
import { ProgressIndicatorStatus } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { AxBundleDeploymentService } from '../../../services/bundle-deployment';
import * as i0 from "@angular/core";
export declare class CreateBundleModalComponent {
    context: ActiveModalRef;
    private translateService;
    private axBundleDeploymentService;
    bundleId: string;
    bundleCreationStatus: string;
    bundleCreationFinishedMessage: string;
    bundleName: string;
    bundleShortName: string;
    deploymentStatus: typeof ProgressIndicatorStatus;
    groupId: string;
    type: string;
    bundleNameTooltip: Tooltip;
    bundleShortNameTooltip: Tooltip;
    groupIdTooltip: Tooltip;
    constructor(context: ActiveModalRef, translateService: TranslateService, axBundleDeploymentService: AxBundleDeploymentService);
    create(): void;
    close(bundleId: string): void;
    dismiss(): void;
    setBundleId(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CreateBundleModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CreateBundleModalComponent, "ax-create-bundle-modal", never, {}, {}, never, never>;
}
