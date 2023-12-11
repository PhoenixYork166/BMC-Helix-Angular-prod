import { Observable } from 'rxjs';
export interface IComponentCanDeactivate {
    canDeactivate(): boolean;
    confirmDeactivation(): Observable<boolean> | Promise<boolean> | boolean;
}
