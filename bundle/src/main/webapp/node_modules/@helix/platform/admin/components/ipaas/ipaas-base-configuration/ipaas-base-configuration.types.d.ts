export interface IIpaasBaseConfig {
    componentName: string;
    resourceType: string;
    bundleScope: string;
    titleKey: string;
    saveMessageKey: string;
    controlsConfig: {
        [key: string]: any;
    };
    settingNames: {
        [key: string]: string;
    };
    getPayload(formValue: any): IIpaasBaseConfigPayload;
    getFormValues?(formValue: any): any;
}
export interface IIpaasBaseConfigPayload {
    url: string;
    username: string;
    password: string;
}
