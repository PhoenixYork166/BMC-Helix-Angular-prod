export interface ICatalogItem {
    id: string;
    name: string;
    groupName: string;
    guid: string;
}
export interface ICatalog {
    catalogDetailsList: ICatalogItem[];
}
