import { PipeTransform } from '@angular/core';
import { RxDefinitionService } from './definition.service';
import { IBundleDescriptor } from '../bundle/bundle.interfaces';
import * as i0 from "@angular/core";
export declare class RxDefinitionScopePipe implements PipeTransform {
    private rxDefinitionService;
    constructor(rxDefinitionService: RxDefinitionService);
    transform(value: string, bundleDescriptor: IBundleDescriptor): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxDefinitionScopePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<RxDefinitionScopePipe, "rxDefinitionScopePipe">;
}
