import * as i0 from '@angular/core';
import { Injectable } from '@angular/core';
import * as i2 from '@helix/platform/shared/api';
import { DataPage, RX_BUNDLE } from '@helix/platform/shared/api';
import * as i1 from '@angular/common/http';
import { of } from 'rxjs';

class RxDocumentDefinitionDataPageService extends DataPage {
    constructor(injector) {
        super(injector, 'com.bmc.arsys.rx.application.document.datapage.DocumentDefinitionDataPageQuery');
        this.injector = injector;
    }
}
RxDocumentDefinitionDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDocumentDefinitionDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxDocumentDefinitionDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDocumentDefinitionDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDocumentDefinitionDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxDocumentDefinitionService {
    constructor(httpClient, rxCommandFactoryService) {
        this.httpClient = httpClient;
        this.rxCommandFactoryService = rxCommandFactoryService;
    }
    get(documentDefinitionName, options) {
        return this.httpClient.get(this.getUrl(documentDefinitionName), options);
    }
    getNew() {
        return of({
            allowOverlay: false,
            documentSchema: null,
            name: null,
            scope: RX_BUNDLE.definitionScopeTypes.bundle
        });
    }
    create(documentDefinition) {
        return this.httpClient.post(this.getUrl(), documentDefinition, { observe: 'response' });
    }
    update(documentDefinition, options) {
        return this.httpClient.put(this.getUrl(documentDefinition.name), documentDefinition, options);
    }
    delete(documentDefinitionName) {
        return this.httpClient.delete(this.getUrl(documentDefinitionName));
    }
    revertCustomization(documentDefinitionName) {
        const revertCustomizationCommand = this.rxCommandFactoryService.forResourceType('com.bmc.arsys.rx.application.document.command.RevertDocumentDefinitionCommand');
        return revertCustomizationCommand.execute({ documentDefinitionName });
    }
    rename(oldDocumentDefinitionName, newDocumentDefinitionName) {
        const renameCommand = this.rxCommandFactoryService.forResourceType('com.bmc.arsys.rx.application.document.command.RenameDocumentDefinitionCommand');
        return renameCommand.execute({
            name: oldDocumentDefinitionName,
            newName: newDocumentDefinitionName
        });
    }
    getUrl(documentDefinitionName) {
        return documentDefinitionName
            ? `/api/rx/application/document/documentdefinition/${encodeURIComponent(documentDefinitionName)}`
            : '/api/rx/application/document/documentdefinition';
    }
}
RxDocumentDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDocumentDefinitionService, deps: [{ token: i1.HttpClient }, { token: i2.RxCommandFactoryService }], target: i0.ɵɵFactoryTarget.Injectable });
RxDocumentDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDocumentDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDocumentDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.RxCommandFactoryService }]; } });

/**
 * Generated bundle index. Do not edit.
 */

export { RxDocumentDefinitionDataPageService, RxDocumentDefinitionService };
//# sourceMappingURL=helix-platform-document-api.js.map
