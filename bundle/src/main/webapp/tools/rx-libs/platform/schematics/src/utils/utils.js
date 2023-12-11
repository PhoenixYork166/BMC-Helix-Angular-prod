"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._addConstructorParam = exports.addOrUpdateVersion = exports.shouldCopySdkArtefacts = exports.cleanUp = exports.copy = exports.addConstructorParamsToLibraryModule = exports.insertAsteriskImportToLibraryModule = exports.insertImportToLibraryModule = exports.addLibraryModuleToAppModule = exports.getArtifactId = exports.getBundleId = exports.getLibraryName = exports.addViewComponentRegistrationModule = void 0;
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const schematics_1 = require("@angular-devkit/schematics");
const ast_utils_1 = require("@nrwl/angular/src/utils/ast-utils");
const workspace_1 = require("@nrwl/workspace");
const ast_utils_2 = require("@nrwl/workspace/src/utils/ast-utils");
const typescript_1 = require("@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript");
const ast_utils_3 = require("@schematics/angular/utility/ast-utils");
const fs_1 = require("fs");
const path_1 = require("path");
const ts = require("typescript");
const RX_SDK_HOME = process.env.RX_SDK_HOME;
const rxLibsPath = './tools/rx-libs';
const appsPath = './apps';
function addViewComponentRegistrationModule(schema) {
    return schematics_1.chain([
        insertModule(schema.viewComponentName, schema.libraryName, 'registration')
    ]);
}
exports.addViewComponentRegistrationModule = addViewComponentRegistrationModule;
function insertModule(viewComponentName, libraryName, moduleType) {
    return (tree) => {
        const libraryModulePath = './libs/' + libraryName + '/src/lib/' + libraryName + '.module.ts';
        const read = tree.read(libraryModulePath);
        const moduleSource = read ? read.toString('utf-8') : '';
        const libraryModuleSource = typescript_1.createSourceFile(libraryModulePath, moduleSource, typescript_1.ScriptTarget.Latest, true);
        let viewComponentModuleName = strings_1.classify(viewComponentName);
        let viewComponentFileName = strings_1.dasherize(viewComponentName);
        if (moduleType === 'registration') {
            viewComponentModuleName += 'Registration';
            viewComponentFileName += '-registration';
        }
        viewComponentModuleName += 'Module';
        viewComponentFileName += '.module';
        const viewComponentModulePath = `./view-components/${viewComponentName}/${viewComponentFileName}`;
        const declarationChanges = ast_utils_3.addImportToModule(libraryModuleSource, libraryModulePath, viewComponentModuleName, viewComponentModulePath);
        const declarationRecorder = tree.beginUpdate(libraryModulePath);
        for (const change of declarationChanges) {
            if (change instanceof ast_utils_2.InsertChange) {
                declarationRecorder.insertLeft(change.pos, change.toAdd);
            }
        }
        tree.commitUpdate(declarationRecorder);
        return tree;
    };
}
function getLibraryName(tree) {
    return ast_utils_2.readJsonInTree(tree, './package.json').bundleName.split('.').join('-');
}
exports.getLibraryName = getLibraryName;
function getBundleId(tree) {
    return ast_utils_2.readJsonInTree(tree, './package.json').bundleName;
}
exports.getBundleId = getBundleId;
function getArtifactId(tree) {
    return ast_utils_2.readJsonInTree(tree, './package.json').artifactId;
}
exports.getArtifactId = getArtifactId;
function addLibraryModuleToAppModule(importModuleName, importModulePath) {
    return _insertImport('./apps/shell/src/app/app.module.ts', importModuleName, importModulePath, true);
}
exports.addLibraryModuleToAppModule = addLibraryModuleToAppModule;
function insertImportToLibraryModule(addImportToPath, importModuleName, importModulePath, addToImportArr = false) {
    return _insertImport(addImportToPath, importModuleName, importModulePath, addToImportArr);
}
exports.insertImportToLibraryModule = insertImportToLibraryModule;
function insertAsteriskImportToLibraryModule(rxBundleInfo, importAs, importFromPath) {
    return (host) => {
        const read = host.read(rxBundleInfo.libraryModulePath);
        const moduleSource = read ? read.toString('utf-8') : '';
        const updateModuleSource = ts.createSourceFile(rxBundleInfo.libraryModulePath, moduleSource, ts.ScriptTarget.Latest, true);
        workspace_1.insert(host, rxBundleInfo.libraryModulePath, [
            _insertAsteriskImport(updateModuleSource, rxBundleInfo.libraryModulePath, importAs, importFromPath)
        ]);
        return host;
    };
}
exports.insertAsteriskImportToLibraryModule = insertAsteriskImportToLibraryModule;
function addConstructorParamsToLibraryModule(rxBundleInfo) {
    return (host) => {
        const read = host.read(rxBundleInfo.libraryModulePath);
        const moduleSource = read ? read.toString('utf-8') : '';
        const libraryModuleSource = ts.createSourceFile(rxBundleInfo.libraryModulePath, moduleSource, ts.ScriptTarget.Latest, true);
        const constructorParams = 'private rxLocalizationService: RxLocalizationService';
        const constructorBody = `this.rxLocalizationService.setDefaultApplicationStrings(defaultApplicationStrings["default"]);`;
        workspace_1.insert(host, rxBundleInfo.libraryModulePath, _addConstructorParam(libraryModuleSource, rxBundleInfo.libraryModulePath, {
            className: rxBundleInfo.moduleName,
            param: constructorParams,
            body: constructorBody
        }));
        return host;
    };
}
exports.addConstructorParamsToLibraryModule = addConstructorParamsToLibraryModule;
function copy(directoryName) {
    return (tree, context) => {
        switch (directoryName) {
            case 'shell':
                _copyDirectory(path_1.join(RX_SDK_HOME, '/client/target/web-build/webapp/dist/apps/shell-src/shell'), path_1.join(appsPath, 'shell'), directoryName);
                break;
            case 'styles':
                _copyDirectory(path_1.join(RX_SDK_HOME, '/client/target/web-build/webapp/dist/styles/'), path_1.join(appsPath, '../styles'), directoryName);
                break;
            case 'scripts':
                _copyDirectory(path_1.join(RX_SDK_HOME, '/client/target/web-build/webapp/dist/scripts/'), path_1.join(appsPath, '../scripts'), directoryName);
                break;
            case 'package':
                context.logger.info('Copying package.json from Helix Platform workspace.');
                _copyDirectory(path_1.resolve('../../../../package.json'), 'src/config/package.json', directoryName);
                break;
            case 'angular':
                context.logger.info('Copying angular.json from Helix Platform workspace.');
                _copyDirectory(path_1.resolve('../../../../angular.json'), 'src/config/angular.json', directoryName);
                break;
            case 'webpack':
                context.logger.info('Copying webpack.config.js from Helix Platform workspace.');
                _copyDirectory(path_1.resolve('../../../../webpack.config.js'), 'src/config/webpack.config.js', directoryName);
                break;
            case 'schematicsSrc':
                context.logger.info('Copying Schematics files to platform-ui build.');
                _copyDirectory('src', path_1.join(path_1.resolve('../../../../'), '/dist/libs/platform/schematics/src'), directoryName);
                break;
            case 'schematicsPackage':
                context.logger.info('Copying Schematics package.json to platform-ui build.');
                _copyDirectory('package.json', path_1.join(path_1.resolve('../../../../'), '/dist/libs/platform/schematics/package.json'), directoryName);
                break;
        }
        return tree;
    };
}
exports.copy = copy;
function cleanUp(directoryName) {
    return (tree) => {
        switch (directoryName) {
            case 'shell':
                _removeDirectory(path_1.join(appsPath, 'shell'));
                break;
            case 'styles':
                _removeDirectory(path_1.join(appsPath, '../styles'));
                break;
            case 'scripts':
                _removeDirectory(path_1.join(appsPath, '../scripts'));
                break;
        }
        return tree;
    };
}
exports.cleanUp = cleanUp;
function shouldCopySdkArtefacts() {
    let source;
    let target;
    let result = false;
    if (fs_1.existsSync(path_1.join(rxLibsPath, '/version.properties'))) {
        source = fs_1.readFileSync(path_1.join(RX_SDK_HOME, '/version.properties'));
        target = fs_1.readFileSync(path_1.join(rxLibsPath, '/version.properties'));
        result = source.equals(target);
    }
    return result;
}
exports.shouldCopySdkArtefacts = shouldCopySdkArtefacts;
function addOrUpdateVersion() {
    return (tree) => {
        fs_1.copyFileSync(path_1.join(RX_SDK_HOME, 'version.properties'), path_1.join(rxLibsPath, '/version.properties'));
        return tree;
    };
}
exports.addOrUpdateVersion = addOrUpdateVersion;
function _removeDirectory(path) {
    if (fs_1.existsSync(path)) {
        fs_1.rmdirSync(path, { recursive: true });
    }
}
function _copyDirectory(source, target, directoryName) {
    const isSourceDirectory = fs_1.existsSync(source) && fs_1.statSync(source).isDirectory();
    if (isSourceDirectory) {
        if (!fs_1.existsSync(target)) {
            fs_1.mkdirSync(target, { recursive: true });
        }
        switch (directoryName) {
            case 'schematicsSrc':
                fs_1.readdirSync(source).forEach(function (fileName) {
                    if (!fileName.includes('.ts') && !fileName.includes('_spec.js')) {
                        _copyDirectory(path_1.join(source, fileName), path_1.join(target, fileName), directoryName);
                    }
                    else if (fileName.includes('ts.template')) {
                        _copyDirectory(path_1.join(source, fileName), path_1.join(target, fileName), directoryName);
                    }
                });
                break;
            default:
                fs_1.readdirSync(source).forEach(function (fileName) {
                    _copyDirectory(path_1.join(source, fileName), path_1.join(target, fileName), directoryName);
                });
        }
    }
    else {
        fs_1.copyFileSync(source, target);
    }
}
function _insertAsteriskImport(source, modulePath, symbolName, importFromFileName) {
    const rootNode = source;
    const allImports = ast_utils_2.findNodes(rootNode, ts.SyntaxKind.ImportDeclaration);
    const useStrict = ast_utils_2.findNodes(rootNode, ts.SyntaxKind.StringLiteral).filter((n) => n.text === 'use strict');
    let fallbackPos = 0;
    if (useStrict.length > 0) {
        fallbackPos = useStrict[0].end;
    }
    const importsAsterisk = '* as ';
    const shouldInsertAtBeginning = allImports.length === 0 && useStrict.length === 0;
    const separator = shouldInsertAtBeginning ? '' : ';\n';
    const importStatement = `${separator}import ${importsAsterisk}${symbolName}` +
        ` from '${importFromFileName}'${shouldInsertAtBeginning ? ';\n' : ''}`;
    return _insertAfterLastOccurrence(allImports, importStatement, modulePath, fallbackPos, ts.SyntaxKind.StringLiteral);
}
function _insertAfterLastOccurrence(nodes, importStatement, file, fallbackPos, syntaxKind) {
    let lastItem = nodes.sort(_sortNodesByPosition).pop();
    if (!lastItem) {
        throw new schematics_1.SchematicsException();
    }
    if (syntaxKind) {
        lastItem = ast_utils_2.findNodes(lastItem, syntaxKind).sort(_sortNodesByPosition).pop();
    }
    if (!lastItem && fallbackPos === undefined) {
        throw new schematics_1.SchematicsException(`Unable to insert import: tried to insert ${importStatement} as first occurrence with no fallback position`);
    }
    const lastItemPosition = lastItem ? lastItem.getEnd() : fallbackPos;
    return new ast_utils_2.InsertChange(file, lastItemPosition, importStatement);
}
function _sortNodesByPosition(first, second) {
    return first.getStart() - second.getStart();
}
function _addConstructorParam(source, modulePath, opts) {
    const clazz = ast_utils_2.findClass(source, opts.className);
    const constructor = clazz.members.filter((m) => m.kind === ts.SyntaxKind.Constructor)[0];
    if (constructor) {
        throw new schematics_1.SchematicsException('Constructor already exists.');
    }
    else {
        const methodHeader = `constructor(${opts.param})`;
        return workspace_1.addMethod(source, modulePath, {
            className: opts.className,
            methodHeader,
            body: opts.body
        });
    }
}
exports._addConstructorParam = _addConstructorParam;
function _insertImport(addImportToPath, importModuleName, importModulePath, addToImportArr) {
    return (tree) => {
        const read = tree.read(addImportToPath);
        const shellDevModuleSource = read ? read.toString('utf-8') : '';
        const shellModuleSource = ts.createSourceFile(addImportToPath, shellDevModuleSource, ts.ScriptTarget.Latest, true);
        if (addToImportArr) {
            workspace_1.insert(tree, addImportToPath, [
                ast_utils_2.insertImport(shellModuleSource, addImportToPath, importModuleName, importModulePath),
                ...ast_utils_1.addImportToModule(shellModuleSource, addImportToPath, importModuleName)
            ]);
        }
        else {
            workspace_1.insert(tree, addImportToPath, [
                ast_utils_2.insertImport(shellModuleSource, addImportToPath, importModuleName, importModulePath)
            ]);
        }
        return tree;
    };
}
