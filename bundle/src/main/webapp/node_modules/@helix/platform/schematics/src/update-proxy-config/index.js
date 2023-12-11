"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProxyConfig = void 0;
const prettier_1 = require("prettier");
function updateProxyConfig() {
    return (tree) => {
        const targetProxyConf = './proxy.conf.js';
        const sourceTemplate = `
    const apiHost = process.env.npm_config_apihost || 'localhost';

    module.exports = [
      {
        context: (path,req) => path.includes('/api') || path.includes('/scripts'),
        target: \`http://\${apiHost}:8008\`,
      }
    ];
    `;
        if (tree.exists(targetProxyConf)) {
            tree.overwrite(targetProxyConf, prettier_1.format(sourceTemplate));
        }
        else {
            tree.create(targetProxyConf, prettier_1.format(sourceTemplate));
        }
        return tree;
    };
}
exports.updateProxyConfig = updateProxyConfig;
