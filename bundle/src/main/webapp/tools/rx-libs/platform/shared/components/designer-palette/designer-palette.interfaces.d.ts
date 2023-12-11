import { IDesignerPaletteItem } from '@helix/platform/shared/api';
export interface IDesignerPaletteNode {
    group: string;
    label: string;
    paletteItem: IDesignerPaletteItem;
    value: {
        [name: string]: string;
    };
}
export interface IDesignerPaletteTree {
    label: string;
    children: IDesignerPaletteNode[];
}
