import { IRuntimeViewApi } from './runtime-view-api.interface';
export interface IExpressionContext {
    view: {
        api: IRuntimeViewApi;
        components: {
            [componentGuid: string]: any;
        };
        inputParams: {
            [name: string]: any;
        };
        isValid: boolean;
    };
    keywords: {
        [name: string]: any;
    };
}
