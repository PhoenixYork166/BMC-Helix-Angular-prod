import { createAction, props } from '@ngrx/store';
export const init = createAction('[Document Designer] Init', props());
export const loadDefinition = createAction('[Document Designer] Load Definition');
export const loadDefinitionSuccess = createAction('[Document Designer] Load Definition Success', props());
export const initDefinitionData = createAction('[Document Designer] Init Definition Model', props());
export const markDesignerPristine = createAction('[Document Designer] Mark Designer Pristine');
export const markDesignerDirty = createAction('[Document Designer] Mark Designer Dirty');
export const updateDefinitionModelFromDesigner = createAction('[Document Designer] Update Definition Model From Designer', props());
export const toggleDesignMode = createAction('[Document Designer] Toggle Design Mode');
export const revertCustomization = createAction('[Document Designer] Revert Customization');
export const saveDefinition = createAction('[Document Designer] Save Definition');
export const saveDefinitionSuccess = createAction('[Document Designer] Save Definition Success', props());
export const saveDefinitionError = createAction('[Document Designer] Save Definition Error');
export const destroy = createAction('[Document Designer] Destroy');
//# sourceMappingURL=document-designer.actions.js.map