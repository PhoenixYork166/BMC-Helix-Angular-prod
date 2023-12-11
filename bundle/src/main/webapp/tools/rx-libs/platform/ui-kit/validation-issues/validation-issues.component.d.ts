import { EventEmitter, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IValidationIssue, IValidationIssueSection, ValidationIssueType } from './validation-issues.types';
import * as i0 from "@angular/core";
export declare class RxValidationIssuesComponent implements OnInit {
    private translateService;
    definitionTypeDisplayName: string;
    issueSections: IValidationIssueSection[];
    correctIssue: EventEmitter<IValidationIssue>;
    emptyText: string;
    ValidationIssueType: typeof ValidationIssueType;
    onCorrectIssue(validationIssue: IValidationIssue): void;
    constructor(translateService: TranslateService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxValidationIssuesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxValidationIssuesComponent, "rx-validation-issues", never, { "definitionTypeDisplayName": "definitionTypeDisplayName"; "issueSections": "issueSections"; }, { "correctIssue": "correctIssue"; }, never, never>;
}
