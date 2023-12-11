import { RX_VIEW_DEFINITION, RxViewComponentRegistryService } from '@helix/platform/view/api';
import { ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { filter, map } from 'rxjs/operators';
export class PageDesignModel extends ViewDesignerComponentModel {
    constructor() {
        super(...arguments);
        this.rxViewComponentRegistryService = this.injector.get(RxViewComponentRegistryService);
        this.componentName$ = this.sandbox.getChildComponents().pipe(filter((childComponents) => childComponents.length > 0), map((childComponents) => {
            const pageComponentType = childComponents[0].type;
            const descriptor = this.rxViewComponentRegistryService.get(pageComponentType);
            return (descriptor === null || descriptor === void 0 ? void 0 : descriptor.name) || RX_VIEW_DEFINITION.unknownPageComponent.name;
        }));
    }
}
//# sourceMappingURL=page-design.model.js.map