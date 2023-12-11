import { RuntimeLayoutOutlet, RuntimeLayoutOutletColumn } from './runtime-layout-outlet.class';
export class RuntimeLayoutItem {
    constructor(options) {
        this.outlets = [];
        this.parent = null;
        this.runtimeViewModelApi = null;
        Object.assign(this, {
            guid: options.guid,
            config: options.config,
            parent: options.parent,
            runtimeViewModelApi: options.runtimeViewModelApi,
            factory: options.factory
        });
        if (options.outlets) {
            this.initializeOutlets(options.outlets);
        }
    }
    initializeOutlets(outlets) {
        outlets.forEach((outlet) => {
            const layoutOutletItem = new RuntimeLayoutOutlet();
            layoutOutletItem.name = outlet.name;
            layoutOutletItem.height = outlet.hasOwnProperty('height') ? outlet.height : null;
            this.outlets.push(layoutOutletItem);
        });
    }
    addLayoutItem(layoutTreeItem, columnConfig) {
        const outlet = this.outlets.find((outletItem) => outletItem.name === columnConfig.parentOutlet.name);
        const insertIndex = columnConfig.parentOutlet.columns[columnConfig.columnIndex].children.indexOf(layoutTreeItem.guid);
        columnConfig.parentOutlet.columns.forEach((column, columnIndex) => {
            if (!outlet.columns[columnIndex]) {
                outlet.columns[columnIndex] = new RuntimeLayoutOutletColumn();
            }
            if (column.cssClass) {
                outlet.columns[columnIndex].cssClass = column.cssClass;
            }
            if (column.span) {
                outlet.columns[columnIndex].span = column.span;
            }
        });
        if (layoutTreeItem) {
            outlet.columns[columnConfig.columnIndex].children[insertIndex] = layoutTreeItem;
        }
    }
}
//# sourceMappingURL=runtime-layout-item.class.js.map