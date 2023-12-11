import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { RxExpressionConfigurator } from '@helix/platform/shared/api';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
export class GlobalDataFilterExpressionConfiguratorClass extends RxExpressionConfigurator {
    constructor(injector) {
        super();
        this.injector = injector;
        this.translateService = this.injector.get(TranslateService);
        this.commonDataDictionary$ = of([
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.labe'),
                children: [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-date.title'),
                        icon: 'd-icon-dollar',
                        expression: '$DATE$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-date-time.title'),
                        icon: 'd-icon-dollar',
                        expression: '$TIMESTAMP$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-groups.title'),
                        icon: 'd-icon-dollar',
                        expression: '$GROUPS$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-group-ids.title'),
                        icon: 'd-icon-dollar',
                        expression: '$GROUPIDS$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-roles.title'),
                        icon: 'd-icon-dollar',
                        expression: '$ROLES$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-time.title'),
                        icon: 'd-icon-dollar',
                        expression: '$TIME$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-user.title'),
                        icon: 'd-icon-dollar',
                        expression: '$USER$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-user-locale.title'),
                        icon: 'd-icon-dollar',
                        expression: '$LOCALE$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.current-week-day.title'),
                        icon: 'd-icon-dollar',
                        expression: '$WEEKDAY$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.null.title'),
                        icon: 'd-icon-dollar',
                        expression: '$NULL$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.general-group.pill.server-url.title'),
                        icon: 'd-icon-dollar',
                        expression: '$SERVERURL$'
                    }
                ]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.common-core-fields.title'),
                expanded: true,
                children: RX_RECORD_DEFINITION.coreFields.map((field) => ({
                    label: field.name,
                    icon: 'd-icon-field_text',
                    expression: `'${field.id}'`
                }))
            }
        ]);
    }
}
//# sourceMappingURL=global-data-filter-expression-configurator.class.js.map