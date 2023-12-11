"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBootstrapConfig = void 0;
function updateBootstrapConfig() {
    return (tree) => {
        const targetBootstrap = './apps/shell/src/main.ts';
        const sourceTemplate = `
    import { enableProdMode } from '@angular/core';
    import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
    import { environment } from './environments/environment';
    import { AppModule } from './app/app.module';
    import { AppModule as AppModuleProd } from './app/app.module.prod';

    if (environment.production) {
      enableProdMode();
    }

    if (environment['bundleId'] === '') {
        platformBrowserDynamic()
          .bootstrapModule(AppModuleProd)
          .catch((err) => console.error(err));
    } else {
        platformBrowserDynamic()
          .bootstrapModule(AppModule)
          .catch((err) => console.error(err));
    }`;
        if (tree.exists(targetBootstrap)) {
            tree.overwrite(targetBootstrap, sourceTemplate);
        }
        else {
            tree.create(targetBootstrap, sourceTemplate);
        }
        return tree;
    };
}
exports.updateBootstrapConfig = updateBootstrapConfig;
