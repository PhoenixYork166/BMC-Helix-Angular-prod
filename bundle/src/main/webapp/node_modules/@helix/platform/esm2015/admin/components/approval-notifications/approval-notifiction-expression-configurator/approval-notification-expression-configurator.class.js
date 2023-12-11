import { RxExpressionConfigurator } from '@helix/platform/shared/api';
import { includes } from 'lodash';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { RX_RECORD_DEFINITION, RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { RX_APPROVAL_NOTIFICATIONS } from '../approval-notifications.constant';
export class RxApprovalNotificationExpressionConfigurator extends RxExpressionConfigurator {
    constructor(injector) {
        super();
        this.injector = injector;
        this.translateService = this.injector.get(TranslateService);
        this.rxRecordDefinitionCacheService = this.injector.get(RxRecordDefinitionCacheService);
        this.commonDataDictionary$ = of([
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                children: []
            }
        ]);
    }
    approvalNotificationExpressionDataDictionary(recordDefinitionName, isSingleQuoteTextExpression) {
        if (recordDefinitionName) {
            return this.rxRecordDefinitionCacheService.getRecordDefinition(recordDefinitionName).pipe(map((recordDefinition) => {
                return [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.expression-editor.data-dictionary.values.record-definition.title'),
                        children: recordDefinition.fieldDefinitions
                            .filter((fieldDefinition) => {
                            var _a;
                            return fieldDefinition.resourceType !== RX_RECORD_DEFINITION.dataTypes.attachment.resourceType &&
                                ((_a = fieldDefinition.fieldMapping) === null || _a === void 0 ? void 0 : _a.source) === 'PRIMARY_RECORD_DEFINITION' &&
                                !includes([
                                    RX_RECORD_DEFINITION.coreFieldIds.displayId,
                                    RX_RECORD_DEFINITION.coreFieldIds.id,
                                    RX_APPROVAL_NOTIFICATIONS.approvalNotificationForm.fields.applicationBundleId
                                ], fieldDefinition.id);
                        })
                            .map((fieldDefinition) => ({
                            label: fieldDefinition.name.replace(new RegExp(' Primary$'), ''),
                            icon: 'd-icon-field_text',
                            expression: isSingleQuoteTextExpression
                                ? `'${fieldDefinition.name}'`
                                : `'\${${fieldDefinition.name}}'`,
                            resourceType: fieldDefinition.resourceType
                        }))
                    },
                    {
                        label: 'NULL',
                        icon: 'd-icon-dollar',
                        expression: '$NULL$',
                        hidden: true
                    }
                ];
            }));
        }
        else {
            return of([]);
        }
    }
}
//# sourceMappingURL=approval-notification-expression-configurator.class.js.map