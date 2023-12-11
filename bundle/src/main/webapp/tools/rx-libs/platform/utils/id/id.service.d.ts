import { RxGuidService } from '../guid/guid.service';
import * as i0 from "@angular/core";
export declare class RxIdService {
    private rxGuidService;
    constructor(rxGuidService: RxGuidService);
    private prefix;
    get(cellId: string): string;
    getBase(id: string): string;
    generate(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxIdService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxIdService>;
}
