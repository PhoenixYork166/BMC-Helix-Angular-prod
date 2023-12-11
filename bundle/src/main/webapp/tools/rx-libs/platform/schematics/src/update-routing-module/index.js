"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoutingModule = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
const typescript_1 = require("typescript");
const ast_utils_1 = require("@nrwl/angular/src/utils/ast-utils");
const utils_1 = require("../utils/utils");
function updateRoutingModule() {
    return (tree) => {
        const routingSourcePath = './apps/shell/src/app/app-routing.module.ts';
        if (!tree.exists(routingSourcePath)) {
            throw new schematics_1.SchematicsException(`Cannot find routing module.`);
        }
        const moduleSource = tree.read(routingSourcePath).toString('utf-8');
        const sourceFile = typescript_1.createSourceFile(routingSourcePath, moduleSource, typescript_1.ScriptTarget.Latest, true);
        const projectName = utils_1.getLibraryName(tree);
        workspace_1.insert(tree, routingSourcePath, [
            ...ast_utils_1.addRoute(routingSourcePath, sourceFile, `
        {
        path: '${projectName}',
        loadChildren: () => import('@${utils_1.getBundleId(tree)}/${projectName}').then(module => module.${`${workspace_1.toClassName(projectName)}Module`})
        }`)
        ]);
        return tree;
    };
}
exports.updateRoutingModule = updateRoutingModule;
