import { RxCardinalityType, RxModalityType } from './association-definition.types';
export const RX_ASSOCIATION_DEFINITION = {
    modality: {
        required: RxModalityType.Required,
        optional: RxModalityType.Optional
    },
    roles: {
        second: {
            value: 'nodeB'
        }
    },
    cardinality: {
        oneToOne: {
            value: RxCardinalityType.OneToOne,
            labelKey: 'com.bmc.arsys.rx.client.association.cardinality.one-to-one.label'
        },
        oneToMany: {
            value: RxCardinalityType.OneToMany,
            labelKey: 'com.bmc.arsys.rx.client.association.cardinality.one-to-many.label'
        },
        manyToMany: {
            value: RxCardinalityType.ManyToMany,
            labelKey: 'com.bmc.arsys.rx.client.association.cardinality.many-to-many.label'
        }
    },
    constraints: [
        {
            nameKey: 'com.bmc.arsys.rx.client.association.constraints.cascade-delete.label',
            value: true
        },
        {
            nameKey: 'com.bmc.arsys.rx.client.common.none.label',
            value: false
        }
    ]
};
//# sourceMappingURL=association-definition.constant.js.map