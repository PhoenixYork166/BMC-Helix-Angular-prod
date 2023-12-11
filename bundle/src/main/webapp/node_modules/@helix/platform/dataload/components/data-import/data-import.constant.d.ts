export declare const DL_DATA_IMPORT: {
    recordDefinitionName: string;
    archiveTrueValue: number;
    uploadFileStepId: string;
    temporaryStepConfig: {
        id: string;
        name: string;
        componentFactory: any;
    };
    attachmentTypes: {
        xlsx: {
            value: number;
            extension: string;
        };
        zip: {
            value: number;
            extension: string;
        };
    };
    fields: {
        importJobName: number;
        uploadedOn: number;
        importJobDescription: number;
        dataFile: number;
        attachmentOut: number;
        message: number;
        attachmentType: number;
        archivedWorksheetFileName: number;
        isArchived: number;
        mappingConfig: number;
    };
    dataStatuses: {
        all: number;
        queued: number;
        new: number;
        processing: number;
        processed: number;
        stopping: number;
        stopped: number;
        errored: number;
    };
    mergeOptions: {
        generateNewIds: number;
        rejectDuplicates: number;
        generateNewIdsForDuplicates: number;
        updateRecords: number;
        replaceRecords: number;
    };
};
