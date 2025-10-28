import styled from "styled-components";

export const SignupContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
    padding: 2rem 1rem;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

export const SignupCard = styled.div`
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    padding: 2.5rem;
    width: 100%;
    max-width: 450px;
    margin-bottom: 1rem;
`;

export const Title = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    color: #2c3e50;
    text-align: center;
    margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
    font-size: 1rem;
    color: #7f8c8d;
    text-align: center;
    margin-bottom: 2rem;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const Label = styled.label`
    font-size: 0.9rem;
    font-weight: 600;
    color: #34495e;
`;

export const Input = styled.input`
    padding: 0.875rem 1rem;
    font-size: 1rem;
    border-radius: 8px;
    border: 2px solid #e1e8ed;
    transition: all 0.3s ease;
    background-color: #f8f9fa;

    &:focus {
        outline: none;
        border-color: #4a2c2a;
        background-color: white;
        box-shadow: 0 0 0 3px rgba(74, 44, 42, 0.1);
    }

    &::placeholder {
        color: #95a5a6;
    }

    &.error {
        border-color: #e74c3c;
        background-color: #fdf2f2;
    }
`;

export const PasswordContainer = styled.div`
    position: relative;
`;

export const PasswordToggle = styled.button`
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #7f8c8d;
    cursor: pointer;
    font-size: 0.9rem;
    padding: 0.25rem;

    &:hover {
        color: #4a2c2a;
    }
`;

export const SubmitButton = styled.button`
    padding: 1rem 1.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 8px;
    border: none;
    background: linear-gradient(135deg, #4a2c2a 0%, #663333 100%);
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 0.5rem;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(74, 44, 42, 0.3);
    }

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        background: #bdc3c7;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
`;

export const ErrorMessage = styled.div`
    background-color: #fdf2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-size: 0.9rem;
    margin-top: 0.5rem;
`;

export const SuccessMessage = styled.div`
    background-color: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #16a34a;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-size: 0.9rem;
    margin-top: 0.5rem;
`;

export const LoginLink = styled.div`
    text-align: center;
    margin-top: 1.5rem;
    font-size: 0.9rem;
    color: #7f8c8d;

    a {
        color: #4a2c2a;
        text-decoration: none;
        font-weight: 600;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export const PasswordStrength = styled.div`
    margin-top: 0.5rem;
    font-size: 0.8rem;
`;

export const StrengthBar = styled.div`
    height: 4px;
    background-color: #e1e8ed;
    border-radius: 2px;
    margin-top: 0.25rem;
    overflow: hidden;
    position: relative;

    .strength-fill {
        height: 100%;
        transition: all 0.3s ease;
        border-radius: 2px;
    }

    .strength-weak {
        background-color: #e74c3c;
    }

    .strength-medium {
        background-color: #f39c12;
    }

    .strength-strong {
        background-color: #27ae60;
    }
`;

export const FieldError = styled.span`
    color: #e74c3c;
    font-size: 0.8rem;
    margin-top: 0.25rem;
`;
