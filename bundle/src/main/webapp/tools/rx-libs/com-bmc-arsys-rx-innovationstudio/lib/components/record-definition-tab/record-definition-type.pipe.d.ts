import { PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IRowDataItem } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export declare class AxRecordDefinitionTypePipe implements PipeTransform {
    private translateService;
    constructor(translateService: TranslateService);
    transform(recordDefinition: IRowDataItem): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AxRecordDefinitionTypePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<AxRecordDefinitionTypePipe, "axRecordDefinitionType">;
}
