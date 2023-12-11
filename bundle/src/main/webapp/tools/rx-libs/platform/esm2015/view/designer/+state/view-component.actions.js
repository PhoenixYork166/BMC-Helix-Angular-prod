import { createAction, props } from '@ngrx/store';
export const componentsRemoved = createAction('[View Component] Components Removed', props());
export const initializeComponentModels = createAction('[View Component] Initialize Component Models', props());
export const initializeDataComponentModels = createAction('[View Component] Initialize Data Component Models', props());
export const setValidationIssues = createAction('[View Component] Set Validation Issues', props());
export const setExpressionValidationIssues = createAction('[View Component] Set Expression Validation Issues', props());
export const setComponentData = createAction('[View Component] Set Component Properties', props());
export const setChildComponents = createAction('[View Component] Set Child Components', props());
export const setBreadcrumbs = createAction('[View Component] Set Breadcrumbs', props());
export const selectComponent = createAction('[View Component] Select Component', props());
export const setComponentLayout = createAction('[View Component] Set Component Layout', props());
export const moveComponent = createAction('[View Component] Move Component', props());
export const insertComponent = createAction('[View Component] Insert Component', props());
export const addNewComponents = createAction('[View Component] Add New Components', props());
export const updateComponentModel = createAction('[View Component] Update Component Model', props());
export const removeComponents = createAction('[View Component] Remove Components', props());
//# sourceMappingURL=view-component.actions.js.map