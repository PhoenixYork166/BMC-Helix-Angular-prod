import { TypeDecorator } from '@angular/core';
export declare enum RxViewComponentType {
    ButtonBar = "rx-button-bar",
    RecordEditor = "rx-record-editor",
    ActionButton = "rx-action-button",
    Action = "rx-action",
    Page = "rx-page",
    ExtensionContainer = "rx-extension-container",
    Container = "rx-container",
    RichText = "rx-rich-text",
    TabPanel = "rx-tab-panel",
    TabContainer = "rx-tab-container",
    Image = "rx-image",
    ServiceList = "rx-service-list",
    Unknown = "rx-unknown",
    Association = "rx-association",
    AssociatedRecordField = "rx-associated-record-field",
    DateTime = "rx-date-time-field",
    Selection = "rx-selection-field",
    Date = "rx-date-field",
    Time = "rx-time-field",
    Integer = "rx-integer-field",
    Floating = "rx-floating-field",
    Decimal = "rx-decimal-field",
    Boolean = "rx-boolean-field",
    Attachment = "rx-attachment-field",
    Character = "rx-character-field",
    LocalizedCharacter = "rx-localized-character-field",
    Textarea = "rx-textarea-field",
    SelectGroup = "rx-select-group",
    SelectGroupField = "rx-select-group-field",
    RichTextarea = "rx-rich-textarea-field",
    ViewPresetSelector = "rx-view-preset-selector",
    ViewPreset = "rx-view-preset"
}
export declare enum BwfViewComponentType {
    DynamicNamedList = "ux-dynamic-named-list"
}
export interface RxViewComponent {
    name: string;
}
export interface RxViewComponentDecorator {
    (rxViewComponent?: RxViewComponent): TypeDecorator;
    new (rxViewComponent?: RxViewComponent): RxViewComponent;
}
export declare const RxViewComponent: RxViewComponentDecorator;
