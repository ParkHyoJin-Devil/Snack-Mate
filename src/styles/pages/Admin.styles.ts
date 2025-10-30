// src/styles/pages/Admin.styles.ts
import { styled } from "../styled";

// Admin 전체 컨테이너
export const AdminContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

// Admin 레이아웃 (사이드바 + 메인 콘텐츠)
export const AdminLayout = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  min-height: calc(100vh - 200px);
`;

// 사이드바 관련 스타일
export const Sidebar = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

export const SidebarTitle = styled.h3`
  color: #4a2c2a;
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SidebarButton = styled.button<{ $active?: boolean }>`
  width: 100%;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 8px;
  text-align: left;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  background: ${(props) => (props.$active ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "#f8f9fa")};
  color: ${(props) => (props.$active ? "white" : "#495057")};

  &:hover {
    background: ${(props) => (props.$active ? "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)" : "#e9ecef")};
    transform: translateY(-1px);
  }
`;

// 메인 콘텐츠 관련 스타일
export const MainContent = styled.div`
  min-width: 0;
`;

// 헤더 관련 스타일
export const AdminHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e9ecef;
`;

export const AdminHeader = styled.h1`
  color: #4a2c2a;
  font-size: 2.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const NavigationContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const HomeButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.2rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1rem;
  }
`;

// 통계 관련 스타일
export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const StatCard = styled.div`
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
  padding: 1.5rem;
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

export const StatTitle = styled.h3`
  color: #ffffff;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

export const StatValue = styled.p`
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffffff;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

// 섹션 및 레시피 관련 스타일
export const SectionTitle = styled.h2`
  color: #4a2c2a;
  margin: 2rem 0 1rem;
  font-size: 1.8rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const RecipeList = styled.div`
  display: grid;
  gap: 1rem;
`;

export const RecipeItem = styled.div`
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
`;

export const RecipeInfo = styled.div`
  flex: 1;
`;

export const RecipeName = styled.h3`
  margin: 0 0 0.5rem;
  color: #4a2c2a;
  font-size: 1.3rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const RecipeMeta = styled.p`
  margin: 0;
  color: #6c757d;
  font-size: 0.9rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6c757d;
  font-size: 1.1rem;

  strong {
    color: #495057;
  }
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6c757d;
  font-size: 1.1rem;

  .spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: 0.5rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// 버튼 스타일
export const Button = styled.button`
  padding: 0.7rem 1.2rem;
  margin-left: 0.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }
  }

  &.secondary {
    background: #6c757d;
    color: white;

    &:hover {
      background: #5a6268;
      transform: translateY(-1px);
    }
  }

  &.danger {
    background: #dc3545;
    color: white;

    &:hover {
      background: #c82333;
      transform: translateY(-1px);
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// 모달 관련 스타일
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;

  @keyframes modalSlideIn {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

// 폼 관련 스타일
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: bold;
  color: #333;
`;

export const Input = styled.input`
  padding: 1rem 1.25rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  min-height: 50px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
  }
`;

export const TextArea = styled.textarea`
  padding: 1rem 1.25rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
  }
`;

export const SubSection = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background: #f8f9fa;
`;

export const SubSectionTitle = styled.h4`
  margin: 0 0 1rem;
  color: #333;
  font-size: 1.1rem;
`;

export const ArrayItem = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  align-items: center;
`;

// 이미지 관련 스타일
export const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

export const StepImageContainer = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  background: #fafafa;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const StepImageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const StepImageTitle = styled.h5`
  margin: 0;
  color: #4a2c2a;
  font-size: 1.1rem;
  font-weight: bold;
`;

export const StepImageCounter = styled.span`
  background: #667eea;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
`;

export const ImagePreview = styled.div`
  position: relative;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  width: 200px;
  height: 200px;
  background: white;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #667eea;
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10;

    .remove-image {
      opacity: 1;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: #f8f9fa;
    padding: 4px;
    transition: all 0.3s ease;

    &:hover {
      object-fit: scale-down;
    }
  }

  .remove-image {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 20;

    &:hover {
      background: #c82333;
      transform: scale(1.1);
    }
  }
`;

export const StepImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-bottom: 1rem;

  ${ImagePreview} {
    flex: 0 0 auto;
  }
`;

export const NoImagesMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #999;
  font-style: italic;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px dashed #dee2e6;
`;

export const ImagePreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ImagePreviewInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  padding: 0.3rem 0.5rem;
  font-size: 0.65rem;

  .provider {
    color: #4fc3f7;
    font-weight: 500;
  }

  .license {
    color: #81c784;
    font-size: 0.6rem;
    font-style: italic;
  }

  .filename {
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .step-info {
    color: #ffd54f;
    font-size: 0.6rem;
  }
`;

export const RemoveImageButton = styled.button`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background: rgba(220, 53, 69, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(220, 53, 69, 1);
    transform: scale(1.1);
  }
`;

export const ImageDropZone = styled.div<{ isDragOver?: boolean }>`
  border: 2px dashed ${(props) => (props.isDragOver ? "#667eea" : "#ccc")};
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) => (props.isDragOver ? "#f0f4ff" : "#fafafa")};

  &:hover {
    border-color: #667eea;
    background: #f0f4ff;
  }
`;

export const ImageDropText = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.8rem;
`;

export const FileUploadArea = styled.div`
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover,
  &.drag-over {
    border-color: #667eea;
    background: #f0f4ff;
  }
`;

export const UploadIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #667eea;
`;

export const UploadText = styled.p`
  margin: 0;
  color: #666;
  font-size: 1rem;

  strong {
    color: #667eea;
  }
`;

export const UploadHint = styled.p`
  margin: 0.5rem 0 0;
  color: #999;
  font-size: 0.8rem;
`;

// 폼 버튼 그룹
export const FormButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #dee2e6;
`;