import { getAvailableOnDevicesInspectorConfig, getStylesFieldInspectorConfig, validateStandardProps, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { RX_AVAILABLE_ON_DEVICES_DEFAULT_VALUE, RxViewComponentType } from '@helix/platform/view/api';
import { SwitchFormControlComponent, TextFormControlComponent } from '@helix/platform/shared/components';
import { combineLatest } from 'rxjs';
import { map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { PresetsListWidgetComponent } from './presets-list-widget/presets-list-widget.component';
import { RxFeatureService } from '@helix/platform/shared/api';
import { RX_SHARABLE_VIEW_RESETS_FEATURE_NAME } from '../view-preset-selector.types';
export class ViewPresetSelectorDesignModel extends ViewDesignerComponentModel {
    constructor() {
        super(...arguments);
        this.presetComponentGuids$ = this.sandbox.getChildComponentGuids();
        this.otherPresetSelectorsNames$ = this.sandbox
            .getComponentsByType(RxViewComponentType.ViewPresetSelector)
            .pipe(map((selectors) => selectors
            .filter((component) => component.guid !== this.sandbox.guid)
            .map((component) => component.data.name.trim())));
        this.label$ = this.sandbox.getChildComponents().pipe(map((components) => components.sort((a, b) => a.data.index - b.data.index)), map((components) => (components[0] ? components[0].data.label : 'No view presets added')), takeUntil(this.sandbox.destroyed$));
        this.rxFeatureService = this.injector.get(RxFeatureService);
    }
    static getInitialProperties(initialProperties) {
        return Object.assign(Object.assign({ name: 'View preset selector', styles: null, enableSharing: false }, RX_AVAILABLE_ON_DEVICES_DEFAULT_VALUE), initialProperties);
    }
    rxInit() {
        this.sandbox.updateInspectorConfig(this.setInspectorConfig());
        combineLatest([this.sandbox.componentProperties$, this.presetComponentGuids$])
            .pipe(withLatestFrom(this.otherPresetSelectorsNames$), map(([[componentProperties, presetGuids], otherPresetSelectorsNames]) => this.validate(componentProperties, presetGuids, otherPresetSelectorsNames)), takeUntil(this.sandbox.destroyed$))
            .subscribe((validationIssues) => {
            this.sandbox.setValidationIssues(validationIssues);
        });
    }
    setInspectorConfig() {
        return {
            inspectorSectionConfigs: [
                {
                    label: 'General',
                    controls: [
                        {
                            name: 'name',
                            component: TextFormControlComponent,
                            options: {
                                label: 'Name',
                                required: true
                            }
                        },
                        {
                            component: PresetsListWidgetComponent,
                            widgetName: 'presetsList'
                        },
                        this.rxFeatureService.isFeatureEnabled(RX_SHARABLE_VIEW_RESETS_FEATURE_NAME)
                            ? {
                                name: 'enableSharing',
                                component: SwitchFormControlComponent,
                                options: {
                                    label: 'Enable sharing'
                                }
                            }
                            : null,
                        getAvailableOnDevicesInspectorConfig(),
                        getStylesFieldInspectorConfig()
                    ].filter(Boolean)
                }
            ]
        };
    }
    validate(model, presetGuids, otherPresetSelectorsNames) {
        let validationIssues = [];
        const trimmedModelName = model.name.trim();
        if (!trimmedModelName) {
            validationIssues.push(this.sandbox.createError('Name cannot be blank.', 'name'));
        }
        else if (otherPresetSelectorsNames.includes(trimmedModelName)) {
            validationIssues.push(this.sandbox.createError('Name must be unique.', 'name'));
        }
        if (!presetGuids.length) {
            validationIssues.push(this.sandbox.createError('At least one view preset must be added.', 'presetsList'));
        }
        validationIssues = validationIssues.concat(validateStandardProps(model));
        return validationIssues;
    }
}
//# sourceMappingURL=view-preset-selector-design.model.js.map