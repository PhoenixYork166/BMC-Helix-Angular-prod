import { IDefinition } from '@helix/platform/shared/api';
export declare type EventAttributeDataType = 'TEXT' | 'DATETIME' | 'INTEGER' | 'BOOLEAN' | 'DECIMAL';
export interface IEventAttribute {
    dataType: EventAttributeDataType;
    defaultValue: string | Date | number | boolean;
    description: string;
    guid: string;
    isRequired: boolean;
    name: string;
}
export interface IEventDefinition extends IDefinition {
    allowOverlay?: boolean;
    eventAttributes?: IEventAttribute[];
    guid?: string;
    internal?: boolean;
    isEnabled?: boolean;
}
