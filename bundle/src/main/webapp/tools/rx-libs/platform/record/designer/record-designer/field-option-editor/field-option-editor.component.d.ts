import { OnInit } from '@angular/core';
import { ValueAccessor } from '@helix/platform/shared/components';
import { RecordFieldOption } from '@helix/platform/record/api';
import * as i0 from "@angular/core";
export declare class FieldOptionEditorComponent extends ValueAccessor<RecordFieldOption> implements OnInit {
    isRequired: boolean;
    ngOnInit(): void;
    onSelectionChange(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldOptionEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FieldOptionEditorComponent, "rx-field-option-editor", never, {}, {}, never, never>;
}
