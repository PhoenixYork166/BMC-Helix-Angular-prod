import { Injector, OnInit } from '@angular/core';
import { DockedPanelContext } from '@bmc-ux/adapt-angular';
import { RxSearchFiltersService } from '../search-filters.service';
import { RxModalClass, RxModalService } from '@helix/platform/ui-kit';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class SearchFiltersEditorComponent extends RxModalClass implements OnInit {
    private rxSearchFiltersService;
    dockedPanelContext: DockedPanelContext;
    protected injector: Injector;
    private rxNotificationService;
    private translateService;
    private rxModalService;
    constructor(rxSearchFiltersService: RxSearchFiltersService, dockedPanelContext: DockedPanelContext, injector: Injector, rxNotificationService: RxNotificationService, translateService: TranslateService, rxModalService: RxModalService);
    readonly tagsOperators: string[];
    private isEditMode;
    private tags$;
    ngOnInit(): void;
    searchFilterEditorFormGroup: FormGroup;
    tagSuggestions: (text$: Observable<string>) => Observable<string[]>;
    save(): void;
    close(): void;
    cancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchFiltersEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SearchFiltersEditorComponent, "rx-search-filters-editor", never, {}, {}, never, never>;
}
