import { Injector, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RxModalClass } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { RuntimeViewModelApi } from '@helix/platform/view/runtime';
import { IShareViewPresetModalData, IShareViewPresetUserPayload, ITagUserAutocompleteValue } from './share-view-preset.types';
import { RxCurrentUserService, RxNotificationService } from '@helix/platform/shared/api';
import { RxShareViewPresetService } from './share-view-preset.service';
import * as i0 from "@angular/core";
export declare class ShareViewPresetComponent extends RxModalClass implements OnInit, OnDestroy {
    private activeModalRef;
    protected injector: Injector;
    private formBuilder;
    private translateService;
    private rxShareViewPresetService;
    private rxCurrentUserService;
    private rxNotificationService;
    private maxRecipients;
    strings: {
        users: {
            label: any;
            placeholder: any;
        };
        addButton: any;
        notifyRecipients: any;
        recipients: any;
        savedNotification: {
            title: any;
            message: any;
        };
        removedNotification: {
            title: any;
            message: any;
        };
        maxRecipientsWarning: any;
    };
    form: import("@angular/forms").FormGroup;
    modalData: IShareViewPresetModalData;
    runtimeViewModelApi: RuntimeViewModelApi;
    selectedUsers: IShareViewPresetUserPayload[];
    get isRecipientsLimitReached(): boolean;
    private destroyed$;
    private currentUserLoginName;
    private sharedViewPresetInstanceGuid;
    private isSelectedUsersChanged;
    search: (text$: Observable<string>) => Observable<ITagUserAutocompleteValue[]>;
    constructor(activeModalRef: ActiveModalRef, injector: Injector, formBuilder: FormBuilder, translateService: TranslateService, rxShareViewPresetService: RxShareViewPresetService, rxCurrentUserService: RxCurrentUserService, rxNotificationService: RxNotificationService);
    ngOnInit(): void;
    private loadExistingSharedViewPresetUsers;
    ngOnDestroy(): void;
    save(): void;
    private removeViewPreset;
    private saveViewPreset;
    cancel(): void;
    onAdd(): void;
    removeSelectedUsers(selectedUserLoginIds: string[]): void;
    isSaveButtonDisabled(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ShareViewPresetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ShareViewPresetComponent, "rx-share-view-preset", never, {}, {}, never, never>;
}
