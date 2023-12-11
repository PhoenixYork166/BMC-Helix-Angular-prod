import { Injectable } from '@angular/core';
import { RxLocalizationService } from '@helix/platform/shared/api';
import { RxUrlUtilsService } from '@helix/platform/utils';
import { TranslateService } from '@ngx-translate/core';
import { RX_RICH_TEXT } from './rich-text.constant';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/utils";
const RX_RICH_TEXT_STYLES = 'skins/rich-text/';
export class RxCkEditorConfiguratorService {
    constructor(translateService, rxLocalizationService, rxUrlUtilsService) {
        this.translateService = translateService;
        this.rxLocalizationService = rxLocalizationService;
        this.rxUrlUtilsService = rxUrlUtilsService;
    }
    getCKEditorConfig() {
        return {
            resize_enabled: false,
            title: false,
            skin: 'rich-text,' + RX_RICH_TEXT_STYLES,
            toolbar: [
                [
                    'Bold',
                    'Italic',
                    'Strike',
                    'Underline',
                    '-',
                    'NumberedList',
                    'BulletedList',
                    'Outdent',
                    'Indent',
                    '-',
                    'JustifyLeft',
                    'JustifyCenter',
                    'JustifyRight',
                    '-',
                    'Format',
                    'Styles',
                    'Font',
                    'FontSize',
                    'TextColor'
                ]
            ],
            stylesSet: [
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.italic-title'),
                    element: 'h2',
                    attributes: {
                        class: 'italic-title'
                    }
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.subtitle'),
                    element: 'h3',
                    attributes: {
                        class: 'subtitle'
                    }
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.special-container'),
                    element: 'div',
                    attributes: {
                        class: 'special-containers'
                    }
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.marker'),
                    element: 'span',
                    attributes: {
                        class: 'marker'
                    }
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.small'),
                    element: 'small'
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.computer-code'),
                    element: 'code'
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.keyboard-phrase'),
                    element: 'kbd'
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.sample-text'),
                    element: 'samp'
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.variable'),
                    element: 'var'
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.deleted-text'),
                    element: 'del'
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.inserted-text'),
                    element: 'ins'
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.cited-work'),
                    element: 'cite'
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.inline-quotation'),
                    element: 'q'
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.compact-table'),
                    element: 'table',
                    attributes: {
                        cellpadding: '5',
                        cellspacing: '0',
                        class: 'compact-table'
                    }
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.borderless-table'),
                    element: 'table',
                    attributes: {
                        class: 'borderless-table'
                    }
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.square-bulleted-list'),
                    element: 'ul',
                    attributes: {
                        class: 'square-bulleted-list'
                    }
                }
            ],
            language: this.rxLocalizationService.currentLocale,
            format_tags: 'p;h1;h2;h3;pre',
            height: '78px'
        };
    }
    getContentRules() {
        return {
            p: true,
            strong: true,
            em: true,
            s: true,
            u: true,
            ol: true,
            ul: true,
            li: true,
            small: true,
            code: true,
            kbd: true,
            samp: true,
            var: true,
            del: true,
            ins: true,
            cite: true,
            q: true,
            pre: true,
            br: true,
            span: {
                classes: 'marker',
                attributes: [RX_RICH_TEXT.expressionAttributeName, 'contenteditable', 'title'],
                styles: 'color'
            },
            h1: true,
            h2: {
                classes: 'italic-title'
            },
            h3: {
                classes: 'subtitle'
            },
            div: {
                classes: 'special-containers'
            },
            a: {
                match: (element) => this.rxUrlUtilsService.isUrlSafe(element.attributes.href),
                attributes: [
                    'target',
                    'id',
                    'dir',
                    'accesskey',
                    'lang',
                    'tabindex',
                    'title',
                    'type',
                    'charset',
                    'rel',
                    'href',
                    'name',
                    'style',
                    'class',
                    'download'
                ]
            },
            'div h1 h2 h3 p span pre li': {
                styles: 'font-size, text-align, font-family'
            }
        };
    }
}
RxCkEditorConfiguratorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCkEditorConfiguratorService, deps: [{ token: i1.TranslateService }, { token: i2.RxLocalizationService }, { token: i3.RxUrlUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxCkEditorConfiguratorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCkEditorConfiguratorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCkEditorConfiguratorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }, { type: i2.RxLocalizationService }, { type: i3.RxUrlUtilsService }]; } });
//# sourceMappingURL=ckeditor-configurator.service.js.map