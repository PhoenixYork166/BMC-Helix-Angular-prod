import { IViewComponentDesignOutlet } from './view-component-design-outlet.interface';
import { IPlainObject } from '@helix/platform/shared/api';
import { IViewDefinitionPermission } from '@helix/platform/view/api';
export interface IViewComponentDesignModel<TPropertiesByName = IPlainObject> {
    readonly guid: string;
    readonly lastUpdateTime?: string;
    name?: string;
    resourceType: string;
    propertiesByName: TPropertiesByName;
    type: string;
    childDataComponentGuids?: string[];
    parentGuid: string;
    permissions?: IViewDefinitionPermission[];
    layout?: {
        outlets: IViewComponentDesignOutlet[];
    };
}
