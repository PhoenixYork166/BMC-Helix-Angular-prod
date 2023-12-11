"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLibConfig = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const utils_1 = require("../utils/utils");
const workspace_1 = require("@nrwl/workspace");
function updateLibraryBuildConfig() {
    return (tree) => {
        const target = './angular.json';
        const targetAngularJson = workspace_1.readJsonInTree(tree, target);
        const libraryName = utils_1.getLibraryName(tree);
        const libraryConfig = targetAngularJson.projects[libraryName];
        const nrwlBuilder = '@nrwl/angular:package';
        if (libraryConfig.architect.build && libraryConfig.architect.build.builder !== nrwlBuilder) {
            targetAngularJson.projects[libraryName].architect.build.builder = nrwlBuilder;
        }
        tree.overwrite(target, JSON.stringify(targetAngularJson, null, 2));
        return tree;
    };
}
function updateLibConfig() {
    return schematics_1.chain([
        updateLibraryBuildConfig(),
        (_tree, context) => {
            if (!_tree.exists('./.eslintrc.json')) {
                context.addTask(new tasks_1.RunSchematicTask('@nrwl/angular', 'convert-tslint-to-eslint', {
                    project: utils_1.getLibraryName(_tree),
                    ignoreExistingTslintConfig: true,
                    removeTSLintIfNoMoreTSLintTargets: true
                }));
            }
        }
    ]);
}
exports.updateLibConfig = updateLibConfig;
