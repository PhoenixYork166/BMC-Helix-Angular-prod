import { ComponentRef } from '@angular/core';
import { IViewComponentDropData, IViewComponentDropPredicateData } from '../../interfaces/view-designer-canvas.interfaces';
import { DropListOrientation } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CanvasOutletHelperService {
    dropListOrientation: DropListOrientation;
    parentOutletComponent: any;
    containerComponentInstance: ComponentRef<any>;
    skipParentPredicate: boolean;
    dropPredicate: (data: IViewComponentDropPredicateData) => boolean;
    private beforeViewComponentDropSubject;
    beforeViewComponentDrop$: Observable<IViewComponentDropData>;
    setBeforeViewComponentDropState(viewComponentDropData: IViewComponentDropData): void;
    canBeDropped(data: IViewComponentDropPredicateData): boolean;
    componentDropPredicate(data: IViewComponentDropPredicateData, skipPredicate?: boolean): boolean;
    private _isParentRecordEditorChanging;
    static ɵfac: i0.ɵɵFactoryDeclaration<CanvasOutletHelperService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CanvasOutletHelperService>;
}
