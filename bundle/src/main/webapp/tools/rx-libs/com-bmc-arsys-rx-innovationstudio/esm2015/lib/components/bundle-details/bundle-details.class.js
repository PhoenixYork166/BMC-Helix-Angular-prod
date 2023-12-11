import { RX_APPLICATION, RX_BUNDLE, RX_OVERLAY, RxBundleService, RxCurrentUserService, RxOverlayService } from '@helix/platform/shared/api';
export class BundleDetails {
    constructor(bundleDescriptor, injector) {
        this.bundleDescriptor = bundleDescriptor;
        this.injector = injector;
        const rxOverlayService = injector.get(RxOverlayService);
        const rxCurrentUserService = injector.get(RxCurrentUserService);
        const rxBundleService = injector.get(RxBundleService);
        this.friendlyName = bundleDescriptor.friendlyName;
        this.description = bundleDescriptor.description;
        this.version = bundleDescriptor.displayVersion || bundleDescriptor.version;
        this.developerId = bundleDescriptor.developerId;
        this.developerName = bundleDescriptor.developerName;
        this.id = bundleDescriptor.id;
        this.hasCustomEntryPoint = bundleDescriptor.hasCustomEntryPoint;
        this.containsJavaScript = bundleDescriptor.containsJavaScript;
        const overlayContext = rxOverlayService.getCurrentOverlayContext();
        this.isBundleFromCurrentOverlayGroup =
            overlayContext &&
                bundleDescriptor.overlayGroupId === overlayContext.overlayGroupId &&
                bundleDescriptor.customizationPerspective ===
                    RX_OVERLAY.bundleCustomizationOperationTypes.createdInThisOverlayGroup;
        this.type = bundleDescriptor.isApplication ? RX_BUNDLE.bundleTypes.application : RX_BUNDLE.bundleTypes.library;
        this.isFoundationBundle = bundleDescriptor.id === RX_APPLICATION.platformBundleIds.foundation;
        this.isActionMenuVisible =
            this.isFoundationBundle || this.isBundleFromCurrentOverlayGroup || !bundleDescriptor.platformBundle;
        this.isBusinessAnalyst = rxCurrentUserService.isBusinessAnalyst();
        this.isApplication = bundleDescriptor.isApplication;
    }
}
//# sourceMappingURL=bundle-details.class.js.map