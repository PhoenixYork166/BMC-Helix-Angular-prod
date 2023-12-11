import { RxViewDesignerActionModel } from '@helix/platform/view/designer';
import { TextFormControlComponent } from '@helix/platform/shared/components';
import { take } from 'rxjs/operators';
import { keys } from 'lodash';
export class RxUnknownViewActionDesignModel extends RxViewDesignerActionModel {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.injector = injector;
        this.sandbox = sandbox;
        this.sandbox.actionProperties$.pipe(take(1)).subscribe((actionProperties) => {
            this.sandbox.setActionPropertyEditorConfig(this.getActionEditorConfig(actionProperties));
        });
    }
    getActionEditorConfig(actionProperties) {
        return keys(actionProperties).map((propertyName) => ({
            name: propertyName,
            component: TextFormControlComponent,
            isDisabled: true,
            options: {
                label: propertyName
            }
        }));
    }
}
//# sourceMappingURL=unknown-view-action-design-model.class.js.map