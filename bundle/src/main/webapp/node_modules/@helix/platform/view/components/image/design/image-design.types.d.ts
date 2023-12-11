import { ImageAlignment } from '../image.types';
import { IRxStandardProps } from '@helix/platform/view/api';
export interface IImageProperties extends IRxStandardProps {
    name?: string;
    recordDefinitionName: string;
    recordInstanceId: string;
    fieldId: string;
    maxWidth: string;
    alignment: ImageAlignment;
}
