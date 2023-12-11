"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runExternalSchematic = exports.readJsonInTree = exports.createWorkspace = exports.runSchematic = exports.createEmptyWorkSpace = exports.testRunner = void 0;
const path_1 = require("path");
const testing_1 = require("@angular-devkit/schematics/testing");
const mockData_1 = require("./mockData");
exports.testRunner = new testing_1.SchematicTestRunner('schematics', path_1.join(__dirname, '../collection.json'));
function createEmptyWorkSpace(tree) {
    tree.create('/angular.json', JSON.stringify({ version: 1, projects: {}, newProjectRoot: '' }));
    tree.create('/package.json', JSON.stringify({
        name: 'test-name',
        dependencies: {},
        devDependencies: {}
    }));
    tree.create('/nx.json', JSON.stringify({ npmScope: 'helix', projects: {} }));
    return tree;
}
exports.createEmptyWorkSpace = createEmptyWorkSpace;
function runSchematic(schematicName, options, tree) {
    return exports.testRunner.runSchematicAsync(schematicName, options, tree).toPromise();
}
exports.runSchematic = runSchematic;
function createWorkspace(tree) {
    tree.create('/angular.json', JSON.stringify(mockData_1.angularJson));
    tree.create('tools/rx-libs/schematics/src/config/angular.json', JSON.stringify(mockData_1.schematicsAngularJson));
    tree.create('/package.json', JSON.stringify(mockData_1.packageJson));
    tree.create('tools/rx-libs/schematics/src/config/package.json', JSON.stringify(mockData_1.schematicsPackageJson));
    tree.create('./apps/shell/src/app/app-routing.module.ts', mockData_1.routingModule);
    tree.create('nx.json', JSON.stringify(mockData_1.nxJson));
    return tree;
}
exports.createWorkspace = createWorkspace;
function readJsonInTree(host, path) {
    const contents = host.read(path).toString('utf-8');
    return JSON.parse(contents);
}
exports.readJsonInTree = readJsonInTree;
function runExternalSchematic(collectionName, schematicName, options, tree) {
    return exports.testRunner.runExternalSchematicAsync(collectionName, schematicName, options, tree).toPromise();
}
exports.runExternalSchematic = runExternalSchematic;
