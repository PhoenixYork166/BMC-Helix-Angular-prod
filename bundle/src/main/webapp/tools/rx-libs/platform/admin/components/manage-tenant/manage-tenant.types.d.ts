export interface ITenant {
    name: string;
    domainIdentifier: string;
    virtualHostname: string;
    tenantId?: string;
}
export declare enum TenantFields {
    Name = "name",
    DomainIdentifier = "domainIdentifier",
    VirtualHostname = "virtualHostname"
}
