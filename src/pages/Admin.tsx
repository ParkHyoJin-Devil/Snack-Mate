import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
    AdminContainer,
    AdminLayout,
    Sidebar,
    SidebarTitle,
    SidebarMenu,
    SidebarButton,
    MainContent,
    AdminHeaderContainer,
    AdminHeader,
    NavigationContainer,
    HomeButton,
    UserInfo,
    SectionTitle,
    RecipeList,
    RecipeItem,
    RecipeInfo,
    RecipeName,
    RecipeMeta,
    EmptyState,
    LoadingState,
    Button,
} from "../styles/pages/Admin.styles";
import type {
    Recipe,
    FullRecipe,
    FormData as RecipeFormData,
    FormDataStep,
    FormDataIngredient,
    FormDataTool,
    Stats,
} from "../types/admin";
import StatsSection from "../components/admin/StatsSection";
import RecipeForm from "../components/admin/RecipeForm";

const Admin: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState<Stats | null>(null);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<FullRecipe | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(true);

    // Form state
    const [formData, setFormData] = useState<RecipeFormData>({
        title: "",
        author: "",
        provider: "",
        recipeLicense: "",
        license: "",
        steps: [{ step_number: 1, description: "", author: "", license: "" }],
        ingredients: [{ name: "", amount: "" }],
        tools: [{ name: "" }],
        images: [{ folder: "", file_name: "", step_number: undefined }],
    });

    const getAuthHeaders = () => {
        const token = localStorage.getItem("token");
        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
    };

    useEffect(() => {
        if (user?.role !== "admin") {
            return;
        }

        const fetchData = async () => {
            try {
                const [statsResponse, recipesResponse] = await Promise.all([
                    fetch("http://localhost:3001/api/admin/stats", {
                        headers: getAuthHeaders(),
                    }),
                    fetch("http://localhost:3001/api/admin/recipes", {
                        headers: getAuthHeaders(),
                    }),
                ]);

                if (statsResponse.ok) {
                    const statsData = await statsResponse.json();
                    setStats(statsData);
                }

                if (recipesResponse.ok) {
                    const recipesData = await recipesResponse.json();
                    setRecipes(recipesData);
                }
            } catch (error) {
                console.error("Error fetching admin data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const handleEdit = async (recipeId: number) => {
        try {
            const response = await fetch(`http://localhost:3001/api/admin/recipes/${recipeId}`, {
                headers: getAuthHeaders(),
            });

            if (response.ok) {
                const recipeData = await response.json();
                console.log("기존 레시피 데이터:", recipeData); // 디버깅용
                setSelectedRecipe(recipeData);
                setFormData({
                    title: recipeData.recipe.name || recipeData.recipe.title || "",
                    author: recipeData.recipe.author || "",
                    provider: recipeData.recipe.provider || "",
                    recipeLicense: recipeData.recipe.recipeLicense || "",
                    license: recipeData.recipe.license || "",
                    steps: recipeData.steps.length > 0 ? recipeData.steps.map((step: FormDataStep) => ({
                        ...step,
                        description: step.description || "",
                        author: step.author || "",
                        license: step.license || ""
                    })) : [{ step_number: 1, description: "", author: "", license: "" }],
                    ingredients:
                        recipeData.ingredients.length > 0 ? recipeData.ingredients.map((ingredient: FormDataIngredient) => ({
                            ...ingredient,
                            name: ingredient.name || "",
                            amount: ingredient.amount || ""
                        })) : [{ name: "", amount: "" }],
                    tools: recipeData.tools.length > 0 ? recipeData.tools.map((tool: FormDataTool) => ({
                        ...tool,
                        name: tool.name || ""
                    })) : [{ name: "" }],
                    images:
                        recipeData.images.length > 0
                            ? recipeData.images
                            : [{ folder: "", file_name: "", step_number: undefined }],
                });
                setIsEditMode(true);
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error("Error fetching recipe:", error);
        }
    };

    const handleDelete = async (recipeId: number) => {
        if (!window.confirm("정말로 이 레시피를 삭제하시겠습니까?")) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/api/admin/recipes/${recipeId}`, {
                method: "DELETE",
                headers: getAuthHeaders(),
            });

            if (response.ok) {
                setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
                alert("레시피가 삭제되었습니다.");
            }
        } catch (error) {
            console.error("Error deleting recipe:", error);
            alert("레시피 삭제 중 오류가 발생했습니다.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = isEditMode
                ? `http://localhost:3001/api/admin/recipes/${selectedRecipe?.recipe.id}`
                : "http://localhost:3001/api/admin/recipes";

            const method = isEditMode ? "PUT" : "POST";

            // 서버가 받는 필드명에 맞춰 데이터 변환
            const serverData = {
                title: formData.title, // 서버는 name 필드를 받지만 title로 보내도 됨
                author: formData.author,
                license: formData.license,
                steps: formData.steps,
                ingredients: formData.ingredients,
                tools: formData.tools,
                images: formData.images
            };

            const response = await fetch(url, {
                method,
                headers: getAuthHeaders(),
                body: JSON.stringify(serverData),
            });

            if (response.ok) {
                if (isEditMode) {
                    alert("레시피가 수정되었습니다.");
                } else {
                    alert("레시피가 생성되었습니다.");
                }

                setIsModalOpen(false);
                setIsEditMode(false);
                resetForm();

                // 레시피 목록 새로고침
                const recipesResponse = await fetch("http://localhost:3001/api/admin/recipes", {
                    headers: getAuthHeaders(),
                });
                if (recipesResponse.ok) {
                    const recipesData = await recipesResponse.json();
                    setRecipes(recipesData);
                }
            }
        } catch (error) {
            console.error("Error saving recipe:", error);
            alert("저장 중 오류가 발생했습니다.");
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            author: "",
            provider: "",
            recipeLicense: "",
            license: "",
            steps: [{ step_number: 1, description: "", author: "", license: "" }],
            ingredients: [{ name: "", amount: "" }],
            tools: [{ name: "" }],
            images: [{ folder: "", file_name: "", step_number: undefined }],
        });
        setSelectedRecipe(null);
    };

    const handleNewRecipe = () => {
        resetForm();
        setIsEditMode(false);
        setIsModalOpen(true);
    };

    if (user?.role !== "admin") {
        return (
            <AdminContainer>
                <p>관리자 권한이 필요합니다.</p>
            </AdminContainer>
        );
    }

    if (loading) {
        return (
            <AdminContainer>
                <LoadingState>관리자 패널을 불러오는 중입니다...</LoadingState>
            </AdminContainer>
        );
    }

    return (
        <AdminContainer>
            <AdminHeaderContainer>
                <AdminHeader>Snack Mate 관리자 패널</AdminHeader>
                <NavigationContainer>
                    <HomeButton onClick={() => navigate("/")}>🏠 홈으로</HomeButton>
                    <UserInfo>
                        <div className="user-avatar">{user?.nickname?.charAt(0)?.toUpperCase() || "A"}</div>
                        <div>
                            <div>{user?.nickname || "관리자"}</div>
                            <div>{user?.role === "admin" ? "👑 관리자" : "사용자"}</div>
                        </div>
                    </UserInfo>
                </NavigationContainer>
            </AdminHeaderContainer>

            <AdminLayout>
                <Sidebar>
                    <SidebarTitle>🔧 관리 메뉴</SidebarTitle>
                    <SidebarMenu>
                        <SidebarButton $active onClick={() => {}}>
                            📊 대시보드
                        </SidebarButton>
                        <SidebarButton onClick={() => navigate("/")}>🏠 홈으로</SidebarButton>
                        <SidebarButton onClick={() => navigate("/recipes")}>🍳 레시피 목록</SidebarButton>
                        <SidebarButton onClick={() => alert("개발 예정")}>👥 사용자 관리</SidebarButton>
                        <SidebarButton onClick={() => alert("개발 예정")}>📈 통계 분석</SidebarButton>
                        <SidebarButton onClick={() => alert("개발 예정")}>⚙️ 시스템 설정</SidebarButton>
                    </SidebarMenu>
                </Sidebar>

                <MainContent>
                    <StatsSection stats={stats} />

                    <SectionTitle>레시피 관리 센터</SectionTitle>
                    <Button className="primary" onClick={handleNewRecipe}>
                        ✨ 새 레시피 등록
                    </Button>

                    <RecipeList>
                        {recipes.length === 0 ? (
                            <EmptyState>
                                등록된 레시피가 없습니다.
                                <br />첫 번째 레시피를 등록해보세요!
                            </EmptyState>
                        ) : (
                            recipes.map((recipe) => (
                                <RecipeItem key={recipe.id}>
                                    <RecipeInfo>
                                        <RecipeName>{recipe.title}</RecipeName>
                                        <RecipeMeta>
                                            👨‍🍳 작성자: {recipe.author} | 📅 생성일:{" "}
                                            {new Date(recipe.created_at).toLocaleDateString()}
                                        </RecipeMeta>
                                    </RecipeInfo>
                                    <div>
                                        <Button className="secondary" onClick={() => handleEdit(recipe.id)}>
                                            ✏️ 수정
                                        </Button>
                                        <Button className="danger" onClick={() => handleDelete(recipe.id)}>
                                            🗑️ 삭제
                                        </Button>
                                    </div>
                                </RecipeItem>
                            ))
                        )}
                    </RecipeList>

                    {isModalOpen && (
                        <RecipeForm
                            isEditMode={isEditMode}
                            formData={formData}
                            setFormData={setFormData}
                            onClose={() => setIsModalOpen(false)}
                            onSubmit={handleSubmit}
                        />
                    )}
                </MainContent>
            </AdminLayout>
        </AdminContainer>
    );
};

export default Admin;