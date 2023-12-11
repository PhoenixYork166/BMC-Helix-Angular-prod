declare var joint: any;
export declare namespace rx {
    class BaseExpandableProcessShape extends joint.shapes.bpmn.Activity {
        initialize(options: any): void;
        private expand;
    }
    class BaseCallActivity extends BaseExpandableProcessShape {
        defaults(): any;
    }
    class BaseStaticMultiInstance extends joint.shapes.bpmn.Activity {
        static initMultiInstanceIcons(model: any): void;
        static updateMultiInstanceIcons(model: any): void;
    }
    class BaseMultiInstance extends joint.shapes.bpmn.Activity {
        initialize(options: any): void;
    }
    class CallActivity extends BaseCallActivity {
        initialize(options: any): void;
        defaults(): any;
    }
    class Connector extends BaseMultiInstance {
        defaults(): any;
    }
    class EndEvent extends joint.shapes.bpmn.Event {
        defaults(): any;
    }
    class ErrorBoundaryEvent extends joint.shapes.bpmn.Event {
        defaults(): any;
    }
    class ErrorEndEvent extends joint.shapes.bpmn.Event {
        defaults(): any;
    }
    class ExclusiveGateway extends joint.shapes.bpmn.Gateway {
        defaults(): any;
    }
    class ParallelGateway extends joint.shapes.bpmn.Gateway {
        defaults(): any;
    }
    class ProcessAction extends joint.shapes.bpmn.Activity {
        defaults(): any;
    }
    class ReceiveTask extends BaseMultiInstance {
        defaults(): any;
    }
    class SequenceFlow extends joint.shapes.bpmn.Flow {
        defaults(): any;
    }
    class StartEvent extends joint.shapes.bpmn.Event {
        defaults(): any;
    }
    class SubProcess extends BaseExpandableProcessShape {
        initialize(options: any): void;
        defaults(): any;
    }
    class TextAnnotation extends joint.shapes.bpmn.Annotation {
        defaults(): any;
    }
    class TextAnnotationAssociation extends joint.shapes.bpmn.Flow {
        defaults(): any;
    }
    class TimerEvent extends joint.shapes.bpmn.Event {
        defaults(): any;
    }
    class UserTask extends BaseMultiInstance {
        defaults(): any;
    }
    class WebRequest extends joint.shapes.bpmn.Activity {
        defaults(): any;
    }
}
export {};
