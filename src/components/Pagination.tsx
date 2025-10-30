import { Container, NavButton, PageButton } from "../styles/components/Pagination.styles";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push("...");
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push("...");
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push("...");
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push("...");
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <Container>
            <NavButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </NavButton>

            {getPageNumbers().map((page, index) => (
                <PageButton
                    key={index}
                    onClick={() => typeof page === "number" && onPageChange(page)}
                    disabled={page === "..."}
                    $active={page === currentPage}
                    $isEllipsis={page === "..."}
                >
                    {page}
                </PageButton>
            ))}

            <NavButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </NavButton>
        </Container>
    );
};

export default Pagination;
