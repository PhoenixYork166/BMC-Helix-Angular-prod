import { ViewDefinitionType } from './view-definition-type.enum';
export declare const RX_VIEW_DEFINITION: {
    types: {
        regular: ViewDefinitionType;
        shell: ViewDefinitionType;
    };
    resourceTypes: {
        viewComponent: string;
        containerViewComponent: string;
    };
    defaultOutletName: string;
    unknownPageComponent: {
        name: string;
    };
    defaultLayoutTemplateId: number;
    styles: {
        id: string;
        name: string;
    }[];
};
