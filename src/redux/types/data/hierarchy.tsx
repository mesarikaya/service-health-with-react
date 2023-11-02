export interface AssessmentCriteria{
    id: number;
    description: string;
    category: Category;
    tech_standard_description: string;
    isActive: boolean;
    categoryId?: number;
}


export interface Category{
    id: number;
    description: string;
    techArea: TechArea;
    isActive: boolean;
    techAreaId?: number;
}

export interface TechArea{
    id: number;
    description: string;
    domain: TechDomain;
    isActive: boolean;
    domainId?: number;
}

export interface TechDomain{
    id: number;
    description: string;
    isActive: boolean;
}