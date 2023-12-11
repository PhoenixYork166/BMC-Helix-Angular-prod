import { ViewLayoutRole } from './view-layout.types';
export interface IOldViewLayout {
    componentDefinitionId: string;
    columns: IOldViewLayoutColumn[];
    layoutTemplate?: number;
}
export interface IOldViewLayoutColumn {
    children: IOldViewLayoutColumnChild[];
    span?: number;
}
export interface IOldViewLayoutColumnChild {
    columns: IOldViewLayoutColumn[];
    componentDefinitionId: string;
    static?: boolean;
    role?: ViewLayoutRole;
    height?: number;
}
