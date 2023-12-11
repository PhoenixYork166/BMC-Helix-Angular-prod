import { Injector, OnInit } from '@angular/core';
import { RxModalClass } from '@helix/platform/ui-kit';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { IRecordGridViewPresetColumn, IRecordGridViewPresetColumnsModalOptions } from './record-grid-view-preset-columns-modal.types';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { IStepperWithUnitsFormControlOptions } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
export declare class RecordGridViewPresetColumnsModalComponent extends RxModalClass implements OnInit {
    private activeModalRef;
    protected injector: Injector;
    params: IRecordGridViewPresetColumnsModalOptions;
    presetColumns: IRecordGridViewPresetColumn[];
    isReadOnly: boolean;
    columnWidthPropertyOptions: IStepperWithUnitsFormControlOptions;
    constructor(activeModalRef: ActiveModalRef, injector: Injector);
    expandAllColumns(event: MouseEvent): void;
    collapseAllColumns(event: MouseEvent): void;
    saveChanges(): void;
    cancel(): void;
    moveColumn(fromIndex: number, toIndex: number): void;
    onDropInSelectedColumnsContainer(event: CdkDragDrop<IRecordGridViewPresetColumn[]>): void;
    trackByGuid(index: number, column: IRecordGridViewPresetColumn): string;
    private updateColumnIndexes;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordGridViewPresetColumnsModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RecordGridViewPresetColumnsModalComponent, "rx-record-grid-view-preset-columns-modal", never, {}, {}, never, never>;
}
