import { Constructor } from '@helix/platform/utils';
import { IPlainObject } from '../common-types/plain-object.interface';
import { IDesignerElementService } from '../designer/designer.types';
export declare function RxServerActionMixin<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        initialize(config: any): any;
        clearOutputMap(): void;
        getElementService(type: string): IDesignerElementService;
        getInputMap(): IPlainObject;
        onInputMapChanged(element: any, inputMap: IPlainObject, inputMapPropertyPath: string, inputMapPropertyValue: string, isCommandManagerOperation: boolean): void;
        setDataDictionaryBranch(): void;
        setInputMap(inputMap: IPlainObject, options?: any): void;
    };
} & TBase;
