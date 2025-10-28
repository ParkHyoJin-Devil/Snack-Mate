import styled from "styled-components";

export const LoginContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
    padding: 2rem 1rem;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

export const LoginCard = styled.div`
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    padding: 2.5rem;
    width: 100%;
    max-width: 400px;
    margin-bottom: 1rem;
`;

export const Title = styled.h2`
    font-size: 2rem;
    font-weight: 700;
    color: #2c3e50;
    text-align: center;
    margin-bottom: 2rem;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    width: 100%;
`;

export const Input = styled.input`
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    transition: border-color 0.3s ease;
    background-color: #f8f9fa;

    &:focus {
        outline: none;
        border-color: #4a2c2a;
        background-color: white;
    }

    &::placeholder {
        color: #6c757d;
    }
`;

export const LoginButton = styled.button`
    padding: 0.75rem 1rem;
    font-size: 1.1rem;
    border-radius: 8px;
    border: none;
    background: linear-gradient(135deg, #4a2c2a 0%, #663333 100%);
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    box-shadow: 0 4px 15px rgba(74, 44, 42, 0.3);

    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(74, 44, 42, 0.4);
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }
`;

export const ErrorMessage = styled.p`
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.5rem;
    text-align: center;
`;

export const SignupLink = styled.div`
    text-align: center;
    margin-top: 1rem;
    color: #6c757d;

    a {
        color: #4a2c2a;
        text-decoration: none;
        font-weight: 500;

        &:hover {
            text-decoration: underline;
        }
    }
`;
