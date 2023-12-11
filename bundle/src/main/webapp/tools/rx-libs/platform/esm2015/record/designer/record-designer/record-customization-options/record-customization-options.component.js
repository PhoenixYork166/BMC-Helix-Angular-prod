import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RX_OVERLAY, RxBundleCacheService, RxOverlayService } from '@helix/platform/shared/api';
import { ValueAccessor } from '@helix/platform/shared/components';
import { RxModalService } from '@helix/platform/ui-kit';
import { noop } from 'lodash';
import { RecordCustomizationOptionsEditorComponent } from './record-customization-options-editor.component';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@angular/common";
export class RecordCustomizationOptionsComponent extends ValueAccessor {
    constructor(rxModalService, rxBundleCacheService, rxOverlayService, translateService) {
        super();
        this.rxModalService = rxModalService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxOverlayService = rxOverlayService;
        this.translateService = translateService;
        this.scopeNameSubject = new BehaviorSubject('');
        this.scopeSelectionOptions$ = this.rxBundleCacheService.getDefinitionScopeSelectionOptions().pipe(map((scopeSelectionOptions) => scopeSelectionOptions), tap((scopeSelectionOptions) => (this.scopeSelectionOptions = scopeSelectionOptions)));
        this.definitionScopeName$ = this.scopeNameSubject.pipe(mergeMap((scopeName) => this.rxBundleCacheService.getDefinitionScopeName(scopeName).pipe(map((definitionScopeName) => definitionScopeName), tap((definitionScopeName) => (this.definitionScopeName = definitionScopeName)))));
        this.vm$ = combineLatest([this.definitionScopeName$, this.scopeSelectionOptions$]).pipe(map(([definitionScopeName, scopeSelectionOptions]) => ({
            definitionScopeName,
            scopeSelectionOptions
        })));
    }
    ngOnInit() {
        if (this.options) {
            this.updateValues();
        }
    }
    ngOnChanges(changes) {
        if (changes.options) {
            this.updateValues();
        }
    }
    getOverlayOperation() {
        var _a;
        return this.rxOverlayService.getOverlayOperation(this.options.recordDefinition.overlayGroupId, ((_a = this.options.recordDefinition.overlayDescriptor) === null || _a === void 0 ? void 0 : _a.parentOverlayGroupId) || null);
    }
    updateValues() {
        this.setAllowOverlayLabel(this.options.recordDefinition.customizationOptions.allowOtherPropertiesOverlay);
        this.scopeNameSubject.next(this.options.recordDefinition.customizationOptions.scope);
        if (this.options.recordDefinition.overlayGroupId) {
            this.overlayOperation = this.getOverlayOperation();
        }
        else {
            this.overlayOperation = RX_OVERLAY.operationTypes.createdInThisOverlayGroup;
        }
    }
    openCustomizationOptionsEditor() {
        this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.designer.scope-customization-options.title'),
            content: RecordCustomizationOptionsEditorComponent,
            blockKeyboard: false,
            data: {
                definitionScopeName: this.definitionScopeName,
                allowOverlay: this.options.recordDefinition.customizationOptions.allowOtherPropertiesOverlay,
                scopeSelectionOptions: this.scopeSelectionOptions,
                isDisabled: this.options.isDisabled,
                overlayOperation: this.overlayOperation,
                definitionTypeDisplayName: this.options.definitionTypeDisplayName,
                recordDefinition: this.options.recordDefinition
            }
        })
            .then((result) => {
            this.setAllowOverlayLabel(result.allowOverlay);
            this.definitionScopeName = this.scopeSelectionOptions.find((value) => value.id === result.scope).name;
            this.value = result;
        })
            .catch(noop);
    }
    setAllowOverlayLabel(allowOverlay) {
        this.allowOverlayLabel = allowOverlay
            ? RX_OVERLAY.overlayAllowedLabels.allowed
            : RX_OVERLAY.overlayAllowedLabels.notAllowed;
    }
    ngOnDestroy() {
        this.scopeNameSubject.complete();
    }
}
RecordCustomizationOptionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordCustomizationOptionsComponent, deps: [{ token: i1.RxModalService }, { token: i2.RxBundleCacheService }, { token: i2.RxOverlayService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RecordCustomizationOptionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordCustomizationOptionsComponent, selector: "rx-scope-record-customization-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RecordCustomizationOptionsComponent,
            multi: true
        }
    ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <adapt-button\n    btn-type=\"tertiary\"\n    rx-id=\"open-customization-options-editor-link\"\n    (click)=\"openCustomizationOptionsEditor()\"\n    class=\"p-0\"\n  >\n    {{ 'com.bmc.arsys.rx.client.designer.scope-customization-options.title' | translate }}\n  </adapt-button>\n\n  <adapt-icon\n    name=\"question_circle_o\"\n    class=\"ml-2\"\n    placement=\"right\"\n    [adaptPopover]=\"'com.bmc.arsys.rx.client.designer.scope-customization-options.scope.tooltip' | translate\"\n  >\n  </adapt-icon>\n\n  <p rx-id=\"scope\" class=\"mb-0 pt-2\">\n    {{\n      'com.bmc.arsys.rx.client.designer.scope-customization-options.scope.label'\n        | translate: { definitionScopeName: vm.definitionScopeName }\n    }}\n  </p>\n\n  <div rx-id=\"customization\" class=\"pt-2\">\n    {{\n      'com.bmc.arsys.rx.client.designer.scope-customization-options.customization.label'\n        | translate: { allowOverlayLabel: allowOverlayLabel }\n    }}\n  </div>\n</ng-container>\n", components: [{ type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i4.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }], pipes: { "async": i5.AsyncPipe, "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordCustomizationOptionsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-scope-record-customization-control',
                    templateUrl: './record-customization-options.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RecordCustomizationOptionsComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.RxBundleCacheService }, { type: i2.RxOverlayService }, { type: i3.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }] } });
//# sourceMappingURL=record-customization-options.component.js.map