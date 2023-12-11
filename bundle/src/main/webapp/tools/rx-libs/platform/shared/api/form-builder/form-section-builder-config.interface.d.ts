import { IFormControlBuilderConfig } from './form-control-builder-config.interface';
import { IFormWidgetBuilderConfig } from './form-widget-builder-config.interface';
export interface IFormSectionBuilderConfig {
    label?: string;
    isDisabled?: boolean;
    controls: Array<IFormControlBuilderConfig | IFormWidgetBuilderConfig>;
}
