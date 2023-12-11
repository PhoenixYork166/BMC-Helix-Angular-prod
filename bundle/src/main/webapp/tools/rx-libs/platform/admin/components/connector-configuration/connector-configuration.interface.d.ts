export interface IConnector {
    id: string;
    name: string;
}
export interface IConnectorProfile {
    id: string;
    name: string;
}
export interface IConnectorConfiguration extends IConnector {
    profiles: IConnectorProfile[];
}
