import { Injectable } from '@angular/core';
import { has } from 'lodash';
import { RX_DATA_DICTIONARY_ITEM_PLUGIN } from './data-dictionary-item-plugin.constant';
import * as i0 from "@angular/core";
export class RxDataDictionaryItemPluginService {
    constructor() {
        CKEDITOR.plugins.add(RX_DATA_DICTIONARY_ITEM_PLUGIN.name, {
            requires: 'widget',
            init(editor) {
                editor.widgets.add('rx-data-dictionary-item-widget', {
                    inline: true,
                    upcast(element) {
                        return has(element.attributes, RX_DATA_DICTIONARY_ITEM_PLUGIN.widgetAttributeName);
                    },
                    downcast(element) {
                        return new CKEDITOR.htmlParser.cdata(element.attributes[RX_DATA_DICTIONARY_ITEM_PLUGIN.widgetAttributeName]);
                    },
                    // @ts-ignore
                    // https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_plugins_widget_definition.html#method-getClipboardHtml
                    getClipboardHtml() {
                        return this.element.getAttributes()[RX_DATA_DICTIONARY_ITEM_PLUGIN.widgetAttributeName];
                    }
                });
            }
        });
    }
}
RxDataDictionaryItemPluginService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataDictionaryItemPluginService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxDataDictionaryItemPluginService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataDictionaryItemPluginService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataDictionaryItemPluginService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data-dictionary-item-plugin.service.js.map