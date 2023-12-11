import { ICanvasComponentPropertyChanged } from '../interfaces/canvas-component-property-changed.interface';
import * as i0 from "@angular/core";
export declare class RuntimeViewCanvasService {
    private componentPropertyChangedSubject;
    componentPropertyChanged$: import("rxjs").Observable<ICanvasComponentPropertyChanged>;
    onViewComponentPropertyChanged(componentPropertyChange: ICanvasComponentPropertyChanged): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RuntimeViewCanvasService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RuntimeViewCanvasService>;
}
