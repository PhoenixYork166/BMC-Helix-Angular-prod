import { TextFormControlComponent } from '@helix/platform/shared/components';
import { ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { keys } from 'lodash';
import { take } from 'rxjs/operators';
export class UnknownDesignModel extends ViewDesignerComponentModel {
    constructor() {
        super(...arguments);
        this.label = `Unknown component: ${this.sandbox.componentType}`;
    }
    rxInit() {
        this.sandbox.componentProperties$.pipe(take(1)).subscribe((componentProperties) => {
            this.sandbox.updateInspectorConfig(this.getInspector(componentProperties));
            this.sandbox.setValidationIssues([this.sandbox.createError(this.label)]);
        });
    }
    getInspector(componentProperties) {
        const controls = keys(componentProperties).map((propertyName) => ({
            name: propertyName,
            component: TextFormControlComponent,
            options: {
                label: propertyName
            },
            isDisabled: true
        }));
        return {
            inspectorSectionConfigs: [
                {
                    label: 'General',
                    controls
                }
            ]
        };
    }
}
//# sourceMappingURL=unknown-design.model.js.map