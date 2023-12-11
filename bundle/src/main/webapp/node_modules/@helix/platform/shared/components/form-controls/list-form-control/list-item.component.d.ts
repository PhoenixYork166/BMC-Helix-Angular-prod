import { OnInit, EventEmitter } from '@angular/core';
import { IExpressionFormControlOptions } from '../expression-form-control/expression-form-control.types';
import { IListItem } from './list-item.interface';
import { FormControl } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class ListItemComponent implements OnInit {
    config: IListItem;
    propertyPath: string;
    control: FormControl;
    events: EventEmitter<any>;
    options: IExpressionFormControlOptions;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ListItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ListItemComponent, "rx-list-item", never, { "config": "config"; "propertyPath": "propertyPath"; "control": "control"; }, { "events": "events"; }, never, never>;
}
