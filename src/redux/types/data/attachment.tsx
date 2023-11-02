import { AssessmentCriteria } from "./hierarchy";
import Site from "./dashboardSiteFiltersState";

export default interface AttachmentFile {
    id: number;
    fileName: string;
    fileType: string;
    fileSize: number;
    data: Blob;
    siteId: number;
    assessmentCriteriaId: number;
    recommendationStatusId: number;
    assessmentCriteria?: AssessmentCriteria;
    site: Site;
    createDate: Date;
    createdBy: string;
    updateDate: Date;
    updatedBy: string;
};