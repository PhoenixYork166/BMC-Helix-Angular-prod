import { IConfigDefinition } from '@helix/platform/config/api';
import { IConfigDefinitionModel } from './config-designer.types';
import * as i0 from "@angular/core";
export declare class ConfigDesignerService {
    getDefinitionFromDefinitionModel(model: IConfigDefinitionModel): IConfigDefinition;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfigDesignerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfigDesignerService>;
}
