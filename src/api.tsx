const base_url = (process.env.REACT_APP_IS_ACCESS_WITH_CAPI && 
    process.env.REACT_APP_IS_ACCESS_WITH_CAPI==="true") ? process.env.REACT_APP_API_CAPI : process.env.REACT_APP_API;

const site = "/assessment-results/site";

const region = '/region/sites';

const sites = "/sites/"

const locationsites = '/location/sites'

const locations = '/locations'

const domain = "/tech-domains/"

const techArea = "/tech-areas/"

const category = "/categories/"

const criteria = "/assessment-criteria/"

const investmentCriticalities = "/investment-criticalities/"

const dashboard = "/dashboard-data/site/"

const filter = "/dashboard-data/hierarchy"

const attachment = "/attachments/multiple"

const assessmentResult = "/assessment-results"

const downattachment = "/attachments/"

const downsiteattachment = "/attachments/site/"

const domainCount = "/assessment-results/count/tech-domain/"

const areaCount = "/assessment-results/count/tech-area/"

const categoryCount = "/assessment-results/count/category/"

const criteriaCount = "/assessment-results/count/assessment-criteria/"

export const techDomainCount = (id) => `${base_url}${domainCount}${id}`;

export const techAreaCount = (id) => `${base_url}${areaCount}${id}`;

export const techCategoryCount = (id) => `${base_url}${categoryCount}${id}`;

export const techCriteriaCount = (id) => `${base_url}${criteriaCount}${id}`;

export const siteApi = () => `${base_url}${region}`;

export const attachmentApi = () => `${base_url}${attachment}`;

export const SiteAttachment = () => `${base_url}${downattachment}`;

export const downloadAttachmentApi = (id) => `${base_url}${downattachment}${id}`;

export const downloadSiteAttachment = (id) => `${base_url}${downsiteattachment}${id}`;

export const downloadCriteriaAttachment = (siteid, critid) => `${base_url}${downsiteattachment}${siteid}${"/criteria/"}${critid}`;

export const assessmentResultApi = () => `${base_url}${assessmentResult}`;

export const investmentCriticalitiesApi = () => `${base_url}${investmentCriticalities}`;

export const filterApi = () => `${base_url}${filter}`;

export const siteDetail = () => `${base_url}${site}`;

export const dashboardApi = () => `${base_url}${dashboard}`;

export const sitesApi = () => `${base_url}${sites}${"?page=0&size=20000"}`;

export const createSite = () => `${base_url}${sites}`;

export const sitesUpdate = (id) => `${base_url}${sites}${id}`;

export const domainApi = () => `${base_url}${domain}`;

export const techAreaApi = () => `${base_url}${techArea}`;

export const categoryApi = () => `${base_url}${category}${"?page=0&size=20000"}`;

export const domainUpdate = (id) => `${base_url}${domain}${id}`;

export const techAreaUpdate = (id) => `${base_url}${techArea}${id}`;

export const categoryUpdate = (id) => `${base_url}${category}${id}`;

export const criteriaUpdate = (id) => `${base_url}${criteria}${id}`;

export const criteriaApi = () => `${base_url}${criteria}${"?page=0&size=20000"}`;

export const locationSiteApi = () => `${base_url}${locationsites}`;

export const locationsApi = () => `${base_url}${locations}`;