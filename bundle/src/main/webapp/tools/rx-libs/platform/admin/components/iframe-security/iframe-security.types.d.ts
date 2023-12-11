import { ISystemConfiguration } from '@helix/platform/shared/api';
export interface IIframeSecurities {
    iframeAllowedSites: ISystemConfiguration;
    trustedWebsites: ISystemConfiguration;
}
