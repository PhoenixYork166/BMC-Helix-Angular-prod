import { ColorVariantType } from '@bmc-ux/adapt-angular';
export interface IModalConfig {
    title: string;
    modalStyle?: ColorVariantType;
    message?: string;
    isDialog?: boolean;
    buttons?: {
        confirmButton: string;
        dismissButton?: string;
    };
}
export interface IDialogApi {
    dismissDialog: () => void;
    isDirty: () => boolean;
}
export interface IPromptResponse {
    response: boolean;
    answer?: string;
}
