import { OnInit } from '@angular/core';
import { BusyConfig } from '@bmc-ux/adapt-angular';
import { RxModalService } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { RxCognitiveConsumptionService } from '../../cognitive-consumption.service';
import { ICognitiveConsumptionChart, ICognitiveConsumptionGroup, ICognitiveConsumptionGroupData, ICognitiveLicenseUsageCount, ICognitiveLicenseUsageParams } from '../../cognitive-consumption.types';
import * as i0 from "@angular/core";
export declare class CognitiveConsumptionGroupComponent implements OnInit {
    private rxModalService;
    private rxCognitiveConsumptionService;
    private translateService;
    group: ICognitiveConsumptionGroup;
    isAdministrator: boolean;
    sectionId: string;
    busy: BusyConfig['busy'];
    charts: ICognitiveConsumptionChart[];
    groupData: ICognitiveConsumptionGroupData;
    licenceUsageCount: ICognitiveLicenseUsageCount[];
    parameters: ICognitiveLicenseUsageParams;
    constructor(rxModalService: RxModalService, rxCognitiveConsumptionService: RxCognitiveConsumptionService, translateService: TranslateService);
    ngOnInit(): void;
    generateCognitiveConsumptionGroup(): void;
    onNotificationsClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CognitiveConsumptionGroupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CognitiveConsumptionGroupComponent, "rx-cognitive-consumption-group", never, { "group": "group"; "isAdministrator": "isAdministrator"; "sectionId": "sectionId"; }, {}, never, never>;
}
