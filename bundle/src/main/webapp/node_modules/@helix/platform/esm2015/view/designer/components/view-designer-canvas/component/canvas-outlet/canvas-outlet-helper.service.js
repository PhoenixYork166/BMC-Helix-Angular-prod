import { Injectable } from '@angular/core';
import { find, isFunction } from 'lodash';
import { RxViewComponentType } from '@helix/platform/view/api';
import { ReplaySubject } from 'rxjs';
import * as i0 from "@angular/core";
export class CanvasOutletHelperService {
    constructor() {
        this.beforeViewComponentDropSubject = new ReplaySubject();
        this.beforeViewComponentDrop$ = this.beforeViewComponentDropSubject.asObservable();
    }
    setBeforeViewComponentDropState(viewComponentDropData) {
        this.beforeViewComponentDropSubject.next(viewComponentDropData);
    }
    canBeDropped(data) {
        let canBeInsertedInto = true;
        if (isFunction(data.draggedViewComponentDescriptor.canBeInsertedInto)) {
            canBeInsertedInto = data.draggedViewComponentDescriptor.canBeInsertedInto(data.dropTargetViewComponentWithParents.map((component) => component.type));
        }
        if (canBeInsertedInto) {
            canBeInsertedInto =
                (!data.draggedViewComponentGuid ||
                    !this._isParentRecordEditorChanging(this.containerComponentInstance['layout'].viewComponentWithParents, data.draggedViewComponentParents)) &&
                    this.componentDropPredicate(data);
        }
        return canBeInsertedInto;
    }
    componentDropPredicate(data, skipPredicate = false) {
        return ((skipPredicate || this.dropPredicate(data)) &&
            (!this.parentOutletComponent || this.parentOutletComponent.componentDropPredicate(data, this.skipParentPredicate)));
    }
    _isParentRecordEditorChanging(targetContainerParentComponents, sourceComponentParentComponents) {
        const targetRecordEditor = find(targetContainerParentComponents, {
            type: RxViewComponentType.RecordEditor
        });
        const sourceRecordEditor = find(sourceComponentParentComponents, {
            type: RxViewComponentType.RecordEditor
        });
        const isMovingBetweenRecordEditors = Boolean(targetRecordEditor) && Boolean(sourceRecordEditor) && targetRecordEditor.guid !== sourceRecordEditor.guid;
        const isDroppingOutsideRecordEditor = !targetRecordEditor && Boolean(sourceRecordEditor);
        const isDroppingInsideRecordEditor = !sourceRecordEditor && Boolean(targetRecordEditor);
        return isMovingBetweenRecordEditors || isDroppingOutsideRecordEditor || isDroppingInsideRecordEditor;
    }
}
CanvasOutletHelperService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CanvasOutletHelperService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CanvasOutletHelperService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CanvasOutletHelperService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CanvasOutletHelperService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=canvas-outlet-helper.service.js.map