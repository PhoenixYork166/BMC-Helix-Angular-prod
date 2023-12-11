"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const src_1 = require("@angular-devkit/core/src");
const bundle_info_1 = require("../utils/bundle-info");
const ast_utils_1 = require("@nrwl/workspace/src/utils/ast-utils");
const utils_1 = require("../utils/utils");
const workspace_1 = require("@nrwl/workspace");
const path_1 = require("path");
function default_1(schema) {
    return (tree) => {
        const bundlePackage = ast_utils_1.readJsonInTree(tree, './package.json');
        const bundleInfo = new bundle_info_1.RxBundleInfo(bundlePackage);
        return schematics_1.chain([
            schematics_1.externalSchematic('@nrwl/angular', 'lib', {
                name: bundleInfo.libraryName,
                style: 'scss',
                prefix: bundleInfo.bundleId,
                publishable: true,
                importPath: `@${bundleInfo.bundleId}/${bundleInfo.libraryName}`
            }),
            schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./files'), [
                schematics_1.applyTemplates(Object.assign(Object.assign(Object.assign({}, src_1.strings), schema), bundleInfo)),
                schematics_1.move('./libs/' + bundleInfo.libraryName + '/src/lib/')
            ])),
            updateTsConfigSpec(bundleInfo),
            updateTsConfig(bundleInfo),
            updateTsConfigLib(bundleInfo),
            utils_1.insertImportToLibraryModule(bundleInfo.libraryModulePath, 'RxLocalizationService', '@helix/platform/shared/api'),
            utils_1.insertAsteriskImportToLibraryModule(bundleInfo, 'defaultApplicationStrings', './i18n/localized-strings.json'),
            utils_1.addConstructorParamsToLibraryModule(bundleInfo),
            workspace_1.formatFiles()
        ]);
    };
}
exports.default = default_1;
function updateTsConfig(bundleInfo) {
    return (tree) => {
        const tsConfigPath = path_1.join(bundleInfo.libraryRootPath, './tsconfig.json');
        const tsConfig = ast_utils_1.readJsonInTree(tree, tsConfigPath);
        tsConfig['compilerOptions']['strict'] = false;
        tsConfig['compilerOptions']['noImplicitReturns'] = false;
        tree.overwrite(tsConfigPath, JSON.stringify(tsConfig, null, 2));
        return tree;
    };
}
function updateTsConfigSpec(bundleInfo) {
    return (tree) => {
        const tsConfigSpecPath = path_1.join(bundleInfo.libraryRootPath, './tsconfig.spec.json');
        const tsConfigSpec = ast_utils_1.readJsonInTree(tree, tsConfigSpecPath);
        tsConfigSpec['compilerOptions']['allowJs'] = true;
        tree.overwrite(tsConfigSpecPath, JSON.stringify(tsConfigSpec, null, 2));
        return tree;
    };
}
function updateTsConfigLib(bundleInfo) {
    return (tree) => {
        const tsConfigLibPath = path_1.join(bundleInfo.libraryRootPath, './tsconfig.lib.json');
        const tsLibConfig = ast_utils_1.readJsonInTree(tree, tsConfigLibPath);
        tsLibConfig['compilerOptions']['resolveJsonModule'] = true;
        tree.overwrite(tsConfigLibPath, JSON.stringify(tsLibConfig, null, 2));
        return tree;
    };
}
