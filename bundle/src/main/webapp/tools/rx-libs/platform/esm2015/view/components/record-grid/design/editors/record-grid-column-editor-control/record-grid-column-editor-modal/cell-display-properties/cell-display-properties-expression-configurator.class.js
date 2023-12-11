import { RxExpressionConfigurator } from '@helix/platform/shared/api';
import { of } from 'rxjs';
export class RecordGridCellDisplayPropertiesExpressionConfigurator extends RxExpressionConfigurator {
    cellDisplayExpressionDataDictionary(columns) {
        if (columns.length) {
            return of(columns.map((column) => ({
                label: column.label,
                icon: 'd-icon-field_text',
                expression: `\${view.components.grid.clickableRow.${column.fieldId}}`,
                resourceType: column.fieldDefinition.resourceType
            })));
        }
        else {
            return of([]);
        }
    }
}
//# sourceMappingURL=cell-display-properties-expression-configurator.class.js.map