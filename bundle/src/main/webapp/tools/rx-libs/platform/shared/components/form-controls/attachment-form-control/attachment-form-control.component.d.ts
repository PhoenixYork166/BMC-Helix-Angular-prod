import { NgZone, OnInit } from '@angular/core';
import { FileObj } from '@bmc-ux/adapt-angular';
import { IFormControlComponent } from '@helix/platform/shared/api';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { IAttachmentFormControlOptions } from './attachment-form-control-options.interface';
import * as i0 from "@angular/core";
export declare class AttachmentFormControlComponent extends ValueAccessor<File[]> implements IFormControlComponent, OnInit {
    private ngZone;
    options: IAttachmentFormControlOptions;
    isDisabled: boolean;
    fileObjects: FileObj[];
    customDownload: any;
    constructor(ngZone: NgZone);
    ngOnInit(): void;
    onModelChange(files: FileObj[]): void;
    onWriteValue(value: File[]): void;
    private downloadFile;
    static ɵfac: i0.ɵɵFactoryDeclaration<AttachmentFormControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AttachmentFormControlComponent, "rx-attachment-form-control", never, { "options": "options"; "isDisabled": "isDisabled"; }, {}, never, never>;
}
