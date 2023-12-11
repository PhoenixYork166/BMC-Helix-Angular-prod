import { Injectable } from '@angular/core';
import { AdaptTranslateService, AdvancedFilterDataTypesConfigsService, AdvancedFilterOptionDataType, formatAdvancedFilterTagText, isEmptyOrWhitespace } from '@bmc-ux/adapt-angular';
import { RecordFieldOption, RxRecordDefinitionService } from '@helix/platform/record/api';
import { RxObjectUtilsService } from '@helix/platform/utils';
import { isArray, isEmpty, isFunction, isNil, isString, uniq } from 'lodash';
import { RxRecordGridUtilsService } from './record-grid-utils.service';
import moment from 'moment-es6';
import { RxRecordGridAdvancedFilterValue } from '../types/record-grid-advanced-filter-value.class';
import { RxNamedListService } from '@helix/platform/named-list/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/record/api";
import * as i2 from "@helix/platform/utils";
import * as i3 from "./record-grid-utils.service";
import * as i4 from "@helix/platform/named-list/api";
import * as i5 from "@bmc-ux/adapt-angular";
export class RxRecordGridAdvancedFilteringService {
    constructor(rxRecordDefinitionService, rxObjectUtilsService, rxRecordGridUtilsService, rxNamedListService, advancedFilterDataTypesConfigsService, adaptTranslateService) {
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.rxObjectUtilsService = rxObjectUtilsService;
        this.rxRecordGridUtilsService = rxRecordGridUtilsService;
        this.rxNamedListService = rxNamedListService;
        this.advancedFilterDataTypesConfigsService = advancedFilterDataTypesConfigsService;
        this.adaptTranslateService = adaptTranslateService;
        this.translation = this.adaptTranslateService.getCurrentLanguage();
        this.adaptTexts = {
            fromLabel: this.translation['adapt.advancedFilter.configsTexts.fromLabel'],
            toLabel: this.translation['adapt.advancedFilter.configsTexts.toLabel'],
            trueLabel: this.translation['adapt.advancedFilter.configsTexts.trueLabel'],
            falseLabel: this.translation['adapt.advancedFilter.configsTexts.falseLabel'],
            blankLabel: this.translation['adapt.advancedFilter.configsTexts.blankLabel'],
            validationErrors: {
                invalidRangeName: this.translation['adapt.advancedFilter.validationErrors.invalidRangeName'],
                invalidRangeText: this.translation['adapt.advancedFilter.validationErrors.invalidRangeText'],
                numberTypeTexts: {
                    fromValueMustBeNumber: this.translation['adapt.advancedFilter.validationErrors.numberTypeTexts.fromValueMustBeNumber'],
                    toValueMustBeNumber: this.translation['adapt.advancedFilter.validationErrors.numberTypeTexts.toValueMustBeNumber'],
                    invalidBetweenMinAndMax: this.translation['adapt.advancedFilter.validationErrors.numberTypeTexts.invalidBetweenMinAndMax'],
                    invalidMinValue: this.translation['adapt.advancedFilter.validationErrors.numberTypeTexts.invalidMinValue'],
                    invalidMaxValue: this.translation['adapt.advancedFilter.validationErrors.numberTypeTexts.invalidMaxValue']
                }
            }
        };
        this.defaultConfig = this.advancedFilterDataTypesConfigsService.getConfigs(this.adaptTexts);
    }
    addAssociationFieldsToFieldDefinitionsById(fieldDefinitionsById, associationDescriptors, associatedRecordDefinitions) {
        associationDescriptors.forEach((associationDescriptor) => {
            const associatedRecordDefinition = associatedRecordDefinitions.find((recordDefinition) => recordDefinition.name === associationDescriptor.recordDefinitionName);
            associatedRecordDefinition.fieldDefinitions.forEach((fieldDefinition) => {
                const field = this.rxRecordGridUtilsService.getFieldIdForGridColumn(fieldDefinition.id, associationDescriptor);
                if (!fieldDefinitionsById[field]) {
                    this.rxRecordDefinitionService.addFieldDefinitionToMap(fieldDefinition, fieldDefinitionsById, field);
                }
            });
        });
        fieldDefinitionsById = Object.assign(Object.assign({}, fieldDefinitionsById), this.rxObjectUtilsService.expandProperties(fieldDefinitionsById));
        return fieldDefinitionsById;
    }
    getAdvancedFilterOption(fieldId, header, fieldDefinition, filterConfig, isHidden, customFilterTemplates, prefixLabel, namedFilterOptions, typeaheadKeystrokeCount, additionalQueryCriteria) {
        const config = {
            id: fieldId,
            label: header,
            dataType: filterConfig.filterOptionDataType,
            isHidden,
            data: isFunction(filterConfig.getDataForAdvancedFilter)
                ? filterConfig.getDataForAdvancedFilter(fieldDefinition, fieldId)
                : null
        };
        namedFilterOptions = namedFilterOptions !== null && namedFilterOptions !== void 0 ? namedFilterOptions : [];
        if (filterConfig.filterOptionDataType === AdvancedFilterOptionDataType.boolean) {
            config.inputsTemplate =
                fieldDefinition.fieldOption !== RecordFieldOption.Required
                    ? customFilterTemplates.optionalBooleanFilter
                    : customFilterTemplates.requiredBooleanFilter;
            config.customConfig = {
                getExpressionFieldTips: (filterOption) => {
                    const data = filterOption.data;
                    const selectOptions = (data === null || data === void 0 ? void 0 : data.selectOptions) || [];
                    const namedFilterOptionTips = this.getNamedFilterOptionTips(namedFilterOptions, filterOption, config.customConfig);
                    return namedFilterOptionTips.concat(selectOptions.map((selectOption) => {
                        return AdvancedFilterDataTypesConfigsService.createAdvancedFilterTag(new RxRecordGridAdvancedFilterValue([selectOption.id]), filterOption, config.customConfig, false, formatAdvancedFilterTagText(filterOption, selectOption.name));
                    }));
                },
                formatValueForTag: (value, option) => {
                    const data = option.data;
                    const selectOptions = (data === null || data === void 0 ? void 0 : data.selectOptions) || [];
                    const filterValueLabels = value.filterValue.map((id) => selectOptions.find((selectOption) => selectOption.id === id).name);
                    return this.buildTagLabel(filterValueLabels, this.getNamedOptionTitles(value, namedFilterOptions));
                },
                needRemoveTagValue: (value) => RxRecordGridAdvancedFilterValue.isEmpty(value),
                updateFilterValue: (newValue, oldValue, filterOption) => this.updateFilterValue(oldValue, newValue, filterOption.data.isRequired),
                parseTagFieldExpression: (filterOption, searchTerm) => {
                    const rawValues = AdvancedFilterDataTypesConfigsService.getExpressionRawValues(filterOption, searchTerm);
                    const value = this.getFilterValueFromString(namedFilterOptions, rawValues);
                    const data = filterOption.data;
                    const selectOptions = (data === null || data === void 0 ? void 0 : data.selectOptions) || [];
                    value.filterValue =
                        value.filterValue
                            .map((optionLabel) => {
                            var _a;
                            optionLabel = optionLabel.trim().toLowerCase();
                            const selectOption = selectOptions.find((option) => option.name.toLowerCase() === optionLabel);
                            return (_a = selectOption === null || selectOption === void 0 ? void 0 : selectOption.id) !== null && _a !== void 0 ? _a : null;
                        })
                            .filter((val) => !isNil(val)) || [];
                    return value.length ? { value } : null;
                }
            };
        }
        if (filterConfig.filterOptionDataType === AdvancedFilterOptionDataType.string) {
            if (fieldDefinition.namedListDefinition) {
                config.inputsTemplate = customFilterTemplates.inputsForStringWithTypeAheadTemplate;
                config.data = Object.assign(Object.assign({}, config.data), { typeaheadKeystrokeCount, additionalQueryCriteria });
            }
            else {
                config.inputsTemplate = customFilterTemplates.inputsForStringTypeTemplate;
            }
            config.customConfig = {
                needRemoveTagValue(value) {
                    return RxRecordGridAdvancedFilterValue.isEmpty(value);
                },
                formatValueForTag: (value, filterOption) => this.buildTagLabel(value.filterValue, this.getNamedOptionTitles(value, namedFilterOptions)),
                getExpressionFieldTips: (option, searchTerm) => {
                    return [
                        ...this.getNamedFilterOptionTips(namedFilterOptions, option, config.customConfig),
                        AdvancedFilterDataTypesConfigsService.createAdvancedFilterTag(new RxRecordGridAdvancedFilterValue(), option, config.customConfig, true, formatAdvancedFilterTagText(option, ''))
                    ];
                },
                updateFilterValue: (newValue, oldValue, filterOption) => this.updateFilterValue(oldValue, newValue),
                parseTagFieldExpression: (filterOption, searchTerm) => {
                    return this.parseStringTagFieldExpression(filterOption, searchTerm, namedFilterOptions);
                }
            };
        }
        if (filterConfig.filterOptionDataType === AdvancedFilterOptionDataType.selection) {
            config.inputsTemplate = customFilterTemplates.inputsForSelectionTypeTemplate;
            config.customConfig = {
                needRemoveTagValue(value) {
                    return RxRecordGridAdvancedFilterValue.isEmpty(value);
                },
                formatValueForTag: (value, option) => {
                    const filterValueLabels = this.defaultConfig[filterConfig.filterOptionDataType].formatValueForTag(value.filterValue, option);
                    return this.buildTagLabel(filterValueLabels, this.getNamedOptionTitles(value, namedFilterOptions));
                },
                getExpressionFieldTips: (filterOption, searchTerm) => {
                    const data = filterOption.data;
                    const selectOptions = (data && data.selectOptions) || [];
                    return this.getNamedFilterOptionTips(namedFilterOptions, filterOption, config.customConfig).concat(selectOptions.map((selectOption) => {
                        return AdvancedFilterDataTypesConfigsService.createAdvancedFilterTag(new RxRecordGridAdvancedFilterValue([selectOption.id]), filterOption, config.customConfig, false, formatAdvancedFilterTagText(filterOption, selectOption.name));
                    }));
                },
                updateFilterValue: (newValue, oldValue, filterOption) => this.updateFilterValue(oldValue, newValue),
                parseTagFieldExpression: (filterOption, searchTerm) => {
                    return this.parseStringTagFieldExpression(filterOption, searchTerm, namedFilterOptions);
                }
            };
        }
        if (filterConfig.filterOptionDataType === AdvancedFilterOptionDataType.datetime) {
            config.inputsTemplate = customFilterTemplates.inputsForDatetimeTypeTemplate;
            config.customConfig = this.getDatetimeCustomConfig(namedFilterOptions, config, AdvancedFilterOptionDataType.datetime, 'll LTS');
        }
        if (filterConfig.filterOptionDataType === AdvancedFilterOptionDataType.date) {
            config.inputsTemplate = customFilterTemplates.inputsForDateTypeTemplate;
            config.customConfig = this.getDatetimeCustomConfig(namedFilterOptions, config, AdvancedFilterOptionDataType.date, 'll');
        }
        if (filterConfig.filterOptionDataType === AdvancedFilterOptionDataType.time) {
            config.inputsTemplate = customFilterTemplates.inputsForTimeTypeTemplate;
            config.customConfig = this.getDatetimeCustomConfig(namedFilterOptions, config, AdvancedFilterOptionDataType.time, 'LTS');
        }
        if (filterConfig.filterOptionDataType === AdvancedFilterOptionDataType.number) {
            config.inputsTemplate = customFilterTemplates.inputsForNumberTypeTemplate;
            config.customConfig = {
                needRemoveTagValue(value) {
                    return RxRecordGridAdvancedFilterValue.isEmptyWithRange(value);
                },
                getExpressionFieldTips: (option, searchTerm) => {
                    return this.getNamedFilterOptionTips(namedFilterOptions, option, config.customConfig, [null, null]).concat(this.defaultConfig[filterConfig.filterOptionDataType].getExpressionFieldTips(option, searchTerm));
                },
                updateFilterValue: (newValue, oldValue, filterOption) => {
                    newValue.filterValue = this.defaultConfig[filterConfig.filterOptionDataType].updateFilterValue(newValue.filterValue, oldValue.filterValue, filterOption);
                    newValue.namedOptions = uniq(oldValue.namedOptions.concat(newValue.namedOptions));
                    return newValue;
                },
                formatValueForTag: (value) => {
                    const formattedValue = value.filterValue.filter((val) => val != null).join(' - ');
                    return this.buildTagLabel(formattedValue, this.getNamedOptionTitles(value, namedFilterOptions));
                },
                parseTagFieldExpression: (filterOption, searchTerm) => {
                    var _a, _b;
                    const { value: valuesStr, label } = this.getExpressionRawValues(filterOption, searchTerm);
                    if (!valuesStr) {
                        return null;
                    }
                    const value = this.getFilterValueFromString(namedFilterOptions, valuesStr);
                    value.filterValue =
                        (_b = (_a = this.defaultConfig[filterConfig.filterOptionDataType].parseTagFieldExpression(filterOption, `${label} ${value.filterValue[0]}`)) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : [];
                    return value.length ? { value } : null;
                },
                validateValue: (value, filterOption) => this.defaultConfig[filterConfig.filterOptionDataType].validateValue(value.filterValue, filterOption)
            };
        }
        if (prefixLabel) {
            const prefixConfig = {
                getTagText(value, option, formattedValue) {
                    return `${prefixLabel}: ${formattedValue}`;
                }
            };
            config.customConfig = Object.assign(Object.assign({}, config.customConfig), prefixConfig);
        }
        return config;
    }
    parseStringTagFieldExpression(filterOption, searchTerm, namedFilterOptions) {
        const valuesStr = AdvancedFilterDataTypesConfigsService.getExpressionRawValues(filterOption, searchTerm);
        if (!valuesStr) {
            return null;
        }
        const value = this.getFilterValueFromString(namedFilterOptions, valuesStr);
        return value.length ? { value } : null;
    }
    updateFilterValue(oldValue, newValue, replaceFilterValue = false) {
        if (!replaceFilterValue) {
            newValue.filterValue = uniq(oldValue.filterValue.concat(newValue.filterValue));
        }
        newValue.namedOptions = uniq(oldValue.namedOptions.concat(newValue.namedOptions));
        return newValue;
    }
    buildTagLabel(filterValueLabels, namedOptionTitles, filterValueSeparator = ', ', namedOptionsSeparator = '; ') {
        return [
            isString(filterValueLabels)
                ? filterValueLabels
                : isArray(filterValueLabels) && !isEmpty(filterValueLabels)
                    ? this.rxNamedListService.isNamedListOption(filterValueLabels[0])
                        ? filterValueLabels.map((value) => { var _a; return (_a = value.displayValue) !== null && _a !== void 0 ? _a : value.value; }).join(filterValueSeparator)
                        : filterValueLabels.join(filterValueSeparator)
                    : '',
            ...namedOptionTitles
        ]
            .filter(Boolean)
            .join(namedOptionsSeparator);
    }
    getNamedOptionTitles(value, options) {
        const optionGuids = options.map((option) => option.guid);
        return value.namedOptions
            .sort((option1, option2) => optionGuids.indexOf(option1) - optionGuids.indexOf(option2))
            .map((guid) => { var _a; return (_a = options.find((option) => option.guid === guid)) === null || _a === void 0 ? void 0 : _a.title; });
    }
    getDatetimeCustomConfig(namedFilterOptions, config, fieldType, tagValueFormat) {
        return {
            getExpressionFieldTips: (option, searchTerm) => {
                return this.getNamedFilterOptionTips(namedFilterOptions, option, config.customConfig).concat(this.defaultConfig[fieldType].getExpressionFieldTips(option, searchTerm));
            },
            needRemoveTagValue(value) {
                return RxRecordGridAdvancedFilterValue.isEmptyWithRange(value);
            },
            formatValueForTag: (value) => {
                const formattedValue = value.filterValue
                    .filter((val) => val)
                    .map((date) => moment(date).format(tagValueFormat))
                    .join(' - ');
                return this.buildTagLabel(formattedValue, this.getNamedOptionTitles(value, namedFilterOptions));
            },
            updateFilterValue: (newValue, oldValue, filterOption) => {
                newValue.filterValue = this.defaultConfig[fieldType].updateFilterValue(newValue.filterValue, oldValue.filterValue, filterOption);
                newValue.namedOptions = uniq(oldValue.namedOptions.concat(newValue.namedOptions));
                return newValue;
            },
            parseTagFieldExpression: (filterOption, searchTerm) => {
                var _a, _b;
                const { value: valuesStr } = this.getExpressionRawValues(filterOption, searchTerm);
                if (!valuesStr) {
                    return null;
                }
                const value = this.getFilterValueFromString(namedFilterOptions, valuesStr);
                const [dateStr] = searchTerm.split('; ');
                value.filterValue = (_b = (_a = this.defaultConfig[fieldType].parseTagFieldExpression(filterOption, dateStr)) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : [];
                return value.length ? { value } : null;
            },
            validateValue: (value, filterOption) => this.defaultConfig[fieldType].validateValue(value.filterValue, filterOption)
        };
    }
    getExpressionRawValues(filterOption, searchTerm) {
        return [
            `${filterOption.label}:`,
            `${filterOption.label} ${this.adaptTexts.fromLabel}`,
            `${filterOption.label} ${this.adaptTexts.toLabel}`
        ].reduce((result, mask) => {
            if (searchTerm.startsWith(mask)) {
                result.label = mask;
                result.value = searchTerm.replace(mask, '').trim();
            }
            return result;
        }, { label: null, value: null });
    }
    getFilterValueFromString(namedFilterOptions, valuesStr) {
        const values = (valuesStr !== null && valuesStr !== void 0 ? valuesStr : '')
            .trim()
            .split(';')
            .filter((str) => !isEmptyOrWhitespace(str))
            .map((str) => str.trim());
        const value = new RxRecordGridAdvancedFilterValue([]);
        values.forEach((val) => {
            var _a;
            const namedOptionGuid = (_a = namedFilterOptions.find((item) => item.title === val)) === null || _a === void 0 ? void 0 : _a.guid;
            if (namedOptionGuid) {
                value.namedOptions.push(namedOptionGuid);
            }
            else {
                value.filterValue.push(...val
                    .split(',')
                    .map((str) => str.trim())
                    .filter(Boolean));
            }
        });
        value.namedOptions = uniq(value.namedOptions);
        return value;
    }
    getNamedFilterOptionTips(namedFilterOptions, option, filterOptionConfig, value = []) {
        return (namedFilterOptions !== null && namedFilterOptions !== void 0 ? namedFilterOptions : []).map((item) => AdvancedFilterDataTypesConfigsService.createAdvancedFilterTag(new RxRecordGridAdvancedFilterValue(value, [item.guid]), option, filterOptionConfig, false, formatAdvancedFilterTagText(option, item.title)));
    }
}
RxRecordGridAdvancedFilteringService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridAdvancedFilteringService, deps: [{ token: i1.RxRecordDefinitionService }, { token: i2.RxObjectUtilsService }, { token: i3.RxRecordGridUtilsService }, { token: i4.RxNamedListService }, { token: i5.AdvancedFilterDataTypesConfigsService }, { token: i5.AdaptTranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordGridAdvancedFilteringService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridAdvancedFilteringService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridAdvancedFilteringService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxRecordDefinitionService }, { type: i2.RxObjectUtilsService }, { type: i3.RxRecordGridUtilsService }, { type: i4.RxNamedListService }, { type: i5.AdvancedFilterDataTypesConfigsService }, { type: i5.AdaptTranslateService }]; } });
//# sourceMappingURL=record-grid-advanced-filtering.service.js.map