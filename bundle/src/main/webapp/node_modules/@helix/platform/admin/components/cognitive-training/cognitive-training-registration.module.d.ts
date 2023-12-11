import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./components/chatbot-data-set-blade/chatbot-data-set-blade.component";
import * as i2 from "./cognitive-training.component";
import * as i3 from "./components/cognitive-training-record-grid/cognitive-training-record-grid.component";
import * as i4 from "./components/file-data-set-blade/file-data-set-blade.component";
import * as i5 from "./components/interactive-evaluation-blade/interactive-evaluation-blade.component";
import * as i6 from "./components/record-data-set-blade/record-data-set-blade.component";
import * as i7 from "@bmc-ux/adapt-angular";
import * as i8 from "@helix/platform/shared/components";
import * as i9 from "@angular/common";
import * as i10 from "@angular/forms";
import * as i11 from "@helix/platform/view/components";
import * as i12 from "@helix/platform/ui-kit";
import * as i13 from "@helix/platform/shared/api";
import * as i14 from "@ngx-translate/core";
export declare class CognitiveTrainingRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<CognitiveTrainingRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CognitiveTrainingRegistrationModule, [typeof i1.ChatbotDataSetBladeComponent, typeof i2.CognitiveTrainingAdminComponent, typeof i3.CognitiveTrainingRecordGridComponent, typeof i4.FileDataSetBladeComponent, typeof i5.InteractiveEvaluationBladeComponent, typeof i6.RecordDataSetBladeComponent], [typeof i7.AdaptAccordionModule, typeof i7.AdaptAlertModule, typeof i7.AdaptButtonModule, typeof i7.AdaptDockedPanelModule, typeof i7.AdaptDropdownModule, typeof i7.AdaptModalModule, typeof i7.AdaptRxCounterModule, typeof i7.AdaptRxSelectModule, typeof i7.AdaptRxTextfieldModule, typeof i7.AdaptRxUploaderModule, typeof i7.AdaptRxValidatorsModule, typeof i7.AdaptTabsModule, typeof i8.AdminSettingsModule, typeof i9.CommonModule, typeof i8.ExpressionFormControlModule, typeof i10.FormsModule, typeof i8.GroupButtonFormControlModule, typeof i11.RecordGridDesignModule, typeof i11.RecordGridModule, typeof i12.RxBusyIndicatorModule, typeof i13.RxDefinitionModule, typeof i8.RxDefinitionPickerModule, typeof i14.TranslateModule, typeof i11.RecordGridFilterSelectControlModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CognitiveTrainingRegistrationModule>;
}
