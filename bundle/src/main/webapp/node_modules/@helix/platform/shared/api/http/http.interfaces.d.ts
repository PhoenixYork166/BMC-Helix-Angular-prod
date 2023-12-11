import { HttpHeaders, HttpParams } from '@angular/common/http';
export interface IHttpOptions {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
}
export interface IHttpGetParams {
    headers?: HttpHeaders;
    observe?: 'body';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}
export interface IHttpPostParams {
    headers?: HttpHeaders;
    observe?: 'body' | 'response' | 'events';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'text' | 'blob' | 'json';
    withCredentials?: boolean;
}
