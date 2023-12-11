import { ActivatedRoute, Router } from '@angular/router';
import { ActiveTabChangeEvent } from '@bmc-ux/adapt-angular';
import { IBundleDescriptor, RxBundleCacheService, RxGlobalCacheService, RxOverlayService, RxPageTitleService } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
import { BundleDefinitionTab } from '../bundle-details/bundle-details.types';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class BundleDefinitionsComponent {
    private activatedRoute;
    private rxBundleCacheService;
    private rxGlobalCacheService;
    private rxOverlayService;
    private rxPageTitleService;
    private translateService;
    private router;
    tabs: {
        isVisited: boolean;
        titleKey: string;
        id: BundleDefinitionTab;
    }[];
    bundleDescriptor$: Observable<IBundleDescriptor>;
    activeTabIndex$: Observable<number>;
    constructor(activatedRoute: ActivatedRoute, rxBundleCacheService: RxBundleCacheService, rxGlobalCacheService: RxGlobalCacheService, rxOverlayService: RxOverlayService, rxPageTitleService: RxPageTitleService, translateService: TranslateService, router: Router);
    onTabChanged(tabChangeEvent: ActiveTabChangeEvent): void;
    private setPageTitle;
    static ɵfac: i0.ɵɵFactoryDeclaration<BundleDefinitionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BundleDefinitionsComponent, "ax-bundle-definitions", never, {}, {}, never, never>;
}
