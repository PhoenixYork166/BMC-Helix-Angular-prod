"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
const utils_1 = require("../utils/utils");
function default_1() {
    return (tree) => {
        if (utils_1.shouldCopySdkArtefacts()) {
            return schematics_1.chain([schematics_1.noop()]);
        }
        const workspaceConfig = workspace_1.readJsonInTree(tree, '/angular.json').projects;
        const hasLibrary = Object.keys(workspaceConfig).some((key) => workspaceConfig[key]['projectType'] === 'library');
        if (hasLibrary) {
            return schematics_1.chain([schematics_1.schematic('update-workspace', {})]);
        }
        else {
            return schematics_1.chain([schematics_1.schematic('create-workspace', {})]);
        }
    };
}
exports.default = default_1;
