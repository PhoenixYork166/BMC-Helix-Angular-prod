import { ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { map, take, takeUntil } from 'rxjs/operators';
import { ExpressionInspectorControlComponent } from '@helix/platform/shared/components';
export class ServiceListDesignModel extends ViewDesignerComponentModel {
    static getInitialProperties(initialProperties) {
        return Object.assign({ serviceRequestId: null, serviceRequestName: null, serviceRequestGuid: null }, initialProperties);
    }
    rxInit() {
        this.sandbox
            .getComponentPropertyValue('serviceRequestId')
            .pipe(map((value) => value ? [] : [this.sandbox.createError('Selected service request ID cannot be blank.', 'serviceRequestId')]), takeUntil(this.sandbox.destroyed$))
            .subscribe((validationIssues) => this.sandbox.setValidationIssues(validationIssues));
        this.sandbox.componentProperties$.pipe(take(1)).subscribe(() => {
            this.sandbox.updateInspectorConfig(this.getInspector());
            this.sandbox.setCommonDataDictionary(this.getCommonProps());
        });
    }
    getCommonProps() {
        return {
            label: this.sandbox.descriptor.name,
            expression: this.getExpressionForProperty('api'),
            children: [
                {
                    label: 'Service request ID',
                    expression: this.getExpressionForProperty('serviceRequestId')
                },
                {
                    label: 'Service request name',
                    expression: this.getExpressionForProperty('serviceRequestName')
                },
                {
                    label: 'Service request GUID',
                    expression: this.getExpressionForProperty('serviceRequestGuid')
                }
            ]
        };
    }
    getInspector() {
        return {
            inspectorSectionConfigs: [
                {
                    label: 'General',
                    controls: [
                        {
                            name: 'serviceRequestId',
                            component: ExpressionInspectorControlComponent,
                            options: {
                                label: 'Service request ID',
                                isRequired: true
                            }
                        },
                        {
                            name: 'serviceRequestName',
                            component: ExpressionInspectorControlComponent,
                            options: {
                                label: 'Service request name'
                            }
                        },
                        {
                            name: 'serviceRequestGuid',
                            component: ExpressionInspectorControlComponent,
                            options: {
                                label: 'Service request GUID'
                            }
                        }
                    ]
                }
            ]
        };
    }
}
//# sourceMappingURL=service-list-design.model.js.map