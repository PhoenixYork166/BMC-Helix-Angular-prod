import { Constructor } from '@helix/platform/utils';
export declare function RxGetRecordServerActionMixin<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        initialize(config: any): void;
        afterRecordDefinitionNameChange(inputMapPropertyValue: string): void;
        afterSampleRecordDefinitionNameChange(inputMapPropertyValue: string): void;
        getRecordDefinitionNameChangeConfirmationMessageKey(): string;
    };
} & TBase;
