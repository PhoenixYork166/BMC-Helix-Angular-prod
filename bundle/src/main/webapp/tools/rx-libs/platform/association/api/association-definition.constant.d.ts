import { RxCardinalityType, RxModalityType } from './association-definition.types';
export declare const RX_ASSOCIATION_DEFINITION: {
    modality: {
        required: RxModalityType;
        optional: RxModalityType;
    };
    roles: {
        second: {
            value: string;
        };
    };
    cardinality: {
        oneToOne: {
            value: RxCardinalityType;
            labelKey: string;
        };
        oneToMany: {
            value: RxCardinalityType;
            labelKey: string;
        };
        manyToMany: {
            value: RxCardinalityType;
            labelKey: string;
        };
    };
    constraints: {
        nameKey: string;
        value: boolean;
    }[];
};
