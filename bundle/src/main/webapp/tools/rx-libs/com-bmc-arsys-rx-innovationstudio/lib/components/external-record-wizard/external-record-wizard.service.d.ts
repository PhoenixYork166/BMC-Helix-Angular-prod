import { ComponentFactoryResolver } from '@angular/core';
import { RxFieldDefinitionManagerService } from '@helix/platform/record/designer';
import { RxWizardService } from '@helix/platform/shared/components';
import { RxIdService } from '@helix/platform/utils';
import { TranslateService } from '@ngx-translate/core';
import { IExternalRecordDesignerOptions } from './external-record-wizard.types';
import * as i0 from "@angular/core";
export declare class ExternalRecordWizardService {
    private componentFactoryResolver;
    private rxIdService;
    private rxFieldDefinitionManagerService;
    private rxWizardService;
    private translateService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxIdService: RxIdService, rxFieldDefinitionManagerService: RxFieldDefinitionManagerService, rxWizardService: RxWizardService, translateService: TranslateService);
    private systemFieldsNames;
    open(): Promise<IExternalRecordDesignerOptions | null>;
    private getArsFieldDefinitions;
    private getWebApiFieldDefinitions;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExternalRecordWizardService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ExternalRecordWizardService>;
}
