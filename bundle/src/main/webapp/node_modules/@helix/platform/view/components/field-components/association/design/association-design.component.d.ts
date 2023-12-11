import { OnDestroy, OnInit } from '@angular/core';
import { AssociationDesignModel } from './association-design.model';
import { RxAssociationDesignContainerComponent } from './association-design-container.component';
import * as i0 from "@angular/core";
export declare class RxAssociationDesignComponent implements OnInit, OnDestroy {
    model: AssociationDesignModel;
    hidePlaceholder: boolean;
    private destroyed$;
    containerComponent: typeof RxAssociationDesignContainerComponent;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxAssociationDesignComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxAssociationDesignComponent, "rx-association-field-design", never, { "model": "model"; }, {}, never, never>;
}
