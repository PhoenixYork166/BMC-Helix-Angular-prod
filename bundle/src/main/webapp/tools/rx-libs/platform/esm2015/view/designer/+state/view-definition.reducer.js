import { createReducer, on } from '@ngrx/store';
import * as ViewDesignerActions from './view-designer.actions';
export function getInitialState() {
    return null;
}
export const reducer = createReducer(getInitialState(), on(ViewDesignerActions.initViewDesigner, getInitialState), on(ViewDesignerActions.destroyViewDesigner, getInitialState), on(ViewDesignerActions.setGeneratedViewDefinition, (state, { payload }) => {
    return payload;
}));
export function viewDefinitionReducer(state, action) {
    return reducer(state, action);
}
//# sourceMappingURL=view-definition.reducer.js.map