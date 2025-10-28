import { styled } from "../styled";

export const CTASection = styled.section`
    background: linear-gradient(120deg, #ff9a9e, #fad0c4);
    text-align: center;
    padding: 2.5rem 1rem;
    border-radius: 20px;
    box-shadow: 0 8px 25px rgba(255, 115, 115, 0.4);
    color: white;
    user-select: none;
    margin-top: 3rem;
    font-weight: 700;

    /* ✅ 부모(Main) 너비에 꽉 차게 */
    width: 100%;
    align-self: stretch;

    p {
        font-size: 1.7rem;
        letter-spacing: 1.3px;
        text-shadow: 1px 1px 5px rgba(150, 0, 0, 0.4);
    }
`;
