import { has, omit, isEmpty, omitBy } from 'lodash';
import { createReducer, on } from '@ngrx/store';
import * as ViewDesignerActions from './view-designer.actions';
import * as ViewComponentActions from './view-component.actions';
export function getInitialState() {
    return {
        issues: {},
        expressionIssues: {}
    };
}
export const reducer = createReducer(getInitialState(), on(ViewDesignerActions.initViewDesigner, ViewDesignerActions.destroyViewDesigner, getInitialState), on(ViewComponentActions.setValidationIssues, (state, { guid, issues }) => {
    if (issues.length) {
        return Object.assign(Object.assign({}, state), { issues: Object.assign(Object.assign({}, state.issues), { [guid]: issues }) });
    }
    else {
        let newState = state;
        if (has(newState.issues, guid)) {
            newState = Object.assign(Object.assign({}, state), { issues: omit(state.issues, [guid]) });
        }
        return newState;
    }
}), on(ViewComponentActions.setExpressionValidationIssues, (state, { issues }) => {
    return isEmpty(issues)
        ? state
        : Object.assign(Object.assign({}, state), { expressionIssues: Object.assign(Object.assign({}, omit(state.expressionIssues, Object.keys(issues))), omitBy(issues, isEmpty)) });
}), on(ViewComponentActions.componentsRemoved, (state, { guids }) => {
    let newState = state;
    if (guids.some((guid) => has(state.issues, guid))) {
        newState = Object.assign(Object.assign({}, state), { issues: omit(state.issues, guids) });
    }
    if (guids.some((guid) => has(state.expressionIssues, guid))) {
        newState = Object.assign(Object.assign({}, state), { expressionIssues: omit(state.expressionIssues, guids) });
    }
    return newState;
}));
export function viewDesignerValidationReducer(state, action) {
    return reducer(state, action);
}
//# sourceMappingURL=view-designer-validation.reducer.js.map