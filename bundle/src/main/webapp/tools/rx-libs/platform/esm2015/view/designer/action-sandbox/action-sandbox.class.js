import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, first, map, takeUntil } from 'rxjs/operators';
import { isEqual, omit } from 'lodash';
import { ViewDesignerFacade } from '../+state/view-designer.facade';
import { ExpressionFormControlComponent } from '@helix/platform/shared/components';
import { RxViewActionExpressionConfigurator } from '../expression-configurator/view-action-expression-configurator.class';
import { Tooltip } from '@helix/platform/shared/api';
export class ActionSandbox {
    constructor(injector, descriptor, guid, initialProps) {
        this.injector = injector;
        this.descriptor = descriptor;
        this.guid = guid;
        this.initialProps = initialProps;
        this.destroyedSubject = new Subject();
        this.viewDesignerFacade = this.injector.get(ViewDesignerFacade);
        this.actionPropertyEditorConfigSubject = new BehaviorSubject([]);
        this.actionPropertiesSubject = new BehaviorSubject(this.initialProps);
        this.children = [];
        this.children$ = this.viewDesignerFacade.getChildComponents(this.guid);
        this.destroyed$ = this.destroyedSubject.asObservable();
        this.actionPropertyEditorConfig$ = this.actionPropertyEditorConfigSubject.pipe(takeUntil(this.destroyed$));
        this.actionProperties$ = this.actionPropertiesSubject.pipe(map(() => omit(this.getActionProperties(), ['name'])), distinctUntilChanged(isEqual), takeUntil(this.destroyed$));
        this.children$.pipe(first(), takeUntil(this.destroyed$)).subscribe((children) => {
            this.setChildren(children);
        });
    }
    updateActionProperties(props) {
        this.actionPropertiesSubject.next(Object.assign(Object.assign({}, this.actionPropertiesSubject.getValue()), props));
    }
    setActionProperties(props) {
        const { name, index } = this.actionPropertiesSubject.getValue();
        this.actionPropertiesSubject.next(Object.assign(Object.assign({ $condition$: null }, props), { name,
            index }));
    }
    getActionProperties() {
        return this.actionPropertiesSubject.getValue();
    }
    getActionPropertyValue(propertyName) {
        return this.actionPropertiesSubject.getValue()[propertyName];
    }
    setActionPropertyEditorConfig(actionEditorConfig) {
        const expressionConfigurator = new RxViewActionExpressionConfigurator(this.injector, this.descriptor.name, this.guid);
        actionEditorConfig = [
            {
                name: '$condition$',
                component: ExpressionFormControlComponent,
                options: {
                    label: 'Condition',
                    tooltip: new Tooltip('The action will execute if the condition is true, or if no condition is defined.'),
                    dataDictionary$: expressionConfigurator.getDataDictionary(),
                    operators: expressionConfigurator.getOperators()
                }
            },
            ...actionEditorConfig
        ];
        this.actionPropertyEditorConfigSubject.next(actionEditorConfig);
    }
    getActionPropertyEditorConfig() {
        return this.actionPropertyEditorConfigSubject.getValue();
    }
    setActionOutputDataDictionary(dataDictionary) {
        // check why index is coming as a string for existing actions
        this.viewDesignerFacade.setActionDataDictionaryBranch(this.guid, this.getActionPropertyValue('index'), this.descriptor.label, dataDictionary);
    }
    setChildren(data) {
        this.children = data;
    }
    getChildren() {
        return this.children;
    }
    onDestroy() {
        this.destroyedSubject.next();
        this.destroyedSubject.complete();
    }
}
//# sourceMappingURL=action-sandbox.class.js.map