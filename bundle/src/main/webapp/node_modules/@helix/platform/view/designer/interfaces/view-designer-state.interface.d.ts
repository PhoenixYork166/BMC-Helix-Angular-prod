import { IViewDefinition } from '@helix/platform/view/api';
import { IViewDesignerBreadcrumbsState } from '../+state/view-designer-breadcrumbs.reducer';
import { IViewDesignerValidationState } from '../+state/view-designer-validation.reducer';
import { IViewDesignModelState } from './view-design-model-state.interface';
import { IViewDesignerUiState } from './view-designer-ui-state.interface';
export interface IViewDesignerState {
    model: IViewDesignModelState;
    viewDefinition: IViewDefinition;
    ui: IViewDesignerUiState;
    validation: IViewDesignerValidationState;
    breadcrumbs: IViewDesignerBreadcrumbsState;
}
