import { Injectable } from '@angular/core';
import { get, isUndefined } from 'lodash';
import { RxViewComponentType, RxViewDefinitionParserService } from '@helix/platform/view/api';
import { RecordEditorMode } from '../common/record-editor.types';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class RecordEditorComponentDefinitionAdapterService {
    constructor(viewDefinitionParserService) {
        this.viewDefinitionParserService = viewDefinitionParserService;
    }
    adaptDefinition(recordEditorComponentDefinition) {
        const properties = get(recordEditorComponentDefinition, 'propertiesByName');
        if (properties.mode === RecordEditorMode.Edit && isUndefined(properties.allowEdit)) {
            properties.allowEdit = '1';
        }
        this.viewDefinitionParserService
            .getComponents(recordEditorComponentDefinition)
            .filter((componentPair) => componentPair.componentDefinition.type !== RxViewComponentType.ActionButton &&
            (componentPair.componentDefinition.propertiesByName.hasOwnProperty('fieldId') ||
                componentPair.componentDefinition.type === RxViewComponentType.Association))
            .map((componentPair) => componentPair.componentDefinition)
            .forEach((fieldComponentDefinition) => {
            Object.assign(fieldComponentDefinition.propertiesByName, {
                api: `\${view.components.${recordEditorComponentDefinition.guid}.api}`,
                inReadState: `\${view.components.${recordEditorComponentDefinition.guid}.inReadState}`,
                recordDefinition: `\${view.components.${recordEditorComponentDefinition.guid}.recordDefinition}`,
                recordInstance: `\${view.components.${recordEditorComponentDefinition.guid}.recordInstance}`
            });
        });
    }
}
RecordEditorComponentDefinitionAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordEditorComponentDefinitionAdapterService, deps: [{ token: i1.RxViewDefinitionParserService }], target: i0.ɵɵFactoryTarget.Injectable });
RecordEditorComponentDefinitionAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordEditorComponentDefinitionAdapterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordEditorComponentDefinitionAdapterService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxViewDefinitionParserService }]; } });
//# sourceMappingURL=record-editor-component-definition-adapter.service.js.map