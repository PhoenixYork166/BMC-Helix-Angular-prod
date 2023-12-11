import { IDefinition } from '@helix/platform/shared/api';
export declare enum RxCardinalityType {
    OneToOne = "ONE_TO_ONE",
    OneToMany = "ONE_TO_MANY",
    ManyToMany = "MANY_TO_MANY"
}
export declare enum RxModalityType {
    Required = "REQUIRED",
    Optional = "OPTIONAL"
}
export interface ICardinality {
    value: RxCardinalityType;
    labelKey: string;
}
export interface IAssociationDefinition extends IDefinition {
    readonly guid?: string;
    nodeAId?: string;
    nodeBId?: string;
    nodeAName?: string;
    nodeBName?: string;
    shouldCascadeDelete?: boolean;
    cardinality?: RxCardinalityType;
    nodeAKeys?: number[];
    nodeBKeys?: number[];
    isEnabled?: boolean;
    allowOverlay?: boolean;
    nodeAModality?: RxModalityType;
}
export interface IAssociationTreeNode {
    associationDefinitionName: string;
    associationDefintionGuid: string;
    nodeName: string;
    nodeSide: string;
    recordDefinitionName: string;
}
export interface IAssociationTree {
    value: IAssociationTreeNode;
    children: IAssociationTree[];
}
