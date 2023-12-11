import { every, isArray } from 'lodash';
import { LogCategory } from './log.types';
const allowedCategories = Object.values(LogCategory);
export class RxConsoleLogger {
    constructor(rxLogService) {
        this.rxLogService = rxLogService;
    }
    setCategories(categories) {
        if (!isArray(categories) || !every(categories, (category) => allowedCategories.includes(category))) {
            const validCategories = allowedCategories.map((category) => `'${category}'`).join(', ');
            throw new Error(`Invalid category specified. Valid categories: [${validCategories}].`);
        }
        else {
            this.rxLogService.configure(categories);
        }
    }
    getCategories() {
        return this.rxLogService.logCategories;
    }
    disable() {
        this.rxLogService.configure([]);
    }
}
//# sourceMappingURL=console-logger.class.js.map