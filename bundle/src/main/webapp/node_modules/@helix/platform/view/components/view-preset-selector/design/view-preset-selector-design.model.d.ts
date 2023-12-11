import { IViewComponentDesignSandbox, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import { Observable } from 'rxjs';
import { IViewPresetSelectorDesignProperties } from './view-preset-selector-design.types';
export declare class ViewPresetSelectorDesignModel extends ViewDesignerComponentModel<IViewPresetSelectorDesignProperties> implements IViewDesignerComponentModel<IViewPresetSelectorDesignProperties> {
    sandbox: IViewComponentDesignSandbox<IViewPresetSelectorDesignProperties>;
    presetComponentGuids$: Observable<string[]>;
    otherPresetSelectorsNames$: Observable<string[]>;
    label$: Observable<string>;
    private rxFeatureService;
    static getInitialProperties(initialProperties?: IViewPresetSelectorDesignProperties): IViewPresetSelectorDesignProperties;
    rxInit(): void;
    private setInspectorConfig;
    private validate;
}
