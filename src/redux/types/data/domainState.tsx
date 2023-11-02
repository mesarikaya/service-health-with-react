import { Domain } from "domain";
import { Error } from "./error";


export interface DomainState {
    domain: Domain[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: Error;
}