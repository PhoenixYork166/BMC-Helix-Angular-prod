import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RxDocumentDefinitionDataPageService, RxDocumentDefinitionService } from '@helix/platform/document/api';
import { IRecordDefinition } from '@helix/platform/record/api';
import { IBundleDescriptor, IDataPageResult, RxBundleCacheService, RxCommandFactoryService, RxFeatureService, RxOverlayService } from '@helix/platform/shared/api';
import { RxModalService } from '@helix/platform/ui-kit';
import { IRowDataItem } from '@helix/platform/view/api';
import { IRecordGridColumn } from '@helix/platform/view/components';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { IRenameAction } from '../bundle-definitions/bundle-definitions.types';
import { IDefinitionActionConfig } from '../bundle-details/bundle-details.types';
import { RxCopyDefinitionService } from '../copy-definition/copy-definition.service';
import { DefinitionTabComponent } from '../definition-tab/definition-tab.component';
import * as i0 from "@angular/core";
export declare class DocumentDefinitionTabComponent implements OnInit {
    private rxDocumentDefinitionDataPageService;
    private rxDocumentDefinitionService;
    private rxFeatureService;
    private rxOverlayService;
    private rxModalService;
    private translateService;
    private rxCommandFactoryService;
    private rxBundleCacheService;
    private router;
    private rxCopyDefinitionService;
    bundleDescriptor: IBundleDescriptor;
    definitionTabComponent: DefinitionTabComponent;
    private rowSelectionChanged$;
    definitionActions$: Observable<IDefinitionActionConfig[]>;
    gridColumns: IRecordGridColumn[];
    definitions$: Observable<IDataPageResult>;
    recordDefinition: Partial<IRecordDefinition>;
    isActionInProgress: boolean;
    editRouterLink: string;
    constructor(rxDocumentDefinitionDataPageService: RxDocumentDefinitionDataPageService, rxDocumentDefinitionService: RxDocumentDefinitionService, rxFeatureService: RxFeatureService, rxOverlayService: RxOverlayService, rxModalService: RxModalService, translateService: TranslateService, rxCommandFactoryService: RxCommandFactoryService, rxBundleCacheService: RxBundleCacheService, router: Router, rxCopyDefinitionService: RxCopyDefinitionService);
    ngOnInit(): void;
    private getDefinitionActions;
    onAddDefinition(): void;
    onRenameDefinition({ selectedRow, definitionNames }: IRenameAction): void;
    getEditDefinitionUrl(): string;
    onRowSelectionChanged(selectedRows: IRowDataItem[]): void;
    onDeleteDefinition(selectedRows: IRowDataItem[]): void;
    onRevertCustomization(selectedRows: IRowDataItem[]): void;
    onCopyDefinition(row: IRowDataItem): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DocumentDefinitionTabComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DocumentDefinitionTabComponent, "ax-document-definition-tab", never, { "bundleDescriptor": "bundleDescriptor"; }, {}, never, never>;
}
