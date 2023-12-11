"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStyle = void 0;
const workspace_1 = require("@nrwl/workspace");
const utils_1 = require("../utils/utils");
const lodash_1 = require("lodash");
function addStyle() {
    return (tree) => {
        const angularJsonPath = './angular.json';
        const workspace = workspace_1.readJsonInTree(tree, angularJsonPath);
        const libraryName = utils_1.getLibraryName(tree);
        const style = {
            input: `libs/${libraryName}/src/lib/styles/${libraryName}.scss`,
            bundleName: libraryName
        };
        if (!lodash_1.find(workspace.projects.shell.architect.build.options.styles, style)) {
            workspace.projects.shell.architect.build.options.styles.push(style);
            tree.overwrite(angularJsonPath, JSON.stringify(workspace, null, 2));
        }
        return tree;
    };
}
exports.addStyle = addStyle;
