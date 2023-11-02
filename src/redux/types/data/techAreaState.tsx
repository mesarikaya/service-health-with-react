import { Error } from "./error";
import { TechArea } from "./hierarchy";


export interface TechAreaState {
    techArea: TechArea[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: Error;
}