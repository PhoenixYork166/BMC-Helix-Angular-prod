import * as Backbone from 'backbone';
export declare class RxDesignerCellHighlighter extends Backbone.View {
    selectors: {
        bpmn: {
            'bpmn.Event': string;
            'bpmn.Annotation': string;
            link: string;
            'bpmn.Flow': string;
            'bpmn.Gateway': string;
            'bpmn.Activity': string;
            'basic.Rect': string;
        };
        rx: {
            'rx.TextAnnotation': string;
            'rx.TextAnnotationAssociation': string;
            'rx.SequenceFlow': string;
            'rx.ParallelGateway': string;
            'rx.ExclusiveGateway': string;
            'rx.StartEvent': string;
            'rx.EndEvent': string;
            'rx.SubProcess': string;
            'rx.ReceiveTask': string;
            'rx.UserTask': string;
            'rx.Connector': string;
            'rx.TimerEvent': string;
            'rx.WebRequest': string;
        };
    };
    cellView: any;
    cellViewHighlighter: any;
    options: {
        strokeWidth: 10;
        circleRadius: 31.5;
        color: 'green';
    };
    constructor(cellView: any);
    init(options: any): void;
    update(): void;
    eraseHighlightAndRemove(evt: any): void;
    private eraseHighlight;
    private drawHighlight;
}
