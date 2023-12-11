import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxWizardService } from '@helix/platform/shared/components';
import { TranslateService } from '@ngx-translate/core';
import { FieldSelectionStepComponent } from './field-selection-step/field-selection-step.component';
import { JoinCriteriaStepComponent } from './join-criteria-step/join-criteria-step.component';
import { RecordDefinitionsStepComponent } from './record-definitions-step/record-definitions-step.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/components";
import * as i2 from "@ngx-translate/core";
export class JoinRecordWizardService {
    constructor(rxWizardService, translateService, componentFactoryResolver) {
        this.rxWizardService = rxWizardService;
        this.translateService = translateService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.title = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.title');
        this.finishButtonLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.save.label');
    }
    open() {
        const wizardConfig = {
            title: this.title,
            allowFinish: true,
            finishButtonLabel: this.finishButtonLabel,
            steps: [
                {
                    id: 'record-definitions',
                    name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.record-definitions.title'),
                    componentFactory: this.componentFactoryResolver.resolveComponentFactory(RecordDefinitionsStepComponent)
                },
                {
                    id: 'join-criteria',
                    name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.title'),
                    componentFactory: this.componentFactoryResolver.resolveComponentFactory(JoinCriteriaStepComponent)
                },
                {
                    id: 'field-selection',
                    name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.field-selection.title'),
                    componentFactory: this.componentFactoryResolver.resolveComponentFactory(FieldSelectionStepComponent)
                }
            ]
        };
        return this.rxWizardService
            .open({
            context: {},
            options: wizardConfig
        })
            .then((context) => {
            if (context) {
                return {
                    primaryRecordDefinitionName: context.primaryRecordDefinitionName,
                    secondaryRecordDefinitionName: context.secondaryRecordDefinitionName,
                    joinCriteria: context.joinCriteria,
                    joinType: context.joinType,
                    resourceType: RX_RECORD_DEFINITION.recordDefinitionTypes.join.recordDefinitionType,
                    fieldDefinitions: context.selectedFields
                };
            }
            else {
                return null;
            }
        });
    }
}
/** @nocollapse */ JoinRecordWizardService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JoinRecordWizardService, deps: [{ token: i1.RxWizardService }, { token: i2.TranslateService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ JoinRecordWizardService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JoinRecordWizardService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JoinRecordWizardService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxWizardService }, { type: i2.TranslateService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=join-record-wizard.service.js.map