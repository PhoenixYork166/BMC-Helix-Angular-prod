"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppModuleProd = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("../utils/utils");
const workspace_1 = require("@nrwl/workspace");
function _createAppComponentProd() {
    return (tree) => {
        const appComponentFileName = './apps/shell/src/app/app.component.ts';
        const appComponentProdFileName = './apps/shell/src/app/app.component.prod.ts';
        const content = tree.read(appComponentFileName);
        if (content === null) {
            throw Error(`could not read ${appComponentFileName}`);
        }
        let contentAsString = content.toString('UTF-8');
        contentAsString = contentAsString.replace('AppComponent', 'AppComponentProd');
        if (tree.exists(appComponentProdFileName)) {
            tree.overwrite(appComponentProdFileName, contentAsString);
        }
        else {
            tree.create(appComponentProdFileName, contentAsString);
        }
        return tree;
    };
}
function _createAppModuleProd() {
    return (tree) => {
        const appModuleFileName = './apps/shell/src/app/app.module.ts';
        const appModuleProdFileName = './apps/shell/src/app/app.module.prod.ts';
        const content = tree.read(appModuleFileName);
        if (content === null) {
            throw Error(`could not read ${appModuleFileName}`);
        }
        let contentAsString = content.toString('UTF-8');
        contentAsString = contentAsString.replace(/AppComponent/g, 'AppComponentProd');
        contentAsString = contentAsString.replace('./app.component', './app.component.prod');
        if (tree.exists(appModuleProdFileName)) {
            tree.overwrite(appModuleProdFileName, contentAsString);
        }
        else {
            tree.create(appModuleProdFileName, contentAsString);
        }
        return tree;
    };
}
function createAppModuleProd() {
    return (tree) => {
        const libraryName = utils_1.getLibraryName(tree);
        const importModuleName = `${workspace_1.toClassName(libraryName)}Module`;
        const importModulePath = `@${utils_1.getBundleId(tree)}/${libraryName}`;
        return schematics_1.chain([_createAppModuleProd, _createAppComponentProd(), utils_1.addLibraryModuleToAppModule(importModuleName, importModulePath)]);
    };
}
exports.createAppModuleProd = createAppModuleProd;
