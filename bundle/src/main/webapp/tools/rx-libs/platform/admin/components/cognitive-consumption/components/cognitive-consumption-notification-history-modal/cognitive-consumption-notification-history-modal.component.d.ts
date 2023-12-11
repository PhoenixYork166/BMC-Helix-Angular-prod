import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { IPlainObject } from '@helix/platform/shared/api';
import { IRecordGridConfig } from '@helix/platform/view/components';
import { RxCognitiveConsumptionService } from '../../cognitive-consumption.service';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class CognitiveConsumptionNotificationHistoryModalComponent implements OnInit {
    private activeModalRef;
    private rxCognitiveConsumptionService;
    private translateService;
    modalData: IPlainObject;
    recordGridConfig: Observable<IRecordGridConfig>;
    constructor(activeModalRef: ActiveModalRef, rxCognitiveConsumptionService: RxCognitiveConsumptionService, translateService: TranslateService);
    ngOnInit(): void;
    onCloseClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CognitiveConsumptionNotificationHistoryModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CognitiveConsumptionNotificationHistoryModalComponent, "rx-cognitive-consumption-notification-history-modal", never, {}, {}, never, never>;
}
