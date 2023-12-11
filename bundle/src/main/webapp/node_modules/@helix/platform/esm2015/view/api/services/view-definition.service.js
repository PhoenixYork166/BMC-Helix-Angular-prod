import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RX_BUNDLE, RxCommandFactoryService, RxLocalizationService } from '@helix/platform/shared/api';
import { RxGuidService } from '@helix/platform/utils';
import { RX_VIEW_DEFINITION } from '../domain/view-definition.constant';
import { RxViewDefinitionLocalizationService } from './view-definition-localization.service';
import { RxViewComponentType } from '../domain/view-component.types';
import { RxViewLayout } from '../layout/view-layout.class';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "./view-definition-localization.service";
export const renameViewDefinitionCommand = 'com.bmc.arsys.rx.application.view.command.RenameViewDefinitionCommand';
export const revertCustomizationResourceType = 'com.bmc.arsys.rx.application.view.command.RevertViewDefinitionCommand';
export class RxViewDefinitionService {
    constructor(httpClient, rxGuidService, rxCommandFactoryService, rxViewDefinitionLocalizationService, rxLocalizationService) {
        this.httpClient = httpClient;
        this.rxGuidService = rxGuidService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxViewDefinitionLocalizationService = rxViewDefinitionLocalizationService;
        this.rxLocalizationService = rxLocalizationService;
        this.renameCommand = rxCommandFactoryService.forResourceType(renameViewDefinitionCommand);
        this.revertCustomizationCommand = rxCommandFactoryService.forResourceType(revertCustomizationResourceType);
    }
    get(viewDefinitionName, options) {
        const defaultOptions = { params: { locale: this.rxLocalizationService.currentLocale } };
        return this.httpClient
            .get(this.getUrl(viewDefinitionName), Object.assign(Object.assign({}, defaultOptions), options))
            .pipe(map((viewDefinition) => this.rxViewDefinitionLocalizationService.applyLocalization(viewDefinition)));
    }
    getNew(layoutTemplate) {
        return of(this.getNewViewDefinition.call(this, layoutTemplate));
    }
    create(viewDefinition) {
        return this.httpClient.post(this.getUrl(), viewDefinition, { responseType: 'text', observe: 'response' });
    }
    update(viewDefinitionName, viewDefinition, options) {
        return this.httpClient.put(this.getUrl(viewDefinitionName), viewDefinition, options);
    }
    delete(viewDefinitionName) {
        return this.httpClient.delete(this.getUrl(viewDefinitionName));
    }
    rename(oldViewDefinitionName, newViewDefinitionName) {
        return this.renameCommand.execute({
            name: oldViewDefinitionName,
            newName: newViewDefinitionName
        });
    }
    isPageView(viewDefinition) {
        return (viewDefinition.componentDefinitions.length === 1 &&
            viewDefinition.componentDefinitions[0].type === RxViewComponentType.Page);
    }
    revertCustomization(viewDefinitionName) {
        return this.revertCustomizationCommand.execute({ viewDefinitionName });
    }
    getUrl(viewDefinitionName) {
        return viewDefinitionName
            ? `/api/rx/application/view/viewdefinition/${encodeURIComponent(viewDefinitionName)}`
            : '/api/rx/application/view/viewdefinition';
    }
    getNewViewDefinition(layoutTemplate = RX_VIEW_DEFINITION.defaultLayoutTemplateId) {
        return {
            guid: this.rxGuidService.generate(),
            name: null,
            description: null,
            componentDefinitions: [],
            inputParams: [],
            outputParams: [],
            allowOverlay: false,
            layout: JSON.stringify(RxViewLayout.getViewLayoutTemplate(layoutTemplate)),
            permissions: [
                {
                    ownerId: {
                        value: 0,
                        name: 'Public',
                        type: 'GROUP'
                    },
                    type: 'VISIBLE'
                }
            ],
            type: RX_VIEW_DEFINITION.types.regular,
            scope: RX_BUNDLE.definitionScopeTypes.bundle,
            targetViewDefinitionName: null,
            targetExtensionContainerGuid: null,
            styles: null
        };
    }
}
RxViewDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionService, deps: [{ token: i1.HttpClient }, { token: i2.RxGuidService }, { token: i3.RxCommandFactoryService }, { token: i4.RxViewDefinitionLocalizationService }, { token: i3.RxLocalizationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.RxGuidService }, { type: i3.RxCommandFactoryService }, { type: i4.RxViewDefinitionLocalizationService }, { type: i3.RxLocalizationService }]; } });
//# sourceMappingURL=view-definition.service.js.map