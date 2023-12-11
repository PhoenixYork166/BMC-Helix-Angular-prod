import { createAction, props } from '@ngrx/store';
export const init = createAction('[Named List Designer] Init', props());
export const loadDefinition = createAction('[Named List Designer] Load Definition');
export const loadDefinitionSuccess = createAction('[Named List Designer] Load Definition Success', props());
export const initDefinitionData = createAction('[Named List Designer] Init Definition Data', props());
export const clearFields = createAction('[Named List Designer] Clear Fields');
export const markDesignerPristine = createAction('[Named List Designer] Mark Designer Pristine');
export const markDesignerDirty = createAction('[Named List Designer] Mark Designer Dirty');
export const updateDefinitionModelFromDesigner = createAction('[Named List Designer] Update Definition Model From Designer', props());
export const revertCustomization = createAction('[Named List Designer] Revert Customization');
export const toggleDesignMode = createAction('[Named List Designer] Toggle Design Mode');
export const saveDefinition = createAction('[Named List Designer] Save Definition');
export const saveDefinitionSuccess = createAction('[Named List Designer] Save Definition Success', props());
export const saveDefinitionError = createAction('[Named List Designer] Save Definition Error');
export const destroy = createAction('[Named List Designer] Destroy');
//# sourceMappingURL=named-list-designer.actions.js.map