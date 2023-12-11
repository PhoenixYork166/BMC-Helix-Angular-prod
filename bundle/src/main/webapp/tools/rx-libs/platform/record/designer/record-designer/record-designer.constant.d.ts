import { ArchiveType } from '@helix/platform/record/api';
export declare const RX_RECORD_DESIGNER: {
    featureSelector: string;
    joinCriteriaPath: string;
    archiveDataCriteriaPath: string;
    archiving: {
        types: {
            doNotArchive: {
                nameKey: string;
                id: ArchiveType;
            };
            archiveAndDeleteSourceRecord: {
                nameKey: string;
                id: ArchiveType;
            };
            deleteSourceRecord: {
                nameKey: string;
                id: ArchiveType;
            };
        };
    };
};
