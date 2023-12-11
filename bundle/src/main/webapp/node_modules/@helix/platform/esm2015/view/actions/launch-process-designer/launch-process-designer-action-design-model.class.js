import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { DefinitionPickerOrExpressionFormControlComponent, RxDefinitionPickerType } from '@helix/platform/shared/components';
import { RxViewDesignerActionModel } from '@helix/platform/view/designer';
import { RxProcessDesignerElementPickerComponent } from './process-designer-element-picker';
export class LaunchProcessDesignerActionDesignModelClass extends RxViewDesignerActionModel {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.sandbox = sandbox;
        this.translateService = this.injector.get(TranslateService);
        this.sandbox.actionProperties$.pipe(take(1)).subscribe(() => {
            this.sandbox.setActionPropertyEditorConfig(this.getActionEditorConfig());
            this.sandbox.setActionOutputDataDictionary([
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.process-definition-name.label'),
                    expression: this.getOutputExpressionForPropertyPath('processDefinitionName')
                }
            ]);
        });
    }
    static getInitialProperties(initialProperties) {
        return Object.assign({ processDefinitionName: null, paletteElements: null }, initialProperties);
    }
    getActionEditorConfig() {
        return [
            {
                name: 'processDefinitionName',
                component: DefinitionPickerOrExpressionFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.process-definition-name.label'),
                    definitionType: RxDefinitionPickerType.Process,
                    dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                    operators: this.expressionConfigurator.getOperators()
                }
            },
            {
                name: 'paletteElements',
                component: RxProcessDesignerElementPickerComponent,
                options: {
                    label: 'Available palette elements'
                }
            }
        ];
    }
}
//# sourceMappingURL=launch-process-designer-action-design-model.class.js.map