export class RxProcess extends joint.dia.Element {
    constructor(options) {
        super(options);
        this.markup = '<g></g>';
    }
    defaults() {
        return joint.util.defaultsDeep({
            position: { x: 0, y: 0 },
            size: { width: 1, height: 1 },
            type: 'rx.Process'
        }, super.defaults);
    }
}
//# sourceMappingURL=process.class.js.map