import { Injector } from '@angular/core';
import { IFormFocusable, IPlainObject } from '@helix/platform/shared/api';
import { InspectorWidgetBase } from '@helix/platform/shared/components';
import { RxModalService } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { RecordGridDesignModel } from '../../record-grid-design.model';
import { RecordGridRowActionValidationIssue } from '../../record-grid-design.types';
import { IRowAction } from './record-grid-row-action-editor-widget.types';
import * as i0 from "@angular/core";
export declare class RxRecordGridRowActionEditorWidgetComponent extends InspectorWidgetBase<IPlainObject, RecordGridDesignModel> implements IFormFocusable {
    protected injector: Injector;
    private rxModalService;
    private translateService;
    isDisabled: boolean;
    rowActions$: Observable<IRowAction[]>;
    constructor(injector: Injector, rxModalService: RxModalService, translateService: TranslateService);
    openEditor(rowActionIndex?: number, activeActionIndex?: number): void;
    trackByForRowActions(index: number, rowAction: IRowAction): string;
    removeRowAction(index: number, rowActions: IRowAction[]): void;
    focus(data: RecordGridRowActionValidationIssue['data']): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRecordGridRowActionEditorWidgetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxRecordGridRowActionEditorWidgetComponent, "rx-record-grid-row-action-editor-widget", never, {}, {}, never, never>;
}
