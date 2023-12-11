"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePreinstall = void 0;
const schematics_1 = require("@angular-devkit/schematics");
function updatePreinstall() {
    return (tree) => {
        const targetPreinstall = './preinstall.js';
        const sourcePreinstall = 'node_modules/@helix/schematics/src/config/preinstall.js';
        if (!tree.exists(sourcePreinstall)) {
            throw new schematics_1.SchematicsException(`Cannot find preinstall at ${sourcePreinstall}`);
        }
        const sourceTemplate = tree.read(sourcePreinstall);
        const sourceTemplateInput = sourceTemplate;
        if (tree.exists(targetPreinstall)) {
            tree.overwrite(targetPreinstall, sourceTemplateInput);
        }
        else {
            tree.create(targetPreinstall, sourceTemplateInput);
        }
        return tree;
    };
}
exports.updatePreinstall = updatePreinstall;
