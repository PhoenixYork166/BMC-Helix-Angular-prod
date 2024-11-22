import { NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RxExpressionParserService } from '@helix/platform/shared/api';
import { RxExpressionEditorService } from '@helix/platform/shared/components';
import { RxTreeService } from '@helix/platform/utils';
import { CKEditor4, CKEditorComponent } from 'ckeditor4-angular';
import { RichTextDesignModel } from './rich-text-design.model';
import * as i0 from "@angular/core";
export declare class RichTextDesignComponent implements OnInit, OnDestroy {
    private rxExpressionEditorService;
    private rxTreeService;
    private rxExpressionParserService;
    private renderer2;
    private document;
    private ngZone;
    constructor(rxExpressionEditorService: RxExpressionEditorService, rxTreeService: RxTreeService, rxExpressionParserService: RxExpressionParserService, renderer2: Renderer2, document: any, ngZone: NgZone);
    model: RichTextDesignModel;
    isReadOnly: boolean;
    type: CKEditor4.EditorType;
    ckConfig: CKEditor4.Config;
    formControl: FormControl;
    ckEditor: CKEditorComponent;
    private flatDataDictionary;
    private destroyed$;
    private removeExpressionLabels;
    private addExpressionLabels;
    ngOnInit(): void;
    onEditorReady(event: CKEditor4.EventInfo): void;
    ngOnDestroy(): void;
    private getExpressionWithLabels;
    private moveCursorToEnd;
    private setExpressionLabelHtml;
    static ɵfac: i0.ɵɵFactoryDeclaration<RichTextDesignComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RichTextDesignComponent, "rx-rich-text-design", never, { "model": "model"; "isReadOnly": "isReadOnly"; }, {}, never, never>;
}
