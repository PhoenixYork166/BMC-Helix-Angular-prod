import { IViewComponentDescriptor } from '@helix/platform/view/api';
export interface IViewComponentGroup {
    name: string;
    components: IViewComponentDescriptor[];
}
