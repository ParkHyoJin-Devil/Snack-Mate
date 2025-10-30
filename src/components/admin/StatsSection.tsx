import type { Stats } from "../../types/admin";
import {
    StatsContainer,
    StatCard,
    StatTitle,
    StatValue,
} from "../../styles/pages/Admin.styles";

interface StatsSectionProps {
    stats: Stats | null;
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
    if (!stats) return null;

    return (
        <StatsContainer>
            <StatCard>
                <StatTitle>📚 총 레시피</StatTitle>
                <StatValue>{stats.totalRecipes}</StatValue>
            </StatCard>
            <StatCard>
                <StatTitle>👥 총 사용자</StatTitle>
                <StatValue>{stats.totalUsers}</StatValue>
            </StatCard>
        </StatsContainer>
    );
};

export default StatsSection;