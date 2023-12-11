export declare enum DevelopmentMode {
    Base = "0",
    BestPractice = "1"
}
export declare enum OverlayType {
    Additive = "ADDITIVE",
    Overwrite = "OVERWRITE",
    Unmodified = "UNMODIFIED"
}
export interface IOverlayDescriptor {
    otherPropertiesOverlayType?: OverlayType;
    parentOverlayGroupId?: string;
    permissionsOverlayType?: OverlayType;
}
