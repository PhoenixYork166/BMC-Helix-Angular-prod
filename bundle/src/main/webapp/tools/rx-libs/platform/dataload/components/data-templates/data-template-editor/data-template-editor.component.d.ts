import { Injector, OnDestroy, OnInit } from '@angular/core';
import { DockedPanelContext, RxSelectOption } from '@bmc-ux/adapt-angular';
import { RxModalClass } from '@helix/platform/ui-kit';
import { RxRecordInstanceService } from '@helix/platform/record/api';
import { RxGlobalCacheService, RxNotificationService } from '@helix/platform/shared/api';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class DataTemplateEditorComponent extends RxModalClass implements OnInit, OnDestroy {
    private translateService;
    private rxNotificationService;
    private rxGlobalCacheService;
    private rxRecordInstanceService;
    protected injector: Injector;
    private dockedPanelContext;
    private formBuilder;
    busy: Subscription;
    private recordInstance;
    private destroyed$;
    private isEditMode;
    dataTemplateForm: FormGroup;
    enableCustomDownload: boolean;
    applicationOptions$: Observable<RxSelectOption[]>;
    constructor(translateService: TranslateService, rxNotificationService: RxNotificationService, rxGlobalCacheService: RxGlobalCacheService, rxRecordInstanceService: RxRecordInstanceService, injector: Injector, dockedPanelContext: DockedPanelContext, formBuilder: FormBuilder);
    isDirty(): boolean;
    ngOnInit(): void;
    setTemplateFormValues(): void;
    optionFormatter(option: RxSelectOption): string;
    saveTemplate(): void;
    downloadAttachment: () => void;
    onRemovedFileFromQueue(): void;
    cancel(): void;
    private successCallback;
    getAllowedTypes(): string[];
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataTemplateEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DataTemplateEditorComponent, "dl-data-template-editor", never, {}, {}, never, never>;
}