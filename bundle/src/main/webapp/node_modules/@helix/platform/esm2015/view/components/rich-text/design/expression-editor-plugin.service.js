import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class RxExpressionEditorPluginService {
    constructor() {
        const me = this;
        CKEDITOR.plugins.add('expression-editor', {
            init(editor) {
                editor.addCommand('insertExpression', {
                    exec() {
                        editor.fire('openExpressionEditor', null);
                        return true;
                    }
                });
                editor.on('doubleclick', (evt) => {
                    const element = me.getSelectedExpressionElement(evt.data.element);
                    if (element) {
                        editor.fire('openExpressionEditor', element);
                    }
                }, null, null, 0);
                editor.ui.addButton('ExpressionEditor', {
                    label: 'Insert Expression',
                    command: 'insertExpression',
                    toolbar: '',
                    icon: CKEDITOR.plugins.getPath('expression-editor') + 'toolbar.png'
                });
            }
        });
    }
    getSelectedExpressionElement(element) {
        if (element.is('span') && element.hasAttribute('rx-expression')) {
            return element;
        }
        else {
            const parentElement = element.getParent();
            if (parentElement.is('span') && parentElement.hasAttribute('rx-expression')) {
                return parentElement;
            }
        }
    }
    clearSelection(editor) {
        const selection = editor.getSelection();
        if (selection) {
            selection.removeAllRanges();
        }
    }
}
RxExpressionEditorPluginService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionEditorPluginService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxExpressionEditorPluginService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionEditorPluginService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionEditorPluginService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=expression-editor-plugin.service.js.map