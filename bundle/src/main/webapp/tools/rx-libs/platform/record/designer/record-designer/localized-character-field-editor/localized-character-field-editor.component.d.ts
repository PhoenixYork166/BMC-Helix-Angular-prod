import { RxModalService } from '@helix/platform/ui-kit';
import { ValueAccessor } from '@helix/platform/shared/components';
import { TranslateService } from '@ngx-translate/core';
import { IPlainObject } from '@helix/platform/shared/api';
import { ILocalizedCharacterFieldEditorOptions } from './localized-character-field-editor.interface';
import * as i0 from "@angular/core";
export declare class LocalizedCharacterFieldEditorComponent extends ValueAccessor<IPlainObject> {
    private rxModalService;
    private translateService;
    options: ILocalizedCharacterFieldEditorOptions;
    constructor(rxModalService: RxModalService, translateService: TranslateService);
    localize(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LocalizedCharacterFieldEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LocalizedCharacterFieldEditorComponent, "rx-localized-character-field-editor", never, { "options": "options"; }, {}, never, never>;
}
