import React from "react";
import { Card } from "../styles/components/FeatureCard.styles";

interface FeatureCardProps {
    title: string;
    description: string;
    onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, onClick }) => {
    return (
        <Card className="feature" onClick={onClick} type="button">
            <h3>{title}</h3>
            <p>{description}</p>
        </Card>
    );
};

export default FeatureCard;
