import { AfterViewInit, Injector, OnInit } from '@angular/core';
import { RxModalClass } from '@helix/platform/ui-kit';
import { AbstractControl, FormArray, FormBuilder } from '@angular/forms';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { IExpressionFormControlOptions, RxExpressionEditorService } from '@helix/platform/shared/components';
import { TranslateService } from '@ngx-translate/core';
import { INamedFilterOptionsEditorConfig } from '../named-filter-options.types';
import { RxGuidService } from '@helix/platform/utils';
import { NamedFilterOptionExpressionConfigurator } from './named-filter-option-expression-configurator.class';
import * as i0 from "@angular/core";
interface IAccordionTabs {
    [id: string]: boolean;
}
export declare class RecordGridNamedFilterOptionsEditorModalComponent extends RxModalClass implements OnInit, AfterViewInit {
    activeModalRef: ActiveModalRef;
    private rxGuidService;
    private rxExpressionEditorService;
    private formBuilder;
    private translateService;
    private expressionConfigurator;
    private accordionTabEls;
    config: INamedFilterOptionsEditorConfig;
    queryExpressionOptions: IExpressionFormControlOptions;
    namedFilterOptionsFormArray: FormArray;
    accordionTabs: IAccordionTabs;
    constructor(activeModalRef: ActiveModalRef, rxGuidService: RxGuidService, rxExpressionEditorService: RxExpressionEditorService, formBuilder: FormBuilder, translateService: TranslateService, expressionConfigurator: NamedFilterOptionExpressionConfigurator, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    addNamedFilterOption(): void;
    removeNamedFilterOption(index: number): void;
    openExpressionEditor(title: AbstractControl, filterExpression: AbstractControl): void;
    moveNamedFilterOption(fromIndex: number, toIndex: number): void;
    onSelectedNamedFilterOptionDrop(event: CdkDragDrop<any[], any>): void;
    onSave(): void;
    cancel(): void;
    toggleOpen(expandAll: boolean): void;
    private getCheckTitleDuplicateValidator;
    private getFormGroup;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordGridNamedFilterOptionsEditorModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RecordGridNamedFilterOptionsEditorModalComponent, "rx-named-filter-options-editor-modal", never, {}, {}, never, never>;
}
export {};
