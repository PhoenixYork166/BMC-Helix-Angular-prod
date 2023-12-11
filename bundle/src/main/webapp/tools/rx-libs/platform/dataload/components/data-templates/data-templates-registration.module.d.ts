import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./data-templates.component";
import * as i2 from "./data-template-editor/data-template-editor.component";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "@ngx-translate/core";
import * as i7 from "@helix/platform/view/components";
import * as i8 from "@helix/platform/ui-kit";
export declare class DataTemplatesRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<DataTemplatesRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DataTemplatesRegistrationModule, [typeof i1.DataTemplatesComponent, typeof i2.DataTemplateEditorComponent], [typeof i3.AdaptButtonModule, typeof i4.CommonModule, typeof i5.FormsModule, typeof i6.TranslateModule, typeof i7.RecordGridModule, typeof i3.AdaptRxSelectModule, typeof i5.ReactiveFormsModule, typeof i3.AdaptRxTextfieldModule, typeof i3.AdaptRxRadiobuttonModule, typeof i3.AdaptRxUploaderModule, typeof i3.AdaptRxTextareaModule, typeof i8.RxBusyIndicatorModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DataTemplatesRegistrationModule>;
}
