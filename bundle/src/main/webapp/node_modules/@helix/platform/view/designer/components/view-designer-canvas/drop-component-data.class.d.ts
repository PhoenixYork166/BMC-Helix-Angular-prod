import { IViewComponentDropData } from './interfaces/view-designer-canvas.interfaces';
export declare class DropComponentData {
    data: IViewComponentDropData;
    targetGuid: string;
    outletName: string;
    insertIndex: number;
    constructor(data: IViewComponentDropData, targetGuid: string, outletName: string, insertIndex: number);
}
