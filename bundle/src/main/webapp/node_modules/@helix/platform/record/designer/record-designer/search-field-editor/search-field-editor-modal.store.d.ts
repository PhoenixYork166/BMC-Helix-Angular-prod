import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { IFieldDefinition } from '@helix/platform/record/api';
import { IRecordSearchFieldsEditorState } from './search-field.types';
import { FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class SearchFieldEditorModalStore extends ComponentStore<IRecordSearchFieldsEditorState> {
    readonly searchFields$: Observable<import("@angular/forms").AbstractControl[]>;
    readonly availableFields$: Observable<IFieldDefinition[]>;
    readonly isDirty$: Observable<boolean>;
    readonly isValid$: Observable<boolean>;
    readonly vm$: Observable<{
        availableFields: IFieldDefinition[];
        searchFields: import("@angular/forms").AbstractControl[];
        isDirty: boolean;
        isValid: boolean;
    }>;
    readonly toggleOpen: (observableOrValue: boolean | Observable<boolean>) => import("rxjs").Subscription;
    readonly updateFields: (observableOrValue: FormGroup | Observable<FormGroup>) => import("rxjs").Subscription;
    readonly updateAvailableFields: (observableOrValue: IFieldDefinition | Observable<IFieldDefinition>) => import("rxjs").Subscription;
    readonly removeSearchField: (observableOrValue: number | Observable<number>) => import("rxjs").Subscription;
    readonly markDirty: () => void;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchFieldEditorModalStore, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SearchFieldEditorModalStore>;
}
