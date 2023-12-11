import { ArchiveType } from '@helix/platform/record/api';
export const RX_RECORD_DESIGNER = {
    featureSelector: 'recordDesigner',
    joinCriteriaPath: 'joinCriteria',
    archiveDataCriteriaPath: 'archiveDataCriteria',
    archiving: {
        types: {
            doNotArchive: {
                nameKey: 'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.types.do-not-archive.label',
                id: ArchiveType.None
            },
            archiveAndDeleteSourceRecord: {
                nameKey: 'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.types.archive-and-delete-source-record.label',
                id: ArchiveType.CopyToArchiveAndDeleteFromSource
            },
            deleteSourceRecord: {
                nameKey: 'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.types.delete-source-record.label',
                id: ArchiveType.DeleteFromSource
            }
        }
    }
};
//# sourceMappingURL=record-designer.constant.js.map