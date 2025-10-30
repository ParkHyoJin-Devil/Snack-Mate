export interface Recipe {
    id: number;
    title: string;
    author: string;
    provider?: string;
    recipeLicense?: string;
    created_at: string;
    updated_at: string;
}

export interface FullRecipe {
    recipe: Recipe;
    steps: Array<{
        id?: number;
        step_number: number;
        description: string;
        author?: string;
        license?: string;
    }>;
    ingredients: Array<{
        id?: number;
        name: string;
        amount?: string;
    }>;
    tools: Array<{
        id?: number;
        name: string;
    }>;
    images: Array<{
        id?: number;
        folder: string;
        file_name: string;
        step_number?: number;
    }>;
}

export interface FormDataImage {
    id?: number;
    folder: string;
    file_name: string;
    step_number?: number | null;
    image_order?: number | null;
    preview?: string;
    file?: File;
    provider?: string;
    imageLicense?: string;
}

export interface FormDataStep {
    id?: number;
    step_number: number;
    description: string;
    author?: string;
    license?: string;
}

export interface FormDataIngredient {
    id?: number;
    name: string;
    amount?: string;
}

export interface FormDataTool {
    id?: number;
    name: string;
}

export interface Stats {
    totalRecipes: number;
    totalUsers: number;
    recentRecipes: Recipe[];
}

export interface FormData {
    title: string;
    author: string;
    provider?: string;
    recipeLicense?: string;
    license?: string;
    steps: FormDataStep[];
    ingredients: FormDataIngredient[];
    tools: FormDataTool[];
    images: FormDataImage[];
}