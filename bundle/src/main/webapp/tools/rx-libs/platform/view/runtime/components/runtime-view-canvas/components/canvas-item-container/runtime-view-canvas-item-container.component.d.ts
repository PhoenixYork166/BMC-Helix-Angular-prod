import { RuntimeLayoutItem, RuntimeLayoutOutlet, RuntimeLayoutOutletColumn } from '../../../../layout';
import * as i0 from "@angular/core";
export declare class RuntimeViewCanvasItemContainerComponent {
    columns: RuntimeLayoutOutletColumn[];
    outlet: RuntimeLayoutOutlet;
    get hostClass(): string;
    trackByFn(index: number, item: RuntimeLayoutItem): string | number;
    static ɵfac: i0.ɵɵFactoryDeclaration<RuntimeViewCanvasItemContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RuntimeViewCanvasItemContainerComponent, "rx-runtime-view-canvas-item-container", never, { "columns": "columns"; "outlet": "outlet"; }, {}, never, never>;
}
