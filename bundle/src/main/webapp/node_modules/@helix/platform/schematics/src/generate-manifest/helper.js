"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecoratorMetadata = exports.getFilePaths = exports.getSourceFile = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const typescript_1 = require("@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript");
const fs_1 = require("fs");
const path_1 = require("path");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
function getSourceFile(host, path) {
    const fileSourceCode = host.read(path);
    if (fileSourceCode === null) {
        throw new schematics_1.SchematicsException(`File ${path} does not exist.`);
    }
    const sourceText = fileSourceCode.toString('utf-8');
    return typescript_1.createSourceFile(path, sourceText, typescript_1.ScriptTarget.Latest, true);
}
exports.getSourceFile = getSourceFile;
function getFilePaths(directory, fileNameMatch, files) {
    const filesInDirectory = fs_1.readdirSync(directory);
    for (const file of filesInDirectory) {
        const absolutePath = path_1.join(directory, file);
        if (fs_1.statSync(absolutePath).isDirectory()) {
            getFilePaths(absolutePath, fileNameMatch, files);
        }
        else if (file.includes(fileNameMatch)) {
            files.push(path_1.join('libs', absolutePath.split('libs')[1]));
        }
    }
    return files;
}
exports.getFilePaths = getFilePaths;
function getDecoratorMetadata(source, identifier) {
    return ast_utils_1.getSourceNodes(source)
        .filter((node) => node.kind == typescript_1.SyntaxKind.Decorator && node.expression.kind == typescript_1.SyntaxKind.CallExpression)
        .map((node) => node.expression)
        .filter((expr) => {
        if (expr.expression.kind == typescript_1.SyntaxKind.Identifier) {
            const id = expr.expression;
            return id.text == identifier;
        }
        return false;
    })
        .filter((expr) => expr.arguments[0] && expr.arguments[0].kind == typescript_1.SyntaxKind.ObjectLiteralExpression)
        .map((expr) => expr.arguments[0]);
}
exports.getDecoratorMetadata = getDecoratorMetadata;
