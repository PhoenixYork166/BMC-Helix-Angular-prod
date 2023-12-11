import { LogCategory } from './log.types';
import { RxLogService } from './log.service';
export declare class RxConsoleLogger {
    private rxLogService;
    constructor(rxLogService: RxLogService);
    setCategories(categories: LogCategory[]): void;
    getCategories(): string[];
    disable(): void;
}
