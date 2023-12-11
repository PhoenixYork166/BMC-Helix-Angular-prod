"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routingModule = exports.nxJson = exports.schematicsPackageJson = exports.packageJson = exports.schematicsAngularJson = exports.angularJson = void 0;
exports.angularJson = {
    projects: {
        shell: {
            root: 'apps/shell/',
            sourceRoot: 'apps/shell/src',
            projectType: 'application',
            prefix: '${groupId}',
            architect: {
                build: {
                    builder: 'ngx-build-plus:browser',
                    options: {
                        index: 'apps/shell/src/index.html',
                        main: 'apps/shell/src/main.ts',
                        polyfills: 'apps/shell/src/polyfills.ts',
                        tsConfig: 'apps/shell/tsconfig.app.json',
                        assets: [
                            'apps/shell/src/favicon.ico',
                            {
                                glob: '**/*',
                                input: 'node_modules/@bmc-ux/adapt-css/src/scss',
                                output: 'assets/sass/theme'
                            }
                        ],
                        stylePreprocessorOptions: {
                            includePaths: ['styles']
                        },
                        scripts: [
                            'scripts/bootstrap.js',
                            'scripts/rxjs-6.6.7/rxjs.umd.min.js',
                            'node_modules/js-md4/build/md4.min.js',
                            'node_modules/jquery/dist/jquery.js'
                        ],
                        extractLicenses: true,
                        crossOrigin: 'use-credentials'
                    },
                    configurations: {
                        production: {
                            fileReplacements: [
                                {
                                    replace: 'apps/shell/src/environments/environment.ts',
                                    with: 'apps/shell/src/environments/environment.prod.ts'
                                }
                            ],
                            optimization: true,
                            outputHashing: 'all',
                            sourceMap: true,
                            extractCss: true,
                            namedChunks: true,
                            aot: false,
                            extractLicenses: true,
                            vendorChunk: true,
                            buildOptimizer: false,
                            budgets: [
                                {
                                    type: 'initial',
                                    maximumWarning: '8mb',
                                    maximumError: '16mb'
                                }
                            ]
                        }
                    }
                },
                serve: {
                    builder: 'ngx-build-plus:dev-server',
                    options: {
                        browserTarget: 'shell:build',
                        proxyConfig: 'proxy.conf.js'
                    },
                    configurations: {
                        production: {
                            browserTarget: 'shell:build:production'
                        }
                    }
                },
                'extract-i18n': {
                    builder: '@angular-devkit/build-angular:extract-i18n',
                    options: {
                        browserTarget: 'shell:build'
                    }
                },
                lint: {
                    builder: '@angular-devkit/build-angular:tslint',
                    options: {
                        tsConfig: ['apps/shell/tsconfig.app.json', 'apps/shell/tsconfig.spec.json'],
                        exclude: ['**/node_modules/**', '!apps/shell/**']
                    }
                },
                test: {
                    builder: '@nrwl/jest:jest',
                    options: {
                        jestConfig: 'apps/shell/jest.config.js',
                        tsConfig: 'apps/shell/tsconfig.spec.json',
                        setupFile: 'apps/shell/src/test-setup.ts'
                    }
                }
            }
        },
        'shell-e2e': {
            root: 'apps/shell-e2e',
            projectType: 'application',
            prefix: '',
            architect: {
                e2e: {
                    builder: '@nrwl/cypress:cypress',
                    options: {
                        cypressConfig: 'apps/shell-e2e/cypress.json',
                        tsConfig: 'apps/shell-e2e/tsconfig.e2e.json',
                        devServerTarget: 'shell:serve'
                    },
                    configurations: {
                        production: {
                            devServerTarget: 'shell:serve:production'
                        }
                    }
                },
                lint: {
                    builder: '@angular-devkit/build-angular:tslint',
                    options: {
                        tsConfig: 'apps/shell-e2e/tsconfig.e2e.json',
                        exclude: ['**/node_modules/**', '!apps/shell-e2e/**']
                    }
                }
            }
        },
        'platform-named-list-api': {
            root: 'libs/platform/named-list/api',
            sourceRoot: 'libs/platform/named-list/api/src',
            projectType: 'library',
            prefix: 'rx',
            architect: {
                build: {
                    builder: '@angular-devkit/build-ng-packagr:build',
                    options: {
                        tsConfig: 'libs/platform/named-list/api/tsconfig.lib.json',
                        project: 'libs/platform/named-list/api/ng-package.json'
                    }
                },
                lint: {
                    builder: '@angular-devkit/build-angular:tslint',
                    options: {
                        tsConfig: [
                            'libs/platform/named-list/api/tsconfig.lib.json',
                            'libs/platform/named-list/api/tsconfig.spec.json'
                        ],
                        exclude: ['**/node_modules/**', '!libs/platform/named-list/api/**']
                    }
                },
                test: {
                    builder: '@nrwl/jest:jest',
                    options: {
                        jestConfig: 'libs/platform/named-list/api/jest.config.js',
                        tsConfig: 'libs/platform/named-list/api/tsconfig.spec.json',
                        setupFile: 'libs/platform/named-list/api/src/test-setup.ts'
                    }
                }
            },
            schematics: {
                '@nrwl/schematics:component': {
                    styleext: 'scss'
                }
            }
        },
        'platform-process-api': {
            root: 'libs/platform/process/api',
            sourceRoot: 'libs/platform/process/api/src',
            projectType: 'library',
            prefix: 'rx',
            architect: {
                build: {
                    builder: '@angular-devkit/build-ng-packagr:build',
                    options: {
                        tsConfig: 'libs/platform/process/api/tsconfig.lib.json',
                        project: 'libs/platform/process/api/ng-package.json'
                    }
                },
                lint: {
                    builder: '@angular-devkit/build-angular:tslint',
                    options: {
                        tsConfig: ['libs/platform/process/api/tsconfig.lib.json', 'libs/platform/process/api/tsconfig.spec.json'],
                        exclude: ['**/node_modules/**', '!libs/platform/process/api/**']
                    }
                },
                test: {
                    builder: '@nrwl/jest:jest',
                    options: {
                        jestConfig: 'libs/platform/process/api/jest.config.js',
                        tsConfig: 'libs/platform/process/api/tsconfig.spec.json',
                        setupFile: 'libs/platform/process/api/src/test-setup.ts'
                    }
                }
            },
            schematics: {
                '@nrwl/schematics:component': {
                    styleext: 'scss'
                }
            }
        },
        'innovation-studio': {
            root: 'libs/innovation-studio',
            sourceRoot: 'libs/innovation-studio/src',
            projectType: 'library',
            prefix: 'ax',
            architect: {
                lint: {
                    builder: '@angular-devkit/build-angular:tslint',
                    options: {
                        tsConfig: ['libs/innovation-studio/tsconfig.lib.json', 'libs/innovation-studio/tsconfig.spec.json'],
                        exclude: ['**/node_modules/**', '!libs/innovation-studio/**']
                    }
                },
                test: {
                    builder: '@nrwl/jest:jest',
                    options: {
                        jestConfig: 'libs/innovation-studio/jest.config.js',
                        tsConfig: 'libs/innovation-studio/tsconfig.spec.json',
                        setupFile: 'libs/innovation-studio/src/test-setup.ts'
                    }
                }
            },
            schematics: {
                '@nrwl/schematics:component': {
                    styleext: 'scss'
                }
            }
        }
    }
};
exports.schematicsAngularJson = {
    projects: {
        shell: {
            root: 'apps/shell/',
            sourceRoot: 'apps/shell/src',
            projectType: 'application',
            prefix: 'rx',
            schematics: {
                '@nrwl/schematics:component': {
                    style: 'scss'
                }
            },
            architect: {
                build: {
                    builder: 'ngx-build-plus:browser',
                    options: {
                        outputPath: 'dist/apps/shell',
                        baseHref: '/helix/index.html',
                        index: 'apps/shell/src/index.html',
                        main: 'apps/shell/src/main.ts',
                        polyfills: 'apps/shell/src/polyfills.ts',
                        tsConfig: 'apps/shell/tsconfig.app.json',
                        assets: [
                            'apps/shell/src/favicon.ico',
                            'apps/shell/src/assets',
                            {
                                glob: '**/*',
                                input: 'node_modules/@bmc-ux/adapt-css/src/scss',
                                output: 'assets/sass/theme'
                            },
                            {
                                glob: '**/*',
                                input: 'scripts/ckeditor-4.20.0/',
                                output: 'assets/libs/ckeditor/'
                            }
                        ],
                        styles: ['apps/shell/src/styles.scss', 'scripts/rappid-3.1.1/rappid.css'],
                        stylePreprocessorOptions: {
                            includePaths: ['styles']
                        },
                        scripts: [
                            'scripts/bootstrap.js',
                            'scripts/rxjs-6.6.7/rxjs.umd.min.js',
                            'node_modules/js-md4/build/md4.min.js',
                            'node_modules/jquery/dist/jquery.js',
                            'node_modules/lodash/lodash.js',
                            'node_modules/d3/dist/d3.js',
                            'node_modules/backbone/backbone.js',
                            'scripts/ckeditor-4.20.0/ckeditor.min.js',
                            'scripts/rappid-3.1.1/rappid.js'
                        ],
                        es5BrowserSupport: true,
                        extractLicenses: true,
                        crossOrigin: 'use-credentials'
                    },
                    configurations: {
                        production: {
                            fileReplacements: [
                                {
                                    replace: 'apps/shell/src/environments/environment.ts',
                                    with: 'apps/shell/src/environments/environment.prod.ts'
                                }
                            ],
                            optimization: false,
                            outputHashing: 'none',
                            sourceMap: true,
                            extractCss: true,
                            namedChunks: true,
                            aot: false,
                            extractLicenses: true,
                            vendorChunk: true,
                            buildOptimizer: false,
                            budgets: [
                                {
                                    type: 'initial',
                                    maximumWarning: '8mb',
                                    maximumError: '16mb'
                                }
                            ]
                        }
                    }
                },
                serve: {
                    builder: 'ngx-build-plus:dev-server',
                    options: {
                        browserTarget: 'shell:build',
                        proxyConfig: 'proxy.conf.js'
                    },
                    configurations: {
                        production: {
                            browserTarget: 'shell:build:production'
                        }
                    }
                },
                'extract-i18n': {
                    builder: '@angular-devkit/build-angular:extract-i18n',
                    options: {
                        browserTarget: 'shell:build'
                    }
                },
                lint: {
                    builder: '@angular-devkit/build-angular:tslint',
                    options: {
                        tsConfig: ['apps/shell/tsconfig.app.json', 'apps/shell/tsconfig.spec.json'],
                        exclude: ['**/node_modules/**', '!apps/shell/**']
                    }
                },
                test: {
                    builder: '@nrwl/jest:jest',
                    options: {
                        jestConfig: 'apps/shell/jest.config.js',
                        tsConfig: 'apps/shell/tsconfig.spec.json',
                        setupFile: 'apps/shell/src/test-setup.ts'
                    }
                }
            }
        },
        'shell-e2e': {
            root: 'apps/shell-e2e',
            projectType: 'application',
            prefix: '',
            architect: {
                e2e: {
                    builder: '@nrwl/cypress:cypress',
                    options: {
                        cypressConfig: 'apps/shell-e2e/cypress.json',
                        tsConfig: 'apps/shell-e2e/tsconfig.e2e.json',
                        devServerTarget: 'shell:serve'
                    },
                    configurations: {
                        production: {
                            devServerTarget: 'shell:serve:production'
                        }
                    }
                },
                lint: {
                    builder: '@angular-devkit/build-angular:tslint',
                    options: {
                        tsConfig: 'apps/shell-e2e/tsconfig.e2e.json',
                        exclude: ['**/node_modules/**', '!apps/shell-e2e/**']
                    }
                }
            }
        }
    }
};
exports.packageJson = {
    name: 'com.example.application-testing1',
    version: '1.0.0',
    description: 'application testing1',
    main: 'Index.html',
    groupId: 'com.example',
    artifactId: 'application-testing1',
    bundleName: 'com.example.application-testing1',
    keywords: ['application testing1', 'BMC Software Inc.'],
    author: 'BMC Software Inc.',
    license: 'Commercial',
    devDependencies: {
        '@angular-devkit/build-angular': '^0.803.3',
        '@angular-devkit/build-ng-packagr': '~0.803.3',
        '@angular/cli': '8.3.3',
        '@angular/compiler-cli': '~8.2.2',
        '@angular/language-service': '^8.2.2',
        '@ngrx/store-devtools': '8.6.0'
    }
};
exports.schematicsPackageJson = {
    dependencies: {
        '@angular/animations': '9.2.14',
        '@angular/cdk': '8.2.3',
        '@angular/common': '9.2.14',
        '@angular/compiler': '8.2.14',
        '@angular/core': '8.2.14',
        '@angular/forms': '8.2.14',
        rxjs: '6.5.4'
    },
    devDependencies: {
        '@angular-devkit/build-angular': '^0.803.3',
        '@angular-devkit/build-ng-packagr': '~0.803.3',
        '@angular/cli': '9.3.3',
        '@angular/compiler-cli': '~8.2.2',
        '@angular/language-service': '^8.2.2',
        '@ngrx/store-devtools': '8.6.0',
        '@nrwl/angular': '8.9.0',
        '@nrwl/cypress': '8.9.0'
    }
};
exports.nxJson = {
    npmScope: 'helix',
    implicitDependencies: {
        'angular.json': '*',
        'package.json': '*',
        'tsconfig.json': '*',
        'tslint.json': '*',
        'nx.json': '*'
    },
    projects: {
        'innovation-studio': {
            tags: ['feature:lazy']
        },
        'platform-view-designer': {
            tags: ['feature:lazy']
        },
        shell: {
            tags: ['app']
        },
        'shell-e2e': {
            tags: []
        },
        'platform-view-api': {
            tags: ['platform:feature:api']
        },
        'platform-view-components': {
            tags: ['platform:feature:shared']
        },
        'platform-shared-api': {
            tags: ['platform:feature:shared-api']
        },
        'platform-security-api': {
            tags: ['platform:feature:api']
        },
        'platform-utils': {
            tags: ['shared']
        },
        'platform-ui-kit': {
            tags: ['shared']
        },
        'platform-security-login': {
            tags: ['feature:lazy']
        },
        'platform-named-list-api': {
            tags: ['platform:feature:api']
        },
        'platform-process-api': {
            tags: ['platform:feature:api']
        },
        'platform-association-api': {
            tags: ['platform:feature:api']
        },
        'platform-record-api': {
            tags: ['platform:feature:api']
        },
        'platform-view-actions': {
            tags: ['feature:shared']
        },
        'platform-shared-components': {
            tags: ['feature:shared']
        },
        'platform-view-runtime': {
            tags: ['feature:shared']
        },
        'platform-view-designer-page': {
            tags: ['feature:lazy']
        },
        'platform-view-runtime-page': {
            tags: ['feature:lazy']
        },
        'platform-process-components': {
            tags: ['platform:feature:shared']
        },
        'platform-process-elements': {
            tags: ['platform:feature:shared']
        }
    }
};
exports.routingModule = `import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(
      []
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

`;
