import { ChartGroup, ChartType } from './cognitive-consumption.types';
export const RX_COGNITIVE_CONSUMPTION = {
    sections: [
        {
            id: ChartGroup.Chat,
            title: 'com.bmc.arsys.rx.client.admin.cognitive-consumption.cognitive-service-chatbot.title',
            groups: [
                {
                    id: ChartGroup.Chat,
                    label: 'com.bmc.arsys.rx.client.admin.cognitive-consumption.number-of-conversations.label',
                    unit: 'N',
                    charts: [
                        {
                            title: 'com.bmc.arsys.rx.client.admin.cognitive-consumption.conversations.title',
                            type: ChartType.HorizontalColumn
                        },
                        {
                            title: 'com.bmc.arsys.rx.client.admin.cognitive-consumption.conversation-summary.title',
                            type: ChartType.Area
                        }
                    ]
                }
            ]
        },
        {
            id: ChartGroup.ChatByUser,
            title: 'com.bmc.arsys.rx.client.admin.cognitive-consumption.chatbot-users.title',
            groups: [
                {
                    id: ChartGroup.ChatByUser,
                    unit: 'N',
                    label: 'com.bmc.arsys.rx.client.admin.cognitive-consumption.number-of-users.label',
                    charts: [
                        {
                            title: 'com.bmc.arsys.rx.client.admin.cognitive-consumption.users.title',
                            type: ChartType.HorizontalColumn
                        },
                        {
                            title: 'com.bmc.arsys.rx.client.admin.cognitive-consumption.user-summary.title',
                            type: ChartType.Area
                        }
                    ]
                }
            ]
        },
        {
            id: ChartGroup.Classify,
            title: 'com.bmc.arsys.rx.client.admin.cognitive-consumption.cognitive-service-automation.title',
            groups: [
                {
                    id: ChartGroup.Classify,
                    label: 'com.bmc.arsys.rx.client.admin.cognitive-consumption.number-of-api-calls.label',
                    unit: 'N',
                    charts: [
                        {
                            title: 'com.bmc.arsys.rx.client.admin.cognitive-consumption.api-calls.title',
                            type: ChartType.HorizontalColumn
                        },
                        {
                            title: 'com.bmc.arsys.rx.client.admin.cognitive-consumption.api-call-summary.title',
                            type: ChartType.Area
                        }
                    ]
                }
            ]
        },
        {
            id: ChartGroup.Search,
            title: 'com.bmc.arsys.rx.client.admin.cognitive-consumption.cognitive-search.title',
            groups: [
                {
                    id: ChartGroup.SearchDocumentUsage,
                    label: 'com.bmc.arsys.rx.client.admin.cognitive-consumption.number-of-documents.label',
                    unit: 'N',
                    capacityName: 'Count',
                    charts: [
                        {
                            title: 'com.bmc.arsys.rx.client.admin.cognitive-consumption.documents.title',
                            type: ChartType.HorizontalColumn
                        },
                        {
                            title: 'com.bmc.arsys.rx.client.admin.cognitive-consumption.document-summary.title',
                            type: ChartType.Area
                        }
                    ]
                },
                {
                    id: ChartGroup.SearchDiskUsage,
                    label: 'com.bmc.arsys.rx.client.admin.cognitive-consumption.document-size.label',
                    unit: 'GB',
                    capacityName: 'Size',
                    charts: [
                        {
                            title: 'com.bmc.arsys.rx.client.admin.cognitive-consumption.document-storage.title',
                            type: ChartType.HorizontalColumn
                        },
                        {
                            title: 'com.bmc.arsys.rx.client.admin.cognitive-consumption.document-storage-summary.title',
                            type: ChartType.Area
                        }
                    ]
                }
            ]
        }
    ],
    settings: {
        countType: 'BY_MONTH',
        licenseType: 'com.bmc.arsys.rx.services.cognitive.CognitiveService',
        fields: {
            emailsAddressFieldId: 103,
            consumedCapacityField: 'consumedCapacity',
            thresholdReachedField: 'thresholdReached',
            notificationDateField: 'notificationDate',
            recipientsField: 'recipients'
        }
    }
};
//# sourceMappingURL=cognitive-consumption.constant.js.map