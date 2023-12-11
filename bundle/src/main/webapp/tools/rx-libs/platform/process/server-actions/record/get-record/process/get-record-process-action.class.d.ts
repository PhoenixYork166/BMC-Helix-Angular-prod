import { RxProcessAction } from '@helix/platform/process/elements';
declare const RxGetRecordProcessAction_base: {
    new (...args: any[]): {
        initialize(config: any): void;
        afterRecordDefinitionNameChange(inputMapPropertyValue: string): void;
        afterSampleRecordDefinitionNameChange(inputMapPropertyValue: string): void;
        getRecordDefinitionNameChangeConfirmationMessageKey(): string;
    };
} & {
    new (...args: any[]): {
        lastRecordDefinitionName: string;
        lastSampleRecordDefinitionName: string;
        selectExpressionDropdownValue: string;
        initialize(config: any): void;
        afterRecordDefinitionNameChange(recordDefinitionName: string): void;
        afterSampleRecordDefinitionNameChange(sampleRecordDefinitionName: string): void;
        getRecordDefinitionName(): string;
        getRecordDefinitionNameChangeConfirmationMessageKey(): string;
        getSampleRecordDefinitionName(): string;
        onInputMapChanged(element: any, inputMap: import("../../record-server-action.types").IRecordServerActionInputMapModel, inputMapPropertyPath: string, inputMapPropertyValue: string, isCommandManagerOperation: boolean): void;
    };
} & typeof RxProcessAction;
export declare class RxGetRecordProcessAction extends RxGetRecordProcessAction_base {
    initialize(config: any): any;
}
export {};
