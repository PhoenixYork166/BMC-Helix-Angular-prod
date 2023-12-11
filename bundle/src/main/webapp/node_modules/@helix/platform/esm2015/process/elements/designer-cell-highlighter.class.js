import { extend, result } from 'lodash';
import * as Backbone from 'backbone';
import * as processShapes from './process-shapes';
export class RxDesignerCellHighlighter extends Backbone.View {
    constructor(cellView) {
        super();
        this.selectors = {
            bpmn: {
                'bpmn.Event': '.scalable circle.outer',
                'bpmn.Annotation': '.rotatable path.stroke',
                link: 'path.connection',
                'bpmn.Flow': 'path.connection',
                'bpmn.Gateway': '.scalable polygon.body',
                'bpmn.Activity': '.scalable rect.outer',
                'basic.Rect': '.scalable rect'
            },
            rx: {
                'rx.TextAnnotation': '.rotatable path.stroke',
                'rx.TextAnnotationAssociation': 'path.connection',
                'rx.SequenceFlow': 'path.connection',
                'rx.ParallelGateway': '.scalable polygon.body',
                'rx.ExclusiveGateway': '.scalable polygon.body',
                'rx.StartEvent': '.scalable circle.outer',
                'rx.EndEvent': '.scalable circle.outer',
                'rx.SubProcess': '.rotatable rect.outer',
                'rx.ReceiveTask': '.rotatable rect.outer',
                'rx.UserTask': '.rotatable rect.outer',
                'rx.Connector': '.rotatable rect.outer',
                'rx.TimerEvent': '.scalable circle.outer',
                'rx.WebRequest': '.rotatable rect.outer'
            }
        };
        this.cellView = cellView;
        this.listenTo(this.cellView.paper, 'scale translate', this.update);
        this.$el = this.cellView.$el;
    }
    init(options) {
        this.options = extend({}, result(this, 'options'), options || {});
        this.cellView.model.on('remove', this.eraseHighlightAndRemove);
        this.update();
    }
    update() {
        this.eraseHighlight();
        this.drawHighlight();
    }
    eraseHighlightAndRemove(evt) {
        this.eraseHighlight();
        Backbone.View.prototype.remove.apply(this, arguments);
    }
    eraseHighlight() {
        if (this.cellViewHighlighter) {
            this.cellViewHighlighter.remove();
        }
    }
    drawHighlight() {
        let selector;
        switch (true) {
            case this.cellView.model instanceof processShapes.rx.ProcessAction:
            case this.cellView.model instanceof processShapes.rx.BaseCallActivity:
                selector = '.rotatable rect.outer';
                break;
            default:
                selector =
                    this.selectors.rx[this.cellView.model.prop('type')] || this.selectors.bpmn[this.cellView.model.prop('type')];
        }
        const shape = this.cellView.$el.find(selector).first();
        const highlight = shape[0] ? V(shape[0]).clone() : undefined;
        if (highlight) {
            highlight.attr({
                stroke: this.options.color,
                'stroke-width': this.options.strokeWidth
            });
            if (highlight.node.tagName === 'circle') {
                highlight.attr({
                    r: this.options.circleRadius
                });
            }
            this.cellViewHighlighter = highlight;
            shape.closest('g').prepend(highlight.node);
        }
    }
}
//# sourceMappingURL=designer-cell-highlighter.class.js.map