import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RxAssociationCardinalityPipe, RxAssociationConstraintsPipe, RxAssociationDefinitionDataPageService, RxAssociationDefinitionService } from '@helix/platform/association/api';
import { IRecordDefinition } from '@helix/platform/record/api';
import { IBundleDescriptor, IDataPageResult, RxBundleCacheService, RxCommandFactoryService, RxDefinitionNameService, RxFeatureService, RxOverlayService } from '@helix/platform/shared/api';
import { RxModalService } from '@helix/platform/ui-kit';
import { IRowDataItem } from '@helix/platform/view/api';
import { IRecordGridColumn } from '@helix/platform/view/components';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { IRenameAction } from '../bundle-definitions/bundle-definitions.types';
import { IDefinitionActionConfig } from '../bundle-details/bundle-details.types';
import { DefinitionTabComponent } from '../definition-tab/definition-tab.component';
import * as i0 from "@angular/core";
export declare class AssociationDefinitionTabComponent implements OnInit {
    private rxAssociationDefinitionDataPageService;
    private rxAssociationDefinitionService;
    private rxOverlayService;
    private rxModalService;
    private translateService;
    private rxCommandFactoryService;
    private rxBundleCacheService;
    private rxFeatureService;
    private router;
    private rxDefinitionNameService;
    private rxAssociationConstraintsPipe;
    private rxAssociationCardinalityPipe;
    bundleDescriptor: IBundleDescriptor;
    definitionTabComponent: DefinitionTabComponent;
    private rowSelectionChanged$;
    definitionActions$: Observable<IDefinitionActionConfig[]>;
    gridColumns: IRecordGridColumn[];
    definitions$: Observable<IDataPageResult>;
    recordDefinition: Partial<IRecordDefinition>;
    isActionInProgress: boolean;
    editRouterLink: string;
    private cardinalityStrings;
    private shouldCascadeDeleteStrings;
    constructor(rxAssociationDefinitionDataPageService: RxAssociationDefinitionDataPageService, rxAssociationDefinitionService: RxAssociationDefinitionService, rxOverlayService: RxOverlayService, rxModalService: RxModalService, translateService: TranslateService, rxCommandFactoryService: RxCommandFactoryService, rxBundleCacheService: RxBundleCacheService, rxFeatureService: RxFeatureService, router: Router, rxDefinitionNameService: RxDefinitionNameService, rxAssociationConstraintsPipe: RxAssociationConstraintsPipe, rxAssociationCardinalityPipe: RxAssociationCardinalityPipe);
    ngOnInit(): void;
    private getDefinitionActions;
    onAddDefinition(): void;
    onRenameDefinition({ selectedRow, definitionNames }: IRenameAction): void;
    onRowSelectionChanged(selectedRows: IRowDataItem[]): void;
    onDeleteDefinition(selectedRows: IRowDataItem[]): void;
    onRevertCustomization(selectedRows: IRowDataItem[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AssociationDefinitionTabComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AssociationDefinitionTabComponent, "ax-association-definition-tab", never, { "bundleDescriptor": "bundleDescriptor"; }, {}, never, never>;
}