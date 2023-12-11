export declare enum ViewLayoutRole {
    Header = "header",
    Content = "content",
    Footer = "footer"
}
export declare enum LayoutTypes {
    Flexible = "Flexible",
    Fixed = "Fixed"
}
export interface IViewLayout {
    outlets: IViewLayoutOutlet[];
}
export interface IViewLayoutOutlet {
    name: string;
    static?: boolean;
    role?: ViewLayoutRole;
    height?: number;
    columns: IViewLayoutOutletColumn[];
}
export interface IViewLayoutOutletColumn {
    children: string[];
    cssClass?: string;
    span?: number;
}
export interface IViewLayoutTemplate {
    id: number;
    label: string;
    checksum: string;
    layout: IViewLayout;
    layoutType: LayoutTypes;
}
export declare const RX_VIEW_LAYOUTS: IViewLayoutTemplate[];
export declare function getLayoutChecksum(layout: IViewLayout): string;
