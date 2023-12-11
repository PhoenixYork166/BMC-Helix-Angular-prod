"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MANIFEST = void 0;
exports.MANIFEST = {
    directory: {
        defaultViewAction: '/lib/actions',
        defaultViewComponent: '/lib/view-components'
    },
    extension: {
        component: '.component.ts',
        service: '.service.ts',
        appInitializer: '-initializer.service.ts'
    },
    property: {
        elementName: 'name',
        applicationInitializer: 'applicationId'
    },
    decorator: {
        viewComponent: 'RxViewComponent',
        viewAction: 'RxViewAction',
        applicationInitializer: 'RxApplicationInitializer'
    }
};
