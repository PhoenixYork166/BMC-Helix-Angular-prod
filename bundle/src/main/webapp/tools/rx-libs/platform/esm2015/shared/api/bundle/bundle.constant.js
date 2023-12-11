const bundleTypes = {
    application: 'Application',
    library: 'Library'
};
const definitionScopeNames = {
    application: bundleTypes.application,
    library: bundleTypes.library,
    public: 'Public'
};
const definitionScopeTypes = {
    bundle: 'BUNDLE',
    public: 'PUBLIC'
};
export const RX_BUNDLE = {
    bundleTypes,
    definitionScopeNames,
    definitionScopeTypes,
    definitionScopes: {
        application: {
            displayName: definitionScopeNames.application,
            type: definitionScopeTypes.bundle
        },
        library: {
            displayName: definitionScopeNames.library,
            type: definitionScopeTypes.bundle
        },
        public: {
            displayName: definitionScopeNames.public,
            type: definitionScopeTypes.public
        }
    },
    applicationDefinitionScopeSelectionOptions: [
        {
            id: definitionScopeTypes.bundle,
            name: definitionScopeNames.application
        },
        {
            id: definitionScopeTypes.public,
            name: definitionScopeNames.public
        }
    ],
    libraryDefinitionScopeSelectionOptions: [
        {
            id: definitionScopeTypes.bundle,
            name: definitionScopeNames.library
        },
        {
            id: definitionScopeTypes.public,
            name: definitionScopeNames.public
        }
    ]
};
//# sourceMappingURL=bundle.constant.js.map