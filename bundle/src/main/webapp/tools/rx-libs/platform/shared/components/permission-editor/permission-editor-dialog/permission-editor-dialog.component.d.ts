import { AfterViewInit, ElementRef, Injector, OnInit, Renderer2 } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RxRecordInstanceUtilsService } from '@helix/platform/record/api';
import { RxBundleCacheService, RxGroupDataPageService, RxRoleDataPageService } from '@helix/platform/shared/api';
import { RxModalClass, RxModalService } from '@helix/platform/ui-kit';
import { Observable } from 'rxjs';
import { IRxSelectWithPaginationOptionsPage } from '../../select-with-pagination';
import { IPermission } from '../interfaces/permission.interfaces';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RxPermissionEditorDialogComponent extends RxModalClass implements OnInit, AfterViewInit {
    private activeModalRef;
    private rxGroupDataPage;
    private rxRecordInstanceUtilsService;
    private rxRoleDataPage;
    private rxModalService;
    private rxBundleCache;
    private renderer;
    protected injector: Injector;
    private translateService;
    addNewPermissionButton: ElementRef;
    private metadata;
    permissions: IPermission[];
    permissionTypes: {
        role: string;
        group: string;
        securityLabel: string;
    };
    areSecurityLabelsAvailable: boolean;
    permissionScope: string;
    actionsData: any;
    canSave: boolean;
    buttonLabels: {
        group: any;
        role: any;
        securityLabel: any;
    };
    constructor(activeModalRef: ActiveModalRef, rxGroupDataPage: RxGroupDataPageService, rxRecordInstanceUtilsService: RxRecordInstanceUtilsService, rxRoleDataPage: RxRoleDataPageService, rxModalService: RxModalService, rxBundleCache: RxBundleCacheService, renderer: Renderer2, injector: Injector, translateService: TranslateService);
    isDirty(): boolean;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    dismiss(): void;
    roleLoader(startIndex: number, pageSize: number, searchQuery: string): Observable<IRxSelectWithPaginationOptionsPage>;
    groupLoader(startIndex: number, pageSize: number, searchQuery: string): Observable<IRxSelectWithPaginationOptionsPage>;
    addNewPermission(): void;
    setRestrictionForAllPermissions(actionValue: string): void;
    removePermission(permission: IPermission): void;
    setPermissionType(permission: IPermission, type: string): void;
    setPermissionRestriction(permission: IPermission, actionValue?: string, isChecked?: boolean): void;
    save(): void;
    private getPermissionOwners;
    private getPermissionOwner;
    private getPermissionOwnerType;
    private formAdditionalQueryCriteria;
    keepKeyValueOrder(): number;
    onPermissionDescriptorSelected(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxPermissionEditorDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxPermissionEditorDialogComponent, "rx-permission-editor-dialog", never, {}, {}, never, never>;
}