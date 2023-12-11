import { HttpClient } from '@angular/common/http';
import { OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RxRecordInstanceService, RxRecordInstanceUtilsService } from '@helix/platform/record/api';
import { RxLogService } from '@helix/platform/shared/api';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { IImageConfig } from './image.types';
import * as i0 from "@angular/core";
export declare class ImageComponent extends BaseViewComponent implements OnInit, OnDestroy {
    private rxRecordInstanceService;
    private rxLogService;
    private httpClient;
    private domSanitizer;
    private translateService;
    private rxRecordInstanceUtilsService;
    config: Observable<IImageConfig>;
    state: {
        recordDefinitionName: string;
        recordInstanceId: string;
        fieldId: string;
        maxWidth: string;
        imageUrl: any;
        isImageBroken: boolean;
        alignmentStyle: string;
        altText: string;
    };
    api: {
        setProperty: any;
    };
    fileName: string;
    constructor(rxRecordInstanceService: RxRecordInstanceService, rxLogService: RxLogService, httpClient: HttpClient, domSanitizer: DomSanitizer, translateService: TranslateService, rxRecordInstanceUtilsService: RxRecordInstanceUtilsService);
    ngOnInit(): void;
    private onImageLoadFailed;
    private getAlignmentStyle;
    private setProperty;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ImageComponent, "rx-image", never, { "config": "config"; }, {}, never, never>;
}
