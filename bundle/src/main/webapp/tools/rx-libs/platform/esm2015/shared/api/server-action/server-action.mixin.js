import { clone, get, has, last } from 'lodash';
import { startWith } from 'rxjs/operators';
export function RxServerActionMixin(Base) {
    return class RxServerAction extends Base {
        // TODO-VS: add types after rappid update
        initialize(config) {
            // @ts-ignore
            super.initialize(config);
            this.setDataDictionaryBranch();
            // TODO-VS: add types after rappid update
            // @ts-ignore
            this.on('change:elementModel', (element, elementModel, changedProperty) => {
                if (startWith(changedProperty.propertyPath, 'elementModel/inputMap')) {
                    const inputMapPropertyPath = last(changedProperty.propertyPath.split('/'));
                    let inputMapPropertyValue = changedProperty.propertyValue;
                    const isCommandManagerOperation = has(changedProperty, 'commandManager');
                    if (isCommandManagerOperation) {
                        inputMapPropertyValue = elementModel.inputMap[inputMapPropertyPath];
                    }
                    this.setDataDictionaryBranch();
                    this.onInputMapChanged(element, elementModel.inputMap, inputMapPropertyPath, inputMapPropertyValue, isCommandManagerOperation);
                }
            });
        }
        clearOutputMap() {
            // @ts-ignore
            this.prop('elementModel/outputMap', [], {
                rxSilent: true,
                rewrite: true
            });
        }
        getElementService(type) {
            return null;
        }
        getInputMap() {
            // @ts-ignore
            return clone(this.prop('elementModel/inputMap')) || {};
        }
        // TODO-VS: add types after rappid update
        onInputMapChanged(element, inputMap, inputMapPropertyPath, inputMapPropertyValue, isCommandManagerOperation) { }
        setDataDictionaryBranch() {
            // @ts-ignore
            const elementService = this.getElementService(this.prop('type'));
            elementService.setCommonDataDictionaryBranch(
            // @ts-ignore
            this.prop('elementModel/guid'), 
            // @ts-ignore
            elementService.buildDataDictionaryBranch(this.prop('elementModel')));
        }
        setInputMap(inputMap, options) {
            // use 'rewrite' option to prevent the default 'merge' behavior
            // @ts-ignore
            this.prop('elementModel/inputMap', inputMap, {
                rxSilent: true,
                rewrite: true,
                silent: get(options, 'isSilent', false)
            });
        }
    };
}
//# sourceMappingURL=server-action.mixin.js.map