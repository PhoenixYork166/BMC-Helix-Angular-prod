import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { RuntimeViewModelApi } from '../runtime-view-model-api.class';
import { IViewComponentPropertyChanged } from './view-component-property-changed.interface';
export interface IViewComponent {
    guid: string;
    config: Observable<any>;
    isHidden: boolean;
    runtimeViewModelApi: RuntimeViewModelApi;
    propertyChanged?: EventEmitter<IViewComponentPropertyChanged>;
    hidden: EventEmitter<boolean>;
    autoFill: EventEmitter<boolean>;
    autoScroll: EventEmitter<boolean>;
}
