import { Component, Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { RxModalClass } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { RxCurrentUserService, RxNotificationService } from '@helix/platform/shared/api';
import { RxShareViewPresetService } from './share-view-preset.service';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/forms";
import * as i3 from "@ngx-translate/core";
import * as i4 from "./share-view-preset.service";
import * as i5 from "@helix/platform/shared/api";
import * as i6 from "./share-view-preset-users-grid/share-view-preset-users-grid.component";
import * as i7 from "@angular/common";
export class ShareViewPresetComponent extends RxModalClass {
    constructor(activeModalRef, injector, formBuilder, translateService, rxShareViewPresetService, rxCurrentUserService, rxNotificationService) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.injector = injector;
        this.formBuilder = formBuilder;
        this.translateService = translateService;
        this.rxShareViewPresetService = rxShareViewPresetService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxNotificationService = rxNotificationService;
        this.maxRecipients = 100;
        this.strings = {
            users: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.share-view-preset.users-control.label'),
                placeholder: this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.share-view-preset.users-control.placeholder')
            },
            addButton: this.translateService.instant('com.bmc.arsys.rx.client.common.add.label'),
            notifyRecipients: this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.share-view-preset.notify-recipients.label'),
            recipients: this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.share-view-preset.recipients.label'),
            savedNotification: {
                title: this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.share-view-preset.saved-notification.title'),
                message: this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.share-view-preset.saved-notification.message')
            },
            removedNotification: {
                title: this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.share-view-preset.removed-notification.title'),
                message: this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.share-view-preset.removed-notification.message')
            },
            maxRecipientsWarning: this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.share-view-preset.max-users-warning.message', {
                maxUserCount: this.maxRecipients
            })
        };
        this.form = this.formBuilder.group({
            users: this.formBuilder.control([]),
            notifyRecipients: this.formBuilder.control(false)
        });
        this.modalData = this.activeModalRef.getData();
        this.runtimeViewModelApi = this.modalData.runtimeViewModelApi;
        this.selectedUsers = [];
        this.destroyed$ = new ReplaySubject(1);
        this.currentUserLoginName = this.rxCurrentUserService.getName();
        this.isSelectedUsersChanged = false;
        this.search = (text$) => {
            return this.rxShareViewPresetService.getAutocompleteSearch(text$).pipe(map((tags) => {
                const selectedUsersLoginIDs = this.selectedUsers.map((user) => user.loginId);
                const tagsInputLoginIDs = this.form.get('users').value.map(({ data }) => data.loginId);
                // exclude current user and users that have already been added
                return tags.filter((item) => item.data.loginId !== this.currentUserLoginName &&
                    !selectedUsersLoginIDs.includes(item.data.loginId) &&
                    !tagsInputLoginIDs.includes(item.data.loginId));
            }));
        };
    }
    get isRecipientsLimitReached() {
        return this.form.get('users').value.length + this.selectedUsers.length > this.maxRecipients;
    }
    ngOnInit() {
        super.ngOnInit();
        this.loadExistingSharedViewPresetUsers();
    }
    loadExistingSharedViewPresetUsers() {
        if (this.modalData.currentViewPreset.userSharedViewPresetGuid) {
            this.sharedViewPresetInstanceGuid = this.modalData.currentViewPreset.userSharedViewPresetGuid;
            this.rxShareViewPresetService.getSharedViewPresetUsers(this.sharedViewPresetInstanceGuid).subscribe((users) => {
                this.selectedUsers = users;
            });
        }
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    save() {
        if (this.selectedUsers.length) {
            this.saveViewPreset();
        }
        else {
            this.removeViewPreset();
        }
    }
    removeViewPreset() {
        this.rxShareViewPresetService.deleteSharedViewPreset(this.sharedViewPresetInstanceGuid).subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.strings.removedNotification.message, this.strings.removedNotification.title);
            this.activeModalRef.close(null);
        });
    }
    saveViewPreset() {
        this.rxShareViewPresetService
            .saveSharedViewPreset({
            runtimeViewModelApi: this.runtimeViewModelApi,
            currentViewPreset: this.modalData.currentViewPreset,
            presetSelectorGuid: this.modalData.presetSelectorGuid,
            sharedUsers: this.selectedUsers
        }, this.sharedViewPresetInstanceGuid)
            .subscribe((sharedViewPresetInstanceGuid) => {
            this.rxNotificationService.addSuccessMessage(this.strings.savedNotification.message, this.strings.savedNotification.title);
            this.activeModalRef.close(sharedViewPresetInstanceGuid);
        });
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    onAdd() {
        const usersToAdd = this.form.get('users').value.map((tag) => (Object.assign({}, tag.data)));
        this.selectedUsers = this.selectedUsers.concat(usersToAdd);
        this.form.get('users').setValue([]);
        this.isSelectedUsersChanged = true;
    }
    removeSelectedUsers(selectedUserLoginIds) {
        this.selectedUsers = this.selectedUsers.filter((user) => !selectedUserLoginIds.includes(user.loginId));
        this.isSelectedUsersChanged = true;
        this.markAsDirty();
    }
    // saving is allowed when changing users of existing preset
    // or creating new preset with at least one user selected
    isSaveButtonDisabled() {
        return !((this.sharedViewPresetInstanceGuid && this.isSelectedUsersChanged) ||
            (!this.sharedViewPresetInstanceGuid && this.selectedUsers.length > 0));
    }
}
ShareViewPresetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ShareViewPresetComponent, deps: [{ token: i1.ActiveModalRef }, { token: i0.Injector }, { token: i2.FormBuilder }, { token: i3.TranslateService }, { token: i4.RxShareViewPresetService }, { token: i5.RxCurrentUserService }, { token: i5.RxNotificationService }], target: i0.ɵɵFactoryTarget.Component });
ShareViewPresetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ShareViewPresetComponent, selector: "rx-share-view-preset", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-body\">\n  <form [formGroup]=\"form\">\n    <div class=\"row row-no-gutters\">\n      <div class=\"col\">\n        <adapt-tag-field\n          formControlName=\"users\"\n          rx-id=\"users-input\"\n          [label]=\"strings.users.label\"\n          [placeholder]=\"strings.users.placeholder\"\n          [replaceModelOnWrite]=\"true\"\n          [suppressManual]=\"true\"\n          [search]=\"search\"\n          [selectItemTemplate]=\"selectItemTemplate\"\n          (ngModelChange)=\"markAsDirty()\"\n        >\n        </adapt-tag-field>\n        <div class=\"warning mb-3\" *ngIf=\"isRecipientsLimitReached\">\n          <adapt-icon name=\"exclamation_triangle\" class=\"text-warning\"></adapt-icon>\n          {{ strings.maxRecipientsWarning }}\n        </div>\n      </div>\n      <div class=\"col-auto pl-0\">\n        <button\n          class=\"add-button\"\n          adapt-button\n          type=\"button\"\n          btn-type=\"secondary\"\n          rx-id=\"add-button\"\n          [disabled]=\"!form.get('users').value.length || isRecipientsLimitReached\"\n          (click)=\"onAdd()\"\n        >\n          <span>{{ strings.addButton }}</span>\n        </button>\n      </div>\n    </div>\n  </form>\n\n  <adapt-rx-control-label [label]=\"strings.recipients\"></adapt-rx-control-label>\n\n  <rx-share-view-preset-users-grid\n    [users]=\"selectedUsers\"\n    (remove)=\"removeSelectedUsers($event)\"\n  ></rx-share-view-preset-users-grid>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"isSaveButtonDisabled()\"\n    (click)=\"save()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n  <button adapt-button btn-type=\"secondary\" type=\"button\" rx-id=\"cancel-button\" (click)=\"cancel()\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n\n<ng-template #selectItemTemplate let-result=\"result\" let-term=\"term\">\n  <strong>{{ result.text }}</strong>\n  <div>{{ result.data.emailAddress }}</div>\n</ng-template>\n", styles: [".add-button{margin-top:23px}.warning{margin-top:-10px}:host::ng-deep adapt-tag-field .adapt-mt-wrapper{min-height:80px;padding-right:5px}:host::ng-deep adapt-tag-field .adapt-mt-wrapper .adapt-mt{max-height:72px!important}\n"], components: [{ type: i1.AdaptMetatagComponent, selector: "adapt-metatag, adapt-tag-field", inputs: ["prefix", "suffix", "maxTagLength", "truncateConfig", "id", "testID", "name", "ariaLabel", "search", "maxHeight", "suppressManual", "label", "placeholder", "mainErrorText", "warningStateText", "width", "errorCheck", "warningCheck", "selectItemTemplate", "tagTemplate", "replaceModelOnWrite", "delimiterSymbol", "popupClass", "disabledInput", "openDropdownOnFocus", "selectItemFormatter", "fullWidthEdit", "tagStyleFormatter"], outputs: ["focus", "blur", "removeTag", "addTag", "initTagEditing"] }, { type: i1.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i6.ShareViewPresetUsersGridComponent, selector: "rx-share-view-preset-users-grid", inputs: ["users"], outputs: ["remove"] }], directives: [{ type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ShareViewPresetComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-share-view-preset',
                    templateUrl: './share-view-preset.component.html',
                    styleUrls: ['./share-view-preset.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i0.Injector }, { type: i2.FormBuilder }, { type: i3.TranslateService }, { type: i4.RxShareViewPresetService }, { type: i5.RxCurrentUserService }, { type: i5.RxNotificationService }]; } });
//# sourceMappingURL=share-view-preset.component.js.map