import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHttpPostParams } from '../http/http.interfaces';
import { ICommand } from './command.interface';
export declare class Command implements ICommand {
    private resourceType;
    private httpClient;
    constructor(resourceType: string, httpClient: HttpClient);
    execute(data?: object, options?: IHttpPostParams): Observable<any>;
}
