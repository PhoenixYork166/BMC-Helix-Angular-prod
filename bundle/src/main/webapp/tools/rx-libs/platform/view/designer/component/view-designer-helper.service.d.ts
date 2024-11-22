import { ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewDesignerFacade } from '../+state/view-designer.facade';
import { IViewComponentDescriptor, RxViewComponentRegistryService, RxViewComponentType, BwfViewComponentType } from '@helix/platform/view/api';
import { RxViewDesignerModels } from '../core/view-designer-models.service';
import { IViewDesignerCanvasLayout } from '../components/view-designer-canvas';
import { DesignerComponent } from '../components/designer-component/designer.component';
import { IValidationIssueSection } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class RxViewDesignerHelperService {
    private viewDesignerFacade;
    private rxViewComponentRegistryService;
    private componentFactoryResolver;
    private viewDesignerModels;
    designerComponentFactory: import("@angular/core").ComponentFactory<DesignerComponent>;
    canvasDndListIds: string[];
    extensionViewAllowedComponentTypes: Set<RxViewComponentType | BwfViewComponentType>;
    constructor(viewDesignerFacade: ViewDesignerFacade, rxViewComponentRegistryService: RxViewComponentRegistryService, componentFactoryResolver: ComponentFactoryResolver, viewDesignerModels: RxViewDesignerModels);
    canvasLayout$: Observable<IViewDesignerCanvasLayout>;
    private viewBreadcrumbItem$;
    private selectedComponentBreadcrumbItems$;
    breadcrumbItems$: Observable<any[]>;
    validationIssues$: Observable<IValidationIssueSection[]>;
    getLicensedComponents(): Observable<IViewComponentDescriptor[]>;
    private getRecursiveViewLayoutGuids;
    private getRecursiveComponentLayoutGuids;
    private initializeCanvasItem;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxViewDesignerHelperService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxViewDesignerHelperService>;
}
