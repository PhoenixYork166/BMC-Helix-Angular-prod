import { OnDestroy, OnInit } from '@angular/core';
import { ButtonBarDesignModel } from './button-bar-design.model';
import { RxButtonBarService } from '../button-bar.service';
import * as i0 from "@angular/core";
export declare class ButtonBarDesignComponent implements OnInit, OnDestroy {
    private rxButtonBarService;
    model: ButtonBarDesignModel;
    alignment: string;
    private destroyed$;
    constructor(rxButtonBarService: RxButtonBarService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonBarDesignComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonBarDesignComponent, "rx-button-bar-design", never, { "model": "model"; }, {}, never, never>;
}
