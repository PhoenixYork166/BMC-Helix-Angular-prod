import { OnInit } from '@angular/core';
import { AdaptIconConfig, RxSelectOption } from '@bmc-ux/adapt-angular';
import { IRecordGridConfig, RecordGridComponent } from '@helix/platform/view/components';
import { Observable } from 'rxjs';
import { RxOutgoingMailboxStatusDataPageService } from './outgoing-mailbox-status-data-page.service';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class OutgoingMailboxStatusAdminComponent implements OnInit {
    private rxOutgoingMailboxStatusDataPageService;
    private translateService;
    private iconConfig;
    recordGrid: RecordGridComponent;
    recordGridConfig: Observable<IRecordGridConfig>;
    availableTimeFrames: RxSelectOption[];
    selectedTimeFrame: RxSelectOption[];
    constructor(rxOutgoingMailboxStatusDataPageService: RxOutgoingMailboxStatusDataPageService, translateService: TranslateService, iconConfig: AdaptIconConfig);
    ngOnInit(): void;
    onTimeFrameChange(timeFrame: RxSelectOption): void;
    optionFormatter(timeFrame: RxSelectOption): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OutgoingMailboxStatusAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OutgoingMailboxStatusAdminComponent, "rx-admin-outgoing-mailbox-status", never, {}, {}, never, never>;
}
