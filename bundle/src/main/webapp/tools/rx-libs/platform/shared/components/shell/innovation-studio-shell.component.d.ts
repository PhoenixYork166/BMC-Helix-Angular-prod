import { Injector, TemplateRef } from '@angular/core';
import { AdaptDockedPanelService, AdaptModalService, AdaptNavigationComponent, NavigationAction } from '@bmc-ux/adapt-angular';
import { IUserOverlayGroupDescriptorChildren, RxOverlayService, RxPreviousStateService, RxSystemConfigurationService } from '@helix/platform/shared/api';
import { IRxShellConfig, IRxShellMenuItem } from '@helix/platform/view/api';
import { Observable } from 'rxjs';
import { ShellBase } from './shell-base.class';
import { RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class RxInnovationStudioShellComponent extends ShellBase {
    protected injector: Injector;
    private adaptDockedPanelService;
    private adaptModalService;
    protected rxSystemConfigurationService: RxSystemConfigurationService;
    private rxOverlayService;
    private rxPreviousStateService;
    private rxModalService;
    protected adaptNavigation: AdaptNavigationComponent;
    protected userMessagesPopover: TemplateRef<any>;
    protected flattenedMenuItems: {
        name: any;
        id: number;
        action: () => void;
    }[];
    private npsSurveyBaseUrl;
    currentOverlayContext: IUserOverlayGroupDescriptorChildren;
    constructor(injector: Injector, adaptDockedPanelService: AdaptDockedPanelService, adaptModalService: AdaptModalService, rxSystemConfigurationService: RxSystemConfigurationService, rxOverlayService: RxOverlayService, rxPreviousStateService: RxPreviousStateService, rxModalService: RxModalService);
    protected getActiveNavigationMenuItem(): IRxShellMenuItem;
    protected getUserMenuItems(): Observable<IRxShellMenuItem[]>;
    private isEligibleForFeedback;
    private openFeedback;
    openGainsightPreferences(): void;
    protected getNavigationMenuItems(): Observable<IRxShellMenuItem[]>;
    protected getNavigationActionItems(): Observable<NavigationAction[]>;
    protected getShellConfig(): Observable<IRxShellConfig>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxInnovationStudioShellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxInnovationStudioShellComponent, "rx-innovation-studio-shell", never, {}, {}, never, never>;
}
