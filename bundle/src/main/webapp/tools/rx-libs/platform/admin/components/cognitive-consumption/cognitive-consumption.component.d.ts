import { OnInit, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdaptModalService } from '@bmc-ux/adapt-angular';
import { RxCurrentUserService, RxLicenseDataPageService } from '@helix/platform/shared/api';
import { ICognitiveConsumptionSection } from './cognitive-consumption.types';
import { CognitiveConsumptionGroupComponent } from './components/cognitive-consumption-group/cognitive-consumption-group.component';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class CognitiveConsumptionAdminComponent implements OnInit {
    private adaptModalService;
    private rxLicenseDataPageService;
    private rxCurrentUserService;
    private translateService;
    cognitiveConsumptionGroups: QueryList<CognitiveConsumptionGroupComponent>;
    busy: Subscription;
    isAdministrator: boolean;
    sectionIds: string[];
    sections: ICognitiveConsumptionSection[];
    constructor(adaptModalService: AdaptModalService, rxLicenseDataPageService: RxLicenseDataPageService, rxCurrentUserService: RxCurrentUserService, translateService: TranslateService);
    ngOnInit(): void;
    onDownloadClick(): void;
    onRefreshClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CognitiveConsumptionAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CognitiveConsumptionAdminComponent, "rx-admin-cognitive-consumption", never, {}, {}, never, never>;
}
