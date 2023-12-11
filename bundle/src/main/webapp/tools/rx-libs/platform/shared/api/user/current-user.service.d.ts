import { Observable } from 'rxjs';
import { IUser } from './user.interface';
import * as i0 from "@angular/core";
export declare class RxCurrentUserService {
    private userSubject$;
    user$: Observable<IUser | null>;
    getPreferredLocale(): string;
    getPreferredUserLocale(): string;
    getName(): string;
    set(user: IUser): void;
    get(): IUser | null;
    isBusinessAnalyst(): boolean;
    isAdministrator(): boolean;
    getEditableBundles(): string[];
    isSupportStaff(): boolean;
    isAvailableForAssignment(): boolean;
    setAssignmentAvailability(assignmentAvailable: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxCurrentUserService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxCurrentUserService>;
}
