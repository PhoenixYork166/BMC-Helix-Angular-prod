import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RxBundleCacheService, RxOverlayService, RX_OVERLAY } from '@helix/platform/shared/api';
import { RxModalService } from '@helix/platform/ui-kit';
import { noop } from 'lodash';
import { take } from 'rxjs/operators';
import { CoarseGrainedCustomizationOptionsEditorComponent } from '../../coarse-grained-customization-options-editor/coarse-grained-customization-options-editor.component';
import { ValueAccessor } from '../../form-builder/value-accessor';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@ngx-translate/core";
export class CustomizationOptionsComponent extends ValueAccessor {
    constructor(rxModalService, rxBundleCacheService, rxOverlayService) {
        super();
        this.rxModalService = rxModalService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxOverlayService = rxOverlayService;
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
        return this.rxOverlayService.getOverlayOperation(this.options.overlayGroupId, ((_a = this.options.overlayDescriptor) === null || _a === void 0 ? void 0 : _a.parentOverlayGroupId) || null);
    }
    updateValues() {
        this.setAllowOverlayLabel(this.options.allowOverlay);
        this.rxBundleCacheService
            .getDefinitionScopeName(this.options.scope)
            .pipe(take(1))
            .subscribe((definitionScopeName) => (this.definitionScopeName = definitionScopeName));
        this.rxBundleCacheService
            .getDefinitionScopeSelectionOptions()
            .pipe(take(1))
            .subscribe((scopeSelectionOptions) => (this.scopeSelectionOptions = scopeSelectionOptions));
        if (this.options.overlayGroupId) {
            this.overlayOperation = this.getOverlayOperation();
        }
        else {
            this.overlayOperation = RX_OVERLAY.operationTypes.createdInThisOverlayGroup;
        }
    }
    openCustomizationOptionsEditor() {
        this.rxModalService
            .openModal({
            title: 'Scope/Customization options',
            content: CoarseGrainedCustomizationOptionsEditorComponent,
            blockKeyboard: false,
            size: 'sm',
            data: {
                definitionScopeName: this.definitionScopeName,
                allowOverlay: this.options.allowOverlay,
                scopeSelectionOptions: this.scopeSelectionOptions,
                isDisabled: this.options.isDisabled,
                overlayOperation: this.overlayOperation,
                definitionTypeDisplayName: this.options.definitionTypeDisplayName
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
}
CustomizationOptionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CustomizationOptionsComponent, deps: [{ token: i1.RxModalService }, { token: i2.RxBundleCacheService }, { token: i2.RxOverlayService }], target: i0.ɵɵFactoryTarget.Component });
CustomizationOptionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CustomizationOptionsComponent, selector: "rx-scope-customization-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: CustomizationOptionsComponent,
            multi: true
        }
    ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<div class=\"d-flex\">\n  <adapt-button\n    btn-type=\"tertiary\"\n    rx-id=\"open-customization-options-editor-link\"\n    (click)=\"openCustomizationOptionsEditor()\"\n    class=\"p-0\"\n  >\n    {{ 'com.bmc.arsys.rx.client.designer.scope-customization-options.title' | translate }}\n  </adapt-button>\n  <adapt-icon\n    name=\"question_circle_o\"\n    class=\"ml-2\"\n    placement=\"right\"\n    maxWidth=\"400\"\n    [adaptPopover]=\"'com.bmc.arsys.rx.client.designer.scope-customization-options.scope.tooltip' | translate\"\n  >\n  </adapt-icon>\n</div>\n\n<p rx-id=\"scope-name-label\" class=\"mb-0 pt-2\">\n  {{\n    'com.bmc.arsys.rx.client.designer.scope-customization-options.scope.label'\n      | translate: { definitionScopeName: definitionScopeName }\n  }}\n</p>\n<div rx-id=\"customization-options-label\" class=\"pt-2\">\n  {{\n    'com.bmc.arsys.rx.client.designer.scope-customization-options.customization.label'\n      | translate: { allowOverlayLabel: allowOverlayLabel }\n  }}\n</div>\n", components: [{ type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i3.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i3.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CustomizationOptionsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-scope-customization-control',
                    templateUrl: './customization-options.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: CustomizationOptionsComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.RxBundleCacheService }, { type: i2.RxOverlayService }]; }, propDecorators: { options: [{
                type: Input
            }] } });
//# sourceMappingURL=customization-options.component.js.map