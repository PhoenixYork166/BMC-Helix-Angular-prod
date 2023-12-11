import { IDefinition } from '@helix/platform/shared/api';
export interface IDocumentDefinition extends IDefinition {
    allowOverlay?: boolean;
    documentSchema?: string;
    guid?: string;
}
