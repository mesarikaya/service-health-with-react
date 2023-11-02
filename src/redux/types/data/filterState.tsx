import { Error } from "./error";

export interface FilterState  {  
    filter: FilterHierarchy[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: Error;
  };

export interface FilterHierarchy {
    assessmentCriteriaDescription: string;
    assessmentCriteriaId: number;
    categoryDescription: string;
    categoryId: string;
    techAreaDescription: string;
    techAreaId: number;
    domainDescription: string;
    domainId: number;
}

