import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FeatureCard from "../components/FeatureCard";
import CTA from "../components/CTA";
import { PageWrapper, Main, Features } from "../styles/pages/Home.styles";

const backgrounds = [
    "https://source.unsplash.com/1600x900/?dessert,snack,food",
    "https://source.unsplash.com/1600x900/?bakery,bread",
    "https://source.unsplash.com/1600x900/?sweet,candy",
    "https://source.unsplash.com/1600x900/?chocolate,dessert",
];

export default function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        let currentBg = 0;
        const intervalId = setInterval(() => {
            currentBg = (currentBg + 1) % backgrounds.length;
            document.body.style.backgroundImage = `url('${backgrounds[currentBg]}')`;
        }, 8000);

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target as HTMLElement;
                        target.style.opacity = "1";
                        target.style.transform = "translateY(0)";
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        document.querySelectorAll(".feature").forEach((el) => observer.observe(el));

        return () => {
            clearInterval(intervalId);
            observer.disconnect();
        };
    }, []);

    return (
        <PageWrapper>
            <Header>
                <div className="auth-buttons">
                    <button onClick={() => navigate("/login")}>로그인</button>
                    <button onClick={() => navigate("/signup")}>회원가입</button>
                </div>
            </Header>

            <Main>
                <Features>
                    <FeatureCard
                        title="📌 간식 목록"
                        description="요즘 핫한 간식을 구경하고 원하는 레시피를 찾아보세요."
                        onClick={() => navigate("/snacks")}
                    />
                </Features>

                <CTA text="오늘의 간식, 바로 도전해보세요!" />
            </Main>

            <Footer />
        </PageWrapper>
    );
}
