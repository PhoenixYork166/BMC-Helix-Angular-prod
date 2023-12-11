import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
const aliasTypeFieldId = 56150;
const aliasTypeDefaultValue = 'email';
const incomingMailboxType = 0;
const outgoingMailboxType = 1;
export const RX_EMAIL_PROFILES = {
    aliasMapping: {
        recordDefinitionName: 'Alias Mapping',
        queryExpression: `'${aliasTypeFieldId}' = "${aliasTypeDefaultValue}"`,
        fieldIds: {
            aliasType: {
                id: aliasTypeFieldId,
                defaultValue: aliasTypeDefaultValue
            },
            applicationId: 56151,
            applicationName: 56152,
            aliasName: 56153,
            aliasValue: 56154,
            description: RX_RECORD_DEFINITION.coreFieldIds.description,
            assignee: RX_RECORD_DEFINITION.coreFieldIds.assignee,
            status: RX_RECORD_DEFINITION.coreFieldIds.status
        },
        mailboxType: {
            outgoing: 0,
            incoming: 1
        },
        status: {
            new: 0,
            assigned: 1
        }
    },
    mailbox: {
        recordDefinitionName: 'AR System Email Mailbox Configuration',
        queryExpression: `'${RX_RECORD_DEFINITION.coreFieldIds.status}' = "0"`,
        fieldIds: {
            mailboxName: {
                id: 18037,
                label: 'Mailbox name'
            },
            mailboxFunction: 18049
        },
        mailboxFunctions: {
            incoming: {
                id: incomingMailboxType,
                label: 'com.bmc.arsys.rx.client.admin.email-profiles.incoming-mailbox.label',
                value: String(incomingMailboxType)
            },
            outgoing: {
                id: outgoingMailboxType,
                label: 'com.bmc.arsys.rx.client.admin.email-profiles.outgoing-mailbox.label',
                value: String(outgoingMailboxType)
            }
        }
    }
};
//# sourceMappingURL=email-profiles.constant.js.map