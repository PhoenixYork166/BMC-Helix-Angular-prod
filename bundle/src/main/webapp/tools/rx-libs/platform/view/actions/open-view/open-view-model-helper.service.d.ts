import { IViewActionDesignPropertyEditorConfig, OpenViewActionModalSize, OpenViewActionType } from '@helix/platform/view/api';
import { IExpressionConfigurator } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxOpenViewModelHelperService {
    getOpenViewInspector(inputParams: {
        name: string;
    }[], presentationType: OpenViewActionType, presentationModalSize: OpenViewActionModalSize, expressionConfigurator: IExpressionConfigurator): IViewActionDesignPropertyEditorConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxOpenViewModelHelperService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxOpenViewModelHelperService>;
}
