import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ValueAccessor } from '@helix/platform/shared/components';
import { TranslateService } from '@ngx-translate/core';
import { ISearchFieldEditorControlOptions } from './search-field.types';
import { RxModalService } from '@helix/platform/ui-kit';
import { IFormControlComponent } from '@helix/platform/shared/api';
import { IRecordFieldDefinitionModel } from '../../record-designer.types';
import * as i0 from "@angular/core";
export declare class SearchFieldEditorControlComponent extends ValueAccessor<IRecordFieldDefinitionModel[]> implements IFormControlComponent, OnChanges, OnInit, OnDestroy {
    private rxModalService;
    private translateService;
    options: ISearchFieldEditorControlOptions;
    private searchFieldsSubject;
    searchFields$: import("rxjs").Observable<IRecordFieldDefinitionModel[]>;
    constructor(rxModalService: RxModalService, translateService: TranslateService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    updateValues(): void;
    openEditor(searchFieldIndex: string): void;
    removeSearchField(searchField: IRecordFieldDefinitionModel): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchFieldEditorControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SearchFieldEditorControlComponent, "rx-search-field-editor-control-control", never, { "options": "options"; }, {}, never, never>;
}
