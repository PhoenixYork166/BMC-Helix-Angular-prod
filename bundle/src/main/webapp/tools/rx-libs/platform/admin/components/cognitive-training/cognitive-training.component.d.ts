import { OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { RxCognitiveTrainingService } from './cognitive-training.service';
import { ICognitiveTrainingTab, ICognitiveTrainingType } from './cognitive-training.types';
import * as i0 from "@angular/core";
export declare class CognitiveTrainingAdminComponent extends BaseViewComponent implements OnInit, OnDestroy {
    private rxCognitiveTrainingService;
    busy: Subscription;
    trainingType: ICognitiveTrainingType;
    sections: {
        title: string;
        evaluationName: import("./cognitive-training.types").CognitiveTrainingEvaluationNames;
        isExpanded: boolean;
    }[];
    tabs: ICognitiveTrainingTab[];
    protected destroyed$: ReplaySubject<boolean>;
    constructor(rxCognitiveTrainingService: RxCognitiveTrainingService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CognitiveTrainingAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CognitiveTrainingAdminComponent, "rx-admin-cognitive-training", never, {}, {}, never, never>;
}
