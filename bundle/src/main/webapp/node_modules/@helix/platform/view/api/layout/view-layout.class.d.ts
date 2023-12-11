import { IViewLayout, IViewLayoutOutlet } from './view-layout.types';
export declare class RxViewLayout {
    static getViewLayoutForDefaultOutlet(children?: string[]): IViewLayout;
    static getEmptyViewLayoutForOutletNames(list: {
        name: string;
    }[]): IViewLayout;
    static getEmptyViewLayoutForOutlets(outlets: IViewLayoutOutlet[]): IViewLayout;
    static getOutlet(name?: string, children?: string[]): IViewLayoutOutlet;
    static getViewLayoutChildGuids(layout: IViewLayout, outletName?: string): string[];
    static hasChild(layout: IViewLayout, guid: string): boolean;
    static outletHasChild(outlet: IViewLayoutOutlet, guid: string): boolean;
    static getViewLayoutTemplate(layoutTemplate: number): IViewLayout;
    static getLayoutName(layout: IViewLayout): string;
    static removeChildFromLayout(layout: IViewLayout, guidToRemove: string): IViewLayout;
}
