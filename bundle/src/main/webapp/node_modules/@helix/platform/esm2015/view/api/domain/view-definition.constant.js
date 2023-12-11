import { ViewDefinitionType } from './view-definition-type.enum';
export const RX_VIEW_DEFINITION = {
    types: {
        regular: ViewDefinitionType.Regular,
        shell: ViewDefinitionType.Shell
    },
    resourceTypes: {
        viewComponent: 'com.bmc.arsys.rx.services.view.domain.ViewComponentDefinition',
        containerViewComponent: 'com.bmc.arsys.rx.services.view.domain.ContainerViewComponentDefinition'
    },
    defaultOutletName: 'DEFAULT',
    unknownPageComponent: {
        name: 'Unknown Component'
    },
    defaultLayoutTemplateId: 5,
    styles: [
        { id: 'rx-no-margin', name: 'No Margin' },
        { id: 'rx-default-border', name: '1px Border' },
        { id: 'rx-white-background', name: 'White Background' }
    ]
};
//# sourceMappingURL=view-definition.constant.js.map