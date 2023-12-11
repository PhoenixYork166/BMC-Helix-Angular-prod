import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RxActionButtonService } from '../action-button.service';
import { ActionButtonDesignModel } from './action-button-design.model';
import { ActionButtonSize } from '../action-button.types';
import * as i0 from "@angular/core";
export declare class ActionButtonDesignComponent implements OnInit {
    private rxActionButtonService;
    model: ActionButtonDesignModel;
    iconCssClass$: Observable<string>;
    buttonType$: Observable<any>;
    size$: Observable<ActionButtonSize>;
    constructor(rxActionButtonService: RxActionButtonService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ActionButtonDesignComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ActionButtonDesignComponent, "rx-action-button-design", never, { "model": "model"; }, {}, never, never>;
}
