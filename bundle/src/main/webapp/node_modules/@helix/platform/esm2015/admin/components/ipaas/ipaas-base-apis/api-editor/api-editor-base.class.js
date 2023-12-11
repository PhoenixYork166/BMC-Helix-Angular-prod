import { Injectable, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { RxNotificationService } from '@helix/platform/shared/api';
import { RX_RECORD_DEFINITION, RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { cloneDeep, compact, find, findKey, forEach, get, groupBy, includes, keys, map as _map, merge, pull, some, sortBy, trim } from 'lodash';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, switchMap, takeUntil } from 'rxjs/operators';
import { RX_IPAAS_APIS } from '../ipaas-base-apis.constant';
import { AuthTypes } from '../ipaas-base-apis.types';
import { RxModalClass } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
export class ApiEditorBase extends RxModalClass {
    constructor(activeModalRef, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.injector = injector;
        this.formBuilder = this.injector.get(FormBuilder);
        this.rxNotificationService = this.injector.get(RxNotificationService);
        this.translateService = this.injector.get(TranslateService);
        this.rxRecordInstanceDataPageService = this.injector.get(RxRecordInstanceDataPageService);
        this.organizations = [];
        this.environments = [];
        this.groupNameList = [];
        this.methodTypeOptions = [];
        this.authTypeOptions = [];
        this.activeIndex = 0;
        this.isEditMode = false;
        this.authTypeFields = [];
        this.apiPaths = [];
        this.loadingState = false;
        this.defaultSelection = this.translateService.instant('com.bmc.arsys.rx.client.common.select.label');
        this.destroyed$ = new ReplaySubject(1);
        this.optionFormatterLabel = (option) => this.translateService.instant(get(option, 'labelKey', this.defaultSelection));
        this.optionFormatterName = (option) => this.translateService.instant(get(option, 'name', this.defaultSelection));
        this.selectedApiDefinition = this.activeModalRef.getData();
        this.isEditMode = Boolean(this.selectedApiDefinition.id);
    }
    ngOnInit() {
        super.ngOnInit();
        this.ipaasApiEditorForm = this.formBuilder.group({
            organization: [[], Validators.required],
            environment: [[], Validators.required],
            apiPath: [[], Validators.required],
            apiGroupName: ['', [Validators.required, Validators.maxLength(254), Validators.pattern('^[a-zA-Z0-9 _-]+$')]],
            apiName: ['', [Validators.required, Validators.maxLength(254), Validators.pattern('^[a-zA-Z0-9 _-]+$')]],
            requestMethod: [[], Validators.required],
            authorizationType: [[], Validators.required],
            headers: this.formBuilder.array([]),
            queryParameters: this.formBuilder.array([]),
            authTypeDetails: this.formBuilder.array([]),
            customAuthTypeHeaders: this.formBuilder.array([]),
            customAuthTypeQueryParams: this.formBuilder.array([])
        });
        this.ipaasApiEditorForm.patchValue({ apiGroupName: this.selectedApiDefinition.groupName });
        this.busy = this.getOrganizationsAndEnvironments().subscribe((data) => {
            this.organizations = data;
            if (this.organizations.length === 1) {
                this.ipaasApiEditorForm.get('organization').setValue([this.organizations[0]]);
                this.getEnvironments(this.organizations[0]);
            }
        });
        this.getGroupAndApiDetails();
        if (this.isEditMode) {
            this.busy = this.getApiDefinition(this.selectedApiDefinition.id)
                .pipe(switchMap((data) => {
                var _a, _b;
                this.initialApiDefinition = cloneDeep(data);
                this.ipaasApiEditorForm.patchValue({
                    organization: [{ name: data.organization, id: data.organizationId }],
                    environment: [{ name: data.environment, id: data.environmentId }],
                    apiPath: [data.path],
                    apiGroupName: data.group,
                    apiName: data.name,
                    requestMethod: [RX_IPAAS_APIS.methods[data.method]],
                    authorizationType: [find(RX_IPAAS_APIS.authTypeOptions, (type) => type.id === data.authType)]
                });
                this.selectedOrganization = { id: data.organizationId, name: data.organization };
                this.authTypeFields = RX_IPAAS_APIS.authTypeFields[data.authType];
                this.isCustomAuthType = data.authType === AuthTypes.CUSTOM;
                if (this.isCustomAuthType) {
                    forEach(data.authTypeDetails.httpHeaders, (httpHeader) => this.ipaasApiEditorForm.get('customAuthTypeHeaders').push(this.customAuthTypeFormItem(httpHeader)));
                    forEach(data.authTypeDetails.queryParams, (queryParam) => this.ipaasApiEditorForm.get('customAuthTypeQueryParams').push(this.customAuthTypeFormItem(queryParam)));
                }
                else {
                    this.createAuthTypeFormFields();
                }
                forEach(compact((_a = data.headers) === null || _a === void 0 ? void 0 : _a.split(',')), (header) => {
                    this.setApiVariables('headers', header);
                });
                forEach(compact((_b = data.queryParams) === null || _b === void 0 ? void 0 : _b.split(',')), (param) => {
                    this.setApiVariables('queryParameters', param);
                });
                return this.getApiPathDefinitions({ name: data.environment, id: data.environmentId });
            }))
                .subscribe((apiPath) => {
                this.onEditMethodAndAuthTypeUpdate(apiPath);
            });
        }
        this.ipaasApiEditorForm
            .get('apiName')
            .valueChanges.pipe(takeUntil(this.destroyed$))
            .subscribe((value) => {
            var _a;
            const isApiNameAlreadyExists = !(((_a = this.selectedApiDefinition) === null || _a === void 0 ? void 0 : _a.apiName) === value) &&
                some(this.groupAndApiNameList, (group) => group[RX_IPAAS_APIS.fieldIds.groupName] === trim(this.ipaasApiEditorForm.get('apiGroupName').value) &&
                    includes(group.apis, trim(value)));
            if (isApiNameAlreadyExists) {
                this.ipaasApiEditorForm.get('apiName').setErrors({
                    invalidApi: {
                        message: this.translateService.instant('com.bmc.arsys.rx.client.admin.ipaas-api-editor.api-name-exists.error.message')
                    }
                });
            }
        });
        this.ipaasApiEditorForm
            .get('apiGroupName')
            .valueChanges.pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
            .subscribe(() => {
            this.ipaasApiEditorForm.get('apiName').updateValueAndValidity();
        });
    }
    isDirty() {
        return this.ipaasApiEditorForm.dirty;
    }
    createFormItem(value) {
        return this.formBuilder.group({
            name: [value, [Validators.maxLength(254), Validators.pattern('^[a-zA-Z0-9_-]+$')]]
        });
    }
    customAuthTypeFormItem(fieldData) {
        return this.formBuilder.group({
            key: [fieldData.key, [Validators.required, Validators.maxLength(254), Validators.pattern('^[a-zA-Z0-9_-]+$')]],
            value: [fieldData.value, [Validators.required, Validators.maxLength(254), Validators.pattern('^[a-zA-Z0-9_-]+$')]]
        });
    }
    getEnvironments(organization) {
        this.selectedOrganization = organization;
        this.environments = organization.environments || [];
        if (this.environments.length === 1) {
            this.ipaasApiEditorForm.get('environment').setValue([this.environments[0]]);
            this.getApiPaths(this.environments[0]);
        }
        else {
            this.ipaasApiEditorForm.get('environment').setValue([]);
            this.getApiPaths();
        }
    }
    setApiVariables(type, value) {
        const apiVariable = this.ipaasApiEditorForm.get(type);
        apiVariable.push(this.createFormItem(value));
    }
    getAuthTypes(method) {
        var _a, _b, _c, _d;
        this.ipaasApiEditorForm.get('authorizationType').setValue([]);
        this.authTypeFieldDetails = (_a = this.apiPathDetails[this.selectedApiPath][method]) === null || _a === void 0 ? void 0 : _a.authTypes;
        this.authTypeOptions = _map(this.authTypeFieldDetails, (option) => find(RX_IPAAS_APIS.authTypeOptions, (type) => type.id === AuthTypes[keys(option)[0]]));
        if (((_b = this.authTypeOptions) === null || _b === void 0 ? void 0 : _b.length) === 1) {
            this.ipaasApiEditorForm.get('authorizationType').setValue([this.authTypeOptions[0]]);
            this.getAuthTypeFields(this.authTypeOptions[0]);
        }
        else {
            this.authTypeFields = RX_IPAAS_APIS.authTypeFields[0];
            this.createAuthTypeFormFields();
        }
        forEach((_c = this.apiPathDetails[this.selectedApiPath][method]) === null || _c === void 0 ? void 0 : _c.headers, (header) => {
            this.setApiVariables('headers', header);
        });
        forEach((_d = this.apiPathDetails[this.selectedApiPath][method]) === null || _d === void 0 ? void 0 : _d.queryParams, (param) => {
            this.setApiVariables('queryParameters', param);
        });
    }
    onEditMethodAndAuthTypeUpdate(apiPath) {
        var _a;
        this.environments = this.getEnvironmentList();
        this.apiPaths = keys(apiPath);
        this.apiPathDetails = apiPath;
        this.selectedApiPath = this.initialApiDefinition.path;
        this.methodTypeOptions = keys(apiPath[this.initialApiDefinition.path]);
        this.authTypeFieldDetails =
            (_a = this.apiPathDetails[this.selectedApiPath][RX_IPAAS_APIS.methods[this.initialApiDefinition.method]]) === null || _a === void 0 ? void 0 : _a.authTypes;
        this.authTypeOptions = _map(this.authTypeFieldDetails, (option) => find(RX_IPAAS_APIS.authTypeOptions, { id: AuthTypes[keys(option)[0]] }));
    }
    getApiPaths(environment) {
        this.ipaasApiEditorForm.get('apiPath').setValue([]);
        this.apiPaths = [];
        this.resetFormFields();
        if (environment) {
            this.loadingState = true;
            this.getApiPathDefinitions(environment).subscribe((response) => {
                this.apiPathDetails = response;
                this.apiPaths = keys(response);
                if (this.apiPaths.length === 1) {
                    this.ipaasApiEditorForm.get('apiPath').setValue([this.apiPaths[0]]);
                    this.getApiMethods(this.apiPaths[0]);
                }
                this.loadingState = false;
            }, () => {
                this.loadingState = false;
            });
        }
    }
    getApiMethods(apiPath) {
        var _a;
        this.resetFormFields();
        this.selectedApiPath = apiPath;
        this.methodTypeOptions = keys(this.apiPathDetails[this.selectedApiPath]);
        if (((_a = this.methodTypeOptions) === null || _a === void 0 ? void 0 : _a.length) === 1) {
            this.ipaasApiEditorForm.get('requestMethod').setValue([this.methodTypeOptions[0]]);
            this.getAuthTypes(this.methodTypeOptions[0]);
        }
    }
    getGroupAndApiDetails() {
        const params = {
            startIndex: 0,
            pageSize: -1,
            recorddefinition: this.selectedApiDefinition.recordDefinitionName,
            propertySelection: [
                RX_IPAAS_APIS.fieldIds.groupName,
                RX_IPAAS_APIS.fieldIds.apiName,
                RX_RECORD_DEFINITION.coreFieldIds.id
            ]
        };
        this.rxRecordInstanceDataPageService
            .post({ params })
            .pipe(map((response) => ({
            data: _map(groupBy(response.data, RX_IPAAS_APIS.fieldIds.groupName), (options, id) => {
                return {
                    [RX_IPAAS_APIS.fieldIds.groupName]: id,
                    apis: _map(options, (option) => option[RX_IPAAS_APIS.fieldIds.apiName])
                };
            })
        })))
            .subscribe((response) => {
            this.groupAndApiNameList = response.data;
            this.groupNameList = sortBy(_map(this.groupAndApiNameList, (option) => option[RX_IPAAS_APIS.fieldIds.groupName]));
        });
    }
    getAuthTypeFields(authType) {
        var _a, _b, _c, _d;
        const authTypeDetail = find(this.authTypeFieldDetails, authType.key)[authType.key];
        this.isCustomAuthType = authType.id === AuthTypes.CUSTOM;
        if (this.isCustomAuthType) {
            // "[foo, bar]" => ["foo", "bar"]
            const headerKeys = ((_b = (_a = authTypeDetail.headers) === null || _a === void 0 ? void 0 : _a.replace(/[\[\] ]/g, '')) === null || _b === void 0 ? void 0 : _b.split(',')) || [];
            const queryParamKeys = ((_d = (_c = authTypeDetail.queryParams) === null || _c === void 0 ? void 0 : _c.replace(/[\[\] ]/g, '')) === null || _d === void 0 ? void 0 : _d.split(',')) || [];
            this.ipaasApiEditorForm.get('customAuthTypeHeaders').clear();
            this.ipaasApiEditorForm.get('customAuthTypeQueryParams').clear();
            forEach(headerKeys, (headerKey) => this.ipaasApiEditorForm.get('customAuthTypeHeaders').push(this.customAuthTypeFormItem({ key: headerKey, value: '' })));
            forEach(queryParamKeys, (queryParamKey) => this.ipaasApiEditorForm.get('customAuthTypeQueryParams').push(this.customAuthTypeFormItem({ key: queryParamKey, value: '' })));
        }
        else {
            this.authTypeFields = RX_IPAAS_APIS.authTypeFields[authType.id];
            this.createAuthTypeFormFields(authTypeDetail);
        }
    }
    createAuthTypeFormFields(fieldDetails) {
        const formArrayFields = this.authTypeFields.reduce((obj, item) => Object.assign(obj, { [item.name]: '' }), {});
        const authTypeDetails = this.ipaasApiEditorForm.get('authTypeDetails');
        this.isCustomAuthType = false;
        if (authTypeDetails === null || authTypeDetails === void 0 ? void 0 : authTypeDetails.length) {
            authTypeDetails.removeAt(0);
        }
        authTypeDetails.push(this.formBuilder.group(formArrayFields));
        fieldDetails =
            (this.initialApiDefinition && merge(this.initialApiDefinition.authTypeDetails, fieldDetails)) || fieldDetails;
        if (fieldDetails) {
            this.ipaasApiEditorForm.controls.authTypeDetails.patchValue([fieldDetails]);
        }
    }
    tabChanged({ index }) {
        this.activeIndex = index;
    }
    addHeader() {
        this.headers = this.ipaasApiEditorForm.get('headers');
        this.headers.push(this.createFormItem(''));
    }
    removeHeader(index) {
        this.headers = this.ipaasApiEditorForm.get('headers');
        this.headers.removeAt(index);
        this.ipaasApiEditorForm.markAsDirty();
    }
    addQueryParameter() {
        this.queryParameters = this.ipaasApiEditorForm.get('queryParameters');
        this.queryParameters.push(this.createFormItem(''));
    }
    removeQueryParameter(index) {
        this.queryParameters = this.ipaasApiEditorForm.get('queryParameters');
        this.queryParameters.removeAt(index);
        this.ipaasApiEditorForm.markAsDirty();
    }
    addCustomAuthTypeHeader() {
        this.ipaasApiEditorForm.get('customAuthTypeHeaders').push(this.customAuthTypeFormItem({ key: '', value: '' }));
    }
    removeCustomAuthTypeHeader(index) {
        this.ipaasApiEditorForm.get('customAuthTypeHeaders').removeAt(index);
        this.ipaasApiEditorForm.markAsDirty();
    }
    addCustomAuthTypeQueryParam() {
        this.ipaasApiEditorForm.get('customAuthTypeQueryParams').push(this.customAuthTypeFormItem({ key: '', value: '' }));
    }
    removeCustomAuthTypeQueryParam(index) {
        this.ipaasApiEditorForm.get('customAuthTypeQueryParams').removeAt(index);
        this.ipaasApiEditorForm.markAsDirty();
    }
    isSaveButtonDisabled() {
        return this.ipaasApiEditorForm.pristine || this.ipaasApiEditorForm.invalid;
    }
    save() {
        let adminSetting$;
        const formValue = this.ipaasApiEditorForm.getRawValue();
        const headers = _map(formValue.headers, (header) => header.name);
        const queryParams = _map(formValue.queryParameters, (parameter) => parameter.name);
        if (this.isCustomAuthType) {
            formValue.authTypeDetails = [
                {
                    httpHeaders: formValue.customAuthTypeHeaders,
                    queryParams: formValue.customAuthTypeQueryParams
                }
            ];
        }
        const param = {
            organization: formValue.organization[0].name,
            environment: formValue.environment[0].name,
            group: formValue.apiGroupName,
            name: formValue.apiName,
            path: formValue.apiPath[0],
            method: findKey(RX_IPAAS_APIS.methods, (value) => value === formValue.requestMethod[0]),
            authType: formValue.authorizationType[0].id,
            queryParams: pull(queryParams, '').toString(),
            headers: pull(headers, '').toString(),
            description: `${formValue.apiGroupName}: ${formValue.apiName}`,
            authTypeDetails: formValue.authTypeDetails[0] || {}
        };
        if (this.isEditMode) {
            param.id = this.initialApiDefinition.id;
            adminSetting$ = this.editApiDefinition(param, formValue);
        }
        else {
            adminSetting$ = this.createApiDefinition(param, formValue);
        }
        this.busy = adminSetting$.subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.ipaas-api-editor.save.success.message'));
            this.activeModalRef.close(adminSetting$);
        });
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    resetFormFields() {
        this.methodTypeOptions = [];
        this.ipaasApiEditorForm.get('requestMethod').setValue([]);
        this.authTypeOptions = [];
        this.ipaasApiEditorForm.get('authorizationType').setValue([]);
        this.authTypeFields = RX_IPAAS_APIS.authTypeFields[0];
        this.createAuthTypeFormFields();
    }
}
ApiEditorBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApiEditorBase, deps: [{ token: i1.ActiveModalRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
ApiEditorBase.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApiEditorBase });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApiEditorBase, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i0.Injector }]; } });
//# sourceMappingURL=api-editor-base.class.js.map