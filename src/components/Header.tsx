import { useNavigate } from "react-router-dom";
import { HeaderBlock, HeaderContent, Logo, AuthButtons } from "../styles/components/Header.styles";
import { useAuth } from "../hooks/useAuth";

interface HeaderProps {
    children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = () => {
    const navigate = useNavigate();
    const { token, user, logout } = useAuth(); // 로그인 상태 확인

    const handleLogout = () => {
        logout();
        navigate("/"); // 로그아웃 후 홈으로 이동
    };

    return (
        <HeaderBlock>
            <HeaderContent>
                <Logo onClick={() => navigate("/")}>Snack Mate</Logo>
            </HeaderContent>

            <AuthButtons>
                {token && user ? (
                    <>
                        <span>{user.nickname ? `${user.nickname}님 환영합니다` : ""}</span>
                        {user.role === 'admin' && (
                            <button onClick={() => navigate("/admin")}>관리자</button>
                        )}
                        <button onClick={handleLogout}>로그아웃</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => navigate("/login")}>로그인</button>
                        <button onClick={() => navigate("/signup")}>회원가입</button>
                    </>
                )}
            </AuthButtons>

            <div>
                <p>초보자도 쉽게 따라할 수 있는 간식 레시피 플랫폼 🍰</p>
            </div>
        </HeaderBlock>
    );
};

export default Header;
