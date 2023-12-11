"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEnvironmentConfig = void 0;
const utils_1 = require("../utils/utils");
function updateEnvironmentConfig() {
    return (tree) => {
        const targetEnvironment = './apps/shell/src/environments/environment.ts';
        const sourceTemplate = `
    export const environment = {
      production: false,
      bundleId : '${utils_1.getBundleId(tree)}' // comment out this line if you don't want the code of other angular bundles to be loaded or
      //set bundleId to '' (empty string) if you want the code of your bundle to be loaded from the server
     };
     `;
        if (tree.exists(targetEnvironment)) {
            tree.overwrite(targetEnvironment, sourceTemplate);
        }
        else {
            tree.create(targetEnvironment, sourceTemplate);
        }
        return tree;
    };
}
exports.updateEnvironmentConfig = updateEnvironmentConfig;
