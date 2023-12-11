import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, EMPTY, iif, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, finalize, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { noop, reject, sortBy } from 'lodash';
import { RxGuidService } from '@helix/platform/utils';
import { RxModalService, RxUtilityModalsService } from '@helix/platform/ui-kit';
import { BaseViewComponent, RuntimeViewModelApi } from '@helix/platform/view/runtime';
import { RxViewPresetSelectorUserPreferencesService } from './view-preset-selector-user-preferences.service';
import { RenameViewPresetComponent } from './rename-view-preset/rename-view-preset.component';
import { ShareViewPresetComponent } from './share-view-preset/share-view-preset.component';
import { RxFeatureService, RxNotificationService } from '@helix/platform/shared/api';
import { RX_SHARABLE_VIEW_RESETS_FEATURE_NAME } from '../view-preset-selector.types';
import { AddSharedViewPresetsComponent } from './add-shared-view-presets/add-shared-view-presets.component';
import { RxShareViewPresetService } from './share-view-preset/share-view-preset.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "@helix/platform/ui-kit";
import * as i3 from "./view-preset-selector-user-preferences.service";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@helix/platform/shared/api";
import * as i6 from "./share-view-preset/share-view-preset.service";
import * as i7 from "@bmc-ux/adapt-angular";
import * as i8 from "@angular/common";
export class ViewPresetSelectorComponent extends BaseViewComponent {
    constructor(changeDetectorRef, rxGuidService, rxModalService, rxUtilityModalsService, rxViewPresetSelectorUserPreferencesService, translateService, rxFeatureService, rxNotificationService, rxShareViewPresetService) {
        super();
        this.changeDetectorRef = changeDetectorRef;
        this.rxGuidService = rxGuidService;
        this.rxModalService = rxModalService;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.rxViewPresetSelectorUserPreferencesService = rxViewPresetSelectorUserPreferencesService;
        this.translateService = translateService;
        this.rxFeatureService = rxFeatureService;
        this.rxNotificationService = rxNotificationService;
        this.rxShareViewPresetService = rxShareViewPresetService;
        this.api = {
            getGuid: () => this.guid,
            markAppliedViewPresetAsEdited: this.markAppliedViewPresetAsEdited.bind(this)
        };
        this.isOperationInProgressSubject = new BehaviorSubject(false);
        this.isViewPresetEditedSubject = new BehaviorSubject(false);
        this.viewPresetSelectorModel$ = combineLatest([this.isOperationInProgressSubject, this.isViewPresetEditedSubject]).pipe(map(([isOperationInProgress, isViewPresetEdited]) => ({
            isOperationInProgress,
            isViewPresetEdited
        })));
        this.strings = {
            deleteLabel: this.translateService.instant('com.bmc.arsys.rx.client.common.delete.label'),
            discardChangesButtonLabel: this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.discard-changes.button.label'),
            editedViewPresetTagLabel: this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.edited-view-preset-tag.label'),
            renameLabel: this.translateService.instant('com.bmc.arsys.rx.client.common.rename.label'),
            saveLabel: this.translateService.instant('com.bmc.arsys.rx.client.common.save.label'),
            saveAsLabel: this.translateService.instant('com.bmc.arsys.rx.client.common.save-as.label'),
            shareLabel: this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.share.button.label'),
            systemPresetsTitle: this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.preset-type.system.label'),
            sharedPresetsTitle: this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.preset-type.shared-with-me.label'),
            customPresetsTitle: this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.preset-type.created-by-me.label'),
            sharedTooltip: this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.shared-preset.tooltip'),
            addSharedViewPresets: this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.add-shared-view-preset.title')
        };
        this.userPreferencesChangedSubject = new Subject();
        this.isSharingFeatureEnabled = this.rxFeatureService.isFeatureEnabled(RX_SHARABLE_VIEW_RESETS_FEATURE_NAME);
        this.userPreferencesChangedSubject
            .pipe(switchMap(() => this.rxViewPresetSelectorUserPreferencesService.save(this.state)), takeUntil(this.destroyed$))
            .subscribe();
    }
    ngOnInit() {
        super.ngOnInit();
        this.notifyPropertyChanged('api', this.api);
        this.config
            .pipe(take(1), map((config) => ({
            systemViewPresetOptions: config.viewPresets,
            customViewPresetOptions: [],
            sharedViewPresetOptions: [],
            appliedViewPresetOption: null,
            isSharingEnabled: config.enableSharing && this.isSharingFeatureEnabled
        })), switchMap((state) => this.rxViewPresetSelectorUserPreferencesService.applyUserPreferences(this.guid, state)), tap(({ state, shouldUpdatePreferences, removedPresetGuid }) => {
            this.state = state;
            this.changeDetectorRef.detectChanges();
            this.isOperationInProgressSubject.next(true);
            if (removedPresetGuid) {
                this.runtimeViewModelApi.deleteViewPreset(removedPresetGuid).subscribe();
            }
            if (shouldUpdatePreferences) {
                this.userPreferencesChangedSubject.next();
            }
        }), switchMap(() => this.applyViewPreset(this.state.appliedViewPresetOption)), finalize(() => this.isOperationInProgressSubject.next(false)))
            .subscribe();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.isOperationInProgressSubject.complete();
        this.isViewPresetEditedSubject.complete();
        this.userPreferencesChangedSubject.complete();
    }
    deleteViewPreset(viewPresetOptionToRemove) {
        this.rxUtilityModalsService
            .confirm(this.translateService.instant(viewPresetOptionToRemove.userSharedViewPresetGuid
            ? 'com.bmc.arsys.rx.client.view-components.view-preset-selector.delete-shared-view-preset-confirmation.message'
            : 'com.bmc.arsys.rx.client.view-components.view-preset-selector.delete-view-preset-confirmation.message'))
            .then((isConfirmed) => {
            if (isConfirmed) {
                const viewPresetGuidToDelete = this.state.appliedViewPresetOption.guid;
                this.state.appliedViewPresetOption = this.state.systemViewPresetOptions[0];
                this.isViewPresetEditedSubject.next(false);
                this.state.customViewPresetOptions = reject(this.state.customViewPresetOptions, {
                    guid: viewPresetGuidToDelete
                });
                this.state.sharedViewPresetOptions = reject(this.state.sharedViewPresetOptions, {
                    guid: viewPresetGuidToDelete
                });
                this.userPreferencesChangedSubject.next();
                this.isOperationInProgressSubject.next(true);
                this.runtimeViewModelApi
                    .applyViewPreset(this.guid, this.state.appliedViewPresetOption.guid)
                    .pipe(finalize(() => {
                    const deleteSharedViewPreset$ = viewPresetOptionToRemove.userSharedViewPresetGuid
                        ? this.rxShareViewPresetService.deleteSharedViewPreset(viewPresetOptionToRemove.userSharedViewPresetGuid)
                        : of(null);
                    deleteSharedViewPreset$
                        .pipe(switchMap(() => this.runtimeViewModelApi.deleteViewPreset(viewPresetGuidToDelete)), finalize(() => this.isOperationInProgressSubject.next(false)))
                        .subscribe();
                }))
                    .subscribe();
            }
        })
            .catch(noop);
    }
    discardViewPresetChanges() {
        this.rxUtilityModalsService
            .confirm(this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.discard-changes-confirmation.message'))
            .then((isConfirmed) => {
            if (isConfirmed) {
                this.isViewPresetEditedSubject.next(false);
                this.isOperationInProgressSubject.next(true);
                const appliedViewPresetOption = this.state.appliedViewPresetOption;
                iif(() => appliedViewPresetOption.isShared, this.getSharedViewPresetData(appliedViewPresetOption).pipe(switchMap((sharedViewPresets) => this.runtimeViewModelApi.discardViewPresetChanges(appliedViewPresetOption.guid, sharedViewPresets))), this.runtimeViewModelApi.discardViewPresetChanges(appliedViewPresetOption.guid))
                    .pipe(finalize(() => this.isOperationInProgressSubject.next(false)))
                    .subscribe();
            }
        })
            .catch(noop);
    }
    renameViewPreset() {
        this.openRenamingModal(this.strings.renameLabel, true)
            .then((viewPresetName) => {
            this.state.appliedViewPresetOption.label = viewPresetName;
            this.state.customViewPresetOptions = sortBy(this.state.customViewPresetOptions, 'label');
            this.userPreferencesChangedSubject.next();
            this.changeDetectorRef.detectChanges();
            // if preset is shared with others - updating with new name
            if (this.state.appliedViewPresetOption.userSharedViewPresetGuid) {
                this.saveSharedViewPreset().subscribe();
            }
        })
            .catch(noop);
    }
    selectPreset(viewPresetOption) {
        this.state.appliedViewPresetOption = viewPresetOption;
        this.isViewPresetEditedSubject.next(false);
        this.userPreferencesChangedSubject.next();
        this.isOperationInProgressSubject.next(true);
        this.applyViewPreset(viewPresetOption)
            .pipe(finalize(() => this.isOperationInProgressSubject.next(false)))
            .subscribe();
    }
    saveAsViewPreset() {
        this.openRenamingModal(this.strings.saveAsLabel)
            .then((viewPresetName) => {
            const viewPreset = {
                guid: this.rxGuidService.generate(),
                label: viewPresetName
            };
            this.state.customViewPresetOptions.push(viewPreset);
            this.state.customViewPresetOptions = sortBy(this.state.customViewPresetOptions, 'label');
            this.state.appliedViewPresetOption = viewPreset;
            this.isViewPresetEditedSubject.next(false);
            this.userPreferencesChangedSubject.next();
            this.isOperationInProgressSubject.next(true);
            this.runtimeViewModelApi
                .applyViewPreset(this.guid, this.state.appliedViewPresetOption.guid)
                .pipe(finalize(() => this.isOperationInProgressSubject.next(false)))
                .subscribe();
        })
            .catch(noop);
    }
    saveViewPreset() {
        this.isViewPresetEditedSubject.next(false);
        this.isOperationInProgressSubject.next(true);
        const saveSharedViewPreset$ = this.state.appliedViewPresetOption.userSharedViewPresetGuid
            ? this.saveSharedViewPreset()
            : of(null);
        saveSharedViewPreset$
            .pipe(switchMap(() => this.runtimeViewModelApi.saveViewPreset(this.state.appliedViewPresetOption.guid)), finalize(() => this.isOperationInProgressSubject.next(false)))
            .subscribe();
    }
    shareViewPreset() {
        this.rxModalService
            .openModal({
            content: ShareViewPresetComponent,
            title: this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.share-view-preset.title'),
            data: {
                runtimeViewModelApi: this.runtimeViewModelApi,
                currentViewPreset: this.state.appliedViewPresetOption,
                presetSelectorGuid: this.guid
            },
            size: 'sm'
        })
            .then((sharedViewPresetGuid) => {
            this.state.appliedViewPresetOption.userSharedViewPresetGuid = sharedViewPresetGuid;
            this.userPreferencesChangedSubject.next();
        })
            .catch(noop);
    }
    onAddSharedPresetsClick() {
        this.rxShareViewPresetService.getSharedViewPresetsForCurrentUser(this.guid).subscribe((presets) => {
            const existingSharedPresetsGuids = this.state.sharedViewPresetOptions.map((option) => option.guid);
            const newPresets = presets.filter((preset) => !existingSharedPresetsGuids.includes(preset.guid));
            if (newPresets.length) {
                this.openAddSharedPresetsModal(newPresets);
            }
            else {
                this.rxNotificationService.addInfoMessage(this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.add-shared-view-preset.notification.no-new-presets.message'), this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.add-shared-view-preset.notification.no-new-presets.title'));
            }
        });
    }
    openAddSharedPresetsModal(newPresets) {
        this.rxModalService
            .openModal({
            content: AddSharedViewPresetsComponent,
            title: this.strings.addSharedViewPresets,
            data: {
                presetSelectorGuid: this.guid,
                newPresets
            },
            size: 'sm'
        })
            .then((addedPresets) => {
            this.state.sharedViewPresetOptions = this.state.sharedViewPresetOptions.concat(addedPresets.map((preset) => (Object.assign(Object.assign({}, preset), { isShared: true }))));
            this.userPreferencesChangedSubject.next();
            if (addedPresets.length) {
                this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.add-shared-view-preset.notification.presets-added.message'), this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.add-shared-view-preset.notification.presets-added.title'));
            }
        })
            .catch(noop);
    }
    markAppliedViewPresetAsEdited() {
        this.isViewPresetEditedSubject.next(true);
    }
    openRenamingModal(fieldLabel, isEdit) {
        let existingViewPresets = [...this.state.customViewPresetOptions, ...this.state.systemViewPresetOptions];
        if (isEdit) {
            existingViewPresets = existingViewPresets.filter((viewPreset) => viewPreset.guid !== this.state.appliedViewPresetOption.guid);
        }
        return this.rxModalService.openModal({
            content: RenameViewPresetComponent,
            data: {
                fieldLabel,
                existingViewPresetNames: existingViewPresets.map(({ label }) => label),
                viewPresetName: this.state.appliedViewPresetOption.label
            },
            size: 'sm'
        });
    }
    applyViewPreset(viewPresetOption) {
        if (viewPresetOption.isShared) {
            return this.getSharedViewPresetData(viewPresetOption).pipe(switchMap((sharedViewPresets) => this.runtimeViewModelApi.applyViewPreset(this.guid, viewPresetOption.guid, sharedViewPresets)), catchError((error) => this.handleSharedViewPresetLoadError(error, viewPresetOption)));
        }
        else {
            return this.runtimeViewModelApi.applyViewPreset(this.guid, viewPresetOption.guid);
        }
    }
    saveSharedViewPreset() {
        return this.rxShareViewPresetService.saveSharedViewPreset({
            runtimeViewModelApi: this.runtimeViewModelApi,
            currentViewPreset: this.state.appliedViewPresetOption,
            presetSelectorGuid: this.guid
        }, this.state.appliedViewPresetOption.userSharedViewPresetGuid);
    }
    getSharedViewPresetData(viewPresetOption) {
        return this.rxShareViewPresetService.getSharedViewPresetData(viewPresetOption.guid).pipe(map(({ viewPresetName, sharedViewPresets }) => {
            viewPresetOption.label = viewPresetName;
            return sharedViewPresets;
        }));
    }
    handleSharedViewPresetLoadError(error, viewPresetOption) {
        if (error.status === 404) {
            this.state.sharedViewPresetOptions = this.state.sharedViewPresetOptions.filter((option) => option.guid !== viewPresetOption.guid);
            this.runtimeViewModelApi.deleteViewPreset(viewPresetOption.guid).subscribe();
            // if preset was removed - selecting first system preset instead
            this.selectPreset(this.state.systemViewPresetOptions[0]);
            return EMPTY;
        }
        else {
            return throwError(error);
        }
    }
}
ViewPresetSelectorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewPresetSelectorComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.RxGuidService }, { token: i2.RxModalService }, { token: i2.RxUtilityModalsService }, { token: i3.RxViewPresetSelectorUserPreferencesService }, { token: i4.TranslateService }, { token: i5.RxFeatureService }, { token: i5.RxNotificationService }, { token: i6.RxShareViewPresetService }], target: i0.ɵɵFactoryTarget.Component });
ViewPresetSelectorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ViewPresetSelectorComponent, selector: "rx-view-preset-selector", inputs: { config: "config", runtimeViewModelApi: "runtimeViewModelApi" }, providers: [RxViewPresetSelectorUserPreferencesService], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"viewPresetSelectorModel$ | async as viewPresetSelectorModel\">\n  <div class=\"btn-group align-items-center\" *ngIf=\"state\">\n    <div adaptDropdown>\n      <button\n        adapt-button\n        adaptDropdownToggle\n        type=\"button\"\n        btn-type=\"tertiary\"\n        class=\"text-default font-weight-bold text-left\"\n        rx-id=\"toggle-button\"\n        [disabled]=\"viewPresetSelectorModel.isOperationInProgress\"\n      >\n        {{ state.appliedViewPresetOption.label }}\n      </button>\n\n      <div class=\"dropdown-menu {{ isSharingFeatureEnabled ? 'preset-selector' : '' }}\" adaptDropdownMenu tabindex=\"0\">\n        <ng-container *ngIf=\"state.customViewPresetOptions.length\">\n          <div class=\"dropdown-heading\" *ngIf=\"isSharingFeatureEnabled\">{{ strings.customPresetsTitle }}</div>\n          <button\n            *ngFor=\"let customViewPresetOption of state.customViewPresetOptions\"\n            [class.active]=\"customViewPresetOption.guid === state.appliedViewPresetOption.guid\"\n            class=\"dropdown-item\"\n            type=\"button\"\n            (click)=\"selectPreset(customViewPresetOption)\"\n            rx-id=\"custom-view-preset\"\n          >\n            {{ customViewPresetOption.label }}\n\n            <adapt-icon\n              *ngIf=\"customViewPresetOption.userSharedViewPresetGuid && isSharingFeatureEnabled\"\n              name=\"users\"\n              [adaptTooltip]=\"strings.sharedTooltip\"\n              class=\"btn-link float-end ml-2\"\n            ></adapt-icon>\n          </button>\n\n          <div *ngIf=\"!isSharingFeatureEnabled\" class=\"dropdown-divider\"></div>\n        </ng-container>\n\n        <ng-container *ngIf=\"state.isSharingEnabled\">\n          <div class=\"dropdown-heading\">\n            {{ strings.sharedPresetsTitle }}\n\n            <button\n              type=\"button\"\n              class=\"btn btn-link float-end p-0 pl-1 btn-add-shared\"\n              rx-id=\"add-preset-button\"\n              [adaptTooltip]=\"strings.addSharedViewPresets\"\n              (click)=\"onAddSharedPresetsClick()\"\n            >\n              <adapt-icon name=\"plus\"></adapt-icon>\n            </button>\n          </div>\n\n          <button\n            *ngFor=\"let sharedViewPresetOption of state.sharedViewPresetOptions\"\n            class=\"dropdown-item\"\n            [class.active]=\"sharedViewPresetOption.guid === state.appliedViewPresetOption.guid\"\n            type=\"button\"\n            (click)=\"selectPreset(sharedViewPresetOption)\"\n            rx-id=\"shared-view-preset\"\n          >\n            {{ sharedViewPresetOption.label }}\n          </button>\n        </ng-container>\n\n        <div class=\"dropdown-heading\" *ngIf=\"isSharingFeatureEnabled\">{{ strings.systemPresetsTitle }}</div>\n\n        <button\n          *ngFor=\"let systemViewPresetOption of state.systemViewPresetOptions\"\n          class=\"dropdown-item\"\n          [class.active]=\"systemViewPresetOption.guid === state.appliedViewPresetOption.guid\"\n          type=\"button\"\n          (click)=\"selectPreset(systemViewPresetOption)\"\n          rx-id=\"system-view-preset\"\n        >\n          {{ systemViewPresetOption.label }}\n        </button>\n      </div>\n    </div>\n\n    <span class=\"badge badge-secondary extra-small mx-2\" *ngIf=\"viewPresetSelectorModel.isViewPresetEdited\">\n      {{ strings.editedViewPresetTagLabel }}\n    </span>\n\n    <adapt-button\n      btn-type=\"tertiary\"\n      *ngIf=\"\n        !state.appliedViewPresetOption.isSystem &&\n        !state.appliedViewPresetOption.isShared &&\n        viewPresetSelectorModel.isViewPresetEdited\n      \"\n      class=\"d-icon-left-floppy p-2\"\n      rx-id=\"save-button\"\n      [disabled]=\"viewPresetSelectorModel.isOperationInProgress\"\n      (click)=\"saveViewPreset()\"\n    >\n      {{ strings.saveLabel }}\n    </adapt-button>\n\n    <adapt-button\n      btn-type=\"tertiary\"\n      [disabled]=\"viewPresetSelectorModel.isOperationInProgress\"\n      (click)=\"saveAsViewPreset()\"\n      class=\"d-icon-left-save_all_o\"\n      rx-id=\"save-as-button\"\n      *ngIf=\"\n        state.appliedViewPresetOption.isSystem ||\n        state.appliedViewPresetOption.isShared ||\n        !viewPresetSelectorModel.isViewPresetEdited\n      \"\n    >\n      {{ strings.saveAsLabel }}\n    </adapt-button>\n\n    <div\n      class=\"dropdown header-cell-menu-btn\"\n      adaptDropdown\n      *ngIf=\"viewPresetSelectorModel.isViewPresetEdited || !state.appliedViewPresetOption.isSystem\"\n    >\n      <button\n        rx-id=\"more-actions-toggle-button\"\n        class=\"d-icon-ellipsis btn btn-link px-0\"\n        type=\"button\"\n        adaptDropdownToggle\n        [disabled]=\"viewPresetSelectorModel.isOperationInProgress\"\n        [showCaret]=\"false\"\n      ></button>\n\n      <div class=\"dropdown-menu\" adaptDropdownMenu tabindex=\"0\">\n        <adapt-button\n          btn-type=\"tertiary\"\n          *ngIf=\"viewPresetSelectorModel.isViewPresetEdited\"\n          class=\"d-icon-left-undo_adapt dropdown-item\"\n          rx-id=\"discard-changes-button\"\n          (click)=\"discardViewPresetChanges()\"\n        >\n          {{ strings.discardChangesButtonLabel }}\n        </adapt-button>\n\n        <adapt-button\n          btn-type=\"tertiary\"\n          (click)=\"saveAsViewPreset()\"\n          class=\"d-icon-left-save_all_o dropdown-item\"\n          rx-id=\"save-as-button\"\n          *ngIf=\"\n            !state.appliedViewPresetOption.isSystem &&\n            !state.appliedViewPresetOption.isShared &&\n            viewPresetSelectorModel.isViewPresetEdited\n          \"\n        >\n          {{ strings.saveAsLabel }}\n        </adapt-button>\n\n        <adapt-button\n          btn-type=\"tertiary\"\n          *ngIf=\"!state.appliedViewPresetOption.isSystem && !state.appliedViewPresetOption.isShared\"\n          class=\"d-icon-left-field_text dropdown-item\"\n          rx-id=\"rename-selected-view-preset-button\"\n          (click)=\"renameViewPreset()\"\n        >\n          {{ strings.renameLabel }}\n        </adapt-button>\n\n        <adapt-button\n          btn-type=\"tertiary\"\n          *ngIf=\"!state.appliedViewPresetOption.isSystem\"\n          class=\"d-icon-left-trash_adapt dropdown-item\"\n          rx-id=\"remove-selected-view-preset-button\"\n          (click)=\"deleteViewPreset(state.appliedViewPresetOption)\"\n        >\n          {{ strings.deleteLabel }}\n        </adapt-button>\n\n        <adapt-button\n          btn-type=\"tertiary\"\n          *ngIf=\"\n            state.isSharingEnabled &&\n            !state.appliedViewPresetOption.isSystem &&\n            !state.appliedViewPresetOption.isShared &&\n            !viewPresetSelectorModel.isViewPresetEdited\n          \"\n          class=\"d-icon-left-share dropdown-item\"\n          rx-id=\"share-view-preset-button\"\n          (click)=\"shareViewPreset()\"\n        >\n          {{ strings.shareLabel }}\n        </adapt-button>\n      </div>\n    </div>\n  </div>\n</ng-container>\n", styles: ["button[rx-id=toggle-button],button[rx-id=shared-view-preset]{white-space:normal;word-break:break-word}.preset-selector .dropdown-heading{padding:.375rem .875rem;font-weight:bold}.preset-selector .dropdown-item{padding-left:1.75rem}.btn-add-shared{margin-top:-1px}\n"], components: [{ type: i7.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i7.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i7.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i7.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i7.AdaptTooltipDirective, selector: "[adaptTooltip]", inputs: ["popupDelay", "placement", "width", "minWidth", "useWidthFitting", "adaptRadarDisableEventSending", "adaptTooltip", "manual"], outputs: ["shown", "hidden"], exportAs: ["tooltip"] }], pipes: { "async": i8.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewPresetSelectorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-view-preset-selector',
                    templateUrl: './view-preset-selector.component.html',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [RxViewPresetSelectorUserPreferencesService],
                    styleUrls: ['./view-preset-selector.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.RxGuidService }, { type: i2.RxModalService }, { type: i2.RxUtilityModalsService }, { type: i3.RxViewPresetSelectorUserPreferencesService }, { type: i4.TranslateService }, { type: i5.RxFeatureService }, { type: i5.RxNotificationService }, { type: i6.RxShareViewPresetService }]; }, propDecorators: { config: [{
                type: Input
            }], runtimeViewModelApi: [{
                type: Input
            }] } });
//# sourceMappingURL=view-preset-selector.component.js.map