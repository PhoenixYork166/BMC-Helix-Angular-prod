import { RxDefinitionNameService } from './definition-name.service';
import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class RxDefinitionNamePipe implements PipeTransform {
    private rxDefinitionNameService;
    constructor(rxDefinitionNameService: RxDefinitionNameService);
    transform(value: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxDefinitionNamePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<RxDefinitionNamePipe, "rxDefinitionNamePipe">;
}
