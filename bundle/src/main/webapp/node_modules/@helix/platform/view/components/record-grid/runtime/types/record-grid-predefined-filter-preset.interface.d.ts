import { IRxRecordGridFilter } from '../../common/types/record-grid-filter.types';
export interface IRecordGridPredefinedFilterPreset {
    title: string;
    guid: string;
    /** JSON Format:
     *
     * {
        "and": [
          {
            "or": [
              {
                "eq": "74dd1227-e36b-49a1-8efb-f684e8f5f0b8"
              },
              {
                "eq": "ec74092d-48e1-4bd7-b0d7-1c8b4f93d691"
              }
            ]
          },
          {
            "and": [
              {
                "gte": "ae3ead5b-56ea-459a-b4be-c4cd73bd31e1"
              },
              {
                "lte": "9c6f88d6-8bd4-46a3-99e2-124218551306"
              }
            ]
          }
        ]
      }
    */
    filters: string;
    recordGridFilters: IRxRecordGridFilter[];
}
