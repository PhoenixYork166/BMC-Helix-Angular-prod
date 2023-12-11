import { OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RxStringService } from '@helix/platform/utils';
import { IViewComponentGroup } from './view-component-group.interface';
import { IViewComponentDescriptor } from '@helix/platform/view/api';
import { IViewComponentDragData } from '../view-designer-canvas';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ViewDesignerPaletteComponent implements OnInit, OnDestroy {
    stringService: RxStringService;
    set components(value: IViewComponentDescriptor[]);
    allowedDropListIds: string[];
    filterFormControl: FormControl;
    viewComponentGroups$: Observable<IViewComponentGroup[]>;
    private componentsSubject$;
    constructor(stringService: RxStringService);
    ngOnInit(): void;
    getViewComponentDragData(descriptor: IViewComponentDescriptor): IViewComponentDragData;
    trackByNameFn<T extends {
        name: string;
    }>(index: any, item: T): string;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewDesignerPaletteComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ViewDesignerPaletteComponent, "rx-view-designer-palette", never, { "components": "components"; "allowedDropListIds": "allowedDropListIds"; }, {}, never, never>;
}
