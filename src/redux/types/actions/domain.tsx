import { DomainState } from "../data/domainState";

export const GET_DOMAIN = 'GET_DOMAIN';
interface GetDomainRequest {
    type: typeof GET_DOMAIN
    payload: DomainState
}
export type GetDomainRequestActionType = GetDomainRequest;