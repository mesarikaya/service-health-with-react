import { Error } from "./error";
import { AssessmentCriteria } from "./hierarchy";


export interface AssessmentCriteriaState {
    criteria: AssessmentCriteria[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: Error;
}