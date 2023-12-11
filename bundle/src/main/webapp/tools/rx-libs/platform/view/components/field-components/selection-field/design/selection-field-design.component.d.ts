import { OnInit } from '@angular/core';
import { SelectionFieldDesignModel } from './selection-field-design.model';
import * as i0 from "@angular/core";
export declare class SelectionFieldDesignComponent implements OnInit {
    model: SelectionFieldDesignModel;
    isRadioButtonMode: boolean;
    ngOnInit(): void;
    setMode(mode: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectionFieldDesignComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectionFieldDesignComponent, "rx-selection-field-design", never, { "model": "model"; }, {}, never, never>;
}
