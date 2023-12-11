import { Injector } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RxViewDataDictionaryService, RxViewExpressionConfigurator } from '@helix/platform/view/designer';
import { IExpressionEvaluator, RxDefaultExpressionEvaluatorService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export declare class NamedFilterOptionExpressionConfigurator extends RxViewExpressionConfigurator {
    protected injector: Injector;
    private activeModalRef;
    private rxViewDataDictionaryService;
    private rxDefaultExpressionEvaluatorService;
    readonly commonDataDictionary$: import("rxjs").Observable<(import("@helix/platform/shared/api").IDataDictionaryBranch | {
        label: string;
        children: ({
            label: string;
            icon: string;
            expression: string;
            hidden?: undefined;
        } | {
            label: string;
            icon: string;
            expression: string;
            hidden: boolean;
        })[];
    } | {
        expression: string;
        icon: string;
        label: any;
    })[]>;
    constructor(injector: Injector, activeModalRef: ActiveModalRef, rxViewDataDictionaryService: RxViewDataDictionaryService, rxDefaultExpressionEvaluatorService: RxDefaultExpressionEvaluatorService);
    getExpressionEvaluator(): IExpressionEvaluator;
    static ɵfac: i0.ɵɵFactoryDeclaration<NamedFilterOptionExpressionConfigurator, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NamedFilterOptionExpressionConfigurator>;
}
