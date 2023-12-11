import { ComponentFactoryResolver } from '@angular/core';
import { RxWizardService } from '@helix/platform/shared/components';
import { TranslateService } from '@ngx-translate/core';
import { IJoinRecordDesignerOptions } from './join-record-wizard.types';
import * as i0 from "@angular/core";
export declare class JoinRecordWizardService {
    private rxWizardService;
    private translateService;
    private componentFactoryResolver;
    private title;
    private finishButtonLabel;
    constructor(rxWizardService: RxWizardService, translateService: TranslateService, componentFactoryResolver: ComponentFactoryResolver);
    open(): Promise<IJoinRecordDesignerOptions | null>;
    static ɵfac: i0.ɵɵFactoryDeclaration<JoinRecordWizardService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<JoinRecordWizardService>;
}
