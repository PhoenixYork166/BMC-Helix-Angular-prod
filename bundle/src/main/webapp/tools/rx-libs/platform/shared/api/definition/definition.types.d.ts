import { IOverlayDescriptor } from '../overlay/overlay.types';
export interface IDefinition {
    description?: string;
    lastChangedBy?: string;
    lastUpdateTime?: string;
    name?: string;
    overlayDescriptor?: IOverlayDescriptor;
    overlayGroupId?: string;
    owner?: string;
    scope?: string;
    tags?: string[];
    version?: string;
}
export declare type DefinitionType = 'record' | 'view' | 'process' | 'rule' | 'association' | 'named-list' | 'document' | 'web-api' | 'event' | 'event-statistics' | 'chatbot' | 'config' | 'shell';
