import { DefinitionType } from '@helix/platform/shared/api';
import { IRowDataItem } from '@helix/platform/view/api';
import { RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class RxCopyDefinitionService {
    private rxModalService;
    constructor(rxModalService: RxModalService);
    openCopyDefinitionComponentModal(row: IRowDataItem, definitionType: DefinitionType, editFragment?: string): Promise<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxCopyDefinitionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxCopyDefinitionService>;
}
