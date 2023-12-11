import { RxSelectOption } from '@bmc-ux/adapt-angular';
export interface IChatbotProvider {
    chatSessionIdleTimeout: number;
    chatUserIdleTimeout: number;
    chatbotNotificationsIdleTime: number;
    chatbotNotificationsMaxTime: number;
    chatContextVariablesProcessName: string;
}
export interface IConnectionTestPayload {
    apiKey?: string;
    userName?: string;
    password?: string;
    credential?: string;
    resourceType: string;
    serviceType?: string;
}
export interface ISettingPayload {
    name: string;
    value: string;
}
export interface IServiceConfig {
    apiKey: string;
    apiKeyPropertyName: string;
    region: [RxSelectOption];
    regionPropertyName: string;
    hasApiKey: boolean;
    id: string;
    isEnabled: boolean;
    switchLabel: string;
    tooltipText: string;
}
export interface IServiceDefinitionField {
    label: string;
    name: string;
    type: string;
    readonly?: boolean;
    required?: boolean;
    rxId?: string;
    pattern?: RegExp;
}
