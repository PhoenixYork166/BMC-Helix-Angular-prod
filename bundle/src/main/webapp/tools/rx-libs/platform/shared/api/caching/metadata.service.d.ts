import { HttpRequest } from '@angular/common/http';
import * as i0 from "@angular/core";
export declare class RxMetadataService {
    private metadataLastUpdateTime;
    setMetadataLastUpdateTime(metadataLastUpdateTime: string): void;
    getMetadataLastUpdateTime(): Date;
    isLocalizedStringsRequest(request: HttpRequest<any>): boolean;
    isMetadataDataPageQueryRequest(request: HttpRequest<any>): boolean;
    isMetadataRequest(request: HttpRequest<any>): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxMetadataService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxMetadataService>;
}
