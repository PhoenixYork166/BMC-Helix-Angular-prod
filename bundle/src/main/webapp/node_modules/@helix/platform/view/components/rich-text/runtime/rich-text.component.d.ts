/// <reference types="ckeditor" />
import { OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { BaseViewComponent, IViewComponentSetProperty } from '@helix/platform/view/runtime';
import { IRichTextConfig } from './rich-text.types';
import { RxCkEditorConfiguratorService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export declare class RichTextComponent extends BaseViewComponent implements OnInit, IViewComponentSetProperty {
    private sanitizer;
    private rxCkEditorConfiguratorService;
    config: Observable<IRichTextConfig>;
    html: SafeHtml;
    filter: CKEDITOR.filter;
    api: {
        setProperty: any;
    };
    constructor(sanitizer: DomSanitizer, rxCkEditorConfiguratorService: RxCkEditorConfiguratorService);
    ngOnInit(): void;
    updateHtml(value: string): SafeHtml;
    setProperty(propertyPath: string, value: any): void | Observable<never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RichTextComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RichTextComponent, "rx-rich-text", never, { "config": "config"; }, {}, never, never>;
}
