import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ useRouter → useNavigate
import type { Snack } from "../types/index";
import SnackCard from "../components/SnackCard";
import TodayPick from "../components/TodayPick";
import LoginModal from "../components/LoginModal";
import { useAuth } from "../hooks/useAuth";
import {
    BackButton,
    Container,
    Header,
    Title,
    Subtitle,
    SearchBar,
    FilterTabs,
    FilterTab,
    MainSection,
    ResultsHeader,
    ResultsCount,
    ViewToggle,
    ViewButton,
    SnackGrid,
    ListGrid,
    PaginationContainer,
    PageButton,
    PageInfo,
    ItemsPerPageSelect,
    NoResults,
} from "../styles/pages/Snacks.styles";

// SnackFromDB: DB에서 오는 원본 타입
interface SnackFromDB {
    id: number;
    title: string;
    description: string;
    thumbnail_url: string;
    link: string;
    category: string;
    author: string;
    license: string;
}

export default function SnacksPage() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    const [viewMode, setViewMode] = useState<"grid" | "compact" | "list">("grid");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [snacks, setSnacks] = useState<Snack[]>([]);
    const [showLoginModal, setShowLoginModal] = useState(false);

    // DB에서 가져올 snacks 상태 추가
    useEffect(() => {
        fetch("/api/snacks")
            .then((res) => res.json())
            .then((data: SnackFromDB[]) => {
                const formatted: Snack[] = data.map((item, index) => ({
                    id: item.id ?? index, // DB에서 id 없으면 index로 임시 생성
                    name: item.title,
                    description: item.description,
                    image: item.thumbnail_url,
                    link: item.link,
                    category: item.category,
                    author: item.author,
                    license: item.license as Snack["license"],
                    tags: [], // 빈 배열 유지
                }));
                setSnacks(formatted);
            })
            .catch(console.error);
    }, []);
    // 카테고리 추출
    const categories = useMemo(() => {
        const cats = snacks.reduce((acc: string[], snack) => {
            if (snack.category && !acc.includes(snack.category)) {
                acc.push(snack.category);
            }
            return acc;
        }, []);
        return ["all", ...cats];
    }, [snacks]);

    // 필터링된 스낵 목록
    const filteredSnacks = useMemo(() => {
        return snacks.filter((snack) => {
            const matchesSearch =
                !searchQuery ||
                snack.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                snack.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                snack.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesFilter = activeFilter === "all" || snack.category === activeFilter;

            return matchesSearch && matchesFilter;
        });
    }, [searchQuery, activeFilter, snacks]);

    // 페이지네이션 계산
    const totalPages = Math.ceil(filteredSnacks.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedSnacks = filteredSnacks.slice(startIndex, startIndex + itemsPerPage);

    // 검색이나 필터 변경시 첫 페이지로 이동
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, activeFilter]);

    return (
        <Container>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "2rem",
                }}
            >
                <BackButton onClick={() => navigate("/")}>← 홈으로 돌아가기</BackButton>
                {user ? (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "0.9rem",
                                color: "#4a2c2a",
                                fontWeight: "500",
                            }}
                        >
                            {user.nickname}님 환영합니다! 👋
                        </span>
                        <button
                            onClick={() => {
                                logout();
                                navigate("/");
                            }}
                            style={{
                                padding: "0.5rem 1rem",
                                background: "transparent",
                                color: "#4a2c2a",
                                border: "1px solid #4a2c2a",
                                borderRadius: "20px",
                                cursor: "pointer",
                                fontSize: "0.8rem",
                                fontWeight: "500",
                                transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#4a2c2a";
                                e.currentTarget.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = "#4a2c2a";
                            }}
                        >
                            로그아웃
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setShowLoginModal(true)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.75rem 1.5rem",
                            background: "linear-gradient(135deg, #4a2c2a 0%, #663333 100%)",
                            color: "white",
                            border: "none",
                            borderRadius: "25px",
                            cursor: "pointer",
                            fontSize: "0.9rem",
                            fontWeight: "500",
                            boxShadow: "0 4px 15px rgba(74, 44, 42, 0.3)",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 6px 20px rgba(74, 44, 42, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 15px rgba(74, 44, 42, 0.3)";
                        }}
                        onMouseDown={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        로그인
                    </button>
                )}
            </div>

            <Header>
                <Title>🍿 Snack Mate</Title>
                <Subtitle>트렌디한 간식을 찾아보세요!</Subtitle>

                <SearchBar
                    type="text"
                    placeholder="간식 이름이나 설명을 검색해보세요..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <FilterTabs>
                    {categories.map((category) => (
                        <FilterTab
                            key={category}
                            $active={activeFilter === category}
                            onClick={() => setActiveFilter(category)}
                        >
                            {category === "all" ? "전체" : category}
                        </FilterTab>
                    ))}
                </FilterTabs>
            </Header>

            <TodayPick todaySnacks={snacks} />

            <MainSection>
                <ResultsHeader>
                    <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#333" }}>전체 간식 목록</h2>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            flexWrap: "wrap",
                        }}
                    >
                        <ResultsCount>
                            총 {filteredSnacks.length}개 ({startIndex + 1}-
                            {Math.min(startIndex + itemsPerPage, filteredSnacks.length)}개 표시)
                        </ResultsCount>
                        <ItemsPerPageSelect
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                        >
                            <option value={6}>6개씩</option>
                            <option value={12}>12개씩</option>
                            <option value={24}>24개씩</option>
                            <option value={48}>48개씩</option>
                        </ItemsPerPageSelect>
                        <ViewToggle>
                            <ViewButton $active={viewMode === "grid"} onClick={() => setViewMode("grid")}>
                                격자
                            </ViewButton>
                            <ViewButton $active={viewMode === "compact"} onClick={() => setViewMode("compact")}>
                                컴팩트
                            </ViewButton>
                            <ViewButton $active={viewMode === "list"} onClick={() => setViewMode("list")}>
                                리스트
                            </ViewButton>
                        </ViewToggle>
                    </div>
                </ResultsHeader>

                {filteredSnacks.length === 0 ? (
                    <NoResults>
                        <h3>검색 결과가 없습니다</h3>
                        <p>다른 키워드로 검색해보세요</p>
                    </NoResults>
                ) : (
                    <>
                        {viewMode === "list" ? (
                            <ListGrid>
                                {paginatedSnacks.map((snack, idx) => (
                                    <SnackCard key={startIndex + idx} snack={snack} listView={true} compact={false} />
                                ))}
                            </ListGrid>
                        ) : (
                            <SnackGrid $viewMode={viewMode}>
                                {paginatedSnacks.map((snack, idx) => (
                                    <SnackCard key={startIndex + idx} snack={snack} compact={viewMode === "compact"} />
                                ))}
                            </SnackGrid>
                        )}

                        {totalPages > 1 && (
                            <PaginationContainer>
                                <PageButton onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                                    처음
                                </PageButton>
                                <PageButton
                                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                >
                                    이전
                                </PageButton>

                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }

                                    return (
                                        <PageButton
                                            key={pageNum}
                                            $active={currentPage === pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                        >
                                            {pageNum}
                                        </PageButton>
                                    );
                                })}

                                <PageButton
                                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    다음
                                </PageButton>
                                <PageButton
                                    onClick={() => setCurrentPage(totalPages)}
                                    disabled={currentPage === totalPages}
                                >
                                    마지막
                                </PageButton>

                                <PageInfo>
                                    {currentPage} / {totalPages} 페이지
                                </PageInfo>
                            </PaginationContainer>
                        )}
                    </>
                )}
            </MainSection>

            {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
        </Container>
    );
}
