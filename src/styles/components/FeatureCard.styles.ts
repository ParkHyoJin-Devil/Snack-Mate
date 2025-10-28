import { styled } from "../styled"; // 공통 styled.ts

export const Card = styled.button`
    width: 100%;
    max-width: 400px;
    background: white;
    border: none;
    border-radius: 10px;
    padding: 2rem 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: 0.3s;
    color: #ff7373;
    font-weight: 700;

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 25px rgba(255, 115, 115, 0.35);
        background-color: #fff4f4;
    }

    h3 {
        margin-bottom: 1rem;
    }

    p {
        font-size: 0.95rem;
        color: #666;
        line-height: 1.4;
        user-select: text;
    }
`;
