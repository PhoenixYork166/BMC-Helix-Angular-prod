import { IDesignerElementRegistry } from '@helix/platform/shared/api';
export interface IDesignerCanvasConfiguration {
    elementRegistry: IDesignerElementRegistry;
    enableMultiSelection: boolean;
    interactive: boolean;
    isReadOnly: boolean;
    showToolbar: boolean;
}
