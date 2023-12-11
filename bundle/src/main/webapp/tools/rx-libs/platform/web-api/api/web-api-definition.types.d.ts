import { IDefinition } from '@helix/platform/shared/api';
export interface IRequestDefinition {
    body: string;
    desc: string;
    encodeParams: boolean;
    failOnUnsuccessfulResponse: boolean;
    guid: string;
    headers: [];
    id: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    multiPartRequest: boolean;
    name: string;
    output: string;
    partNames: any[];
    path: string;
    pathParams: any[];
    queryParams: any[];
}
export interface IWebApiDefinition extends IDefinition {
    allowOverlay?: boolean;
    guid?: string;
    requestDefinitions?: IRequestDefinition[];
}
