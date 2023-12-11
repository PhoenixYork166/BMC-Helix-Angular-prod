import { EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop/drag-events';
import { IDesignerPaletteTree } from './designer-palette.interfaces';
import * as i0 from "@angular/core";
export declare class RxDesignerPaletteComponent {
    tree: IDesignerPaletteTree[];
    elementDropped: EventEmitter<CdkDragDrop<any, any>>;
    searchField: FormControl;
    onDropListDropped(dropData: CdkDragDrop<any>): void;
    trackByLabelFn<T extends {
        label: string;
    }>(index: any, item: T): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxDesignerPaletteComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxDesignerPaletteComponent, "rx-designer-palette", never, { "tree": "tree"; }, { "elementDropped": "elementDropped"; }, never, never>;
}
