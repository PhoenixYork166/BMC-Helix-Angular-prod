import { OnInit } from '@angular/core';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { RecordInstance, RxRecordInstanceService } from '@helix/platform/record/api';
import { RxExtensionContainerComponent } from '../extension-container.component';
import { RecordEditorComponent } from '../../../../record-editor/runtime/record-editor.component';
import { RxRecordEditorUtilsService } from '../../../../record-editor/common/record-editor-utils.service';
import { Observable } from 'rxjs';
import { IRxExtensionContainerSectionConfig } from '../extension-container.types';
import { IPlainObject } from '@helix/platform/shared/api';
import { RxExtensionContainerHelperService } from '../extension-container-helper.service';
import * as i0 from "@angular/core";
export declare class ExtensionContainerSectionComponent extends BaseViewComponent implements IViewComponent, OnInit {
    private rxExtensionContainerComponent;
    private rxRecordInstanceService;
    private rxRecordEditorUtilsService;
    private rxExtensionContainerHelperService;
    private recordEditorComponent;
    config: Observable<IRxExtensionContainerSectionConfig>;
    isInitialized: boolean;
    selectionFieldOptionNamesById: IPlainObject;
    constructor(rxExtensionContainerComponent: RxExtensionContainerComponent, rxRecordInstanceService: RxRecordInstanceService, rxRecordEditorUtilsService: RxRecordEditorUtilsService, rxExtensionContainerHelperService: RxExtensionContainerHelperService, recordEditorComponent: RecordEditorComponent);
    ngOnInit(): void;
    addNewRecordInstanceToExtension(associationManager: any): Observable<RecordInstance>;
    private updateSelectionFieldOptionNames;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExtensionContainerSectionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ExtensionContainerSectionComponent, "rx-extension-container-section", never, {}, {}, never, never>;
}
