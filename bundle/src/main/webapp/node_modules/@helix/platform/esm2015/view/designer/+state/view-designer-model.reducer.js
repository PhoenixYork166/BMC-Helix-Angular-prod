import { cloneDeep, last, omit } from 'lodash';
import { createReducer, on } from '@ngrx/store';
import { RX_VIEW_DEFINITION } from '@helix/platform/view/api';
import * as ViewDesignerActions from './view-designer.actions';
import * as ViewComponentActions from './view-component.actions';
import { addChildComponent, findParentComponentModel, isComponentContainsChild, removeChildComponent } from '../core/layout-helpers';
export function getInitialState() {
    return {
        viewDesignModel: null,
        viewComponentDesignModels: {}
    };
}
function initializeComponentModel(newState, payload) {
    newState.viewComponentDesignModels = Object.assign(Object.assign({}, newState.viewComponentDesignModels), { [payload.componentModel.guid]: payload.componentModel });
    // update parent layout
    if (payload.componentModel.parentGuid === newState.viewDesignModel.guid) {
        newState.viewDesignModel = addChildComponent(newState.viewDesignModel, payload.componentModel.guid, payload.outletName, payload.insertIndex, payload.columnIndex, payload.columnSpan);
    }
    else {
        const parentComponentModel = newState.viewComponentDesignModels[payload.componentModel.parentGuid];
        if (parentComponentModel) {
            const newParentComponentModel = addChildComponent(parentComponentModel, payload.componentModel.guid, payload.outletName, payload.insertIndex, payload.columnIndex, payload.columnSpan);
            newState.viewComponentDesignModels[newParentComponentModel.guid] =
                newParentComponentModel;
        }
    }
}
export const reducer = createReducer(getInitialState(), on(ViewDesignerActions.initViewDesigner, getInitialState), on(ViewDesignerActions.destroyViewDesigner, getInitialState), on(ViewComponentActions.initializeComponentModels, (state, { payload }) => {
    const newState = Object.assign({}, state);
    payload.forEach((data) => initializeComponentModel(newState, data));
    return newState;
}), on(ViewComponentActions.initializeDataComponentModels, (state, { payload }) => {
    const newState = Object.assign(Object.assign({}, state), { viewComponentDesignModels: Object.assign({}, state.viewComponentDesignModels) });
    payload.forEach((item) => {
        const parentComponentModel = newState.viewComponentDesignModels[item.componentModel.parentGuid];
        if (parentComponentModel) {
            // add new component model
            newState.viewComponentDesignModels[item.componentModel.guid] = item.componentModel;
            // update parent to contain child reference
            const newParentComponentModel = Object.assign(Object.assign({}, parentComponentModel), { childDataComponentGuids: [...(parentComponentModel.childDataComponentGuids || []), item.componentModel.guid] });
            newState.viewComponentDesignModels[newParentComponentModel.guid] =
                newParentComponentModel;
        }
    });
    return newState;
}), on(ViewComponentActions.moveComponent, (state, payload) => {
    const newState = Object.assign({}, state);
    // remove component from old parent layout
    if (isComponentContainsChild(payload.guid, state.viewDesignModel)) {
        newState.viewDesignModel = removeChildComponent(payload.guid, newState.viewDesignModel);
    }
    else {
        let oldParentComponentModel = findParentComponentModel(payload.guid, newState.viewComponentDesignModels);
        oldParentComponentModel = removeChildComponent(payload.guid, oldParentComponentModel);
        newState.viewComponentDesignModels = Object.assign(Object.assign({}, newState.viewComponentDesignModels), { [oldParentComponentModel.guid]: oldParentComponentModel });
    }
    // add component to new parent layout
    if (payload.parentGuid === newState.viewDesignModel.guid) {
        newState.viewDesignModel = addChildComponent(newState.viewDesignModel, payload.guid, payload.outletName, payload.insertIndex, payload.columnIndex);
    }
    else {
        let newParentComponentModel = newState.viewComponentDesignModels[payload.parentGuid];
        newParentComponentModel = addChildComponent(newParentComponentModel, payload.guid, payload.outletName, payload.insertIndex, payload.columnIndex);
        newState.viewComponentDesignModels = Object.assign(Object.assign({}, newState.viewComponentDesignModels), { [newParentComponentModel.guid]: newParentComponentModel });
    }
    // updating parentGuid for moved component
    newState.viewComponentDesignModels = Object.assign(Object.assign({}, newState.viewComponentDesignModels), { [payload.guid]: Object.assign(Object.assign({}, newState.viewComponentDesignModels[payload.guid]), { parentGuid: payload.parentGuid }) });
    return newState;
}), on(ViewComponentActions.componentsRemoved, (state, { guids }) => {
    const newState = Object.assign(Object.assign({}, state), { viewComponentDesignModels: omit(state.viewComponentDesignModels, guids) });
    guids.forEach((guid) => {
        if (isComponentContainsChild(guid, state.viewDesignModel)) {
            newState.viewDesignModel = removeChildComponent(guid, newState.viewDesignModel);
        }
        else {
            let oldParentComponentModel = findParentComponentModel(guid, state.viewComponentDesignModels);
            if (oldParentComponentModel && newState.viewComponentDesignModels[oldParentComponentModel.guid]) {
                oldParentComponentModel = removeChildComponent(guid, newState.viewComponentDesignModels[oldParentComponentModel.guid]);
                newState.viewComponentDesignModels = Object.assign(Object.assign({}, newState.viewComponentDesignModels), { [oldParentComponentModel.guid]: oldParentComponentModel });
            }
        }
    });
    return newState;
}), on(ViewComponentActions.setComponentLayout, (state, { guid, cols }) => {
    const componentModel = state.viewComponentDesignModels[guid];
    const defaultOutlet = componentModel.layout.outlets.find((item) => item.name === RX_VIEW_DEFINITION.defaultOutletName);
    const existingColumns = cloneDeep(defaultOutlet.columns);
    const removedColumns = existingColumns.splice(cols.length);
    cols.forEach((colSpan, i) => {
        if (existingColumns[i]) {
            existingColumns[i].span = colSpan;
        }
        else {
            existingColumns[i] = {
                span: colSpan,
                children: []
            };
        }
    });
    const removedColumnChildComponents = removedColumns.reduce((guids, col) => {
        guids.push(...col.children);
        return guids;
    }, []);
    if (removedColumnChildComponents.length) {
        const lastExistingCol = last(existingColumns);
        lastExistingCol.children = lastExistingCol.children.concat(removedColumnChildComponents);
    }
    return Object.assign(Object.assign({}, state), { viewComponentDesignModels: Object.assign(Object.assign({}, state.viewComponentDesignModels), { [guid]: Object.assign(Object.assign({}, componentModel), { layout: Object.assign(Object.assign({}, componentModel.layout), { outlets: componentModel.layout.outlets.map((outlet) => (Object.assign(Object.assign({}, outlet), { columns: existingColumns }))) }) }) }) });
}), on(ViewDesignerActions.setViewModel, (state, { payload }) => {
    return Object.assign(Object.assign({}, state), { viewDesignModel: payload });
}), on(ViewDesignerActions.updateViewModel, (state, { payload }) => {
    return Object.assign(Object.assign({}, state), { viewDesignModel: Object.assign(Object.assign({}, state.viewDesignModel), payload) });
}), on(ViewDesignerActions.viewDefinitionSaveSuccess, (state) => {
    if (state.viewDesignModel.isAngularJsView) {
        return Object.assign(Object.assign({}, state), { viewDesignModel: Object.assign(Object.assign({}, state.viewDesignModel), { isAngularJsView: false }) });
    }
    else {
        return state;
    }
}), on(ViewComponentActions.setComponentData, (state, { payload }) => {
    return Object.assign(Object.assign({}, state), { viewComponentDesignModels: Object.assign(Object.assign({}, state.viewComponentDesignModels), payload.reduce((res, { guid, data }) => {
            res[guid] = Object.assign(Object.assign({}, state.viewComponentDesignModels[guid]), { propertiesByName: data });
            return res;
        }, {})) });
}), on(ViewComponentActions.updateComponentModel, (state, { payload }) => {
    return Object.assign(Object.assign({}, state), { viewComponentDesignModels: Object.assign(Object.assign({}, state.viewComponentDesignModels), payload
            .filter((payload) => state.viewComponentDesignModels[payload.guid])
            .reduce((res, { guid, partialModel }) => {
            res[guid] = Object.assign(Object.assign(Object.assign({}, state.viewComponentDesignModels[guid]), partialModel), { propertiesByName: Object.assign(Object.assign({}, state.viewComponentDesignModels[guid].propertiesByName), partialModel.propertiesByName) });
            return res;
        }, {})) });
}));
export function viewDesignerModelReducer(state, action) {
    return reducer(state, action);
}
//# sourceMappingURL=view-designer-model.reducer.js.map