import { ComponentFactory, OnInit, ViewContainerRef } from '@angular/core';
import { IPlainObject } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxDynamicComponentRendererComponent implements OnInit {
    componentFactory: ComponentFactory<any>;
    context: any;
    options: IPlainObject;
    container: ViewContainerRef;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxDynamicComponentRendererComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxDynamicComponentRendererComponent, "rx-dynamic-component-renderer", never, { "componentFactory": "componentFactory"; "context": "context"; "options": "options"; }, {}, never, never>;
}
