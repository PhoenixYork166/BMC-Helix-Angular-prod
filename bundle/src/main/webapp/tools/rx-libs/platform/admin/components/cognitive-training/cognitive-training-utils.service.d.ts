import { ICognitiveTrainingDataSourceHistory, ICognitiveTrainingDataSourceType } from './cognitive-training.types';
import * as i0 from "@angular/core";
export declare class RxCognitiveTrainingUtilsService {
    getDataSourceType(dataSourceHistory: ICognitiveTrainingDataSourceHistory): ICognitiveTrainingDataSourceType;
    getTrainingLocales(trainingTypeValue: number): string[];
    static ɵfac: i0.ɵɵFactoryDeclaration<RxCognitiveTrainingUtilsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxCognitiveTrainingUtilsService>;
}
