import { IRuntimeViewApi } from '@helix/platform/view/runtime';
export interface ICloseViewActionParams {
    actAsCancel: boolean;
    viewApi: Pick<IRuntimeViewApi, 'close' | 'cancel'>;
}
