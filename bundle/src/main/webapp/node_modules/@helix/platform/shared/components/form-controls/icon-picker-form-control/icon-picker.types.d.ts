export interface IIconGlyph {
    description: string;
    id: string;
    name: string;
    tags: string;
    unicode: string;
}
export interface IIconBrowserDialogConfig {
    icons: IIconGlyph[];
    selectedIcon: IIconGlyph;
}
export interface IIconPickerFormControlOptions {
    label: string;
    required: boolean;
    appendToBody: boolean;
}
