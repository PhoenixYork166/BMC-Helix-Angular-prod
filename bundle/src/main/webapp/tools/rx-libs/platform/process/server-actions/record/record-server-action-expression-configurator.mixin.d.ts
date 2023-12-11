import { Observable } from 'rxjs';
import { Constructor } from '@helix/platform/utils';
export declare function RxRecordServerActionExpressionConfiguratorMixin<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        validateInputMapExpression(propertyName: string, expression: string): Observable<boolean>;
    };
} & TBase;
