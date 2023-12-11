import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RxRecordInstanceService, RxRecordInstanceUtilsService } from '@helix/platform/record/api';
import { RxLogService } from '@helix/platform/shared/api';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import { isEqual } from 'lodash';
import { Observable, throwError } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, takeUntil, tap } from 'rxjs/operators';
import { RX_IMAGE_ALIGNMENT_STYLES } from '../image.types';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/record/api";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@angular/common/http";
import * as i4 from "@angular/platform-browser";
import * as i5 from "@ngx-translate/core";
import * as i6 from "@angular/common";
export class ImageComponent extends BaseViewComponent {
    constructor(rxRecordInstanceService, rxLogService, httpClient, domSanitizer, translateService, rxRecordInstanceUtilsService) {
        super();
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxLogService = rxLogService;
        this.httpClient = httpClient;
        this.domSanitizer = domSanitizer;
        this.translateService = translateService;
        this.rxRecordInstanceUtilsService = rxRecordInstanceUtilsService;
        this.state = {
            recordDefinitionName: '',
            recordInstanceId: '',
            fieldId: '',
            maxWidth: '',
            imageUrl: null,
            isImageBroken: false,
            alignmentStyle: '',
            altText: ''
        };
        this.api = {
            setProperty: this.setProperty.bind(this)
        };
        this.fileName = '';
    }
    ngOnInit() {
        super.ngOnInit();
        this.notifyPropertyChanged('api', this.api);
        const config$ = this.config.pipe(distinctUntilChanged(isEqual), tap((config) => {
            const newState = Object.assign({}, config);
            this.isHidden = newState.hidden;
            if (!this.state.alignmentStyle && newState.alignment) {
                newState.alignmentStyle = this.getAlignmentStyle(newState.alignment);
            }
            delete newState.alignment;
            this.state = Object.assign(Object.assign({}, this.state), newState);
        }), shareReplay(1));
        config$
            .pipe(map(() => (this.state.recordInstanceId ? this.state.recordInstanceId : null)), filter((recordInstanceId) => Boolean(recordInstanceId)), distinctUntilChanged(), takeUntil(this.destroyed$))
            .subscribe((recordInstanceId) => {
            const imageUrl = this.rxRecordInstanceService.getAttachmentDownloadUrl(this.state.recordDefinitionName, Number(this.state.fieldId), recordInstanceId);
            this.httpClient.get(imageUrl, { responseType: 'blob', observe: 'response' }).subscribe({
                next: (response) => {
                    const fileStream = response.body;
                    this.fileName = this.rxRecordInstanceUtilsService.tryParseContentDisposition(response.headers.get('content-disposition'));
                    if (fileStream && fileStream.type.split('/')[0] === 'image') {
                        const fileReader = new FileReader();
                        fileReader.onloadend = () => {
                            this.state.imageUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(fileReader.result);
                            this.state.isImageBroken = false;
                            this.state.altText = this.fileName;
                        };
                        fileReader.onerror = this.onImageLoadFailed.bind(this);
                        fileReader.readAsDataURL(fileStream);
                    }
                    else {
                        this.rxLogService.warning(`rx-image: attachment is not a valid image.`);
                        this.onImageLoadFailed();
                    }
                },
                error: (err) => {
                    this.state.imageUrl = null;
                    this.state.isImageBroken = false;
                    this.state.altText = '';
                }
            });
        });
    }
    onImageLoadFailed() {
        this.state.imageUrl = null;
        this.state.isImageBroken = true;
        this.state.altText = this.translateService.instant('com.bmc.arsys.rx.client.view-components.image.invalid-image.label', { imageName: this.fileName });
    }
    getAlignmentStyle(alignment) {
        return RX_IMAGE_ALIGNMENT_STYLES[alignment];
    }
    setProperty(propertyPath, value) {
        if (propertyPath === 'hidden') {
            this.isHidden = value;
            this.notifyPropertyChanged(propertyPath, this.isHidden);
        }
        else {
            return throwError(`Image: property ${propertyPath} is not settable.`);
        }
    }
}
ImageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ImageComponent, deps: [{ token: i1.RxRecordInstanceService }, { token: i2.RxLogService }, { token: i3.HttpClient }, { token: i4.DomSanitizer }, { token: i5.TranslateService }, { token: i1.RxRecordInstanceUtilsService }], target: i0.ɵɵFactoryTarget.Component });
ImageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ImageComponent, selector: "rx-image", inputs: { config: "config" }, usesInheritance: true, ngImport: i0, template: "<div *ngIf=\"!isHidden\" class=\"d-flex {{ state.alignmentStyle }} image-container\">\n  <img\n    class=\"image\"\n    *ngIf=\"state.imageUrl\"\n    [src]=\"state.imageUrl\"\n    [attr.alt]=\"state.altText\"\n    [style.max-width]=\"state.maxWidth\"\n  />\n\n  <span\n    *ngIf=\"state.isImageBroken\"\n    role=\"img\"\n    [attr.aria-label]=\"state.altText\"\n    class=\"broken-image d-icon-broken_image\"\n  ></span>\n</div>\n", styles: [".broken-image{font-size:64px}.image{align-self:flex-start}.image-container{width:100%;overflow:hidden}\n"], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ImageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-image',
                    templateUrl: './image.component.html',
                    styleUrls: ['./image.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxRecordInstanceService }, { type: i2.RxLogService }, { type: i3.HttpClient }, { type: i4.DomSanitizer }, { type: i5.TranslateService }, { type: i1.RxRecordInstanceUtilsService }]; }, propDecorators: { config: [{
                type: Input
            }] } });
//# sourceMappingURL=image.component.js.map