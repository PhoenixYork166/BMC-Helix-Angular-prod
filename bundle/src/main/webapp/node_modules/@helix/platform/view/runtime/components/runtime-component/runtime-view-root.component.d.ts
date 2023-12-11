import { RuntimeViewCanvasItemComponent } from '../runtime-view-canvas/components/canvas-item/runtime-view-canvas-item.component';
import { ViewLayoutRole } from '@helix/platform/view/api';
import { RuntimeLayoutOutlet } from '../../layout';
import * as i0 from "@angular/core";
export declare class RuntimeViewRootComponent {
    runtimeCanvasItemComponent: RuntimeViewCanvasItemComponent;
    defaultOutletName: string;
    layoutRole: typeof ViewLayoutRole;
    constructor(runtimeCanvasItemComponent: RuntimeViewCanvasItemComponent);
    isHidden(outlet: RuntimeLayoutOutlet): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<RuntimeViewRootComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RuntimeViewRootComponent, "rx-runtime-view-root", never, {}, {}, never, never>;
}
