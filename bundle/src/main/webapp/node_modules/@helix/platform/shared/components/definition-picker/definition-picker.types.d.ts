export declare enum RxDefinitionPickerType {
    View = "view",
    Record = "record",
    DataRecord = "dataRecord",
    StandardDataRecord = "standardDataRecord",
    RegularRecord = "regularRecord",
    RegularDataRecord = "regularDataRecord",
    PublicRegularDataRecord = "publicRegularDataRecord",
    InheritableRecord = "inheritableRecord",
    NamedList = "namedList",
    Association = "association",
    Process = "process",
    PublicProcess = "publicProcess",
    Chatbot = "chatbot"
}
export declare enum RxDefinitionPickerScope {
    All = "all",
    Bundle = "bundle",
    Rx = "rx"
}
export declare const RX_DEFINITION_PICKER: {
    definitionScopes: {
        all: RxDefinitionPickerScope;
        bundle: RxDefinitionPickerScope;
        rx: RxDefinitionPickerScope;
    };
    definitionTypes: {
        view: {
            type: RxDefinitionPickerType;
            allDefinitionsLabelKey: string;
            dataGetters: {
                all: string;
                bundle: string;
            };
        };
        record: {
            type: RxDefinitionPickerType;
            allDefinitionsLabelKey: string;
            dataGetters: {
                all: string;
                rx: string;
                bundle: string;
            };
        };
        dataRecord: {
            type: RxDefinitionPickerType;
            allDefinitionsLabelKey: string;
            dataGetters: {
                all: string;
                rx: string;
                bundle: string;
            };
        };
        standardDataRecord: {
            type: RxDefinitionPickerType;
            allDefinitionsLabelKey: string;
            dataGetters: {
                all: string;
                rx: string;
                bundle: string;
            };
        };
        regularRecord: {
            type: RxDefinitionPickerType;
            allDefinitionsLabelKey: string;
            dataGetters: {
                all: string;
                rx: string;
                bundle: string;
            };
        };
        regularDataRecord: {
            type: RxDefinitionPickerType;
            allDefinitionsLabelKey: string;
            dataGetters: {
                all: string;
                rx: string;
                bundle: string;
            };
        };
        publicRegularDataRecord: {
            type: RxDefinitionPickerType;
            allDefinitionsLabelKey: string;
            dataGetters: {
                all: string;
                rx: string;
                bundle: string;
            };
        };
        inheritableRecord: {
            type: RxDefinitionPickerType;
            allDefinitionsLabelKey: string;
            dataGetters: {
                all: string;
                bundle: string;
            };
        };
        namedList: {
            type: RxDefinitionPickerType;
            allDefinitionsLabelKey: string;
            dataGetters: {
                all: string;
                bundle: string;
            };
        };
        association: {
            type: RxDefinitionPickerType;
            allDefinitionsLabelKey: string;
            dataGetters: {
                all: string;
                bundle: string;
            };
        };
        process: {
            type: RxDefinitionPickerType;
            allDefinitionsLabelKey: string;
            dataGetters: {
                all: string;
                bundle: string;
            };
        };
        publicProcess: {
            type: RxDefinitionPickerType;
            allDefinitionsLabelKey: string;
            dataGetters: {
                all: string;
                bundle: string;
            };
        };
        chatbot: {
            type: RxDefinitionPickerType;
            allDefinitionsLabelKey: string;
            dataGetters: {
                all: string;
                bundle: string;
            };
        };
    };
};
