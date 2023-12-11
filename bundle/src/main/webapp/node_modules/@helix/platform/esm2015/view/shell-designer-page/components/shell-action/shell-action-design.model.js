import { RxShellMenuItemDesignModel } from '../shell-menu-item/shell-menu-item-design.model';
import { map } from 'rxjs/operators';
export class RxShellActionDesignModel extends RxShellMenuItemDesignModel {
    constructor() {
        super(...arguments);
        this.iconClass$ = this.menuItemIcon$.pipe(map((className) => (className ? `d-icon-${className}` : '')));
        this.menuItemNameLabel = 'Tooltip';
    }
    static getInitialProperties(initialProperties) {
        var _a;
        const result = super.getInitialProperties(Object.assign(Object.assign({}, initialProperties), { menuItemName: (_a = initialProperties === null || initialProperties === void 0 ? void 0 : initialProperties.menuItemName) !== null && _a !== void 0 ? _a : 'New action' }));
        result.menuItemIcon = result.menuItemIcon || 'triangle_right_circle_o';
        return result;
    }
    validate(props) {
        const validationIssues = super.validate(props);
        if (!props.menuItemIcon) {
            validationIssues.push(this.sandbox.createError(`Icon cannot be blank.`, 'menuItemIcon'));
        }
        return validationIssues;
    }
}
//# sourceMappingURL=shell-action-design.model.js.map