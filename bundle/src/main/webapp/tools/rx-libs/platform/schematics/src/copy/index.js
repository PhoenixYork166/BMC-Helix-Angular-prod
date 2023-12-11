"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("../utils/utils");
const fs_1 = require("fs");
function default_1() {
    if (!fs_1.existsSync('src/config')) {
        fs_1.mkdirSync('src/config');
    }
    return schematics_1.chain([utils_1.copy('angular'), utils_1.copy('package'), utils_1.copy('webpack'), utils_1.copy('schematicsSrc'), utils_1.copy('schematicsPackage')]);
}
exports.default = default_1;
