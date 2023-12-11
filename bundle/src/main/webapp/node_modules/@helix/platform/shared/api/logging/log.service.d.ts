import { RxCurrentUserService } from '../user/current-user.service';
import { LogCategory } from './log.types';
import * as i0 from "@angular/core";
export declare class RxLogService {
    private rxCurrentUserService;
    private categories;
    private serverCategories;
    private shouldLogEverything;
    get logCategories(): string[];
    get serverLogCategories(): string;
    constructor(rxCurrentUserService: RxCurrentUserService);
    configure(categories: LogCategory[]): void;
    error(message: string): void;
    warning(message: string): void;
    info(message: string): void;
    debug(message: string): void;
    log(message: string): void;
    private prepareLogMessage;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxLogService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxLogService>;
}
