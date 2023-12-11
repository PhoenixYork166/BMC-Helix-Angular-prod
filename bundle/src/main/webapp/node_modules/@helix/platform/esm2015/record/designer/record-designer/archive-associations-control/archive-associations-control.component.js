import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RxModalService } from '@helix/platform/ui-kit';
import { ValueAccessor } from '@helix/platform/shared/components';
import { TranslateService } from '@ngx-translate/core';
import { filter as _filter, includes, noop, reject, some } from 'lodash';
import { ArchiveAssociationSelectorComponent } from './archive-association-selector.component';
import { AssociationSelectionType, RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { RX_ASSOCIATION_DEFINITION } from '@helix/platform/association/api';
import { BehaviorSubject, combineLatest, forkJoin, of } from 'rxjs';
import { defaultIfEmpty, filter, map, shareReplay, switchMap, take } from 'rxjs/operators';
import { RX_APPLICATION, RxNotificationService } from '@helix/platform/shared/api';
import { MissingArchiveDefinitionsModalComponent } from './missing-archive-definitions-modal.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@helix/platform/record/api";
import * as i4 from "@helix/platform/shared/api";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@angular/common";
export class ArchiveAssociationsControlComponent extends ValueAccessor {
    constructor(rxModalService, translateService, rxRecordDefinitionCacheService, rxNotificationService) {
        super();
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxNotificationService = rxNotificationService;
        this.associationLabels = {
            [AssociationSelectionType.Selected]: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.selected-associations.label'),
            [AssociationSelectionType.All]: this.translateService.instant('com.bmc.arsys.rx.client.common.all.label'),
            [AssociationSelectionType.AllEnforced]: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.all-enforced-associations.label'),
            [AssociationSelectionType.FollowParent]: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.follow-parent-associations.label')
        };
        this.recordDefinitionNameSubject = new BehaviorSubject(null);
        this.associationToFollowSubject = new BehaviorSubject({
            specificAssociationNames: [],
            selectionType: AssociationSelectionType.FollowParent
        });
        this.associationDefinitions$ = this.recordDefinitionNameSubject.pipe(switchMap((recordDefinitionName) => recordDefinitionName
            ? this.rxRecordDefinitionCacheService.getRecordAssociationDefinitions(recordDefinitionName).pipe(map((recordAssociationDefinitions) => reject(recordAssociationDefinitions[recordDefinitionName], {
                cardinality: RX_ASSOCIATION_DEFINITION.cardinality.manyToMany
            }).filter((association) => association.nodeAId === recordDefinitionName)))
            : of([])), shareReplay(1));
        this.validAssociations$ = this.associationDefinitions$.pipe(map((associationDefinitions) => {
            const selectedAssociationType = this.value.selectionType;
            const selectedAssociations = associationDefinitions.filter((association) => includes(this.value.specificAssociationNames, association.name));
            let validAssociations = [];
            if (selectedAssociationType === AssociationSelectionType.Selected) {
                validAssociations = selectedAssociations;
            }
            else if (selectedAssociationType === AssociationSelectionType.All) {
                validAssociations = associationDefinitions;
            }
            else if (selectedAssociationType === AssociationSelectionType.AllEnforced) {
                validAssociations = associationDefinitions
                    .filter((association) => association.nodeAModality === RX_ASSOCIATION_DEFINITION.modality.required)
                    .concat(selectedAssociations);
            }
            return validAssociations;
        }));
        this.missingAssociations$ = this.validAssociations$.pipe(switchMap((associations) => forkJoin(associations.map((association) => this.rxRecordDefinitionCacheService.getRecordDefinition(association.nodeBId).pipe(filter((definition) => { var _a; return !((_a = definition.archiveDescriptor) === null || _a === void 0 ? void 0 : _a.isEnabled); }), map(() => ({
            name: association.name,
            secondRecord: association.nodeBId,
            url: `${window.location.origin}/helix/index.html#/${RX_APPLICATION.innovationStudioBundleId}/record/edit2/${association.nodeBId}`
        }))))).pipe(defaultIfEmpty([]))));
        this.associationLabel$ = combineLatest([
            this.associationToFollowSubject,
            this.associationDefinitions$
        ]).pipe(map(([associationToFollow, associationDefinitions]) => {
            let selectedAssociationLabel;
            if (associationToFollow.selectionType === AssociationSelectionType.AllEnforced) {
                const selectedAssociations = _filter(associationDefinitions, (association) => includes(associationToFollow.specificAssociationNames, association.name));
                if (some(selectedAssociations, (association) => association.nodeAModality !== RX_ASSOCIATION_DEFINITION.modality.required)) {
                    selectedAssociationLabel = `${this.associationLabels[AssociationSelectionType.AllEnforced]} + ${this.associationLabels[AssociationSelectionType.Selected]}`;
                }
                else {
                    selectedAssociationLabel = this.associationLabels[AssociationSelectionType.AllEnforced];
                }
            }
            else {
                selectedAssociationLabel = this.associationLabels[associationToFollow.selectionType];
            }
            return selectedAssociationLabel;
        }));
    }
    ngOnChanges(changes) {
        var _a, _b;
        const prevDefinitionName = changes.options.previousValue.definitionModel.lastUpdateTime
            ? `${changes.options.previousValue.bundleId}:${changes.options.previousValue.definitionModel.name}`
            : (_a = changes.options.previousValue.definitionModel.recordInheritanceSelector.inheritanceDescriptor) === null || _a === void 0 ? void 0 : _a.inheritingFrom;
        const currentDefinitionName = changes.options.currentValue.definitionModel.lastUpdateTime
            ? `${changes.options.currentValue.bundleId}:${changes.options.currentValue.definitionModel.name}`
            : (_b = changes.options.currentValue.definitionModel.recordInheritanceSelector.inheritanceDescriptor) === null || _b === void 0 ? void 0 : _b.inheritingFrom;
        if (currentDefinitionName !== prevDefinitionName) {
            this.recordDefinitionNameSubject.next(currentDefinitionName);
        }
        if (!currentDefinitionName) {
            this.value = {
                specificAssociationNames: [],
                selectionType: AssociationSelectionType.FollowParent
            };
            this.associationToFollowSubject.next(this.value);
        }
    }
    ngOnInit() {
        var _a;
        const definitionName = this.options.definitionModel.lastUpdateTime
            ? `${this.options.bundleId}:${this.options.definitionModel.name}`
            : (_a = this.options.definitionModel.recordInheritanceSelector.inheritanceDescriptor) === null || _a === void 0 ? void 0 : _a.inheritingFrom;
        this.recordDefinitionNameSubject.next(definitionName);
        this.associationToFollowSubject.next(this.value);
    }
    openAssociationSelector() {
        this.associationDefinitions$.pipe(take(1)).subscribe((associationDefinitions) => {
            this.rxModalService
                .openModal({
                title: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.associations-to-follow.label'),
                data: {
                    associationDefinitions,
                    selectedAssociationsToFollow: this.value,
                    actualAssociationsToFollow: this.options.definitionModelFromDefinition.associationsToFollowForArchive,
                    isOverlayMode: this.options.isOverlayMode,
                    isReadOnly: this.options.isReadOnly
                },
                content: ArchiveAssociationSelectorComponent
            })
                .then((result) => {
                this.value = result;
                this.associationToFollowSubject.next(this.value);
            })
                .catch(noop);
        });
    }
    openMissingDefinitionsModal() {
        this.missingAssociations$.pipe(take(1)).subscribe((missingAssociations) => {
            if (missingAssociations.length) {
                this.rxModalService
                    .openModal({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.missing-archive-definitions.label'),
                    data: {
                        missingAssociations
                    },
                    size: 'sm',
                    content: MissingArchiveDefinitionsModalComponent
                })
                    .catch(noop);
            }
            else {
                this.rxNotificationService.addInfoMessage(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.no-missing-archive-definitions.message'));
            }
        });
    }
}
ArchiveAssociationsControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ArchiveAssociationsControlComponent, deps: [{ token: i1.RxModalService }, { token: i2.TranslateService }, { token: i3.RxRecordDefinitionCacheService }, { token: i4.RxNotificationService }], target: i0.ɵɵFactoryTarget.Component });
ArchiveAssociationsControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ArchiveAssociationsControlComponent, selector: "rx-archive-associations", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: ArchiveAssociationsControlComponent,
            multi: true
        }
    ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<div class=\"d-inline-flex align-items-center mb-1\">\n  <button\n    class=\"d-icon-plus_circle p-0\"\n    adapt-button\n    type=\"button\"\n    btn-type=\"tertiary\"\n    rx-id=\"associations-to-follow-button\"\n    (click)=\"openAssociationSelector()\"\n  >\n    {{\n      'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.associations-to-follow.label' | translate\n    }}\n  </button>\n\n  <adapt-icon\n    name=\"question_circle_o\"\n    class=\"ml-2\"\n    placement=\"right\"\n    [adaptPopover]=\"\n      'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.associations-to-follow.tooltip'\n        | translate\n    \"\n  >\n  </adapt-icon>\n</div>\n\n<div class=\"border pl-2 p-1 form-group\">\n  <span class=\"d-icon-left-arrow_schema font-weight-bold\">\n    {{ associationLabel$ | async }}\n  </span>\n</div>\n\n<div class=\"d-inline-flex align-items-center\">\n  <adapt-icon name=\"exclamation_triangle\" class=\"text-warning-icon\"> </adapt-icon>\n\n  <adapt-button\n    btn-type=\"tertiary\"\n    rx-id=\"open-missing-definitions-button\"\n    (click)=\"openMissingDefinitionsModal()\"\n    class=\"p-0 pl-1\"\n  >\n    {{\n      'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.missing-archive-definitions.label'\n        | translate\n    }}\n  </adapt-button>\n</div>\n", components: [{ type: i5.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i5.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i5.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }], pipes: { "translate": i2.TranslatePipe, "async": i6.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ArchiveAssociationsControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-archive-associations',
                    templateUrl: './archive-associations-control.component.html',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: ArchiveAssociationsControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.TranslateService }, { type: i3.RxRecordDefinitionCacheService }, { type: i4.RxNotificationService }]; }, propDecorators: { options: [{
                type: Input
            }] } });
//# sourceMappingURL=archive-associations-control.component.js.map