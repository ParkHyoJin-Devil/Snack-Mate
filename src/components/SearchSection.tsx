import React, { useState } from "react";
import { Section, Container, Heading, Subtext, Form, Input, Button } from "../styles/components/SearchSection.styles";

interface SearchSectionProps {
    onSearch: (query: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 태그 검색을 위해 #을 붙여도 되고, 그냥 입력 그대로 전달
        onSearch(searchQuery.trim());
    };

    return (
        <Section>
            <Container>
                <Heading>Find Your Perfect Snack</Heading>
                <Subtext>Discover delicious snacks from around the world</Subtext>
                <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for snacks by name, description, or tag..."
                    />
                    <Button type="submit">Search</Button>
                </Form>
            </Container>
        </Section>
    );
};

export default SearchSection;
