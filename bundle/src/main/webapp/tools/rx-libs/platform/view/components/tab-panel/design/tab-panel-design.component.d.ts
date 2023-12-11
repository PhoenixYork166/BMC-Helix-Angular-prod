import { OnInit } from '@angular/core';
import { TabEvent } from '@bmc-ux/adapt-angular';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import { TabPanelDesignModel } from './tab-panel-design.model';
import * as i0 from "@angular/core";
export declare class TabPanelDesignComponent implements OnInit {
    private rxUtilityModalsService;
    model: TabPanelDesignModel;
    isReadOnly: boolean;
    adaptTabset: any;
    components: any[];
    private destroyed$;
    constructor(rxUtilityModalsService: RxUtilityModalsService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    trackByForTabs<T extends {
        guid: string;
    }>(index: number, item: T): string;
    onTabClicked(event: TabEvent): void;
    onTabAdded(e: Event): void;
    activeTabChanged({ index, event }: {
        index: any;
        event: any;
    }): void;
    onTabDropped(tabs: any): void;
    removeTab({ index }: TabEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabPanelDesignComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabPanelDesignComponent, "rx-tab-panel-design", never, { "model": "model"; "isReadOnly": "isReadOnly"; }, {}, never, never>;
}
