"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAngularJson = void 0;
const workspace_1 = require("@nrwl/workspace");
const json_diff_1 = require("@nrwl/workspace/src/utilities/json-diff");
const lodash_1 = require("lodash");
const utils_1 = require("../utils/utils");
function getExpression(property) {
    return property.nestedPropLevelOne ? `${property.baseProp}.${property.nestedPropLevelOne}` : property.baseProp;
}
function isValidChange(jsonChange) {
    return (!lodash_1.isUndefined(jsonChange.value.lhs) &&
        (lodash_1.isString(jsonChange.value.lhs) || lodash_1.isBoolean(jsonChange.value.lhs) || lodash_1.isArray(jsonChange.value.lhs)));
}
function getProperty(jsonChange) {
    return {
        baseProp: jsonChange.path[0],
        nestedPropLevelOne: jsonChange.path[1],
        nestedPropLevelTwo: jsonChange.path[2],
        nestedPropLevelThree: jsonChange.path[3]
    };
}
function applyJsonChangesToWorkspace(jsonChanges, source, target, libraryName, artifactId) {
    let shouldProcessAssets = true;
    let shouldProcessStyles = true;
    let shouldProcessScripts = true;
    let shouldProcessCommonJsDependencies = true;
    const customPrefix = 'libs/';
    jsonChanges.forEach((jsonChange) => {
        if (isValidChange(jsonChange)) {
            const property = getProperty(jsonChange);
            switch (getExpression(property)) {
                case 'options.assets':
                    if (shouldProcessAssets) {
                        const defaultAssetI18n = {
                            glob: '**/*',
                            input: `libs/${libraryName}/src/lib/i18n/`,
                            output: 'assets/i18n/'
                        };
                        const defaultAssetRoot = {
                            glob: '**/*',
                            input: `libs/${libraryName}/src/lib/assets/`,
                            output: `assets/libs/${artifactId}/resources/`
                        };
                        const customAssets = lodash_1.filter(target.options.assets, (asset) => lodash_1.isObject(asset) && lodash_1.startsWith(asset.input, customPrefix));
                        if (!lodash_1.find(customAssets, defaultAssetI18n)) {
                            customAssets.unshift(defaultAssetI18n);
                        }
                        if (!lodash_1.find(customAssets, (asset) => lodash_1.startsWith(asset.input, defaultAssetRoot.input))) {
                            customAssets.push(defaultAssetRoot);
                        }
                        target.options.assets = [
                            ...source.options.assets,
                            ...customAssets
                        ];
                        shouldProcessAssets = false;
                    }
                    break;
                case 'options.styles':
                    if (shouldProcessStyles) {
                        const defaultStyle = {
                            input: `libs/${libraryName}/src/lib/styles/${libraryName}.scss`,
                            bundleName: libraryName
                        };
                        const customStyles = lodash_1.filter(target.options.styles, (style) => lodash_1.isObject(style) && lodash_1.startsWith(style.input, customPrefix));
                        if (!lodash_1.find(customStyles, defaultStyle)) {
                            customStyles.unshift(defaultStyle);
                        }
                        target.options.styles = [...source.options.styles, ...customStyles];
                        shouldProcessStyles = false;
                    }
                    break;
                case 'options.allowedCommonJsDependencies':
                    if (shouldProcessCommonJsDependencies) {
                        target.options.allowedCommonJsDependencies = [...source.options.allowedCommonJsDependencies];
                        shouldProcessCommonJsDependencies = false;
                    }
                    break;
                case 'options.scripts':
                    if (shouldProcessScripts) {
                        const customScripts = lodash_1.filter(target.options.scripts, (script) => lodash_1.isObject(script) && lodash_1.startsWith(script.input, customPrefix));
                        target.options.scripts = [...source.options.scripts, ...customScripts];
                        shouldProcessScripts = false;
                    }
                    break;
                default:
                    const propPath = Array.from(jsonChange.path);
                    const propToUpdate = lodash_1.last(propPath);
                    if (propToUpdate === 'outputHashing' ||
                        propToUpdate === 'maximumError' ||
                        propToUpdate === 'maximumWarning') {
                        break;
                    }
                    if (propToUpdate) {
                        lodash_1.set(target, propPath.join('.'), jsonChange.value.lhs);
                    }
                    break;
            }
        }
    });
}
function updateAppModuleProdConfig(targetWorkspace) {
    const appModuleProdConfig = {
        replace: 'apps/shell/src/app/app.module.ts',
        with: 'apps/shell/src/app/app.module.prod.ts'
    };
    const isAppModuleProdConfigAbsent = !lodash_1.find(targetWorkspace.projects.shell.architect.build.configurations.production.fileReplacements, appModuleProdConfig);
    if (isAppModuleProdConfigAbsent) {
        targetWorkspace.projects.shell.architect.build.configurations.production.fileReplacements.push(appModuleProdConfig);
    }
    return isAppModuleProdConfigAbsent;
}
function updateLintConfiguration(sourceWorkspace, targetWorkspace) {
    const isLintConfigChanged = !lodash_1.isEqual(sourceWorkspace.projects.shell.architect.lint, targetWorkspace.projects.shell.architect.lint);
    if (isLintConfigChanged) {
        targetWorkspace.projects.shell.architect.lint = sourceWorkspace.projects.shell.architect.lint;
    }
    return isLintConfigChanged;
}
function updateServeConfiguration(sourceWorkspace, targetWorkspace) {
    const isServeConfigChanged = !lodash_1.isEqual(sourceWorkspace.projects.shell.architect.serve, targetWorkspace.projects.shell.architect.serve);
    if (isServeConfigChanged) {
        targetWorkspace.projects.shell.architect.serve = sourceWorkspace.projects.shell.architect.serve;
    }
    return isServeConfigChanged;
}
function updateBuildConfiguration(sourceWorkspace, targetWorkspace, tree) {
    const isBuildConfigChanged = !lodash_1.isEqual(sourceWorkspace.projects.shell.architect.build, targetWorkspace.projects.shell.architect.build);
    if (isBuildConfigChanged) {
        applyJsonChangesToWorkspace(json_diff_1.jsonDiff(sourceWorkspace.projects.shell.architect.build, targetWorkspace.projects.shell.architect.build), sourceWorkspace.projects.shell.architect.build, targetWorkspace.projects.shell.architect.build, utils_1.getLibraryName(tree), utils_1.getArtifactId(tree));
    }
    return isBuildConfigChanged;
}
function updateAngularJson() {
    return (tree) => {
        let isConfigUpdated = false;
        const sourceAngularJson = './tools/rx-libs/platform/schematics/src/config/angular.json';
        const targetAngularJson = './angular.json';
        const sourceWorkspace = workspace_1.readJsonInTree(tree, sourceAngularJson);
        const targetWorkspace = workspace_1.readJsonInTree(tree, targetAngularJson);
        if (!lodash_1.isEmpty(targetWorkspace) && !lodash_1.isEmpty(sourceWorkspace)) {
            const isBuildConfigUpdated = updateBuildConfiguration(sourceWorkspace, targetWorkspace, tree);
            const isServeConfigUpdated = updateServeConfiguration(sourceWorkspace, targetWorkspace);
            const isLintConfigUpdated = updateLintConfiguration(sourceWorkspace, targetWorkspace);
            const isProdConfigUpdated = updateAppModuleProdConfig(targetWorkspace);
            isConfigUpdated = isBuildConfigUpdated || isServeConfigUpdated || isLintConfigUpdated || isProdConfigUpdated;
        }
        return isConfigUpdated ? tree.overwrite(targetAngularJson, JSON.stringify(targetWorkspace, null, 2)) : tree;
    };
}
exports.updateAngularJson = updateAngularJson;
