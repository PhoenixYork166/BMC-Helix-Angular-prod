"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const utils_1 = require("../utils/utils");
const bundle_info_1 = require("../utils/bundle-info");
const ast_utils_1 = require("@nrwl/workspace/src/utils/ast-utils");
function default_1(schema) {
    return (tree) => {
        const bundlePackage = ast_utils_1.readJsonInTree(tree, './package.json');
        const bundleInformation = new bundle_info_1.RxBundleInfo(bundlePackage);
        schema.bundleId = bundleInformation.bundleId;
        schema.libraryName = bundleInformation.libraryName;
        schema.actionSelector = strings_1.classify(schema.libraryName) + strings_1.classify(schema.actionName);
        return schematics_1.chain([
            schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./files'), [
                schematics_1.applyTemplates(Object.assign(Object.assign({}, core_1.strings), schema)),
                schematics_1.move('./libs/' + schema.libraryName + '/src/lib/actions/' + strings_1.dasherize(schema.actionName) + '/')
            ])),
            utils_1.insertImportToLibraryModule(bundleInformation.libraryModulePath, strings_1.classify(schema.actionName) + 'ActionModule', './actions/' + strings_1.dasherize(schema.actionName) + '/' + strings_1.dasherize(schema.actionName) + '-action.module', true)
        ]);
    };
}
exports.default = default_1;
