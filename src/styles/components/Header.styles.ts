// src/styles/components/Header.styles.ts
import { styled } from "../styled";

export const HeaderBlock = styled.header`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 2rem;
    background: linear-gradient(135deg, #ffc0cbcc, #ffe4b5cc);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    border-radius: 0 0 20px 20px;
    backdrop-filter: blur(8px);

    p {
        font-size: 1.25rem;
        font-weight: 500;
        text-align: center;
        margin-top: 2rem;
        color: #663333cc;
        text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.6);

        @media (max-width: 900px) {
            font-size: 1.1rem;
        }

        @media (max-width: 600px) {
            font-size: 1rem;
            margin-top: 1.5rem;
        }
    }
`;

// ✅ 로고와 버튼을 한 줄에 배치 (중앙 정렬)
export const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    gap: 4rem; // 로고와 버튼 사이 간격 증가
    margin-bottom: 1rem; // 하단 여백 추가

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 2rem;
        margin-bottom: 0.5rem;
    }
`;

export const Logo = styled.h1`
    font-size: 3.5rem;
    cursor: pointer;
    margin: 0;

    @media (max-width: 600px) {
        font-size: 2rem;
    }
`;

export const AuthButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem; // 버튼들 사이 간격 증가

    span {
        padding: 0.5rem 1rem;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 20px;
        font-weight: 600;
        color: #4a2c2a;
        font-size: 0.95rem;
        white-space: nowrap;

        @media (max-width: 600px) {
            font-size: 0.85rem;
            padding: 0.4rem 0.8rem;
        }
    }

    button {
        min-width: 90px;
        padding: 0.5rem 1.2rem;
        font-size: 0.95rem;
        font-weight: 600;
        border-radius: 8px;
        border: 2px solid #4a2c2a;
        background: transparent;
        color: #4a2c2a;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            background: #4a2c2a;
            color: white;
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(74, 44, 42, 0.3);
        }

        @media (max-width: 600px) {
            min-width: 80px;
            padding: 0.4rem 1rem;
            font-size: 0.85rem;
        }
    }
`;
