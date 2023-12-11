import { ElementRef, Injector, Renderer2 } from '@angular/core';
import { AdaptModalService } from '@bmc-ux/adapt-angular';
import { IFormFocusable } from '@helix/platform/shared/api';
import { InspectorWidgetBase } from '@helix/platform/shared/components';
import { RecordEditorDesignModel } from '../../record-editor-design.model';
import { IRecordEditorFieldsControlOptions } from './fields-inspector-widget.types';
import * as i0 from "@angular/core";
export declare class FieldsInspectorWidgetComponent extends InspectorWidgetBase<IRecordEditorFieldsControlOptions, RecordEditorDesignModel> implements IFormFocusable {
    private adaptModalService;
    private renderer;
    encapsulateClass: boolean;
    openModalButton: ElementRef;
    constructor(injector: Injector, adaptModalService: AdaptModalService, renderer: Renderer2);
    focus(): void;
    openModal(): void;
    removeField(guid: string): void;
    trackByGuid<T extends {
        guid: string;
    }>(index: number, item: T): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldsInspectorWidgetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FieldsInspectorWidgetComponent, "rx-fields-inspector-widget", never, {}, {}, never, never>;
}
