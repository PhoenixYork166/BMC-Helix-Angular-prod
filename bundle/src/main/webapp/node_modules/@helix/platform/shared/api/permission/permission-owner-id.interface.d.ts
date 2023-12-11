export interface IPermissionOwnerId {
    value: number;
    type: 'GROUP' | 'ROLE' | 'USER';
    name: string;
    roleApplicationName?: string;
}
