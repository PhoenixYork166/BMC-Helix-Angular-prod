import { IFormControlBuilderConfig, IFormSectionBuilderConfig } from '@helix/platform/shared/api';
export interface IViewDesignerInspectorConfig {
    inspectorSectionConfigs: IViewDesignerInspectorSectionConfig[];
}
export interface IViewDesignerInspectorSectionConfig extends IFormSectionBuilderConfig {
    controls: IFormControlBuilderConfig[];
}
