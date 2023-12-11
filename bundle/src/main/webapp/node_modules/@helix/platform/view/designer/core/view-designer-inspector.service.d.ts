import { IViewDesignerInspectorConfig } from '../public-interfaces/view-designer-inspector.types';
import * as i0 from "@angular/core";
export declare class RxViewDesignerInspectorService {
    private onChangeSubject;
    private configs;
    onChange$: import("rxjs").Observable<{
        guid: string;
        config: IViewDesignerInspectorConfig;
    }>;
    clear(): void;
    set(guid: string, config: IViewDesignerInspectorConfig): void;
    get(guid: string): IViewDesignerInspectorConfig;
    delete(guid: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxViewDesignerInspectorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxViewDesignerInspectorService>;
}
