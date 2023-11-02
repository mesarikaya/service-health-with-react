import { AssessmentCriteria } from "./hierarchy";


export interface DashboardCardData {
    siteName: string;
    siteId: number;
    assessmentCriteriaDescription: string;
    assessmentCriteriaId: number;
    techStandardDescription: string;
    categoryDescription: string;
    categoryId: number;
    techAreaDescription: string;
    techAreaId: number
    domainDescription: string;
    domainId: number;
    assessmentResults: AssessmentResults[];
}

export interface AssessmentResults {
    id: number;
    assessmentCriteria: AssessmentCriteria;
}