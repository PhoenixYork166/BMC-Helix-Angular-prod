import { AdaptTreeNode } from '@bmc-ux/adapt-angular';
export interface IProcessElementTreeNodeValue {
    actionTypeName?: string;
    eventResourceType?: string;
    resourceType?: string;
}
export interface IProcessElementTreeNode extends AdaptTreeNode {
    group: string;
    label: string;
    value: IProcessElementTreeNodeValue;
    selected?: boolean;
}
export interface IProcessDesignerElementsPickerComponentOptions {
    label: string;
}
