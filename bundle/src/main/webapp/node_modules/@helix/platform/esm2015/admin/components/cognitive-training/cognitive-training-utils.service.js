import { Injectable } from '@angular/core';
import { MachineLearningProviderNames } from '@helix/platform/shared/api';
import { RX_COGNITIVE_TRAINING } from './cognitive-training.constant';
import * as i0 from "@angular/core";
export class RxCognitiveTrainingUtilsService {
    getDataSourceType(dataSourceHistory) {
        let dataSourceType;
        if (dataSourceHistory.fileName) {
            dataSourceType = RX_COGNITIVE_TRAINING.settings.dataSourceTypes.fileDataSource;
        }
        else if (dataSourceHistory.recordDefinitionName) {
            dataSourceType = RX_COGNITIVE_TRAINING.settings.dataSourceTypes.innovationSuiteDataSource;
        }
        return dataSourceType;
    }
    getTrainingLocales(trainingTypeValue) {
        let result;
        if (trainingTypeValue === RX_COGNITIVE_TRAINING.settings.trainingTypes[MachineLearningProviderNames.Native].value) {
            result = RX_COGNITIVE_TRAINING.settings.nativeProviderTrainingLocales;
        }
        else if (trainingTypeValue === RX_COGNITIVE_TRAINING.settings.trainingTypes[MachineLearningProviderNames.Watson].value) {
            result = RX_COGNITIVE_TRAINING.settings.watsonProviderTrainingLocales;
        }
        return result;
    }
}
RxCognitiveTrainingUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCognitiveTrainingUtilsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxCognitiveTrainingUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCognitiveTrainingUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCognitiveTrainingUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=cognitive-training-utils.service.js.map