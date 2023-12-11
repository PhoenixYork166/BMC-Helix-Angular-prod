export interface IUserEngagementToneAnalysisPayload {
    resourceType: string;
    language: string;
    utterances: string[];
    toneScoreThreshold: number;
}
export interface IDocumentTone {
    documentTone: {
        scores: [
            {
                score: number;
                toneId: string;
                toneName: string;
            }
        ];
    };
    sentencesTone: [
        {
            scores: [
                {
                    score: number;
                    toneId: string;
                    toneName: string;
                }
            ];
            text: string;
        }
    ];
}
export interface IUtterancesTone {
    utterancesTone: [
        {
            scores: [
                {
                    score: number;
                    toneId: string;
                    toneName: string;
                }
            ];
            text: string;
        }
    ];
}
