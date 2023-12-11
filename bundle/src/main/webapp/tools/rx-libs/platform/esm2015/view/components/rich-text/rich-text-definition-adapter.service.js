import { Injectable } from '@angular/core';
import { RxCkEditorConfiguratorService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class RichTextDefinitionAdapterService {
    constructor(rxCkEditorConfiguratorService) {
        this.rxCkEditorConfiguratorService = rxCkEditorConfiguratorService;
        this.filter = new CKEDITOR.filter('');
        this.filter.allow(this.rxCkEditorConfiguratorService.getContentRules());
    }
    adaptDefinition(definition) {
        if (definition.propertiesByName.html) {
            const initialValue = CKEDITOR.dtd.$removeEmpty['span'];
            // Allow empty span tags, used for holding the expressions in rx-expression attributes,
            // to be parsed by CKEDITOR.htmlParser.fragment.fromHtml
            // https://stackoverflow.com/questions/18250404/ckeditor-strips-i-tag
            // @ts-ignore
            CKEDITOR.dtd.$removeEmpty['span'] = 0;
            const fragment = CKEDITOR.htmlParser.fragment.fromHtml(definition.propertiesByName.html);
            const writer = new CKEDITOR.htmlParser.basicWriter();
            // sanitize HTML
            this.filter.applyTo(fragment);
            fragment.writeHtml(writer);
            definition.propertiesByName.html = writer.getHtml(true);
            CKEDITOR.dtd.$removeEmpty['span'] = initialValue;
        }
    }
}
RichTextDefinitionAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextDefinitionAdapterService, deps: [{ token: i1.RxCkEditorConfiguratorService }], target: i0.ɵɵFactoryTarget.Injectable });
RichTextDefinitionAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextDefinitionAdapterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextDefinitionAdapterService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxCkEditorConfiguratorService }]; } });
//# sourceMappingURL=rich-text-definition-adapter.service.js.map