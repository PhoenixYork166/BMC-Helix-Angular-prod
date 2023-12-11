import { omit, has } from 'lodash';
import { createReducer, on } from '@ngrx/store';
import * as ViewDesignerActions from './view-designer.actions';
import * as ViewComponentsActions from './view-component.actions';
export function getInitialState() {
    return {};
}
export const reducer = createReducer(getInitialState(), on(ViewDesignerActions.initViewDesigner, getInitialState), on(ViewDesignerActions.destroyViewDesigner, getInitialState), on(ViewComponentsActions.setBreadcrumbs, (state, { guid, label }) => {
    return Object.assign(Object.assign({}, state), { [guid]: label });
}), on(ViewComponentsActions.componentsRemoved, (state, { guids }) => {
    let newState = state;
    if (guids.some((guid) => has(state, guid))) {
        newState = omit(state, guids);
    }
    return newState;
}));
export function viewDesignerBreadcrumbsReducer(state, action) {
    return reducer(state, action);
}
//# sourceMappingURL=view-designer-breadcrumbs.reducer.js.map