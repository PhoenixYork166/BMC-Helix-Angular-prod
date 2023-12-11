import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'lodash';
import { RxModalService } from '@helix/platform/ui-kit';
import { LocalizedCharacterFieldValueModalComponent, ValueAccessor } from '@helix/platform/shared/components';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@ngx-translate/core";
export class LocalizedCharacterFieldEditorComponent extends ValueAccessor {
    constructor(rxModalService, translateService) {
        super();
        this.rxModalService = rxModalService;
        this.translateService = translateService;
    }
    localize() {
        this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.title'),
            data: {
                valueByLocale: Object.assign({}, this.value),
                hideCurrentLocale: true,
                isReadOnly: this.options.isReadOnly
            },
            size: 'sm',
            content: LocalizedCharacterFieldValueModalComponent
        })
            .then((data) => {
            if (data) {
                this.value = data.valueByLocale;
            }
        })
            .catch(noop);
    }
}
LocalizedCharacterFieldEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LocalizedCharacterFieldEditorComponent, deps: [{ token: i1.RxModalService }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
LocalizedCharacterFieldEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: LocalizedCharacterFieldEditorComponent, selector: "rx-localized-character-field-editor", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: LocalizedCharacterFieldEditorComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<div>\n  <button\n    type=\"button\"\n    class=\"localize-button btn btn-link focusable d-icon-left-pencil p-0 float-end\"\n    (click)=\"localize()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.view-components.localized-character-field.button.localize.label' | translate }}\n  </button>\n\n  <div class=\"pl-1\">{{ value['en-US'] }}</div>\n</div>\n", pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LocalizedCharacterFieldEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-localized-character-field-editor',
                    templateUrl: './localized-character-field-editor.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: LocalizedCharacterFieldEditorComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }] } });
//# sourceMappingURL=localized-character-field-editor.component.js.map