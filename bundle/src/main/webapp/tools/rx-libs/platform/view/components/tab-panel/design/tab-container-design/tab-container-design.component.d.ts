import { OnInit } from '@angular/core';
import { ContainerDesignComponent } from '../../../container/design/container-design.component';
import { TabPanelDesignComponent } from '../tab-panel-design.component';
import * as i0 from "@angular/core";
export declare class TabContainerDesignComponent extends ContainerDesignComponent implements OnInit {
    private tabPanelDesignComponent;
    model: any;
    constructor(tabPanelDesignComponent: TabPanelDesignComponent);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabContainerDesignComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabContainerDesignComponent, "rx-tab-container-design", never, { "model": "model"; }, {}, never, never>;
}
