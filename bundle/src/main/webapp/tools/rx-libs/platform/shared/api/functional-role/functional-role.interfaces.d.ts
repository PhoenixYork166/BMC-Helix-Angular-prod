export interface IApplicationRoles {
    [applicationName: string]: string[];
}
export interface IFunctionalRoleDescriptor {
    id?: string;
    name: string;
    applicationName: string;
}
export interface IFunctionalRole extends IFunctionalRoleDescriptor {
    description: string;
    applicationRoles: IApplicationRoles;
}
