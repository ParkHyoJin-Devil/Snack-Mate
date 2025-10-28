// src/types/recipe.d.ts

export interface Recipe {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}

export interface Step {
    id: number;
    recipe_id: number;
    step_number: number;
    description: string;
    author: string | null;
    license: string | null;
}

export interface Ingredient {
    id: number;
    recipe_id: number;
    name: string;
    amount: string | null;
}

export interface Tool {
    id: number;
    recipe_id: number;
    name: string;
}

export interface Image {
    id: number;
    recipe_id: number;
    folder: string;
    file_name: string;
    step_number: number | null;
}
