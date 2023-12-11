import { IWindowMessage } from '@helix/platform/utils';
export interface IIframeApi {
    postMessageToFrame: (message: IWindowMessage) => void;
}
