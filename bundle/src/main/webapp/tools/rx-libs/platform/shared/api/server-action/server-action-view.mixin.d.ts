import { Constructor } from '@helix/platform/utils';
export declare function RxServerActionViewMixin<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        className(): string;
    };
} & TBase;
