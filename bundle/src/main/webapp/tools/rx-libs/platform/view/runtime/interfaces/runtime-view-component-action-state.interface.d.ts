import { ComponentExpression } from '../component/component-expression.class';
import { IViewComponentRuntimeState } from './view-component-runtime-state.interface';
export interface IViewComponentActionState {
    guid: string;
    name: string;
    index: number;
    config: IViewComponentRuntimeState;
    publicState: IViewComponentRuntimeState;
    expressions: ComponentExpression[];
}
