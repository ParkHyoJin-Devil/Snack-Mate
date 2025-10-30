import React, { useState } from "react";
import type { LicenseType } from "../types/index";
import { licenseDescriptions } from "../types/index";
import * as S from "../styles/components/SnackCard.styles";
import type { Snack } from "../types/index";
import type { RecipeStep, DBRecipeData } from "../types";
import { useFetchMap } from "../hooks/useFetchMap";
import { sortImagesByOrder } from "../utils/imageUtils";

interface SnackCardProps {
    snack: Snack;
    compact?: boolean;
    featured?: boolean;
    listView?: boolean;
    onTagClick?: (tag: string) => void;
}

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL; // 예: http://localhost:3001/images

const SnackCard: React.FC<SnackCardProps> = ({ snack, onTagClick }) => {
    const [isRecipeOpen, setIsRecipeOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [recipeSteps, setRecipeSteps] = useState<RecipeStep[]>([]);

    // 모달 상태 추가
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // ✅ tools, ingredients DB에서 가져오기 (useFetchMap 사용)
    const toolsMap = useFetchMap("/api/tools");
    const ingredientsMap = useFetchMap("/api/ingredients");

    const openRecipe = async () => {
        setCurrentStep(0);
        setIsRecipeOpen(true);

        try {
            const res = await fetch(`/api/recipes/${snack.id}`);
            const data: DBRecipeData = await res.json();

            const steps: RecipeStep[] = data.steps.map((step) => ({
                step_number: step.step_number,
                step: step.description,
                ingredients: data.ingredients.map((ing) => ({
                    name: ing.name,
                    amount: ing.amount,
                })),
                tools: data.tools.map((t) => t.name),
                images: sortImagesByOrder(
                    data.images
                        .filter((img) => img.step_number === step.step_number)
                        .map((img) => ({
                            folder: img.folder,
                            file_name: img.file_name,
                            image_order: img.image_order,
                        }))
                ),
                author: step.author ?? data.recipe.author,
                license: step.license ?? "Unknown",
            }));

            setRecipeSteps(steps);
        } catch (err) {
            console.error("Error fetching recipe:", err);
        }
    };

    const closeRecipe = () => setIsRecipeOpen(false);

    const allIngredients = Array.from(
        new Map(
            recipeSteps
                .flatMap((s) => s.ingredients || [])
                .map((item) => [item.name, { ...item, link: ingredientsMap[item.name] }])
        ).values()
    );

    const allTools = Array.from(
        new Map(
            recipeSteps.flatMap((s) => s.tools || []).map((name) => [name, { name, link: toolsMap[name] }])
        ).values()
    );

    return (
        <>
            <S.Card>
                <img
                    src={snack.image}
                    alt={`${snack.name} thumbnail`}
                    style={{ objectFit: "cover", width: "100%", height: "220px" }}
                />
                <S.CardBody>
                    <S.Title>{snack.name}</S.Title>
                    <S.Tags>
                        {snack.tags.map((tag) => (
                            <span key={tag} onClick={() => onTagClick?.(tag)}>
                                {tag}
                            </span>
                        ))}
                    </S.Tags>
                    <small style={{ display: "block", marginBottom: "0.2rem" }}>영상 제공: {snack.author}</small>
                    <small
                        style={{ display: "block", marginBottom: "0.5rem", cursor: "help" }}
                        title={snack.license !== "Unknown" ? licenseDescriptions[snack.license as LicenseType] : ""}
                    >
                        라이선스: {snack.license === "Unknown" ? "정보 없음" : snack.license}
                    </small>
                    <S.ButtonsWrapper>
                        <S.ButtonLink href={snack.link} target="_blank" rel="noopener noreferrer">
                            보러가기
                        </S.ButtonLink>
                        <S.ActionButton type="button" onClick={openRecipe}>
                            레시피 확인
                        </S.ActionButton>
                    </S.ButtonsWrapper>
                </S.CardBody>
            </S.Card>

            {isRecipeOpen && (
                <S.ModalOverlay onClick={closeRecipe}>
                    <S.ModalContent onClick={(e) => e.stopPropagation()}>
                        <S.ModalHeader>
                            <h3 style={{ margin: 0 }}>{snack.name} 레시피</h3>
                            <S.CloseButton onClick={closeRecipe}>×</S.CloseButton>
                        </S.ModalHeader>

                        <S.ModalBody>
                            <S.TopBox>
                                <div className="col">
                                    <h4>필요한 재료</h4>
                                    <ul>
                                        {allIngredients.map((item) => (
                                            <li key={item.name}>
                                                {item.name} {item.amount}
                                                {item.link && (
                                                    <a href={item.link} target="_blank">
                                                        [구매]
                                                    </a>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="col">
                                    <h4>사용한 도구</h4>
                                    <ul>
                                        {allTools.map((tool) => (
                                            <li key={tool.name}>
                                                {tool.name}
                                                <a href={tool.link} target="_blank">
                                                    [구매]
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </S.TopBox>

                            {recipeSteps.length > 0 ? (
                                <>
                                    {(() => {
                                        const stepImages: string[] =
                                            recipeSteps[currentStep]?.images?.map(
                                                (img) => `${IMAGE_BASE_URL}/${img.folder}/${img.file_name}`
                                            ) ?? [];

                                        return (
                                            <>
                                                <S.ImageRow>
                                                    {stepImages.map((img, index) => (
                                                        <img
                                                            key={index}
                                                            src={img}
                                                            alt={`Step ${currentStep + 1} Image ${index + 1}`}
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                setSelectedImage(img);
                                                                setLightboxOpen(true);
                                                            }}
                                                        />
                                                    ))}
                                                </S.ImageRow>

                                                {/* 이미지 제공/라이선스 정보는 한 번만 출력 */}
                                                <small
                                                    style={{
                                                        display: "block",
                                                        fontSize: "0.75rem",
                                                        color: "#666",
                                                        marginTop: "0.25rem",
                                                        marginBottom: "0.5rem",
                                                    }}
                                                    title={
                                                        snack.license !== "Unknown"
                                                            ? licenseDescriptions[snack.license as LicenseType]
                                                            : ""
                                                    }
                                                >
                                                    이미지 제공 : {recipeSteps[currentStep]?.author ?? snack.author} |
                                                    라이선스 :{" "}
                                                    {(recipeSteps[currentStep]?.license ?? snack.license) === "Unknown"
                                                        ? "정보 없음"
                                                        : recipeSteps[currentStep]?.license ?? snack.license}
                                                </small>

                                                {/* 모달 */}
                                                {lightboxOpen && selectedImage && (
                                                    <div
                                                        style={{
                                                            position: "fixed",
                                                            top: 0,
                                                            left: 0,
                                                            width: "100%",
                                                            height: "100%",
                                                            background: "rgba(0,0,0,0.7)",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            zIndex: 9999,
                                                        }}
                                                        onClick={() => setLightboxOpen(false)}
                                                    >
                                                        <img
                                                            src={selectedImage}
                                                            alt="Selected"
                                                            style={{
                                                                maxWidth: "90%",
                                                                maxHeight: "90%",
                                                                borderRadius: "8px",
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </>
                                        );
                                    })()}

                                    <p style={{ whiteSpace: "pre-wrap" }}>{recipeSteps[currentStep]?.step}</p>
                                    <p style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.5rem" }}>
                                        단계 {currentStep + 1} / {recipeSteps.length}
                                    </p>

                                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                                        <button
                                            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                                            disabled={currentStep === 0}
                                        >
                                            이전
                                        </button>
                                        <button
                                            onClick={() =>
                                                setCurrentStep((s) => Math.min(recipeSteps.length - 1, s + 1))
                                            }
                                            disabled={currentStep === recipeSteps.length - 1}
                                        >
                                            다음
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <p>해당 간식의 레시피는 준비중입니다.</p>
                            )}
                        </S.ModalBody>
                    </S.ModalContent>
                </S.ModalOverlay>
            )}
        </>
    );
};

export default SnackCard;
