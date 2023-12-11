import { ITagsFormControlModel } from '@helix/platform/shared/components';
import { IViewComponentDesignValidationIssue } from '../public-interfaces';
import { IRxAvailableOnDevicesProp, IRxStylesProp } from '@helix/platform/view/api';
export declare function validateCssClassName(tag: ITagsFormControlModel): boolean;
export declare function validateCssClassNames(styles: string): IViewComponentDesignValidationIssue[];
export declare function validateAvailableOnDevicesProp(value: string[]): IViewComponentDesignValidationIssue[];
interface IRxValidateStandardPropsPayload extends IRxStylesProp, IRxAvailableOnDevicesProp {
}
export declare function validateStandardProps(model: IRxValidateStandardPropsPayload): IViewComponentDesignValidationIssue[];
export {};
