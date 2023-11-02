import { Error } from "./error";
import { Category } from "./hierarchy";


export interface CategoryState {
    category: Category[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: Error;
}