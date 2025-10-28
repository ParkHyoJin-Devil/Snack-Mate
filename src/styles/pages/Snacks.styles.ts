import { styled } from "../styled";

export const BackButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }

    &:active {
        transform: translateY(0);
    }
`;

export const Container = styled.div`
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;

    @media (max-width: 1200px) {
        max-width: 100%;
        padding: 1.5rem;
    }

    @media (max-width: 768px) {
        padding: 1rem;
    }

    @media (max-width: 480px) {
        padding: 0.75rem;
    }
`;

export const Header = styled.div`
    text-align: center;
    margin-bottom: 3rem;

    @media (max-width: 768px) {
        margin-bottom: 2rem;
    }

    @media (max-width: 480px) {
        margin-bottom: 1.5rem;
    }
`;

export const Title = styled.h1`
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 768px) {
        font-size: 2rem;
    }

    @media (max-width: 480px) {
        font-size: 1.75rem;
    }
`;

export const Subtitle = styled.p`
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
        font-size: 1rem;
        margin-bottom: 1.5rem;
    }

    @media (max-width: 480px) {
        font-size: 0.9rem;
        margin-bottom: 1rem;
    }
`;

export const SearchBar = styled.input`
    padding: 1rem 1.5rem;
    font-size: 1rem;
    border: 2px solid #e1e5e9;
    border-radius: 50px;
    outline: none;
    transition: all 0.3s ease;
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
    margin: 0 auto 2rem;

    &:focus {
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    &::placeholder {
        color: #999;
    }

    @media (max-width: 768px) {
        padding: 0.875rem 1.25rem;
        font-size: 0.95rem;
    }

    @media (max-width: 480px) {
        padding: 0.75rem 1rem;
        font-size: 0.9rem;
    }
`;

export const FilterTabs = styled.div`
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
        gap: 0.375rem;
    }

    @media (max-width: 480px) {
        justify-content: flex-start;
        overflow-x: auto;
        flex-wrap: nowrap;
        padding-bottom: 0.5rem;

        &::-webkit-scrollbar {
            height: 4px;
        }

        &::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }

        &::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
        }
    }
`;

export const FilterTab = styled.button<{ $active: boolean }>`
    padding: 0.5rem 1.5rem;
    border: 2px solid ${(props) => (props.$active ? "#667eea" : "#e1e5e9")};
    background: ${(props) => (props.$active ? "#667eea" : "white")};
    color: ${(props) => (props.$active ? "white" : "#666")};
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    white-space: nowrap;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 768px) {
        padding: 0.4rem 1.2rem;
        font-size: 0.9rem;
    }

    @media (max-width: 480px) {
        padding: 0.35rem 1rem;
        font-size: 0.85rem;
        flex-shrink: 0;
    }
`;

export const MainSection = styled.section`
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    padding: 3rem 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

    @media (max-width: 1200px) {
        padding: 2.5rem 1.5rem;
    }

    @media (max-width: 768px) {
        padding: 2rem 1rem;
        border-radius: 15px;
    }

    @media (max-width: 480px) {
        padding: 1.5rem 0.75rem;
        border-radius: 12px;
    }
`;

export const ResultsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }
`;

export const ResultsCount = styled.span`
    color: #666;
    font-size: 0.9rem;
`;

export const ViewToggle = styled.div`
    display: flex;
    gap: 0.5rem;
`;

export const ViewButton = styled.button<{ $active: boolean }>`
    padding: 0.5rem 1rem;
    border: 1px solid #e1e5e9;
    background: ${(props) => (props.$active ? "#667eea" : "white")};
    color: ${(props) => (props.$active ? "white" : "#666")};
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: ${(props) => (props.$active ? "#667eea" : "#f8f9fa")};
    }
`;

export const SnackGrid = styled.div<{ $viewMode: "grid" | "compact" | "list" }>`
    display: grid;
    gap: ${(props) => (props.$viewMode === "compact" ? "1.5rem" : "2.5rem")};

    /* 기본 데스크톱: 3개씩 */
    grid-template-columns: ${
        (props) =>
            props.$viewMode === "compact"
                ? "repeat(3, minmax(280px, 1fr))" // 컴팩트 모드: 3개
                : "repeat(3, minmax(350px, 1fr))" // 일반 모드: 3개
    };

    /* 중간 크기 화면: 2개씩 */
    @media (max-width: 1200px) {
        grid-template-columns: ${
            (props) =>
                props.$viewMode === "compact"
                    ? "repeat(2, minmax(280px, 1fr))" // 컴팩트 모드: 2개
                    : "repeat(2, minmax(350px, 1fr))" // 일반 모드: 2개
        };
        gap: ${(props) => (props.$viewMode === "compact" ? "1.25rem" : "2rem")};
    }

    /* 태블릿: 2개씩 */
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, minmax(250px, 1fr));
        gap: 1.5rem;
    }

    /* 모바일: 1개씩 */
    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
`;

export const ListGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        gap: 0.5rem;
        margin-top: 1.5rem;
    }

    @media (max-width: 480px) {
        flex-direction: column;
        gap: 0.75rem;

        & > div:first-child {
            order: 1;
        }

        & > span {
            order: 0;
        }
    }
`;

export const PageButton = styled.button<{ $active?: boolean }>`
    padding: 0.5rem 1rem;
    border: 1px solid ${(props) => (props.$active ? "#667eea" : "#e1e5e9")};
    background: ${(props) => (props.$active ? "#667eea" : "white")};
    color: ${(props) => (props.$active ? "white" : "#666")};
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 40px;

    &:hover:not(:disabled) {
        background: ${(props) => (props.$active ? "#667eea" : "#f8f9fa")};
        transform: translateY(-1px);
    }

    &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
        transform: none;
    }

    @media (max-width: 480px) {
        padding: 0.4rem 0.8rem;
        min-width: 35px;
        font-size: 0.9rem;
    }
`;

export const PageInfo = styled.span`
    color: #666;
    font-size: 0.9rem;
    padding: 0 1rem;
`;

export const ItemsPerPageSelect = styled.select`
    padding: 0.5rem;
    border: 1px solid #e1e5e9;
    border-radius: 8px;
    background: white;
    color: #666;
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: #667eea;
    }
`;

export const NoResults = styled.div`
    text-align: center;
    padding: 3rem;
    color: #666;
`;
