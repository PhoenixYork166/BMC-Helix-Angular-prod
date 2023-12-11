import { DatePipe } from '@angular/common';
import { Injector, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActiveModalRef, BusyConfig } from '@bmc-ux/adapt-angular';
import { ColumnConfig, RowData } from '@bmc-ux/adapt-table';
import { RxRecordInstanceDataPageService, RxRecordInstanceService } from '@helix/platform/record/api';
import { RxBundleCacheService, RxDefinitionNameService, RxGlobalCacheService } from '@helix/platform/shared/api';
import { RxModalClass, RxModalService } from '@helix/platform/ui-kit';
import { RxJsonParserService, RxStringService } from '@helix/platform/utils';
import { IRecordGridConfig } from '@helix/platform/view/components';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { AxBundleDeploymentService } from '../../services/bundle-deployment';
import { IBundleDeployPackageData, IBundleDeployPackageRegistryEntry } from './content-package-import-logs.types';
import * as i0 from "@angular/core";
export declare class ContentPackageImportLogsComponent extends RxModalClass implements OnInit, OnDestroy {
    private activeModalRef;
    private axBundleDeploymentService;
    private datePipe;
    protected injector: Injector;
    private rxBundleCacheService;
    private rxDefinitionNameService;
    private rxGlobalCacheService;
    private rxJsonParserService;
    private rxModalService;
    private rxRecordInstanceDataPageService;
    private rxRecordInstanceService;
    private rxStringService;
    private translateService;
    busySubscription: Subscription;
    busyConfig: BusyConfig;
    private viewTypes;
    private messageTypes;
    packageCreationDateControl: FormControl;
    packageNameControl: FormControl;
    createdByControl: FormControl;
    viewTypeControl: FormControl;
    messagesTypeControl: FormControl;
    buttonGroupConfig: {
        name: any;
    }[];
    messagesButtonGroupConfig: {
        name: any;
        value: string;
    }[];
    private selectedPackageContent;
    gridColumns: ColumnConfig[];
    expandedRowColumns: {
        data: {
            field: string;
            header: any;
        }[];
        definitions: {
            field: string;
            header: any;
        }[];
    };
    messagesGridColumns: {
        data: ({
            field: string;
            header: any;
            width: string;
        } | {
            field: string;
            header: any;
            width?: undefined;
        })[];
        definitions: ({
            field: string;
            header: any;
            width: string;
        } | {
            field: string;
            header: any;
            width?: undefined;
        })[];
    };
    gridData: RowData<IBundleDeployPackageRegistryEntry>[];
    messagesGridData: RowData<IBundleDeployPackageData>[];
    gridSelectedItems: IBundleDeployPackageData[];
    expandedRowKeys: {};
    packagesList$: Observable<IBundleDeployPackageRegistryEntry[]>;
    packagesList: IBundleDeployPackageRegistryEntry[];
    recordGridConfig$: Observable<IRecordGridConfig>;
    private destroyed$;
    constructor(activeModalRef: ActiveModalRef, axBundleDeploymentService: AxBundleDeploymentService, datePipe: DatePipe, injector: Injector, rxBundleCacheService: RxBundleCacheService, rxDefinitionNameService: RxDefinitionNameService, rxGlobalCacheService: RxGlobalCacheService, rxJsonParserService: RxJsonParserService, rxModalService: RxModalService, rxRecordInstanceDataPageService: RxRecordInstanceDataPageService, rxRecordInstanceService: RxRecordInstanceService, rxStringService: RxStringService, translateService: TranslateService);
    ngOnInit(): void;
    private updateGridData;
    private updateMessagesGridData;
    ngOnDestroy(): void;
    optionFormatter(entry: IBundleDeployPackageRegistryEntry): string;
    onSelectionChange(selectedData: IBundleDeployPackageData[]): void;
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContentPackageImportLogsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ContentPackageImportLogsComponent, "ax-content-package-import-logs", never, {}, {}, never, never>;
}
