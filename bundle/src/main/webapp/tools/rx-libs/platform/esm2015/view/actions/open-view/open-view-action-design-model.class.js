import { RxViewDesignerActionModel } from '@helix/platform/view/designer';
import { OpenViewActionLaunchBehavior, OpenViewActionModalSize, OpenViewActionType, RxViewDefinitionCacheService } from '@helix/platform/view/api';
import { combineLatest, of } from 'rxjs';
import { distinctUntilChanged, map, pluck, skip, switchMap } from 'rxjs/operators';
import { omit } from 'lodash';
import { RxOpenViewModelHelperService } from './open-view-model-helper.service';
export class RxOpenViewActionDesignModel extends RxViewDesignerActionModel {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.sandbox = sandbox;
        this.rxViewDefinitionCacheService = this.injector.get(RxViewDefinitionCacheService);
        this.rxOpenViewModelHelperService = this.injector.get(RxOpenViewModelHelperService);
        const viewDefinitionName$ = this.sandbox.actionProperties$.pipe(pluck('viewDefinitionName'), distinctUntilChanged());
        const presentationType$ = this.sandbox.actionProperties$.pipe(pluck('presentation.type'), distinctUntilChanged());
        const presentationModalSize$ = this.sandbox.actionProperties$.pipe(pluck('presentation.modalSize'), distinctUntilChanged());
        combineLatest([viewDefinitionName$, presentationType$, presentationModalSize$])
            .pipe(switchMap(([viewDefinitionName, presentationType, presentationModalSize]) => this.getActionEditorConfig(viewDefinitionName, presentationType, presentationModalSize)))
            .subscribe((config) => this.sandbox.setActionPropertyEditorConfig(config));
        viewDefinitionName$
            .pipe(switchMap((viewDefinitionName) => this.getViewOutputParams(viewDefinitionName)))
            .subscribe((outputParams) => {
            this.sandbox.setActionOutputDataDictionary(outputParams.map(({ name }) => ({
                label: name,
                expression: this.getOutputExpressionForPropertyPath(name)
            })));
        });
        presentationType$.pipe(skip(1)).subscribe((presentationType) => {
            let props = this.sandbox.getActionProperties();
            if (presentationType === OpenViewActionType.FullWidth) {
                props['presentation.launchBehavior'] = OpenViewActionLaunchBehavior.SameWindow;
                props = omit(props, ['presentation.modalSize', 'presentation.title']);
            }
            else {
                props = omit(props, ['presentation.launchBehavior']);
                if (!props['presentation.modalSize'] ||
                    this.sandbox.getActionPropertyValue('presentation.modalSize') === OpenViewActionModalSize.FullSize) {
                    props['presentation.modalSize'] = OpenViewActionModalSize.Medium;
                }
            }
            this.sandbox.setActionProperties(props);
        });
        presentationModalSize$.pipe(skip(1)).subscribe((presentationModalSize) => {
            if (presentationModalSize === OpenViewActionModalSize.FullSize) {
                this.sandbox.setActionProperties(omit(this.sandbox.getActionProperties(), ['presentation.title']));
            }
        });
    }
    static getInitialProperties(initialProperties) {
        return Object.assign({ viewDefinitionName: null, 'presentation.type': OpenViewActionType.FullWidth, 'presentation.launchBehavior': OpenViewActionLaunchBehavior.SameWindow }, initialProperties);
    }
    getActionEditorConfig(viewDefinitionName, presentationType, presentationModalSize) {
        return this.getViewInputParams(viewDefinitionName).pipe(map((inputParams) => this.rxOpenViewModelHelperService.getOpenViewInspector(inputParams, presentationType, presentationModalSize, this.expressionConfigurator)));
    }
    getViewInputParams(viewDefinitionName) {
        return viewDefinitionName
            ? this.rxViewDefinitionCacheService.getViewDefinition(viewDefinitionName).pipe(pluck('inputParams'))
            : of([]);
    }
    getViewOutputParams(viewDefinitionName) {
        return viewDefinitionName
            ? this.rxViewDefinitionCacheService.getViewDefinition(viewDefinitionName).pipe(pluck('outputParams'))
            : of([]);
    }
}
//# sourceMappingURL=open-view-action-design-model.class.js.map