"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePackageJson = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
const lodash_1 = require("lodash");
const dependencies_1 = require("@schematics/angular/utility/dependencies");
const package_constant_1 = require("./package.constant");
const manifest_types_1 = require("../generate-manifest/manifest.types");
function updateOptionalDependencies() {
    return (tree) => {
        const sourceAngularJson = './tools/rx-libs/platform/schematics/src/config/angular.json';
        const dependencies = [];
        lodash_1.forEach(workspace_1.readJsonInTree(tree, sourceAngularJson).projects, (project, projectName) => {
            if (project.projectType === 'library') {
                let rootPath = project.root;
                if (project.root.includes('libs/platform/')) {
                    rootPath = rootPath.replace('libs/platform/', 'tools/rx-libs/');
                }
                else if (project.root.includes('libs/')) {
                    rootPath = rootPath.replace('libs/', 'tools/rx-libs/');
                }
                dependencies.push({
                    type: dependencies_1.NodeDependencyType.Optional,
                    name: `@helix/${projectName}`,
                    version: `file:./${rootPath}`
                });
            }
        });
        dependencies.push({
            type: dependencies_1.NodeDependencyType.Optional,
            name: `@helix/schematics`,
            version: 'file:./tools/rx-libs/schematics'
        });
        dependencies.forEach((dependency) => dependencies_1.addPackageJsonDependency(tree, dependency));
        return tree;
    };
}
function updateDependencies() {
    return (tree) => {
        const sourcePackageJson = workspace_1.readJsonInTree(tree, package_constant_1.RX_PACKAGE.sourcePackage);
        const targetPackageJson = workspace_1.readJsonInTree(tree, package_constant_1.RX_PACKAGE.targetPackage);
        lodash_1.set(targetPackageJson, dependencies_1.NodeDependencyType.Default, sourcePackageJson[dependencies_1.NodeDependencyType.Default]);
        lodash_1.set(targetPackageJson, dependencies_1.NodeDependencyType.Dev, sourcePackageJson[dependencies_1.NodeDependencyType.Dev]);
        tree.overwrite(package_constant_1.RX_PACKAGE.targetPackage, JSON.stringify(targetPackageJson, null, 2));
        return tree;
    };
}
function updateBuildScripts() {
    return (tree) => {
        const sourcePackageJson = workspace_1.readJsonInTree(tree, package_constant_1.RX_PACKAGE.sourcePackage);
        const targetPackageJson = workspace_1.readJsonInTree(tree, package_constant_1.RX_PACKAGE.targetPackage);
        lodash_1.set(targetPackageJson, 'name', sourcePackageJson.name);
        lodash_1.set(targetPackageJson.scripts, package_constant_1.RxScriptName.ngHighMemory, sourcePackageJson.scripts[package_constant_1.RxScriptName.ngHighMemory]);
        lodash_1.set(targetPackageJson.scripts, package_constant_1.RxScriptName.buildWebpack, package_constant_1.RX_SCRIPTS.buildWebpackCommand);
        lodash_1.set(targetPackageJson.scripts, package_constant_1.RxScriptName.serveWebpack, sourcePackageJson.scripts[package_constant_1.RxScriptName.serveWebpack]);
        return tree.overwrite(package_constant_1.RX_PACKAGE.targetPackage, JSON.stringify(targetPackageJson, null, 2));
    };
}
function generatePostBuildScript() {
    return (tree) => {
        var _a;
        if (!tree.exists(package_constant_1.RX_SCRIPTS.postBuildScript)) {
            tree.create(package_constant_1.RX_SCRIPTS.postBuildScript, package_constant_1.RX_SCRIPTS.postBuildCommand);
        }
        else if (((_a = tree.read(package_constant_1.RX_SCRIPTS.postBuildScript)) === null || _a === void 0 ? void 0 : _a.toString()) !== package_constant_1.RX_SCRIPTS.postBuildCommand) {
            tree.overwrite(package_constant_1.RX_SCRIPTS.postBuildScript, package_constant_1.RX_SCRIPTS.postBuildCommand);
        }
        return tree;
    };
}
function addManifestConfigIfAbsent() {
    return (tree) => {
        const targetPackageJson = workspace_1.readJsonInTree(tree, package_constant_1.RX_PACKAGE.targetPackage);
        if (lodash_1.isUndefined(lodash_1.get(targetPackageJson, package_constant_1.RX_PACKAGE.defaultManifestGenerateOption))) {
            lodash_1.set(targetPackageJson, package_constant_1.RX_PACKAGE.defaultManifestGenerateOption, false);
            lodash_1.set(targetPackageJson, package_constant_1.RX_PACKAGE.defaultManifestLoadJsOption, manifest_types_1.LoadingOptions.lazy);
            lodash_1.set(targetPackageJson, package_constant_1.RX_PACKAGE.defaultManifestLoadCssOption, manifest_types_1.LoadingOptions.lazy);
            tree.overwrite(package_constant_1.RX_PACKAGE.targetPackage, JSON.stringify(targetPackageJson, null, 2));
        }
        return tree;
    };
}
function updatePackageJson() {
    return schematics_1.chain([addManifestConfigIfAbsent, generatePostBuildScript(), updateBuildScripts(), updateDependencies(), updateOptionalDependencies()]);
}
exports.updatePackageJson = updatePackageJson;
