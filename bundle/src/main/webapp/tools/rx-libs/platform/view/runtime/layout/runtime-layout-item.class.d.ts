import { Observable } from 'rxjs';
import { IViewComponentRuntimeState } from '../interfaces/view-component-runtime-state.interface';
import { RuntimeViewModelApi } from '../runtime-view-model-api.class';
import { RuntimeLayoutOutlet } from './runtime-layout-outlet.class';
import { ComponentFactory } from '@angular/core';
import { IViewLayoutOutlet } from '@helix/platform/view/api';
export declare class RuntimeLayoutItem {
    config: Observable<IViewComponentRuntimeState>;
    guid: string;
    outlets: RuntimeLayoutOutlet[];
    parent: RuntimeLayoutItem;
    runtimeViewModelApi: RuntimeViewModelApi;
    factory: ComponentFactory<any>;
    constructor(options: {
        guid: string;
        parent: RuntimeLayoutItem;
        runtimeViewModelApi: RuntimeViewModelApi;
        outlets?: any[];
        config?: any;
        factory: any;
    });
    initializeOutlets(outlets: any[]): void;
    addLayoutItem(layoutTreeItem: RuntimeLayoutItem, columnConfig: {
        columnIndex: number;
        parentOutlet?: IViewLayoutOutlet;
    }): void;
}
