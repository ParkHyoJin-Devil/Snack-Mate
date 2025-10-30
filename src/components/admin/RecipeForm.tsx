import type { FormData as RecipeFormData, FormDataStep, FormDataIngredient, FormDataTool, FormDataImage } from "../../types/admin";
import {
    Modal,
    ModalContent,
    Form,
    FormGroup,
    Label,
    Input,
    TextArea,
    SubSection,
    SubSectionTitle,
    ArrayItem,
    Button,
    FormButtonGroup,
} from "../../styles/pages/Admin.styles";
import ImageManager from "./ImageManager";

interface RecipeFormProps {
    isEditMode: boolean;
    formData: RecipeFormData;
    setFormData: React.Dispatch<React.SetStateAction<RecipeFormData>>;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({
    isEditMode,
    formData,
    setFormData,
    onClose,
    onSubmit,
}) => {
    const updateArrayField = (
        field: keyof RecipeFormData,
        index: number,
        key: keyof FormDataStep | keyof FormDataIngredient | keyof FormDataTool | keyof FormDataImage,
        value: string | number | null
    ) => {
        const newArray = [
            ...(formData[field] as FormDataStep[] | FormDataIngredient[] | FormDataTool[] | FormDataImage[]),
        ];
        newArray[index] = { ...newArray[index], [key]: value };
        setFormData({ ...formData, [field]: newArray });
    };

    const addArrayItem = (field: keyof RecipeFormData) => {
        const currentArray = formData[field];

        if (!Array.isArray(currentArray)) return;

        const fieldDefaults = {
            steps: { step_number: currentArray.length + 1, description: "", author: "", license: "" },
            ingredients: { name: "", amount: "" },
            tools: { name: "" },
            images: { folder: "", file_name: "", step_number: undefined },
        };

        setFormData({
            ...formData,
            [field]: [...currentArray, fieldDefaults[field as keyof typeof fieldDefaults]],
        });
    };

    const removeArrayItem = (field: keyof RecipeFormData, index: number) => {
        const newArray = (
            formData[field] as FormDataStep[] | FormDataIngredient[] | FormDataTool[] | FormDataImage[]
        ).filter((_: FormDataStep | FormDataIngredient | FormDataTool | FormDataImage, i: number) => i !== index);
        setFormData({ ...formData, [field]: newArray });
    };

    const removeImage = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    const getImageUrl = (image: FormDataImage) => {
        if (image.preview) return image.preview;
        if (image.folder && image.file_name) {
            return `http://localhost:3001/images/${image.folder}/${image.file_name}`;
        }
        return "";
    };

    return (
        <Modal onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <h2>{isEditMode ? "✏️ 레시피 수정" : "✨ 새 레시피 등록"}</h2>
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                        <Label>레시피 제목 *</Label>
                        <Input
                            type="text"
                            value={formData.title || ""}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>레시피 작성자 *</Label>
                        <Input
                            type="text"
                            value={formData.author || ""}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            placeholder="레시피를 만든 사람 또는 출처"
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>레시피 제공자</Label>
                        <Input
                            type="text"
                            value={formData.provider || ""}
                            onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                            placeholder="레시피 영상/콘텐츠 제공자 (예: OO 유튜브 채널)"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>레시피 라이선스</Label>
                        <Input
                            type="text"
                            value={formData.recipeLicense || ""}
                            onChange={(e) => setFormData({ ...formData, recipeLicense: e.target.value })}
                            placeholder="예: CC BY-SA 4.0, 저작권자 명시, public domain 등"
                        />
                    </FormGroup>

                    <SubSection>
                        <SubSectionTitle>👨‍🍳 조리 순서</SubSectionTitle>
                        {formData.steps.map((step, index) => (
                            <ArrayItem key={index}>
                                <div>
                                    <span>{step.step_number}</span>
                                    <span>단계 {step.step_number}</span>
                                    <Button
                                        type="button"
                                        className="danger"
                                        onClick={() => removeArrayItem("steps", index)}
                                    >
                                        삭제
                                    </Button>
                                </div>
                                <TextArea
                                    placeholder="이 단계에서 해야 할 일을 자세히 설명해주세요...
&#10;예시:
&#10;1. 김치는 2cm 길이로 썰어 물에 2번 헹궈 건져주세요.
&#10;2. 베이컨은 1cm 두께로 썰어 기름을 두른 팬에 앞뒤로 노릇하게 구워주세요."
                                    value={step.description || ""}
                                    onChange={(e) =>
                                        updateArrayField("steps", index, "description", e.target.value)
                                    }
                                />
                            </ArrayItem>
                        ))}
                        <Button
                            type="button"
                            className="secondary"
                            onClick={() => addArrayItem("steps")}
                        >
                            ➕ 조리 단계 추가
                        </Button>
                    </SubSection>

                    <SubSection>
                        <SubSectionTitle>🥘 필요한 재료</SubSectionTitle>
                        {formData.ingredients.map((ingredient, index) => (
                            <ArrayItem key={index}>
                                <span>📦</span>
                                <Input
                                    type="text"
                                    placeholder="재료 이름 (예: 돼지고기, 김치, 마늘)"
                                    value={ingredient.name || ""}
                                    onChange={(e) =>
                                        updateArrayField("ingredients", index, "name", e.target.value)
                                    }
                                />
                                <Input
                                    type="text"
                                    placeholder="수량 (예: 500g, 2개, 1큰술)"
                                    value={ingredient.amount || ""}
                                    onChange={(e) =>
                                        updateArrayField("ingredients", index, "amount", e.target.value)
                                    }
                                />
                                <Button
                                    type="button"
                                    className="danger"
                                    onClick={() => removeArrayItem("ingredients", index)}
                                >
                                    🗑️
                                </Button>
                            </ArrayItem>
                        ))}
                        <Button
                            type="button"
                            className="secondary"
                            onClick={() => addArrayItem("ingredients")}
                        >
                            ➕ 재료 추가
                        </Button>
                    </SubSection>

                    <SubSection>
                        <SubSectionTitle>🔪 필요한 도구</SubSectionTitle>
                        {formData.tools.map((tool, index) => (
                            <ArrayItem key={index}>
                                <span>🔧</span>
                                <Input
                                    type="text"
                                    placeholder="도구 이름 (예: 칼, 도마, 프라이팬)"
                                    value={tool.name || ""}
                                    onChange={(e) =>
                                        updateArrayField("tools", index, "name", e.target.value)
                                    }
                                />
                                <Button
                                    type="button"
                                    className="danger"
                                    onClick={() => removeArrayItem("tools", index)}
                                >
                                    🗑️
                                </Button>
                            </ArrayItem>
                        ))}
                        <Button
                            type="button"
                            className="secondary"
                            onClick={() => addArrayItem("tools")}
                        >
                            ➕ 도구 추가
                        </Button>
                    </SubSection>

                    <ImageManager
                        formData={formData}
                        setFormData={setFormData}
                        removeImage={removeImage}
                        getImageUrl={getImageUrl}
                    />

                    <FormButtonGroup>
                        <Button type="button" className="secondary" onClick={onClose}>
                            ❌ 취소
                        </Button>
                        <Button type="submit" className="primary">
                            {isEditMode ? "💾 수정 완료" : "🚀 레시피 등록"}
                        </Button>
                    </FormButtonGroup>
                </Form>
            </ModalContent>
        </Modal>
    );
};

export default RecipeForm;