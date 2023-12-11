"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RxBundleInfo = void 0;
const workspace_1 = require("@nrwl/workspace");
class RxBundleInfo {
    constructor(bundlePackage) {
        this.groupId = bundlePackage.groupId;
        this.artifactId = bundlePackage.artifactId;
        this.bundleId = bundlePackage.bundleName;
        this.bundleFriendlyName = bundlePackage.description;
        this.directory = bundlePackage.bundleName.replace(/\./g, '/');
        this.dasherizedBundleName = bundlePackage.bundleName.replace(/\./g, '-');
        this.libraryName = this.dasherizedBundleName;
        this.libraryRootPath = './libs/' + this.libraryName;
        this.libraryModulePath = this.libraryRootPath + '/src/lib/' + this.libraryName + '.module.ts';
        this.fileName = `${workspace_1.toFileName(this.libraryName)}`;
        this.moduleName = `${workspace_1.toClassName(this.fileName)}Module`;
    }
}
exports.RxBundleInfo = RxBundleInfo;
