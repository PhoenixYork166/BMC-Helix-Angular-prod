import { OnInit } from '@angular/core';
import { IPlainObject } from '@helix/platform/shared/api';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { RxArrayUtilsService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
interface IRecordDefinitionData {
    disallowChangeOrder?: boolean;
    importOrder: number;
    name: string;
    selected?: boolean;
}
export declare class OrderDataWizardStepComponent implements OnInit {
    private rxWizardModalComponent;
    private rxArrayUtilsService;
    options: IPlainObject;
    recordDefinitions: IRecordDefinitionData[];
    constructor(rxWizardModalComponent: RxWizardModalComponent, rxArrayUtilsService: RxArrayUtilsService);
    ngOnInit(): void;
    isMoveDownButtonDisabled(): boolean;
    isMoveUpButtonDisabled(): boolean;
    moveDown(): void;
    moveUp(): void;
    trackBy(index: number, recordDefinition: IRecordDefinitionData): string;
    private getSelectedIndexes;
    private updateIndexes;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderDataWizardStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrderDataWizardStepComponent, "ax-order-data-wizard-step", never, { "options": "options"; }, {}, never, never>;
}
export {};
