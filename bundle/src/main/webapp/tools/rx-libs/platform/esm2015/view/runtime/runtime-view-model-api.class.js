import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class RuntimeViewModelApi {
    clear() {
        this.runtimeViewModel = null;
    }
    init(model) {
        if (!this.runtimeViewModel) {
            this.runtimeViewModel = model;
        }
    }
    triggerViewActions(guid, eventName) {
        return this.runtimeViewModel.triggerViewActions(guid, eventName);
    }
    cancel(skipDirtyCheck) {
        return this.runtimeViewModel.cancel(skipDirtyCheck);
    }
    close() {
        return this.runtimeViewModel.close();
    }
    getViewInputParameters() {
        return this.runtimeViewModel.getViewInputParameters();
    }
    applyViewPreset(viewPresetSelectorGuid, viewPresetGuid, sharedViewPresets) {
        return this.runtimeViewModel.applyViewPreset(viewPresetSelectorGuid, viewPresetGuid, sharedViewPresets);
    }
    deleteViewPreset(viewPresetGuid) {
        return this.runtimeViewModel.deleteViewPreset(viewPresetGuid);
    }
    discardViewPresetChanges(viewPresetGuid, sharedViewPresets) {
        return this.runtimeViewModel.discardViewPresetChanges(viewPresetGuid, sharedViewPresets);
    }
    saveViewPreset(viewPresetGuid) {
        return this.runtimeViewModel.saveViewPreset(viewPresetGuid);
    }
    shareViewPreset(viewPresetSelectorGuid) {
        return this.runtimeViewModel.shareViewPreset(viewPresetSelectorGuid);
    }
}
RuntimeViewModelApi.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewModelApi, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RuntimeViewModelApi.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewModelApi });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewModelApi, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=runtime-view-model-api.class.js.map