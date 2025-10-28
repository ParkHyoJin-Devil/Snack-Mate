import React, { useState, useRef } from "react";
import SnackCard from "./SnackCard";
import type { Snack } from "../types";
import * as S from "../styles/components/TodayPick.styles";

interface TodayPickProps {
    todaySnacks: Snack[];
    searchQuery?: string;
}

const TodayPick: React.FC<TodayPickProps> = ({ todaySnacks, searchQuery = "" }) => {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const filteredSnacks = todaySnacks.filter((snack) => {
        const tagMatch = selectedTag ? snack.tags.includes(selectedTag) : true;
        const search = searchQuery.toLowerCase();
        const searchMatch =
            snack.name.toLowerCase().includes(search) ||
            snack.description.toLowerCase().includes(search) ||
            snack.tags.some((tag) => tag.toLowerCase().includes(search));
        return tagMatch && searchMatch;
    });

    const handleTagClick = (tag: string) => setSelectedTag(tag === selectedTag ? null : tag);

    const scrollToday = (dir: "left" | "right") => {
        if (!gridRef.current) return;
        const cardWidth = 280;
        const gap = 24; // 1.5rem
        const scrollAmount = cardWidth + gap;
        gridRef.current.scrollBy({
            left: dir === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <S.TodaySection>
            <S.SectionTitle>🌟 오늘의 추천 간식 {selectedTag && `(태그: ${selectedTag})`}</S.SectionTitle>
            <S.TodayScrollContainer>
                <S.ScrollButton direction="left" onClick={() => scrollToday("left")}>
                    ←
                </S.ScrollButton>
                <S.TodayGrid ref={gridRef}>
                    {filteredSnacks.map((snack, idx) => (
                        <S.FeaturedSnackCardWrapper key={idx}>
                            <SnackCard snack={snack} featured onTagClick={handleTagClick} />
                        </S.FeaturedSnackCardWrapper>
                    ))}
                </S.TodayGrid>
                <S.ScrollButton direction="right" onClick={() => scrollToday("right")}>
                    →
                </S.ScrollButton>
            </S.TodayScrollContainer>
        </S.TodaySection>
    );
};

export default TodayPick;
