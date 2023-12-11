import { assign } from 'lodash';
export function RxGetRecordServerActionMixin(Base) {
    return class RxGetRecordServerAction extends Base {
        initialize(config) {
            // @ts-ignore
            super.initialize(config);
        }
        afterRecordDefinitionNameChange(inputMapPropertyValue) {
            // @ts-ignore
            this.lastRecordDefinitionName = inputMapPropertyValue;
            // @ts-ignore
            this.clearOutputMap();
            // @ts-ignore
            this.setInputMap(
            // @ts-ignore
            assign(this.getInputMap(), {
                // @ts-ignore
                recordDefinitionName: this.lastRecordDefinitionName,
                sampleRecordDefinitionName: null,
                attachmentFieldID: ''
            }));
            // @ts-ignore
            this.getCommandManager().storeBatchCommand();
        }
        afterSampleRecordDefinitionNameChange(inputMapPropertyValue) {
            // @ts-ignore
            this.lastSampleRecordDefinitionName = inputMapPropertyValue;
            // @ts-ignore
            this.clearOutputMap();
            // @ts-ignore
            this.setInputMap(
            // @ts-ignore
            assign(this.getInputMap(), {
                // @ts-ignore
                recordDefinitionName: this.lastRecordDefinitionName,
                // @ts-ignore
                sampleRecordDefinitionName: this.lastSampleRecordDefinitionName
            }));
            // @ts-ignore
            this.getCommandManager().storeBatchCommand();
        }
        getRecordDefinitionNameChangeConfirmationMessageKey() {
            return 'com.bmc.arsys.rx.client.process-designer.inspector.clear-output-map-confirmation.message';
        }
    };
}
//# sourceMappingURL=get-record-server-action.mixin.js.map