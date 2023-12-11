import { ChangeDetectorRef } from '@angular/core';
import { AdaptButtonGroupComponent } from '@bmc-ux/adapt-angular';
import { IFormControlComponent } from '@helix/platform/shared/api';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { IGroupButtonFormControlOptions } from './group-button-control-options.interface';
import * as i0 from "@angular/core";
export declare class GroupButtonFormControlComponent extends ValueAccessor<string | number> implements IFormControlComponent {
    private changeDetectorRef;
    adaptButtonGroupComponent: AdaptButtonGroupComponent;
    options: IGroupButtonFormControlOptions;
    model: boolean[];
    constructor(changeDetectorRef: ChangeDetectorRef);
    onGroupButtonChange(groupButtonValues: boolean[]): void;
    onWriteValue(value: string | number): void;
    private updateModel;
    private setValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<GroupButtonFormControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GroupButtonFormControlComponent, "rx-group-button-form-control", never, { "options": "options"; }, {}, never, never>;
}
