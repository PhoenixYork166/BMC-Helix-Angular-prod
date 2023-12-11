export function RxServerActionViewMixin(Base) {
    return class RxServerActionView extends Base {
        className() {
            const originalClassName = joint.shapes.bpmn.ActivityView.prototype.className.apply(this, arguments);
            // append actionTypeName to element's class to help QA find elements in the DOM
            // @ts-ignore
            return `${originalClassName} ${this.model.get('elementModel').actionTypeName}`;
        }
    };
}
//# sourceMappingURL=server-action-view.mixin.js.map