import { RuntimeLayoutItem } from './runtime-layout-item.class';
export declare class RuntimeLayoutOutletColumn {
    children: RuntimeLayoutItem[];
    cssClass?: string;
    span?: number;
}
export declare class RuntimeLayoutOutlet {
    name: string;
    children: RuntimeLayoutItem[];
    columns: RuntimeLayoutOutletColumn[];
    height: number;
}
