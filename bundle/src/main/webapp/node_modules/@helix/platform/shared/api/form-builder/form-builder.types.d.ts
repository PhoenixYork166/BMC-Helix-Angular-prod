export interface IFormBuilderEvent {
    type: string | FormBuilderEvent;
    payload?: any;
}
export declare enum FormBuilderEvent {
    HideWidget = 0
}
