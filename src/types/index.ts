// 라이선스 타입 정의
export type LicenseType =
    | "CC BY" // 저작자 표시
    | "CC BY-SA" // 저작자 표시 + 동일 조건 변경 허용
    | "CC BY-NC" // 저작자 표시 + 비상업적 이용만
    | "CC BY-NC-SA" // 저작자 표시 + 비상업적 이용 + 동일 조건 변경 허용
    | "CC BY-ND" // 저작자 표시 + 변경 금지
    | "CC BY-NC-ND" // 저작자 표시 + 비상업적 이용 + 변경 금지
    | "CC0" // 퍼블릭 도메인 (CC0)
    | "Public Domain" // 퍼블릭 도메인
    | "All Rights Reserved" // 모든 권리 보유
    | "Unknown"; // 라이선스 불명

// 라이선스 설명 매핑
export const licenseDescriptions: Record<LicenseType, string> = {
    "CC BY": "저작자 표시",
    "CC BY-SA": "저작자 표시 + 동일 조건 변경 허용",
    "CC BY-NC": "저작자 표시 + 비상업적 이용만",
    "CC BY-NC-SA": "저작자 표시 + 비상업적 이용 + 동일 조건 변경 허용",
    "CC BY-ND": "저작자 표시 + 변경 금지",
    "CC BY-NC-ND": "저작자 표시 + 비상업적 이용 + 변경 금지",
    CC0: "퍼블릭 도메인 (CC0)",
    "Public Domain": "퍼블릭 도메인",
    "All Rights Reserved": "모든 권리 보유",
    Unknown: "라이선스 불명",
};

export interface Snack {
    id: number;
    name: string;
    description: string;
    tags: string[];
    image: string;
    link: string;
    category: string;
    author: string;
    license: LicenseType;
}

export interface CartItem extends Snack {
    quantity: number;
}

export interface User {
    id: string;
    nickname: string;
    email: string;
    avatar?: string;
}

export interface SearchFilters {
    query: string;
    category: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
}

// 레시피 관련 타입
export interface RecipeIngredient {
    name: string;
    amount: string;
}

export interface RecipeTool {
    name: string;
}

export interface RecipeImage {
    step_number: number;
    folder: string;
    file_name: string;
}

export interface RecipeStep {
    step_number: number;
    step: string;
    ingredients: { name: string; amount: string }[];
    tools: string[];
    images: { folder: string; file_name: string }[];
    author?: string;
    license?: string;
}

export interface DBRecipeData {
    recipe: {
        id: number;
        name: string;
        author: string;
        license: string;
    };
    steps: DBStep[];
    ingredients: RecipeIngredient[];
    tools: RecipeTool[];
    images: RecipeImage[];
}

export interface DBStep {
    step_number: number;
    description: string;
    author?: string | null;
    license?: string | null;
}
