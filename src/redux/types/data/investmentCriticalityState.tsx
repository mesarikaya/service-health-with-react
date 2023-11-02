import { Error } from "./error";
import InvestmentCriticality from "./investmentCriticality";


export interface InvestmentCriticalityState {
    investmentCriticality: InvestmentCriticality[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: Error;
}