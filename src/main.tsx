import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GlobalStyle } from "./styles/GlobalStyle"; // GlobalStyle import
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <GlobalStyle /> {/* 루트에서 전역 스타일 적용 */}
                <App />
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);
