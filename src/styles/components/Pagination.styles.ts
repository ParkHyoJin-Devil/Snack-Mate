// src/styles/components/Pagination.styles.ts
import { styled } from "../styled";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-top: 2rem;
`;

export const NavButton = styled.button`
    padding: 0.5rem 0.75rem;
    color: #6b7280;
    background: #ffffff;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    transition: background-color 0.2s ease;

    &:hover:enabled {
        background: #f9fafb;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const PageButton = styled.button<{ $active?: boolean; $isEllipsis?: boolean }>`
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    border: 1px solid ${(p) => (p.$active || p.$isEllipsis ? "transparent" : "#d1d5db")};
    color: ${(p) => (p.$active ? "#ffffff" : p.$isEllipsis ? "#9ca3af" : "#374151")};
    background: ${(p) => (p.$active ? "#2563eb" : p.$isEllipsis ? "transparent" : "#ffffff")};
    cursor: ${(p) => (p.$isEllipsis ? "default" : "pointer")};
    transition: background-color 0.2s ease;

    &:hover {
        background: ${(p) => (p.$active || p.$isEllipsis ? undefined : "#f9fafb")};
    }
`;
