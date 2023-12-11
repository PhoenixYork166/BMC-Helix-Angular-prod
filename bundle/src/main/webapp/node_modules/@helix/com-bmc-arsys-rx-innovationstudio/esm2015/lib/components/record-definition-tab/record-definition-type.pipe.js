import { Pipe } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
export class AxRecordDefinitionTypePipe {
    constructor(translateService) {
        this.translateService = translateService;
    }
    transform(recordDefinition) {
        let displayName = '';
        if (recordDefinition.recordDefinitionType === RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType) {
            displayName = this.translateService.instant('com.bmc.arsys.rx.client.record-definition.type.regular.label');
        }
        if (recordDefinition.recordDefinitionType === RX_RECORD_DEFINITION.recordDefinitionTypes.join.recordDefinitionType) {
            displayName = this.translateService.instant('com.bmc.arsys.rx.client.record-definition.type.join.label');
        }
        if (recordDefinition.recordDefinitionType === RX_RECORD_DEFINITION.recordDefinitionTypes.external.recordDefinitionType) {
            if (recordDefinition.type === RX_RECORD_DEFINITION.externalRecordDefinitionTypes.custom) {
                displayName = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.record.type.custom.label');
            }
            else {
                displayName = this.translateService.instant('com.bmc.arsys.rx.client.record-definition.type.external.label');
            }
        }
        if (recordDefinition.isAuditRecordDefinition) {
            displayName = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.record.audit.label', {
                recordType: displayName
            });
        }
        if (recordDefinition.archiveSourceRecordDefinitionName) {
            displayName = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.record.archive.label', {
                recordType: displayName
            });
        }
        return displayName;
    }
}
/** @nocollapse */ AxRecordDefinitionTypePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxRecordDefinitionTypePipe, deps: [{ token: i1.TranslateService }], target: i0.ɵɵFactoryTarget.Pipe });
/** @nocollapse */ AxRecordDefinitionTypePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxRecordDefinitionTypePipe, name: "axRecordDefinitionType" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxRecordDefinitionTypePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'axRecordDefinitionType'
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }]; } });
//# sourceMappingURL=record-definition-type.pipe.js.map