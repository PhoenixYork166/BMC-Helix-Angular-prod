import { OnDestroy, OnInit } from '@angular/core';
import { BooleanFieldDesignModel } from './boolean-field-design.model';
import * as i0 from "@angular/core";
export declare class BooleanFieldDesignComponent implements OnInit, OnDestroy {
    model: BooleanFieldDesignModel;
    booleanValue: boolean;
    shouldDisplayAsCheckbox: boolean;
    private destroyed$;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BooleanFieldDesignComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BooleanFieldDesignComponent, "rx-boolean-field-design", never, { "model": "model"; }, {}, never, never>;
}
