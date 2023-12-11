import { Constructor } from '@helix/platform/utils';
export declare function RxProcessShapeViewMixin<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        initialize(config: any): void;
        canInteract(): boolean;
        prepareEmbedding(): void;
        getEmbeddedBBox(): any;
    };
} & TBase;
