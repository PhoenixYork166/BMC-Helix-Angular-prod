import { RxDefinitionPickerType } from '../definition-picker.types';
export interface IDefinitionTypeDescriptorProperties {
    type: RxDefinitionPickerType;
    allDefinitionsLabelKey: string;
    dataGetters: {
        all: string;
        bundle: string;
        rx?: string;
    };
}
