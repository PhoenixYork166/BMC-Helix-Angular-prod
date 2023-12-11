import { RxViewDesignerActionModel } from '@helix/platform/view/designer';
import { forkJoin, of } from 'rxjs';
import { distinctUntilChanged, map, pluck, skip, switchMap } from 'rxjs/operators';
import { map as _map, isEqual } from 'lodash';
import { Tooltip } from '@helix/platform/shared/api';
import { ExpressionFormControlComponent, RxDefinitionPickerComponent, RxDefinitionPickerType, SwitchFormControlComponent } from '@helix/platform/shared/components';
import { RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { RX_PROCESS_DEFINITION, RxProcessDefinitionCacheService } from '@helix/platform/process/api';
export class RxLaunchProcessViewActionDesignModel extends RxViewDesignerActionModel {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.injector = injector;
        this.sandbox = sandbox;
        this.rxProcessDefinitionCacheService = this.injector.get(RxProcessDefinitionCacheService);
        this.rxRecordDefinitionCacheService = this.injector.get(RxRecordDefinitionCacheService);
        this.defaultProps = {
            processDefinitionName: null,
            waitForProcessCompletion: false
        };
        const processDefinitionName$ = this.sandbox.actionProperties$.pipe(pluck('processDefinitionName'), distinctUntilChanged());
        processDefinitionName$.pipe(skip(1)).subscribe((processDefinitionName) => {
            this.sandbox.setActionProperties({
                processDefinitionName,
                waitForProcessCompletion: false
            });
        });
        processDefinitionName$
            .pipe(switchMap((processDefinitionName) => processDefinitionName
            ? this.rxProcessDefinitionCacheService.getProcessDefinition(processDefinitionName)
            : of(null)))
            .subscribe((processDefinition) => this.sandbox.setActionPropertyEditorConfig(this.getActionEditorConfig(processDefinition)));
        this.sandbox.actionProperties$
            .pipe(map((props) => [props.processDefinitionName, props.waitForProcessCompletion]), distinctUntilChanged(isEqual), switchMap(([processDefinitionName, waitForProcessCompletion]) => this.getActionOutputDataDictionary(processDefinitionName, waitForProcessCompletion)))
            .subscribe((dataDictionary) => this.sandbox.setActionOutputDataDictionary(dataDictionary));
    }
    static getInitialProperties(initialProperties) {
        return Object.assign({ processDefinitionName: null, waitForProcessCompletion: false }, initialProperties);
    }
    getActionEditorConfig(processDefinition) {
        return [
            {
                name: 'processDefinitionName',
                component: RxDefinitionPickerComponent,
                options: {
                    label: 'Process to start',
                    definitionType: RxDefinitionPickerType.Process,
                    required: true
                }
            },
            {
                name: 'waitForProcessCompletion',
                component: SwitchFormControlComponent,
                isDisabled: processDefinition ? !processDefinition.synchronous : true,
                options: {
                    label: 'Wait for process completion',
                    tooltip: new Tooltip('If a process runs synchronously, it is possible to get output data from the process once the process completes. Enable Wait for completion in order to define an output map for the selected process.')
                }
            },
            ...(processDefinition
                ? _map(processDefinition.inputParams, (param) => ({
                    name: `actionProcessInputParams.${param.name}`,
                    component: ExpressionFormControlComponent,
                    options: {
                        label: param.name,
                        dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                        operators: this.expressionConfigurator.getOperators(),
                        isRequired: param.fieldOption === 'REQUIRED'
                    }
                }))
                : [])
        ];
    }
    getActionOutputDataDictionary(processDefinitionName, waitForProcessCompletion) {
        return waitForProcessCompletion
            ? this.rxProcessDefinitionCacheService.getOutputParams(processDefinitionName).pipe(switchMap((outputParams) => forkJoin(outputParams.map((param) => {
                let dataDictionary;
                if (param.fieldTypeName === RX_PROCESS_DEFINITION.processVariableTypes.record) {
                    const recordInstanceParam = param;
                    dataDictionary = this.rxRecordDefinitionCacheService
                        .getRecordDefinition(recordInstanceParam.recordDefinitionName)
                        .pipe(map((recordDefinition) => ({
                        label: recordInstanceParam.name,
                        expression: this.getOutputExpressionForPropertyPath(recordInstanceParam.name),
                        children: _map(recordDefinition.fieldDefinitions, (fieldDefinition) => ({
                            label: fieldDefinition.name,
                            expression: this.getOutputExpressionForPropertyPath(`${recordInstanceParam.name}.${fieldDefinition.id}`)
                        }))
                    })));
                }
                else {
                    dataDictionary = of({
                        label: param.name,
                        expression: this.getOutputExpressionForPropertyPath(param.name)
                    });
                }
                return dataDictionary;
            }))))
            : of([]);
    }
}
//# sourceMappingURL=launch-process-view-action-design-model.class.js.map