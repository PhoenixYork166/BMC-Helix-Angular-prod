import { Injector } from '@angular/core';
import { RxLocalizationService } from '@helix/platform/shared/api';
import { IViewComponent } from '@helix/platform/view/runtime';
import { BaseRecordEditorFieldComponent } from '../../base-record-editor-field/runtime/base-record-editor-field-component.class';
import { IBaseRecordEditorFieldComponentConfig } from '../../base-record-editor-field/runtime/base-record-editor-field-component.types';
import { RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class LocalizedCharacterFieldComponent extends BaseRecordEditorFieldComponent implements IViewComponent {
    private rxModalService;
    private rxLocalizationService;
    private hideCurrentLocale;
    constructor(injector: Injector, rxModalService: RxModalService, rxLocalizationService: RxLocalizationService);
    onConfigUpdated(config: IBaseRecordEditorFieldComponentConfig): void;
    shouldShowValidationError(): boolean;
    selectLocalizedValue(): void;
    private setLocalizedFieldValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<LocalizedCharacterFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LocalizedCharacterFieldComponent, "rx-localized-character-field", never, {}, {}, never, never>;
}
