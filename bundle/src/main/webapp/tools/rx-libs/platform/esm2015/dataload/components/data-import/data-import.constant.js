export const DL_DATA_IMPORT = {
    recordDefinitionName: 'com.bmc.arsys.rx.dataload:Data Load Files',
    archiveTrueValue: 1,
    uploadFileStepId: 'uploadDataFile',
    temporaryStepConfig: {
        id: 'temporaryStep',
        name: '',
        componentFactory: null
    },
    attachmentTypes: {
        xlsx: {
            value: 1,
            extension: 'xlsx'
        },
        zip: {
            value: 2,
            extension: 'zip'
        }
    },
    fields: {
        importJobName: 536870913,
        uploadedOn: 536870914,
        importJobDescription: 536870915,
        dataFile: 536870916,
        attachmentOut: 536870917,
        message: 536870918,
        attachmentType: 536870919,
        archivedWorksheetFileName: 536870920,
        isArchived: 536870921,
        mappingConfig: 536870923
    },
    dataStatuses: {
        all: -1,
        queued: 6,
        new: 0,
        processing: 1,
        processed: 2,
        stopping: 7,
        stopped: 8,
        errored: 3
    },
    mergeOptions: {
        generateNewIds: 1,
        rejectDuplicates: 2,
        generateNewIdsForDuplicates: 3,
        updateRecords: 4,
        replaceRecords: 5
    }
};
//# sourceMappingURL=data-import.constant.js.map