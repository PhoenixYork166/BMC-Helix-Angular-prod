import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { IViewComponentPropertyChanged } from '../../interfaces/view-component-property-changed.interface';
import { IViewComponent } from '../../interfaces/view-component.interface';
import { RuntimeViewModelApi } from '../../runtime-view-model-api.class';
import { IPlainObject } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare abstract class BaseViewComponent implements IViewComponent, OnDestroy, OnInit {
    guid: string;
    customCssClasses: string;
    autoFill: EventEmitter<boolean>;
    autoScroll: EventEmitter<boolean>;
    hidden: EventEmitter<boolean>;
    get isHidden(): boolean;
    set isHidden(value: boolean);
    private isComponentHidden;
    protected destroyed$: ReplaySubject<boolean>;
    config: Observable<IPlainObject>;
    runtimeViewModelApi: RuntimeViewModelApi;
    propertyChanged: EventEmitter<IViewComponentPropertyChanged>;
    ngOnInit(): void;
    notifyPropertyChanged(propertyName: string, newValue: any, oldValue?: any): void;
    triggerViewActions(guid?: string, viewActionTriggerEventName?: string): Promise<void>;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseViewComponent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BaseViewComponent, never, never, {}, { "autoFill": "autoFill"; "autoScroll": "autoScroll"; "hidden": "hidden"; }, never>;
}
