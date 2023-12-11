import { TranslateService } from '@ngx-translate/core';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RxRootInjector } from '@helix/platform/shared/api';
import { RX_SELECT_EXPRESSION_DROPDOWN } from '@helix/platform/shared/components';
import { RX_RECORD_SERVER_ACTION } from './record-server-action.constant';
export function RxRecordServerActionMixin(Base) {
    return class RxRecordServerAction extends Base {
        initialize(config) {
            // @ts-ignore
            super.initialize(config);
            this.lastRecordDefinitionName = this.getRecordDefinitionName();
            this.lastSampleRecordDefinitionName = this.getSampleRecordDefinitionName();
            if (this.lastRecordDefinitionName) {
                if (this.lastRecordDefinitionName.match(RX_RECORD_SERVER_ACTION.dynamicRecordDefinitionNameRegex)) {
                    this.selectExpressionDropdownValue = RX_SELECT_EXPRESSION_DROPDOWN.dropDownOptionsValue.expression;
                }
                else {
                    this.selectExpressionDropdownValue = RX_SELECT_EXPRESSION_DROPDOWN.dropDownOptionsValue.select;
                }
            }
        }
        afterRecordDefinitionNameChange(recordDefinitionName) {
            this.lastRecordDefinitionName = recordDefinitionName;
            // @ts-ignore
            this.getCommandManager().storeBatchCommand();
        }
        afterSampleRecordDefinitionNameChange(sampleRecordDefinitionName) {
            this.lastSampleRecordDefinitionName = sampleRecordDefinitionName;
            // @ts-ignore
            this.getCommandManager().storeBatchCommand();
        }
        getRecordDefinitionName() {
            // @ts-ignore
            const recordDefinitionName = this.getInputMap().recordDefinitionName;
            return recordDefinitionName ? recordDefinitionName.replace(/^"|"$/g, '') : null;
        }
        getRecordDefinitionNameChangeConfirmationMessageKey() {
            return 'com.bmc.arsys.rx.client.process-designer.inspector.clear-input-output-maps-confirmation.message';
        }
        getSampleRecordDefinitionName() {
            // @ts-ignore
            const sampleRecordDefinitionName = this.getInputMap().sampleRecordDefinitionName;
            return sampleRecordDefinitionName ? sampleRecordDefinitionName.replace(/^"|"$/g, '') : null;
        }
        onInputMapChanged(element, inputMap, inputMapPropertyPath, inputMapPropertyValue, isCommandManagerOperation) {
            if (inputMapPropertyPath === 'recordDefinitionName') {
                if (isCommandManagerOperation) {
                    this.lastRecordDefinitionName = inputMapPropertyValue;
                }
                else if (inputMapPropertyValue !== this.lastRecordDefinitionName) {
                    // @ts-ignore
                    this.getCommandManager().initBatchCommand();
                    // @ts-ignore
                    if (this.lastRecordDefinitionName) {
                        RxRootInjector.injector
                            .get(RxModalService)
                            .confirm({
                            title: RxRootInjector.injector
                                .get(TranslateService)
                                .instant('com.bmc.arsys.rx.client.common.warning.label'),
                            modalStyle: RX_MODAL.modalStyles.warning,
                            message: RxRootInjector.injector
                                .get(TranslateService)
                                .instant(this.getRecordDefinitionNameChangeConfirmationMessageKey())
                        })
                            .then((context) => {
                            if (context) {
                                this.afterRecordDefinitionNameChange(inputMapPropertyValue);
                            }
                            else {
                                // @ts-ignore
                                this.getCommandManager().storeBatchCommand();
                                // @ts-ignore
                                this.getCommandManager().cancel();
                            }
                        })
                            .catch(() => {
                            // @ts-ignore
                            this.getCommandManager().storeBatchCommand();
                            // @ts-ignore
                            this.getCommandManager().cancel();
                        });
                    }
                    else {
                        this.afterRecordDefinitionNameChange(inputMapPropertyValue);
                    }
                }
                if (inputMapPropertyValue) {
                    if (inputMapPropertyValue.match(RX_RECORD_SERVER_ACTION.dynamicRecordDefinitionNameRegex)) {
                        this.selectExpressionDropdownValue = RX_SELECT_EXPRESSION_DROPDOWN.dropDownOptionsValue.expression;
                    }
                    else {
                        this.selectExpressionDropdownValue = RX_SELECT_EXPRESSION_DROPDOWN.dropDownOptionsValue.select;
                    }
                }
            }
            if (inputMapPropertyPath === 'sampleRecordDefinitionName') {
                if (isCommandManagerOperation) {
                    this.lastSampleRecordDefinitionName = inputMapPropertyValue;
                }
                else if (inputMapPropertyValue !== this.lastSampleRecordDefinitionName) {
                    // @ts-ignore
                    this.getCommandManager().initBatchCommand();
                    if (this.lastSampleRecordDefinitionName) {
                        RxRootInjector.injector
                            .get(RxModalService)
                            .confirm({
                            title: RxRootInjector.injector
                                .get(TranslateService)
                                .instant('com.bmc.arsys.rx.client.common.warning.label'),
                            modalStyle: RX_MODAL.modalStyles.warning,
                            message: RxRootInjector.injector
                                .get(TranslateService)
                                .instant(this.getRecordDefinitionNameChangeConfirmationMessageKey())
                        })
                            .then(() => {
                            this.afterSampleRecordDefinitionNameChange(inputMapPropertyValue);
                        })
                            .catch(() => {
                            // @ts-ignore
                            this.getCommandManager().storeBatchCommand();
                            // @ts-ignore
                            this.getCommandManager().cancel();
                        });
                    }
                    else {
                        this.afterSampleRecordDefinitionNameChange(inputMapPropertyValue);
                    }
                }
            }
        }
    };
}
//# sourceMappingURL=record-server-action.mixin.js.map