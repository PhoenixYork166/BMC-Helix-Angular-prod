const activeColor = '--active-color';
const dropdownBorder = '--dropdown-border';
const dropdownBorderRadius = '--dropdown-border-radius';
const dropdownBoxShadow = '--dropdown-box-shadow';
const dropdownFontSize = '--dropdown-font-size';
const dropdownItemActiveBgColor = '--dropdown-item-active-bg-color';
const dropdownMenuColor = '--dropdown-menu-color';
const dropdownPadding = '--dropdown-padding';
const fontFamilyBase = '--font-family-base';
const lineHeightBase = '--line-height-base';
const selectOptionPadding = '--select-option-padding';
const cssVariables = [
    activeColor,
    dropdownBorder,
    dropdownBorderRadius,
    dropdownBoxShadow,
    dropdownFontSize,
    dropdownItemActiveBgColor,
    dropdownMenuColor,
    dropdownPadding,
    fontFamilyBase,
    lineHeightBase,
    selectOptionPadding
];
export const RX_THEMING = {
    cssVariablesForCkEditor: cssVariables,
    cssVariableLocator: {
        body: {
            'line-height': lineHeightBase
        },
        '.text-active': {
            color: activeColor
        },
        '.dropdown-menu': {
            border: dropdownBorder,
            'border-radius': dropdownBorderRadius,
            'box-shadow': dropdownBoxShadow,
            color: dropdownMenuColor,
            'font-size': dropdownFontSize,
            padding: dropdownPadding
        },
        '.rx-select__option': {
            padding: selectOptionPadding
        },
        '.dropdown_select__menu .dropdown-item.active': {
            'background-color': dropdownItemActiveBgColor
        },
        '.font-sans': {
            'font-family': fontFamilyBase
        }
    }
};
//# sourceMappingURL=theming.constant.js.map