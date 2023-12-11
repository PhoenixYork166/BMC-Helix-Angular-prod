"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkspace = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const update_package_json_1 = require("../update-package-json");
const update_angular_json_1 = require("../update-angular-json");
const update_routing_module_1 = require("../update-routing-module");
const utils_1 = require("../utils/utils");
const create_app_module_prod_1 = require("../create-app-module-prod");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const add_style_1 = require("../add-style");
const update_proxy_config_1 = require("../update-proxy-config");
const update_webpack_config_1 = require("../update-webpack-config");
const workspace_1 = require("@nrwl/workspace");
const update_environment_config_1 = require("../update-environment-config");
const update_bootstrap_config_1 = require("../update-bootstrap-config");
const update_preinstall_1 = require("../update-preinstall");
function createWorkspace() {
    return schematics_1.chain([
        utils_1.copy('shell'),
        utils_1.copy('styles'),
        update_angular_json_1.updateAngularJson(),
        add_style_1.addStyle(),
        update_package_json_1.updatePackageJson(),
        update_routing_module_1.updateRoutingModule(),
        create_app_module_prod_1.createAppModuleProd(),
        utils_1.addOrUpdateVersion(),
        update_proxy_config_1.updateProxyConfig(),
        update_webpack_config_1.updateWebpackConfig(),
        update_preinstall_1.updatePreinstall(),
        update_environment_config_1.updateEnvironmentConfig(),
        update_bootstrap_config_1.updateBootstrapConfig(),
        workspace_1.formatFiles(),
        (_tree, context) => {
            context.addTask(new tasks_1.NodePackageInstallTask({ packageManager: 'yarn' }));
            context.addTask(new tasks_1.RunSchematicTask('@helix/schematics', 'create-new', {
                libraryName: utils_1.getLibraryName(_tree)
            }));
        }
    ]);
}
exports.createWorkspace = createWorkspace;
