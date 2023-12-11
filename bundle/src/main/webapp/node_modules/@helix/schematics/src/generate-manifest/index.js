"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateManifest = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("../utils/utils");
const workspace_1 = require("@nrwl/workspace");
const manifest_types_1 = require("./manifest.types");
const lodash_1 = require("lodash");
const helper_1 = require("./helper");
const typescript_1 = require("@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript");
const path_1 = require("path");
const manifest_constant_1 = require("./manifest.constant");
function getDecoratorProperty(tree, filePath, output, decoratorName, decoratorProperty) {
    const sourceFile = helper_1.getSourceFile(tree, filePath);
    const properties = lodash_1.chain(helper_1.getDecoratorMetadata(sourceFile, decoratorName))
        .flatMap((node) => node.properties)
        .filter((node) => { var _a, _b; return ((_a = node === null || node === void 0 ? void 0 : node.name) === null || _a === void 0 ? void 0 : _a.kind) === typescript_1.SyntaxKind.Identifier && ((_b = node === null || node === void 0 ? void 0 : node.name) === null || _b === void 0 ? void 0 : _b.text) === decoratorProperty; })
        .value();
    const valueExpression = lodash_1.isEmpty(properties) ? { kind: typescript_1.SyntaxKind.Unknown } : properties[0].initializer;
    switch (valueExpression.kind) {
        case typescript_1.SyntaxKind.StringLiteral: {
            output.push(valueExpression.text);
            break;
        }
        case typescript_1.SyntaxKind.Identifier:
        case typescript_1.SyntaxKind.PropertyAccessExpression: {
            throw new schematics_1.SchematicsException(`${filePath}: @${decoratorName}: ${decoratorProperty} must be a string literal.`);
        }
        default: {
            break;
        }
    }
}
function getPathFromContentRootLibrarySource(tree, suffix) {
    const librarySourceRoot = workspace_1.readJsonInTree(tree, './angular.json').projects[utils_1.getLibraryName(tree)].sourceRoot;
    return suffix ? path_1.join(path_1.resolve(), librarySourceRoot, suffix) : path_1.join(path_1.resolve(), librarySourceRoot);
}
function getAllViewComponentTypes(tree) {
    const viewComponentTypes = [];
    const sourceRoot = getPathFromContentRootLibrarySource(tree, manifest_constant_1.MANIFEST.directory.defaultViewComponent);
    helper_1.getFilePaths(sourceRoot, manifest_constant_1.MANIFEST.extension.component, []).forEach((filePath) => getDecoratorProperty(tree, filePath, viewComponentTypes, manifest_constant_1.MANIFEST.decorator.viewComponent, manifest_constant_1.MANIFEST.property.elementName));
    return viewComponentTypes;
}
function getAllViewActionNames(tree) {
    const actionNames = [];
    const actionsSourceRoot = getPathFromContentRootLibrarySource(tree, manifest_constant_1.MANIFEST.directory.defaultViewAction);
    helper_1.getFilePaths(actionsSourceRoot, manifest_constant_1.MANIFEST.extension.service, []).forEach((filePath) => getDecoratorProperty(tree, filePath, actionNames, manifest_constant_1.MANIFEST.decorator.viewAction, manifest_constant_1.MANIFEST.property.elementName));
    return actionNames;
}
function getAllApplicationInitializerIds(tree) {
    const appInitializerNames = [];
    const actionsSourceRoot = getPathFromContentRootLibrarySource(tree);
    helper_1.getFilePaths(actionsSourceRoot, manifest_constant_1.MANIFEST.extension.appInitializer, []).forEach((filePath) => getDecoratorProperty(tree, filePath, appInitializerNames, manifest_constant_1.MANIFEST.decorator.applicationInitializer, manifest_constant_1.MANIFEST.property.applicationInitializer));
    return appInitializerNames;
}
function normalizeManifest(manifestInfo) {
    var _a, _b, _c, _d;
    return {
        viewComponents: lodash_1.unionBy(manifestInfo.viewComponents, []),
        viewActions: lodash_1.unionBy(manifestInfo.viewActions, []),
        applicationInitializers: lodash_1.unionBy(manifestInfo.applicationInitializers, []),
        options: {
            loadCss: (_b = (_a = manifestInfo.options) === null || _a === void 0 ? void 0 : _a.loadCss) !== null && _b !== void 0 ? _b : manifest_types_1.LoadingOptions.lazy,
            loadJs: (_d = (_c = manifestInfo.options) === null || _c === void 0 ? void 0 : _c.loadJs) !== null && _d !== void 0 ? _d : manifest_types_1.LoadingOptions.lazy
        }
    };
}
function shouldGenerateManifest(config) {
    return (lodash_1.get(config, 'manifest.generate', false) &&
        (config.manifest.generate === true || config.manifest.generate === manifest_types_1.GenerateOptions.true));
}
function createManifest() {
    return (tree) => {
        const manifestPath = `./dist/apps/shell/${utils_1.getLibraryName(tree)}.json`;
        try {
            const config = workspace_1.readJsonInTree(tree, './package.json').config;
            if (shouldGenerateManifest(config)) {
                const generatedManifest = {
                    viewComponents: getAllViewComponentTypes(tree),
                    viewActions: getAllViewActionNames(tree),
                    applicationInitializers: getAllApplicationInitializerIds(tree),
                    options: {
                        loadCss: config.manifest.loadCss,
                        loadJs: config.manifest.loadJs
                    }
                };
                const manifest = normalizeManifest(generatedManifest);
                if (tree.exists(manifestPath)) {
                    tree.overwrite(manifestPath, JSON.stringify(manifest, null, 2));
                }
                else {
                    tree.create(manifestPath, JSON.stringify(manifest, null, 2));
                }
            }
            else {
                if (tree.exists(manifestPath)) {
                    tree.delete(manifestPath);
                }
            }
        }
        catch (error) {
            throw new schematics_1.SchematicsException(`Problem generating the manifest :${error}`);
        }
    };
}
function generateManifest() {
    return schematics_1.chain([
        createManifest()
    ]);
}
exports.generateManifest = generateManifest;
