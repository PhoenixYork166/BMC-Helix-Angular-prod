import { chain, clone, has, isFunction, pick } from 'lodash';
import { RxIdService, RxJsonParserService } from '@helix/platform/utils';
import { RX_DESIGNER_CANVAS } from '@helix/platform/shared/components';
import { RxProcessElementRegistryService, RxProcessElementSearchService } from '@helix/platform/process/api';
import { RxEndEventService, RxProcessService, RxStartEventService } from '@helix/platform/process/elements';
export class RxProcessDesignerGraph extends joint.dia.Graph {
    constructor(config) {
        super(config.options);
        this.rxEndEventService = config.injector.get(RxEndEventService);
        this.rxIdService = config.injector.get(RxIdService);
        this.rxJsonParserService = config.injector.get(RxJsonParserService);
        this.rxProcessElementRegistryService = config.injector.get(RxProcessElementRegistryService);
        this.rxProcessElementSearchService = config.injector.get(RxProcessElementSearchService);
        this.rxProcessService = config.injector.get(RxProcessService);
        this.rxStartEventService = config.injector.get(RxStartEventService);
    }
    // joint.dia.Graph methods
    reset() {
        this.off('add');
        this.off('change');
        this.clear();
    }
    // Custom methods
    addDefaultElements(definitionModel) {
        this.addCell(this.rxProcessService.getShape({
            definitionModel,
            id: this.get('processId')
        }));
        const isGraphEmpty = chain(this.getCells())
            .reject({ id: this.get('processId') })
            .isEmpty()
            .value();
        if (isGraphEmpty) {
            const elementSize = 30;
            this.addCells([
                this.rxStartEventService.getShape({
                    position: {
                        x: elementSize,
                        y: (RX_DESIGNER_CANVAS.paperOptions.height - elementSize) / 2
                    }
                }),
                this.rxEndEventService.getShape({
                    position: {
                        x: RX_DESIGNER_CANVAS.paperOptions.width - 2 * elementSize,
                        y: (RX_DESIGNER_CANVAS.paperOptions.height - elementSize) / 2
                    }
                })
            ]);
        }
    }
    // TODO-VS: update when element shapes logic is implemented
    getDefinitionFromGraph() {
        return Object.assign(Object.assign({}, this.getDefinitionBase(this.getCell(this.get('processId')))), { flowElements: this.getFlowElements(this.getCells()), layout: this.getLayout(this.get('cells').models) });
    }
    // TODO-VS: update types
    loadGraphFromDefinition(definition) {
        return this.fromJSON(this.getJsonObject(definition));
    }
    // TODO-VS: update types
    getDefinitionBase(processCell) {
        return this.rxProcessService.getDefinitionFromModel(processCell.prop('definitionModel'));
    }
    // TODO-VS: update types
    getFlowElements(cells) {
        return chain(cells)
            .reject({ id: this.get('processId') })
            .map((cell) => {
            const elementModel = cell.prop('elementModel');
            const elementService = this.rxProcessElementRegistryService.get(elementModel.type).elementService;
            return elementService.getDefinitionFromModel(elementModel);
        })
            .value();
    }
    // TODO-VS: update types
    getJsonObject(definition) {
        const jsonObject = this.rxJsonParserService.tryParseJson(definition.layout, { cells: [] });
        jsonObject.cells.forEach((cell) => {
            const embeddedElementIds = chain(jsonObject.cells).filter({ parent: cell.id }).map('id').value();
            if (embeddedElementIds.length) {
                cell.embeds = embeddedElementIds;
            }
            cell.ownerProcessDefinitionName = definition.lastUpdateTime ? definition.name : definition.guid;
            const flowElement = this.rxProcessElementSearchService.findByGuid(definition, this.rxIdService.get(cell.id));
            const elementService = this.rxProcessElementRegistryService.get(cell.type).elementService;
            cell.elementModel = elementService.getModelFromDefinition(flowElement);
        });
        return jsonObject;
    }
    // TODO-VS: update types
    getLayout(models) {
        const cells = chain(models)
            .reject({ id: this.get('processId') })
            .map((cell) => {
            if (isFunction(cell.getLayout)) {
                return this.adaptCell(cell.getLayout());
            }
        })
            .value();
        return cells.length ? JSON.stringify({ cells: cells }) : null;
    }
    // TODO-VS: update types
    adaptCell(cell) {
        return this.removeRedundantProperties(cell);
    }
    // remove properties from the process and sub-process layouts
    // that are set programmatically and don't have to be persisted
    // TODO-VS: update types
    removeRedundantProperties(cell) {
        let attrs;
        if (has(cell, 'attrs[".label"]')) {
            attrs = {
                '.label': clone(cell.attrs['.label'])
            };
        }
        // list of properties that must be kept in the layout, all others will be set programmatically
        let adaptedCell = pick(cell, [
            'collapsedSize',
            'content',
            'expanded',
            'flowType',
            'id',
            'labels',
            'parent',
            'position',
            'size',
            'source',
            'target',
            'type',
            'vertices',
            'z'
        ]);
        if (attrs) {
            adaptedCell.attrs = attrs;
        }
        return adaptedCell;
    }
}
//# sourceMappingURL=process-designer-graph.class.js.map