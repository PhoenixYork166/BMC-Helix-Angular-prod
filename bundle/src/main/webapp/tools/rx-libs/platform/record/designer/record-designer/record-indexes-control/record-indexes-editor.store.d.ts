import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { IFieldState, IIndexEditorState, IIndexesEditorOptions, IIndexState } from './record-indexes-control.types';
import { RxGuidService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export declare class RecordIndexesEditorStore extends ComponentStore<IIndexEditorState> {
    private rxGuidService;
    readonly isDirty$: Observable<boolean>;
    readonly indexes$: Observable<any>;
    readonly addIndex: (observableOrValue: IIndexState | Observable<IIndexState>) => import("rxjs").Subscription;
    readonly updateIndex: (observableOrValue: IIndexState | Observable<IIndexState>) => import("rxjs").Subscription;
    readonly removeIndex: (observableOrValue: string | Observable<string>) => import("rxjs").Subscription;
    readonly checkAvailableFields: (observableOrValue: {
        indexGuid: string;
        checkedFields: IFieldState[];
    } | Observable<{
        indexGuid: string;
        checkedFields: IFieldState[];
    }>) => import("rxjs").Subscription;
    readonly toggleSelectedFieldChecked: (observableOrValue: {
        indexGuid: string;
        indexField: IFieldState;
    } | Observable<{
        indexGuid: string;
        indexField: IFieldState;
    }>) => import("rxjs").Subscription;
    readonly assignCheckedFields: (observableOrValue: IIndexState | Observable<IIndexState>) => import("rxjs").Subscription;
    readonly unassignCheckedFields: (observableOrValue: IIndexState | Observable<IIndexState>) => import("rxjs").Subscription;
    readonly sortSelectedFields: (observableOrValue: {
        indexGuid: string;
        fields: IFieldState[];
    } | Observable<{
        indexGuid: string;
        fields: IFieldState[];
    }>) => import("rxjs").Subscription;
    readonly removeField: (observableOrValue: {
        indexGuid: string;
        field: IFieldState;
    } | Observable<{
        indexGuid: string;
        field: IFieldState;
    }>) => import("rxjs").Subscription;
    readonly expandAll: () => void;
    readonly collapseAll: () => void;
    readonly markDirty: () => void;
    readonly vm$: Observable<{
        indexes: any;
        isDirty: boolean;
    }>;
    constructor(rxGuidService: RxGuidService);
    initialize(indexesEditorOptions: IIndexesEditorOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordIndexesEditorStore, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RecordIndexesEditorStore>;
}
