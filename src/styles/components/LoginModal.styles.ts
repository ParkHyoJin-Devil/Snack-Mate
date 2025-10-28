// src/styles/components/LoginModal.styles.ts
import { styled } from "../styled";

export const ModalBackground = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(4px);
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background: white;
    padding: 3rem 2.5rem;
    border-radius: 16px;
    width: 100%;
    max-width: 380px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
`;

export const Title = styled.h2`
    margin: 0 0 2rem 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.875rem 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    font-size: 0.95rem;
    transition: all 0.2s;
    box-sizing: border-box;

    &::placeholder {
        color: #aaa;
    }

    &:focus {
        outline: none;
        border-color: #a08c7e;
        box-shadow: 0 0 0 3px rgba(160, 140, 126, 0.1);
    }
`;

export const LoginButton = styled.button`
    width: 100%;
    padding: 0.875rem;
    margin-top: 0.5rem;
    background: linear-gradient(135deg, #a08c7e 0%, #8b7566 100%);
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(160, 140, 126, 0.3);
    }

    &:active {
        transform: translateY(0);
    }
`;

export const ExtraLinks = styled.div`
    margin-top: 1.5rem;
    text-align: center;
    font-size: 0.875rem;
    color: #666;
`;

export const Link = styled.span`
    color: #a08c7e;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;
