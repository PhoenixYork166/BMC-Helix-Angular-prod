import { IRecordDefinition, IRecordInstance } from '@helix/platform/record/api';
import { IPlainObject } from '@helix/platform/shared/api';
import { AnyViewComponentDefinition } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export declare class RxRecordEditorUtilsService {
    getComponentDefinitionsAsFlatList(componentDefinitions: AnyViewComponentDefinition[]): AnyViewComponentDefinition[];
    getSelectionFieldOptionNames(recordDefinition: IRecordDefinition, recordInstance: IRecordInstance): IPlainObject;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRecordEditorUtilsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRecordEditorUtilsService>;
}
