// src/styles/components/SearchSection.styles.ts
import { styled } from "../styled";

export const Section = styled.section``;

export const Container = styled.div`
    max-width: 42rem;
    margin: 0 auto;
    padding: 2rem 1rem;
    text-align: center;
`;

export const Heading = styled.h2`
    font-size: 1.875rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1rem;
`;

export const Subtext = styled.p`
    color: #4b5563;
    margin-bottom: 2rem;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 640px) {
        flex-direction: row;
    }
`;

export const Input = styled.input`
    flex: 1;
    padding: 0.75rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    outline: none;

    &:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
    }
`;

export const Button = styled.button`
    padding: 0.75rem 1.5rem;
    background: #2563eb;
    color: #ffffff;
    font-weight: 600;
    border-radius: 0.5rem;
    transition: background-color 0.2s ease;

    &:hover {
        background: #1d4ed8;
    }
`;
