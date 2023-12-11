export var RxDefinitionPickerType;
(function (RxDefinitionPickerType) {
    RxDefinitionPickerType["View"] = "view";
    RxDefinitionPickerType["Record"] = "record";
    RxDefinitionPickerType["DataRecord"] = "dataRecord";
    RxDefinitionPickerType["StandardDataRecord"] = "standardDataRecord";
    RxDefinitionPickerType["RegularRecord"] = "regularRecord";
    RxDefinitionPickerType["RegularDataRecord"] = "regularDataRecord";
    RxDefinitionPickerType["PublicRegularDataRecord"] = "publicRegularDataRecord";
    RxDefinitionPickerType["InheritableRecord"] = "inheritableRecord";
    RxDefinitionPickerType["NamedList"] = "namedList";
    RxDefinitionPickerType["Association"] = "association";
    RxDefinitionPickerType["Process"] = "process";
    RxDefinitionPickerType["PublicProcess"] = "publicProcess";
    RxDefinitionPickerType["Chatbot"] = "chatbot";
})(RxDefinitionPickerType || (RxDefinitionPickerType = {}));
export var RxDefinitionPickerScope;
(function (RxDefinitionPickerScope) {
    RxDefinitionPickerScope["All"] = "all";
    RxDefinitionPickerScope["Bundle"] = "bundle";
    RxDefinitionPickerScope["Rx"] = "rx";
})(RxDefinitionPickerScope || (RxDefinitionPickerScope = {}));
export const RX_DEFINITION_PICKER = {
    definitionScopes: {
        all: RxDefinitionPickerScope.All,
        bundle: RxDefinitionPickerScope.Bundle,
        rx: RxDefinitionPickerScope.Rx
    },
    definitionTypes: {
        [RxDefinitionPickerType.View]: {
            type: RxDefinitionPickerType.View,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-views.label',
            dataGetters: {
                all: 'getAllViewDefinitionDescriptors',
                bundle: 'getBundleViewDefinitionDescriptors'
            }
        },
        [RxDefinitionPickerType.Record]: {
            type: RxDefinitionPickerType.Record,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-records.label',
            dataGetters: {
                all: 'getAllRecordDefinitionDescriptors',
                rx: 'getRxRecordDefinitionDescriptors',
                bundle: 'getBundleRecordDefinitionDescriptors'
            }
        },
        [RxDefinitionPickerType.DataRecord]: {
            type: RxDefinitionPickerType.DataRecord,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-records.label',
            dataGetters: {
                all: 'getAllDataRecordDefinitionDescriptors',
                rx: 'getRxDataRecordDefinitionDescriptors',
                bundle: 'getBundleDataRecordDefinitionDescriptors'
            }
        },
        [RxDefinitionPickerType.StandardDataRecord]: {
            type: RxDefinitionPickerType.StandardDataRecord,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-records.label',
            dataGetters: {
                all: 'getAllStandardDataRecordDefinitionDescriptors',
                rx: 'getRxStandardDataRecordDefinitionDescriptors',
                bundle: 'getBundleStandardDataRecordDefinitionDescriptors'
            }
        },
        [RxDefinitionPickerType.RegularRecord]: {
            type: RxDefinitionPickerType.RegularRecord,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-records.label',
            dataGetters: {
                all: 'getAllRegularRecordDefinitionDescriptors',
                rx: 'getRxRegularRecordDefinitionDescriptors',
                bundle: 'getBundleRegularRecordDefinitionDescriptors'
            }
        },
        [RxDefinitionPickerType.RegularDataRecord]: {
            type: RxDefinitionPickerType.RegularDataRecord,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-records.label',
            dataGetters: {
                all: 'getAllRegularDataRecordDefinitionDescriptors',
                rx: 'getRxRegularDataRecordDefinitionDescriptors',
                bundle: 'getBundleRegularDataRecordDefinitionDescriptors'
            }
        },
        [RxDefinitionPickerType.PublicRegularDataRecord]: {
            type: RxDefinitionPickerType.PublicRegularDataRecord,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-records.label',
            dataGetters: {
                all: 'getAllPublicRegularDataRecordDefinitionDescriptors',
                rx: 'getRxPublicRegularDataRecordDefinitionDescriptors',
                bundle: 'getBundlePublicRegularDataRecordDefinitionDescriptors'
            }
        },
        [RxDefinitionPickerType.InheritableRecord]: {
            type: RxDefinitionPickerType.InheritableRecord,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-records.label',
            dataGetters: {
                all: 'getAllInheritableRecordDefinitionDescriptors',
                bundle: 'getBundleInheritableRecordDefinitionDescriptors'
            }
        },
        [RxDefinitionPickerType.NamedList]: {
            type: RxDefinitionPickerType.NamedList,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-named-lists.label',
            dataGetters: {
                all: 'getAllNamedListDefinitionDescriptors',
                bundle: 'getBundleNamedListDefinitionDescriptors'
            }
        },
        [RxDefinitionPickerType.Association]: {
            type: RxDefinitionPickerType.Association,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-associations.label',
            dataGetters: {
                all: 'getAllAssociationDefinitionDescriptors',
                bundle: 'getBundleAssociationDefinitionDescriptors'
            }
        },
        [RxDefinitionPickerType.Process]: {
            type: RxDefinitionPickerType.Process,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-processes.label',
            dataGetters: {
                all: 'getAllProcessDefinitionDescriptors',
                bundle: 'getBundleProcessDefinitionDescriptors'
            }
        },
        [RxDefinitionPickerType.PublicProcess]: {
            type: RxDefinitionPickerType.Process,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-processes.label',
            dataGetters: {
                all: 'getAllPublicProcessDefinitionDescriptors',
                bundle: 'getBundlePublicProcessDefinitionDescriptors'
            }
        },
        [RxDefinitionPickerType.Chatbot]: {
            type: RxDefinitionPickerType.Chatbot,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-chatbots.label',
            dataGetters: {
                all: 'getAllChatbotDefinitionDescriptors',
                bundle: 'getBundleChatbotDefinitionDescriptors'
            }
        }
    }
};
//# sourceMappingURL=definition-picker.types.js.map