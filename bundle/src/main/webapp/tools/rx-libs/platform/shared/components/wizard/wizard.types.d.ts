import { ComponentFactory } from '@angular/core';
import { IPlainObject } from '@helix/platform/shared/api';
export interface IWizardApi {
    isCurrentStepActive(stepId: string): boolean;
    addStep(step: IWizardStep, index?: number): void;
    complete(): void;
    disableFinishButton(): void;
    disableNextButton(): void;
    disablePreviousButton(): void;
    enableFinishButton(): void;
    enableNextButton(): void;
    enablePreviousButton(): void;
    getSteps(): IWizardStep[];
    markPristine(): void;
    markDirty(): void;
    removeNextSteps(startIndex: number): void;
    removeStep(index: number): void;
    renew(): void;
    setFinishButtonLabel(label: string): void;
    updateContext(context: IPlainObject, markDirty?: boolean): void;
}
export interface IWizardStep {
    componentFactory: ComponentFactory<any>;
    id: string;
    isActivated?: boolean;
    name: string;
    options?: IPlainObject;
    handlesNext?: boolean;
}
export interface IWizardOptions {
    allowClose?: boolean;
    allowFinish?: boolean;
    finishButtonLabel?: string;
    isDirty?: boolean;
    isFinishButtonDisabled?: boolean;
    isNextButtonDisabled?: boolean;
    isPreviousButtonDisabled?: boolean;
    notificationMessage?: string;
    steps: IWizardStep[];
    title: string;
}
export interface IWizardConfig<TContext> {
    context: TContext;
    options: IWizardOptions;
}
