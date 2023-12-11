import { IViewComponentDescriptor, IViewDefinitionPermission } from '@helix/platform/view/api';
import { IPlainObject } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxViewDesignerStateHelperService {
    getInitialComponentProperties(initialProperties: IPlainObject, componentDescriptor: IViewComponentDescriptor): IPlainObject;
    getDefaultComponentPermissions(componentDescriptor: IViewComponentDescriptor): IViewDefinitionPermission[];
    static ɵfac: i0.ɵɵFactoryDeclaration<RxViewDesignerStateHelperService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxViewDesignerStateHelperService>;
}
