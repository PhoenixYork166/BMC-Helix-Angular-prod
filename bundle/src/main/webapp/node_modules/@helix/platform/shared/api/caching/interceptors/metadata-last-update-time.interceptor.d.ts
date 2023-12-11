import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RxMetadataService } from '../metadata.service';
import * as i0 from "@angular/core";
export declare class RxMetadataLastUpdateTimeInterceptor implements HttpInterceptor {
    private rxMetadataService;
    constructor(rxMetadataService: RxMetadataService);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxMetadataLastUpdateTimeInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxMetadataLastUpdateTimeInterceptor>;
}
