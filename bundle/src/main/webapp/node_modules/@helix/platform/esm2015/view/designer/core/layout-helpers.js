import { includes, uniq, some } from 'lodash';
import { RxViewLayout } from '@helix/platform/view/api';
export function findParentComponentModel(guid, components) {
    const currentComponent = components[guid];
    return components[currentComponent === null || currentComponent === void 0 ? void 0 : currentComponent.parentGuid];
}
export function findAllParentComponentGuids(guid, components) {
    const result = [guid];
    let parentModel = findParentComponentModel(guid, components);
    let nextGuid = parentModel ? parentModel.guid : null;
    while (nextGuid) {
        result.unshift(nextGuid);
        parentModel = findParentComponentModel(nextGuid, components);
        nextGuid = parentModel ? parentModel.guid : null;
    }
    return result;
}
export function findParentComponentByType(guid, componentType, components) {
    let result;
    let parentModel = findParentComponentModel(guid, components);
    let nextGuid = parentModel ? parentModel.guid : null;
    while (nextGuid) {
        if (parentModel.type === componentType) {
            result = parentModel;
            nextGuid = null;
        }
        else {
            parentModel = findParentComponentModel(nextGuid, components);
            nextGuid = parentModel ? parentModel.guid : null;
        }
    }
    return result;
}
export function isComponentContainsChild(guid, componentModel) {
    if (componentModel.layout) {
        const hasChild = RxViewLayout.hasChild(componentModel.layout, guid);
        if (hasChild) {
            return true;
        }
    }
    if (componentModel.childDataComponentGuids) {
        return includes(componentModel.childDataComponentGuids, guid);
    }
    else {
        return false;
    }
}
export function addChildComponent(componentModel, guid, outletName, insertIndex, columnIndex = 0, columnSpan = 0) {
    const newComponentModel = Object.assign({}, componentModel);
    newComponentModel.layout = {
        outlets: componentModel.layout.outlets.map((outlet) => {
            if (outlet.name === outletName) {
                const columns = [...outlet.columns];
                insertIndex = isFinite(insertIndex) ? insertIndex : columns[columnIndex].children.length;
                if (!columns[columnIndex]) {
                    columns[columnIndex] = {
                        children: []
                    };
                    if (columnSpan) {
                        columns[columnIndex].span = columnSpan;
                    }
                }
                // todo handle drop in non-first column
                columns[columnIndex] = {
                    children: [
                        ...columns[columnIndex].children.slice(0, insertIndex),
                        guid,
                        ...columns[columnIndex].children.slice(insertIndex)
                    ],
                    span: columns[columnIndex].span
                };
                return Object.assign(Object.assign({}, outlet), { columns });
            }
            else {
                return outlet;
            }
        })
    };
    return newComponentModel;
}
export function removeChildComponent(componentGuidToRemove, parentComponentModel) {
    const newParentComponentModel = Object.assign({}, parentComponentModel);
    if (some(newParentComponentModel.childDataComponentGuids, (guid) => componentGuidToRemove === guid)) {
        newParentComponentModel.childDataComponentGuids = newParentComponentModel.childDataComponentGuids.filter((guid) => guid !== componentGuidToRemove);
    }
    if (parentComponentModel.layout && RxViewLayout.hasChild(parentComponentModel.layout, componentGuidToRemove)) {
        newParentComponentModel.layout = RxViewLayout.removeChildFromLayout(parentComponentModel.layout, componentGuidToRemove);
    }
    return newParentComponentModel;
}
export function getChildGuidsFromModel(model) {
    const guids = [];
    if (model.childDataComponentGuids) {
        guids.push(...model.childDataComponentGuids);
    }
    if (model.layout) {
        guids.push(...RxViewLayout.getViewLayoutChildGuids(model.layout));
    }
    return uniq(guids);
}
export function getAllChildGuids(parentComponent, componentModelsState) {
    const guids = getChildGuidsFromModel(parentComponent);
    return guids.reduce((result, guid) => {
        result.push(...getAllChildGuids(componentModelsState[guid], componentModelsState));
        return result;
    }, guids);
}
//# sourceMappingURL=layout-helpers.js.map