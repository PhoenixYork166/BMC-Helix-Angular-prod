"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWebpackConfig = void 0;
const schematics_1 = require("@angular-devkit/schematics");
function updateWebpackConfig() {
    return (tree) => {
        const targetWebpackConf = './webpack.config.js';
        const sourceWebpackConf = 'node_modules/@helix/schematics/src/config/webpack.config.js';
        if (!tree.exists(sourceWebpackConf)) {
            throw new schematics_1.SchematicsException(`Cannot find webpack configuration at ${sourceWebpackConf}`);
        }
        const sourceTemplate = tree.read(sourceWebpackConf);
        const sourceTemplateInput = sourceTemplate;
        if (tree.exists(targetWebpackConf)) {
            tree.overwrite(targetWebpackConf, sourceTemplateInput);
        }
        else {
            tree.create(targetWebpackConf, sourceTemplateInput);
        }
        return tree;
    };
}
exports.updateWebpackConfig = updateWebpackConfig;
