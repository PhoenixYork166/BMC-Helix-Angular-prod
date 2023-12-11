import { Component, HostBinding, Input } from '@angular/core';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxLogService, RxNotificationService } from '@helix/platform/shared/api';
import { RxViewComponentType } from '@helix/platform/view/api';
import { BaseViewComponent, RuntimeViewModelApi } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import { find, includes } from 'lodash';
import { Observable, throwError } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RxActionButtonService } from '../action-button.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@ngx-translate/core";
import * as i3 from "../action-button.service";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@angular/common";
export class ActionButtonComponent extends BaseViewComponent {
    constructor(rxLogService, translateService, rxNotificationService, rxActionButtonService) {
        super();
        this.rxLogService = rxLogService;
        this.translateService = translateService;
        this.rxNotificationService = rxNotificationService;
        this.rxActionButtonService = rxActionButtonService;
        this.api = {
            click: this.click.bind(this),
            setProperty: this.setProperty.bind(this)
        };
        this.state = {};
        this.isActionInProgress = false;
        this.isDisabled = false;
        this.buttonType = '';
    }
    get hostClass() {
        const state = this.state;
        const className = `${RxViewComponentType.ActionButton}_${state.style}`;
        return state.styles ? `${className} ${state.styles}` : className;
    }
    ngOnInit() {
        this.notifyPropertyChanged('api', this.api);
        this.config.pipe(takeUntil(this.destroyed$)).subscribe((config) => {
            Object.assign(this.state, config);
            if (config.labelKey) {
                this.state.buttonLabel = this.translateService.instant(config.labelKey);
            }
            else {
                this.state.buttonLabel = config.label;
            }
            this.state.icon = '';
            this.state.cls = config.cls || '';
            if (config.iconCls || config.icon) {
                const icon = config.iconCls || config.icon;
                const iconAlignment = ((config.label || config.labelKey) && config.iconAlignment) || 'left';
                this.state.icon = this.rxActionButtonService.getIconCssClass(icon, iconAlignment);
            }
            if (config.iconCls && config.icon) {
                this.rxLogService.warning('iconCls option is specified, icon will be ignored.');
            }
            if (!config.cls) {
                this.buttonType = this.rxActionButtonService.getButtonType(this.state.style);
            }
            if (config.cls && config.style) {
                this.rxLogService.warning('cls option is specified, style will be ignored.');
            }
            this.validateRecordDefinitionName();
            this.isHidden = this.isHiddenFunc();
            this.isDisabled = this.isDisabledFunc();
        });
    }
    // api
    click() {
        if (!this.isDisabled) {
            this.isActionInProgress = true;
            this.isDisabled = true;
            return this
                .triggerViewActions()
                .then((res) => {
                this.isActionInProgress = false;
                this.isDisabled = this.isDisabledFunc();
            })
                .catch((err) => {
                this.isActionInProgress = false;
                this.isDisabled = this.isDisabledFunc();
            });
        }
    }
    isDisabledFunc() {
        return (Boolean(this.state.disabled) ||
            this.isActionInProgress ||
            (this.state.recordInstance &&
                this.state.fieldId &&
                this.state.recordInstance.recordDefinitionName === this.state.recordDefinitionName &&
                find(this.state.recordInstance.fieldInstances, { id: Number(this.state.fieldId) }) &&
                find(this.state.recordInstance.fieldInstances, { id: Number(this.state.fieldId) }).permissionType ===
                    RX_RECORD_DEFINITION.fieldPermissionTypes.view));
    }
    isHiddenFunc() {
        return (this.isHidden =
            Boolean(this.state.hidden) ||
                (this.state.recordInstance &&
                    (this.state.recordInstance.recordDefinitionName !== this.state.recordDefinitionName ||
                        (this.state.fieldId &&
                            !find(this.state.recordInstance.fieldInstances, { id: Number(this.state.fieldId) })))));
    }
    setProperty(propertyPath, value) {
        if (includes(['hidden', 'disabled'], propertyPath)) {
            this.state[propertyPath] = value;
            this.notifyPropertyChanged(propertyPath, this.state[propertyPath]);
        }
        else {
            return throwError(`Action Button: property ${propertyPath} is not settable.`);
        }
    }
    validateRecordDefinitionName() {
        if (this.state.recordInstance &&
            this.state.recordInstance.recordDefinitionName !== this.state.recordDefinitionName) {
            const buttonName = this.translateService.instant('com.bmc.arsys.rx.client.view-components.action-button.component-name.label', {
                label: this.state.label
            });
            const errorMessage = this.translateService.instant('com.bmc.arsys.rx.client.view-components.action-button.configuration-error.message', {
                componentName: buttonName
            });
            this.rxNotificationService.addErrorMessage(errorMessage);
        }
    }
}
ActionButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionButtonComponent, deps: [{ token: i1.RxLogService }, { token: i2.TranslateService }, { token: i1.RxNotificationService }, { token: i3.RxActionButtonService }], target: i0.ɵɵFactoryTarget.Component });
ActionButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ActionButtonComponent, selector: "rx-action-button", inputs: { guid: "guid", config: "config", runtimeViewModelApi: "runtimeViewModelApi" }, host: { properties: { "class": "this.hostClass" } }, usesInheritance: true, ngImport: i0, template: "<button\n  adapt-button\n  type=\"button\"\n  class=\"mw-100 rx-ellipsis\"\n  *ngIf=\"!isHidden\"\n  [btn-type]=\"buttonType\"\n  [ngClass]=\"[state.icon, state.cls]\"\n  [disabled]=\"isDisabled\"\n  [size]=\"state.size\"\n  (click)=\"api.click($event)\"\n>\n  <span>{{ state.buttonLabel }}</span>\n</button>\n", styles: [":host{display:block}\n"], components: [{ type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionButtonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-action-button',
                    templateUrl: './action-button.component.html',
                    styleUrls: ['./action-button.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxLogService }, { type: i2.TranslateService }, { type: i1.RxNotificationService }, { type: i3.RxActionButtonService }]; }, propDecorators: { guid: [{
                type: Input
            }], config: [{
                type: Input
            }], runtimeViewModelApi: [{
                type: Input
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });
//# sourceMappingURL=action-button.component.js.map