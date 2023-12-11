import { IRxStandardProps } from '@helix/platform/view/api';
export interface IExtensionContainerProperties extends IRxStandardProps {
    name: string;
    recordDefinition: string;
    recordInstance: string;
}
