import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export declare class RxViewDesignerModels {
    private models;
    clear(): void;
    set(guid: string, model: IViewDesignerComponentModel): void;
    get(guid: string): IViewDesignerComponentModel;
    delete(guid: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxViewDesignerModels, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxViewDesignerModels>;
}
