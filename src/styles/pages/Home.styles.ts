// src/styles/pages/Home.styles.ts
import { styled } from "../styled";

// ✅ 새로 추가: 푸터 최하단 고정용
export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

// ✅ flex: 1 추가해서 푸터를 아래로 밀어냄
// src/styles/pages/Home.styles.ts
export const Main = styled.main`
    flex: 1;
    width: 100%; // ✅ 추가
    max-width: 1400px; // ✅ 1100px → 1400px로 증가
    margin: 4rem auto 9rem;
    padding: 0 1rem;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    animation: slideUp 1s ease-out;

    @keyframes slideUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

export const Features = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    justify-items: center;
    margin-bottom: 3rem;
`;
