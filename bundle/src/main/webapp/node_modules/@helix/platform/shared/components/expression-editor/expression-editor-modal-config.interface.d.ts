import { IExpressionEditorConfig } from './expression-editor.interfaces';
export interface IExpressionEditorModalConfig extends IExpressionEditorConfig {
    api: {
        writeValue: (propertyName: string, propertyValue: string) => {};
    };
}
