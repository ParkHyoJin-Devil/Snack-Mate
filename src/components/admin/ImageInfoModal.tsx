import React from "react";
import type { FormDataImage } from "../../types/admin";
import {
    Modal,
    ModalContent,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    FormButtonGroup,
} from "../../styles/pages/Admin.styles";

interface ImageInfoModalProps {
    image: FormDataImage | null;
    onClose: () => void;
    onSave: (imageData: { provider?: string; imageLicense?: string }) => void;
}

const ImageInfoModal: React.FC<ImageInfoModalProps> = ({ image, onClose, onSave }) => {
    const [provider, setProvider] = React.useState(image?.provider || "");
    const [imageLicense, setImageLicense] = React.useState(image?.imageLicense || "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ provider: provider || undefined, imageLicense: imageLicense || undefined });
        onClose();
    };

    if (!image) return null;

    return (
        <Modal onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <h2>🖼️ 이미지 정보 수정</h2>
                <div style={{ marginBottom: "1rem" }}>
                    <p><strong>파일명:</strong> {image.file_name}</p>
                    {image.preview && (
                        <img
                            src={image.preview}
                            alt={image.file_name}
                            style={{
                                maxWidth: "200px",
                                maxHeight: "200px",
                                objectFit: "contain",
                                marginTop: "0.5rem",
                                border: "1px solid #ddd",
                                borderRadius: "8px"
                            }}
                        />
                    )}
                </div>

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>이미지 제공자</Label>
                        <Input
                            type="text"
                            value={provider}
                            onChange={(e) => setProvider(e.target.value)}
                            placeholder="예: OO 유튜브 채널, OO 요리사"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>이미지 라이선스</Label>
                        <Input
                            type="text"
                            value={imageLicense}
                            onChange={(e) => setImageLicense(e.target.value)}
                            placeholder="예: CC BY-SA 4.0, 스크린샷 출처 명시"
                        />
                    </FormGroup>

                    <FormButtonGroup>
                        <Button type="button" className="secondary" onClick={onClose}>
                            취소
                        </Button>
                        <Button type="submit" className="primary">
                            저장
                        </Button>
                    </FormButtonGroup>
                </Form>
            </ModalContent>
        </Modal>
    );
};

export default ImageInfoModal;