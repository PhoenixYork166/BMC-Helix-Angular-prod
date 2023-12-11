import { OnInit } from '@angular/core';
import { RecordEditorDesignModel } from './record-editor-design.model';
import * as i0 from "@angular/core";
export declare class RecordEditorDesignComponent implements OnInit {
    model: RecordEditorDesignModel;
    dropPredicateFn: () => boolean;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordEditorDesignComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RecordEditorDesignComponent, "rx-record-editor-design", never, { "model": "model"; }, {}, never, never>;
}
