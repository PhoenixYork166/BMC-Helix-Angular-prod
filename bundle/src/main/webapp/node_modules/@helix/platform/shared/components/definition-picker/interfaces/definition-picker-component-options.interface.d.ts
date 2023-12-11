import { AdaptRxControlLabelTooltip } from '@bmc-ux/adapt-angular';
import { RxDefinitionPickerScope, RxDefinitionPickerType } from '../definition-picker.types';
export interface IDefinitionPickerComponentOptions {
    label: string;
    definitionType: RxDefinitionPickerType;
    availableDefinitionPickerStates?: {
        definitionButtonsGroups: RxDefinitionPickerScope[];
        search: RxDefinitionPickerScope;
    };
    tooltip?: AdaptRxControlLabelTooltip;
    required?: boolean;
    bundleId?: string;
    beforeValueChange?: (oldValue: string, newValue: string) => Promise<boolean>;
    texts?: {
        placeholder?: string;
        noBundleDeployed?: string;
        noDefinitionsFound?: string;
    };
}
