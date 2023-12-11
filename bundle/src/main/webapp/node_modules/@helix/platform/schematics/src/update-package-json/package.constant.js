"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RxScriptName = exports.RX_PACKAGE = exports.RX_SCRIPTS = void 0;
exports.RX_SCRIPTS = {
    buildWebpackCommand: 'set NG_BUILD_MANGLE=false && yarn ng-high-memory build --extra-webpack-config webpack.config.js && node postbuild.js',
    postBuildScript: './postbuild.js',
    postBuildCommand: `const execSync = require('child_process').execSync;\nexecSync('schematics @helix/schematics:generate-manifest', { stdio: 'inherit' });`
};
exports.RX_PACKAGE = {
    sourcePackage: './tools/rx-libs/platform/schematics/src/config/package.json',
    targetPackage: './package.json',
    defaultManifestGenerateOption: 'config.manifest.generate',
    defaultManifestLoadJsOption: 'config.manifest.loadJs',
    defaultManifestLoadCssOption: 'config.manifest.loadCss'
};
var RxScriptName;
(function (RxScriptName) {
    RxScriptName["ngHighMemory"] = "ng-high-memory";
    RxScriptName["buildWebpack"] = "build:webpack";
    RxScriptName["serveWebpack"] = "serve:webpack";
})(RxScriptName = exports.RxScriptName || (exports.RxScriptName = {}));
