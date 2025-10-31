import type {
    FormData as RecipeFormData,
    FormDataImage,
    FormDataStep,
} from "../../types/admin";
import { sortImagesByOrder } from "../../utils/imageUtils";
import {
    SubSection,
    SubSectionTitle,
    StepImageContainer,
    StepImageGrid,
    ImagePreview,
    Input,
    FormGroup,
    Label,
} from "../../styles/pages/Admin.styles";

interface ImageManagerProps {
    formData: RecipeFormData;
    setFormData: React.Dispatch<React.SetStateAction<RecipeFormData>>;
    removeImage: (index: number) => void;
    getImageUrl: (image: FormDataImage) => string;
}

const ImageManager: React.FC<ImageManagerProps> = ({
    formData,
    setFormData,
    removeImage,
    getImageUrl,
}) => {
    const updateStepField = (stepIndex: number, field: keyof FormDataStep, value: string) => {
        const newSteps = [...formData.steps];
        newSteps[stepIndex] = { ...newSteps[stepIndex], [field]: value };
        setFormData({ ...formData, steps: newSteps });
    };

    const getImagesByStep = () => {
        const stepImages: { [key: number]: FormDataImage[] } = {};

        formData.images.forEach((image) => {
            if (image.step_number) {
                if (!stepImages[image.step_number]) {
                    stepImages[image.step_number] = [];
                }
                stepImages[image.step_number].push(image);
            }
        });

        // 각 단계의 이미지를 image_order 순서대로 정렬
        Object.keys(stepImages).forEach((stepNum: string) => {
            stepImages[parseInt(stepNum)] = sortImagesByOrder<FormDataImage>(stepImages[parseInt(stepNum)]);
        });

        return stepImages;
    };

    const processFiles = (files: File[], stepNumber: number, slotIndex: number) => {
        const imageFiles = files.filter((file: File) => file.type.startsWith("image/"));

        // 현재 단계의 이미지 개수 확인
        const currentStepImages = formData.images.filter(img => img.step_number === stepNumber);

        // 최대 5개까지지만, 빈 슬롯이 있는지 확인
        if (currentStepImages.length >= 5) {
            alert("이 단계의 이미지 슬롯이 모두 찼습니다.");
            return;
        }

        // 첫 번째 파일만 처리
        const file = imageFiles[0];
        if (!file) return;

        // 해당 단계의 author와 license 정보 가져오기
        const stepData = formData.steps.find(step => step.step_number === stepNumber);

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target?.result as string;
            const newImage: FormDataImage = {
                folder: "uploads",
                file_name: file.name,
                step_number: stepNumber,
                image_order: slotIndex + 1, // 슬롯 번호를 image_order로 저장 (1-based)
                preview: imageUrl,
                file: file,
                provider: stepData?.author || "",
                imageLicense: stepData?.license || "",
            };

            setFormData((prev) => ({
                ...prev,
                images: [...prev.images, newImage],
            }));
        };
        reader.readAsDataURL(file);
    };

    const stepImages = getImagesByStep();

    return (
        <SubSection>
            <SubSectionTitle>📸 단계별 레시피 이미지</SubSectionTitle>

            {/* 단계별 이미지 */}
            {formData.steps.map((step: FormDataStep) => {
                const currentStepImages = stepImages[step.step_number] || [];

                return (
                    <StepImageContainer key={step.step_number}>
                        <div className="step-header">
                            <div className="step-badge">{step.step_number}</div>
                            <div className="step-title">단계 {step.step_number}</div>
                            <div className="image-count">{currentStepImages.length}/5</div>
                        </div>

                        
                        <StepImageGrid>
                            {/* 항상 5개의 슬롯 표시 */}
                            {[0, 1, 2, 3, 4].map((slotIndex: number) => {
                                const image = currentStepImages[slotIndex];

                                return (
                                    <ImagePreview key={`step-${step.step_number}-slot-${slotIndex}`}>
                                        {image ? (
                                            <>
                                                <img
                                                    src={getImageUrl(image)}
                                                    alt={image.file_name}
                                                    onError={(e) => {
                                                        e.currentTarget.src = "/images/placeholder.png";
                                                    }}
                                                />
                                                <div className="image-info">
                                                    <div className="filename">{image.file_name}</div>
                                                    <div className="step-info">
                                                        단계 {step.step_number} - {slotIndex + 1}번째
                                                    </div>
                                                </div>
                                                <button
                                                    className="remove-image"
                                                    onClick={() => removeImage(formData.images.indexOf(image))}
                                                    title="이미지 삭제"
                                                >
                                                    ×
                                                </button>
                                            </>
                                        ) : (
                                            <div
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    cursor: "pointer",
                                                    border: "2px dashed #ccc",
                                                    borderRadius: "8px",
                                                    transition: "all 0.3s ease",
                                                    position: "relative"
                                                }}
                                                onClick={() => {
                                                    const input = document.createElement("input");
                                                    input.type = "file";
                                                    input.accept = "image/*";
                                                    input.onchange = (e) => {
                                                        const files = Array.from((e.target as HTMLInputElement).files || []);
                                                        if (files.length > 0) {
                                                            processFiles(files, step.step_number, slotIndex);
                                                        }
                                                    };
                                                    input.click();
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.borderColor = "#667eea";
                                                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.borderColor = "#ccc";
                                                    e.currentTarget.style.backgroundColor = "transparent";
                                                }}
                                            >
                                                {/* 슬롯 번호 */}
                                                <div style={{
                                                    position: "absolute",
                                                    top: "8px",
                                                    left: "8px",
                                                    background: "#667eea",
                                                    color: "white",
                                                    width: "24px",
                                                    height: "24px",
                                                    borderRadius: "50%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: "0.8rem",
                                                    fontWeight: "bold"
                                                }}>
                                                    {slotIndex + 1}
                                                </div>

                                                <div style={{
                                                    fontSize: "2rem",
                                                    color: "#ccc",
                                                    marginBottom: "0.5rem"
                                                }}>
                                                    +
                                                </div>
                                                <div style={{
                                                    fontSize: "0.8rem",
                                                    color: "#999",
                                                    textAlign: "center"
                                                }}>
                                                    이미지 추가
                                                </div>
                                            </div>
                                        )}
                                    </ImagePreview>
                                );
                            })}
                        </StepImageGrid>

                        {/* 이미지 슬롯에서 직접 추가하므로 버튼 불필요 */}

                        {/* 단계별 제공자/라이선스 입력 칸 */}
                        <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #e0e0e0", borderRadius: "8px", backgroundColor: "#f8f9fa" }}>
                            <h5 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>📝 단계 {step.step_number} 이미지 정보</h5>
                            <FormGroup>
                                <Label>이미지 제공자</Label>
                                <Input
                                    type="text"
                                    value={step.author || ""}
                                    onChange={(e) => updateStepField(formData.steps.indexOf(step), "author", e.target.value)}
                                    placeholder="예: OO 유튜브 채널, OO 요리사"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>이미지 라이선스</Label>
                                <Input
                                    type="text"
                                    value={step.license || ""}
                                    onChange={(e) => updateStepField(formData.steps.indexOf(step), "license", e.target.value)}
                                    placeholder="예: CC BY-SA 4.0, 스크린샷 출처 명시"
                                />
                            </FormGroup>
                        </div>
                    </StepImageContainer>
                );
            })}

  
            {/* 도움말 */}
            <div>
                <h4>💡 이미지 관리 팁</h4>
                <ul>
                    <li><strong>이미지 업로드 시:</strong> 제공자와 라이선스 정보를 반드시 입력해야 합니다</li>
                    <li><strong>단계별 이미지:</strong> 각 조리 단계별로 최대 5개의 이미지 추가 가능</li>
                    <li><strong>이미지 추가 방법:</strong> 비어있는 슬롯( + 버튼)을 클릭하여 이미지를 추가하세요</li>
                    <li><strong>제공자/라이선스:</strong> 각 단계별로 이미지 제공자와 라이선스 정보를 입력할 수 있습니다</li>
                    <li><strong>이미지 형식:</strong> JPG, PNG, GIF 지원 • 최대 10MB</li>
                    <li><strong>저작권 준수:</strong> 다른 영상의 스크린샷 사용 시 반드시 출처와 라이선스를 명시해야 합니다</li>
                </ul>
            </div>
        </SubSection>
    );
};

export default ImageManager;