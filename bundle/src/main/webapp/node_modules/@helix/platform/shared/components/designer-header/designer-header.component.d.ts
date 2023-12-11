import { EventEmitter } from '@angular/core';
import { IBreadcrumbItem } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class RxDesignerHeaderComponent {
    bundleName: string;
    breadcrumbItems: IBreadcrumbItem[];
    isDesignMode: boolean;
    isPreviewAvailable: boolean;
    isSaveButtonDisabled: boolean;
    breadcrumbSelected: EventEmitter<IBreadcrumbItem>;
    toggleDesignMode: EventEmitter<void>;
    showPreview: EventEmitter<void>;
    save: EventEmitter<void>;
    closeDesigner: EventEmitter<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxDesignerHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxDesignerHeaderComponent, "rx-designer-header", never, { "bundleName": "bundleName"; "breadcrumbItems": "breadcrumbItems"; "isDesignMode": "isDesignMode"; "isPreviewAvailable": "isPreviewAvailable"; "isSaveButtonDisabled": "isSaveButtonDisabled"; }, { "breadcrumbSelected": "breadcrumbSelected"; "toggleDesignMode": "toggleDesignMode"; "showPreview": "showPreview"; "save": "save"; "closeDesigner": "closeDesigner"; }, never, never>;
}
