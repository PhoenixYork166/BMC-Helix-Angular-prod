import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import { IViewComponentDesignValidationIssue, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { ActionButtonIconAlignment, ActionButtonSize, ActionButtonStyle, IActionButtonProperties } from '../action-button.types';
import { IActionButtonDesignProperties } from './action-button-design.types';
export declare class ActionButtonDesignModel extends ViewDesignerComponentModel<IActionButtonProperties, IActionButtonDesignProperties> implements IViewDesignerComponentModel<IActionButtonProperties, IActionButtonDesignProperties> {
    componentProperties$: import("rxjs").Observable<IActionButtonDesignProperties>;
    private rxRecordDefinitionCacheService;
    private viewActionValidatorService;
    private translateService;
    label$: import("rxjs").Observable<any>;
    style$: import("rxjs").Observable<ActionButtonStyle>;
    size$: import("rxjs").Observable<ActionButtonSize>;
    icon$: import("rxjs").Observable<string>;
    iconAlignment$: import("rxjs").Observable<ActionButtonIconAlignment>;
    private fieldDefinitions$;
    static getInitialProperties(props: IActionButtonProperties): IActionButtonDesignProperties;
    rxInit(): void;
    setValidationIssues(issues: IViewComponentDesignValidationIssue[]): void;
    private getInspectorConfig;
}
