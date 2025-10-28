import { styled } from "../styled";

export const BUTTON_FONT_SIZE = "0.95rem";

export const Card = styled.div`
    background: white;
    border-radius: 10px;
    border: 1px solid #ddd; /* 연한 회색 경계선 추가 */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12); /* 그림자 조금 더 진하게 */
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const CardBody = styled.div`
    padding: 1rem;
    flex-grow: 1;
`;

export const Title = styled.h5`
    margin: 0.2rem 0 0.6rem;
    font-weight: 700;
    color: #333;
    font-size: 1.1rem;

    white-space: normal;
    word-break: keep-all;
`;

export const Tags = styled.p`
    margin: 0 0 0.5rem 0;
    color: #666;
    font-size: 0.9rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;

    span {
        background-color: #f0f0f0;
        border-radius: 12px;
        padding: 0 0.3rem;
        cursor: pointer;
    }
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
`;

export const ButtonLink = styled.a`
    flex: 1;
    text-align: center;
    text-decoration: none;
    padding: 0.5rem 0;
    border-radius: 20px;
    border: 1px solid #007bff;
    color: #007bff;
    font-weight: 600;
    font-size: ${BUTTON_FONT_SIZE};
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #007bff;
        color: white;
    }
`;

export const ActionButton = styled.button`
    flex: 1;
    text-align: center;
    padding: 0.5rem 0;
    border-radius: 20px;
    border: 1px solid #007bff;
    background: white;
    color: #007bff;
    font-weight: 600;
    font-size: ${BUTTON_FONT_SIZE};
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #007bff;
        color: white;
    }
`;

export const ModalOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    width: 90%;
    max-width: 520px;
    max-height: 90vh; // ← 화면을 넘어가지 않도록 제한
    background: #fff;
    border-radius: 16px;
    overflow: hidden; // 모달 바깥으로 내용 안넘어나가게
    display: flex;
    flex-direction: column;

    @media (min-width: 1024px) {
        max-width: 900px;
        width: 80%;
    }
`;

export const ModalHeader = styled.div`
    padding: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const CloseButton = styled.button`
    background: transparent;
    border: none;
    color: #fff;
    font-size: 1.25rem;
    cursor: pointer;
`;

export const ModalBody = styled.div`
    padding: 1rem;
    color: #333;
    overflow-y: auto; // 내용이 길면 스크롤 가능
    flex-grow: 1; // 남은 공간 모두 차지

    ol {
        padding-left: 1.25rem;
        line-height: 1.6;
    }

    li + li {
        margin-top: 0.35rem;
    }
`;

export const TopBox = styled.div`
    background: #f9f9f9;
    padding: 0.8rem 1rem;
    border-radius: 10px;
    margin-bottom: 1rem;

    display: grid;
    grid-template-columns: 1fr; /* 기본: 한 줄 (모바일) */
    gap: 1rem;

    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr; /* 큰 화면: 두 칸 */
    }

    .col {
        padding: 1rem;
        border-radius: 8px;
        background: #f0f0f0; /* 살짝 다른 배경 */

        /* PC에서 왼쪽 칸에만 오른쪽 선 추가 */
        @media (min-width: 768px) {
            &:first-child {
                border-right: 1px solid #ccc;
            }
        }
    }

    h4 {
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
        color: #333;
    }

    ul {
        margin: 0;
        padding-left: 1rem;
        list-style: none;
    }

    li {
        display: flex;
        justify-content: space-between; /* 이름 왼쪽, 구매하기 오른쪽 */
        align-items: center;
        margin-bottom: 0.35rem;
        font-size: 0.95rem;
    }

    a {
        color: #007bff;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
`;

export const ImageRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;

    img {
        width: 160px; /* 웹 기준 고정 크기 */
        height: auto;
        border-radius: 8px;
        object-fit: contain;
    }

    @media (max-width: 1024px) {
        img {
            /* width는 그대로, 한 줄에 최대 2개만 보이도록 flex만 조정 */
            flex: 0 0 auto;
        }
    }

    @media (max-width: 600px) {
        img {
            /* 모바일도 width 유지 */
            flex: 0 0 auto;
        }
    }
`;
