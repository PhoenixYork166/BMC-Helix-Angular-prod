import { IViewDefinition } from '../domain/view-definition.interface';
import { IViewComponentDefinitionWithParent } from '../domain/view-component-definition-with-parent.interface';
import { AnyViewComponentDefinition, IContainerViewComponentDefinition, IViewComponentDefinition } from '../domain/view-component-definition.types';
import { RxTreeService } from '@helix/platform/utils';
import { RxPredicate } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxViewDefinitionParserService {
    private rxTreeService;
    constructor(rxTreeService: RxTreeService);
    getComponents(definition: IContainerViewComponentDefinition | IViewDefinition, skipInitial?: boolean): IViewComponentDefinitionWithParent[];
    private processComponents;
    private isContainerViewComponentDefinition;
    findParentComponentDefinition(viewDefinition: IViewDefinition, childComponentDefinition: Partial<AnyViewComponentDefinition>, predicate: (definition: AnyViewComponentDefinition) => boolean): IContainerViewComponentDefinition;
    findViewComponent(viewComponentContainer: IContainerViewComponentDefinition | IViewDefinition, predicate: RxPredicate): IViewComponentDefinition;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxViewDefinitionParserService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxViewDefinitionParserService>;
}
