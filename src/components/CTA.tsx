import { CTASection } from "../styles/components/CTA.styles";

interface CTAProps {
    text: string;
}

const CTA: React.FC<CTAProps> = ({ text }) => {
    return (
        <CTASection>
            <p>{text}</p>
        </CTASection>
    );
};

export default CTA;
