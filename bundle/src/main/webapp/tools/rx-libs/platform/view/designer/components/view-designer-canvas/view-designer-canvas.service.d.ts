import { Observable } from 'rxjs';
import { DropComponentData } from './drop-component-data.class';
import { IViewComponentDropData } from './interfaces/view-designer-canvas.interfaces';
import * as i0 from "@angular/core";
export declare class ViewDesignerCanvasService {
    private componentSelectSubject;
    private componentRemoveSubject;
    private componentDropSubject;
    componentDrop$: Observable<DropComponentData>;
    componentSelect$: Observable<any>;
    componentRemove$: Observable<string>;
    selectComponent(guid: string): void;
    removeComponent(guid: string): void;
    dropComponent(data: IViewComponentDropData, targetGuid: string, outletName: string, insertIndex: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewDesignerCanvasService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ViewDesignerCanvasService>;
}
