import { ICanvasComponentPropertyChanged } from '../components/runtime-view-canvas/interfaces/canvas-component-property-changed.interface';
export interface IViewComponentPropertyChanged extends ICanvasComponentPropertyChanged {
    propertyName: string;
    newValue: any;
    oldValue: any;
}
