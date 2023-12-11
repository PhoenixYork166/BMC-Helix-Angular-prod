import { IFunctionDataDictionaryDescriptor } from '@helix/platform/shared/api';
export declare const RX_EXPRESSION_FUNCTIONS: IFunctionDataDictionaryDescriptor[];
export declare const RX_SUPPORTED_FUNCTION: {
    SAME: (collection: any) => boolean;
    INCLUDES: (collection: any, value: any) => boolean;
    SIZE: (collection: any) => number;
};
