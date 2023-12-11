import { Observable } from 'rxjs';
import { IHttpPostParams } from '../http/http.interfaces';
export interface ICommand {
    execute(data?: object, options?: IHttpPostParams): Observable<any>;
}
