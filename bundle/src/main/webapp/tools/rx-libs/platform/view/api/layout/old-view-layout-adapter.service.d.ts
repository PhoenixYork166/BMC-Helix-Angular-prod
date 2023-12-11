import { RxJsonParserService } from '@helix/platform/utils';
import { IViewComponentDefinitionWithParent } from '../domain/view-component-definition-with-parent.interface';
import * as i0 from "@angular/core";
export declare class RxOldViewLayoutAdapterService {
    private rxJsonParserService;
    constructor(rxJsonParserService: RxJsonParserService);
    convertLayout(componentDefinitionItem: IViewComponentDefinitionWithParent): void;
    private isViewDefinitionItem;
    private convertViewLayout;
    private convertComponentLayout;
    private convertNewDesignerLayout;
    private convertColumns;
    private isContainerComponentDefinition;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxOldViewLayoutAdapterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxOldViewLayoutAdapterService>;
}
