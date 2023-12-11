import { Constructor } from '@helix/platform/utils';
import { IRecordServerActionInputMapModel } from './record-server-action.types';
export declare function RxRecordServerActionMixin<TBase extends Constructor>(Base: TBase): {
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
        onInputMapChanged(element: any, inputMap: IRecordServerActionInputMapModel, inputMapPropertyPath: string, inputMapPropertyValue: string, isCommandManagerOperation: boolean): void;
    };
} & TBase;
