import { Observable } from 'rxjs';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { SelectGroupFieldComponent } from './select-group-field.component';
import { ISelectGroupConfig } from './select-group.types';
import * as i0 from "@angular/core";
export declare class SelectGroupComponent extends BaseViewComponent {
    config: Observable<ISelectGroupConfig>;
    private fieldComponents;
    registerFieldComponent(fieldIndex: number, component: SelectGroupFieldComponent): void;
    getValueForPreviousField(currentFieldIndex: number): any;
    resetValueForNextFields(currentFieldIndex: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectGroupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectGroupComponent, "rx-select-group", never, { "config": "config"; }, {}, never, never>;
}
