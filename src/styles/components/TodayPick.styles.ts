import { styled } from "../styled";

export const TodaySection = styled.section`
    position: relative;
    padding: 2.5rem;
    border-radius: 1.5rem;
    margin-bottom: 3rem;
    background: linear-gradient(to right, #fffbe6, #ffeaea);
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image: url("https://grainy-gradients.vercel.app/noise.svg");
        opacity: 0.2;
        pointer-events: none;
        z-index: 0;
    }
`;

export const SectionTitle = styled.h2`
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 1;
    word-break: keep-all;
    overflow-wrap: anywhere;

    @media (max-width: 768px) {
        font-size: 1.4rem;
        margin-bottom: 1rem;
    }
    @media (max-width: 480px) {
        font-size: 1.2rem;
    }
`;

export const TodayScrollContainer = styled.div`
    position: relative;
    z-index: 1;
    padding: 0 2rem;
    max-width: 100%;
`;

export const TodayGrid = styled.div`
    display: flex;
    overflow-x: auto;
    gap: 1.5rem;
    padding: 0;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        height: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #d1d1d1;
        border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
`;

export const ScrollButton = styled.button<{ direction: "left" | "right" }>`
    position: absolute;
    top: 50%;
    ${(p) => (p.direction === "left" ? "left: -1rem;" : "right: -1rem;")}
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 2;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        background: rgba(255, 255, 255, 1);
        transform: translateY(-50%) scale(1.05);
    }

    @media (max-width: 768px) {
        width: 2rem;
        height: 2rem;
        font-size: 1rem;
    }
    @media (max-width: 500px) {
        width: 1.8rem;
        height: 1.8rem;
        font-size: 0.9rem;
    }
    @media (max-width: 360px) {
        display: none;
    }
`;

export const FeaturedSnackCardWrapper = styled.div`
    flex: 0 0 280px;
    width: 280px;
    min-width: 280px;
    scroll-snap-align: start;

    &:first-child {
        margin-left: 3rem;
    }
    &:last-child {
        margin-right: 3rem;
    }
`;
